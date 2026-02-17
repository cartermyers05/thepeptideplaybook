import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { corsHeaders } from "../_shared/ai-engine.ts";

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header");

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) throw new Error("Unauthorized");

    const { protocol_id, week_number, force } = await req.json();

    // Check cache first
    if (!force) {
      const { data: existing } = await supabase
        .from("weekly_reviews")
        .select("*")
        .eq("user_id", user.id)
        .eq("protocol_id", protocol_id)
        .eq("week_number", week_number)
        .maybeSingle();

      if (existing) {
        return new Response(JSON.stringify(existing), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    // Fetch protocol
    const { data: protocol } = await supabase
      .from("user_protocols")
      .select("*")
      .eq("id", protocol_id)
      .eq("user_id", user.id)
      .single();

    if (!protocol) throw new Error("Protocol not found");

    // Fetch last 14 days of logs (current + previous week for comparison)
    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

    const { data: logs } = await supabase
      .from("daily_logs")
      .select("*")
      .eq("user_id", user.id)
      .eq("protocol_id", protocol_id)
      .gte("log_date", fourteenDaysAgo.toISOString().split("T")[0])
      .order("log_date", { ascending: true });

    const allLogs = logs || [];
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const sevenDaysAgoStr = sevenDaysAgo.toISOString().split("T")[0];

    const thisWeekLogs = allLogs.filter(l => l.log_date >= sevenDaysAgoStr);
    const lastWeekLogs = allLogs.filter(l => l.log_date < sevenDaysAgoStr);

    // Build data summary for AI
    const calcCompliance = (logs: any[]) => {
      let total = 0, completed = 0;
      for (const log of logs) {
        const actions = log.actions_completed || {};
        const vals = Object.values(actions);
        total += vals.length;
        completed += vals.filter(Boolean).length;
      }
      return total > 0 ? Math.round((completed / total) * 100) : 0;
    };

    const calcAvgEnergy = (logs: any[]) => {
      const vals = logs.filter(l => l.energy_rating != null).map(l => l.energy_rating);
      return vals.length > 0 ? (vals.reduce((a: number, b: number) => a + b, 0) / vals.length).toFixed(1) : null;
    };

    const thisWeekCompliance = calcCompliance(thisWeekLogs);
    const lastWeekCompliance = calcCompliance(lastWeekLogs);
    const thisWeekEnergy = calcAvgEnergy(thisWeekLogs);
    const lastWeekEnergy = calcAvgEnergy(lastWeekLogs);

    const symptomSummary: Record<string, number> = {};
    for (const log of thisWeekLogs) {
      if (log.injection_site_reaction && log.injection_site_reaction !== "none") {
        symptomSummary["injection_site_reaction"] = (symptomSummary["injection_site_reaction"] || 0) + 1;
      }
      if (log.gi_issues && log.gi_issues !== "none") {
        symptomSummary["gi_issues"] = (symptomSummary["gi_issues"] || 0) + 1;
      }
      if (log.other_symptoms) {
        symptomSummary["other_symptoms"] = (symptomSummary["other_symptoms"] || 0) + 1;
      }
    }

    const weights = thisWeekLogs.filter(l => l.weight_lbs != null).map(l => ({ date: l.log_date, weight: l.weight_lbs }));

    const missedCompounds: Record<string, number> = {};
    for (const log of thisWeekLogs) {
      const actions = log.actions_completed || {};
      for (const [name, done] of Object.entries(actions)) {
        if (!done) missedCompounds[name] = (missedCompounds[name] || 0) + 1;
      }
    }

    const compoundNames = (protocol.compounds || []).map((c: any) => c.name).join(", ");

    const prompt = `You are analyzing a peptide protocol user's weekly tracking data. Return ONLY valid JSON matching this schema:
{
  "insights": [{"text": "string under 30 words", "category": "compliance|energy|symptoms|weight|progress"}],
  "mood": "green|yellow|red",
  "recommendation": "one actionable tip under 40 words",
  "full_analysis": "detailed 3-4 paragraph markdown analysis"
}

USER DATA:
- Protocol: ${protocol.protocol_name}
- Compounds: ${compoundNames}
- Week ${week_number} of ${protocol.cycle_length_weeks}
- Days logged this week: ${thisWeekLogs.length}
- This week compliance: ${thisWeekCompliance}% (last week: ${lastWeekCompliance}%)
- This week avg energy: ${thisWeekEnergy || "no data"} (last week: ${lastWeekEnergy || "no data"})
- Symptoms this week: ${JSON.stringify(symptomSummary)}
- Weight data: ${JSON.stringify(weights)}
- Missed compounds: ${JSON.stringify(missedCompounds)}

RULES:
- 3-4 insights max, each under 30 words
- mood: green if compliance > 75% and improving, red if < 50% or declining + symptoms, yellow otherwise
- Be specific about their compounds by name
- Frame as "based on your tracking data" never medical advice
- Reference what's typical at week ${week_number} of peptide protocols`;

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!aiResponse.ok) {
      const status = aiResponse.status;
      if (status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited, try again later" }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted" }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI gateway error: ${status}`);
    }

    const aiData = await aiResponse.json();
    const rawContent = aiData.choices?.[0]?.message?.content || "";

    // Parse JSON from response (handle markdown code blocks)
    let parsed;
    try {
      const jsonMatch = rawContent.match(/```(?:json)?\s*([\s\S]*?)```/) || [null, rawContent];
      parsed = JSON.parse(jsonMatch[1].trim());
    } catch {
      parsed = {
        insights: [{ text: "Week reviewed — keep logging for better insights next week.", category: "progress" }],
        mood: "yellow",
        recommendation: "Continue logging daily to unlock personalized weekly intelligence.",
        full_analysis: rawContent,
      };
    }

    // Upsert into weekly_reviews
    const { data: review, error: insertError } = await supabase
      .from("weekly_reviews")
      .upsert({
        user_id: user.id,
        protocol_id,
        week_number,
        insights: parsed.insights || [],
        mood: parsed.mood || "yellow",
        recommendation: parsed.recommendation || "",
        full_analysis: parsed.full_analysis || "",
        generated_at: new Date().toISOString(),
      }, { onConflict: "user_id,protocol_id,week_number" })
      .select()
      .single();

    if (insertError) {
      console.error("Insert error:", insertError);
      // Return the parsed data even if caching fails
      return new Response(JSON.stringify({ ...parsed, id: "temp", user_id: user.id, protocol_id, week_number }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(review), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-weekly-review error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

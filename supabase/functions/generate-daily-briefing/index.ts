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

    const { protocol_id, today_compounds, week_number, cycle_length_weeks } = await req.json();
    const today = new Date().toISOString().split("T")[0];

    // Check cache
    const { data: existing } = await supabase
      .from("daily_briefings")
      .select("*")
      .eq("user_id", user.id)
      .eq("briefing_date", today)
      .maybeSingle();

    if (existing) {
      return new Response(JSON.stringify(existing), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fetch recent logs for context
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { data: recentLogs } = await supabase
      .from("daily_logs")
      .select("*")
      .eq("user_id", user.id)
      .eq("protocol_id", protocol_id)
      .gte("log_date", sevenDaysAgo.toISOString().split("T")[0])
      .order("log_date", { ascending: false });

    const logs = recentLogs || [];
    const daysLogged = logs.length;
    const energyVals = logs.filter(l => l.energy_rating).map(l => l.energy_rating);
    const avgEnergy = energyVals.length > 0 ? (energyVals.reduce((a: number, b: number) => a + b, 0) / energyVals.length).toFixed(1) : null;

    let compliance = 0;
    let totalExpected = 0, totalDone = 0;
    for (const log of logs) {
      const actions = log.actions_completed || {};
      const vals = Object.values(actions);
      totalExpected += vals.length;
      totalDone += vals.filter(Boolean).length;
    }
    if (totalExpected > 0) compliance = Math.round((totalDone / totalExpected) * 100);

    const compoundList = (today_compounds || []).map((c: any) => c.name).join(", ");

    const prompt = `Generate a short personalized daily briefing (2-3 sentences) for a peptide protocol user. Return ONLY valid JSON:
{
  "content": "the 2-3 sentence briefing",
  "compound_tips": [{"compound": "name", "tip": "one quick tip"}],
  "data_highlight": "one motivational stat from their data"
}

CONTEXT:
- Today's compounds: ${compoundList || "rest day"}
- Week ${week_number} of ${cycle_length_weeks}
- Recent compliance: ${compliance}%
- Days logged this week: ${daysLogged}
- Avg energy: ${avgEnergy || "no data yet"}
- Date: ${today}

RULES:
- Keep briefing conversational and motivating, not clinical
- Reference their specific compounds by name
- Include one practical tip per compound scheduled today
- Data highlight should reference their actual numbers
- Never give medical advice — frame as tracking insights
- If rest day, acknowledge it and suggest what to focus on`;

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!aiResponse.ok) {
      const status = aiResponse.status;
      if (status === 429 || status === 402) {
        return new Response(JSON.stringify({ error: status === 429 ? "Rate limited" : "Credits exhausted" }), {
          status, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI gateway error: ${status}`);
    }

    const aiData = await aiResponse.json();
    const rawContent = aiData.choices?.[0]?.message?.content || "";

    let parsed;
    try {
      const jsonMatch = rawContent.match(/```(?:json)?\s*([\s\S]*?)```/) || [null, rawContent];
      parsed = JSON.parse(jsonMatch[1].trim());
    } catch {
      parsed = {
        content: "Your protocol is on track. Keep logging daily to unlock smarter insights.",
        compound_tips: [],
        data_highlight: `${daysLogged} days logged this week`,
      };
    }

    const { data: briefing, error: insertError } = await supabase
      .from("daily_briefings")
      .upsert({
        user_id: user.id,
        briefing_date: today,
        content: parsed.content || "",
        compound_tips: parsed.compound_tips || [],
        data_highlight: parsed.data_highlight || "",
      }, { onConflict: "user_id,briefing_date" })
      .select()
      .single();

    if (insertError) {
      console.error("Insert error:", insertError);
      return new Response(JSON.stringify(parsed), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(briefing), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-daily-briefing error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

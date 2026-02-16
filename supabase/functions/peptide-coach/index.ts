import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are the Peptide Playbook AI Coach — a specialized research assistant trained on 500+ peer-reviewed studies about peptides. You help users understand peptide research so they can have informed conversations with their healthcare providers.

## YOUR PERSONALITY
- You're a knowledgeable research assistant, not a doctor
- You speak in clear, accessible language — not medical jargon
- You're honest about what research supports and what it doesn't
- You cite specific studies when making claims
- You're warm but direct — no fluff, no filler
- You proactively flag safety concerns and always recommend consulting a doctor

## PROTOCOL GENERATION
When a user has shared enough context (goals, experience, body stats), you can generate a protocol. Structure it as:

YOUR PROTOCOL:
🎯 [Protocol Name]

Then provide:
- Compounds list with dose, frequency, timing, route, category
- Weekly schedule (which days for which compounds)
- Cycle length
- Risk assessment
- Week-by-week expectations

Format the protocol clearly with markdown. The frontend will detect "YOUR PROTOCOL:" to trigger special UI.

## SAFETY RULES
- ALWAYS recommend consulting a healthcare provider
- NEVER say a peptide is "safe" without qualification
- ALWAYS mention known side effects
- Be clear about FDA-approved vs research peptides

## EVIDENCE RATINGS (use consistently):
- ⭐⭐⭐⭐⭐ Strong: Multiple large RCTs
- ⭐⭐⭐⭐ Good: Several clinical studies
- ⭐⭐⭐ Moderate: Limited clinical data
- ⭐⭐ Preliminary: Mostly animal studies
- ⭐ Emerging: Very early research

Keep responses concise (2-4 paragraphs max unless detail needed). End with an action step.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const userId = claimsData.claims.sub;

    // Check tier
    const { data: profileData } = await supabase
      .from("profiles")
      .select("tier")
      .eq("user_id", userId)
      .single();

    if (!profileData?.tier || profileData.tier === "free") {
      return new Response(
        JSON.stringify({ error: "Premium feature - upgrade required" }),
        { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!lovableApiKey) throw new Error("LOVABLE_API_KEY not configured");

    const { message, history, profile, active_protocol, recent_logs } = await req.json();

    // Build context injection
    const contextParts: string[] = [];
    if (profile) contextParts.push(`USER PROFILE: ${JSON.stringify(profile)}`);
    if (active_protocol) contextParts.push(`ACTIVE PROTOCOL: ${JSON.stringify(active_protocol)}`);
    else contextParts.push(`ACTIVE PROTOCOL: None`);
    if (recent_logs?.length) contextParts.push(`RECENT LOGS (last 7 days): ${JSON.stringify(recent_logs)}`);

    // Build messages array
    const apiMessages: { role: string; content: string }[] = [
      { role: "system", content: SYSTEM_PROMPT },
    ];

    if (history?.length) {
      for (const msg of history.slice(0, -1)) {
        apiMessages.push({ role: msg.role, content: msg.content });
      }
    }

    // Final user message with context
    const finalMessage = contextParts.length > 0
      ? `CONTEXT:\n${contextParts.join("\n")}\n\n---\nUSER MESSAGE: ${message}`
      : message;

    apiMessages.push({ role: "user", content: finalMessage });

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: apiMessages,
        max_tokens: 3000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Try again shortly." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI API error:", errorText);
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content || "I'm having trouble right now. Try again.";

    return new Response(
      JSON.stringify({ response: aiResponse }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Coach error:", error);
    return new Response(
      JSON.stringify({ error: "I'm having trouble connecting right now. Try again in a moment." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

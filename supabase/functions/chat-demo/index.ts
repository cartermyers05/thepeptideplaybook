import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders, callLovableAI, handleAIError } from "../_shared/ai-engine.ts";

// Simple in-memory rate limiting (resets on function cold start)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_WINDOW = 3;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const recentTimestamps = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW);

  if (recentTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  recentTimestamps.push(now);
  rateLimitMap.set(ip, recentTimestamps);
  return false;
}

const DEMO_SYSTEM_PROMPT = `You are the Peptide Playbook AI demo. Give BRIEF, summary-style answers.

### RESPONSE RULES (STRICT)
- **2-3 sentences MAX** - no lengthy explanations
- Lead with the direct answer
- Include FDA status (✅ Approved or ⚠️ Research Only)
- End with: "Want the full breakdown? Get access below."
- NO dosing, sourcing, or injection info

### QUICK REFERENCE
- **Semaglutide/Tirzepatide**: ✅ FDA APPROVED for weight management
- **BPC-157, TB-500, MK-677**: ⚠️ RESEARCH ONLY (animal studies)
- **Tesamorelin**: ✅ FDA APPROVED for HIV lipodystrophy

Keep it short and punchy - this is a demo!`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
               req.headers.get("cf-connecting-ip") ||
               "unknown";

    if (isRateLimited(ip)) {
      return new Response(
        JSON.stringify({ error: "You've asked too many questions. Please wait a moment and try again." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { messages } = await req.json();

    console.log("Demo chat request from IP:", ip);

    const { response, ok } = await callLovableAI({
      messages: [
        { role: "system", content: DEMO_SYSTEM_PROMPT },
        ...messages,
      ],
      stream: true,
      maxTokens: 300,
    });

    if (!ok) {
      const errResp = handleAIError(response);
      if (errResp) return errResp;

      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI service temporarily unavailable" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Demo chat error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

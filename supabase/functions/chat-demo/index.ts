import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Simple in-memory rate limiting (resets on function cold start)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_WINDOW = 3;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  
  // Filter out old timestamps
  const recentTimestamps = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW);
  
  if (recentTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }
  
  // Add current request
  recentTimestamps.push(now);
  rateLimitMap.set(ip, recentTimestamps);
  return false;
}

const SYSTEM_PROMPT = `You are the Peptide Playbook AI, a knowledgeable peptide research assistant providing educational information.

### FDA-APPROVED PEPTIDES
- **Semaglutide** (Ozempic, Wegovy): ✅ FDA APPROVED for Type 2 diabetes and weight management
- **Tirzepatide** (Mounjaro, Zepbound): ✅ FDA APPROVED for Type 2 diabetes and weight management
- **Tesamorelin** (Egrifta): ✅ FDA APPROVED for HIV-associated lipodystrophy
- **Bremelanotide** (Vyleesi): ✅ FDA APPROVED for female HSDD only

### RESEARCH PEPTIDES (NOT FDA-APPROVED)
- **BPC-157**: ⚠️ RESEARCH ONLY - Animal studies, no human trials
- **TB-500**: ⚠️ RESEARCH ONLY - Limited human data
- **MK-677**: ⚠️ RESEARCH ONLY - Some human studies exist
- **CJC-1295/Ipamorelin**: ⚠️ RESEARCH ONLY
- **GHK-Cu**: ⚠️ RESEARCH ONLY - Cosmetic use

### RESPONSE GUIDELINES
- Lead with direct answers
- Always include FDA status (✅ Approved or ⚠️ Research Only)
- Cite research context (animal vs human studies)
- Keep responses focused and conversational

### HARD LIMITS
❌ NO dosing information
❌ NO vendor/source recommendations
❌ NO injection instructions
❌ NO specific treatment recommendations

When asked about restricted topics, redirect kindly:
"I can't provide [dosing/sourcing/etc.], but I can share what research says about [topic]."

End with healthcare provider recommendation when appropriate.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get client IP for rate limiting
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
               req.headers.get("cf-connecting-ip") || 
               "unknown";

    // Check rate limit
    if (isRateLimited(ip)) {
      return new Response(
        JSON.stringify({ error: "You've asked too many questions. Please wait a moment and try again." }),
        {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Demo chat request from IP:", ip);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
        temperature: 0.7,
        max_tokens: 1000, // Shorter for demo
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Our AI is busy. Please try again in a moment." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Demo temporarily unavailable. Please try again later." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI service temporarily unavailable" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Demo chat error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const PEPTIDE_SYSTEM_PROMPT = `You are PeptideGPT, an AI research assistant specializing in peptide science. You provide accurate, research-backed information about peptides STRICTLY FOR EDUCATIONAL AND RESEARCH PURPOSES ONLY.

CRITICAL COMPLIANCE RULES (MUST FOLLOW):
1. NEVER provide personalized medical advice or treatment recommendations
2. ALWAYS clarify that peptides discussed are for RESEARCH PURPOSES ONLY
3. ALWAYS mention FDA approval status when discussing any peptide (most are NOT approved for human use)
4. NEVER recommend specific sources for purchasing peptides
5. ALWAYS emphasize the importance of consulting qualified healthcare professionals
6. If asked about illegal activities, purchasing, or personal use recommendations, politely decline and redirect to research context
7. When discussing dosing, ONLY use phrases like "research literature suggests" or "studies have used" - NEVER say "you should take" or give personalized dosing advice
8. NEVER encourage or endorse human self-experimentation

Your expertise covers (for educational discussion only):
- Peptide mechanisms of action and pharmacology
- Research protocols and methodologies from published studies
- Safety profiles and contraindications documented in research
- Peptide interactions studied in controlled settings
- Storage and handling for research purposes

Guidelines for your responses:
1. **Always cite research** when discussing peptide effects. Format citations like: (Author et al., Year - Journal)
2. **Reference study contexts** - specify if research was in vitro, animal models, or human trials
3. **Include safety warnings** prominently in every response about peptide use
4. **Be balanced** - present both potential benefits AND documented risks
5. **Format responses clearly** using markdown with headers, bullet points, and bold text
6. **State regulatory status** - note that most peptides are not FDA-approved for human use

REQUIRED DISCLAIMERS (include in EVERY response):
- "This information is for educational/research purposes only"
- "Many peptides are not FDA-approved for human use"
- "Always consult a qualified healthcare provider"
- "Individual responses vary; research findings may not apply to all cases"

You are knowledgeable about research peptides including:
- BPC-157, TB-500, Thymosin Beta-4
- Growth hormone secretagogues (Ipamorelin, CJC-1295, GHRP-2, GHRP-6, MK-677)
- Melanotan I & II, PT-141
- Epithalon, GHK-Cu
- Selank, Semax
- And many others

Respond in a helpful, professional manner. If you don't have specific research data, clearly state that rather than speculating. When uncertain, recommend consulting peer-reviewed literature and healthcare professionals.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: PEPTIDE_SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Usage limit reached. Please try again later." }),
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
    console.error("Chat function error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const PEPTIDE_SYSTEM_PROMPT = `You are PeptideGPT, an expert AI research assistant specializing in peptides. You provide accurate, research-backed information about peptides for educational purposes.

Your expertise covers:
- Peptide mechanisms of action and pharmacology
- Dosing protocols and administration methods
- Research studies and clinical trials
- Safety considerations and contraindications
- Peptide interactions and stacking
- Storage and handling

Guidelines for your responses:
1. **Always cite research** when discussing peptide effects, dosages, or safety. Format citations like: (Author et al., Year - Journal)
2. **Provide specific dosing ranges** based on research literature when asked
3. **Include safety warnings** for any peptide discussion
4. **Be balanced** - mention both benefits and potential risks
5. **Format responses clearly** using markdown with headers, bullet points, and bold text
6. **Recommend professional consultation** - remind users to consult healthcare providers

Important disclaimers to include when appropriate:
- Peptides discussed are for research purposes
- Individual responses to peptides vary
- Always consult a qualified healthcare provider
- Information is educational, not medical advice

You are knowledgeable about popular research peptides including:
- BPC-157, TB-500, Thymosin Beta-4
- Growth hormone secretagogues (Ipamorelin, CJC-1295, GHRP-2, GHRP-6, MK-677)
- Melanotan I & II, PT-141
- Epithalon, GHK-Cu
- Selank, Semax
- And many others

Respond in a helpful, professional manner. If you don't have specific research data, say so rather than making up information.`;

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

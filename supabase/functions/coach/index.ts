import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface Peptide {
  name: string;
  purpose: string;
  dosage: string;
  frequency: string;
  timing: string;
}

interface Protocol {
  name: string;
  peptides: Peptide[];
  currentDay: number;
  currentWeek: number;
  cycleLength: number;
}

interface RequestBody {
  message: string;
  protocol: Protocol | null;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!lovableApiKey) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const { message, protocol }: RequestBody = await req.json();

    // Build context-aware system prompt
    let systemPrompt = `You are a friendly, knowledgeable AI peptide coach. Your role is to:
1. Answer questions about peptides, dosing, timing, reconstitution, and injection techniques
2. Provide accurate, research-backed information
3. Be supportive and encouraging
4. Always recommend consulting a healthcare provider for medical advice
5. Be concise but thorough

IMPORTANT GUIDELINES:
- Never provide medical diagnoses
- Always emphasize safety and proper technique
- Recommend professional guidance for concerning side effects
- Be warm, supportive, and non-judgmental
- Use simple language when possible`;

    if (protocol) {
      systemPrompt += `

USER'S CURRENT PROTOCOL:
- Protocol: ${protocol.name}
- Progress: Day ${protocol.currentDay} of ${protocol.cycleLength * 7} (Week ${protocol.currentWeek})
- Peptides:
${protocol.peptides.map((p: Peptide) => `  • ${p.name}: ${p.dosage} ${p.frequency} - ${p.timing}`).join("\n")}

Use this context to personalize your responses when relevant.`;
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${lovableApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Lovable AI API error:", errorText);
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content || "I'm sorry, I couldn't generate a response.";

    return new Response(
      JSON.stringify({ response: aiResponse }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Coach function error:", errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});

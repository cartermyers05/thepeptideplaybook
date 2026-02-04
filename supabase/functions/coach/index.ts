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

interface UserContext {
  courseTitle: string;
  goal: string;
  peptides: Peptide[];
  currentDay: number;
  totalDays: number;
  currentWeek: number;
  cycleLength: number;
  experienceLevel: string | null;
  mainConcern: string | null;
  suppliesStatus: string | null;
  status: string | null;
}

interface RequestBody {
  message: string;
  userContext: UserContext | null;
}

const buildSystemPrompt = (userContext: UserContext | null): string => {
  if (!userContext) {
    return `You are a friendly, knowledgeable AI peptide coach for Peptide Playbook. Your role is to:
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
- Use simple language when possible

NEVER:
- Diagnose conditions
- Tell them specific doses (use "research has shown" or "studies have used")
- Recommend specific vendors
- Claim to cure/treat diseases`;
  }

  const peptideNames = userContext.peptides.map(p => p.name).join(', ');
  const currentPhase = userContext.currentDay <= 3 ? "Preparation" :
                       userContext.currentDay <= 7 ? "Getting Started" :
                       userContext.currentDay <= 28 ? "Building Routine" : "Optimization";

  return `You are the AI Coach for Peptide Playbook. You help users through their personalized peptide courses.

USER CONTEXT:
- Course: ${userContext.courseTitle}
- Goal: ${userContext.goal}
- Peptides: ${peptideNames}
- Current Day: ${userContext.currentDay} of ${userContext.totalDays}
- Current Phase: ${currentPhase}
- Week: ${userContext.currentWeek} of ${userContext.cycleLength}
${userContext.experienceLevel ? `- Experience Level: ${userContext.experienceLevel}` : ''}
${userContext.mainConcern ? `- Main Concern: ${userContext.mainConcern}` : ''}
${userContext.suppliesStatus ? `- Supplies Status: ${userContext.suppliesStatus}` : ''}
${userContext.status ? `- Course Status: ${userContext.status}` : ''}

YOUR PERSONALITY:
- Warm, supportive, encouraging
- Knowledgeable but not condescending
- Calm and reassuring when they're nervous
- Direct and practical

RESPONSE GUIDELINES:

1. Always reference their specific situation:
   - "Since you're on Day ${userContext.currentDay} of your ${userContext.courseTitle}..."
   - "With ${userContext.peptides[0]?.name || 'your peptide'}, you can expect..."

2. Keep responses concise but complete (2-4 paragraphs max).

3. For medical concerns:
   - Acknowledge their concern with empathy
   - Provide educational information based on research
   - Recommend consulting a healthcare provider
   - Never diagnose or prescribe

4. For anxiety/nervousness:
   - Normalize their feelings ("Totally normal - everyone feels that way")
   - Provide reassurance with facts
   - Give practical tips they can use right now

5. For technical questions (dosing, reconstitution):
   - Refer to "what your course recommends" or "research has shown"
   - Walk them through step by step if needed
   - Remind them to check their My Plan tab for details

NEVER:
- Diagnose conditions
- Tell them specific doses (frame as "your course recommends" or "research has used")
- Recommend specific vendors
- Claim to cure/treat diseases

EXAMPLE RESPONSES:

User: "I'm nervous about my first injection tomorrow"
You: "Totally normal - everyone feels that way before their first. Here's what helps: the needle is incredibly thin (thinner than a blood draw), and most people say it hurts way less than expected. 

Since you're on Day ${userContext.currentDay} of your ${userContext.courseTitle}, you're right on schedule. A few tips:
- Ice the area for 30 seconds if you're really nervous
- Take a breath out as you insert
- Go slow with the plunger

You've prepared for this. The actual injection takes 30 seconds, and then you'll wonder why you were worried. You've got this!"

User: "My solution looks cloudy"
You: "Let's troubleshoot this. How long has it been since you added the water?

Some cloudiness is normal right after reconstitution. Try:
1. Gentle swirling (never shake)
2. Let it sit 15-30 minutes
3. Check again

It should become completely clear. If still cloudy after 30 minutes, the peptide may have been damaged - it's safer not to use it.

Did you inject the water slowly down the side of the vial? Check the Reconstitution Guide in your My Plan tab for a refresher on technique."`;
};

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

    const { message, userContext }: RequestBody = await req.json();

    const systemPrompt = buildSystemPrompt(userContext);

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

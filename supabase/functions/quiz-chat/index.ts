import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface QuizStep {
  id: string;
  question: string;
  validValues: string[];
  valueKey: 'goal' | 'experience' | 'concern' | 'timeline';
  systemPromptAddition: string;
}

const quizSteps: QuizStep[] = [
  {
    id: 'goal',
    question: "What's your main goal with peptides?",
    validValues: ['fat_loss', 'muscle', 'recovery', 'anti_aging', 'cognitive', 'beginner'],
    valueKey: 'goal',
    systemPromptAddition: `Map their response to one of these goals:
      - fat_loss: weight loss, burning fat, metabolism, body composition, losing weight, lean, shredding
      - muscle: building muscle, recovery from workouts, strength, gains, bodybuilding, hypertrophy
      - recovery: injury healing, surgery recovery, pain, tissue repair, tendon, joint, healing
      - anti_aging: longevity, skin, vitality, aging, youthfulness, wrinkles, energy, aging slower
      - cognitive: focus, memory, brain, clarity, mental performance, concentration, thinking
      - beginner: unsure, exploring, don't know, general wellness, not sure, just curious`
  },
  {
    id: 'experience',
    question: "Have you used peptides before?",
    validValues: ['beginner', 'some_experience', 'experienced'],
    valueKey: 'experience',
    systemPromptAddition: `Determine their experience level:
      - beginner: never used, first time, no experience, new to this, haven't tried
      - some_experience: tried once or twice, not confident, some experience, dabbled
      - experienced: multiple cycles, knows basics, regular user, been using, veteran`
  },
  {
    id: 'concern',
    question: "What worries you most about starting?",
    validValues: ['injections', 'dosing', 'side_effects', 'reconstitution', 'nothing'],
    valueKey: 'concern',
    systemPromptAddition: `Identify their main concern:
      - injections: needles, injecting, scared of shots, self-injection, pain
      - dosing: getting dose wrong, too much, too little, calculating, measuring
      - side_effects: worried about effects, reactions, what could happen, safety
      - reconstitution: mixing, preparing, don't want to mess up, waste peptides
      - nothing: confident, no worries, just need a plan, ready to go`
  },
  {
    id: 'timeline',
    question: "When are you thinking of starting?",
    validValues: ['this_week', 'this_month', 'researching'],
    valueKey: 'timeline',
    systemPromptAddition: `Determine their timeline:
      - this_week: ready now, have supplies, starting immediately, this week
      - this_month: soon, within a month, ordering supplies, preparing
      - researching: just learning, not ready yet, still deciding, gathering info`
  }
];

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, currentStep, conversationHistory, extractedValues } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const step = quizSteps[currentStep];
    if (!step) {
      // All steps complete
      return new Response(JSON.stringify({
        response: "Perfect! I've got everything I need. Let me build your personalized course...",
        extracted: null,
        shouldAdvance: true,
        isComplete: true
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    const systemPrompt = `You are a friendly, warm onboarding assistant for Peptide Playbook - an educational peptide course platform. Your job is to have a natural conversation while extracting specific information.

CURRENT STEP: ${step.id} (Step ${currentStep + 1} of ${quizSteps.length})
QUESTION TO EXTRACT: ${step.question}

${step.systemPromptAddition}

CONVERSATION SO FAR:
${conversationHistory.map((m: { role: string; content: string }) => `${m.role}: ${m.content}`).join('\n')}

WHAT WE'VE COLLECTED:
${Object.entries(extractedValues).filter(([_, v]) => v).map(([k, v]) => `- ${k}: ${v}`).join('\n') || 'Nothing yet'}

INSTRUCTIONS:
1. Read their message and determine if it answers the current question
2. If their answer is clear, extract the value and prepare to move to the next question
3. If unclear, ask a friendly clarifying question without being pushy
4. Keep responses conversational (2-3 sentences max), warm, and encouraging
5. Reference their specific words when acknowledging their answer
6. If they go off-topic (asking about vendors, prices, etc.), gently redirect back to the question

NEXT QUESTION (if advancing): ${quizSteps[currentStep + 1]?.question || "None - this is the last step"}

TONE: Friendly, encouraging, knowledgeable but not preachy. Like a helpful friend who knows about peptides.`;

    const tools = [{
      type: "function",
      function: {
        name: "extract_quiz_answer",
        description: "Extract the user's answer and provide a conversational response",
        parameters: {
          type: "object",
          properties: {
            response: {
              type: "string",
              description: "Your warm, conversational reply to the user (2-3 sentences). If advancing, naturally transition to ask the next question."
            },
            extracted_value: {
              type: "string",
              enum: step.validValues,
              description: "The extracted value from their answer, or null if unclear"
            },
            confidence: {
              type: "number",
              description: "Confidence in extraction (0-1). Use 0.7+ if you're fairly sure."
            },
            should_advance: {
              type: "boolean",
              description: "Should we move to the next question? True if we extracted a value with confidence >= 0.7"
            }
          },
          required: ["response", "should_advance"]
        }
      }
    }];

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ],
        tools,
        tool_choice: { type: "function", function: { name: "extract_quiz_answer" } }
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please wait a moment and try again." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      throw new Error("AI service error");
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    
    if (!toolCall) {
      // Fallback if no tool call
      const content = data.choices?.[0]?.message?.content || "I'd love to help! Could you tell me more about what you're looking for?";
      return new Response(JSON.stringify({
        response: content,
        extracted: null,
        shouldAdvance: false,
        isComplete: false
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    const result = JSON.parse(toolCall.function.arguments);
    const isLastStep = currentStep === quizSteps.length - 1;
    const shouldAdvance = result.should_advance && result.confidence >= 0.7;

    return new Response(JSON.stringify({
      response: result.response,
      extracted: result.extracted_value ? {
        key: step.valueKey,
        value: result.extracted_value,
        confidence: result.confidence || 0.8
      } : null,
      shouldAdvance,
      isComplete: isLastStep && shouldAdvance
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("Quiz chat error:", error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : "An unexpected error occurred" 
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});

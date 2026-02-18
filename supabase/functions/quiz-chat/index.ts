import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { checkRateLimit, getClientIP } from "../_shared/rateLimiter.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const MAX_MESSAGE_LENGTH = 500;
const MAX_CONVERSATION_HISTORY = 20;
const MAX_REQUESTS_PER_HOUR = 30;

interface QuizStep {
  id: string;
  question: string;
  validValues: string[];
  valueKey: 'goal' | 'experience' | 'concern' | 'readiness';
  systemPromptAddition: string;
}

const quizSteps: QuizStep[] = [
  {
    id: 'goal',
    question: "What's your main goal?",
    validValues: ['fat_loss', 'muscle', 'recovery', 'anti_aging', 'cognitive', 'beginner'],
    valueKey: 'goal',
    systemPromptAddition: `Map their response to one of these goals:
      - fat_loss: Fat loss & metabolism, weight loss, burning fat, body composition, losing weight, lean, shredding
      - muscle: Muscle building & recovery, strength, gains, bodybuilding, hypertrophy, workout recovery
      - recovery: Healing from injury, surgery recovery, pain, tissue repair, tendon, joint, healing
      - anti_aging: Anti-aging & longevity, skin, vitality, aging, youthfulness, wrinkles, energy
      - cognitive: Cognitive enhancement, focus, memory, brain, clarity, mental performance
      - beginner: Not sure yet, exploring, don't know, general wellness, just curious`
  },
  {
    id: 'experience',
    question: "Have you used peptides before?",
    validValues: ['never', 'researched', 'experienced'],
    valueKey: 'experience',
    systemPromptAddition: `Determine their experience level:
      - never: Never - this would be my first time, no experience, new to this
      - researched: I've researched but never tried, read about them, studied
      - experienced: I've used peptides before, tried them, have experience`
  },
  {
    id: 'concern',
    question: "What's your biggest concern about getting started?",
    validValues: ['injection_fear', 'dosing_confusion', 'peptide_choice', 'side_effects', 'all'],
    valueKey: 'concern',
    systemPromptAddition: `Identify their main concern:
      - injection_fear: I don't know how to inject myself, needles, scared of shots
      - dosing_confusion: I'm confused about dosing/mixing, calculations, measuring
      - peptide_choice: I don't know which peptides to use, overwhelmed by options
      - side_effects: I'm worried about side effects, safety, reactions
      - all: All of the above honestly, everything, multiple concerns`
  },
  {
    id: 'readiness',
    question: "Where are you in your journey?",
    validValues: ['ready_now', 'soon', 'exploring'],
    valueKey: 'readiness',
    systemPromptAddition: `Determine their readiness:
      - ready_now: Ready to start ASAP, have supplies, starting immediately
      - soon: Planning to start in a few weeks, ordering supplies, preparing
      - exploring: Just exploring for now, researching, not ready yet`
  }
];

function buildSystemPrompt(step: QuizStep, currentStep: number, conversationHistory: Array<{role: string; content: string}>, extractedValues: Record<string, string | null>) {
  const goalFriendlyNames: Record<string, string> = {
    fat_loss: "fat loss & metabolism",
    muscle: "muscle building & recovery",
    recovery: "healing from injury",
    anti_aging: "anti-aging & longevity",
    cognitive: "cognitive enhancement",
    beginner: "exploring your options"
  };
  
  const currentGoal = extractedValues.goal;
  const goalFriendly = currentGoal ? goalFriendlyNames[currentGoal] || currentGoal : "";

  return `You are a friendly, warm onboarding assistant for Peptide Playbook - an educational peptide course platform. Your job is to have a natural conversation while extracting specific information.

CURRENT STEP: ${step.id} (Step ${currentStep + 1} of ${quizSteps.length})
QUESTION TO EXTRACT: ${step.question}

${step.systemPromptAddition}

CONVERSATION SO FAR:
${conversationHistory.map((m) => `${m.role}: ${m.content}`).join('\n')}

WHAT WE'VE COLLECTED:
${Object.entries(extractedValues).filter(([_, v]) => v).map(([k, v]) => `- ${k}: ${v}`).join('\n') || 'Nothing yet'}

${currentGoal ? `USER'S GOAL: ${goalFriendly}` : ''}

INSTRUCTIONS:
1. Read their message and determine if it answers the current question
2. If their answer is clear, extract the value and acknowledge warmly before transitioning to the next question
3. If unclear, ask a friendly clarifying question without being pushy
4. Keep responses conversational (2-3 sentences max), warm, and encouraging
5. Reference their specific words when acknowledging their answer
6. If they go off-topic (asking about vendors, prices, etc.), gently redirect back to the question

TRANSITION PHRASES (use naturally based on step):
- After goal: "Got it - {their goal}. Great choice."
- After experience: "I hear you. {Brief acknowledgment}."
- After concern: "Those are exactly the things we'll cover."
- After readiness: "Perfect! Let me build your personalized course..."

NEXT QUESTION (if advancing): ${quizSteps[currentStep + 1]?.question || "None - this is the last step"}

TONE: Warm, supportive, encouraging. Like a helpful friend who knows about peptides. Never preachy or condescending.`;
}

function buildTools(step: QuizStep) {
  return [{
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
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting by IP
    const clientIP = getClientIP(req);
    const rateLimit = checkRateLimit(`quiz-chat:${clientIP}`, MAX_REQUESTS_PER_HOUR, 3600);
    if (!rateLimit.allowed) {
      return new Response(JSON.stringify({ error: "Too many requests. Please try again later." }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    const body = await req.json();
    const { message, currentStep, conversationHistory, extractedValues } = body;

    // Input validation
    if (typeof message !== 'string' || message.length === 0 || message.length > MAX_MESSAGE_LENGTH) {
      return new Response(JSON.stringify({ error: "Invalid message" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    if (typeof currentStep !== 'number' || currentStep < 0 || currentStep > 10) {
      return new Response(JSON.stringify({ error: "Invalid step" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    if (Array.isArray(conversationHistory) && conversationHistory.length > MAX_CONVERSATION_HISTORY) {
      return new Response(JSON.stringify({ error: "Conversation too long" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const step = quizSteps[currentStep];
    if (!step) {
      // All steps complete - stream as SSE for consistency
      const encoder = new TextEncoder();
      const body = new ReadableStream({
        start(controller) {
          const text = "Perfect! I've got everything I need. Those are exactly the things we'll cover. Let me build your personalized course...";
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true, extracted: null, shouldAdvance: true, isComplete: true })}\n\n`));
          controller.close();
        }
      });
      return new Response(body, {
        headers: { ...corsHeaders, "Content-Type": "text/event-stream", "Cache-Control": "no-cache" }
      });
    }

    const systemPrompt = buildSystemPrompt(step, currentStep, conversationHistory, extractedValues);
    const tools = buildTools(step);

    // Make streaming request to AI gateway
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        stream: true,
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

    // Parse the SSE stream from AI gateway, collect tool call args, and forward response text
    const reader = response.body!.getReader();
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();
    let toolCallArgs = "";
    let contentText = "";
    let buffer = "";

    const stream = new ReadableStream({
      async start(controller) {
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              if (!line.startsWith("data: ")) continue;
              const payload = line.slice(6).trim();
              if (payload === "[DONE]") continue;

              try {
                const chunk = JSON.parse(payload);
                const delta = chunk.choices?.[0]?.delta;
                if (!delta) continue;

                // Content text (fallback if model returns content instead of tool call)
                if (delta.content) {
                  contentText += delta.content;
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: delta.content })}\n\n`));
                }

                // Tool call argument deltas
                if (delta.tool_calls?.[0]?.function?.arguments) {
                  toolCallArgs += delta.tool_calls[0].function.arguments;
                }
              } catch {
                // skip malformed chunks
              }
            }
          }

          // Parse completed tool call
          const isLastStep = currentStep === quizSteps.length - 1;
          
          if (toolCallArgs) {
            try {
              const result = JSON.parse(toolCallArgs);
              const shouldAdvance = result.should_advance && (result.confidence || 0) >= 0.7;

              // If we got a tool call with response text but didn't stream content, send it now
              if (result.response && !contentText) {
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: result.response })}\n\n`));
              }

              controller.enqueue(encoder.encode(`data: ${JSON.stringify({
                done: true,
                extracted: result.extracted_value ? {
                  key: step.valueKey,
                  value: result.extracted_value,
                  confidence: result.confidence || 0.8
                } : null,
                shouldAdvance,
                isComplete: isLastStep && shouldAdvance
              })}\n\n`));
            } catch (e) {
              console.error("Failed to parse tool call args:", toolCallArgs, e);
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({
                done: true,
                extracted: null,
                shouldAdvance: false,
                isComplete: false
              })}\n\n`));
            }
          } else if (contentText) {
            // No tool call, just content - send done with no extraction
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({
              done: true,
              extracted: null,
              shouldAdvance: false,
              isComplete: false
            })}\n\n`));
          } else {
            // Nothing received - send fallback
            const fallback = "I'd love to help! Could you tell me more about what you're looking for?";
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: fallback })}\n\n`));
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({
              done: true,
              extracted: null,
              shouldAdvance: false,
              isComplete: false
            })}\n\n`));
          }

          controller.close();
        } catch (e) {
          console.error("Stream processing error:", e);
          controller.error(e);
        }
      }
    });

    return new Response(stream, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      }
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

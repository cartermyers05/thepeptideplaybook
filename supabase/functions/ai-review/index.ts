import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import {
  CORE_IDENTITY,
  corsHeaders,
  callLovableAI,
  handleAIError,
  errorResponse,
  validateResponse,
  BANNED_WORDS,
} from "../_shared/ai-engine.ts";

const REVIEW_PROMPT = `You are a content quality reviewer for Peptide Playbook. Your job is to analyze content for scientific accuracy, safety compliance, tone consistency, and evidence standards.

${CORE_IDENTITY}

## YOUR TASK

Review the provided content and return a JSON analysis using the review_content tool. Score it 0-100 and list any issues found.

Check for:
1. **Scientific accuracy**: Are claims supported by evidence? Are studies cited correctly?
2. **Safety compliance**: Are disclaimers present? No prescriptive language? No "you should take X"?
3. **Tone consistency**: Does it match the Peptide Playbook voice? (warm, direct, evidence-based)
4. **Evidence ratings**: Are star ratings (⭐) used correctly when discussing evidence levels?
5. **Legal status accuracy**: Is the 2026 FDA status correct for all mentioned peptides?
6. **Banned words**: Does it contain any of these words: ${BANNED_WORDS.join(", ")}?
7. **Language framing**: Does it use "research protocols typically use..." instead of "you should take..."?`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { content, content_type, context } = await req.json();

    if (!content || !content_type) {
      return errorResponse("Missing required fields: content, content_type", 400);
    }

    // Run local validation first
    const localIssues = validateResponse(content);

    const tools = [{
      type: "function",
      function: {
        name: "review_content",
        description: "Return the content review analysis",
        parameters: {
          type: "object",
          properties: {
            score: {
              type: "number",
              description: "Quality score 0-100"
            },
            issues: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  type: { type: "string", enum: ["accuracy", "safety", "tone", "evidence", "legal", "banned_word", "language"] },
                  severity: { type: "string", enum: ["info", "warning", "error"] },
                  description: { type: "string" },
                  suggestion: { type: "string" },
                },
                required: ["type", "severity", "description", "suggestion"]
              }
            },
            summary: {
              type: "string",
              description: "Brief summary of the review"
            }
          },
          required: ["score", "issues", "summary"]
        }
      }
    }];

    const { response, ok } = await callLovableAI({
      messages: [
        { role: "system", content: REVIEW_PROMPT },
        { role: "user", content: `Review this ${content_type} content:\n\n${content}${context ? `\n\nAdditional context: ${JSON.stringify(context)}` : ""}` },
      ],
      model: "google/gemini-2.5-flash",
      tools,
      toolChoice: { type: "function", function: { name: "review_content" } },
      maxTokens: 2000,
    });

    if (!ok) {
      const errResp = handleAIError(response);
      if (errResp) return errResp;
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];

    if (!toolCall) {
      return new Response(
        JSON.stringify({
          score: 50,
          issues: localIssues.map(i => ({ ...i, type: i.type })),
          summary: "AI review unavailable, showing local validation only.",
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const result = JSON.parse(toolCall.function.arguments);

    // Merge local issues
    const allIssues = [
      ...result.issues,
      ...localIssues.filter(li =>
        !result.issues.some((ri: any) => ri.type === li.type && ri.description === li.description)
      ),
    ];

    return new Response(
      JSON.stringify({
        score: result.score,
        issues: allIssues,
        summary: result.summary,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("AI Review error:", error);
    return errorResponse("Failed to review content");
  }
});

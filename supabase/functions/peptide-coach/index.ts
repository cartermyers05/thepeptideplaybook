import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import {
  CORE_IDENTITY,
  corsHeaders,
  callLovableAI,
  handleAIError,
  errorResponse,
  validateAuthAndTier,
  validateResponse,
} from "../_shared/ai-engine.ts";

const COACH_ADDITIONS = `

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

Keep responses concise (2-4 paragraphs max unless detail needed). End with an action step.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authResult = await validateAuthAndTier(req);
    if (authResult instanceof Response) return authResult;

    const { userId } = authResult;
    const { message, history, profile, active_protocol, recent_logs } = await req.json();

    // Build context injection
    const contextParts: string[] = [];
    if (profile) contextParts.push(`USER PROFILE: ${JSON.stringify(profile)}`);
    if (active_protocol) contextParts.push(`ACTIVE PROTOCOL: ${JSON.stringify(active_protocol)}`);
    else contextParts.push(`ACTIVE PROTOCOL: None`);
    if (recent_logs?.length) contextParts.push(`RECENT LOGS (last 7 days): ${JSON.stringify(recent_logs)}`);

    // Build messages array
    const apiMessages: { role: string; content: string }[] = [
      { role: "system", content: CORE_IDENTITY + COACH_ADDITIONS },
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

    // Stream the response
    const { response, ok } = await callLovableAI({
      messages: apiMessages,
      stream: true,
      maxTokens: 3000,
    });

    if (!ok) {
      const errResp = handleAIError(response);
      if (errResp) return errResp;
      const errorText = await response.text();
      console.error("AI API error:", errorText);
      throw new Error(`API error: ${response.status}`);
    }

    // Return SSE stream directly
    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Coach error:", error);
    return errorResponse("I'm having trouble connecting right now. Try again in a moment.");
  }
});

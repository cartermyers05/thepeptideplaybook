import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import {
  CORE_IDENTITY,
  corsHeaders,
  callLovableAI,
  handleAIError,
  errorResponse,
  validateAuthAndTier,
  validateResponse,
} from "../_shared/ai-engine.ts";

// ═══════════════════════════════════════════════════════════
// COACH-SPECIFIC SYSTEM PROMPT
// ═══════════════════════════════════════════════════════════

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

Keep responses concise (2-4 paragraphs max unless detail needed). End with an action step.

═══════════════════════════════════════════════════════════
PROTOCOL CREATION QUESTIONNAIRE
═══════════════════════════════════════════════════════════

When a user asks to build, create, make, or set up a protocol, you MUST gather ALL of the following information BEFORE calling the create_protocol tool:

**1. HEALTH GOALS (required)** - Primary goal, secondary goals, specific outcomes
**2. CURRENT HEALTH STATUS (required)** - Age, conditions, medications, injuries
**3. EXPERIENCE LEVEL (required)** - Prior peptide use, injection comfort
**4. PREFERENCES & CONSTRAINTS (required)** - Admin method, budget, schedule

⚠️ DO NOT call create_protocol until you have gathered information from ALL 4 categories above.

═══════════════════════════════════════════════════════════
PROTOCOL CREATION - MAKE IT TRULY PERSONAL
═══════════════════════════════════════════════════════════

You have a tool called "create_protocol" that saves personalized protocols to the user's account.

**WHEN TO USE THIS TOOL:**
When a user explicitly asks you to "create", "build", "make", "set up", or "save" a protocol AND you have gathered all required information.

**AFTER PROTOCOL CREATION - FORMATTED OUTPUT:**
Once created successfully, present with: Protocol Name, Goal, Duration, Peptides (with purpose, dosage, frequency, timing, admin, rationale), Safety Info, and Getting Started steps.

View and manage your protocol: [View Your Protocol →](/dashboard/protocol)

═══════════════════════════════════════════════════════════
PROTOCOL CREATION - RICH DATA REQUIREMENTS
═══════════════════════════════════════════════════════════

When calling create_protocol, you MUST populate ALL of the following with real, specific, personalized data:

1. **risk_assessment**: A personalized safety summary that mentions the user's specific age, health conditions, medications, and how they interact with the selected compounds. NOT generic disclaimers.

2. **doctor_script**: A complete doctor conversation kit:
   - opening_line: A word-for-word sentence the user can say
   - studies_to_reference: 2-4 real published studies with journal, year, and key finding
   - questions_to_ask: 3-5 specific questions tailored to this protocol

3. **weekly_expectations**: Every week must reference the ACTUAL compounds and expected physiological changes.

4. **Per-peptide fields** (ALL required for every peptide):
   - mechanism: Plain-English explanation of how this compound works biologically
   - side_effects: Specific to this compound with onset/resolution timeline
   - storage: Specific handling instructions with temperature and expiration

⚠️ DO NOT leave side_effects, storage, or mechanism empty. Each must be specific to the actual compound.`;

// ═══════════════════════════════════════════════════════════
// TOOL DEFINITIONS
// ═══════════════════════════════════════════════════════════

const tools = [
  {
    type: "function",
    function: {
      name: "create_protocol",
      description: "Create and save a highly personalized peptide protocol. You MUST populate ALL fields including risk_assessment, doctor_script, weekly_expectations with compound-specific details, and per-peptide side_effects/storage/mechanism.",
      parameters: {
        type: "object",
        properties: {
          goal: { type: "string", description: "The user's primary goal in their own words" },
          secondary_goals: { type: "array", items: { type: "string" }, description: "Additional goals" },
          user_context: { type: "string", description: "Relevant context: age, concerns, injuries, medications" },
          experience_level: { type: "string", enum: ["beginner", "intermediate", "advanced"] },
          constraints: { type: "array", items: { type: "string" }, description: "User's constraints or preferences" },
          protocol_name: { type: "string", description: "A descriptive, personalized name for this protocol" },
          cycle_length_weeks: { type: "number", description: "Duration in weeks (typically 4-12)" },
          risk_assessment: { type: "string", description: "Personalized safety summary referencing the user's specific health context, conditions, medications, and compound interactions. Must be specific, not generic." },
          doctor_script: {
            type: "object",
            description: "A word-for-word script the user can bring to their doctor",
            properties: {
              opening_line: { type: "string", description: "Exact opening sentence to say to the doctor" },
              studies_to_reference: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    title: { type: "string" },
                    journal: { type: "string" },
                    year: { type: "string" },
                    key_finding: { type: "string" },
                  },
                  required: ["title", "journal", "year", "key_finding"]
                },
                description: "2-4 real studies to mention"
              },
              questions_to_ask: {
                type: "array",
                items: { type: "string" },
                description: "3-5 specific questions to ask the doctor"
              },
            },
            required: ["opening_line", "studies_to_reference", "questions_to_ask"]
          },
          weekly_expectations: {
            type: "array",
            items: {
              type: "object",
              properties: {
                week: { type: "number" },
                description: { type: "string", description: "Compound-specific expectation for this week referencing the actual peptides and their pharmacokinetics" },
              },
              required: ["week", "description"]
            },
            description: "Week-by-week expectations specific to the actual compounds selected."
          },
          peptides: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                purpose: { type: "string" },
                dosage: { type: "string" },
                frequency: { type: "string" },
                timing: { type: "string" },
                site: { type: "string" },
                rationale: { type: "string" },
                mechanism: { type: "string", description: "Plain-English explanation of how this compound works at the biological level" },
                side_effects: { type: "string", description: "Common side effects specific to this compound with typical onset/resolution timeline" },
                storage: { type: "string", description: "Storage and handling instructions including temperature, reconstitution stability, and expiration" },
              },
              required: ["name", "purpose", "dosage", "frequency", "timing", "rationale", "mechanism", "side_effects", "storage"]
            },
          },
          notes: { type: "string", description: "Personalized notes for this user" },
        },
        required: ["goal", "protocol_name", "peptides", "cycle_length_weeks", "experience_level", "risk_assessment", "doctor_script", "weekly_expectations"]
      }
    }
  }
];

// ═══════════════════════════════════════════════════════════
// TOOL HANDLER (dual-write to protocols + user_protocols)
// ═══════════════════════════════════════════════════════════

async function handleToolCall(
  toolCall: { function: { name: string; arguments: string } },
  userId: string,
  supabaseServiceRole: ReturnType<typeof createClient>
): Promise<{ success: boolean; message: string; protocolId?: string }> {
  if (toolCall.function.name !== "create_protocol") {
    return { success: false, message: "Unknown tool" };
  }

  try {
    const args = JSON.parse(toolCall.function.arguments);

    // Write to protocols table
    const { data, error } = await supabaseServiceRole
      .from("protocols")
      .insert({
        user_id: userId,
        goal: args.goal,
        secondary_goals: args.secondary_goals || [],
        user_context: args.user_context || null,
        experience_level: args.experience_level || "beginner",
        constraints: args.constraints || [],
        protocol_name: args.protocol_name,
        peptides: args.peptides,
        cycle_length_weeks: args.cycle_length_weeks,
        notes: args.notes || null,
        status: "not_started",
        current_day: 0,
        current_week: 1,
      })
      .select()
      .single();

    if (error) {
      console.error("Failed to create protocol:", error);
      return { success: false, message: `Failed to save protocol: ${error.message}` };
    }

    // Dual-write to user_protocols (the table the dashboard reads)
    try {
      const compounds = (args.peptides || []).map((p: any) => ({
        name: p.name,
        description: p.purpose || "",
        dose: p.dosage || "",
        frequency: p.frequency || "",
        timing: p.timing || "",
        route: p.site || "Subcutaneous",
        category: args.goal || "general",
        side_effects: p.side_effects || "",
        storage: p.storage || "",
        rationale: p.rationale || "",
        mechanism: p.mechanism || "",
      }));

      const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
      const schedule: Record<string, string[]> = {};
      dayNames.forEach(d => schedule[d] = []);

      for (const compound of compounds) {
        const freq = (compound.frequency || "").toLowerCase();
        if (freq.includes("daily") || freq.includes("every day") || freq.includes("twice daily") || freq.includes("2x daily")) {
          dayNames.forEach(d => schedule[d].push(compound.name));
        } else if (freq.includes("3x") || freq.includes("three times") || freq.includes("3 times")) {
          ["Monday", "Wednesday", "Friday"].forEach(d => schedule[d].push(compound.name));
        } else if (freq.includes("twice weekly") || freq.includes("2x week") || freq.includes("2x per week")) {
          ["Monday", "Thursday"].forEach(d => schedule[d].push(compound.name));
        } else if (freq.includes("once weekly") || freq.includes("1x") || freq.includes("weekly")) {
          schedule["Monday"].push(compound.name);
        } else {
          dayNames.forEach(d => schedule[d].push(compound.name));
        }
      }

      const weeks = args.cycle_length_weeks || 8;
      const weeklyExpectations = args.weekly_expectations && args.weekly_expectations.length > 0
        ? args.weekly_expectations
        : Array.from({ length: weeks }, (_, i) => ({ week: i + 1, description: `Week ${i + 1}` }));

      const today = new Date().toISOString().split("T")[0];

      // Deactivate existing active protocols
      await supabaseServiceRole
        .from("user_protocols")
        .update({ status: "completed" })
        .eq("user_id", userId)
        .eq("status", "active");

      await supabaseServiceRole
        .from("user_protocols")
        .insert({
          user_id: userId,
          protocol_name: args.protocol_name,
          compounds,
          schedule,
          cycle_length_weeks: weeks,
          status: "active",
          start_date: today,
          weekly_expectations: weeklyExpectations,
          risk_assessment: args.risk_assessment || null,
          doctor_script: args.doctor_script || null,
          ai_generation_context: args.notes || args.goal || null,
        });

      console.log("Successfully dual-wrote protocol to user_protocols");
    } catch (dualWriteErr) {
      console.error("Dual-write to user_protocols failed (non-fatal):", dualWriteErr);
    }

    // Mark onboarding complete
    try {
      await supabaseServiceRole
        .from("user_profiles")
        .update({ onboarding_complete: true })
        .eq("user_id", userId);
    } catch (e) {
      console.error("Failed to mark onboarding complete:", e);
    }

    return { success: true, message: `Protocol "${args.protocol_name}" created successfully!`, protocolId: data.id };
  } catch (e) {
    console.error("Error in create_protocol:", e);
    return { success: false, message: "Failed to parse protocol data" };
  }
}

// ═══════════════════════════════════════════════════════════
// MAIN HANDLER
// ═══════════════════════════════════════════════════════════

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authResult = await validateAuthAndTier(req);
    if (authResult instanceof Response) return authResult;

    const { userId, supabaseServiceRole } = authResult;
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

    // First API call - non-streaming to check for tool calls
    const { response, ok } = await callLovableAI({
      messages: apiMessages,
      tools,
      toolChoice: "auto",
      maxTokens: 3000,
    });

    if (!ok) {
      const errResp = handleAIError(response);
      if (errResp) return errResp;
      const errorText = await response.text();
      console.error("AI API error:", errorText);
      throw new Error(`API error: ${response.status}`);
    }

    const aiResponse = await response.json();
    const assistantMessage = aiResponse.choices?.[0]?.message;

    // Handle tool calls (two-pass)
    if (assistantMessage?.tool_calls && assistantMessage.tool_calls.length > 0) {
      const toolResults = [];
      let protocolCreated = false;

      for (const toolCall of assistantMessage.tool_calls) {
        const result = await handleToolCall(toolCall, userId, supabaseServiceRole);
        if (result.success && result.protocolId) protocolCreated = true;
        toolResults.push({
          tool_call_id: toolCall.id,
          role: "tool",
          content: JSON.stringify(result),
        });
      }

      // Follow-up streaming call with tool results
      const followUpMessages = [
        ...apiMessages.slice(0, -1), // system + history
        apiMessages[apiMessages.length - 1], // user message
        assistantMessage,
        ...toolResults,
      ];

      const { response: followUpResponse, ok: followUpOk } = await callLovableAI({
        messages: followUpMessages,
        stream: true,
        maxTokens: 3000,
      });

      if (!followUpOk) {
        const errorText = await followUpResponse.text();
        console.error("Follow-up AI error:", followUpResponse.status, errorText);
        throw new Error(`Follow-up API error: ${followUpResponse.status}`);
      }

      const responseHeaders: Record<string, string> = {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "Access-Control-Expose-Headers": "X-Protocol-Created",
      };
      if (protocolCreated) responseHeaders["X-Protocol-Created"] = "true";

      return new Response(followUpResponse.body, { headers: responseHeaders });
    }

    // No tool calls - make a streaming call
    const { response: streamResponse, ok: streamOk } = await callLovableAI({
      messages: apiMessages,
      stream: true,
      maxTokens: 3000,
    });

    if (!streamOk) {
      const errResp = handleAIError(streamResponse);
      if (errResp) return errResp;
      const errorText = await streamResponse.text();
      console.error("AI stream error:", errorText);
      throw new Error(`Stream API error: ${streamResponse.status}`);
    }

    return new Response(streamResponse.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Coach error:", error);
    return errorResponse("I'm having trouble connecting right now. Try again in a moment.");
  }
});

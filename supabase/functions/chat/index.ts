import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import {
  CORE_IDENTITY,
  corsHeaders,
  callLovableAI,
  handleAIError,
  errorResponse,
  unauthorizedResponse,
  getPeptideContext,
  getQuizContext,
  getUserPersonalContext,
  formatUserPersonalContext,
  formatPeptideDatabase,
} from "../_shared/ai-engine.ts";

// ═══════════════════════════════════════════════════════════
// CHAT-SPECIFIC SYSTEM PROMPT ADDITIONS
// ═══════════════════════════════════════════════════════════

function buildChatSystemPrompt(peptideDatabase: string): string {
  return CORE_IDENTITY + `

## HOW TO RESPOND

### For every peptide question, structure your response like this:

1. **Direct answer first** — don't bury the lead. Answer the question in the first sentence.

2. **Evidence basis** — cite specific research:
   - "A 2023 study in [Journal Name] with [X] participants found that..."
   - "Multiple studies (Smith et al., 2022; Jones et al., 2023) show..."
   - Use real journal names: Journal of Clinical Endocrinology, Peptides, Growth Hormone & IGF Research, etc.
   - Include sample sizes when relevant
   - Rate evidence strength

3. **Practical context** — what this means for the user:
   - Typical dosing ranges reported in literature (always add "as reported in clinical studies — your doctor should determine your specific dose")
   - Common side effects from studies
   - Drug interactions flagged in research
   - Legal/availability status as of 2026

4. **Doctor talking point** — end with a specific question or talking point they can bring to their healthcare provider:
   - "When you talk to your doctor, you might ask: '[specific question]'"

${peptideDatabase}

═══════════════════════════════════════════════════════════
DELIVERY METHOD GUIDANCE
═══════════════════════════════════════════════════════════

When a peptide has multiple delivery methods (topical, oral, subcutaneous, intranasal), ALWAYS present all available options and note which has the lowest barrier to entry. For example, GHK-Cu should always mention topical serums as an option alongside injectable. Default to recommending the least invasive option first.

═══════════════════════════════════════════════════════════
AESTHETICS & LOOKSMAXXING PROTOCOLS
═══════════════════════════════════════════════════════════

"Looksmaxxing" is a term used in fitness/wellness communities for optimizing physical appearance. When users mention looksmaxxing, aesthetics, or wanting to "look better," identify which specific sub-goals apply:

**SKIN QUALITY**
- Concerns: wrinkles, skin texture, collagen, elasticity, wound healing, scars
- Key Peptides:
  • GHK-Cu (Copper Tripeptide-1) - Research shows 55.8% wrinkle reduction vs control
    - Topical: 2-4% concentration, daily application (lowest barrier to entry)
    - Injectable: 1-2mg daily subcutaneous
    - Modulates 4,000+ genes involved in tissue repair
  • BPC-157 - May accelerate wound healing, scar reduction
  • TB-500 - Supports tissue regeneration

**HAIR GROWTH / HAIR LOSS**
- Key Peptides:
  • GHK-Cu - Stimulates hair follicle cells, increases follicle size (topical scalp application or microneedling)
  • PTD-DBM / Thymosin β4 - Early research on hair follicle stem cells

**TANNING / SKIN COLOR**
- Key Peptides:
  • Melanotan 2 (MT-2) - Melanocortin receptor agonist
    - ⚠️ NOT FDA-approved, significant side effects (nausea, new moles, priapism)
    - Always warn users about risks
  • Melanotan 1 (Afamelanotide) - FDA-approved for erythropoietic protoporphyria only

**BODY COMPOSITION (Lean Look)**
- Key Peptides:
  • Semaglutide/Tirzepatide - GLP-1 agonists for appetite control, fat loss
  • AOD-9604 / Fragment 176-191 - HGH fragments targeting fat metabolism
  • Tesamorelin - FDA-approved for HIV lipodystrophy, reduces visceral fat

**ANTI-AGING / YOUTHFUL APPEARANCE**
- Key Peptides:
  • GHK-Cu - Reverses gene expression associated with aging
  • Epitalon - Telomere-related research (early/theoretical)
  • Ipamorelin + CJC-1295 - GH secretagogues for skin, recovery, body composition

**FACIAL AESTHETICS (Jawline, Structure)**
- Reality check: Peptides cannot change bone structure or jaw shape
- What peptides CAN do: improve skin quality, reduce facial fat, enhance overall appearance

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
CRITICAL REMINDER
═══════════════════════════════════════════════════════════

You are the core value of this product. Users are paying specifically to get detailed answers about peptides — protocols, dosing, comparisons, and research.

DO NOT refuse to provide:
- Educational dosing information from research
- Protocol suggestions based on goals
- Reconstitution calculations

The disclaimer "Educational purposes only. Consult a healthcare provider." at the end of responses is sufficient.

Be helpful. Be informative. Cite real studies. Be the best evidence-based peptide research AI in the world.`;
}

// ═══════════════════════════════════════════════════════════
// TOOL DEFINITIONS
// ═══════════════════════════════════════════════════════════

const tools = [
  {
    type: "function",
    function: {
      name: "create_protocol",
      description: "Create and save a highly personalized peptide protocol based on the user's specific goals, context, and constraints.",
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
              },
              required: ["name", "purpose", "dosage", "frequency", "timing", "rationale"]
            },
          },
          notes: { type: "string", description: "Personalized notes for this user" },
        },
        required: ["goal", "protocol_name", "peptides", "cycle_length_weeks", "experience_level"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "get_user_progress",
      description: "Retrieve the user's recent check-in data and protocol progress for personalized feedback.",
      parameters: {
        type: "object",
        properties: {
          days: { type: "number", description: "Number of days of history (default 14, max 30)" }
        }
      }
    }
  }
];

// ═══════════════════════════════════════════════════════════
// TOOL HANDLERS
// ═══════════════════════════════════════════════════════════

async function handleToolCall(
  toolCall: { function: { name: string; arguments: string } },
  userId: string,
  supabaseServiceRole: ReturnType<typeof createClient>
): Promise<{ success: boolean; message: string; protocolId?: string; data?: any }> {

  if (toolCall.function.name === "get_user_progress") {
    try {
      const args = JSON.parse(toolCall.function.arguments);
      const days = Math.min(args.days || 14, 30);
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      const { data: checkIns } = await supabaseServiceRole
        .from("check_ins")
        .select("*")
        .eq("user_id", userId)
        .gte("date", startDate.toISOString().split('T')[0])
        .order("date", { ascending: false });

      const { data: protocol } = await supabaseServiceRole
        .from("protocols")
        .select("*")
        .eq("user_id", userId)
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      const energyLevels = checkIns?.filter(c => c.energy_level != null).map(c => c.energy_level) || [];
      const moodLevels = checkIns?.filter(c => c.mood != null).map(c => c.mood) || [];
      const sleepLevels = checkIns?.filter(c => c.sleep_quality != null).map(c => c.sleep_quality) || [];

      const avg = (arr: number[]) => arr.length > 0 ? (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1) : null;

      const sideEffectCounts: Record<string, number> = {};
      checkIns?.forEach(c => {
        (c.side_effects || []).forEach((effect: string) => {
          if (effect && effect !== "None") sideEffectCounts[effect] = (sideEffectCounts[effect] || 0) + 1;
        });
      });

      const adherenceYes = checkIns?.filter(c => c.adherence === "yes" || c.injection_done === "yes").length || 0;
      const totalCheckIns = checkIns?.length || 0;

      return {
        success: true,
        message: `Retrieved ${totalCheckIns} check-ins from the last ${days} days`,
        data: {
          checkInCount: totalCheckIns,
          daysAnalyzed: days,
          averages: { energy: avg(energyLevels), mood: avg(moodLevels), sleep: avg(sleepLevels) },
          sideEffects: Object.entries(sideEffectCounts).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([effect, count]) => ({ effect, count })),
          adherenceRate: totalCheckIns > 0 ? Math.round((adherenceYes / totalCheckIns) * 100) : null,
          currentProtocol: protocol ? { name: protocol.protocol_name, status: protocol.status, currentWeek: protocol.current_week, cycleLength: protocol.cycle_length_weeks, peptides: protocol.peptides } : null,
          recentNotes: checkIns?.filter(c => c.notes).slice(0, 3).map(c => c.notes) || [],
        },
      };
    } catch (e) {
      console.error("Error in get_user_progress:", e);
      return { success: false, message: "Failed to fetch progress data" };
    }
  }

  if (toolCall.function.name === "create_protocol") {
    try {
      const args = JSON.parse(toolCall.function.arguments);
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

      // === DUAL-WRITE: Also insert into user_protocols (the table the dashboard reads) ===
      try {
        const compounds = (args.peptides || []).map((p: any) => ({
          name: p.name,
          description: p.purpose || "",
          dose: p.dosage || "",
          frequency: p.frequency || "",
          timing: p.timing || "",
          route: p.site || "Subcutaneous",
          category: args.goal || "general",
          side_effects: "",
          storage: "",
          rationale: p.rationale || "",
        }));

        // Build schedule from frequency data
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
            // Default: add to all days
            dayNames.forEach(d => schedule[d].push(compound.name));
          }
        }

        // Generate weekly expectations
        const weeks = args.cycle_length_weeks || 8;
        const weeklyExpectations = [];
        for (let w = 1; w <= weeks; w++) {
          if (w === 1) weeklyExpectations.push({ week: w, description: "Starting phase — begin at recommended doses. Monitor for any side effects." });
          else if (w === 2) weeklyExpectations.push({ week: w, description: "Adjustment phase — your body is adapting. Minor side effects may appear and typically resolve." });
          else if (w <= Math.floor(weeks / 2)) weeklyExpectations.push({ week: w, description: "Building phase — compounds reaching steady state. Early benefits may begin." });
          else if (w <= weeks - 1) weeklyExpectations.push({ week: w, description: "Optimization phase — peak benefits expected. Monitor progress and adjust if needed." });
          else weeklyExpectations.push({ week: w, description: "Final week — assess results, plan next steps with your healthcare provider." });
        }

        const today = new Date().toISOString().split("T")[0];

        // Deactivate any existing active protocols
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
            ai_generation_context: args.notes || args.goal || null,
          });

        console.log("Successfully dual-wrote protocol to user_protocols");
      } catch (dualWriteErr) {
        console.error("Dual-write to user_protocols failed (non-fatal):", dualWriteErr);
      }

      return { success: true, message: `Protocol "${args.protocol_name}" created successfully!`, protocolId: data.id };
    } catch (e) {
      console.error("Error in create_protocol:", e);
      return { success: false, message: "Failed to parse protocol data" };
    }
  }

  return { success: false, message: "Unknown tool" };
}

// ═══════════════════════════════════════════════════════════
// MAIN HANDLER
// ═══════════════════════════════════════════════════════════

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate auth
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return unauthorizedResponse("Missing authorization header");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });

    const supabaseServiceRole = createClient(supabaseUrl, supabaseServiceRoleKey);

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return unauthorizedResponse("Invalid token");
    }

    const userId = user.id;

    // Check tier
    const { data: profile } = await supabase
      .from("profiles")
      .select("tier")
      .eq("user_id", userId)
      .single();

    if (!profile || profile.tier === "free") {
      return errorResponse("Upgrade required - Chat is available for paid members only", 402);
    }

    const { messages } = await req.json();

    // Fetch dynamic context in parallel
    const [peptideContext, userPersonalContext, quizContext] = await Promise.all([
      getPeptideContext(supabaseServiceRole),
      getUserPersonalContext(supabaseServiceRole, userId),
      getQuizContext(supabaseServiceRole, userId),
    ]);

    let peptideDatabase = "";
    if (peptideContext?.peptides) {
      peptideDatabase = formatPeptideDatabase(peptideContext.peptides, peptideContext.landmarkStudies || null);
    } else {
      peptideDatabase = "Database temporarily unavailable. Please provide general peptide information based on your training.";
    }

    const personalContextPrompt = formatUserPersonalContext(userPersonalContext);
    const SYSTEM_PROMPT = quizContext + buildChatSystemPrompt(peptideDatabase) + personalContextPrompt;

    // First API call - may include tool calls
    const { response, ok } = await callLovableAI({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages,
      ],
      tools,
      toolChoice: "auto",
    });

    if (!ok) {
      const errResp = handleAIError(response);
      if (errResp) return errResp;
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return errorResponse("AI service temporarily unavailable");
    }

    const aiResponse = await response.json();
    const assistantMessage = aiResponse.choices?.[0]?.message;

    // Handle tool calls
    if (assistantMessage?.tool_calls && assistantMessage.tool_calls.length > 0) {
      const toolResults = [];
      for (const toolCall of assistantMessage.tool_calls) {
        const result = await handleToolCall(toolCall, userId, supabaseServiceRole);
        toolResults.push({
          tool_call_id: toolCall.id,
          role: "tool",
          content: JSON.stringify(result),
        });
      }

      const followUpMessages = [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages,
        assistantMessage,
        ...toolResults,
      ];

      const { response: followUpResponse, ok: followUpOk } = await callLovableAI({
        messages: followUpMessages,
        stream: true,
      });

      if (!followUpOk) {
        const errorText = await followUpResponse.text();
        console.error("Follow-up AI error:", followUpResponse.status, errorText);
        return errorResponse("AI service temporarily unavailable");
      }

      const protocolCreated = toolResults.some(r => {
        try { const c = JSON.parse(r.content); return c.success && c.protocolId; } catch { return false; }
      });

      const responseHeaders: Record<string, string> = { ...corsHeaders, "Content-Type": "text/event-stream" };
      if (protocolCreated) responseHeaders["X-Protocol-Created"] = "true";

      return new Response(followUpResponse.body, { headers: responseHeaders });
    }

    // No tool calls - reuse the first response content as a synthetic SSE stream
    // This eliminates the redundant second API call
    if (assistantMessage?.content) {
      const sseContent = `data: ${JSON.stringify({
        choices: [{ delta: { content: assistantMessage.content } }]
      })}\n\ndata: [DONE]\n\n`;

      return new Response(sseContent, {
        headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
      });
    }

    // Fallback: only make a streaming call if the first response was empty
    const { response: streamResponse, ok: streamOk } = await callLovableAI({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages,
      ],
      stream: true,
    });

    if (!streamOk) {
      const errorText = await streamResponse.text();
      console.error("AI gateway error:", streamResponse.status, errorText);
      return errorResponse("AI service temporarily unavailable");
    }

    return new Response(streamResponse.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat function error:", error);
    return errorResponse(error instanceof Error ? error.message : "Unknown error");
  }
});

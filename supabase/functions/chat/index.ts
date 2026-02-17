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

Be helpful. Be informative. Cite real studies. Be the best evidence-based peptide research AI in the world.

═══════════════════════════════════════════════════════════
PROTOCOL CREATION - RICH DATA REQUIREMENTS
═══════════════════════════════════════════════════════════

When calling create_protocol, you MUST populate ALL of the following with real, specific, personalized data:

1. **risk_assessment**: A personalized safety summary that mentions the user's specific age, health conditions, medications, and how they interact with the selected compounds. NOT generic disclaimers.

2. **doctor_script**: A complete doctor conversation kit:
   - opening_line: A word-for-word sentence the user can say, e.g. "I've been researching BPC-157 for tendon recovery..."
   - studies_to_reference: 2-4 real published studies with journal, year, and key finding
   - questions_to_ask: 3-5 specific questions tailored to this protocol

3. **weekly_expectations**: Every week must reference the ACTUAL compounds and expected physiological changes. Example: "Week 2: BPC-157 begins upregulating growth factors — you may notice reduced inflammation at the injury site. GHK-Cu is stimulating collagen synthesis."

4. **Per-peptide fields** (ALL required for every peptide):
   - mechanism: Plain-English explanation (e.g. "BPC-157 upregulates growth hormone receptors and accelerates angiogenesis in damaged tissue")
   - side_effects: Specific to this compound with onset/resolution (e.g. "Mild nausea in first 2-3 days, typically resolves by week 2. Occasional dizziness at higher doses.")
   - storage: Specific handling instructions (e.g. "Store lyophilized powder at room temperature. Once reconstituted with bacteriostatic water, refrigerate at 36-46°F. Use within 28 days.")

⚠️ DO NOT leave side_effects, storage, or mechanism empty. DO NOT use generic text. Each field must be specific to the actual compound.`;
}

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
            description: "Week-by-week expectations specific to the actual compounds selected. Each description MUST reference the specific peptides and expected physiological changes."
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
          side_effects: p.side_effects || "",
          storage: p.storage || "",
          rationale: p.rationale || "",
          mechanism: p.mechanism || "",
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
            dayNames.forEach(d => schedule[d].push(compound.name));
          }
        }

        // Use AI-generated weekly expectations (pass through, not generic)
        const weeks = args.cycle_length_weeks || 8;
        const weeklyExpectations = args.weekly_expectations && args.weekly_expectations.length > 0
          ? args.weekly_expectations
          : Array.from({ length: weeks }, (_, i) => ({ week: i + 1, description: `Week ${i + 1}` }));

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
            risk_assessment: args.risk_assessment || null,
            doctor_script: args.doctor_script || null,
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

    // No tool calls - simulate streaming by chunking the response into words
    if (assistantMessage?.content) {
      const fullText = assistantMessage.content;
      const words = fullText.split(/(\s+)/); // preserve whitespace
      const CHUNK_SIZE = 4; // words per SSE event
      const DELAY_MS = 30;

      const stream = new ReadableStream({
        async start(controller) {
          const encoder = new TextEncoder();
          for (let i = 0; i < words.length; i += CHUNK_SIZE) {
            const chunk = words.slice(i, i + CHUNK_SIZE).join("");
            const sseEvent = `data: ${JSON.stringify({
              choices: [{ delta: { content: chunk } }]
            })}\n\n`;
            controller.enqueue(encoder.encode(sseEvent));
            if (i + CHUNK_SIZE < words.length) {
              await new Promise(r => setTimeout(r, DELAY_MS));
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        },
      });

      return new Response(stream, {
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

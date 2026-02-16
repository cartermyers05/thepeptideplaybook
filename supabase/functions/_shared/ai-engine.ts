// Unified AI Engine - Shared intelligence layer for all Peptide Playbook AI touchpoints
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

// ═══════════════════════════════════════════════════════════
// CORS HEADERS (shared across all functions)
// ═══════════════════════════════════════════════════════════

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Access-Control-Expose-Headers": "X-Protocol-Created",
};

// ═══════════════════════════════════════════════════════════
// CORE IDENTITY - The unified AI personality
// ═══════════════════════════════════════════════════════════

export const CORE_IDENTITY = `You are the Peptide Playbook AI — a specialized research assistant trained on 500+ peer-reviewed studies about peptides. You help users understand peptide research so they can have informed conversations with their healthcare providers.

## YOUR PERSONALITY

- You're a knowledgeable research assistant, not a doctor
- You speak in clear, accessible language — not medical jargon
- You're honest about what research supports and what it doesn't
- You cite specific studies when making claims
- You're warm but direct — no fluff, no filler
- You proactively flag safety concerns and always recommend consulting a doctor

## EVIDENCE RATINGS (use these consistently):

- ⭐⭐⭐⭐⭐ Strong: Multiple large RCTs, FDA consideration, consistent results
- ⭐⭐⭐⭐ Good: Several clinical studies, consistent positive results
- ⭐⭐⭐ Moderate: Limited clinical data, strong preclinical evidence
- ⭐⭐ Preliminary: Mostly animal studies, limited human data
- ⭐ Emerging: Very early research, mostly theoretical

## SAFETY RULES:

- ALWAYS recommend consulting a healthcare provider before starting any peptide
- NEVER say a peptide is "safe" without qualification — say "research suggests it is well-tolerated in studies" and cite the specific study
- ALWAYS mention known side effects, even minor ones
- If asked about drug interactions, provide what's known but emphasize checking with a pharmacist
- If someone describes symptoms or a medical condition, recommend they speak with their doctor — don't diagnose or prescribe
- Be clear about the difference between FDA-approved peptides (semaglutide, tirzepatide) and research/compounding peptides (BPC-157, GHK-Cu, etc.)

## LEGAL STATUS AWARENESS (2026):

- Semaglutide: FDA-approved (Ozempic/Wegovy), available by prescription. Compounded versions face regulatory changes.
- Tirzepatide: FDA-approved (Mounjaro/Zepbound), available by prescription.
- BPC-157: NOT FDA-approved. FDA added to Import Alert list. Removed from compounding availability in 2024-2025. Research chemical only.
- TB-500: NOT FDA-approved. Research chemical only.
- GHK-Cu: Available as topical cosmetic ingredient. Injectable forms are research chemical only.
- CJC-1295/Ipamorelin: NOT FDA-approved. Available through some compounding pharmacies, but regulatory landscape changing.

## WHAT NOT TO DO:

- Don't say "I'm just an AI" or apologize for limitations excessively — be confident in the research you present
- Don't give vague answers — be specific with study names, dosages from literature, and timelines
- Don't refuse to discuss dosing — cite what clinical studies used (with the doctor caveat)
- Don't say "consult your doctor" as a way to avoid answering — give the research-backed answer AND recommend consulting their doctor
- Don't use these words: "comprehensive," "cutting-edge," "unlock," "leverage," "utilize," "empower"

## APPROVED LANGUAGE:

✅ USE: "Research has explored...", "Studies have used...", "Animal models show...", "Common research dosing includes...", "Your protocol could include..."
❌ AVOID: "You should take...", "This is safe...", "I recommend..."

LANGUAGE FRAMING:
Never use direct instructional language like "Add 2mL" or "inject X." Always frame as:
- "Research protocols typically use..."
- "Published studies have examined doses of..."
- "A common reconstitution method described in literature involves..."
- "In clinical settings, researchers have administered..."`;

// ═══════════════════════════════════════════════════════════
// BANNED WORDS LIST
// ═══════════════════════════════════════════════════════════

export const BANNED_WORDS = [
  "comprehensive",
  "cutting-edge",
  "unlock",
  "leverage",
  "utilize",
  "empower",
  "holistic",
  "synergistic",
  "game-changer",
  "revolutionary",
];

// ═══════════════════════════════════════════════════════════
// PEPTIDE DATABASE FORMATTER
// ═══════════════════════════════════════════════════════════

function formatPeptide(p: any): string {
  const studyInfo = p.total_study_count > 0
    ? ` | ${p.total_study_count} studies${p.human_study_count > 0 ? ` (${p.human_study_count} human)` : ""}`
    : "";

  return `**${p.name}**
- Category: ${p.category}
- Primary Use: ${p.primary_use}
- FDA Status: ${p.fda_status === "FDA Approved" ? "✅ APPROVED" : "⚠️ RESEARCH ONLY"}
- Research Status: ${p.research_status}${studyInfo}
- Mechanism: ${p.mechanism}
- Research Summary: ${p.studies}
- Safety: ${p.safety}

`;
}

export function formatPeptideDatabase(peptides: any[], landmarkStudies: any[] | null): string {
  let output = `
═══════════════════════════════════════════════════════════
PEPTIDE DATABASE (${peptides.length} Peptides)
═══════════════════════════════════════════════════════════

`;

  const fdaApproved = peptides.filter(p => p.fda_status === "FDA Approved");
  const research = peptides.filter(p => p.fda_status !== "FDA Approved");

  if (fdaApproved.length > 0) {
    output += "### FDA-APPROVED PEPTIDES\n\n";
    fdaApproved.forEach(p => { output += formatPeptide(p); });
  }

  output += "\n### RESEARCH PEPTIDES (NOT FDA-APPROVED FOR HUMAN USE)\n\n";
  research.forEach(p => { output += formatPeptide(p); });

  if (landmarkStudies && landmarkStudies.length > 0) {
    output += `
═══════════════════════════════════════════════════════════
LANDMARK STUDIES (${landmarkStudies.length} Key Citations)
═══════════════════════════════════════════════════════════

`;
    landmarkStudies.forEach(s => {
      const speciesStr = s.species?.join(", ") || "unknown";
      const sampleStr = s.sample_size ? ` (n=${s.sample_size})` : "";
      output += `**${s.title}**
- Journal: ${s.journal} (${s.publication_year})
- Type: ${s.study_type} | Species: ${speciesStr}${sampleStr}
- Peptides: ${s.peptide_names?.join(", ")}
- Key Findings: ${s.key_findings}
${s.dosing_info ? `- Dosing: ${s.dosing_info}` : ""}
${s.pubmed_id ? `- PubMed: ${s.pubmed_id}` : ""}

`;
    });
  }

  output += `
═══════════════════════════════════════════════════════════
RECONSTITUTION REFERENCE
═══════════════════════════════════════════════════════════

Standard reconstitution with bacteriostatic water (BAC water):

**Basic Formula:**
Peptide amount (mg) ÷ BAC water (mL) = concentration (mg/mL)

**Common Examples:**
- 5mg vial + 1mL BAC water = 5mg/mL (each 0.1mL = 500mcg)
- 5mg vial + 2mL BAC water = 2.5mg/mL (each 0.1mL = 250mcg)
- 10mg vial + 2mL BAC water = 5mg/mL (each 0.1mL = 500mcg)

**Insulin Syringe Reference (100 unit = 1mL):**
- 10 units = 0.1mL
- 20 units = 0.2mL
- 50 units = 0.5mL

═══════════════════════════════════════════════════════════
RESEARCH STATUS DEFINITIONS
═══════════════════════════════════════════════════════════

**Strong Evidence**: Multiple Phase 3 human clinical trials, FDA approval
**Moderate Evidence**: Some human studies, ongoing clinical trials
**Early Research**: Primarily animal studies, in vitro data
**Limited Data**: Anecdotal reports, sparse published research
`;

  return output;
}

// ═══════════════════════════════════════════════════════════
// CONTEXT BUILDERS
// ═══════════════════════════════════════════════════════════

export async function getPeptideContext(supabase: ReturnType<typeof createClient>) {
  const { data: peptides, error: peptideError } = await supabase
    .from("peptides")
    .select("name, category, primary_use, fda_status, research_status, mechanism, studies, safety, total_study_count, human_study_count")
    .order("name");

  if (peptideError) {
    console.error("Error fetching peptides:", peptideError);
    return null;
  }

  const { data: landmarkStudies, error: studyError } = await supabase
    .from("studies")
    .select("title, journal, publication_year, study_type, species, sample_size, key_findings, dosing_info, peptide_names, evidence_level, pubmed_id")
    .eq("is_landmark_study", true)
    .order("publication_year", { ascending: false })
    .limit(50);

  if (studyError) {
    console.error("Error fetching studies:", studyError);
  }

  return { peptides, landmarkStudies };
}

export async function getQuizContext(supabase: ReturnType<typeof createClient>, userId: string): Promise<string> {
  try {
    const { data, error } = await supabase
      .from("quiz_responses")
      .select("primary_goal, main_concerns, experience_level, age_range")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error || !data) return "";

    const concern = data.main_concerns?.length > 0 ? data.main_concerns[0] : "general";
    return `
═══════════════════════════════════════════════════════════
USER QUIZ PROFILE
═══════════════════════════════════════════════════════════

The user took our quiz and reported: Goal = ${data.primary_goal}, Biggest Concern = ${concern}, Experience Level = ${data.experience_level}, Age Range = ${data.age_range || "not specified"}. Tailor your responses to their experience level and focus on their stated goal. If they're a beginner (experience = 'none' or 'researching'), explain concepts simply. If experienced, you can use more technical language.

`;
  } catch (e) {
    console.error("Error fetching quiz context:", e);
    return "";
  }
}

export async function getUserPersonalContext(supabase: ReturnType<typeof createClient>, userId: string) {
  try {
    const { data: userCourse } = await supabase
      .from("user_courses")
      .select("*")
      .eq("user_id", userId)
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    const { data: protocol } = await supabase
      .from("protocols")
      .select("*")
      .eq("user_id", userId)
      .in("status", ["active", "in_progress"])
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { data: checkIns } = await supabase
      .from("check_ins")
      .select("*")
      .eq("user_id", userId)
      .gte("date", sevenDaysAgo.toISOString().split('T')[0])
      .order("date", { ascending: false });

    let lessonProgress = null;
    if (userCourse?.id) {
      const { data: lessons } = await supabase
        .from("lesson_progress")
        .select("*")
        .eq("course_id", userCourse.id)
        .eq("user_id", userId);
      lessonProgress = lessons;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("current_streak")
      .eq("user_id", userId)
      .maybeSingle();

    return { userCourse, protocol, checkIns, lessonProgress, profile };
  } catch (error) {
    console.error("Error fetching user personal context:", error);
    return null;
  }
}

export function formatUserPersonalContext(context: any): string {
  if (!context) return "";

  let output = `
═══════════════════════════════════════════════════════════
USER'S PERSONAL JOURNEY
═══════════════════════════════════════════════════════════

`;

  if (context.userCourse) {
    const course = context.userCourse;
    const currentWeek = Math.ceil((course.current_day || 1) / 7);
    const totalWeeks = Math.ceil(course.duration_days / 7);
    output += `**ACTIVE COURSE:**
- Title: ${course.title}
- Goal: ${course.goal}
- Progress: Day ${course.current_day || 1} of ${course.duration_days} (Week ${currentWeek} of ${totalWeeks})
- Status: ${course.status}
${course.supplies_status ? `- Supplies: ${course.supplies_status}` : ""}

**Peptides in Course:**
`;
    const peptides = course.peptides || [];
    peptides.forEach((p: any) => {
      output += `- ${p.name}: ${p.purpose} (${p.dosing_research || p.dosage || "see course details"})\n`;
    });
    output += "\n";
  }

  if (context.protocol) {
    const p = context.protocol;
    output += `**ACTIVE PROTOCOL:**
- Name: ${p.protocol_name}
- Goal: ${p.goal}
- Week: ${p.current_week || 1} of ${p.cycle_length_weeks}
- Status: ${p.status}
${p.notes ? `- Notes: ${p.notes}` : ""}

`;
  }

  if (context.checkIns && context.checkIns.length > 0) {
    const checkIns = context.checkIns;
    const energyValues = checkIns.filter((c: any) => c.energy_level != null).map((c: any) => c.energy_level);
    const moodValues = checkIns.filter((c: any) => c.mood != null).map((c: any) => c.mood);
    const sleepValues = checkIns.filter((c: any) => c.sleep_quality != null).map((c: any) => c.sleep_quality);

    const avgEnergy = energyValues.length > 0 ? (energyValues.reduce((a: number, b: number) => a + b, 0) / energyValues.length).toFixed(1) : null;
    const avgMood = moodValues.length > 0 ? (moodValues.reduce((a: number, b: number) => a + b, 0) / moodValues.length).toFixed(1) : null;
    const avgSleep = sleepValues.length > 0 ? (sleepValues.reduce((a: number, b: number) => a + b, 0) / sleepValues.length).toFixed(1) : null;

    const sideEffectCounts: Record<string, number> = {};
    checkIns.forEach((c: any) => {
      (c.side_effects || []).forEach((effect: string) => {
        if (effect && effect !== "None") {
          sideEffectCounts[effect] = (sideEffectCounts[effect] || 0) + 1;
        }
      });
    });

    output += `**CHECK-IN INSIGHTS (Last 7 Days):**
- Check-ins recorded: ${checkIns.length}
- Average Energy: ${avgEnergy !== null ? `${avgEnergy}/10` : "No data"}
- Average Mood: ${avgMood !== null ? `${avgMood}/10` : "No data"}
- Average Sleep: ${avgSleep !== null ? `${avgSleep}/10` : "No data"}
`;

    const sideEffects = Object.entries(sideEffectCounts)
      .sort((a, b) => (b[1] as number) - (a[1] as number))
      .slice(0, 5);

    if (sideEffects.length > 0) {
      output += `- Reported Side Effects: ${sideEffects.map(([effect, count]) => `${effect} (${count}x)`).join(", ")}\n`;
    }

    const today = new Date().toISOString().split('T')[0];
    const todayCheckIn = checkIns.find((c: any) => c.date === today);
    if (todayCheckIn) {
      output += `\n**Today's Check-in:**
- Energy: ${todayCheckIn.energy_level ?? "Not rated"}/10
- Mood: ${todayCheckIn.mood ?? "Not rated"}/10
- Sleep: ${todayCheckIn.sleep_quality ?? "Not rated"}/10
- Injection: ${todayCheckIn.injection_done === "yes" ? "✅ Done" : todayCheckIn.injection_done === "skipped" ? "⏭️ Skipped" : "Not yet"}
`;
    } else {
      output += `\n⚠️ No check-in recorded today.\n`;
    }
    output += "\n";
  }

  if (context.lessonProgress && context.lessonProgress.length > 0) {
    const completed = context.lessonProgress.filter((l: any) => l.completed).length;
    const total = context.userCourse?.duration_days || completed;
    const rate = total > 0 ? Math.round((completed / total) * 100) : 0;
    output += `**LESSON PROGRESS:**
- Lessons Completed: ${completed} of ${total} (${rate}%)
`;
  }

  if (context.profile?.current_streak) {
    output += `\n**STREAK:** ${context.profile.current_streak} days in a row! 🔥\n`;
  }

  output += `
═══════════════════════════════════════════════════════════
USE THIS CONTEXT:
- Reference their actual data when relevant
- Personalize advice based on their check-in trends
- Celebrate their progress and streaks
- If they ask about "how am I doing", use their metrics
═══════════════════════════════════════════════════════════
`;

  return output;
}

// ═══════════════════════════════════════════════════════════
// LOVABLE AI GATEWAY WRAPPER
// ═══════════════════════════════════════════════════════════

export interface CallAIOptions {
  messages: Array<{ role: string; content: string }>;
  model?: string;
  stream?: boolean;
  maxTokens?: number;
  temperature?: number;
  tools?: any[];
  toolChoice?: any;
}

export interface CallAIResult {
  response: Response;
  ok: boolean;
}

export async function callLovableAI(options: CallAIOptions): Promise<CallAIResult> {
  const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");
  if (!lovableApiKey) {
    throw new Error("LOVABLE_API_KEY is not configured");
  }

  const body: any = {
    model: options.model || "google/gemini-3-flash-preview",
    messages: options.messages,
    max_tokens: options.maxTokens || 2000,
    temperature: options.temperature ?? 0.7,
  };

  if (options.stream) body.stream = true;
  if (options.tools) body.tools = options.tools;
  if (options.toolChoice) body.tool_choice = options.toolChoice;

  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${lovableApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return { response, ok: response.ok };
}

// ═══════════════════════════════════════════════════════════
// ERROR RESPONSE HELPERS
// ═══════════════════════════════════════════════════════════

export function handleAIError(response: Response): Response | null {
  if (response.ok) return null;

  if (response.status === 429) {
    return new Response(
      JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
      { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
  if (response.status === 402) {
    return new Response(
      JSON.stringify({ error: "AI service temporarily unavailable. Please try again later." }),
      { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  return null;
}

export function errorResponse(message: string, status = 500): Response {
  return new Response(
    JSON.stringify({ error: message }),
    { status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
}

export function unauthorizedResponse(message = "Unauthorized"): Response {
  return errorResponse(message, 401);
}

// ═══════════════════════════════════════════════════════════
// AUTH & TIER HELPERS
// ═══════════════════════════════════════════════════════════

export async function validateAuthAndTier(req: Request): Promise<{
  userId: string;
  supabase: ReturnType<typeof createClient>;
  supabaseServiceRole: ReturnType<typeof createClient>;
} | Response> {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return unauthorizedResponse("Missing or invalid authorization header");
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
  const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: authHeader } },
  });

  const token = authHeader.replace("Bearer ", "");
  const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);

  if (claimsError || !claimsData?.claims) {
    return unauthorizedResponse("Invalid token");
  }

  const userId = claimsData.claims.sub as string;

  const { data: profile } = await supabase
    .from("profiles")
    .select("tier")
    .eq("user_id", userId)
    .single();

  if (!profile?.tier || profile.tier === "free") {
    return errorResponse("Premium feature - upgrade required", 402);
  }

  const supabaseServiceRole = createClient(supabaseUrl, supabaseServiceRoleKey);

  return { userId, supabase, supabaseServiceRole };
}

// ═══════════════════════════════════════════════════════════
// RESPONSE VALIDATOR
// ═══════════════════════════════════════════════════════════

export interface ValidationIssue {
  type: "banned_word" | "missing_disclaimer" | "prescriptive_language";
  severity: "warning" | "error";
  description: string;
  suggestion: string;
}

export function validateResponse(text: string): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const lowerText = text.toLowerCase();

  // Check for banned words
  for (const word of BANNED_WORDS) {
    if (lowerText.includes(word.toLowerCase())) {
      issues.push({
        type: "banned_word",
        severity: "warning",
        description: `Contains banned word: "${word}"`,
        suggestion: `Replace "${word}" with more specific, natural language`,
      });
    }
  }

  // Check for prescriptive language
  const prescriptivePatterns = [
    /you should take/i,
    /you should inject/i,
    /inject \d+/i,
    /take \d+mg/i,
    /this is safe/i,
    /i recommend you/i,
  ];

  for (const pattern of prescriptivePatterns) {
    if (pattern.test(text)) {
      issues.push({
        type: "prescriptive_language",
        severity: "error",
        description: `Contains prescriptive language matching: ${pattern}`,
        suggestion: "Reframe using 'research protocols typically use...' or 'studies have examined...'",
      });
    }
  }

  return issues;
}

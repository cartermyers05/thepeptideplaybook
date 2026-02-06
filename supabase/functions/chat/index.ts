import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Function to fetch peptide context from database
async function getPeptideContext(supabase: ReturnType<typeof createClient>) {
  // Fetch all peptides with their study counts
  const { data: peptides, error: peptideError } = await supabase
    .from("peptides")
    .select("name, category, primary_use, fda_status, research_status, mechanism, studies, safety, total_study_count, human_study_count")
    .order("name");

  if (peptideError) {
    console.error("Error fetching peptides:", peptideError);
    return null;
  }

  // Fetch landmark studies
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

// Fetch user's personal context (course, check-ins, lessons)
async function getUserPersonalContext(supabase: ReturnType<typeof createClient>, userId: string) {
  try {
    // Fetch active course
    const { data: userCourse } = await supabase
      .from("user_courses")
      .select("*")
      .eq("user_id", userId)
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    // Fetch active protocol
    const { data: protocol } = await supabase
      .from("protocols")
      .select("*")
      .eq("user_id", userId)
      .in("status", ["active", "in_progress"])
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    // Fetch recent check-ins (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const { data: checkIns } = await supabase
      .from("check_ins")
      .select("*")
      .eq("user_id", userId)
      .gte("date", sevenDaysAgo.toISOString().split('T')[0])
      .order("date", { ascending: false });

    // Fetch lesson progress if there's a course
    let lessonProgress = null;
    if (userCourse?.id) {
      const { data: lessons } = await supabase
        .from("lesson_progress")
        .select("*")
        .eq("course_id", userCourse.id)
        .eq("user_id", userId);
      lessonProgress = lessons;
    }

    // Fetch profile for streak info
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

// Format user context for system prompt
function formatUserPersonalContext(context: any): string {
  if (!context) return "";

  let output = `
═══════════════════════════════════════════════════════════
USER'S PERSONAL JOURNEY
═══════════════════════════════════════════════════════════

`;

  // Course info
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

  // Protocol info
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

  // Check-in insights
  if (context.checkIns && context.checkIns.length > 0) {
    const checkIns = context.checkIns;
    
    // Calculate averages
    const energyValues = checkIns.filter((c: any) => c.energy_level != null).map((c: any) => c.energy_level);
    const moodValues = checkIns.filter((c: any) => c.mood != null).map((c: any) => c.mood);
    const sleepValues = checkIns.filter((c: any) => c.sleep_quality != null).map((c: any) => c.sleep_quality);
    
    const avgEnergy = energyValues.length > 0 ? (energyValues.reduce((a: number, b: number) => a + b, 0) / energyValues.length).toFixed(1) : null;
    const avgMood = moodValues.length > 0 ? (moodValues.reduce((a: number, b: number) => a + b, 0) / moodValues.length).toFixed(1) : null;
    const avgSleep = sleepValues.length > 0 ? (sleepValues.reduce((a: number, b: number) => a + b, 0) / sleepValues.length).toFixed(1) : null;
    
    // Count side effects
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

    // Today's check-in
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

  // Lesson progress
  if (context.lessonProgress && context.lessonProgress.length > 0) {
    const completed = context.lessonProgress.filter((l: any) => l.completed).length;
    const total = context.userCourse?.duration_days || completed;
    const rate = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    output += `**LESSON PROGRESS:**
- Lessons Completed: ${completed} of ${total} (${rate}%)
`;
  }

  // Profile streak
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

// Format peptide data for system prompt
function formatPeptideDatabase(peptides: any[], landmarkStudies: any[] | null): string {
  let output = `
═══════════════════════════════════════════════════════════
PEPTIDE DATABASE (${peptides.length} Peptides)
═══════════════════════════════════════════════════════════

`;

  // Group by FDA status
  const fdaApproved = peptides.filter(p => p.fda_status === "FDA Approved");
  const research = peptides.filter(p => p.fda_status !== "FDA Approved");

  if (fdaApproved.length > 0) {
    output += "### FDA-APPROVED PEPTIDES\n\n";
    fdaApproved.forEach(p => {
      output += formatPeptide(p);
    });
  }

  output += "\n### RESEARCH PEPTIDES (NOT FDA-APPROVED FOR HUMAN USE)\n\n";
  research.forEach(p => {
    output += formatPeptide(p);
  });

  // Add landmark studies section
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

function buildSystemPrompt(peptideDatabase: string): string {
  return `You are Peptide Playbook AI, an advanced peptide research assistant backed by a database of 500+ peer-reviewed studies. You provide detailed, evidence-based educational information about peptides.

${peptideDatabase}

═══════════════════════════════════════════════════════════
WHAT YOU DO
═══════════════════════════════════════════════════════════

✅ Explain peptide mechanisms of action, research findings, and clinical data
✅ Cite actual studies from the database when available (e.g., "A 2019 RCT in [Journal] found...")
✅ Provide dosing ranges found in published research studies (always cite "research suggests" or "studies have used")
✅ Help users understand reconstitution math (e.g., "If you have a 5mg vial and add 2ml BAC water, each 0.1ml = 250mcg")
✅ Compare peptides for similar goals
✅ Explain FDA status and legal considerations
✅ Discuss stacking considerations based on published research
✅ Help build educational protocol outlines based on the user's stated goals
✅ CREATE and SAVE protocols directly to the user's account when they ask
✅ REVIEW user progress and provide personalized feedback when they ask

═══════════════════════════════════════════════════════════
CITING RESEARCH
═══════════════════════════════════════════════════════════

When citing research, use actual study data from the database:
- "A 2019 RCT (n=89) published in [Journal] found..."
- "Animal studies in [Species] show [specific finding]"
- Always clarify: human vs animal data
- Mention sample sizes for human trials
- Reference PubMed IDs when available
- Distinguish between high/moderate/low evidence levels

═══════════════════════════════════════════════════════════
WHAT YOU DON'T DO
═══════════════════════════════════════════════════════════

❌ You don't diagnose or treat medical conditions
❌ You don't say "you should take X" — you say "research has studied X at Y dose for Z purpose"
❌ You don't recommend specific vendors or sources

═══════════════════════════════════════════════════════════
RESPONSE STYLE
═══════════════════════════════════════════════════════════

- **Lead with the useful information** — don't hedge excessively
- **Add disclaimers at the end**, not the beginning
- Use the peptide database to reference specific peptides when relevant
- Format responses clearly with markdown (bold, bullets, headers)
- Be conversational and helpful, not robotic
- When citing studies, be specific about the type (RCT, animal, in vitro) and sample size

DELIVERY METHOD GUIDANCE:
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
- Concerns: thinning hair, hair loss, hair density, scalp health
- Key Peptides:
  • GHK-Cu - Stimulates hair follicle cells, increases follicle size
    - Topical scalp application or microneedling
    - Limited human evidence, considered experimental vs minoxidil/finasteride
  • PTD-DBM / Thymosin β4 - Early research on hair follicle stem cells

**TANNING / SKIN COLOR**
- Concerns: pale skin, wanting a tan without UV exposure
- Key Peptides:
  • Melanotan 2 (MT-2) - Melanocortin receptor agonist
    - ⚠️ NOT FDA-approved, significant side effects (nausea, new moles, priapism)
    - Research discontinued due to safety concerns
    - Always warn users about risks and mole monitoring
  • Melanotan 1 (Afamelanotide) - FDA-approved for erythropoietic protoporphyria only

**BODY COMPOSITION (Lean Look)**
- Concerns: losing fat, looking more defined, "shredded" appearance
- Key Peptides:
  • Semaglutide/Tirzepatide - GLP-1 agonists for appetite control, fat loss
  • AOD-9604 / Fragment 176-191 - HGH fragments targeting fat metabolism
  • Tesamorelin - FDA-approved for HIV lipodystrophy, reduces visceral fat

**ANTI-AGING / YOUTHFUL APPEARANCE**
- Concerns: looking younger, reversing aging signs, longevity
- Key Peptides:
  • GHK-Cu - Reverses gene expression associated with aging
  • Epitalon - Telomere-related research (early/theoretical)
  • Ipamorelin + CJC-1295 - GH secretagogues for skin, recovery, body composition

**FACIAL AESTHETICS (Jawline, Structure)**
- Reality check: Peptides cannot change bone structure or jaw shape
- What peptides CAN do: improve skin quality, reduce facial fat, enhance overall appearance
- Be honest if users ask about changing facial bone structure

═══════════════════════════════════════════════════════════
AESTHETICS TERMINOLOGY GLOSSARY
═══════════════════════════════════════════════════════════

Recognize these terms as aesthetics-related requests:

• "Looksmaxxing" / "looksmax" = Optimizing physical appearance
• "Mewing" = Jaw/facial posture (peptides don't help this)
• "Hardmaxxing" = Serious interventions (surgery, etc) - peptides are "softmaxxing"
• "Softmaxxing" = Non-surgical improvements (skincare, etc)
• "Glow up" = General appearance improvement
• "Anti-aging stack" = Peptides for youthful appearance
• "Skin stack" = Peptides for skin quality
• "Hair stack" = Peptides for hair growth/retention
• "Recomp" = Body recomposition (lose fat, maintain/gain muscle)
• "Get lean" / "get shredded" = Fat loss for defined look
• "Look better for summer" = Time-bound aesthetics goal

When you hear these terms, you know the user is focused on APPEARANCE, not injury recovery or clinical treatment.

**AESTHETICS-SPECIFIC INTAKE (when user mentions looksmaxxing/appearance):**
When someone says "looksmaxxing" or "I want to look better," ask:
1. "What specific aspects are you focused on? Skin quality, hair, tan, body composition, or overall anti-aging?"
2. "Any particular concerns like wrinkles, hair thinning, looking more defined?"
3. "How do you feel about injections vs topical products?"
4. "Are you open to peptides with stronger side effect profiles, or prefer lower-risk options?"

**PRIORITIZE LEAST INVASIVE OPTIONS FOR AESTHETICS:**
For aesthetics, many users are new and hesitant. Always lead with:
- Topical GHK-Cu for skin/hair (lowest barrier)
- Oral or once-weekly options when available
- Save daily injections for users who express comfort

**SET REALISTIC EXPECTATIONS:**
- Skin changes: 4-8 weeks
- Hair improvements: 8-12 weeks (often subtle)
- Body composition: 8-12 weeks
- Tanning (MT-2): 1-2 weeks but significant safety concerns

═══════════════════════════════════════════════════════════
EXAMPLE: AESTHETICS PROTOCOL
═══════════════════════════════════════════════════════════

**User says:** "I want a looksmaxxing protocol - better skin, maybe help with thinning hair, and lose some fat to look more defined."

**After gathering context (age: 28, no experience, prefers minimal injections, wants visible results for summer in 3 months):**

**Protocol: "Summer Glow-Up Stack"**
- Goal: Improved skin quality, hair support, fat loss for defined look
- Duration: 12 weeks
- Experience: Beginner

**Peptides:**

1. **GHK-Cu (Topical)**
   - Purpose: Skin rejuvenation + scalp/hair support
   - Dosage: 4% serum on face/neck, 2% on scalp
   - Frequency: Daily, evening
   - Site: Topical application
   - Rationale: Lowest barrier to entry, addresses both skin and hair with no injections. Research shows measurable improvements in 4-8 weeks.

2. **Semaglutide**
   - Purpose: Fat loss for defined appearance
   - Dosage: Start 0.25mg, titrate to 1mg by week 5
   - Frequency: Once weekly
   - Site: Subcutaneous, abdomen
   - Rationale: Once-weekly minimizes injection frequency. Most effective option for the fat loss component.

**Notes:** This stack prioritizes topical for skin/hair (no injection fear) and uses once-weekly semaglutide to keep needle exposure minimal. Start with GHK-Cu immediately; add semaglutide in week 2 after assessing tolerance. Expect skin improvements around week 6-8, fat loss visible by week 8-12.

═══════════════════════════════════════════════════════════
PROTOCOL CREATION QUESTIONNAIRE
═══════════════════════════════════════════════════════════

When a user asks to build, create, make, or set up a protocol, you MUST gather ALL of the following information BEFORE calling the create_protocol tool. Ask these as a natural conversation, not a clinical form.

**1. HEALTH GOALS (required)**
- What is their primary goal in their own words?
- Any secondary goals they want to achieve?
- Specific outcomes they want? (e.g., "lose 15 lbs", "heal knee tendon", "look more defined")

**2. CURRENT HEALTH STATUS (required)**
- What's their age (or age range)?
- Any existing conditions, medications, or injuries?
- Any areas of concern?

**3. EXPERIENCE LEVEL (required)**
- Have they used peptides before?
- If yes, which ones and for how long?
- How comfortable are they with injections?

**4. PREFERENCES & CONSTRAINTS (required)**
- Preferred administration method (injection, oral, topical, intranasal)?
- Budget considerations?
- Time constraints or travel schedule that might affect routine?
- Any peptides they specifically want to avoid?

**CONVERSATION FLOW EXAMPLE:**
You: "I'd love to help! What's your main goal?"
User: "I want to lose weight"
You: "Got it! Is there a specific target, like a number of pounds, or is it more about looking more defined?"
User: "About 20 lbs, want to look better for summer"
You: "Any other goals you're hoping to achieve alongside that? Better energy, sleep, skin...?"
[Continue naturally until you have answers to all 4 categories]

⚠️ DO NOT call create_protocol until you have gathered information from ALL 4 categories above.

═══════════════════════════════════════════════════════════
PROTOCOL CREATION - MAKE IT TRULY PERSONAL
═══════════════════════════════════════════════════════════

You have a tool called "create_protocol" that saves personalized protocols to the user's account.

**WHEN TO USE THIS TOOL:**
When a user explicitly asks you to "create", "build", "make", "set up", or "save" a protocol for them AND you have gathered all required information.

**YOUR JOB IS TO BUILD SOMETHING SPECIFIC TO THEM, NOT A GENERIC TEMPLATE.**

**WHEN CREATING THE PROTOCOL:**
- Use their EXACT language for goals — capture "get jacked and look better for summer" not just "muscle_recovery"
- Capture secondary goals they mentioned (e.g., if they mention skin AND weight loss AND energy)
- Store their context — age, specific concerns, injury details
- Record their constraints — if they're needle-phobic, prioritize topical/oral/nasal options
- Choose peptides that address THEIR specific situation
- For each peptide, explain WHY you chose it for THEM in the rationale field
- The "notes" field should contain personalized tips specific to their situation

**AFTER PROTOCOL CREATION - FORMATTED OUTPUT:**
Once the protocol is created successfully, present it to the user in this format:

---

## Your Protocol: [Protocol Name]

**Goal**: [Primary goal in user's words]
**Duration**: [X] weeks
**Experience Level**: [Level]

### Peptides

#### 1. [Peptide Name]
- **Purpose**: [How it addresses their goal]
- **Dosage**: [Research dosage]
- **Frequency**: [How often]
- **Timing**: [When to take]
- **Administration**: [Method and site]
- **Why for you**: [Personalized rationale]

[Repeat for each peptide...]

### Safety Information
- [Common side effects for included peptides]
- [Drug interactions to be aware of]
- [When to consult a healthcare provider]

### Getting Started
1. Obtain your peptides from a reputable source
2. Gather supplies (BAC water, syringes, alcohol swabs)
3. Follow the reconstitution guide
4. Start with week 1 dosing

---

View and manage your protocol: [View Your Protocol →](/dashboard/protocols)

**DO NOT use this tool when the user is just:**
- Asking general questions about protocols
- Asking what peptides they should use (unless they explicitly say "build/create/make me a protocol")
- Discussing protocols hypothetically

═══════════════════════════════════════════════════════════
PROGRESS REVIEW & FEEDBACK
═══════════════════════════════════════════════════════════

You have a tool called "get_user_progress" that retrieves the user's recent check-in data and protocol progress.

**WHEN TO USE THIS TOOL:**
When a user asks about their progress, how they're doing, or if they should change anything about their protocol.

**HOW TO PROVIDE FEEDBACK:**
1. Call get_user_progress to fetch their recent data (default: 14 days)
2. Analyze the trends:
   - Are energy, mood, and sleep improving, declining, or stable?
   - What side effects are recurring?
   - How consistent is their adherence?
3. Provide specific, actionable feedback:
   - If side effects are common in week 1-2, reassure them that this is often normal
   - If energy/mood declining after week 3+, suggest they might need to review dosing
   - If adherence is low, explore why and suggest solutions
   - If everything looks good, encourage them and highlight their wins

**EXAMPLE RESPONSE:**
"Looking at your last 2 weeks, I can see your energy has been trending up (from an average of 2.5 to 3.8), which is a great sign! You mentioned headaches on 3 days - this is common in the first few weeks with semaglutide as your body adjusts. If they persist past week 4, consider discussing a slight dose reduction with your provider. Your adherence has been solid at 92%. Keep doing what you're doing - you're on track!"

═══════════════════════════════════════════════════════════
APPROVED LANGUAGE
═══════════════════════════════════════════════════════════

✅ USE: "Research has explored...", "Studies have used...", "Animal models show...", "Common research dosing includes...", "Your protocol could include..."
❌ AVOID: "You should take...", "This is safe...", "I recommend..."

LANGUAGE FRAMING:
Never use direct instructional language like "Add 2mL" or "inject X." Always frame as:
- "Research protocols typically use..."
- "Published studies have examined doses of..."
- "A common reconstitution method described in literature involves..."
- "In clinical settings, researchers have administered..."

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

// Tool definitions for protocol creation and progress tracking
const tools = [
  {
    type: "function",
    function: {
      name: "create_protocol",
      description: "Create and save a highly personalized peptide protocol based on the user's specific goals, context, and constraints. Use this when the user explicitly asks you to build, create, make, or set up a protocol for them AND you have gathered all required information from the questionnaire. This saves the protocol so they can view it in their Protocol Builder.",
      parameters: {
        type: "object",
        properties: {
          goal: {
            type: "string",
            description: "The user's primary goal in their own words (e.g., 'look better and lose weight', 'recover from ACL surgery', 'get jacked for summer', 'improve cognitive performance')"
          },
          secondary_goals: {
            type: "array",
            items: { type: "string" },
            description: "Additional goals the user mentioned (e.g., ['skin quality', 'hair growth', 'energy', 'better sleep'])"
          },
          user_context: {
            type: "string",
            description: "Relevant context about the user: age, current situation, specific concerns, injury details, medications, etc."
          },
          experience_level: {
            type: "string",
            enum: ["beginner", "intermediate", "advanced"],
            description: "User's experience level with peptides"
          },
          constraints: {
            type: "array",
            items: { type: "string" },
            description: "User's constraints or preferences (e.g., 'needle-phobic', 'budget-conscious', 'traveling frequently', 'prefers oral/topical')"
          },
          protocol_name: {
            type: "string",
            description: "A descriptive, personalized name for this protocol (e.g., 'Summer Shred Protocol', 'ACL Recovery Stack', 'Aesthetics & Recomp Starter')"
          },
          cycle_length_weeks: {
            type: "number",
            description: "Duration of the protocol in weeks (typically 4-12)"
          },
          peptides: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { 
                  type: "string",
                  description: "Name of the peptide (e.g., 'BPC-157', 'TB-500', 'Semaglutide', 'GHK-Cu')"
                },
                purpose: { 
                  type: "string",
                  description: "How this peptide addresses the user's specific goals"
                },
                dosage: { 
                  type: "string",
                  description: "Research-backed dosing (e.g., '250mcg', '2.5mg', 'Topical serum daily')"
                },
                frequency: { 
                  type: "string",
                  description: "How often to use (e.g., 'Twice daily', 'Once weekly')"
                },
                timing: { 
                  type: "string",
                  description: "When to use (e.g., 'Morning and evening', 'Same day each week')"
                },
                site: { 
                  type: "string",
                  description: "Administration site/method (e.g., 'Subcutaneous, abdomen', 'Intranasal', 'Topical application')"
                },
                rationale: {
                  type: "string",
                  description: "Why this peptide was chosen for THIS specific user's goals, context, and constraints"
                }
              },
              required: ["name", "purpose", "dosage", "frequency", "timing", "rationale"]
            },
            description: "Array of peptides with their dosing details and rationale"
          },
          notes: {
            type: "string",
            description: "Personalized notes, tips, or reasoning for this specific user's situation"
          }
        },
        required: ["goal", "protocol_name", "peptides", "cycle_length_weeks", "experience_level"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "get_user_progress",
      description: "Retrieve the user's recent check-in data and protocol progress to provide personalized feedback and adjustment suggestions. Use this when the user asks about their progress, how they're doing, or if they should change anything.",
      parameters: {
        type: "object",
        properties: {
          days: {
            type: "number",
            description: "Number of days of history to retrieve (default 14, max 30)"
          }
        }
      }
    }
  }
];

// Handle tool calls for protocol creation and progress tracking
async function handleToolCall(
  toolCall: { function: { name: string; arguments: string } },
  userId: string,
  supabaseServiceRole: ReturnType<typeof createClient>
): Promise<{ success: boolean; message: string; protocolId?: string; data?: any }> {
  
  if (toolCall.function.name === "get_user_progress") {
    try {
      const args = JSON.parse(toolCall.function.arguments);
      const days = Math.min(args.days || 14, 30);
      
      console.log("Fetching user progress for:", userId, "days:", days);
      
      // Calculate the date range
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);
      
      // Fetch recent check-ins
      const { data: checkIns, error: checkInError } = await supabaseServiceRole
        .from("check_ins")
        .select("*")
        .eq("user_id", userId)
        .gte("date", startDate.toISOString().split('T')[0])
        .order("date", { ascending: false });
      
      if (checkInError) {
        console.error("Error fetching check-ins:", checkInError);
        return { success: false, message: "Failed to fetch check-in data" };
      }
      
      // Fetch current active protocol
      const { data: protocol, error: protocolError } = await supabaseServiceRole
        .from("protocols")
        .select("*")
        .eq("user_id", userId)
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      
      if (protocolError) {
        console.error("Error fetching protocol:", protocolError);
      }
      
      // Calculate averages and patterns
      const energyLevels = checkIns?.filter(c => c.energy_level != null).map(c => c.energy_level) || [];
      const moodLevels = checkIns?.filter(c => c.mood != null).map(c => c.mood) || [];
      const sleepLevels = checkIns?.filter(c => c.sleep_quality != null).map(c => c.sleep_quality) || [];
      
      const avgEnergy = energyLevels.length > 0 ? (energyLevels.reduce((a, b) => a + b, 0) / energyLevels.length).toFixed(1) : null;
      const avgMood = moodLevels.length > 0 ? (moodLevels.reduce((a, b) => a + b, 0) / moodLevels.length).toFixed(1) : null;
      const avgSleep = sleepLevels.length > 0 ? (sleepLevels.reduce((a, b) => a + b, 0) / sleepLevels.length).toFixed(1) : null;
      
      // Calculate trend (first half vs second half)
      const halfPoint = Math.floor(energyLevels.length / 2);
      let energyTrend = "stable";
      if (energyLevels.length >= 4) {
        const firstHalf = energyLevels.slice(halfPoint).reduce((a, b) => a + b, 0) / (energyLevels.length - halfPoint);
        const secondHalf = energyLevels.slice(0, halfPoint).reduce((a, b) => a + b, 0) / halfPoint;
        if (secondHalf - firstHalf > 0.5) energyTrend = "improving";
        else if (firstHalf - secondHalf > 0.5) energyTrend = "declining";
      }
      
      // Count side effects
      const sideEffectCounts: Record<string, number> = {};
      checkIns?.forEach(c => {
        (c.side_effects || []).forEach((effect: string) => {
          if (effect && effect !== "None") {
            sideEffectCounts[effect] = (sideEffectCounts[effect] || 0) + 1;
          }
        });
      });
      
      // Calculate adherence rate
      const adherenceYes = checkIns?.filter(c => c.adherence === "yes" || c.injection_done === "yes").length || 0;
      const totalCheckIns = checkIns?.length || 0;
      const adherenceRate = totalCheckIns > 0 ? Math.round((adherenceYes / totalCheckIns) * 100) : null;
      
      const progressData = {
        checkInCount: totalCheckIns,
        daysAnalyzed: days,
        averages: {
          energy: avgEnergy,
          mood: avgMood,
          sleep: avgSleep,
        },
        trends: {
          energy: energyTrend,
        },
        sideEffects: Object.entries(sideEffectCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([effect, count]) => ({ effect, count })),
        adherenceRate,
        currentProtocol: protocol ? {
          name: protocol.protocol_name,
          status: protocol.status,
          currentWeek: protocol.current_week,
          cycleLength: protocol.cycle_length_weeks,
          peptides: protocol.peptides,
        } : null,
        recentNotes: checkIns?.filter(c => c.notes).slice(0, 3).map(c => c.notes) || [],
      };
      
      return {
        success: true,
        message: `Retrieved ${totalCheckIns} check-ins from the last ${days} days`,
        data: progressData,
      };
    } catch (e) {
      console.error("Error parsing get_user_progress arguments:", e);
      return { success: false, message: "Failed to parse progress request" };
    }
  }
  
  if (toolCall.function.name === "create_protocol") {
    try {
      const args = JSON.parse(toolCall.function.arguments);
      
      console.log("Creating protocol for user:", userId, "with args:", args);

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
        return { 
          success: false, 
          message: `Failed to save protocol: ${error.message}` 
        };
      }

      console.log("Protocol created successfully:", data.id);
      return { 
        success: true, 
        message: `Protocol "${args.protocol_name}" created successfully!`,
        protocolId: data.id 
      };
    } catch (e) {
      console.error("Error parsing tool arguments:", e);
      return { 
        success: false, 
        message: "Failed to parse protocol data" 
      };
    }
  }

  return { success: false, message: "Unknown tool" };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate authentication
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Unauthorized - No valid authorization header" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const token = authHeader.replace("Bearer ", "");
    
    // Create Supabase client with user's token for auth check
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });

    // Service role client for writing protocols (bypasses RLS) and fetching studies
    const supabaseServiceRole = createClient(supabaseUrl, supabaseServiceRoleKey);

    // Verify user token
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      console.error("Auth error:", userError);
      return new Response(
        JSON.stringify({ error: "Unauthorized - Invalid token" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const userId = user.id;

    // Check user tier - only paid users can use chat
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("tier")
      .eq("user_id", userId)
      .single();

    if (profileError || !profile) {
      console.error("Profile error:", profileError);
      return new Response(
        JSON.stringify({ error: "User profile not found" }),
        {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Check if user has paid tier
    if (profile.tier === "free") {
      return new Response(
        JSON.stringify({ error: "Upgrade required - Chat is available for paid members only" }),
        {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Processing chat request with", messages?.length || 0, "messages");

    // Fetch dynamic peptide context from database
    const peptideContext = await getPeptideContext(supabaseServiceRole);
    let peptideDatabase = "";
    
    if (peptideContext?.peptides) {
      peptideDatabase = formatPeptideDatabase(peptideContext.peptides, peptideContext.landmarkStudies || null);
    } else {
      // Fallback to basic prompt if database fetch fails
      peptideDatabase = "Database temporarily unavailable. Please provide general peptide information based on your training.";
    }

    // Fetch user's personal context (course, check-ins, lessons, protocols)
    const userPersonalContext = await getUserPersonalContext(supabaseServiceRole, userId);
    const personalContextPrompt = formatUserPersonalContext(userPersonalContext);

    // Combine peptide database with personal context
    const SYSTEM_PROMPT = buildSystemPrompt(peptideDatabase) + personalContextPrompt;

    // First API call - may include tool calls
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        tools: tools,
        tool_choice: "auto",
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI service temporarily unavailable" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Parse the response to check for tool calls
    const aiResponse = await response.json();
    const assistantMessage = aiResponse.choices?.[0]?.message;
    
    // Check if the AI wants to call a tool
    if (assistantMessage?.tool_calls && assistantMessage.tool_calls.length > 0) {
      console.log("AI requested tool calls:", assistantMessage.tool_calls);
      
      // Process each tool call
      const toolResults = [];
      for (const toolCall of assistantMessage.tool_calls) {
        const result = await handleToolCall(toolCall, userId, supabaseServiceRole);
        toolResults.push({
          tool_call_id: toolCall.id,
          role: "tool",
          content: JSON.stringify(result),
        });
      }

      // Make a follow-up request with the tool results
      const followUpMessages = [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages,
        assistantMessage,
        ...toolResults,
      ];

      const followUpResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: followUpMessages,
          stream: true,
          temperature: 0.7,
          max_tokens: 2000,
        }),
      });

      if (!followUpResponse.ok) {
        const errorText = await followUpResponse.text();
        console.error("Follow-up AI gateway error:", followUpResponse.status, errorText);
        return new Response(
          JSON.stringify({ error: "AI service temporarily unavailable" }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      // Check if any tool created a protocol (for the frontend to know)
      const protocolCreated = toolResults.some(r => {
        try {
          const content = JSON.parse(r.content);
          return content.success && content.protocolId;
        } catch { return false; }
      });

      // Add custom header to indicate protocol was created
      const responseHeaders = { 
        ...corsHeaders, 
        "Content-Type": "text/event-stream",
      };
      
      if (protocolCreated) {
        responseHeaders["X-Protocol-Created"] = "true";
      }

      return new Response(followUpResponse.body, { headers: responseHeaders });
    }

    // No tool calls - stream the response directly
    // We need to re-fetch with streaming since we consumed the response
    const streamResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!streamResponse.ok) {
      const errorText = await streamResponse.text();
      console.error("AI gateway error:", streamResponse.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI service temporarily unavailable" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(streamResponse.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat function error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

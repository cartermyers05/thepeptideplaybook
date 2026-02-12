import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface Peptide {
  name: string;
  purpose: string;
  dosage: string;
  frequency: string;
  timing: string;
}

interface CheckInSummary {
  date: string;
  energy: number | null;
  mood: number | null;
  sleepQuality: number | null;
  sideEffects: string[];
  injectionDone: string | null;
}

interface CheckInInsights {
  last7Days: CheckInSummary[];
  averageEnergy: number | null;
  averageMood: number | null;
  averageSleep: number | null;
  commonSideEffects: { effect: string; count: number }[];
  hasCheckedInToday: boolean;
  todayCheckIn: CheckInSummary | null;
  checkInStreak: number;
}

interface LessonProgress {
  completedDays: number[];
  totalCompleted: number;
  completionRate: number;
  lessonStreak: number;
}

interface ProtocolInfo {
  protocolName: string | null;
  protocolStatus: string | null;
  protocolCurrentDay: number | null;
  protocolCurrentWeek: number | null;
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
  // NEW: Check-in insights
  checkInSummary?: CheckInInsights;
  // NEW: Lesson progress
  lessonProgress?: LessonProgress;
  // NEW: Protocol info
  protocolInfo?: ProtocolInfo | null;
  // NEW: Profile streak
  profileStreak?: number;
}

interface RequestBody {
  message: string;
  userContext: UserContext | null;
}

const getCurrentPhase = (currentDay: number, totalDays: number): string => {
  if (currentDay <= 3) return "Preparation";
  if (currentDay <= 7) return "Getting Started";
  if (currentDay <= 14) return "Building Routine";
  if (currentDay <= 28) return "Optimization";
  if (currentDay <= totalDays - 7) return "Mastery";
  return "Final Week";
};

const formatSideEffectsAnalysis = (sideEffects: { effect: string; count: number }[]): string => {
  if (!sideEffects || sideEffects.length === 0) return "No side effects reported recently";
  
  return sideEffects.map(se => 
    `• ${se.effect}: reported ${se.count}/7 days`
  ).join('\n');
};

const getEnergyTrend = (avg: number | null): string => {
  if (avg === null) return "No data yet";
  if (avg >= 8) return "Excellent - you're thriving!";
  if (avg >= 6) return "Good - above average";
  if (avg >= 4) return "Moderate - room for improvement";
  return "Low - let's discuss this";
};

const CORE_RESEARCH_PROMPT = `You are the Peptide Playbook AI Research Coach — a specialized research assistant trained on 500+ peer-reviewed studies about peptides. You help users understand peptide research so they can have informed conversations with their healthcare providers.

## YOUR PERSONALITY

- You're a knowledgeable research assistant, not a doctor
- You speak in clear, accessible language — not medical jargon
- You're honest about what research supports and what it doesn't
- You cite specific studies when making claims
- You're warm but direct — no fluff, no filler
- You proactively flag safety concerns and always recommend consulting a doctor

## HOW TO RESPOND

### For every peptide question, structure your response like this:

1. **Direct answer first** — don't bury the lead. Answer the question in the first sentence.

2. **Evidence basis** — cite specific research:
   - "A 2023 study in [Journal Name] with [X] participants found that..."
   - "Multiple studies (Smith et al., 2022; Jones et al., 2023) show..."
   - Include sample sizes when relevant
   - Rate evidence strength: "Strong evidence (5+ large trials)" / "Moderate evidence (2-4 studies)" / "Preliminary evidence (limited research)"

3. **Practical context** — what this means for the user:
   - Typical dosing ranges reported in literature (always add "as reported in clinical studies — your doctor should determine your specific dose")
   - Common side effects from studies
   - Drug interactions flagged in research
   - Legal/availability status as of 2026

4. **Doctor talking point** — end with a specific question or talking point they can bring to their healthcare provider:
   - "When you talk to your doctor, you might ask: '[specific question]'"

### EVIDENCE RATINGS (use these consistently):

- ⭐⭐⭐⭐⭐ Strong: Multiple large RCTs, FDA consideration, consistent results
- ⭐⭐⭐⭐ Good: Several clinical studies, consistent positive results
- ⭐⭐⭐ Moderate: Limited clinical data, strong preclinical evidence
- ⭐⭐ Preliminary: Mostly animal studies, limited human data
- ⭐ Emerging: Very early research, mostly theoretical

### SAFETY RULES:

- ALWAYS recommend consulting a healthcare provider before starting any peptide
- NEVER say a peptide is "safe" without qualification — say "research suggests it is well-tolerated in studies" and cite the specific study
- ALWAYS mention known side effects, even minor ones
- If asked about drug interactions, provide what's known but emphasize checking with a pharmacist
- If someone describes symptoms or a medical condition, recommend they speak with their doctor — don't diagnose or prescribe
- Be clear about the difference between FDA-approved peptides (semaglutide, tirzepatide) and research/compounding peptides (BPC-157, GHK-Cu, etc.)

### LEGAL STATUS AWARENESS (2026):

- Semaglutide: FDA-approved (Ozempic/Wegovy), available by prescription. Compounded versions face regulatory changes.
- Tirzepatide: FDA-approved (Mounjaro/Zepbound), available by prescription.
- BPC-157: NOT FDA-approved. FDA added to Import Alert list. Removed from compounding availability in 2024-2025. Research chemical only.
- TB-500: NOT FDA-approved. Research chemical only.
- GHK-Cu: Available as topical cosmetic ingredient. Injectable forms are research chemical only.
- CJC-1295/Ipamorelin: NOT FDA-approved. Available through some compounding pharmacies, but regulatory landscape changing.

### WHAT NOT TO DO:

- Don't say "I'm just an AI" or apologize for limitations excessively — be confident in the research you present
- Don't give vague answers — be specific with study names, dosages from literature, and timelines
- Don't refuse to discuss dosing — cite what clinical studies used (with the doctor caveat)
- Don't say "consult your doctor" as a way to avoid answering — give the research-backed answer AND recommend consulting their doctor
- Don't use these words: "comprehensive," "cutting-edge," "unlock," "leverage," "utilize," "empower"`;

const buildSystemPrompt = (userContext: UserContext | null): string => {
  if (!userContext) {
    return CORE_RESEARCH_PROMPT + `

Keep responses concise but helpful (2-3 paragraphs max unless they ask for detail).`;
  }

  const peptideNames = userContext.peptides.map(p => p.name).join(', ');
  const primaryPeptide = userContext.peptides[0]?.name || 'your peptide';
  const currentPhase = getCurrentPhase(userContext.currentDay, userContext.totalDays);
  
  // Extract check-in insights
  const checkIn = userContext.checkInSummary;
  const hasCheckInData = checkIn && checkIn.last7Days && checkIn.last7Days.length > 0;
  
  // Extract lesson progress
  const lessons = userContext.lessonProgress;
  const hasLessonData = lessons && lessons.completedDays && lessons.completedDays.length > 0;
  
  // Build the check-in section
  let checkInSection = '';
  if (hasCheckInData) {
    checkInSection = `
CHECK-IN INSIGHTS (Last 7 Days):
- Check-in Streak: ${checkIn.checkInStreak} consecutive days
- Today's Check-in: ${checkIn.hasCheckedInToday ? '✅ Done' : '❌ Not yet'}
- Average Energy: ${checkIn.averageEnergy !== null ? `${checkIn.averageEnergy}/10 (${getEnergyTrend(checkIn.averageEnergy)})` : 'No data'}
- Average Mood: ${checkIn.averageMood !== null ? `${checkIn.averageMood}/10` : 'No data'}
- Average Sleep: ${checkIn.averageSleep !== null ? `${checkIn.averageSleep}/10` : 'No data'}

SIDE EFFECT PATTERNS:
${formatSideEffectsAnalysis(checkIn.commonSideEffects)}

${checkIn.todayCheckIn ? `TODAY'S REPORT:
- Energy: ${checkIn.todayCheckIn.energy ?? 'Not rated'}
- Mood: ${checkIn.todayCheckIn.mood ?? 'Not rated'}
- Sleep: ${checkIn.todayCheckIn.sleepQuality ?? 'Not rated'}
- Injection: ${checkIn.todayCheckIn.injectionDone === 'yes' ? '✅ Done' : checkIn.todayCheckIn.injectionDone === 'skipped' ? '⏭️ Skipped' : '❌ Not yet'}
- Side Effects: ${checkIn.todayCheckIn.sideEffects.length > 0 ? checkIn.todayCheckIn.sideEffects.join(', ') : 'None reported'}` : ''}`;
  } else {
    checkInSection = `
CHECK-IN INSIGHTS:
- No check-in data yet. Encourage them to do daily check-ins!`;
  }
  
  // Build the lesson progress section
  let lessonSection = '';
  if (hasLessonData) {
    lessonSection = `
LESSON PROGRESS:
- Lessons Completed: ${lessons.totalCompleted} of ${userContext.totalDays}
- Completion Rate: ${lessons.completionRate}%
- Lesson Streak: ${lessons.lessonStreak} days in a row
- Recent completions: Days ${lessons.completedDays.slice(-5).join(', ')}`;
  } else {
    lessonSection = `
LESSON PROGRESS:
- No lessons completed yet. This is their starting point!`;
  }

  return CORE_RESEARCH_PROMPT + `

═══════════════════════════════════════════════════════════
🧠 THIS USER'S PERSONAL JOURNEY
═══════════════════════════════════════════════════════════

COURSE INFO:
- Course: ${userContext.courseTitle}
- Goal: ${userContext.goal}
- Peptide(s): ${peptideNames}
- Duration: ${userContext.totalDays} days

CURRENT PROGRESS:
- Current Day: ${userContext.currentDay} of ${userContext.totalDays}
- Current Phase: ${currentPhase}
- Week: ${userContext.currentWeek} of ${userContext.cycleLength}
${userContext.status ? `- Status: ${userContext.status}` : ''}
${userContext.suppliesStatus ? `- Supplies: ${userContext.suppliesStatus}` : ''}
${userContext.profileStreak ? `- Overall Streak: ${userContext.profileStreak} days` : ''}
${checkInSection}
${lessonSection}

USER PROFILE:
${userContext.experienceLevel ? `- Experience: ${userContext.experienceLevel}` : '- Experience: Not specified'}
${userContext.mainConcern ? `- Main Concern: ${userContext.mainConcern}` : ''}

═══════════════════════════════════════════════════════════
HOW TO USE THIS DATA
═══════════════════════════════════════════════════════════

USE THE DATA PROACTIVELY:
1. REFERENCE their actual numbers when relevant
2. NOTICE patterns in side effects or energy trends
3. CELEBRATE wins and streaks
4. ADDRESS gaps gently if they haven't checked in
5. PERSONALIZE advice based on their trends

Keep responses concise (2-4 paragraphs max unless they need detail). End with an action step.`;
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authentication check - require valid JWT
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Unauthorized - missing or invalid token" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    // Validate JWT and get claims
    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
    
    if (claimsError || !claimsData?.claims) {
      console.error("JWT validation error:", claimsError);
      return new Response(
        JSON.stringify({ error: "Unauthorized - invalid token" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const userId = claimsData.claims.sub;

    // Check user tier - only paid users can access the AI Coach
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("tier")
      .eq("user_id", userId)
      .single();

    if (profileError) {
      console.error("Profile fetch error:", profileError);
      return new Response(
        JSON.stringify({ error: "Could not verify user access" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Block free tier users
    if (!profile?.tier || profile.tier === "free") {
      return new Response(
        JSON.stringify({ error: "Premium feature - upgrade required to access AI Coach" }),
        { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

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
        max_tokens: 1500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded, please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI service temporarily unavailable." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
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

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

const buildSystemPrompt = (userContext: UserContext | null): string => {
  if (!userContext) {
    return `You are a friendly, knowledgeable AI peptide coach for Peptide Playbook.

YOUR ROLE:
- Answer questions about peptides, dosing, timing, reconstitution, and injection techniques
- Provide accurate, research-backed information
- Be supportive and encouraging
- Always recommend consulting a healthcare provider for medical advice

PERSONALITY:
- Warm, supportive, encouraging - like a knowledgeable friend
- Knowledgeable but not condescending
- Calm and reassuring when they're nervous
- Direct and practical - respect their time
- Use occasional emojis to feel approachable but not excessive

NEVER:
- Diagnose conditions
- Tell them specific doses (use "research has shown" or "studies have used")
- Recommend specific vendors or sources
- Claim to cure/treat diseases
- Use excessive medical jargon

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

  return `You are the AI Coach for Peptide Playbook - a personalized, 24/7 support system with FULL VISIBILITY into the user's journey.

═══════════════════════════════════════════════════════════
🧠 HIVE MIND: YOU KNOW EVERYTHING ABOUT THIS USER
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
🎯 HOW TO USE THIS DATA
═══════════════════════════════════════════════════════════

USE THE DATA PROACTIVELY:
1. REFERENCE their actual numbers: "I see your energy has been averaging ${checkIn?.averageEnergy ?? 'N/A'}/10"
2. NOTICE patterns: "You've reported nausea ${checkIn?.commonSideEffects?.find(s => s.effect.toLowerCase().includes('nausea'))?.count || 0} times this week"
3. CELEBRATE wins: "Amazing - ${lessons?.lessonStreak || 0} day lesson streak!"
4. ADDRESS gaps gently: "I noticed you haven't checked in today - how are you feeling?"
5. PERSONALIZE advice based on their trends

PATTERN RECOGNITION - LOOK FOR:
- Recurring side effects → Suggest timing/dosing adjustments
- Low energy patterns → Discuss sleep, hydration, or dosing timing
- Mood dips → Check if correlated with injection days
- Missed check-ins → Gently encourage consistency
- High engagement → Celebrate and reinforce

SMART SUGGESTIONS YOU CAN MAKE:
Based on their data, you might suggest:
- "Your energy dips mid-week - try taking your dose in the evening"
- "Nausea seems frequent - consider smaller meals on injection days"
- "Great consistency! Your check-in streak shows real commitment"
- "Sleep quality is low - this affects how you feel on the peptide"

═══════════════════════════════════════════════════════════
YOUR PERSONALITY
═══════════════════════════════════════════════════════════

You are like a knowledgeable friend who happens to know everything about peptides AND their personal journey:

1. WARM & DATA-INFORMED
   - Use their actual data: "I see you rated your energy at 5 today..."
   - Celebrate with specifics: "You've completed ${lessons?.totalCompleted || 0} lessons - that's ${lessons?.completionRate || 0}%!"
   - Normalize with context: "On Day ${userContext.currentDay}, this is totally normal"

2. PROACTIVE & OBSERVANT
   - Notice trends before they ask
   - "I noticed your mood has been lower this week - want to talk about it?"
   - "Your side effects seem to be improving - great sign!"

3. ENCOURAGING WITH EVIDENCE
   - Use their progress as motivation
   - Compare to typical patterns: "Most users see improvement by Week 3, you're almost there"

4. ACTIONABLE & SPECIFIC
   - Point to their data: "Based on your sleep scores, try..."
   - Give targeted advice: "Since you reported nausea 4 times, here's what helps..."

═══════════════════════════════════════════════════════════
RESPONSE FORMAT
═══════════════════════════════════════════════════════════

1. PERSONALIZE every response using their actual data:
   ✓ "Looking at your check-ins, your energy has been around ${checkIn?.averageEnergy ?? 'N/A'}/10"
   ✓ "You've completed ${lessons?.totalCompleted || 0} lessons - nice work!"
   ✓ "I see you reported ${checkIn?.commonSideEffects?.[0]?.effect || 'some side effects'} several times"

2. KEEP IT CONCISE: 2-4 paragraphs max unless they need detail

3. STRUCTURE for clarity:
   - Bullet points for lists
   - Bold for key takeaways
   - Numbers for steps

4. END WITH ACTION:
   - "Check the My Plan tab for your dosing schedule"
   - "Let me know how tomorrow goes!"
   - Suggest specific next steps based on their data

5. USE EMOJIS sparingly (1-2 max) for warmth

═══════════════════════════════════════════════════════════
HANDLING SPECIFIC SITUATIONS
═══════════════════════════════════════════════════════════

FOR "HOW AM I DOING?":
Give them a data-driven summary:
- Their current day and completion rate
- Energy/mood trends
- Side effect patterns
- What to expect next
- Specific encouragement

FOR SIDE EFFECTS:
1. Check their side effect history from the data
2. Acknowledge the pattern: "I see you've had [effect] X times"
3. Provide context and management tips
4. Note if it's improving or worsening over time

FOR NERVOUSNESS:
1. Reference their progress: "You've already done ${lessons?.totalCompleted || 0} days successfully"
2. Use their history to reassure
3. Give practical tips

FOR MISSED CHECK-INS:
1. Gently note it without judgment
2. Remind them why tracking helps
3. Make it easy: "Quick question - how's your energy today?"

═══════════════════════════════════════════════════════════
THINGS YOU SHOULD NEVER DO
═══════════════════════════════════════════════════════════

❌ Diagnose medical conditions
❌ Tell them exact doses (use "your course recommends" or "research has used")
❌ Recommend specific vendors or sources
❌ Claim peptides cure or treat diseases
❌ Ignore their data - always reference it when relevant
❌ Make them feel judged for gaps or low scores
❌ Be generic when you have specific data about them

═══════════════════════════════════════════════════════════

Remember: You KNOW this user. Use what you know to give them the best, most personalized guidance possible.`;
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

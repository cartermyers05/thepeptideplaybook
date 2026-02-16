import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import {
  CORE_IDENTITY,
  corsHeaders,
  callLovableAI,
  handleAIError,
  errorResponse,
  validateAuthAndTier,
} from "../_shared/ai-engine.ts";

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
  return sideEffects.map(se => `• ${se.effect}: reported ${se.count}/7 days`).join('\n');
};

const getEnergyTrend = (avg: number | null): string => {
  if (avg === null) return "No data yet";
  if (avg >= 8) return "Excellent - you're thriving!";
  if (avg >= 6) return "Good - above average";
  if (avg >= 4) return "Moderate - room for improvement";
  return "Low - let's discuss this";
};

interface UserContext {
  courseTitle: string;
  goal: string;
  peptides: any[];
  currentDay: number;
  totalDays: number;
  currentWeek: number;
  cycleLength: number;
  experienceLevel: string | null;
  mainConcern: string | null;
  suppliesStatus: string | null;
  status: string | null;
  checkInSummary?: any;
  lessonProgress?: any;
  protocolInfo?: any;
  profileStreak?: number;
}

const buildSystemPrompt = (userContext: UserContext | null): string => {
  if (!userContext) {
    return CORE_IDENTITY + `\n\nKeep responses concise but helpful (2-3 paragraphs max unless they ask for detail).`;
  }

  const peptideNames = userContext.peptides.map((p: any) => p.name).join(', ');
  const currentPhase = getCurrentPhase(userContext.currentDay, userContext.totalDays);
  const checkIn = userContext.checkInSummary;
  const hasCheckInData = checkIn && checkIn.last7Days && checkIn.last7Days.length > 0;
  const lessons = userContext.lessonProgress;
  const hasLessonData = lessons && lessons.completedDays && lessons.completedDays.length > 0;

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
${formatSideEffectsAnalysis(checkIn.commonSideEffects)}`;
  } else {
    checkInSection = '\nCHECK-IN INSIGHTS:\n- No check-in data yet. Encourage them to do daily check-ins!';
  }

  let lessonSection = '';
  if (hasLessonData) {
    lessonSection = `
LESSON PROGRESS:
- Lessons Completed: ${lessons.totalCompleted} of ${userContext.totalDays}
- Completion Rate: ${lessons.completionRate}%
- Lesson Streak: ${lessons.lessonStreak} days in a row`;
  } else {
    lessonSection = '\nLESSON PROGRESS:\n- No lessons completed yet.';
  }

  return CORE_IDENTITY + `

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
USE THE DATA PROACTIVELY:
1. REFERENCE their actual numbers when relevant
2. NOTICE patterns in side effects or energy trends
3. CELEBRATE wins and streaks
4. ADDRESS gaps gently if they haven't checked in
5. PERSONALIZE advice based on their trends

Keep responses concise (2-4 paragraphs max unless they need detail). End with an action step.`;
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authResult = await validateAuthAndTier(req);
    if (authResult instanceof Response) return authResult;

    const { message, userContext } = await req.json();
    const systemPrompt = buildSystemPrompt(userContext);

    const { response, ok } = await callLovableAI({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      maxTokens: 1500,
    });

    if (!ok) {
      const errResp = handleAIError(response);
      if (errResp) return errResp;
      const errorText = await response.text();
      console.error("Lovable AI API error:", errorText);
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content || "I'm sorry, I couldn't generate a response.";

    return new Response(
      JSON.stringify({ response: aiResponse }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Coach function error:", error);
    return errorResponse(error instanceof Error ? error.message : String(error));
  }
});

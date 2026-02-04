
# Make AI Coach a "Hive Mind" with Full Context Awareness

## Overview
Transform the AI Coach into a fully context-aware assistant that knows everything about the user's journey - their check-ins, mood trends, side effects, lesson progress, and can make intelligent suggestions based on patterns it observes.

## Current State
The AI Coach currently receives basic context:
- Course title, goal, peptides
- Current day/week
- Supplies status
- Experience level (from localStorage)

## What's Missing for "Hive Mind" Experience

| Data Type | Why It Matters |
|-----------|---------------|
| **Check-in history** | See energy/mood/sleep trends, recurring side effects |
| **Today's check-in** | Know if they've logged today, what they reported |
| **Lesson progress** | Know which lessons they've completed, which they haven't |
| **Streak data** | Celebrate consistency or notice gaps |
| **Side effect patterns** | Identify recurring issues to address proactively |
| **Protocol data** | Full protocol details if they have one |

## Architecture

```text
┌─────────────────────────────────────────────────────────────┐
│                      AskCoach.tsx                           │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Gather all user data using hooks:                    │   │
│  │  • useCourse()      → course details                 │   │
│  │  • useCheckIn()     → check-in history               │   │
│  │  • useLessons()     → lesson progress                │   │
│  │  • useProtocol()    → protocol data                  │   │
│  │  • useProfile()     → streak, profile                │   │
│  └─────────────────────────────────────────────────────┘   │
│                            │                                │
│                            ▼                                │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Build comprehensive UserContext object               │   │
│  │ with ALL available data                              │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                 Edge Function: coach                         │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Enhanced system prompt includes:                     │   │
│  │  • Recent check-in trends (last 7 days)              │   │
│  │  • Side effect patterns                              │   │
│  │  • Lesson completion status                          │   │
│  │  • Streak data                                       │   │
│  │  • Ability to suggest adjustments                    │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Implementation Details

### 1. Enhanced UserContext Interface

New data to include:
- `recentCheckIns`: Last 7 check-ins with energy, mood, sleep, side effects
- `todayCheckIn`: Today's check-in data (or null if not done)
- `hasCheckedInToday`: Boolean
- `completedLessons`: Array of completed day numbers
- `currentStreak`: Number of consecutive days
- `lessonProgress`: Percentage complete
- `averageEnergy`: Calculated from recent check-ins
- `averageMood`: Calculated from recent check-ins
- `commonSideEffects`: Most frequently reported side effects
- `protocolNotes`: Any protocol-specific notes

### 2. Frontend Changes (AskCoach.tsx)

- Import and use `useCheckIn()` hook
- Import and use `useLessons()` hook
- Import and use `useProtocol()` hook
- Build extended context object with all this data
- Calculate trends (average mood, recurring side effects, etc.)

### 3. Backend Changes (coach/index.ts)

Enhance the system prompt to:
- Display check-in trends in a readable format
- Identify patterns (e.g., "User reports nausea on 4 of last 7 days")
- Show which lessons are done vs. pending
- Enable the coach to make suggestions like:
  - "I notice your energy has been low - let's discuss timing"
  - "You've reported nausea 3 days in a row - here's what might help"
  - "Great job completing 5 days in a row!"

### 4. Adjustment Suggestions

The coach can now suggest adjustments like:
- "Based on your sleep reports, you might try morning dosing instead"
- "Your energy trends show a dip mid-week - this is typical at Week 2"
- "I see you skipped yesterday's lesson - want to catch up today?"

## Files to Modify

| File | Changes |
|------|---------|
| `src/components/coach/AskCoach.tsx` | Add hooks, build comprehensive context object |
| `supabase/functions/coach/index.ts` | Enhance system prompt with check-in analysis |

## Example Enhanced Context

```typescript
{
  // Existing data
  courseTitle: "Fat Loss Protocol",
  goal: "fat_loss",
  peptides: [...],
  currentDay: 14,
  
  // NEW: Check-in insights
  checkInSummary: {
    last7Days: [
      { date: "2024-02-03", energy: 6, mood: 7, sideEffects: ["nausea"] },
      { date: "2024-02-02", energy: 5, mood: 6, sideEffects: [] },
      // ...
    ],
    averageEnergy: 5.5,
    averageMood: 6.3,
    averageSleep: 7.1,
    commonSideEffects: ["nausea", "fatigue"],
    hasCheckedInToday: false,
    streak: 7,
  },
  
  // NEW: Lesson progress
  lessonProgress: {
    completedDays: [1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13],
    missedDays: [9],
    completionRate: 86,
  }
}
```

## Example Coach Responses

**User**: "How am I doing?"

**Enhanced Coach Response**:
> Looking at your journey so far - you're doing great! 🎉
> 
> **Your Stats (Day 14):**
> - 7-day check-in streak (awesome consistency!)
> - Average energy: 5.5/10 (common at Week 2 as your body adjusts)
> - Completed 12 of 14 lessons
> 
> I notice you've reported nausea on 4 of the last 7 days. This is typical with Semaglutide in the first few weeks. A few things that might help:
> - Eat smaller, blander meals on injection day
> - Stay well hydrated
> - Take your dose in the evening
> 
> Want me to walk through any adjustment tips?

## Performance Considerations

- Only send last 7 check-ins (not entire history)
- Calculate averages on frontend to reduce prompt size
- Summarize side effects as frequency counts


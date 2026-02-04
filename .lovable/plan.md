
# Peptide Playbook - Course Content Update

## Overview

This is a **content and flow update only** - no design/styling changes. We'll update:

1. AI onboarding chat (new conversation flow)
2. Course preview page (personalized content after quiz)
3. Post-purchase welcome flow (3-step modal)
4. Full lesson content (database seeding)
5. My Plan tab content (detailed peptide info + guides)
6. AI Coach system prompt (full user context)

---

## Current State Analysis

| Component | Current State | Needed Change |
|-----------|---------------|---------------|
| Quiz Flow | 4 questions via AI extraction | Update flow to match new conversation script |
| Course Preview | Shows after goal selection, before purchase | Update content structure for personalization |
| Welcome Flow | Payment -> Quiz -> Dashboard | Add 3-step modal after quiz completion |
| Lessons | Basic placeholder content in DB | Seed full 200-500 word lessons |
| My Plan | Basic peptide cards + accordion guides | Expand with detailed research info |
| AI Coach | Basic protocol context | Full user journey context |

---

## Implementation Plan

### Phase 1: Update Quiz Conversation Flow

**Files:** `supabase/functions/quiz-chat/index.ts`, `src/hooks/useQuizChat.ts`

Update the quiz steps to match the new conversation:

```text
Step 1: Welcome ("Ready to get started?")
Step 2: Goal (6 options with specific labels)
Step 3: Experience (3 options)
Step 4: Main Concern (5 options) 
Step 5: Readiness (3 options)
Step 6: Building Animation -> Dashboard
```

Changes:
- Update `quizSteps` array with new question wording
- Add `readiness` as 5th question (currently only 4)
- Update value mappings to match new options
- Adjust system prompt wording for warmer tone

### Phase 2: Create Post-Purchase Welcome Modal

**New Files:**
- `src/components/onboarding/WelcomeModal.tsx`
- `src/components/onboarding/WelcomeStep1.tsx` (Celebration)
- `src/components/onboarding/WelcomeStep2.tsx` (Supplies check)
- `src/components/onboarding/WelcomeStep3.tsx` (Timeline/Next steps)

**Modified Files:**
- `src/pages/dashboard/Home.tsx` - Add modal trigger for new users
- `src/hooks/useCourse.ts` - Add `updateSuppliesStatus` mutation

Modal Flow:
1. **Celebration** - Congrats message with course title
2. **Supplies Check** - 3 options (have them / arriving / need to order)
3. **Timeline** - Based on answer, show appropriate next steps

Saves `supplies_status` to `user_courses`:
- `'have_them'` -> status = `'active'`
- `'this_week'` -> status = `'waiting_supplies'`  
- `'need_to_order'` -> status = `'waiting_supplies'`

### Phase 3: Seed Full Lesson Content

**Database Migration:** Add comprehensive lesson content for all 6 course types

Each course gets complete lessons for every day:
- **Fat Loss:** 56 lessons (Days 0-55)
- **Muscle:** 56 lessons (Days 0-55)
- **Recovery:** 42 lessons (Days 0-41)
- **Anti-Aging:** 84 lessons (Days 0-83)
- **Cognitive:** 56 lessons (Days 0-55)
- **Beginner:** 42 lessons (Days 0-41)

Each lesson includes:
- `day` - Day number
- `phase` - Phase name (Preparation, Getting Started, etc.)
- `title` - Lesson title
- `content` - Full 200-500 word content
- `action_item` - What to do today

The content will be structured per the provided lesson examples, covering:
- Day 0-3: Understanding peptide, supplies, reconstitution prep
- Day 4-5: Reconstitution and first injection
- Day 6+: Weekly guidance, side effect management, optimization

### Phase 4: Update My Plan Tab Content

**Files:** `src/pages/dashboard/MyPlan.tsx`

Add comprehensive sections:

1. **Enhanced Peptide Cards**
   - `whyForYou` - Personalized explanation
   - `howItWorks` - Mechanism of action
   - `dosingSchedule` - Weekly breakdown table
   - Full timing, frequency, site info
   - Side effects (common + when to concern)
   - Pro tips

2. **Reconstitution Guide** (expanded)
   - The Math section (dose calculations)
   - Step-by-step with detailed explanations
   - Common mistakes to avoid
   - Troubleshooting section

3. **Injection Guide** (expanded)
   - Calming facts section
   - 8-step detailed walkthrough
   - Pro tips for anxiety
   - "Don't worry about" section

### Phase 5: Update AI Coach System Prompt

**Files:** `supabase/functions/coach/index.ts`

Enhance with full user context:

```typescript
const systemPrompt = `You are the AI Coach for Peptide Playbook.

USER CONTEXT:
- Course: ${userContext.courseTitle}
- Goal: ${userContext.goal}
- Peptides: ${userContext.peptides.join(', ')}
- Current Day: ${userContext.currentDay} of ${userContext.totalDays}
- Phase: ${userContext.currentPhase}
- Experience Level: ${userContext.experienceLevel}
- Main Concern: ${userContext.mainConcern}
- Supplies Status: ${userContext.suppliesStatus}

YOUR PERSONALITY:
- Warm, supportive, encouraging
- Knowledgeable but not condescending
- Calm and reassuring when they're nervous
- Direct and practical

RESPONSE GUIDELINES:
1. Reference their specific situation
2. Keep responses concise but complete
3. For medical concerns: acknowledge, educate, recommend consulting healthcare provider
4. For anxiety: normalize feelings, reassure with facts, give practical tips

NEVER:
- Diagnose conditions
- Tell them specific doses (use "your course recommends" or "research has used")
- Recommend vendors
- Claim to cure/treat diseases
`;
```

**Also update:** `src/components/coach/AskCoach.tsx` to pass full context to the coach function.

### Phase 6: Update Course Preview Page

**Files:** `src/pages/CoursePreview.tsx`

After quiz completion, show personalized content:
- Course title and description from quiz goal
- Peptide card with `whyForYou` and `expectations`
- Schedule breakdown (week-by-week dosing)
- Curriculum phases with highlights
- What's included checklist
- CTA with $99 pricing

---

## Files Summary

| File | Change Type |
|------|-------------|
| `supabase/functions/quiz-chat/index.ts` | Modify - update quiz steps and prompts |
| `src/hooks/useQuizChat.ts` | Modify - add readiness step, update labels |
| `src/components/onboarding/WelcomeModal.tsx` | Create - 3-step welcome flow |
| `src/components/onboarding/WelcomeStep1.tsx` | Create - celebration step |
| `src/components/onboarding/WelcomeStep2.tsx` | Create - supplies check |
| `src/components/onboarding/WelcomeStep3.tsx` | Create - timeline/next steps |
| `src/pages/dashboard/Home.tsx` | Modify - add welcome modal trigger |
| `src/pages/dashboard/MyPlan.tsx` | Modify - expand peptide details and guides |
| `src/pages/CoursePreview.tsx` | Modify - update content structure |
| `supabase/functions/coach/index.ts` | Modify - enhanced system prompt |
| `src/components/coach/AskCoach.tsx` | Modify - pass full context |
| Database migration | Create - seed comprehensive lesson content |

---

## Data Structures

### Course Data (for each goal)

```typescript
const courseData = {
  fat_loss: {
    title: "Fat Loss Course",
    duration: 56,
    durationWeeks: 8,
    peptide: {
      name: "Semaglutide",
      whyForYou: "Based on your fat loss goal...",
      expectations: "Reduced appetite within days..."
    },
    schedule: [
      { weeks: "1-2", dose: "0.25mg weekly" },
      { weeks: "3-4", dose: "0.5mg weekly" },
      { weeks: "5-8", dose: "1.0mg weekly" }
    ],
    phases: [
      { name: "Phase 1: Preparation", days: "1-3", highlights: [...] },
      // ...
    ]
  },
  // ... muscle, recovery, anti_aging, cognitive, beginner
};
```

### Peptide Details (for My Plan)

```typescript
const peptideDetails = {
  semaglutide: {
    name: "Semaglutide",
    category: "GLP-1 Receptor Agonist",
    howItWorks: "Mimics GLP-1 hormone...",
    dosingSchedule: [...],
    timing: "Same day each week, ideally morning",
    sideEffects: { common: [...], whenToConcern: [...] },
    tips: [...]
  },
  // ... bpc157, tb500, epithalon, ghkcu, semax, selank
};
```

---

## Technical Notes

1. **No styling changes** - Using existing component classes and Tailwind utilities
2. **Database seeding** - Migration will update `course_templates.lessons` JSON
3. **Quiz flow** - Maintains current AI-powered extraction, just new wording
4. **Welcome modal** - Shows once after quiz completion for users without `supplies_status`
5. **Coach context** - Pulls from `user_courses` and `protocols` tables

---

## Expected Outcome

After implementation:
1. User clicks "Build Your Course" -> enters new conversational quiz
2. Quiz extracts goal, experience, concern, readiness
3. Building animation -> Dashboard
4. Welcome modal appears (first-time only)
5. User selects supplies status -> course status updated
6. Dashboard shows today's lesson with full content
7. My Plan shows comprehensive peptide info + guides
8. AI Coach knows full user context for personalized help

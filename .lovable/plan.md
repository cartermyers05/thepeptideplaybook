
# Fix Critical Goal Mapping + Quiz Data Issues

## Issues Found During End-to-End Testing

### Issue 1: Goal Key Mismatch (CRITICAL -- Breaks All Personalization)
The conversational quiz (`useQuizChat.ts`) stores these goal values in the database:
- `fat_loss`, `muscle`, `recovery`, `anti_aging`, `cognitive`, `beginner`

But `quizPersonalization.ts` expects:
- `weight_loss`, `recovery`, `longevity`, `performance`, `general`

Only `recovery` matches. Everything else falls through to the default "Wellness" match (BPC-157 + GHK-Cu). This means every user who picks Fat Loss, Anti-Aging, Muscle Building, or Cognitive gets the wrong peptide match on their dashboard.

**Fix:** Update `quizPersonalization.ts` to add aliases for the quiz-stored keys, OR update the mapping to include both sets of keys.

### Issue 2: Results Page "Built for [blank] . Addressing [blank]"
`QuizResults.tsx` reads `quizData.experience` and `quizData.fear` but the quiz stores data with different field names and values:
- Quiz stores `experience` as: `never`, `researched`, `experienced`
- Results expects: `beginner`, `some_experience`, `experienced`
- Quiz stores `concern` (not `fear`) as: `side_effects`, `needles`, `dosing`, `legality`, `nothing`
- Results expects: `reconstitution`, `dosing`, `injections`, `side_effects`, `nothing`

Also, the localStorage `quizResponse` object has keys `goal`, `experience`, `fear`, `timeline` but the conversational quiz may store differently.

**Fix:** Align the label maps in `QuizResults.tsx` with the actual stored values, OR normalize values when saving.

### Issue 3: Chat Starter Prompts Not Personalized
Same root cause as Issue 1 -- `getStarterPrompts(quizResponse.primary_goal)` returns `general` prompts because `fat_loss` doesn't match `weight_loss`.

**Fix:** Resolved by fixing Issue 1.

## Files to Modify

| File | Change |
|------|--------|
| `src/lib/quizPersonalization.ts` | Add quiz-stored goal keys as aliases: `fat_loss` maps same as `weight_loss`, `anti_aging` maps same as `longevity`, `muscle` maps same as `performance`, `beginner`/`cognitive` map to `general` |
| `src/pages/QuizResults.tsx` | Update `experienceLabels` and `fearLabels` to include the actual quiz-stored values (`never`, `researched`, `needles`, `legality`, etc.) |

## What This Fixes
- Dashboard shows "Your Weight Loss Blueprint" with Semaglutide + Tirzepatide for fat_loss users
- Chat shows weight-loss-specific starter prompts
- Protocols page shows Semaglutide as "YOUR MATCH" instead of BPC-157
- Results page shows "Built for Complete Beginner . Addressing Side Effects" instead of blank text
- All goal-specific content (doctor scripts, legal guides, quick action cards) personalizes correctly

## What Does NOT Change
- No backend, edge function, or database changes
- No UI/styling changes
- No route or auth changes
- Quiz flow itself works correctly -- only the downstream mapping is broken

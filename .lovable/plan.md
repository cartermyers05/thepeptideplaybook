
# Fix Post-Quiz Flow for Paid Users

## Problem

When a paid user takes (or retakes) the quiz, the BuildingAnimation navigates to `/quiz/results`. Since they're already paid, the results page skips the paywall and shows a "Start My Blueprint" button that just sends them to `/dashboard` -- the generic home page. There's no meaningful "here's your new blueprint" reveal. It feels like the quiz did nothing.

## Solution

Two targeted changes to make the post-quiz experience meaningful for paid users:

### 1. Redirect paid users to My Plan instead of Dashboard home

On the QuizResults page, change the "Start My Blueprint" link from `/dashboard` to `/dashboard/plan` so paid users land directly on their updated protocol with dosing schedules, peptide details, and daily actions visible.

### 2. Show a "Blueprint Updated" banner on My Plan

Add a temporary success banner at the top of the My Plan page when the user arrives from the quiz. This confirms the quiz actually did something and highlights the new protocol. The banner uses a URL parameter (`?updated=true`) and dismisses after the user sees it.

## Technical Details

### File: `src/pages/QuizResults.tsx`

Change the paid-user CTA destination from `/dashboard` to `/dashboard/plan?updated=true`:

```
// Line 400-401: Change Link destination
<Link to="/dashboard/plan?updated=true">
```

### File: `src/pages/dashboard/MyPlan.tsx`

Add logic to detect the `?updated=true` query parameter and show a success banner:

- Read `searchParams.get('updated')`
- If `'true'`, show a dismissible banner: "Your Blueprint has been updated based on your quiz answers"
- Clean the URL param after display so it doesn't persist on refresh

### File: `src/components/quiz/BuildingAnimation.tsx`

No changes needed -- it already correctly navigates to `/quiz/results`.

### Files Modified

| File | Change |
|------|--------|
| `src/pages/QuizResults.tsx` | Change paid-user CTA from `/dashboard` to `/dashboard/plan?updated=true` |
| `src/pages/dashboard/MyPlan.tsx` | Add "Blueprint Updated" success banner when `?updated=true` param is present |

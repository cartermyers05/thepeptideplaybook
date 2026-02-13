

# Redesign Dashboard Home as Weekly Command Center

## Overview
Replace the current static dashboard home page with a personalized weekly command center that immediately tells users what week they're on, what to expect, and what to do next. The design matches the homepage's warm, light aesthetic exactly.

## Data Strategy

The user's protocol tracking state already exists in the `protocol_progress` table. Instead of adding a new column to profiles, we query `protocol_progress` for any row with `status = 'active'` for the current user. This gives us `start_date`, `peptide_slug`, and `goal_slug`.

- **If active progress exists**: compute `currentWeek = Math.floor((today - startDate) / 7) + 1`, clamped 1-20, and show the full weekly command center
- **If no active progress**: show the "Ready to Start Your Protocol?" hero card that navigates to `/dashboard/protocols` (where the existing StartTrackingCard lives)

No database changes needed -- all required tables already exist.

## New Hook

### `src/hooks/useActiveProtocolProgress.ts`
A simple hook that queries `protocol_progress` for the user's active entry (any peptide/template):

```
SELECT * FROM protocol_progress 
WHERE user_id = auth.uid() AND status = 'active' 
LIMIT 1
```

Returns the progress row or null. Reuses the existing `computeCurrentWeek` function from `useProtocolProgress`.

## Content Maps (inline in Home.tsx)

All week-specific content is stored as simple JavaScript objects -- no new database tables:

- **Week titles**: 20 entries ("Your Body Is Adjusting" through "Graduation")
- **Dose map**: week ranges to dose strings ("0.25mg/week" for weeks 1-4, etc.)
- **Dose change weeks**: [5, 9, 13, 16]
- **What to Expect**: 20 short summaries
- **Nutrition tips**: 5 phase-based strings
- **Movement tips**: 5 phase-based strings
- **Progress expectations**: 6 range-based strings

## Page Layout (when protocol is active)

### 1. Hero Weekly Brief Card
- Warm cream background (#FFF7ED), subtle shadow
- Top-left: "WEEK X OF 20" label in font-mono #F97316, week title in bold #111827
- Top-right: dose badge (green pill), amber "Dose increase this week" badge on weeks 5/9/13/16
- 2x2 grid of mini-cards (single column on mobile): What to Expect, Nutrition, Movement, Progress Check -- each white with subtle border, clickable to `/dashboard/protocols`
- Full-width "Read Your Full Week X Brief" button at bottom

### 2. Quick Access Row
3 white cards (stacked on mobile):
- AI Research Coach (purple accent) -- links to `/dashboard/chat`
- Decision Matrix (orange accent) -- links to `/dashboard/protocols`
- 2026 Legal Guide (green accent) -- links to `/dashboard/protocols#legal-status`

### 3. Journey Progress Bar
- White card with horizontal progress bar (#F97316 fill)
- "Week X of 20" left, "X% complete" right
- 4 phase markers: Titration, Building, Acceleration, Maintenance -- current phase bold + orange

## Page Layout (no active protocol)

Single hero card (#FFF7ED):
- "Ready to Start Your Protocol?" heading
- Descriptive subtext
- "Set My Start Date" button (#F97316) that navigates to `/dashboard/protocols`
- "You can always change this later" dim text

## Files

| File | Change |
|------|--------|
| `src/hooks/useActiveProtocolProgress.ts` | New -- fetches user's active protocol_progress row |
| `src/pages/dashboard/Home.tsx` | Full rewrite -- weekly command center layout with all content maps |

## What Does NOT Change
- No database migrations or new tables
- No changes to navigation, DashboardLayout, DashboardTopNav, MobileBottomNav
- No changes to protocol detail view, check-in system, or accordion sections
- No changes to any other pages, components, auth, or payment flows
- No changes to EvidenceRating, WarningBox, QuoteBox, or StudyCard components



# Weekly Check-In System for Protocol Tracking

## Overview
Add a weekly check-in feature that appears below the "This Week" card when a user has an active protocol. Users can log weight, symptom severity, energy level, and notes each week. A progress chart and history table show trends over time.

## Database Changes

### New Table: protocol_checkins

| Column | Type | Details |
|--------|------|---------|
| id | uuid | PK, default gen_random_uuid() |
| user_id | uuid | NOT NULL, references auth.users(id) |
| protocol_progress_id | uuid | NOT NULL, references protocol_progress(id) |
| week_number | integer | NOT NULL |
| weight_lbs | decimal | nullable |
| symptom_rating | integer | nullable, 1-5 |
| energy_rating | integer | nullable, 1-5 |
| notes | text | nullable |
| created_at | timestamptz | default now() |

- Unique constraint on (protocol_progress_id, week_number)
- RLS: SELECT and INSERT for own rows (user_id = auth.uid())
- UPDATE policy also needed for the "Edit this entry" feature

## Code Changes

### 1. New Hook: `src/hooks/useProtocolCheckins.ts`

React Query hooks for check-in CRUD:
- `useCurrentWeekCheckin(progressId, weekNumber)` -- fetches the check-in for the current week if it exists
- `useAllCheckins(progressId)` -- fetches all check-ins for the progress entry, ordered by week
- `useSubmitCheckin()` -- mutation to upsert a check-in row (insert or update on conflict)
- Returns loading states and the last logged weight for placeholder purposes

### 2. New Component: `src/components/protocol/WeeklyCheckinCard.tsx`

The main check-in card rendered below the ThisWeekCard.

**Already-logged state:**
- Shows "Week X logged" with a green checkmark
- Displays logged values: weight, symptom emoji, energy emoji, notes
- "Edit this entry" link that switches back to the form pre-filled with existing values

**Form state (not yet logged or editing):**
- Heading: "Week X Check-in" with "Quick update -- takes 30 seconds" subtext
- Weight input: number field with JetBrains Mono font, placeholder shows last logged weight
- Symptom rating: 5 emoji buttons (None/Mild/Moderate/Rough/Severe) with color-coded selected states
- Energy rating: 5 emoji buttons (Great/Good/Okay/Low/Drained) with matching color-coded states
- Notes: single-line text input
- Submit button: "Log Check-in" green button, shows "Logged!" confirmation for 2 seconds after success
- All buttons 56px tall with 12px border-radius, emoji 24px, labels 11px

### 3. New Component: `src/components/protocol/CheckinHistory.tsx`

Visible when user has 2+ check-ins.

**Weight chart:**
- Recharts LineChart: green line (#06D6A0), JetBrains Mono axis labels, 200px height
- Custom tooltip with dark background showing "Week X: Y lbs"
- Only plots weeks where weight was logged

**Symptom dot row:**
- Colored dots (green to red) for each logged week's symptom rating
- Week numbers below dots
- Gray dots for weeks without symptom data

**Expandable history table:**
- "See all entries" collapsible section using shadcn Collapsible
- Table with columns: Week, Weight, Symptoms (emoji), Energy (emoji), Notes, Date
- Alternating row backgrounds, horizontal scroll on mobile

### 4. Updated: `src/components/protocol/ProtocolDetailView.tsx`

Insert the new components into the active tracking section (lines 188-213), between the ThisWeekCard and the "Pause tracking" button:

```
<ProtocolProgressHeader ... />
<ThisWeekCard ... />
<WeeklyCheckinCard progressId={progress.id} currentWeek={currentWeek} />
<CheckinHistory progressId={progress.id} />
<button>Pause tracking</button>
```

No changes to the header, accordion sections, or any other part of the view.

## Files Summary

| File | Change |
|------|--------|
| Database migration | Create protocol_checkins table with RLS |
| `src/hooks/useProtocolCheckins.ts` | New -- hooks for check-in CRUD and history |
| `src/components/protocol/WeeklyCheckinCard.tsx` | New -- check-in form and logged state |
| `src/components/protocol/CheckinHistory.tsx` | New -- weight chart, symptom dots, history table |
| `src/components/protocol/ProtocolDetailView.tsx` | Updated -- render check-in components in active tracking section |

## What Does NOT Change
- No changes to ProtocolProgressHeader, ThisWeekCard, StartTrackingCard, or accordion sections
- No changes to EvidenceRating, WarningBox, QuoteBox, or StudyCard components
- No changes to navigation, sidebar, or other dashboard pages
- No removal of any existing components or routes




# Protocol Tracking System

## Overview
Add a live progress tracking system that lets users start tracking a protocol and see their current week, dose, phase, and personalized weekly guidance -- all driven by two new database tables.

## Database Changes

### Table 1: protocol_progress
Stores each user's active tracking state for a protocol.

| Column | Type | Details |
|--------|------|---------|
| id | uuid | PK, default gen_random_uuid() |
| user_id | uuid | NOT NULL, references auth.users(id) |
| protocol_template_id | uuid | NOT NULL, references protocol_templates(id) |
| peptide_slug | text | NOT NULL |
| goal_slug | text | NOT NULL |
| start_date | date | NOT NULL |
| status | text | NOT NULL, default 'active' |
| created_at | timestamptz | default now() |
| updated_at | timestamptz | default now() |

RLS: Users can SELECT, INSERT, UPDATE their own rows (user_id = auth.uid()). Add updated_at trigger.

### Table 2: protocol_weekly_content
Stores week-by-week guidance content for each peptide.

| Column | Type | Details |
|--------|------|---------|
| id | uuid | PK, default gen_random_uuid() |
| peptide_slug | text | NOT NULL |
| week_number | integer | NOT NULL |
| title | text | NOT NULL |
| content | text | NOT NULL |
| dose_info | text | nullable |
| dose_change | boolean | default false |
| new_dose | text | nullable |
| previous_dose | text | nullable |
| alert_message | text | nullable |
| phase_name | text | nullable |

Unique constraint on (peptide_slug, week_number). RLS: SELECT for authenticated users.

### Seed Data
Insert 20 rows for semaglutide weeks 1-20 with all the content from the prompt (dose titration from 0.25mg through 2.4mg across 5 phases).

## Code Changes

### New Hook: `src/hooks/useProtocolProgress.ts`
- `useProtocolProgress(templateId, peptideSlug, goalSlug)` -- fetches the user's active/paused protocol_progress entry
- `useWeeklyContent(peptideSlug, weekNumber)` -- fetches the protocol_weekly_content for the current week
- `useStartTracking()` -- mutation to insert a new protocol_progress row
- `usePauseTracking()` -- mutation to update status to 'paused'
- `useResumeTracking()` -- mutation to update status to 'active'
- Current week computed in frontend: `Math.floor((Date.now() - start_date) / (7 * 86400000)) + 1`

### New Component: `src/components/protocol/ProtocolProgressHeader.tsx`
Renders the live progress display when the user has an active tracking entry:

- Left column: large week number (48px, JetBrains Mono, #06D6A0), phase name below
- Right column: current dose badge (green pill), next milestone text, progress bar (week X of 68)
- Background: gradient with subtle green tint, green border
- Mobile: single column stack

### New Component: `src/components/protocol/ThisWeekCard.tsx`
Renders the weekly content card below the progress header:

- Shows weekly_content.title as heading
- Shows weekly_content.content as body text
- If dose_change is true, shows an amber WarningBox with the alert_message above the content
- Dark card styling (#111827 background)

### New Component: `src/components/protocol/StartTrackingCard.tsx`
Shown when user has no active protocol_progress entry:

- Centered card with heading "Start Tracking Your Protocol"
- Date picker input (default: today) with 16px font size (prevents iOS zoom)
- "Start Tracking" button (#06D6A0 background)
- On click: inserts protocol_progress row and invalidates query cache
- Dark card styling (#111827 background)

### Updated: `src/components/protocol/ProtocolDetailView.tsx`
- Import and use the new hooks and components
- After the header card and before the accordion sections:
  1. If user has active/paused progress: render ProtocolProgressHeader + ThisWeekCard + "Pause tracking" link
  2. If user has no progress entry (or paused): render StartTrackingCard (with "Resume" messaging if paused)
- The 8-section accordion remains completely untouched below these new elements

## Files Summary

| File | Change |
|------|--------|
| Database migration | Create protocol_progress + protocol_weekly_content tables, seed 20 weeks of semaglutide data |
| `src/hooks/useProtocolProgress.ts` | New -- hooks for progress CRUD and weekly content |
| `src/components/protocol/ProtocolProgressHeader.tsx` | New -- live progress display |
| `src/components/protocol/ThisWeekCard.tsx` | New -- weekly guidance card |
| `src/components/protocol/StartTrackingCard.tsx` | New -- start tracking flow with date picker |
| `src/components/protocol/ProtocolDetailView.tsx` | Updated -- integrates new tracking components above accordion |

## What Does NOT Change
- No changes to the 8-section accordion or its content
- No changes to EvidenceRating, WarningBox, QuoteBox, or StudyCard components
- No changes to navigation, sidebar, or other dashboard pages
- No changes to the protocol list view or UserProtocolCard
- No removal of any existing components or routes


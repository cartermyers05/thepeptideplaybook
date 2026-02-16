

# Fix: Circular Navigation and Missing "Set Start Date" Flow

## Problem
When a user has no active protocol:
1. Dashboard Home shows "Ready to Start Your Protocol?" with a "Set My Start Date" button that navigates to `/dashboard/protocols`
2. The Protocols page detects no active protocol and immediately redirects back to `/dashboard`
3. The user is stuck in a loop and can never start tracking

## Solution
Fix the Protocols page to handle the "no active protocol" state by showing a start-date picker instead of redirecting. This way when users click "Set My Start Date" from the dashboard, they land on a page that actually lets them set their start date and create an active `protocol_progress` record.

## Changes

### 1. Update `src/pages/dashboard/Protocols.tsx`

Remove the redirect-to-dashboard logic. Instead, when `currentWeek === null` (no active protocol), show an inline "Set Your Start Date" card with:
- A date picker (simple HTML date input styled to match the design system)
- A "Start My Protocol" button that inserts a row into `protocol_progress` with:
  - `user_id`: current user
  - `peptide_slug`: "semaglutide" (default)
  - `goal_slug`: user's quiz goal or "weight-loss" default
  - `start_date`: selected date
  - `status`: "active"
  - `protocol_template_id`: a default/placeholder UUID
- After successful insert, invalidate queries so the page re-renders with the weekly brief

### 2. Update `src/pages/dashboard/Home.tsx`

No logic change needed -- the "Set My Start Date" button already navigates to `/dashboard/protocols`, which will now correctly handle it.

### 3. Add start protocol mutation

Add a `useCreateProtocolProgress` mutation (either in `useProtocolProgress.ts` or inline in Protocols.tsx) that:
- Inserts into `protocol_progress`
- Invalidates `["active-protocol-progress"]` query key on success
- Returns the created record

## Technical Details

```text
Flow after fix:
  /dashboard (no protocol) 
    -> Click "Set My Start Date"
    -> /dashboard/protocols (no protocol)
    -> Shows date picker card instead of redirecting
    -> User picks date, clicks "Start My Protocol"
    -> INSERT into protocol_progress
    -> Page re-renders with Week 1 brief
    -> /dashboard also shows the weekly command center
```

### RLS Check
The `protocol_progress` table needs an INSERT policy for the user. Let me verify this exists -- if not, we add one via migration.

### Files Modified

| File | Change |
|------|--------|
| `src/pages/dashboard/Protocols.tsx` | Replace redirect with start-date picker UI for no-protocol state |
| `src/hooks/useProtocolProgress.ts` | Potentially reuse existing `useStartTracking` mutation (already exists!) |

The existing `useStartTracking` mutation in `useProtocolProgress.ts` already handles inserting a protocol_progress record. We just need to wire it up in the Protocols page with a date picker UI.

### What Does NOT Change
- Dashboard Home page layout or content
- Navigation structure
- Weekly briefs data
- Check-in system
- Any other pages or components


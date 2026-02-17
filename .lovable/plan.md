

# AI Coach Protocol Updates via Conversation

## What This Does

Right now, the AI Coach can **create** protocols but can't **update** them. When a user says "I got my supplies" or "starting today," the coach just responds with text but nothing actually changes in their dashboard.

This upgrade gives the coach a new tool so it can update the user's active protocol in real-time based on what they say in conversation. No buttons needed -- just tell the coach what's happening and your journey updates automatically.

## Examples of What Works After This

- "I got my supplies today" --> Coach marks supplies as ready, updates dashboard
- "I'm starting my protocol tomorrow" --> Coach sets the start date, status changes to "active"
- "I need to pause for a week" --> Coach pauses the protocol
- "I'm back, resuming now" --> Coach reactivates and adjusts the timeline
- "I want to extend my cycle by 2 weeks" --> Coach updates cycle length

## Technical Details

### 1. Database Change

Add a `supplies_status` column to `user_protocols`:

| Column | Type | Default | Purpose |
|--------|------|---------|---------|
| supplies_status | text | 'not_ordered' | Tracks: not_ordered, ordered, received, ready |

### 2. New AI Tool: `update_protocol`

Added to the `peptide-coach` edge function alongside the existing `create_protocol` tool. The AI decides when to call it based on conversational context.

**Fields the tool can update:**
- `status` (not_started, active, paused, completed)
- `supplies_status` (not_ordered, ordered, received, ready)
- `start_date` (when user says they're starting)
- `cycle_length_weeks` (if user wants to extend/shorten)
- `end_date` (auto-calculated from start_date + cycle_length)

### 3. Updated System Prompt

New instructions tell the coach when to use `update_protocol`:

- User mentions having supplies --> update supplies_status to "received" or "ready"
- User says they're starting --> set status to "active", start_date to today (or specified date)
- User asks to pause --> set status to "paused"
- User resumes --> set status back to "active", optionally adjust start_date
- User wants to change duration --> update cycle_length_weeks

The coach confirms the change conversationally ("Got it, I've marked your supplies as received and updated your timeline").

### 4. Frontend: Protocol Refresh on Update

The Coach page already handles `X-Protocol-Created` header to refresh protocol data. We add an `X-Protocol-Updated` header so the same refresh logic triggers on updates too.

### 5. Dashboard Reflection

The existing dashboard components (`ActiveProtocolState`, `ProtocolHeader`, etc.) already read from `user_protocols`. Once the coach updates the record, the dashboard automatically reflects changes on next visit. The `supplies_status` field will show in the protocol detail view.

### Files Modified

| File | Change |
|------|--------|
| `supabase/functions/peptide-coach/index.ts` | Add `update_protocol` tool definition, handler, and system prompt instructions |
| `src/pages/dashboard/Coach.tsx` | Handle `X-Protocol-Updated` header to refresh protocol query |
| `src/hooks/useUserProtocol.ts` | Export `supplies_status` from protocol data |
| `src/components/dashboard/home/ActiveProtocolState.tsx` | Show supplies status indicator |

### Migration

```sql
ALTER TABLE public.user_protocols 
ADD COLUMN supplies_status text NOT NULL DEFAULT 'not_ordered';
```




# Fix Protocol Flow: Chat-to-Protocol Sync + Streaming Animation

## The Problems

There are three interconnected issues:

### 1. Chat creates protocols that never show up
The AI Chat saves protocols to the `protocols` table, but the Protocol page (`/dashboard/protocol`) reads from a completely different table called `user_protocols`. These tables have different schemas and are never synced. So when the AI builds your protocol, it goes into a black hole.

### 2. Streaming text looks ugly (chunky, not smooth)
The chat applies a character-by-character "typewriter" animation on top of the already-chunked streaming data. Each network chunk arrives (sometimes 5-50 characters at once), then the typewriter tries to animate each character individually. This creates a stuttering, jerky effect instead of smooth text flow.

### 3. Protocols page is disconnected
There are actually THREE protocol systems that don't talk to each other:
- `/dashboard/protocol` -- reads from `user_protocols` table (AI-generated compound stacks)
- `/dashboard/protocols` -- reads from `protocol_progress` table (hardcoded semaglutide weekly briefs)
- Chat `create_protocol` tool -- writes to `protocols` table

## The Fix

### Part 1: Connect Chat to Protocol Page

**Edge function change (`supabase/functions/chat/index.ts`)**:
When the `create_protocol` tool runs, ALSO insert into the `user_protocols` table (the one that `/dashboard/protocol` actually reads from). Map the fields:
- `protocol_name` stays the same
- `peptides` array maps to `compounds` JSONB (adding `route` and `category` fields from the peptide data)
- `cycle_length_weeks` stays the same
- Build a `schedule` JSONB from frequency data (e.g., "twice daily" = every day, "once weekly" = one day)
- Set `status: "active"`, `start_date: today`
- Generate `weekly_expectations` from the peptide data

**ChatInterface.tsx change**:
When `protocolCreated` is true, also invalidate the `["user-protocol", user?.id]` query key so the Protocol page refreshes immediately. Add a more prominent success banner with a "View Protocol" link.

### Part 2: Fix Streaming Animation

**TypewriterMessage.tsx change**:
Remove the character-by-character typewriter effect for streaming messages. Instead, show the streamed content directly as it arrives (the SSE chunks already provide a natural "typing" feel). Keep a simple cursor animation at the end while streaming is active.

The current flow: SSE chunk arrives -> state updates -> typewriter animates each character (stuttery)
The new flow: SSE chunk arrives -> state updates -> text renders immediately with blinking cursor (smooth)

**useTypewriter.ts**: Not deleted but the streaming path in TypewriterMessage won't use it. Keep it available for non-streaming use cases (like the quiz).

### Part 3: Unify Protocol Navigation

**Remove `/dashboard/protocols` route** (the hardcoded semaglutide weekly briefs page). This page is misleading -- it only works for one specific protocol template and doesn't connect to anything the chat creates.

**Make `/dashboard/protocol` the single protocol destination**. Update any navigation references that point to `/dashboard/protocols` to point to `/dashboard/protocol` instead.

Update the Protocol page's empty state to have a clearer CTA that links to the chat to build a protocol.

## Files Changed

| File | Change |
|------|--------|
| `supabase/functions/chat/index.ts` | Dual-write: insert into both `protocols` AND `user_protocols` when creating a protocol |
| `src/components/dashboard/ChatInterface.tsx` | Invalidate `user-protocol` query key on protocol creation; remove typewriter from streaming; show "View Protocol" link |
| `src/components/dashboard/TypewriterMessage.tsx` | Replace typewriter with direct text rendering + cursor for streaming messages |
| `src/App.tsx` | Remove `/dashboard/protocols` route, redirect to `/dashboard/protocol` |
| `src/components/dashboard/DashboardTopNav.tsx` | Update any "Protocols" nav link to point to `/dashboard/protocol` |
| `src/components/dashboard/MobileBottomNav.tsx` | Update any nav link pointing to `/dashboard/protocols` |
| `src/components/dashboard/home/ActiveProtocolState.tsx` | Update quick access link from `/dashboard/protocols` to `/dashboard/protocol` |
| `src/components/dashboard/home/NoProtocolState.tsx` | Ensure CTA goes to quiz or chat, not protocols |

## Technical Details

### Dual-write in edge function

When `create_protocol` succeeds, build a `user_protocols` row:

```text
compounds JSONB = peptides.map(p => ({
  name: p.name,
  description: p.purpose,
  dose: p.dosage,
  frequency: p.frequency,
  timing: p.timing,
  route: p.site || "Subcutaneous",
  category: inferCategory(p),  // map from goal
  rationale: p.rationale
}))

schedule JSONB = buildScheduleFromFrequency(compounds)
  e.g. "twice daily" -> all 7 days
  e.g. "once weekly" -> ["Monday"]
  e.g. "3x per week" -> ["Monday","Wednesday","Friday"]

weekly_expectations = generateWeeklyExpectations(peptides, cycle_length_weeks)
```

### Streaming fix

Replace TypewriterMessage's streaming mode:

```text
// Instead of character-by-character animation:
if (isStreaming) {
  return (
    <div className="text-sm">
      <ReactMarkdown>{content}</ReactMarkdown>
      {content && <span className="inline-block w-0.5 h-4 bg-primary animate-pulse ml-0.5" />}
    </div>
  );
}
```

This means the text appears exactly as fast as the server sends it (which already feels like typing), without an additional animation layer creating stutter.

### Schedule builder logic

```text
function buildSchedule(compounds):
  schedule = { Monday: [], Tuesday: [], ... }
  for each compound:
    if frequency contains "daily" or "every day":
      add to all 7 days
    if frequency contains "twice weekly" or "2x":
      add to Monday, Thursday
    if frequency contains "3x" or "three times":
      add to Monday, Wednesday, Friday
    if frequency contains "once weekly" or "1x":
      add to Monday
  return schedule
```

## What Does NOT Change

- No database schema changes needed (both tables already exist)
- No changes to the quiz, homepage, guides, checkout, or login
- The `/dashboard/protocol` page UI stays the same (it already renders compounds, schedules, and timelines nicely)
- All existing hooks and data connections preserved
- The chat's AI system prompt and tool definitions stay the same

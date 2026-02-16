

# Fix: Coach Chat Doesn't Save Protocols

## Root Cause

There are **two completely separate chat systems** in the app:

1. **Coach page** (`/dashboard/coach`) -- calls `peptide-coach` edge function. This is the one you're actually using. It has NO tool-calling capability. It just outputs text and tries to detect protocols by looking for the string "YOUR PROTOCOL:" in the response. Even when it "detects" a protocol, it only marks onboarding as complete -- it never saves any protocol data to the database.

2. **Chat page** (`/dashboard/chat`) -- calls the `chat` edge function. This one HAS the `create_protocol` tool and the dual-write logic we added. But you're not using this page.

So the protocol creation code exists, but it's in the wrong edge function.

## The Fix

### Step 1: Add tool-calling to the `peptide-coach` edge function

Port the `create_protocol` tool from `chat/index.ts` into `peptide-coach/index.ts`:

- Add the same tool definition (name, parameters, required fields)
- Add the same `handleToolCall` function with the dual-write logic (writes to both `protocols` and `user_protocols`)
- Update the `callLovableAI` call to pass `tools` and `toolChoice: "auto"`
- Add two-pass handling: if the AI returns tool calls, execute them, then make a follow-up streaming call with the tool results
- Set the `X-Protocol-Created` header when a protocol is created

### Step 2: Update Coach.tsx to handle protocol creation

In the Coach page component:

- Check for the `X-Protocol-Created` response header after streaming completes
- When detected, invalidate `["user-protocol"]` query keys so the Protocol page updates
- Show a toast notification with a "View Protocol" button that navigates to `/dashboard/protocol`
- Remove the old string-matching detection (`"YOUR PROTOCOL:"`) since tool calls handle this properly now

### Step 3: Add the protocol intake questionnaire to the coach system prompt

Add the same protocol creation instructions from the chat system prompt to the coach's `COACH_ADDITIONS`:

- The 4-part intake questionnaire (Goals, Health Status, Experience Level, Preferences)
- The rule: do NOT call `create_protocol` until all 4 categories are gathered
- The post-creation formatted output instructions

## Files Changed

| File | Change |
|------|--------|
| `supabase/functions/peptide-coach/index.ts` | Add `create_protocol` tool definition, handle tool calls with dual-write, two-pass streaming, X-Protocol-Created header |
| `src/pages/dashboard/Coach.tsx` | Detect X-Protocol-Created header, invalidate user-protocol queries, show success toast with "View Protocol" link, remove string-matching detection |

## What Stays the Same

- The `chat` edge function is untouched (it already works for the Chat page)
- No database schema changes
- The Protocol page UI stays the same
- All existing coach message history and persistence logic stays the same


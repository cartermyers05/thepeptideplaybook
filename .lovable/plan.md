
# Fix Chat Streaming Animation

## Problem

When you send a message in the AI Research Chat (`/dashboard/chat`), the entire response appears instantly instead of streaming in word-by-word. It looks like the AI just dumps a wall of text.

The root cause: the `chat` edge function has a "streaming optimization" (lines 566-576) that sends the entire AI response as a **single SSE chunk** instead of streaming it token by token. The frontend parses this one chunk and renders the full message immediately -- no animation.

The AI Coach (`/dashboard/coach`) does NOT have this problem because it already makes a proper streaming API call.

## Fix

### 1. `supabase/functions/chat/index.ts` -- Remove the synthetic single-chunk SSE

Replace the "no tool calls" block (lines 566-576) that sends everything in one shot. Instead, make a real streaming API call (same as the coach does), so tokens arrive gradually and the frontend renders them as they come in.

The change: when there are no tool calls, instead of packaging `assistantMessage.content` as a fake single-chunk SSE, make a second `callLovableAI` call with `stream: true`. This is the same pattern already used in the fallback block (lines 579-595) and in the peptide-coach function.

This does add one extra API call for non-tool-call messages, but the streaming UX is worth it. The latency increase is minimal since the model already generated the response -- the gateway just needs to re-stream it.

**Alternative (faster, no extra API call):** Split the existing `assistantMessage.content` into word-sized chunks and emit them as individual SSE events with small delays using a ReadableStream. This simulates streaming without an extra API call.

The word-chunking approach is better because:
- No extra API call = no extra latency or rate limit risk
- Same visual effect as real streaming
- Chunks of ~3-5 words at ~30ms intervals feel natural

### 2. No frontend changes needed

The `ChatInterface.tsx` already has proper SSE parsing and `TypewriterMessage` already shows a blinking cursor during streaming. The issue is purely server-side -- the tokens just need to arrive gradually instead of all at once.

## Files Modified

| File | Change |
|------|--------|
| `supabase/functions/chat/index.ts` | Replace synthetic single-chunk SSE with word-chunked simulated stream (lines 566-576) |

## What Does NOT Change

- No frontend component changes
- No coach function changes (already streams properly)
- No other edge functions affected
- No database changes

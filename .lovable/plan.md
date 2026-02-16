

# Fix: Chat Reliability, Saving, Streaming, and Protocol Sync

## Problems Found

### 1. Chat only responds half the time -- DUPLICATE REQUESTS
The network logs show **two identical POST requests** fired at the exact same timestamp. This happens because the textarea has both an `onKeyDown` handler (Enter key) AND a form `onSubmit` handler -- both call `handleSubmit`. Since `handleSubmit` is async and state updates are deferred, the `isLoading` guard doesn't block the second call in time. This doubles API usage and can trigger rate limits (429 errors), causing one or both responses to fail silently.

### 2. Protocol creation header is invisible to the browser
The `chat` edge function sets `X-Protocol-Created: true` but does NOT include `Access-Control-Expose-Headers` in the CORS response. Browsers block reading custom headers unless explicitly exposed. So even when a protocol IS created, the frontend never detects it. (The `peptide-coach` function has this header -- the `chat` function is missing it.)

### 3. Every message makes TWO API calls (wasteful)
The current flow for a normal (no-tool) message:
1. Non-streaming call to check for tool calls (waits for full response)
2. Throws away that response, makes a SECOND streaming call

This doubles latency and API usage. When rate limits are tight, the second call fails.

### 4. Chat messages ARE being saved -- but only when streaming succeeds
The save logic is correct. The issue is that when the duplicate request or rate limit kills the stream, `assistantContent` stays empty, and nothing gets saved.

## The Fix

### File 1: `src/components/dashboard/ChatInterface.tsx`

**Fix A: Prevent duplicate submissions**
Add a `isSubmittingRef` guard that gets set immediately (synchronously) before any async work. This prevents the second handler from getting through.

```text
const isSubmittingRef = useRef(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!input.trim() || isLoading || !user || isSubmittingRef.current) return;
  isSubmittingRef.current = true;
  // ... rest of logic
  // In finally block:
  isSubmittingRef.current = false;
};
```

**Fix B: Better error surfacing**
When the fetch response is not ok, parse the error body and show a toast instead of a generic "Sorry, I encountered an error."

### File 2: `supabase/functions/chat/index.ts`

**Fix A: Add `Access-Control-Expose-Headers`**
Add `"Access-Control-Expose-Headers": "X-Protocol-Created"` to BOTH the tool-call response (line 498) AND the normal streaming response (line 519). Without this, the browser silently ignores the header and protocols never sync.

**Fix B: Eliminate the redundant second API call**
When the first (non-streaming) call returns content with no tool calls, convert that content into an SSE-formatted stream and return it directly instead of making a second API call. This cuts latency in half for normal messages and avoids rate limit issues.

```text
// If no tool calls, check if the first response already has content
if (assistantMessage?.content) {
  // Convert to SSE format and return directly
  const sseContent = `data: ${JSON.stringify({
    choices: [{ delta: { content: assistantMessage.content } }]
  })}\n\ndata: [DONE]\n\n`;

  return new Response(sseContent, {
    headers: {
      ...corsHeaders,
      "Content-Type": "text/event-stream",
      "Access-Control-Expose-Headers": "X-Protocol-Created",
    },
  });
}
// Fallback: only make a streaming call if the first response was empty
```

### File 3: `supabase/functions/_shared/ai-engine.ts`

**Fix: Add `Access-Control-Expose-Headers` to the shared `corsHeaders`**
This ensures ALL edge functions expose custom headers by default, preventing this class of bug from recurring.

```text
export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, ...",
  "Access-Control-Expose-Headers": "X-Protocol-Created",
};
```

## Files Changed

| File | Change |
|------|--------|
| `src/components/dashboard/ChatInterface.tsx` | Add `isSubmittingRef` guard to prevent duplicate submissions; improve error toast messages |
| `supabase/functions/chat/index.ts` | Reuse first API response content instead of making a second call; add `Access-Control-Expose-Headers` |
| `supabase/functions/_shared/ai-engine.ts` | Add `Access-Control-Expose-Headers` to shared `corsHeaders` |

## Expected Results After Fix

- **Reliability**: No more duplicate requests = no more rate limit failures = chat responds every time
- **Speed**: Normal messages are ~2x faster (one API call instead of two)
- **Protocol sync**: `X-Protocol-Created` header is now readable by the browser, so protocols created in chat will trigger the toast + cache invalidation and show up in the Protocol tab
- **Saving**: With reliable responses, messages are consistently saved to the database

## What Does NOT Change

- No database changes
- No changes to the Coach page (already working correctly)
- No changes to the Protocol page UI
- TypewriterMessage streaming animation stays as-is (already fixed)
- The AI system prompt and tool definitions stay the same




# Speed Up the Quiz: Streaming Responses

## Problem

The quiz calls the AI and waits for the **entire response** to come back before showing anything. Even though the model is fast (~1-2 seconds), it feels slow because the user stares at nothing while waiting. There's also no loading indicator beyond the empty bubble.

## Solution

Two changes that together make the quiz feel instant:

### 1. Add Streaming to the Quiz Edge Function

Switch from waiting for the full JSON response to streaming tokens as they arrive. The AI's conversational reply streams in real-time (like ChatGPT), while the structured extraction (goal/experience/etc.) is parsed from the tool call at the end.

**How it works:**
- Enable `stream: true` on the AI gateway request
- Stream the response text chunks back to the frontend via Server-Sent Events (SSE)
- Parse the tool call arguments from the final chunk to get extracted values
- Send a final `[DONE]` event with the extraction metadata

### 2. Update the Frontend to Consume the Stream

The `useQuizChat` hook currently does a single `fetch` + `response.json()`. We switch it to read `response.body` as a `ReadableStream`, updating the assistant message content incrementally as chunks arrive.

**What the user sees:**
- They send a message
- Within ~200ms the assistant bubble appears and text starts flowing in character by character
- The progress bar and step counter update once the full response finishes

### 3. Add a Typing Indicator

While waiting for the first token (the ~200ms cold start), show a pulsing dot indicator in the assistant bubble so there's immediate visual feedback.

## Technical Details

### Files Modified

| File | Change |
|------|--------|
| `supabase/functions/quiz-chat/index.ts` | Enable `stream: true`, parse SSE chunks from AI gateway, forward them as SSE to client. Send extraction metadata in final event. |
| `src/hooks/useQuizChat.ts` | Replace `response.json()` with `ReadableStream` reader. Update assistant message content incrementally as chunks arrive. Parse final metadata event for extraction. |
| `src/components/quiz/QuizMessage.tsx` | Add a small pulsing dot indicator when `content` is empty and `isStreaming` is true (typing state). |

### Edge Function Changes

The quiz-chat function currently returns a single JSON response. It will change to:

1. Make the AI request with `stream: true`
2. Read the SSE stream from the AI gateway
3. Collect the tool call arguments across `delta` chunks
4. Forward each content delta as `data: {"text": "chunk"}` to the client
5. On stream end, parse the complete tool call JSON and send `data: {"done": true, "extracted": {...}, "shouldAdvance": true, "isComplete": false}`

The response content type changes from `application/json` to `text/event-stream`.

### Frontend Stream Reading

The `sendMessage` function in `useQuizChat` will:

1. Check `response.headers.get('content-type')` -- if SSE, use streaming path; otherwise fall back to current JSON path (backward compatible)
2. Use `response.body.getReader()` + `TextDecoderStream` to read chunks
3. On each `data:` line containing `{"text": "..."}`, append to the assistant message via `setState`
4. On the `{"done": true, ...}` event, update `extractedValues`, `currentStep`, and `isComplete`

### Typing Indicator

In `QuizMessage.tsx`, when `isStreaming && !content`:

```
Three small dots with a pulse animation (CSS keyframes, no extra deps)
```

This replaces the current empty bubble during the brief wait before first token.

### Performance Impact

- **Time to first visible token**: ~200-400ms (down from 1-2s for full response)
- **Perceived speed improvement**: ~3-4x faster feeling
- **No new dependencies** -- uses native `ReadableStream` and `EventSource` format


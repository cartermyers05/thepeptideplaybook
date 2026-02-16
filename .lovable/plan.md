
# Fix: Chat Not Showing AI Responses

## Root Cause

When you send the first message in a new chat, here's what happens:

1. Your message gets added to the screen
2. A new conversation is created in the database
3. `setConversationId` updates the conversation ID
4. This triggers a `useEffect` that **wipes all messages from the screen** (lines 141-147) because the conversation ID changed
5. The AI response streams in, but it's trying to update a message that was already wiped -- so nothing shows up

Essentially, creating the conversation resets the chat mid-stream.

## The Fix

### ChatInterface.tsx -- Prevent the reset from killing active streams

**Change 1**: The useEffect that watches `initialConversationId` (lines 141-147) should NOT reset messages if we're currently loading/streaming. Add a guard so it only resets when navigating to a genuinely different conversation (e.g., from the history page), not when we just created one ourselves.

Add a ref like `isOwnConversationRef` that gets set to `true` right before `setConversationId` is called during new conversation creation (line 201). The useEffect checks this ref -- if true, it skips the reset and just updates the ID.

**Change 2**: Move `onConversationChange` call (line 202) to AFTER the streaming is complete, not immediately after conversation creation. This prevents the URL update from triggering a parent re-render mid-stream.

**Change 3**: Add an `AbortController` to the fetch call so that if a genuine navigation happens (user clicks "New Chat" while streaming), the old stream gets properly cancelled instead of silently failing.

### Summary of changes

| File | What changes |
|------|-------------|
| `ChatInterface.tsx` | Add `isOwnConversation` ref guard to prevent message wipe during streaming; defer URL update until after stream completes; add AbortController for fetch cleanup |

### Technical detail

```text
// Before creating conversation:
isOwnConversationRef.current = true;

// In the useEffect watching initialConversationId:
if (isOwnConversationRef.current) {
  isOwnConversationRef.current = false;
  return; // Skip the reset -- we created this conversation ourselves
}

// After streaming completes successfully:
onConversationChange?.(activeConversationId);
```

No backend changes needed. No database changes. The edge function is working correctly -- it's purely a client-side state management race condition.

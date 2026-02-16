

# Session-Only Chat: In-Memory Messages

## What Changes

Right now, every chat message is saved to the database (conversations table + messages table). You want messages to persist only while the browser tab is open -- no database writes for chat history.

## Approach

Keep messages in React state (already happening) but **remove all database persistence calls**:

### In `ChatInterface.tsx`:
1. **Remove conversation creation** -- no more `createConversation.mutateAsync()` call when a new chat starts
2. **Remove message saving** -- no more `saveMessage.mutateAsync()` for user or assistant messages
3. **Remove loading from DB** -- remove the `useConversationMessages` hook usage and the effect that loads existing messages from the database
4. **Remove conversation ID management** -- no more `conversationId` state, `onConversationChange` callbacks, or URL query param syncing
5. **Keep everything else** -- streaming, feedback, save/bookmark, suggested questions, typing indicator, "New Chat" button (just clears state)

### In `ChatPage.tsx`:
1. Remove the `searchParams` / `useSearchParams` logic for `?conversation=` since there are no persistent conversation IDs
2. Simplify to just render `ChatInterface` without conversation props

### What stays working:
- Real-time streaming from the AI edge function
- The "New Chat" button (clears in-memory messages)
- All UI/UX (typing indicator, markdown rendering, suggested prompts)
- The AI disclaimer modal check
- Rate limiting / question increment (keeps tracking usage)

### What goes away:
- Loading old conversations from the database
- The conversation loading spinner
- Save/bookmark buttons (since messages have no `dbId`)
- Thumbs up/down feedback (requires `dbId`)
- History page will show nothing new (no new conversations created)

## Files Modified

| File | Changes |
|------|---------|
| `src/components/dashboard/ChatInterface.tsx` | Remove DB persistence: drop `useConversationMessages`, `useSaveMessage`, `useCreateConversation`, `useUpdateConversationTitle` imports and usage. Remove `conversationId` state and all DB write calls. Keep streaming, UI, and state management. Remove save/feedback buttons since no dbId. |
| `src/pages/dashboard/ChatPage.tsx` | Remove `useSearchParams` and conversation query param logic. Pass no conversation props to ChatInterface. |

## No Database Changes

No tables or schema changes needed -- we are simply not writing to them anymore.




# Save Chats & Maintain Context Across Sessions

## Current State

The system already saves messages to the database:
- Messages are stored in the `messages` table with `conversation_id`
- Conversations are tracked in the `conversations` table
- History page (`/history`) shows past conversations

**What's Missing:**
1. No ability to resume a past conversation from History
2. Chat interface doesn't load previous messages when resuming
3. AI doesn't receive context from earlier sessions
4. No "New Chat" button to start fresh when in an existing conversation

---

## Implementation Plan

### Phase 1: Add Hook to Fetch Messages by Conversation

Create a new hook to load messages for a specific conversation.

**File: `src/hooks/useConversationMessages.ts`** (new file)

```typescript
export function useConversationMessages(conversationId: string | null) {
  // Fetch all messages for a conversation
  // Returns messages ordered by created_at ascending
}
```

---

### Phase 2: Make ChatInterface Accept a Conversation ID

Update the ChatInterface to:
1. Accept an optional `conversationId` prop
2. Load existing messages when a conversation ID is provided
3. Use those messages for AI context

**File: `src/components/dashboard/ChatInterface.tsx`**

Changes:
- Add prop: `initialConversationId?: string`
- Add `useConversationMessages(conversationId)` query
- On mount with conversationId, load and display existing messages
- Include all conversation messages when calling the AI

---

### Phase 3: Add "Continue Conversation" from History

Make history items clickable to resume the conversation.

**File: `src/pages/History.tsx`**

Changes:
- Add onClick to conversation cards that navigates to `/dashboard/chat?conversation={id}`
- The chat page will read this query param and load the conversation

---

### Phase 4: Update ChatPage to Handle Conversation Routing

**File: `src/pages/dashboard/ChatPage.tsx`**

Changes:
- Read `?conversation=` query parameter
- Pass it to ChatInterface as `initialConversationId`

---

### Phase 5: Add "New Chat" Button

Add a button to start a fresh conversation when viewing an existing one.

**File: `src/components/dashboard/ChatInterface.tsx`**

Add a header with:
- Conversation title (from existing conversation)
- "New Chat" button that clears messages and resets conversationId

---

### Phase 6: Send Full Context to AI

**Current behavior**: Only messages from the current session are sent to the AI.

**New behavior**: Send the full conversation history (loaded from database) to the AI.

**File: `src/components/dashboard/ChatInterface.tsx`**

In `handleSubmit`, when sending to the AI:
```typescript
body: JSON.stringify({
  messages: allMessages.map((m) => ({
    role: m.role,
    content: m.content,
  })),
})
```

Where `allMessages` includes both:
- Messages loaded from the database (for resumed conversations)
- New messages added in the current session

---

## Files Changed

| File | Changes |
|------|---------|
| `src/hooks/useConversationMessages.ts` | New hook to fetch messages by conversation ID |
| `src/components/dashboard/ChatInterface.tsx` | Accept conversationId prop, load messages, add New Chat button, send full context |
| `src/pages/dashboard/ChatPage.tsx` | Read ?conversation query param, pass to ChatInterface |
| `src/pages/History.tsx` | Make conversation cards clickable, navigate to chat with conversation ID |

---

## User Experience Flow

```text
SCENARIO 1: New User Opens Chat
1. User goes to /dashboard/chat
2. Empty state shows with suggested questions
3. User asks a question
4. New conversation is created, messages saved

SCENARIO 2: User Returns Later
1. User goes to /dashboard/chat
2. Shows empty state (new chat)
3. User goes to History
4. Clicks on a past conversation
5. Navigates to /dashboard/chat?conversation=abc123
6. ChatInterface loads all messages from that conversation
7. User continues chatting
8. AI has full context from previous messages

SCENARIO 3: User Wants Fresh Start
1. While viewing an existing conversation
2. User clicks "New Chat" button
3. Messages clear, conversationId resets
4. URL updates to /dashboard/chat (no query param)
```

---

## Context Continuity

When the AI receives a resumed conversation, it will see the full history:

```json
{
  "messages": [
    { "role": "user", "content": "I want a fat loss protocol" },
    { "role": "assistant", "content": "I'd love to help! What's your main goal..." },
    { "role": "user", "content": "Lose 20 lbs for summer" },
    { "role": "assistant", "content": "Got it! Any health conditions..." },
    // ... all previous messages ...
    { "role": "user", "content": "Actually, can we add something for skin too?" }
  ]
}
```

This gives the AI complete context to provide relevant, personalized responses that build on the previous conversation.

---

## Benefits

1. **Conversation Continuity** - Users can resume exactly where they left off
2. **Full AI Context** - AI remembers everything from the conversation
3. **Better Personalization** - Protocols can be refined over multiple sessions
4. **Progress Tracking** - Long-form coaching conversations are preserved
5. **Clean UX** - Easy to start new chats or continue old ones


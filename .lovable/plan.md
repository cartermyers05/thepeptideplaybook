

# Fix Auto-Scroll in Quiz Chat

## The Problem
When you send a message in the quiz, the AI's response appears but the page doesn't automatically scroll down to show it. This causes the new message content to be cut off below the visible area.

## The Solution
Add a "scroll anchor" element at the bottom of the messages list and use `scrollIntoView()` instead of manually setting `scrollTop`. This is the same pattern used successfully in the ChatWidget component.

---

## File to Update

### `src/components/quiz/ConversationalQuiz.tsx`

**Change 1: Add a new ref for the scroll anchor (line 57)**
```tsx
// Current
const scrollRef = useRef<HTMLDivElement>(null);

// Add after scrollRef
const messagesEndRef = useRef<HTMLDivElement>(null);
```

**Change 2: Update the auto-scroll useEffect (lines 76-81)**
```tsx
// Current - doesn't work reliably
useEffect(() => {
  if (scrollRef.current) {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }
}, [messages]);

// New - uses scrollIntoView for reliable scrolling
useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);
```

**Change 3: Add the scroll anchor div at the end of messages (after line 199, before the closing `</div>` of the messages container)**
```tsx
{/* Current messages list */}
{messages.map((message, index) => (
  <QuizMessage ... />
))}

{error && (
  <motion.div ... />
)}

{/* Add this scroll anchor */}
<div ref={messagesEndRef} />
```

---

## How It Works

| Approach | Behavior |
|----------|----------|
| **Before**: `scrollTop = scrollHeight` | Scrolls the container to its max scroll position, but can fail if container height changes |
| **After**: `scrollIntoView({ behavior: "smooth" })` | Smoothly scrolls until the anchor element is visible in the viewport - more reliable |

The empty `<div ref={messagesEndRef} />` sits at the very bottom of the message list. When messages change, we tell the browser to scroll that element into view, which guarantees the latest content is visible.

---

## Summary
- **1 file to update**: `src/components/quiz/ConversationalQuiz.tsx`
- Add `messagesEndRef` ref
- Update `useEffect` to use `scrollIntoView()` instead of `scrollTop`
- Add scroll anchor `<div>` at end of messages list
- Result: Chat automatically scrolls to show AI responses


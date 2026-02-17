

# Fix Auto-Scroll During Chat Streaming

## Problem

The chat doesn't scroll down as the AI types. Two issues:

1. **Wrong scroll target**: `scrollRef` is attached to the `ScrollArea` root, but the actual scrollable element is the internal `Viewport` div. Setting `scrollTop` on the root does nothing.
2. **Scroll only triggers on new messages**: The `useEffect` depends on `[messages]`, which only fires when the array reference changes (new message added), NOT when the streaming content of the last message updates character by character.

## Fix

### `src/components/dashboard/ChatInterface.tsx`

1. Replace the `scrollRef` approach with a **bottom anchor div** (`messagesEndRef`) placed after the last message. Call `messagesEndRef.current.scrollIntoView()` to scroll.

2. Add the last message's content to the scroll `useEffect` dependency so it fires on every streaming chunk, not just new messages.

Specifically:
- Add a `messagesEndRef = useRef<HTMLDivElement>(null)` 
- Place `<div ref={messagesEndRef} />` after the messages list (inside the ScrollArea viewport)
- Update the `useEffect` to call `messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })` 
- Add `messages[messages.length - 1]?.content` to the dependency array so it scrolls on every chunk

This is the same pattern already used in `ChatWidget.tsx` (line 56-58) which works correctly.

## What Does NOT Change

- No edge function changes
- No other components affected
- No streaming logic changes
- Scroll behavior for initial load and new messages still works


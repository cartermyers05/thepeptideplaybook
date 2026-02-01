

# Smooth Typewriter Animation for AI Chat

## Problem
The current streaming displays text in whatever chunks arrive from the API. Since network data arrives in bursts (sometimes many words at once), the animation feels jerky and "chunky" rather than smooth.

## Solution
Create a client-side **typewriter buffer** that:
1. Receives chunks from the API and queues them
2. Reveals text character-by-character at a consistent speed (like the HeroDemo)
3. Shows a blinking cursor while typing

This decouples the network speed from the visual animation, ensuring a smooth, cinematic typing effect.

---

## Technical Approach

### New Custom Hook: `useTypewriter`
Create a reusable hook that accepts incoming text and outputs a smoothly-revealed version:

```tsx
const { displayedText, isTyping } = useTypewriter(fullText, {
  speed: 15, // ms per character
  enabled: isStreaming
});
```

The hook will:
- Track the full content received so far
- Animate revealing it character by character
- Catch up quickly if the buffer gets too large (prevents lag)

### Integration with ChatInterface
- Store both `fullContent` (from API) and use the hook to get `displayedContent`
- Render `displayedContent` with ReactMarkdown
- Show blinking cursor while `isTyping` is true

---

## Technical Changes

| File | Change |
|------|--------|
| `src/hooks/useTypewriter.ts` | New hook: manages character-by-character reveal with adjustable speed |
| `src/components/dashboard/ChatInterface.tsx` | Use the typewriter hook for assistant messages during streaming |

---

## Implementation Details

### useTypewriter Hook Logic

```text
Input: "Hello world" (arrives in chunks: "Hel", "lo w", "orld")

Frame 1: displayedText = "H"
Frame 2: displayedText = "He"  
Frame 3: displayedText = "Hel"
Frame 4: displayedText = "Hell"
...continues until caught up...
Frame N: displayedText = "Hello world"
```

Key features:
- **Base speed**: ~15ms per character (adjustable)
- **Catch-up mode**: If buffer > 50 chars behind, speed increases to catch up
- **Random variance**: Slight randomization (±5ms) for natural feel
- **Instant complete**: When streaming ends, immediately show all remaining text

### ChatInterface Changes
- Track `streamingMessageId` to know which message is actively streaming
- Pass full content to `useTypewriter` hook
- Render the `displayedText` output instead of raw content

---

## Visual Result

```text
Before (chunky):
├── "Hello" appears
├── (pause)
├── " world, how are you doing" appears all at once
├── (pause)  
├── " today?" appears
└── Feels jerky and inconsistent

After (smooth):
├── "H" → "He" → "Hel" → "Hell" → "Hello" → " " → "w"...
├── Each character appears with consistent timing
├── Blinking cursor follows the text
└── Feels like someone is actually typing
```

---

## Edge Cases Handled

- **Fast API response**: Typewriter catches up smoothly without jarring jumps
- **Slow API response**: Cursor waits (shows typing indicator) until more content arrives
- **Markdown rendering**: ReactMarkdown handles partial markdown gracefully
- **Stream completion**: Remaining buffer instantly revealed when `isLoading` becomes false


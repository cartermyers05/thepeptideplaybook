

# Enhance Hero Chatbot Demo - Video-Like Experience

## The Vision

Transform the static, one-time typing animation into a cinematic, looping demo that feels like watching a product video. The demo will cycle through multiple questions, reset smoothly, and create an engaging "always moving" experience.

```text
Animation Timeline (loops every ~12s):
┌─────────────────────────────────────────────────────────┐
│ 0s    │ 1.5s     │ 6s      │ 8s      │ 12s    │ 0s     │
│ Load  │ Q1 Types │ A1 Done │ Fade    │ Q2     │ Loop   │
│ dots  │ Answer   │ Pause   │ Out     │ Starts │ Back   │
└─────────────────────────────────────────────────────────┘
```

---

## Key Enhancements

### 1. Multiple Question/Answer Cycles
Instead of one static demo, rotate through 2-3 compelling Q&As:
- "What peptides are FDA approved?" → FDA list
- "Is BPC-157 safe?" → Safety overview  
- "Best peptide for recovery?" → Healing recommendations

### 2. Smooth Transitions Between Questions
- Current answer fades out
- Brief pause (feels natural)
- New question slides in
- New answer types out
- Loops infinitely

### 3. Video-Like Visual Polish
- **Question typing effect** - User question also types in (like someone is asking)
- **Subtle card "breathing"** - Very gentle scale pulse while idle
- **Progress indicator** - Small dots at bottom showing which Q&A is active
- **Smoother typing** - Faster, more consistent character speed

### 4. Performance Optimizations
- Use `requestAnimationFrame` for smoother typing
- Cleanup all timeouts on unmount
- Pause animation when tab is not visible

---

## Implementation Details

### Animation Sequence Per Question

1. **0.0s** - Question starts typing in (character by character)
2. **0.8s** - Question complete, pause
3. **1.2s** - Thinking dots appear
4. **1.5s** - Answer starts streaming
5. **~5s** - Answer complete
6. **7s** - Hold for reading
7. **7.5s** - Fade out both Q&A
8. **8s** - Next question starts

### Data Structure

```typescript
const DEMO_CONVERSATIONS = [
  {
    question: "What peptides are FDA approved?",
    answer: `Several peptides have full FDA approval...`
  },
  {
    question: "Is BPC-157 safe to use?",
    answer: `BPC-157 shows a strong safety profile in studies...`
  },
  {
    question: "Best peptide for injury recovery?",
    answer: `For recovery, researchers commonly study...`
  }
];
```

### State Management

```typescript
// Track current conversation index
const [conversationIndex, setConversationIndex] = useState(0);

// Track animation phase
type Phase = 'typing-question' | 'thinking' | 'typing-answer' | 'holding' | 'fading';
const [phase, setPhase] = useState<Phase>('typing-question');
```

---

## Visual Enhancements

| Element | Current | Enhanced |
|---------|---------|----------|
| Question | Static text | Types in character by character |
| Transition | One-time only | Smooth fade between Q&As |
| Typing speed | 15-40ms random | 12-25ms (faster, smoother) |
| Loop | None | Infinite with 3 Q&As |
| Progress | None | Dot indicators at bottom |
| Idle state | Static | Subtle breathing animation |

---

## Files to Modify

| File | Action |
|------|--------|
| `src/components/landing/HeroDemo.tsx` | Enhance with multi-conversation loop, question typing, phase management, dot indicators |

---

## Technical Approach

### Phase-Based Animation Controller

```text
Phase Flow:
┌──────────────────┐
│ typing-question  │ → Types user question character by character
└────────┬─────────┘
         ▼
┌──────────────────┐
│     thinking     │ → Shows bouncing dots (0.5s)
└────────┬─────────┘
         ▼
┌──────────────────┐
│  typing-answer   │ → Streams AI response
└────────┬─────────┘
         ▼
┌──────────────────┐
│     holding      │ → Pause for reading (2s)
└────────┬─────────┘
         ▼
┌──────────────────┐
│     fading       │ → Fade out animation (0.5s)
└────────┬─────────┘
         ▼
    Next conversation (loops back)
```

### Framer Motion Animations

- **Question bubble**: `AnimatePresence` with fade + slide
- **Answer area**: Smooth opacity transitions between phases
- **Entire card**: Optional subtle scale breathing

---

## Expected Result

The demo will feel like watching a product demo video:
- Always animated, never static
- Shows variety of capabilities
- Creates urgency (keep watching to see more)
- Professional, polished transitions
- Runs indefinitely without user interaction




# Animate Hero Chat with Cycling Q&A

## Overview

Add an animated cycling effect to the hero chat preview so it automatically rotates through multiple peptide questions and answers, demonstrating the AI assistant's capabilities in an engaging way.

---

## How It Will Work

1. Define an array of 3-4 Q&A pairs
2. Use React state + `useEffect` to cycle through them every 4-5 seconds
3. Add fade-in/out animation with `AnimatePresence` for smooth transitions
4. Each cycle: fade out current Q&A → fade in new Q&A

---

## Animation Flow

```text
[4 seconds] Question 1 → Answer 1
     ↓ (fade transition)
[4 seconds] Question 2 → Answer 2
     ↓ (fade transition)
[4 seconds] Question 3 → Answer 3
     ↓ (fade transition)
[4 seconds] Question 1 → Answer 1
     ... (loops infinitely)
```

---

## Q&A Content to Cycle Through

| # | User Question | AI Response |
|---|---------------|-------------|
| 1 | "Is BPC-157 legal to buy?" | "It depends on your location and intended use. In the US, BPC-157 is not FDA-approved and is sold only for research purposes..." |
| 2 | "What's the difference between BPC-157 and TB-500?" | "Both are peptides studied for tissue repair, but they work through different mechanisms. BPC-157 focuses on gut and tendon healing..." |
| 3 | "How do I know if a peptide source is legit?" | "Look for third-party testing certificates (COAs), check for purity percentages above 98%, and research the vendor's reputation..." |
| 4 | "Are peptides safe to use?" | "Safety depends on the specific peptide, dosage, and individual factors. Most peptides in research have shown favorable safety profiles..." |

---

## Technical Implementation

### File: `src/components/landing/Hero.tsx`

**Changes:**
1. Add `useState` and `useEffect` imports from React
2. Add `AnimatePresence` import from framer-motion
3. Create a `chatExamples` array with Q&A objects
4. Add state to track current index: `const [currentIndex, setCurrentIndex] = useState(0)`
5. Add `useEffect` with `setInterval` to cycle every 4 seconds
6. Wrap message bubbles in `AnimatePresence` with `motion.div` for fade transitions
7. Use `key` prop to trigger re-animation on index change

### Animation Details

- **Exit animation**: `opacity: 0, y: -10` (fade up)
- **Enter animation**: `opacity: 1, y: 0` (fade in from below)
- **Duration**: 0.4s transitions
- **Interval**: 4 seconds between switches

---

## Code Structure

```tsx
const chatExamples = [
  { question: "Is BPC-157 legal to buy?", answer: "It depends on your location..." },
  { question: "What's the difference between BPC-157 and TB-500?", answer: "Both are peptides studied for tissue repair..." },
  { question: "How do I know if a peptide source is legit?", answer: "Look for third-party testing certificates..." },
  { question: "Are peptides safe to use?", answer: "Safety depends on the specific peptide..." },
];

const [currentIndex, setCurrentIndex] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentIndex((prev) => (prev + 1) % chatExamples.length);
  }, 4000);
  return () => clearInterval(interval);
}, []);
```

---

## File Changes Summary

| File | Action |
|------|--------|
| `src/components/landing/Hero.tsx` | UPDATE - Add cycling animation with multiple Q&A pairs |


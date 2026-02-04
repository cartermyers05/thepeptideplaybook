
# Plan: Animate "Your AI Peptide Journey" Hero Header

## Overview
Enhance the hero headline with a more dynamic, eye-catching animation that creates a memorable first impression while maintaining the editorial aesthetic.

## Current State
- Simple fade-in + slide-up animation on the entire `<h1>` block
- All three lines ("Your", "AI Peptide", "Journey") animate together as one unit

## Proposed Animation: Staggered Line Reveal with Subtle Slide

Each line of the headline animates in separately with a smooth cascade effect:

```text
Your           ← slides in from left, fades in (first)
AI Peptide     ← slides in from left, fades in (0.15s delay)
Journey        ← slides in from left, fades in (0.3s delay)
```

### Animation Details
- **Direction**: Each line slides in from the left (x: -30 → 0)
- **Opacity**: Fades from 0 → 1
- **Timing**: 0.6s duration per line with 0.15s stagger between lines
- **Easing**: Smooth ease-out for professional feel

### Visual Effect
Creates a "typing reveal" sensation without the complexity of letter-by-letter animation. Clean, bold, and editorial.

---

## Technical Implementation

### File: `src/components/landing/HeroSection.tsx`

**Changes:**
1. Create a new `lineVariants` animation config for the horizontal slide effect
2. Wrap each line of the headline in its own `motion.span` with `display: block`
3. Apply staggered delays to each line

### Code Structure:
```tsx
const lineVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { 
      delay: i * 0.15, 
      duration: 0.6, 
      ease: "easeOut" 
    },
  }),
};

// In the h1:
<motion.h1 className="...">
  <motion.span variants={lineVariants} custom={0} className="block">
    Your
  </motion.span>
  <motion.span variants={lineVariants} custom={1} className="block">
    AI Peptide
  </motion.span>
  <motion.span variants={lineVariants} custom={2} className="block">
    Journey
  </motion.span>
</motion.h1>
```

---

## Summary
- Split the headline into 3 animated lines
- Each line slides in from the left with a staggered delay
- Maintains the bold, editorial aesthetic
- More dynamic than the current single-block fade without being overdone

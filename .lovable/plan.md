
# Animate Hero Headline + Add Background Effects to Landing Page

## Overview
Enhance the "Your AI Peptide Journey" headline with more dynamic, eye-catching animations and add subtle background effects to sections further down the page to create visual continuity and a premium feel.

## Part 1: Hero Headline Animation Enhancements

### Current State
The headline already has a staggered slide-in animation (`x: -30 → 0`), but it's relatively subtle.

### Enhanced Animation Concept
Add more visual interest with:

1. **Character-by-character reveal** for the word "AI" (like a terminal/tech effect)
2. **Gradient text shimmer** that sweeps across the headline after it loads
3. **Subtle floating motion** on the full headline after initial animation

### Animation Details

**Word-by-Word Stagger (enhanced):**
- "Your" slides in from left with slight scale
- "AI Peptide" has a glowing text effect with animated gradient
- "Journey" slides in last with emphasis

**Text Shimmer Effect:**
```text
After headline loads → gradient highlight sweeps left-to-right
Creates a "shine" effect like light reflecting off text
```

**Floating Idle Animation:**
- Very subtle Y oscillation (±2px) after initial animation
- Creates a "breathing" effect that feels alive

### Implementation
Update `HeroSection.tsx`:
- Add new motion variants for enhanced entrance
- Add gradient shimmer overlay using CSS animation
- Add post-load floating animation with `AnimatePresence`

## Part 2: Background Effects for Lower Sections

### Section Mapping

| Section | Background Enhancement |
|---------|----------------------|
| **HowItWorksSection** | Subtle floating particles + grid pattern |
| **WhatsInsideSection** | Already has `bg-secondary/50`, add aurora gradient |
| **GoalSelectionSection** | Add animated gradient orbs behind cards |
| **PricingCTA** | Add "energy pulse" effect centered on pricing card |

### Background Components to Reuse
The project already has great background components:
- `FloatingOrbs` - aurora gradients, particles, light beams
- `GridPattern` - animated dot pattern
- `InteractiveBackground` - combines orbs + grid + energy pulse

### Implementation Approach

**Option A: Wrap sections with InteractiveBackground**
Wrap each section with the existing `InteractiveBackground` component using the "subtle" variant.

**Option B: Add targeted effects per section**
Add specific effects to each section for more control:

1. **HowItWorksSection**: Add `GridPattern` behind the steps
2. **GoalSelectionSection**: Add `FloatingOrbs variant="subtle"` 
3. **PricingCTA**: Add centered glow pulse behind the pricing card

## File Changes

### Modified Files

| File | Changes |
|------|---------|
| `src/components/landing/HeroSection.tsx` | Enhanced headline animations with shimmer and floating effects |
| `src/components/landing/HowItWorksSection.tsx` | Add GridPattern background |
| `src/components/landing/GoalSelectionSection.tsx` | Add FloatingOrbs background |
| `src/components/landing/PricingCTA.tsx` | Add centered glow effect behind card |
| `src/pages/Index.tsx` | Optionally wrap hero with InteractiveBackground |

## Technical Details

### Hero Shimmer Animation
```css
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
```

Applied as a pseudo-element overlay with:
- `background: linear-gradient(90deg, transparent, white/10, transparent)`
- `background-size: 200% 100%`
- `animation: shimmer 3s ease-in-out infinite`

### Floating Animation
```tsx
<motion.h1
  animate={{ y: [0, -3, 0] }}
  transition={{ 
    duration: 4, 
    repeat: Infinity, 
    ease: "easeInOut",
    delay: 2 // Wait for entrance animation
  }}
>
```

### Section Background Pattern
Each section gets a `position: relative` wrapper with an absolutely positioned background layer that has `pointer-events: none` and `z-index: 0`, keeping content on top.

## Visual Result

### Hero
- Headline slides in line-by-line (current behavior, enhanced)
- "AI" text gets a subtle glow/tech effect
- After load: gentle shimmer sweeps across, headline floats slightly
- Creates a "premium, alive" feel

### Lower Sections
- Subtle dot grid appears behind "How It Works"
- Soft aurora gradients float behind goal selection cards
- Pricing card has a gentle glow pulse behind it
- Effects are subtle enough not to distract from content

## Performance Notes
- All animations use CSS transforms (GPU accelerated)
- Particles are memoized to prevent re-renders
- Background effects use `pointer-events: none` so they don't interfere with clicks
- Effects are subtle enough to work on lower-end devices

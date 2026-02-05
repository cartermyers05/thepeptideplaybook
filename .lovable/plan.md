

# Fix Blurry Hero Headline

## The Problem
The headline text appears blurry because of two issues:

1. **Blur filter in animations** - The `enhancedLineVariants` and `letterVariants` use `filter: "blur(8px)"` and `filter: "blur(4px)"` that may not be transitioning cleanly to `blur(0px)`

2. **Glow overlay element** - There's an absolutely positioned glow effect (lines 150-178) with `filter: "blur(20px)"` sitting on top of the actual text

## The Fix

### 1. Remove Blur from Animation Variants
Replace blur-based reveals with simpler opacity + transform animations that are more performant:

| Current | New |
|---------|-----|
| `filter: "blur(8px)"` → `blur(0px)` | Remove filter, use only opacity + translateX |
| `filter: "blur(4px)"` → `blur(0px)` | Remove filter, use only opacity + translateY |

### 2. Remove or Fix the Glow Overlay
The glow effect element with `filter: "blur(20px)"` and `absolute inset-0` is layered over the text. Options:
- **Remove it entirely** (cleanest fix)
- **Or** move it behind with `z-index: -1` and reduce blur

### 3. Add Hardware Acceleration
Add `will-change: transform, opacity` and `transform: translateZ(0)` to enable GPU acceleration for smoother rendering.

## Changes to `src/components/landing/HeroSection.tsx`

| Line | Current | New |
|------|---------|-----|
| 28 | `filter: "blur(8px)"` | Remove the filter property |
| 32 | `filter: "blur(0px)"` | Remove the filter property |
| 54 | `filter: "blur(4px)"` | Remove the filter property |
| 58 | `filter: "blur(0px)"` | Remove the filter property |
| 150-178 | Glow overlay with blur | Remove entirely or add `className="-z-10"` |

## Result
Clean, crisp text with smooth fade-in animations. The rainbow shimmer effect continues to work, but without any blur artifacts causing readability issues.


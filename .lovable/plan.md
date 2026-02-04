

# Fix: Hero Header Animation Not Showing

## The Problem
The headline "Your AI Peptide Journey" is invisible because of incorrect Framer Motion animation configuration. The `motion.h1` element has `initial="hidden"` and `animate="visible"`, but:

1. The `motion.h1` doesn't have a `variants` prop, so it's not connected to the animation system
2. The child `motion.span` elements have `lineVariants` but aren't receiving the animation state from their parent

The result: the spans remain stuck in their `hidden` state (opacity: 0, x: -30) and never animate in.

## The Solution
Add the parent container's animation orchestration properly so children receive the animation trigger.

### File: `src/components/landing/HeroSection.tsx`

**Change the `motion.h1` to use variants that connect to its children:**

```tsx
// Before (broken):
<motion.h1
  className="..."
  initial="hidden"
  animate="visible"
>
  <motion.span variants={lineVariants} custom={0} className="block">

// After (fixed):
<motion.h1
  className="..."
  variants={containerVariants}  // Add this to connect to children
  initial="hidden"
  animate="visible"
>
  <motion.span variants={lineVariants} custom={0} className="block">
```

The key fix is adding `variants={containerVariants}` to the `motion.h1` so it properly orchestrates the child animations. The `containerVariants` already has `staggerChildren` which works perfectly with the `lineVariants`.

Alternatively, we can keep it simpler and just remove the redundant `initial/animate` from the h1 since the parent `motion.div` already handles orchestration - but the children need to inherit properly.

## Implementation
- Line 50-53: Add `variants={containerVariants}` to `motion.h1` OR remove `initial/animate` from h1 and let parent div handle it

## Summary
- The header disappeared because child animations weren't triggered
- Fix by properly connecting parent variants to children
- Single line change to restore the staggered headline animation


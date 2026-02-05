
# Remove Rainbow Underline - Back to Clean Text

## The Goal
Remove the rainbow gradient underline from the hero headline and return to a clean, simple text-only design.

## What to Remove
- The `rainbowGradient` constant (no longer needed)
- The `motion.div` that creates the animated underline under "AI Peptide"
- The `relative` class from the "AI Peptide" span (no longer positioning anything)

## Final Hero Headline Structure

```tsx
<motion.h1 
  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.2]"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  <span className="block text-foreground">Your</span>
  <span className="block text-foreground">AI Peptide</span>
  <span className="block text-foreground">Journey</span>
</motion.h1>
```

## Result
- Big, bold, clean headline with simple fade-in animation
- No rainbow underline or gradient effects
- Just clean black text on the page

## File Changes

| File | Changes |
|------|---------|
| `src/components/landing/HeroSection.tsx` | Remove `rainbowGradient` constant and the rainbow underline `motion.div` |

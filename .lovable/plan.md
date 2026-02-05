

# Simplify Hero Headline: Big Bold Letters + Rainbow Underline

## The Goal
Replace the typewriter animation with a simple, bold headline where all text appears immediately. The only animation is the rainbow underline drawing itself under "AI Peptide."

## Current State
- Complex typewriter effect with cursor blinking
- Words appear letter-by-letter with delays
- Rainbow underline on "AI Peptide"

## New State
- Big, bold, static text that loads instantly
- Simple fade-in entrance for the headline
- Rainbow underline animates (draws itself) under "AI Peptide" only
- Clean, readable, no complexity

## Visual Preview

```text
Your
AI Peptide  ← rainbow underline draws itself
Journey
```

## Implementation

### Remove
| What | Why |
|------|-----|
| `TypewriterCursor` component | No longer needed |
| `TypewriterWord` component | No longer needed |
| `words` configuration array | No longer needed |
| `currentWordIndex` / `allWordsComplete` state | No longer needed |

### Replace With
Simple motion-wrapped spans with a fade-in animation:

```tsx
<motion.h1 
  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.2]"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  <span className="block">Your</span>
  <span className="block relative">
    AI Peptide
    {/* Rainbow underline */}
    <motion.div
      className="absolute -bottom-1 left-0 h-1.5 w-full rounded-full"
      style={{ background: rainbowGradient, backgroundSize: "200% 100%", transformOrigin: "left" }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1, backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"] }}
      transition={{ 
        scaleX: { delay: 0.4, duration: 0.6 }, 
        backgroundPosition: { duration: 4, repeat: Infinity } 
      }}
    />
  </span>
  <span className="block">Journey</span>
</motion.h1>
```

### Timing Adjustments
| Element | Current Delay | New Delay |
|---------|---------------|-----------|
| Headline | Typewriter (2+ sec) | 0s (instant) |
| Rainbow underline | After typing | 0.4s |
| Subheadline | 2.4s | 0.6s |
| CTA buttons | 2.6s | 0.8s |
| Price line | 2.8s | 1.0s |

## File Changes

| File | Changes |
|------|---------|
| `src/components/landing/HeroSection.tsx` | Remove typewriter components, simplify to static headline with animated rainbow underline |

## Result
- Clean, big, bold text that's immediately readable
- Single "wow" moment: the rainbow underline drawing itself
- Faster page feel—no waiting for typing animation
- Zero chance of blur/visibility bugs


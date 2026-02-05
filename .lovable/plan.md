

# Fix White/Invisible Hero Headline Text

## The Problem
The "AI Peptide" text is invisible because of a conflict between:
1. **Parent span**: Has `bg-clip-text text-transparent` with the rainbow gradient
2. **Child letter spans**: Have `letterVariants` animating opacity from 0 to 1

When `text-transparent` is applied to the parent, the gradient clips to the text shape. But the child spans inherit the transparent text color, and their individual opacity animations don't interact correctly with the gradient clipping - resulting in completely invisible text.

## The Fix

### Option A: Remove Letter-by-Letter Animation (Simpler)
Keep the rainbow gradient and remove the per-character animation. The text will still shimmer beautifully.

| Current | New |
|---------|-----|
| Each letter has its own `motion.span` with opacity animation | Single text node with rainbow gradient |
| Staggered letter reveal | Smooth fade-in of entire "AI Peptide" text |

### Option B: Apply Gradient to Each Letter (More Complex)
Apply the gradient styling to each individual letter span instead of the parent.

## Recommended Fix (Option A)

Simplify the "AI Peptide" section:

```tsx
{/* "AI Peptide" - rainbow gradient with smooth entrance */}
<motion.span 
  variants={enhancedLineVariants}
  custom={1}
  className="block"
>
  <motion.span
    className="inline-block bg-clip-text text-transparent"
    style={{
      backgroundImage: rainbowGradient,
      backgroundSize: "200% 100%",
    }}
    animate={{
      backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
    }}
    transition={{
      duration: 4,
      ease: "linear",
      repeat: Infinity,
    }}
  >
    AI Peptide
  </motion.span>
</motion.span>
```

This keeps:
- The rainbow gradient shimmer effect
- Smooth slide-in entrance (matches "Your" and "Journey")
- Clean, readable text

## File to Modify

| File | Changes |
|------|---------|
| `src/components/landing/HeroSection.tsx` | Replace letter-by-letter animation with single gradient text span, remove `letterContainerVariants` and `letterVariants` |

## Result
Visible, crisp "AI Peptide" text with flowing rainbow gradient animation. The entrance animation will match "Your" and "Journey" (slide from left), creating a cohesive sequence while keeping the signature rainbow shimmer.


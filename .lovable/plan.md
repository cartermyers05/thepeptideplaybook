
# Remove Duplicate "Research Backed Answers" Text from Hero H1

## The Issue

The hero H1 currently has duplicate text - "Get Research Backed Answers" appears twice:
1. Once in black (plain text)
2. Once with the gradient styling (inside a motion.span)

## File to Modify

### `src/components/landing/HeroSection.tsx`

**Lines 68-79** - Remove the plain text "Get Research Backed Answers" while keeping the gradient version:

```tsx
// Current (broken):
<motion.h1 ...>
  Ask Anything About Peptides
  Get Research Backed Answers        ← REMOVE THIS LINE
  <motion.span className="block text-gradient mt-2">
    Get Research Backed Answers      ← KEEP THIS (gradient version)
  </motion.span>
</motion.h1>

// Fixed:
<motion.h1 ...>
  Ask Anything About Peptides
  <motion.span className="block text-gradient mt-2">
    Get Research Backed Answers
  </motion.span>
</motion.h1>
```

## Result

The H1 will display:
- "Ask Anything About Peptides" (default text color)
- "Get Research Backed Answers" (gradient text, animated in)

No more duplicate black text.

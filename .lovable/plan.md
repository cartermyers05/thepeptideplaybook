

# Remove Fake Testimonials

## What's Changing

There's only one fake testimonial remaining in the codebase:

**File: `src/components/landing/HeroSection.tsx` (Lines 70-82)**
```
"Finally, answers based on actual studies." — James, Biohacker
```

## The Fix

Remove the entire "social proof snippet" block from the Hero section. The Hero will still have strong trust signals through:
- "200+ researchers" badge
- "Free forever" badge  
- "No credit card" badge

These data-driven signals are more credible than a fabricated quote.

## Technical Details

**File to edit:** `src/components/landing/HeroSection.tsx`

Remove lines 70-82 (the entire `motion.div` containing the fake testimonial):
```tsx
{/* Social proof snippet */}
<motion.div
  variants={itemVariants}
  className="mb-8 inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-muted/50 border border-border/50"
>
  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
    <span className="text-sm">💬</span>
  </div>
  <p className="text-sm text-muted-foreground italic">
    "Finally, answers based on actual studies."
    <span className="text-foreground font-medium ml-1">— James, Biohacker</span>
  </p>
</motion.div>
```

No other files need changes. The `SocialProof.tsx` component is already clean (shows stats, not testimonials).


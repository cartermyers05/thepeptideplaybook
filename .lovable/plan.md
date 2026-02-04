
# Fix: Reduce White Space Between "How It Works" and "What You Get"

## The Problem
There's currently **320px of white space** between the last step of "How It Works" (Step 05: Track & Improve) and the "What You Get" section header. This is caused by:
- `py-32 md:py-40` on HowItWorksSection (160px bottom padding)
- `py-32 md:py-40` on WhatsInsideSection (160px top padding)

Combined, this creates an excessive gap that breaks the visual flow.

## The Solution
Reduce the vertical padding on both sections to create a tighter, more cohesive layout:

### Changes to `HowItWorksSection.tsx`
- Change `py-32 md:py-40` to `py-20 md:py-28`
- This reduces padding from 128px/160px to 80px/112px

### Changes to `WhatsInsideSection.tsx`
- Change `py-32 md:py-40` to `py-20 md:py-28`
- Same reduction for consistency

## Result
- **Before**: 320px gap between sections
- **After**: ~200px gap (80+80 mobile, 112+112 desktop)
- Creates a tighter, more intentional flow between the journey steps and what users receive

## Summary
| Section | Before | After |
|---------|--------|-------|
| HowItWorksSection | `py-32 md:py-40` | `py-20 md:py-28` |
| WhatsInsideSection | `py-32 md:py-40` | `py-20 md:py-28` |
| **Total gap** | ~320px | ~200px |



# Remove AI-Powered Research Assistant from Homepage

## What Will Be Removed

The animated AI chat demo that appears on the right side of the hero section. This is the `AIAssistant` component that shows cycling example questions and answers.

## Files to Modify

### 1. `src/components/landing/HeroSection.tsx`

**Changes:**
- Remove the `AIAssistant` import (line 6)
- Remove the entire right column that renders `<AIAssistant />` (lines 127-138)
- Update the grid layout from 2 columns to a centered single column

**Before:**
```tsx
<div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
  {/* Left content */}
  <motion.div className="text-center lg:text-left" ...>
    ...
  </motion.div>

  {/* Right content - Chat demo */}
  <motion.div className="hidden md:block">
    <AIAssistant />
  </motion.div>
</div>
```

**After:**
```tsx
<div className="max-w-4xl mx-auto">
  {/* Centered content */}
  <motion.div className="text-center" ...>
    ...
  </motion.div>
</div>
```

### 2. Layout Adjustments

- Change from 2-column grid to centered single column
- Update text alignment from `lg:text-left` to `text-center` throughout
- Center the stats row, CTAs, and trust signals

## Visual Result

The hero section will become a centered, single-column layout with:
- AI badge at top (still says "AI-Powered Research Assistant" as a label - let me know if you want this removed too)
- Headline and subheadline centered
- Stats centered
- CTAs centered
- Trust signals centered

No animated chat demo will appear on the right side.

## Files NOT Deleted

The `AIAssistant.tsx` file will remain in the codebase (not deleted) in case you want to use it elsewhere later. If you want it fully removed from the project, let me know.


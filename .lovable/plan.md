
# Plan: Change Green Highlight Color to Gray

## Overview
Replace the teal/green (`primary`) highlight color with a neutral gray throughout the landing page sections. This creates a more muted, editorial aesthetic.

## Affected Areas

### 1. GoalSelectionSection.tsx
**Line 123:** "Start Course" arrow text uses `text-primary`
- Change: `text-primary` → `text-muted-foreground`

### 2. HowItWorksSection.tsx  
**Line 136:** Detail bullet dots use `bg-primary/60`
- Change: `bg-primary/60` → `bg-muted-foreground/40`

### 3. ProductPreview.tsx
Multiple instances of teal highlighting:
- **Line 63:** Accent line uses purple gradient (kept as decorative)
- **Line 96:** Card gradient uses `from-primary/5 to-primary/10`
- **Line 102:** PP avatar uses `bg-primary`
- **Line 111:** "Featured" badge uses `bg-primary/10 text-primary`
- **Line 133:** Feature bullets use `bg-primary`
- **Line 195:** Abbreviation boxes use `bg-primary/10`
- **Line 199:** Abbreviation text uses `text-primary`
- **Line 207:** Stats text uses `text-primary`

### 4. Other Landing Components (text-primary usage)
Files that use `text-primary` for highlight accents:
- `CurriculumSection.tsx` - Module icons and section label
- `ComparisonSection.tsx` - Checkmarks and column header
- `PricingCTA.tsx` - Checkmarks and email link
- `HeroProductCards.tsx` - Chips and AI bubbles

---

## Change Strategy

Instead of editing every component individually, the cleanest solution is to **create a new utility color** for these muted accents. However, since the user wants a quick change to gray specifically in those visible sections, I'll make targeted changes:

### Files to Edit

| File | Change |
|------|--------|
| `GoalSelectionSection.tsx` | `text-primary` → `text-muted-foreground` for "Start Course" |
| `HowItWorksSection.tsx` | `bg-primary/60` → `bg-muted-foreground/40` for bullets |
| `ProductPreview.tsx` | Multiple `text-primary`/`bg-primary` → `text-muted-foreground`/`bg-muted` |

### Specific Replacements

```text
GoalSelectionSection.tsx (Line 123):
  Before: text-primary group-hover:text-white
  After:  text-muted-foreground group-hover:text-white

HowItWorksSection.tsx (Line 136):
  Before: bg-primary/60
  After:  bg-muted-foreground/40

ProductPreview.tsx:
  - Line 96:  from-primary/5 to-primary/10 → from-muted/50 to-muted/80
  - Line 102: bg-primary → bg-foreground
  - Line 111: bg-primary/10 text-primary → bg-muted text-muted-foreground
  - Line 133: bg-primary → bg-muted-foreground
  - Line 195: bg-primary/10 → bg-muted
  - Line 199: text-primary → text-foreground
  - Line 207: text-primary → text-muted-foreground
```

---

## Result
- The "Start Course" arrows become gray instead of teal
- The bullet point dots become gray
- The product abbreviations (DB, SC, RD) become gray/dark instead of teal
- The "Featured" badge becomes a neutral gray
- The stats text becomes muted gray
- Maintains visual hierarchy while removing the green accent

---

## Summary
- Edit 3 files: `GoalSelectionSection.tsx`, `HowItWorksSection.tsx`, `ProductPreview.tsx`
- Replace `text-primary` with `text-muted-foreground` or `text-foreground`
- Replace `bg-primary` with `bg-foreground` or `bg-muted`
- Creates a more neutral, editorial look without teal highlights

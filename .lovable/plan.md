
# Plan: Change Green Hover Colors to Grey

## Overview
Replace all green/teal (`primary`) hover effects across the landing page with grey (`muted-foreground` or similar neutral grey) to create a more subtle, consistent hover experience.

## Files to Update

### 1. WhatsInsideSection.tsx (lines 90, 99)
- `hover:border-primary/30` → `hover:border-muted-foreground/30`
- `group-hover:text-primary` → `group-hover:text-foreground`

### 2. FAQ.tsx (lines 45, 52)
- `group-hover:text-primary` → `group-hover:text-foreground` (for question text)
- `group-hover:text-primary` → `group-hover:text-foreground` (for plus icon)

### 3. Footer.tsx (lines 40, 45, 50, 55, 68, 73, 78, 91, 96, 101, 129)
- All `hover:text-primary` → `hover:text-foreground` (11 links)

### 4. Navbar.tsx (line 110)
- `hover:text-primary` → `hover:text-foreground` (menu links)

### 5. ProductPreview.tsx (lines 195, 201)
- `group-hover:bg-primary/20` → `group-hover:bg-muted`
- `group-hover:text-primary` → `group-hover:text-foreground`

### 6. FeaturedBy.tsx (line 36)
- `hover:text-primary` → `hover:text-foreground`

### 7. ChatbotDemo.tsx (line 152)
- `hover:border-primary/50 hover:bg-primary/5` → `hover:border-muted-foreground/50 hover:bg-muted/50`

### 8. CourseFeatures.tsx (line 82)
- `hover:border-primary/40` → `hover:border-muted-foreground/40`

## Summary of Changes
- **Text hovers**: Change from `hover:text-primary` / `group-hover:text-primary` to `hover:text-foreground` / `group-hover:text-foreground`
- **Border hovers**: Change from `hover:border-primary/*` to `hover:border-muted-foreground/*`
- **Background hovers**: Change from `hover:bg-primary/*` to `hover:bg-muted/*`

---

## Technical Details

All changes use existing Tailwind color tokens:
- `text-foreground` - standard dark text color
- `muted-foreground` - grey text color for subtle elements
- `muted` - grey background color

No new CSS or configuration changes required.



# Add Color-Coding to Hero Product Cards

## Overview

Add distinctive color themes to the CoursePreviewCard (purple) and DigestPreviewCard (blue) while keeping the ChatPreviewCard in the current teal/primary theme. This will make each card visually distinct and add visual interest.

## Color Scheme

| Card | Theme | Background | Accent Elements |
|------|-------|------------|-----------------|
| ChatPreviewCard | Teal (current) | `bg-card/95` | Primary teal accents |
| CoursePreviewCard | Purple | Purple gradient overlay | Purple selected state, progress bar |
| DigestPreviewCard | Blue | Blue gradient overlay | Blue icon, accents |

## Visual Changes

### CoursePreviewCard (Purple Theme)
- Background: Subtle purple gradient (`from-violet-500/10 via-purple-500/5 to-card`)
- Selected goal pill: Purple (`bg-violet-500 text-white`)
- Progress bar: Purple gradient (`bg-violet-500`)
- Border accent: Purple tint

### DigestPreviewCard (Blue Theme)
- Background: Subtle blue gradient (`from-blue-500/10 via-sky-500/5 to-card`)
- Mail icon container: Blue (`bg-blue-500/10`)
- Mail icon: Blue (`text-blue-500`)
- "Read" link: Blue (`text-blue-500`)
- Border accent: Blue tint

## File Changes

| File | Changes |
|------|---------|
| `src/components/landing/HeroProductCards.tsx` | Update `CoursePreviewCard` with purple theme, update `DigestPreviewCard` with blue theme |

## Technical Details

### CoursePreviewCard Updates

```tsx
// Card container - add purple gradient
className={cn(
  "relative overflow-hidden rounded-3xl backdrop-blur border border-violet-200/50 shadow-xl p-4 cursor-default",
  "bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-card/95",
  className
)}

// Selected goal styling
goal.selected
  ? "bg-violet-500 text-white"
  : "bg-white/50 text-muted-foreground"

// Progress bar
<motion.div className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full" />
```

### DigestPreviewCard Updates

```tsx
// Card container - add blue gradient
className={cn(
  "relative overflow-hidden rounded-3xl backdrop-blur border border-blue-200/50 shadow-xl p-4 cursor-default",
  "bg-gradient-to-br from-blue-500/10 via-sky-500/5 to-card/95",
  className
)}

// Mail icon container
<div className="w-6 h-6 rounded-md bg-blue-500/10 flex items-center justify-center">
  <Mail className="w-3 h-3 text-blue-500" />
</div>

// Read link
<span className="text-[10px] text-blue-500 font-medium flex items-center gap-1">
```

## Result

The three hero cards will each have their own color identity:
- **AI Chat**: Teal (matches primary brand color)
- **Your Goal**: Purple (aspirational, premium feel)
- **Weekly Digest**: Blue (informational, trustworthy)

This creates visual variety while maintaining the cohesive premium aesthetic.


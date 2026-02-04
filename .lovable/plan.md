

# Hero Section Color Updates

## Overview

Two styling updates to the hero section:

1. **ChatPreviewCard**: Add red/rose color theme (matching the purple and blue themes on the other cards)
2. **"Journey" Text**: Change from teal/primary to black for better visual balance

## Changes

### 1. ChatPreviewCard Red Theme

Update the AI chatbot demo card with red accents:

| Element | Current | New |
|---------|---------|-----|
| Background | `bg-card/95` | `bg-gradient-to-br from-red-500/10 via-rose-500/5 to-card/95` |
| Border | `border-border` | `border-red-200/50` |
| PP Avatar | `bg-primary` | `bg-red-500` |
| User bubble | `bg-primary` | `bg-red-500` |
| Status dot | `bg-primary` | `bg-red-500` |
| Category chips | `bg-primary/10 text-primary` | `bg-red-500/10 text-red-500` |

### 2. "Journey" Text Color

Change the H1 accent word from teal to black:

```tsx
// Before
<span className="text-primary">Journey</span>

// After
<span className="text-foreground">Journey</span>
```

## Files to Modify

| File | Changes |
|------|---------|
| `src/components/landing/HeroProductCards.tsx` | Update `ChatPreviewCard` with red theme |
| `src/components/landing/HeroSection.tsx` | Change "Journey" from `text-primary` to `text-foreground` |

## Result

The hero section will have:
- **"Journey"** in black, creating a cleaner typographic look
- **Three color-coded product cards**:
  - Red (AI Chat) - bold, action-oriented
  - Purple (Your Goal) - aspirational, premium
  - Blue (Weekly Digest) - informational, trustworthy


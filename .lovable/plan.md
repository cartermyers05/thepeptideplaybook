

# Hero Section Copy Update

Two small text changes in `src/components/landing/HeroSection.tsx`. Nothing else modified.

## Changes

### 1. Headline (line 14)
Update the `headlineWords` array from:
```
["Stop Guessing.", "Start Knowing", "What the Research", "Actually Says", "About Peptides."]
```
To:
```
["The AI-Powered", "Peptide Guide", "Built From", "500+ Studies."]
```
This keeps the word-by-word animation intact with 4 words instead of 5.

### 2. Subheadline (line 56)
Replace the long paragraph with:
```
Ask anything. Get research-backed answers matched to your goals — not TikTok opinions.
```
Single line, same styling (text-lg md:text-xl, muted-foreground, max-w-lg).

## What stays the same
- All layout, positioning, colors, fonts, sizes
- CTA buttons and their links
- Trust badges
- Right-column product preview cards
- Gradient orb animation
- Navigation bar
- Every other page and component

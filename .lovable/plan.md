

# Fix Hero Headline Visibility

## The Problem
The headline "Your AI Peptide Journey" is getting cut off or not fully visible. This is happening because:
1. The text is very large (up to `text-8xl` on desktop)
2. The line-height is very tight (`leading-[0.9]`)
3. "AI Peptide" may be wrapping awkwardly on smaller screens

## The Fix

### 1. Adjust Text Sizing for Better Fit
Reduce font sizes slightly and ensure proper scaling:

| Current | New | Reason |
|---------|-----|--------|
| `text-5xl` (mobile) | `text-4xl` | Better fit on small screens |
| `sm:text-6xl` | `sm:text-5xl` | Smoother scaling |
| `md:text-7xl` | `md:text-6xl` | Prevents overflow |
| `lg:text-8xl` | `lg:text-7xl xl:text-8xl` | Full size only on large screens |

### 2. Improve Line Height
Change `leading-[0.9]` to `leading-tight` (1.25) or `leading-[1.1]` to give each line more breathing room.

### 3. Prevent Word Breaking
Add `whitespace-nowrap` to "AI Peptide" to keep it on one line, or if needed, allow it to wrap gracefully.

### 4. Container Overflow Fix
Ensure the section doesn't clip content with `overflow-visible` where needed.

## File to Modify

| File | Changes |
|------|---------|
| `src/components/landing/HeroSection.tsx` | Adjust text sizing, line-height, and overflow handling |

## Result
The full headline "Your AI Peptide Journey" will be visible on all screen sizes while maintaining the dramatic animated entrance.


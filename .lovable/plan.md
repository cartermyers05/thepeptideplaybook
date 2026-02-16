

# Protocol Page Visual Redesign

## What's Wrong

The Protocol page is the weakest screen in the app. It uses white cards on a light background, has raw goal text as category labels (e.g., "Target stubborn belly fat and improve acne/skin quality" instead of "Weight Loss"), an emoji in the title, and no visual depth. It completely breaks from the dark "Molecular Precision" aesthetic used across the rest of the dashboard.

## The Redesign

### 1. Gradient Hero Header
Replace the plain text + emoji header with a dark gradient card:
- Background: #111827 to #1E293B with subtle radial glow (Orange/Rose/Violet at 10% opacity)
- Protocol name in white Outfit font, no emoji
- Stat chips (Week X/Y, Compliance %) as frosted-glass pills with JetBrains Mono numbers
- Pulsing green dot for active status

### 2. Dark Collapsible Sections
- Card background: #141418 with border #1E293B
- Content area: #1A1A1F
- Section icons in gradient colors instead of flat orange
- Light text (#F1F5F9) for titles

### 3. Category Normalization
Add a helper that maps raw goal text to clean labels + colors:
- "fat" / "weight" -> "Weight Loss" (orange)
- "skin" / "acne" -> "Skin" (rose)
- "recovery" / "healing" -> "Recovery" (violet)
- "muscle" / "performance" -> "Performance" (green)
- "longevity" -> "Longevity" (blue)
- Fallback: "General" (gray)

### 4. Redesigned Compound Cards
- Dark card (#1A1A1F) with 4px left accent bar in category color
- Normalized category badge
- Dose in orange JetBrains Mono
- Mechanism/side effects/storage as dark inset panels with colored left borders

### 5. Enhanced Weekly Schedule
- Dark columns instead of white
- Today highlighted with orange glow
- Compound names as small colored pills instead of anonymous dots

### 6. Polished Timeline
- Dark nodes on vertical line
- Current week glows orange
- Past weeks filled, future weeks muted outline

### 7. Dark Doctor Script, Safety, Calculator, Injection Guide
All sub-components get matching dark treatment with proper contrast.

### 8. Bottom CTAs
- Primary: gradient button (Orange to Rose)
- Secondary: dark outlined button

## Files Changed

| File | Changes |
|------|---------|
| `src/pages/dashboard/Protocol.tsx` | Full visual overhaul: dark theme, gradient hero, category normalization, redesigned cards, enhanced schedule/timeline |
| `src/components/protocol/ReconCalculator.tsx` | Dark theme for dropdowns, results card, steps |
| `src/components/protocol/InjectionSiteGuide.tsx` | Dark theme for SVG and instruction cards |

## No Database Changes

All changes are purely visual. Data structure stays the same.


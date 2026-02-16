

# Dashboard Color System Update: Logo-Matched Multi-Color Palette

## Overview

Update the color application across all dashboard home components to reflect the full hexagon logo palette (orange, coral, rose, violet) instead of the current single-orange accent system. No structural, layout, or logic changes -- purely color values and gradients.

## Files Changed

| File | Changes |
|------|---------|
| `NoProtocolState.tsx` | Hero card: dual hexagon decoration (orange + violet), button hover glow (layered orange + rose), feature card icon colors (orange/rose/violet), trust strip alternating dot colors |
| `ActiveProtocolState.tsx` | Protocol name hex icon gradient (orange to rose), stat chip colors (orange/rose/green), progress bar gradient (orange to rose to violet), quick access card hover tints per-card |
| `CompoundCard.tsx` | Updated category colors: skin to #FB7185 (rose), cognitive to #A78BFA (violet) |
| `CompletionBanner.tsx` | Checkmark circle gradient (green to teal: #34D399 to #2DD4BF) |
| `FloatingChatButton.tsx` | Layered glow shadow (orange + rose), pulse ring keeps orange |
| `RestDayCard.tsx` | No color changes needed |
| `Home.tsx` | No changes needed |

## Specific Color Changes

### NoProtocolState.tsx

**Hero card decoration** (lines 41-53): Replace single dot grid with two overlapping SVG hexagon outlines positioned bottom-right, clipped by overflow:hidden. One hexagon in rgba(249,115,22,0.08) (orange), a second offset/rotated in rgba(167,139,250,0.06) (violet). Desktop only.

**CTA button hover** (lines 84-91): Add layered box-shadow on hover: `0 0 24px rgba(249,115,22,0.2), 0 0 48px rgba(251,113,133,0.1)`.

**Feature preview card icons** (lines 104-133): Each card gets a distinct icon color instead of all #4B5563:
- AI Coach: #F97316 at 60% opacity
- Daily Actions: #FB7185 at 60% opacity  
- Progress: #A78BFA at 60% opacity

**Trust strip** (lines 137-141): Replace uniform dots with alternating colored separators -- first in rgba(249,115,22,0.4) (orange), second in rgba(167,139,250,0.4) (violet).

### ActiveProtocolState.tsx

**Protocol name hex icon** (line 73): Change from solid `backgroundColor: "#F97316"` to `background: "linear-gradient(135deg, #F97316, #FB7185)"` (orange to rose).

**Stat row colors** (lines 83-95): 
- Week number: #F97316 (orange) -- keep
- Day number: #FB7185 (rose) -- changed from #4B5563
- Compliance: #22C55E (green) -- keep

**Progress bar** (lines 98-105): Change fill from solid `#F97316` to `background: "linear-gradient(90deg, #F97316, #FB7185, #A78BFA)"` (orange to rose to violet).

**Quick access cards** (lines 140-168): Each card's icon container gets a unique hover background:
- AI Coach: hover bg rgba(249,115,22,0.1)
- Protocol: hover bg rgba(251,113,133,0.1)
- Progress: hover bg rgba(167,139,250,0.1)

Add hover color data to each card object and apply conditionally via group-hover or inline style.

### CompoundCard.tsx

**Category colors** (lines 5-15): Two changes:
- `skin`: "#6366F1" becomes "#FB7185" (rose, matches logo)
- `cognitive`: "#EAB308" becomes "#A78BFA" (violet, matches logo)

All other categories unchanged.

### CompletionBanner.tsx

**Checkmark circle** (lines 19-21): Change from solid `backgroundColor: "#22C55E"` to `background: "linear-gradient(135deg, #34D399, #2DD4BF)"` (green to teal).

### FloatingChatButton.tsx

**Box shadow** (line 41): Change from `0 4px 12px rgba(0,0,0,0.15)` to `0 4px 20px rgba(249,115,22,0.2), 0 8px 32px rgba(251,113,133,0.1)` (layered orange + rose glow). Applied in both default and hover states, with hover intensifying slightly.

## What Does NOT Change

- All data hooks, database connections, routing
- Component structure and props
- Layout, spacing, typography
- DashboardLayout, DashboardTopNav, MobileBottomNav
- All other pages
- RestDayCard (no logo colors relevant here)
- Home.tsx (container unchanged)
- Animation behavior and framer-motion config


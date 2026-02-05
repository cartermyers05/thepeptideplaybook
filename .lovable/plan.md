

# Add "Look Better" / Looksmaxxing Goal to Landing Page

## The Goal
Add a new goal card for users focused on aesthetics, appearance enhancement, and "looksmaxxing." This targets people interested in peptides for skin health, hair growth, and overall appearance optimization.

## Current State
The GoalSelectionSection has 6 goals:
1. Burn Fat
2. Build Muscle
3. Heal Faster
4. Slow Aging
5. Sharpen Mind
6. Complete Beginner

## New State
Add a 7th goal: **"Look Better"** (or similar title) focused on:
- Skin quality and collagen
- Hair health and growth
- Overall aesthetic enhancement
- The "looksmaxxing" community

## Implementation

### New Goal Card

| Property | Value |
|----------|-------|
| id | `aesthetics` |
| icon | `Sparkles` (represents glow/enhancement) |
| title | "Look Better" |
| description | "Skin, hair, and aesthetics" |
| gradient | Pink/rose tones (hsl 330-350 range) |

### Grid Layout Consideration
Currently 6 cards in a 3-column grid (2 rows of 3). Adding a 7th card creates an uneven row (2 rows of 3 + 1 lonely card).

**Options:**
1. **Keep 7 cards** - The 7th card sits alone but centered on the last row
2. **Rearrange to 4+4** - Change grid to 4 columns on large screens (but this might feel cramped)
3. **Replace "Complete Beginner"** - Make beginner a separate CTA, not a goal card

**Recommendation:** Keep 7 cards. The single card on the last row creates visual hierarchy and draws attention to it as an option.

### Files to Update

| File | Changes |
|------|---------|
| `src/components/landing/GoalSelectionSection.tsx` | Add new "aesthetics" goal to the goals array |
| `src/lib/goalThemes.ts` | Add `aesthetics` theme configuration for dashboard theming |

### Code Preview

```tsx
// In GoalSelectionSection.tsx - add to goals array
{
  id: "aesthetics",
  icon: Sparkles,
  title: "Look Better",
  description: "Skin, hair, and aesthetics",
  gradient: "linear-gradient(135deg, hsl(330 70% 55%) 0%, hsl(350 65% 45%) 100%)",
},
```

```tsx
// In goalThemes.ts - add new theme
aesthetics: {
  id: "aesthetics",
  name: "Aesthetics",
  tagline: "Your appearance journey",
  gradient: "from-pink-400 to-rose-500",
  gradientFrom: "#f472b6",
  gradientTo: "#f43f5e",
  iconBg: "bg-pink-100",
  iconColor: "text-pink-500",
  accentBg: "bg-pink-50",
  accentText: "text-pink-600",
  progressColor: "#f472b6",
  Icon: Sparkles,
},
```

## Visual Result
- New "Look Better" card with pink/rose gradient
- Sparkles icon (represents glow, enhancement, beauty)
- Copy speaks directly to the looksmaxxing community without being cringe
- Links to `/quiz?goal=aesthetics` to start personalized course

## Backend Consideration
The quiz and course curriculum will need an "aesthetics" goal path. This plan covers the landing page addition only. Curriculum content for this goal would be a separate task.




# Dashboard Redesign: Modern SaaS Aesthetic

## The Core Problem

The current dashboard looks like a prototype, not a product. The black header is jarring and dated. The "glassmorphic" stat cards are invisible (4% opacity tints look like nothing). There's zero depth, zero delight, zero "wow." Modern SaaS dashboards (Linear, Vercel, Raycast, Arc) achieve that premium feel through:

- **Visible but soft shadows** (not invisible 4% tints)
- **Animated gradient borders** that feel alive
- **Proper card elevation** with layered shadows
- **Clean white space with intentional density**
- **Micro-interactions that reward exploration**

## What Changes

### 1. Kill the Black Header

The dark `#0A0A0A` header on "Today's Stack" is ugly. Replace with a clean white card that uses a **subtle animated gradient border** (the brand orange-rose-violet) that gently pulses. The section label sits inside the card with proper spacing. This feels modern and premium without the harsh contrast.

### 2. Stat Cards -- Real Depth, Not Invisible Tints

Replace the barely-visible 4% opacity tints with proper **elevated cards** that have:
- `bg-white` with a **multi-layered shadow**: `0 1px 3px rgba(0,0,0,0.04), 0 6px 24px rgba(0,0,0,0.04)`
- A **thin gradient top accent bar** (3px, rounded) that gives each card identity
- **Hover state**: card lifts with enhanced shadow + the gradient accent bar glows
- Numbers are large (32px Outfit bold) with smooth animated counters
- The sparklines/visuals are bigger and more colorful
- Remove the "hover reveal" text -- it never works on mobile. Show the detail always as a subtle secondary line

### 3. Insight Card -- Gradient Glass Panel

Replace the forgettable insight with a **standout glass panel**:
- Light gradient background: `linear-gradient(135deg, rgba(249,115,22,0.08), rgba(251,113,133,0.06), rgba(167,139,250,0.08))`
- `backdrop-filter: blur(20px)` with a subtle `1px solid rgba(255,255,255,0.6)` inner border
- A thin animated shimmer line that sweeps across once on mount
- Left icon: the hexagon SVG with a soft gradient glow behind it
- Text is 15px Outfit, slightly bolder

### 4. Today's Stack -- Clean Elevated Card

- White card with the **best shadow on the page** (it's the primary action area): `0 2px 8px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.06)`
- Header inside the card: clean label + date + progress bar, all on white
- The progress bar gets a **glow effect** using `box-shadow` on the filled portion
- A subtle `2px` gradient left border on the entire card to mark it as the "primary" section

### 5. This Week -- Filled Calendar Cells

The calendar strip days feel dead. Make today's cell have:
- A **filled gradient background** (not just a border): soft orange-rose fill at 10% opacity
- A subtle bounce animation on mount
- Other completed days get a soft green tint background
- Future days stay neutral but hoverable

### 6. Quick Access -- Proper Bento Cards

The current quick access cards are undersized and boring. Redesign as proper bento cards:
- Taller cards (more padding, `py-5 px-5`)
- Each card gets a unique **gradient icon container** (44px, rounded-xl) with the icon in white
- On hover: the entire card gets a very subtle gradient wash + lifts
- The arrow becomes a proper "go" indicator that slides right on hover

### 7. Floating Elements -- Subtle Ambient Glow

Instead of nearly-invisible hexagons, add:
- A single large **radial gradient orb** in the top-right corner (brand gradient at 6% opacity, 300px diameter, blurred)
- A second smaller orb bottom-left
- These create ambient depth without being distracting

### 8. Section Spacing and Rhythm

- Remove ALL gradient separator lines (they look dated)
- Use consistent `gap-5` between major sections
- Each section group (stat row, insight, main content, quick access) gets natural spacing via margin
- Cards within groups use `gap-3`

---

## Technical Details

### Files Modified

| File | Change |
|------|--------|
| `ActiveProtocolState.tsx` | Complete visual rewrite: remove black header, remove gradient separators, implement elevated white cards with layered shadows, gradient accent bars on stats, glass insight panel, ambient gradient orbs, proper bento quick access cards, always-visible stat details |
| `WeekCalendarStrip.tsx` | Today cell gets filled gradient background instead of border trick, completed cells get green tint |
| `CompoundCard.tsx` | Enhance shadow on hover, remove the left category bar (it competes with the card's own left border) |

### No New Dependencies

All effects use standard CSS (box-shadow layers, gradient backgrounds, backdrop-filter) and existing framer-motion.

### Shadow System

| Element | Shadow |
|---------|--------|
| Stat cards | `0 1px 3px rgba(0,0,0,0.04), 0 6px 24px rgba(0,0,0,0.04)` |
| Stat cards (hover) | `0 2px 6px rgba(0,0,0,0.06), 0 12px 40px rgba(0,0,0,0.08)` |
| Today's Stack | `0 2px 8px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.06)` |
| Quick Access (hover) | `0 4px 16px rgba(0,0,0,0.06), 0 16px 48px rgba(0,0,0,0.06)` |
| Insight panel | `0 1px 4px rgba(0,0,0,0.02)` (subtle, the gradient bg does the work) |

### Card Treatment Summary

- **Border**: `1px solid rgba(0,0,0,0.06)` (softer than current `border-border`)
- **Radius**: `20px` (slightly larger for more modern feel, up from 16px)
- **Background**: Pure `#FFFFFF`
- **Gradient accent**: 3px top bar on stat cards, 2px left bar on Today's Stack

### Layout (unchanged structure, visual upgrade)
1. Greeting (protocol name)
2. 4-col stat cards (elevated, gradient top accent, always-visible details)
3. Glass insight panel (gradient bg, shimmer, hexagon icon)
4. Today's Stack (white, elevated, gradient left border) + This Week (filled calendar) -- 60/40
5. Journey + Protocol Overview -- 60/40
6. Quick Access bento cards (gradient icon containers, hover lift)
7. Footer (clean, no gradient border)


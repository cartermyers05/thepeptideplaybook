

# Protocol Page: The "Wow Moment" Rebuild

## What's Wrong Now

The Protocol page is a wall of collapsible accordion sections. Every section is collapsed by default (except "Your Stack"), so a user lands on a page that looks mostly empty. There's no visual storytelling, no animation, no contextual intelligence, and no reason for a user to think "this was worth paying for." It's a reference document, not a command center.

## The Vision

Transform the Protocol page from a static reference into a **living, animated protocol brief** that feels like opening a personalized medical dashboard. The user should feel like they're looking at something built specifically for them.

## New Page Structure (Top to Bottom)

### 1. Animated Hero with Progress Ring
Replace the current flat header with a hero card featuring:
- A **circular progress ring** (SVG, animated on mount with framer-motion) showing cycle completion percentage
- Inside the ring: current week number in large text, "of X" below
- Next to the ring: protocol name, active status badge, and a row of stat pills (Days Elapsed, Days Remaining, Compliance)
- Subtle hexagon watermark in the corner
- The progress ring animates from 0 to the actual percentage on page load -- this is the "wow" moment

### 2. "This Week" Spotlight Card (NEW)
A prominent card that surfaces contextual, time-aware information:
- If `weekly_expectations` exists for the current week, show that week's description prominently
- Show which compounds are scheduled today vs rest day
- A one-line motivational nudge like "Week 3 -- this is when most users start noticing changes"
- This replaces the need to dig into the timeline section

### 3. Your Stack (Always Visible, Not Collapsed)
Keep compound cards always visible since this is the core content. Improvements:
- Add a small **synergy indicator** when multiple compounds share a goal (e.g., "BPC-157 + TB-500 = Recovery Stack")
- Cleaner card layout: name + category badge on one line, dose/frequency/route as structured rows below
- Mechanism/side-effects/storage stay as expandable sub-sections WITHIN each card (tap to reveal) rather than always showing

### 4. Visual Weekly Schedule (Redesigned)
Replace the cramped 7-column grid with a cleaner horizontal scroll strip:
- Each day is a card-like column showing the day name, compound pills, and a checkmark if it's a past day
- Today's column is visually highlighted with a subtle border
- Compounds show their category color dot next to the name
- Much more readable on mobile

### 5. Quick Tools Row (NEW)
A horizontal row of 3 tappable cards that replace two collapsible sections:
- **Mixing Calculator** -- opens the ReconCalculator in a sheet/modal
- **Injection Guide** -- opens the InjectionSiteGuide in a sheet/modal  
- **Doctor Script** -- opens the script in a sheet/modal with copy button
- This declutters the page massively while keeping tools one tap away

### 6. Week-by-Week Timeline (Compact)
Keep the timeline but make it compact by default:
- Show only current week +/- 1 week
- "Show all weeks" expand button
- Current week has gradient accent, past weeks have checkmarks

### 7. Safety & Risk (Always Visible Footer)
Keep the safety section but as a compact amber banner at the bottom, not a collapsible section. Safety info should never be hidden behind a click.

### 8. Bottom CTAs
- "Ask Coach About This Protocol" -- primary black pill
- "Back to Dashboard" -- secondary outlined pill

## Animations (Framer Motion)
- Page loads with staggered fade-in (each section 100ms apart)
- Progress ring animates from 0% to actual on mount (1.2s ease-out)
- Compound cards slide up on mount
- Sheet modals for tools slide up from bottom

## Technical Changes

### Files Modified

| File | What Changes |
|------|-------------|
| `src/pages/dashboard/Protocol.tsx` | Complete restructure: animated hero with progress ring, "This Week" card, always-visible stack, horizontal schedule, quick tools row, compact timeline, safety banner. Add framer-motion animations throughout. |
| `src/components/protocol/ReconCalculator.tsx` | No changes to logic, just wrap in a Sheet component when used from Protocol page |
| `src/components/protocol/InjectionSiteGuide.tsx` | No changes to logic, just wrap in a Sheet component when used from Protocol page |

### New Sub-Components (inside Protocol.tsx or extracted)
- `ProgressRing` -- animated SVG circle with framer-motion
- `ThisWeekCard` -- contextual spotlight for current week
- `QuickToolsRow` -- 3 tappable cards that open Sheet modals
- `HorizontalSchedule` -- redesigned weekly view

### Dependencies Used
- `framer-motion` (already installed) for all animations
- `vaul` Drawer component (already installed) for mobile-friendly tool sheets
- No new dependencies needed

## No Database Changes

All data comes from the existing `user_protocols` table. No schema changes needed.

## What Makes This a "Wow Moment"

1. The animated progress ring is the first thing users see -- it feels alive and personalized
2. "This Week" card shows the user immediately relevant context without scrolling
3. Tools are one tap away but don't clutter the main view
4. Every section animates in on load, creating a sense of premium quality
5. The page feels like it was built FOR this specific user, not a generic template


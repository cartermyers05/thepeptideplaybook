

# Dashboard Home: Hero Redesign

## Problem
The current no-protocol state is dominated by a large, flat black rectangle that feels generic and heavy. It lacks visual energy and doesn't feel like a premium fitness/biohacking product.

## Solution: Replace the monolithic dark card with a more dynamic, layered approach

### NoProtocolState.tsx - Complete hero rethink

**Instead of one big dark box, create a "glass-morphism gradient border" card:**

- Background: subtle gradient from rgba(249,115,22,0.04) to rgba(167,139,250,0.04) -- barely tinted, almost white
- Border: 1px solid transparent with a gradient border effect using a wrapper div (background-clip trick: outer div has `background: linear-gradient(135deg, #F97316, #FB7185, #A78BFA)` with padding 1px, inner div has white/#FAFAFA background). This creates a thin gradient-colored border that references the logo colors
- Border-radius: 20px
- Padding: 32px
- No more solid black background

**Inside the card, add a decorative floating hex cluster:**
- Position: absolute, right side, vertically centered (desktop only, hidden mobile)
- 3 hexagon outlines of different sizes (80px, 56px, 40px), overlapping slightly, each a different logo color at low opacity (orange 12%, rose 10%, violet 8%)
- Rotated at different angles (0deg, 15deg, -10deg)
- This creates a molecular/crystalline visual that references the brand without being a literal logo

**Text content stays left-aligned (max-width 60% on desktop to leave room for hex art):**
- "PROTOCOL ENGINE" label: keep orange monospace uppercase
- Heading: "Get your exact peptide protocol" -- change to black (#0A0A0A) text, not white (since card is now light). 28px mobile / 32px desktop, font-weight 700, -0.02em tracking
- Body text: #4B5563, 15px
- CTA button: solid gradient background `linear-gradient(135deg, #F97316, #FB7185)` (the logo gradient!), white text, rounded-[12px], height 48px. Hover: shift gradient slightly + glow shadow. This is way more branded than a flat white or flat orange button.
- Subtext: #9CA3AF 13px

**Feature preview cards** - keep the 3-card grid but make them more alive:
- Add a very thin 2px top border to each card using its accent color (orange, rose, violet) -- similar to how Stripe dashboard cards have colored top accents
- Remove the lock icons (they make the product feel restrictive, not aspirational)
- Remove "Unlocks with your protocol" text (same reason)
- Instead, add a subtle "Coming soon" badge in the top-right in var(--text-dim) if desired, or just leave them clean

**Trust strip** -- no changes needed, it's fine.

### ActiveProtocolState.tsx - Minor color refinement only

The active state is already decent. Only tweak:
- The small orange dot before protocol name: make it a tiny gradient dot using the logo gradient (already done per plan)
- No structural changes needed

### FloatingChatButton.tsx - No changes needed

### Files changed

| File | Change |
|------|--------|
| `NoProtocolState.tsx` | Replace dark hero card with gradient-border light card, add hex cluster decoration, gradient CTA button, remove lock icons from feature cards |

## Technical Details

The gradient border effect uses this CSS pattern:
```text
<div style="background: linear-gradient(135deg, #F97316, #FB7185, #A78BFA); padding: 1px; borderRadius: 20px;">
  <div style="background: #FAFAFA; borderRadius: 19px; padding: 32px;">
    ...content...
  </div>
</div>
```

The hex cluster SVGs are simple polygon elements (same pattern already used in the current code) but with varied sizes and colors instead of two identical ones.

The gradient button uses inline styles with `background: linear-gradient(135deg, #F97316, #FB7185)` and hover intensification via brightness filter.

All existing hooks, routing, and data connections remain untouched. Only visual changes to NoProtocolState.tsx.

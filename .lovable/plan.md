

# Protocol Page: Premium Landing Page Style Redesign

## The Reference

The gradient circle you shared (orange-to-pink gradient with a number inside) is the visual anchor. The whole protocol page will adopt the landing page's clean, editorial design system: white cards, semantic Tailwind colors, bold typography, and that gradient as the signature accent.

## Design Language (Matching Landing Page)

| Element | Value |
|---------|-------|
| Page bg | `#FAFAFA` (DashboardLayout) |
| Card bg | `bg-card` with `border border-border` and `rounded-2xl` |
| Headings | `text-foreground` bold, Outfit font |
| Body text | `text-muted-foreground` |
| Accent gradient | `linear-gradient(135deg, #F97316, #FB7185, #A78BFA)` (the gradient from your screenshot) |
| Buttons | Black pill (PillButton dark variant) |
| Hover | `hover:shadow-xl` + `hover:border-muted-foreground/30` (same as WhatsInsideSection cards) |

## Changes Per Component

### 1. Progress Ring (`ProtocolProgressRing.tsx`)
- Make the ring background use the gradient fill (solid circle, not just a stroke) matching the uploaded screenshot exactly
- Larger stroke width for a bolder look
- White text inside the filled gradient circle (week number)
- Add a subtle glow/shadow behind the ring: `filter: drop-shadow(0 4px 20px rgba(249,115,22,0.3))`

### 2. Hero Header (`Protocol.tsx`)
- Replace inline styles with Tailwind semantic classes: `bg-card border border-border`
- Remove the faint rainbow tint background, use clean white
- Stat pills: `bg-secondary text-foreground` instead of custom grays
- Status badge: keep green, but use `bg-primary/10 text-primary` for the accent stat

### 3. "This Week" Card (`ProtocolThisWeekCard.tsx`)
- White card: `bg-card border border-border rounded-2xl`
- Remove colored tint backgrounds
- Section label uses the gradient as text color (CSS `background-clip: text`)
- Compound pills: `bg-secondary text-foreground` 

### 4. Compound Cards (`ProtocolCompoundCard.tsx`)
- White card with `border border-border rounded-2xl hover:shadow-xl hover:border-muted-foreground/30 transition-all`
- Keep the 3px left accent bar (category color)
- Category badge: gradient background for the pill when it matches the primary goal
- Detail sub-sections: `bg-secondary/50` backgrounds instead of colored tints
- "More details" link styled like landing page muted links

### 5. Quick Tools Row (`QuickToolsRow.tsx`)
- Each tool card: `bg-card border border-border rounded-2xl hover:shadow-xl transition-all`
- Icon container uses the gradient background (matching the screenshot circle) instead of single-color tints
- White icon color on gradient background
- Label in `text-foreground` bold

### 6. Weekly Schedule (`HorizontalSchedule.tsx`)
- Day columns: `bg-card border border-border rounded-xl`
- Today column: gradient border (1px) instead of violet tint
- Compound dots keep category colors
- Past day checkmarks in `text-primary`

### 7. Compact Timeline (`CompactTimeline.tsx`)
- Current week node: filled gradient circle (same as the screenshot reference, solid gradient fill)
- Past nodes: `bg-primary` with white check
- Future nodes: `border border-border` with `text-muted-foreground`
- Connector line: `bg-border`
- Descriptions: `text-foreground` for current, `text-muted-foreground` for others

### 8. Safety Banner
- Risk assessment: `bg-card border border-border` with a 2px amber left accent bar
- Emergency stop: `bg-card border border-border` with a 2px red left accent bar
- Clean, no colored backgrounds

### 9. Bottom CTAs
- Primary: Black pill button (matching landing page PillButton dark)
- Secondary: Outlined pill button (PillButton outline)

### 10. Synergy Badge
- Use gradient background with white text instead of the violet tint
- `rounded-full` pill shape

## Files Modified

| File | What Changes |
|------|-------------|
| `src/pages/dashboard/Protocol.tsx` | Replace all inline color styles with Tailwind semantic classes. Swap CTAs for PillButton-style pills. Reformat hero, safety, synergy sections. |
| `src/components/protocol/ProtocolProgressRing.tsx` | Solid gradient filled circle (matching the screenshot) with white text, glow shadow. |
| `src/components/protocol/ProtocolThisWeekCard.tsx` | White card, gradient text label, semantic Tailwind classes. |
| `src/components/protocol/ProtocolCompoundCard.tsx` | White card with hover effects matching landing page cards, semantic colors. |
| `src/components/protocol/QuickToolsRow.tsx` | Gradient icon circles, white cards with hover shadows. |
| `src/components/protocol/HorizontalSchedule.tsx` | Clean white columns, gradient border for today. |
| `src/components/protocol/CompactTimeline.tsx` | Gradient filled nodes for current week, semantic colors throughout. |

## No Database Changes

Purely visual. All data sources remain unchanged.


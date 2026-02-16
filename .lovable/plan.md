

# Protocol Page Redesign: Match the Dashboard Theme

## The Problem

The Protocol page currently uses a dark theme (near-black backgrounds, light text) that clashes completely with the rest of the dashboard, which uses white cards on a light `#FAFAFA` background with dark text and rainbow gradient accents from the hexagon logo.

## The Fix

Rebuild every component on the Protocol page to match the exact design language used in the Dashboard Home, using the logo's rainbow gradient (Orange, Rose, Violet) as the accent system and hexagon motifs for visual interest.

## Design System (matching Dashboard Home exactly)

| Element | Value |
|---------|-------|
| Page background | `#FAFAFA` (from DashboardLayout) |
| Card background | `#FFFFFF` (white) |
| Card border | `1px solid #E8EAED` |
| Card radius | `rounded-[14px]` or `rounded-2xl` |
| Heading text | `#0A0A0A` |
| Body text | `#4B5563` |
| Muted text | `#9CA3AF` |
| Light muted | `#D1D5DB` |
| Border/divider | `#E8EAED` |
| Accent gradient | `linear-gradient(135deg, #F97316, #FB7185, #A78BFA)` |
| Dose/stats font | JetBrains Mono, orange `#F97316` |
| Heading font | Outfit |

## Section-by-Section Changes

### 1. Hero Header
- White card with the rainbow gradient as a 1px border (same as the "Build My Protocol" hero card on Home)
- Inside: subtle gradient tint background `rgba(249,115,22,0.04)` to `rgba(167,139,250,0.04)`
- Protocol name in `#0A0A0A` Outfit font
- Active badge: green `#22C55E` with pulsing dot
- Stat chips: light gray background `#F3F4F6` with `#0A0A0A` text, monospace numbers
- Small decorative hexagon SVGs in the corner (matching Home hero)

### 2. Collapsible Sections
- White card background, `#E8EAED` border
- Icon color: from the rainbow palette (each section gets its own logo color)
- Title in `#0A0A0A` Outfit font
- Chevron in `#9CA3AF`
- Content area: white or very light `#FAFAFA` background

### 3. Compound Cards
- White background, `#E8EAED` border, `rounded-[14px]`
- 3px left accent bar (matching Home CompoundCard exactly)
- Category badge with proper normalized label
- Dose in orange JetBrains Mono
- Description in `#4B5563`
- Mechanism/Side Effects/Storage blocks: light tinted backgrounds (e.g., `rgba(59,130,246,0.06)` for mechanism) with colored left borders

### 4. Weekly Schedule Grid
- White columns, today highlighted with orange tint `rgba(249,115,22,0.08)`
- Day labels in `#4B5563`, today in `#F97316`
- Compound pills in `rgba(249,115,22,0.1)` with orange text

### 5. Doctor Script Section
- White cards with light borders
- Opening line in a card with blue-tinted background
- Study cards: white with `#E8EAED` border
- Question numbers: orange circles
- Copy button: orange tint

### 6. Timeline
- Nodes: current = orange filled, past = green filled with check, future = gray outlined
- Connector line: `#E8EAED`
- Description text: `#4B5563`, current week bold `#0A0A0A`

### 7. Safety Section
- Amber warning card: `rgba(245,158,11,0.06)` background with amber border
- Red emergency card: `rgba(239,68,68,0.06)` background with red border
- Text in `#4B5563`

### 8. Bottom CTAs
- Primary: solid black pill button with white text (matching brand standard)
- Secondary: white outlined pill button with `#4B5563` text

### 9. Empty/Loading States
- Skeleton with `#E8EAED` background
- Empty state: icon in `#9CA3AF`, text in `#0A0A0A` / `#4B5563`, CTA as black pill button

### 10. ReconCalculator
- White card backgrounds
- Select dropdowns with white backgrounds, `#E8EAED` borders
- Results in orange monospace
- Steps numbered with orange circles

### 11. InjectionSiteGuide
- SVG body outline strokes in `#4B5563`
- Hotspot circles: orange stroke/fill
- Instruction card: white background, `#E8EAED` border
- Step text in `#4B5563`

## Files Changed

| File | Changes |
|------|---------|
| `src/pages/dashboard/Protocol.tsx` | Replace all dark HSL colors with light theme colors matching Dashboard Home |
| `src/components/protocol/ReconCalculator.tsx` | White theme for dropdowns, results, steps |
| `src/components/protocol/InjectionSiteGuide.tsx` | White theme for SVG and instruction cards |

## No Database Changes

All changes are purely visual.

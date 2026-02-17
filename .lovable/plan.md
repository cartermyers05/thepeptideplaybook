

# Dashboard "Command Center" — Grid Layout Rebuild

## The Problem
The current dashboard is a narrow single-column list of stacked cards. It looks like a to-do list, not a command center. The reference image shows a proper analytics dashboard: **stat cards in a top row with sparklines, large chart panels in a 2-column grid, and data tables**. That density and layout structure is what we need — but with your brand colors, hexagon logo, and protocol data.

## The New Layout

### Row 1: Stat Cards (4-column grid on desktop, 2x2 on mobile)
Four white cards, each with:
- Uppercase label (JetBrains Mono, 11px, muted)
- Large value (Outfit, 28px, bold, dark)
- Mini sparkline or visual indicator using the brand gradient

| Card | Label | Value | Sparkline/Visual |
|------|-------|-------|------------------|
| Progress | CYCLE PROGRESS | `42%` | Tiny gradient progress arc (mini version of ProgressRing) |
| Day | CURRENT DAY | `Day 12` | Week number badge below |
| Compliance | COMPLIANCE | `87%` | Tiny bar chart from recent daily logs |
| Streak | STREAK | `5 days` | Flame icon with orange glow when active |

### Row 2: Today's Stack + This Week (2-column grid on desktop, stacked mobile)

**Left column (wider, ~60%)**: "Today's Stack" — compound cards with checkboxes exactly as they are now (they work well), but inside a card container with a header showing the date. Rest day card shows when no compounds.

**Right column (~40%)**: "This Week" card — the weekly expectation text + the 7-day calendar strip stacked vertically inside one card. Shows what to expect and what's scheduled.

### Row 3: Journey Timeline + Protocol Overview (2-column grid on desktop)

**Left column (~60%)**: "Your Journey" — the milestones timeline (limited to 4 nearest) inside a taller card. Vertical timeline with gradient connecting line.

**Right column (~40%)**: "Protocol Overview" — the progress ring (large, centered), phase indicator bars below, and a compact stats list (compounds count, cycle length, days remaining). This replaces the old flat overview section.

### Row 4: Quick Access (3-column grid, same as now but full-width)
The 3 quick access cards stay. Check-in nudge integrated as a badge.

### Footer
Disclaimer text, same as now.

---

## Visual Design (matching homepage)

- Background: `#FAFAFA` (unchanged)
- Cards: `#FFFFFF`, `border border-border`, `rounded-[16px]`
- Card headers: uppercase monospace labels, 11px, inside the card as a top bar
- Brand gradient accent: 3px top border on stat cards using `linear-gradient(90deg, #F97316, #FB7185, #A78BFA)`
- No dark theme. No heavy gradients. Clean, editorial, white space.
- Typography: Outfit for headings, JetBrains Mono for stat values and data labels
- Sparklines: tiny inline SVGs using the brand gradient colors (orange to rose), not full Recharts — lightweight and decorative

## Technical Details

### Files Modified

| File | Changes |
|------|---------|
| `Home.tsx` | Widen max-width from 680px to 1080px to allow the grid layout. Pass allLogs to ActiveProtocolState for sparkline data |
| `ActiveProtocolState.tsx` | Complete rewrite: grid-based layout with stat cards row, 2-column sections, responsive breakpoints. Integrate sparkline mini-charts |
| `CompoundCard.tsx` | No changes (works well as-is) |
| `WeekCalendarStrip.tsx` | No changes (works well as-is) |
| `MilestonesTimeline.tsx` | No changes (works well as-is) |
| `ProgressRing.tsx` | No changes |

### Only 2 files change
- `Home.tsx` — widen container, pass extra data
- `ActiveProtocolState.tsx` — complete layout restructure into a grid

### New Sub-components (inline, not separate files)
Sparkline mini-charts are simple inline SVGs (polyline elements) rendered directly in ActiveProtocolState. No new dependencies needed. They plot the last 7 days of compliance data from `allLogs`.

### Responsive Breakpoints
- Desktop (md+): 4-col stat row, 2-col content sections
- Tablet (sm-md): 2x2 stat row, content stacks
- Mobile (<sm): Everything stacks single-column, stat cards 2x2

### Data Flow
- `allLogs` already available in Home.tsx — just needs to be passed down as a new prop to ActiveProtocolState
- Sparkline compliance data: map last 7 logs to boolean completion ratios
- All other data sources unchanged

### What Gets Removed
- The flat "Protocol Overview" section with the ring next to text — ring moves to its own grid cell
- The separate streak/check-in row — absorbed into stat cards and quick access
- Excessive vertical spacing between sections

### Props Addition
`ActiveProtocolState` gets one new prop:
- `allLogs: DailyLog[]` — used to generate sparkline data for the compliance stat card

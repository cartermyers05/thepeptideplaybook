
# Dashboard Home: "The Command Center" — Complete Rebuild

The current dashboard is a flat white layout with a tiny progress ring, 3 stat pills, compound checkboxes, and 3 nav buttons. It looks like a prototype, not a $200/month app. This plan rebuilds it into a dark, data-rich, cinematic command center with full journey visibility.

---

## What You Get

### 1. Dark Cinematic Foundation
- Page background: deep black (#08080A) with a subtle warm nebula glow (orange/violet radial gradients at 3-4% opacity) and a micro dot grid for texture
- All cards: #111114 surfaces with rgba(255,255,255,0.05) borders
- Typography: Plus Jakarta Sans for headings, IBM Plex Mono for all data/numbers
- Every section animates in with a blur-to-sharp cinematic entrance (4px blur fading to crisp)

### 2. Hero Status Card (the showpiece)
- Dark gradient card with decorative hexagons referencing the logo
- Two-column layout: protocol info left, large animated progress ring right
- The ring animates from 0% to current on page load (1.2s) with an orange-rose-violet gradient stroke and subtle glow
- Stat pills below: Week X of Y, Day N, Compliance %, each with colored dot indicators
- Full-width gradient progress bar with "X days remaining" label

### 3. Week Calendar Strip (NEW — "where am I this week")
- 7-day horizontal calendar showing Mon-Sun
- Today highlighted with gradient border ring
- Past days with check marks (if logged) or dim dots
- Injection days marked with a subtle syringe indicator
- Shows at-a-glance what happened and what's coming THIS week

### 4. Today's Compound Cards (refined)
- Dark premium cards with 3px category-colored left accent bars
- Dose numbers in category color (IBM Plex Mono)
- 28px circular checkbox with spring bounce animation on check
- Green glow flash, card content fades to 40% opacity when done
- Completion banner slides in when all done

### 5. Journey Timeline (NEW — "where am I in the full protocol")
This is the WOW section. A vertical timeline showing your ENTIRE protocol journey:
- Uses the existing milestone definitions (first check-in, week 1, week 2, one month, halfway, course complete, etc.)
- Each milestone is a node on a vertical line
- Completed milestones: green filled node with check
- Current milestone: glowing animated node with the logo gradient
- Future milestones: dim nodes with day labels
- The connecting line is gradient-filled up to the current point, then dims
- Shows exactly how far you've come and what's ahead — weeks, months, the full picture

### 6. Streak + Check-in Row
- Two cards side by side
- Streak: flame icon with orange glow, streak count in accent-orange
- Check-in nudge: links to progress page, shows status (done/due)

### 7. Quick Access Cards
- 3 dark cards: AI Coach, Protocol, Progress
- Gradient accent bars, colored icon containers
- Hover lift with background shift

### 8. Scoped Dark Navigation
- Top nav and bottom nav both switch to dark styling when on /dashboard/* routes
- Same components, conditional colors based on route detection

---

## Technical Details

### Files Modified (12 files)

| File | Changes |
|------|---------|
| `index.html` | Add Plus Jakarta Sans (500,600,700,800) and IBM Plex Mono (400,500,600) font imports |
| `src/components/dashboard/DashboardLayout.tsx` | Route-aware dark background with gradient mesh + dot grid when on /dashboard/* |
| `src/components/dashboard/DashboardTopNav.tsx` | Conditional dark styling: #08080A bg, light text, dark nav pills |
| `src/components/dashboard/MobileBottomNav.tsx` | Conditional dark styling: #08080A bg, light icons |
| `src/pages/dashboard/Home.tsx` | Dark loading skeletons, blur-to-sharp container animation, pass dayNumber/totalDays/startDate to ActiveProtocolState |
| `src/components/dashboard/home/ProgressRing.tsx` | Full rewrite: animated SVG gradient ring (stroke-dashoffset 0 to current over 1.2s), dark track, glow filter, center label in IBM Plex Mono |
| `src/components/dashboard/home/ActiveProtocolState.tsx` | Full rewrite: dark hero card with hexagons, week calendar strip, journey timeline using MilestonesTimeline, streak counter, dark quick access |
| `src/components/dashboard/home/NoProtocolState.tsx` | Full dark redesign: gradient text on "personalized", decorative hexagons, orange gradient CTA, locked feature cards at 50% opacity, trust strip |
| `src/components/dashboard/home/CompoundCard.tsx` | Dark: #111114 bg, category-colored doses, spring bounce checkbox, green glow on check, 40% opacity fade |
| `src/components/dashboard/home/CompletionBanner.tsx` | Dark: rgba(52,211,153,0.08) bg, light text |
| `src/components/dashboard/home/RestDayCard.tsx` | Dark: dashed border at rgba(255,255,255,0.06), light text |
| `src/components/dashboard/home/FloatingChatButton.tsx` | Orange gradient always, CSS pulse keyframe when shouldPulse |

### Existing Components Integrated (no new files needed)

- `WeekCalendarStrip` — already exists, will be restyled dark and integrated into ActiveProtocolState
- `MilestonesTimeline` — already exists with full milestone definitions, will be restyled dark with gradient connecting line and glowing current node

### Data Sources (all already available)

- `useUserProtocol()` — protocol name, week, compounds, schedule, weekly_expectations, start_date, cycle_length_weeks
- `useProgressStats()` — compliance %, hasCheckedInThisWeek
- `useProfile()` — current_streak, full_name
- `useTodayLog()` — today's completion state
- `useAllLogs()` — all daily logs for the protocol
- `MILESTONE_DEFINITIONS` — 12 predefined milestones with target days, icons, celebration types

### No Database Changes

All data already exists. This is purely a visual/layout rebuild.

### Mobile Rules

- Max-width 680px centered on desktop, full-width mobile
- Hero card: single column, ring centered above protocol name
- Decorative hexagons hidden under 640px
- Stat pills: horizontal scroll if overflow
- Week calendar: all 7 days always visible (compact)
- Journey timeline: vertical, full-width
- Quick access: stacked vertically
- All tap targets: minimum 44px
- FAB positioned above bottom nav

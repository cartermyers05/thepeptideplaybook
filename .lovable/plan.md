

# Dashboard Home Redesign

## Current State

The dashboard is a simple flat list: greeting, protocol name, stats text, compound checklist cards, 3 quick-access buttons, and a disclaimer. It works but feels like a to-do app, not a premium health platform.

## New Design: "Command Center"

The redesigned home becomes a single-scroll daily command center with 5 distinct sections, using your signature orange-pink-violet gradient system and a more visual, data-rich layout.

---

### Section 1: Hero Status Card (replaces greeting + stats row)

A single elevated card with a gradient top border containing:
- Left side: Greeting ("Hey Carter"), protocol name, and a "Week 3 of 12" label
- Right side: An animated circular progress ring (reusing the existing `ProgressRing` component) showing overall protocol completion percentage
- Below: A row of 3 mini stat pills -- Day number, Compliance %, and Days Remaining -- using the monospace font for numbers
- Gradient progress bar at the bottom of the card (keep existing)

### Section 2: Today's Actions (refined checklist)

- Section header: "Today's Protocol" with date on the right (keep existing pattern)
- Compound cards stay as-is -- they're already well designed with color strips, dosing, timing, and circular checkboxes
- Completion banner stays as-is
- Rest day card stays as-is
- No changes to this section, it already works great

### Section 3: Weekly Insight Card (NEW)

A new card that shows context for where you are in the protocol:
- If `weekly_expectations` data exists on the protocol, show the current week's expectation text (e.g., "Week 3: You may start noticing improved recovery times and sleep quality")
- Styled as a subtle card with a left gradient accent bar
- If no weekly expectations data, this section is hidden (no empty state needed)

### Section 4: Streak + Check-in Nudge (NEW)

A horizontal row with two mini cards:
- **Streak card**: Shows the user's `current_streak` from their profile with a flame icon. "3-day streak" etc.
- **Check-in nudge**: If `hasCheckedInThisWeek` is false (from `useProgressStats`), show a gentle nudge card: "Weekly check-in due" with a link to /dashboard/progress. If already checked in, show a green checkmark "Checked in this week"

### Section 5: Quick Access (refined)

Keep the existing 3-button grid (AI Coach, Protocol, Progress) but upgrade the styling:
- Add the gradient top accent bar (2px) to each card, using orange/pink/violet respectively
- This matches the pattern already used in the NoProtocolState feature preview cards

### Footer

Keep the existing legal disclaimer as-is.

---

## Technical Details

### Files Modified

| File | Changes |
|------|---------|
| `src/components/dashboard/home/ActiveProtocolState.tsx` | Major rewrite: wrap header in a card, add ProgressRing, add stat pills, add weekly insight section, add streak/check-in row, upgrade quick access styling |
| `src/pages/dashboard/Home.tsx` | Pass additional data to ActiveProtocolState: `profile` (for streak), `hasCheckedInThisWeek` (from stats) |

### Files Created

None -- all changes fit within existing components.

### Data Sources (all already available, no new queries)

- `useUserProtocol()` -- protocol name, week, day, compounds, weekly_expectations, progress
- `useProgressStats()` -- compliance %, hasCheckedInThisWeek
- `useProfile()` -- current_streak, full_name
- `useTodayLog()` -- today's check completion state
- `ProgressRing` component -- already exists at `src/components/dashboard/home/ProgressRing.tsx`

### No database changes needed

All data is already being fetched. This is purely a UI/layout upgrade.


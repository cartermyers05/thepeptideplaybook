

# Dashboard Home — Complete Layout Rebuild for Real User Value

## The Problem

The current dashboard is a list of disconnected white cards stacked vertically: a hero card with a protocol name + ring, a week calendar, compound checkboxes, a generic milestone list, streak/check-in, and 3 nav buttons. It provides almost no actionable value — a user on Day 1 of a 12-week protocol sees the same empty layout as Day 84. There's no context, no "what should I expect this week," no insight into compounds, no sense of progression.

## The New Layout — What Changes

The layout is restructured into sections that actually HELP the user. Every section answers a question the user has when they open the app.

---

### Section 1: Today's Focus (top of page)

**Answers: "What do I need to do right now?"**

Instead of a generic hero card with the protocol name, the top section is a compact, information-dense status bar + today's action list combined.

- Protocol name as a small label (not a giant heading — they already know what protocol they're on)
- A single-line status strip: "Week 1 of 12 · Day 1 · 84 days left" in mono font, no pills
- The progress bar is a thin 4px horizontal bar spanning full width with the gradient fill
- Below that: "Today's Stack" with the compound cards immediately — no scrolling past filler

The compound cards themselves get richer: each shows the compound name, dose, route, and a one-line rationale pulled from the protocol data (e.g., "Increases GH pulses to target belly fat"). This turns a generic checklist into educational reinforcement.

### Section 2: This Week's Outlook (NEW)

**Answers: "What does my week look like? What should I expect?"**

A card showing:
- The `weekly_expectations` description for the current week (e.g., "Starting phase — begin at recommended doses. Monitor for any side effects.")
- A mini 7-day schedule grid showing which compounds are scheduled each day with colored dots
- Today highlighted

This uses the `weekly_expectations` data from the protocol which is currently not displayed ANYWHERE on the dashboard home. This is the most valuable unused data in the system.

### Section 3: Protocol Overview (redesigned hero)

**Answers: "How far am I? What's the big picture?"**

The progress ring moves here, becomes the centerpiece of a mid-page overview card:
- Large animated progress ring (100px)
- Key stats: compliance %, streak, days elapsed / total
- A compact 3-phase indicator showing which phase the user is in (Starting / Building / Optimization / Final) based on weekly_expectations data

### Section 4: Journey Timeline (improved)

**Answers: "What milestones have I hit and what's coming?"**

The existing MilestonesTimeline but filtered smarter: show the last completed milestone, the current/next one (prominent), and the next 2 upcoming. Not the entire list — that's overwhelming for a daily view.

### Section 5: Quick Actions

**Answers: "Where do I go from here?"**

The 3 quick access cards stay, plus the check-in nudge is integrated here (not a separate section). Streak counter becomes a small inline badge, not a full card row.

---

## Technical Implementation

### Files Modified

| File | Changes |
|------|---------|
| `ActiveProtocolState.tsx` | Complete restructure: reorder sections, add weekly outlook, enrich compound cards with rationale, redesign progress overview, improve milestone filtering |
| `CompoundCard.tsx` | Add `rationale` display as a one-line subtitle |
| `MilestonesTimeline.tsx` | Add prop to limit visible milestones (show nearest 4 instead of all 6), make "current" node more prominent |
| `WeekCalendarStrip.tsx` | Make more compact — reduce padding, integrate into the weekly outlook card rather than standalone |
| `Home.tsx` | Pass `weekly_expectations` data down to ActiveProtocolState |

### Files NOT Modified
- `DashboardLayout.tsx`, `DashboardTopNav.tsx`, `MobileBottomNav.tsx` — nav stays as-is
- `ProgressRing.tsx` — animation logic stays, just gets repositioned
- `NoProtocolState.tsx` — first-time user flow stays
- `FloatingChatButton.tsx` — stays as-is
- `CompletionBanner.tsx`, `RestDayCard.tsx` — stay as-is
- No database changes, no new hooks

### Data Already Available (no new queries needed)
- `protocol.weekly_expectations[currentWeek - 1]` — week description (unused currently)
- `compound.rationale` — per-compound reasoning (unused currently)  
- `compound.description` — compound role label (unused currently)
- `protocol.schedule` — full 7-day schedule
- `stats.compliancePercent`, `profile.current_streak` — engagement metrics

### Layout Order (top to bottom)
1. Compact greeting + status line + progress bar
2. Today's Stack (compound cards with rationale)
3. This Week (weekly expectation + mini schedule)
4. Protocol Overview (ring + stats + phase indicator)
5. Journey (filtered milestones — nearest 4)
6. Quick Actions (3 cards + check-in nudge inline)
7. Footer disclaimer

### Design Rules
- Matches homepage: white cards, `#FAFAFA` background, light borders, black text, Outfit headings, JetBrains Mono for data
- Gradient accent (orange/rose/violet) on progress bar and ring only — not overused
- No dark theme
- blur-to-sharp entrance animation stays
- Mobile-first: all sections stack vertically, 44px min tap targets

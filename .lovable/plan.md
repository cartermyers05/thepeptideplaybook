

# Dashboard Content Intelligence Upgrade

## Goal

Pack every existing dashboard section with compound-specific, week-aware, personalized content that makes the product feel like a $10,000 coaching program. No theme changes. No layout changes. No new sections. Just dramatically richer content inside every box.

## What Gets Created

### New file: `src/lib/dashboardIntelligence.ts`

A centralized intelligence module containing all the smart content helpers:

**1. `COMPOUND_WHY_MAP`** -- One-liner mechanism explanations for 12+ peptides:
- CJC-1295, Ipamorelin, GHK-Cu, BPC-157, TB-500, Semaglutide, AOD-9604, Tesamorelin, Epitalon, PT-141, Sermorelin, MK-677

**2. `getWeekPhaseLabel(week)`** -- Returns a phase one-liner for the greeting area:
- Week 1: "Priming phase -- your receptors are calibrating to the new signals."
- Week 2: "Adaptation phase -- most users report first noticeable changes this week."
- Week 3-4: "Optimization/Acceleration phase" messages
- Week 5-8: "Maintenance phase" message
- Week 9-12: "Final stretch" message

**3. `getProgressSubtitle(percent, day, total)`** -- Context-aware subtitle for the Progress stat card:
- Less than 10%: "building the foundation"
- 10-25%: "early adaptation window"
- 25-50%: "hitting your stride"
- 50-75%: "past the halfway mark"
- 75-90%: "final optimization phase"
- Over 90%: "finish strong"

**4. `getDayCardInsight(week, compounds)`** -- Compound-aware insight for the Day stat card:
- Checks if protocol contains CJC-1295/Ipamorelin, BPC-157/TB-500, or GHK-Cu
- Returns week-specific biological insight like "GH receptor priming" or "Peak healing cascade"

**5. `getStreakSubtitle(streak)`** -- Motivational subtitle for Streak card:
- 1 day: "Every streak starts with day 1"
- 7-13 days: "1 week+ streak -- top 20% of users"
- 30+: "30 day streak -- elite consistency"

**6. `getWeeklyBriefing(week, compounds)`** -- Compound-specific briefing text:
- Generates multi-sentence briefings referencing the user's actual compounds
- Week 1 with CJC/Ipa: explains GH receptor calibration, expected sleep changes, injection site info
- Week 2: explains rhythm establishment, GHK-Cu pathway activation
- Week 3+: explains peak sensitivity windows, visible changes
- Falls back to a still-intelligent generic message for unmapped compounds

**7. `getThisWeekGuidance(week)`** -- Week-aware guidance for the "This Week" card:
- Week 1: injection rhythm, common first-week experiences
- Week 2: consistent timing, receptor binding advice
- Week 3+: steady-state, don't change doses without AI Coach

**8. `getProtocolCategory(compounds)`** -- Derives a category label from compound names:
- CJC/Ipamorelin/Sermorelin/MK-677 -> "GH Optimization"
- BPC-157/TB-500 -> "Recovery and Healing"
- GHK-Cu -> "Skin and Tissue Repair"
- Semaglutide/Tirzepatide/AOD-9604 -> "Body Composition"
- Combines multiple: "GH Optimization + Skin Repair"

## What Gets Modified

### `src/components/dashboard/home/ActiveProtocolState.tsx`

**Section 1 -- Greeting**: Add the week phase one-liner below the protocol name using `getWeekPhaseLabel()`. Styled in JetBrains Mono, 13px, muted color.

**Section 2 -- Stat Cards**: Replace static `detail` strings with intelligence functions:
- Progress card: `getProgressSubtitle(progressPercent, dayNumber, totalDays)`
- Day card: Add `getDayCardInsight(currentWeek, todayCompounds)` as a second detail line
- Streak card: `getStreakSubtitle(currentStreak)` replaces "Keep it going!"

**Section 3 -- Daily Briefing**: Update `fallbackInsight` to use `getWeeklyBriefing(currentWeek, todayCompounds)` instead of the current generic `getSmartInsight()` output. The existing AI-generated briefing still takes priority when available.

**Section 5 -- This Week**: When no `currentWeekExpectation` from the protocol, fall back to `getThisWeekGuidance(currentWeek)` instead of showing nothing.

**Section 7 -- Protocol Overview**: Add two rows to the stats list:
- "Category" using `getProtocolCategory(protocol.compounds)`
- "Next milestone" showing the next uncompleted milestone name

**Section 8 -- Quick Access Cards**: Update descriptions:
- AI Coach: "Ask about your stack, timing, or interactions"
- My Protocol: "Doses, schedule, reconstitution guides"
- Progress: "Log check-ins, photos, and milestones"

### `src/components/dashboard/home/CompoundCard.tsx`

Add a "WHY" one-liner below the timing line, pulled from `COMPOUND_WHY_MAP`. Only shows if a match exists. Styled italic, 12px, muted color. Single line with ellipsis on mobile, up to 2 lines on desktop.

### `src/components/dashboard/home/DailyBriefingCard.tsx`

Add a subtle left border accent (3px solid with the existing indigo tint) to visually elevate the briefing card.

### `src/components/dashboard/home/WeeklyReviewCard.tsx`

Add a preview teaser line below "AI-powered analysis of your week":
"See your compliance patterns, compound timing analysis, and what to adjust for next week."

### `src/components/dashboard/home/TrendMiniChart.tsx`

Add helper text below the chart when fewer than 7 data points exist:
"Trends become meaningful after 7 days of logging. Keep checking in daily."
Styled in JetBrains Mono, 12px, muted, centered.

### `src/components/dashboard/home/FDATimelineCard.tsx`

Add a small info tooltip (?) icon next to the header. On hover/tap shows: "We track FDA, PCAC, and regulatory developments that may affect your protocol compounds. Updated monthly."

### `src/lib/milestoneDefinitions.ts`

Update milestone titles and descriptions to feel more premium:
- "First Check-In" -> "Protocol Activated" / "Your personalized stack was generated"
- "Supplies Ready" -> "Supplies Confirmed" / "Peptides and supplies sourced"
- "Reconstitution Complete" -> "First Reconstitution" / "Peptides mixed and ready for use"
- "Week 1 Complete" -> "One Week Complete" / "Receptor adaptation checkpoint"
- "One Month Complete" -> "30-Day Mark" / "First major assessment window"
- "Course Complete" -> "Protocol Complete" / "Full cycle finished -- assess results"

## Files Summary

| File | Action |
|------|--------|
| `src/lib/dashboardIntelligence.ts` | CREATE -- All helper functions and compound data |
| `src/components/dashboard/home/ActiveProtocolState.tsx` | EDIT -- Integrate intelligence into greeting, stats, briefing, this week, overview, quick access |
| `src/components/dashboard/home/CompoundCard.tsx` | EDIT -- Add WHY one-liner |
| `src/components/dashboard/home/DailyBriefingCard.tsx` | EDIT -- Left border accent |
| `src/components/dashboard/home/WeeklyReviewCard.tsx` | EDIT -- Teaser line |
| `src/components/dashboard/home/TrendMiniChart.tsx` | EDIT -- Low-data helper text |
| `src/components/dashboard/home/FDATimelineCard.tsx` | EDIT -- Info tooltip |
| `src/lib/milestoneDefinitions.ts` | EDIT -- Premium milestone titles |

## What Does NOT Change

- No theme or color changes -- stays consistent with landing page
- No layout rearrangement, no new sections, no removed sections
- No Supabase queries, hooks, or data fetching changes
- No routing or navigation changes
- Chat, Protocol, and Progress pages untouched
- FDA Timeline content untouched (just adding tooltip)
- Disclaimer footer stays

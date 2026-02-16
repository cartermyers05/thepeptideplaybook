
# Dashboard Home Redesign - Premium Health Tech Experience

## Overview

Complete visual redesign of `src/pages/dashboard/Home.tsx` to transform it from a generic, empty-feeling dashboard into a premium health tech experience comparable to Whoop or Oura Ring. This only touches the dashboard home page. All existing data connections, hooks, and functionality are preserved.

## What Changes

**Single file rewrite: `src/pages/dashboard/Home.tsx`**

No new files, no database changes, no hook changes. This is purely a visual/UX upgrade of the existing page using the same data sources (`useUserProtocol`, `useTodayLog`, `useUpsertDailyLog`, `useProfile`, `useAllLogs`, `useProgressStats`).

## Design Details

### No-Protocol State (New Users)

**Greeting**: "Hey [first name] (wave emoji)" pulled from `profiles.full_name` (split on space, take first word). Falls back to "Hey there" if no name. Below: "Ready to build your first protocol?" in muted text.

**Hero Card**: Full-width with gradient from #FFF7ED to #FEF3C7. Contains:
- "AI-POWERED" pill badge in orange
- "Your Personal Peptide Protocol" heading
- Description paragraph about how it works
- Black pill button "Build My Protocol" (not full-width, content-sized)
- "Takes about 3 minutes" subtext
- Right side (desktop only, hidden on mobile): three overlapping rotated rounded rectangles in orange/purple/green at low opacity representing a "stack"

**Three Preview Cards**: AI Coach (orange), Daily Actions (purple), Progress Tracking (green). Each with colored circle icon, label, description. These are NOT clickable in no-protocol state, shown at 0.7 opacity with a lock icon and "Available after protocol" text.

**Trust Strip**: Centered row: "Built on 500+ studies" / "No bro science" / "Your data stays private" with Book, Shield, Lock icons in muted gray.

### Active Protocol State (Returning Users)

**Protocol Header**: Greeting + protocol name (e.g., "The Lean & Shred Stack"). Row of colored stat pills: "Week X of Y" (orange), "Day X" (purple), "X% compliance" (green). Desktop: circular ProgressRing on the right showing cycle percentage.

**Progress Bar**: Full-width, 6px, gradient orange-to-amber fill. "X days remaining" right-aligned below.

**Today's Protocol Section**: Date header. Compound action cards redesigned with:
- 4px vertical color strip on the left edge (category color)
- Category badge pill next to compound name
- Dose highlighted in orange
- 32px circular checkbox (not square). Check animation: scale 1 to 1.15 to 1 over 250ms. Checked compounds get strikethrough.

**Completion State**: When all done, cards get green tint. Animated completion card slides in with green gradient, celebration emoji, "Day X Complete", motivational subtext, and floating particle animation (small green circles rising and fading for 3 seconds).

**Rest Day State**: Dashed-border card with relaxed emoji, "Rest Day" heading, explanation, and "Next scheduled" info showing the next day with compounds.

**Quick Access Cards**: Three cards (row on desktop, stacked on mobile) with colored circle icons, labels, descriptions, and arrow indicators. Hover: translateY(-2px) + shadow lift. Links to /dashboard/coach, /dashboard/protocol, /dashboard/progress.

**Floating Action Button**: 56px orange circle, white chat icon, positioned above mobile bottom nav (bottom-24 on mobile). Pulse animation if no logs in 7 days.

### Global Polish

- Subtle CSS noise texture overlay on page background at 3-4% opacity
- Warm shadows: rgba(0,0,0,0.06)
- 200ms ease transitions on all interactive elements
- Page max-width 800px centered (override DashboardLayout's 1080px)
- Consistent 16px/24px/32px vertical rhythm

### Mobile Specifics

- Everything single column
- Hero decorative SVG hidden below 768px
- Stat pills horizontally scrollable (no wrap)
- All tap targets 44px+, buttons 48px+
- Quick access cards stacked with 12px gap
- FAB positioned above bottom nav

## Data Sources (all existing, no changes)

- `useUserProtocol()` - protocol, currentWeek, daysRemaining, progressPercent, todayCompounds, daysElapsed, totalDays
- `useTodayLog(protocol?.id)` - today's log for checkbox state
- `useUpsertDailyLog()` - toggle compound completion
- `useProfile()` - full_name for greeting
- `useAllLogs(protocol?.id)` + `useProgressStats()` - compliance percentage
- `useRecentLogs(7)` - for FAB pulse animation (check if any logs in last 7 days)

## What Does NOT Change

- DashboardLayout, DashboardTopNav, MobileBottomNav
- All hooks (useUserProtocol, useDailyLog, useProfile, useProgressData)
- All other pages (homepage, quiz, guides, coach, protocol, progress, etc.)
- Database schema, edge functions, routing
- ProgressRing component (reused as-is)

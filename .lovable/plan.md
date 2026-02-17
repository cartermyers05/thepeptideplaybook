

# Dashboard Upgrades: Background Animations, Charts & FDA Timeline

## Overview

Three additions to the dashboard home page: animated background effects, a data visualization chart, and a live FDA regulatory timeline that auto-updates from your news feed.

## 1. Animated Dashboard Background

The dashboard currently has a flat `#FAFAFA` background. We'll add subtle ambient animations to the `DashboardLayout` wrapper without overwhelming the content cards.

**What gets added:**
- Slow-drifting gradient orbs (indigo, emerald, violet) at very low opacity behind all content
- Micro-particle field (20-30 tiny dots floating gently) for depth
- A soft breathing glow pulse centered behind the stat cards area
- All animations use CSS `will-change: transform` for GPU acceleration and are `pointer-events-none`

**Implementation:** New `DashboardBackground` component rendered inside `DashboardLayout.tsx`, positioned absolutely behind the `{children}` content.

## 2. Compliance & Energy Trend Chart

A new Recharts-powered card placed between the Weekly Review and Today's Stack sections, showing the user's last 14 days of data at a glance.

**What it shows:**
- Dual-axis line chart: compliance rate (left axis, %) and energy level (right axis, 1-10)
- Gradient-filled area under each line (blue for compliance, emerald for energy)
- Animated draw-in on first render
- Compact card style matching the existing dashboard aesthetic

**Implementation:** New `TrendMiniChart` component using Recharts (already installed). Data sourced from the `allLogs` prop already passed through to `ActiveProtocolState`.

## 3. FDA Regulatory Timeline

An interactive timeline card showing key peptide regulatory events and upcoming expected dates. This auto-updates by pulling from two sources:

**Data sources:**
- A new `fda_timeline_events` database table storing structured events (date, peptide, event type, status)
- Regulatory news articles from the existing `news_articles` table (category = "regulatory")

**What the user sees:**
- A vertical timeline with color-coded nodes:
  - Green = Approved/positive
  - Red = Banned/Category 2
  - Amber = Under review/pending
  - Blue = Upcoming expected date
- Each node shows: date, peptide name, short description
- "Upcoming" events have a pulsing animation to indicate they're projected
- A "Latest News" badge links to relevant regulatory articles when one exists
- Scrollable within a fixed-height card

**Auto-updating mechanism:**
- The `fda_timeline_events` table stores both historical facts and projected future dates
- When new regulatory news articles are published (via existing news pipeline), an admin can add corresponding timeline events
- A backend function `update-fda-timeline` can be called to use AI to extract timeline-relevant info from recent regulatory news and suggest new events

### Database: `fda_timeline_events` table

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| peptide_name | text | e.g. "BPC-157", "Semaglutide" |
| event_date | date | When it happened/expected |
| event_type | text | "approved", "banned", "under_review", "hearing", "expected_decision" |
| title | text | Short headline |
| description | text | 1-2 sentence detail |
| status | text | "confirmed" or "projected" |
| source_url | text | Link to source (nullable) |
| news_article_id | uuid | FK to news_articles (nullable) |
| created_at | timestamptz | Auto |

RLS: Public read access (this is regulatory reference data, not user-specific). Insert/update restricted to service role.

**Seed data includes:**
- 2023: FDA places BPC-157, TB-500, AOD-9604 on Category 2
- Sep 2024: CJC-1295 and Ipamorelin removed from Category 2 (but NOT added to Category 1)
- 2025: FDA guidance updates on compounding
- 2026 projected: PCAC review hearings, potential reclassification decisions

### Backend Function: `update-fda-timeline`

An edge function that:
1. Fetches recent regulatory news articles (last 30 days)
2. Sends them to Gemini Flash with a structured prompt to extract timeline events
3. Returns suggested new events for admin review
4. Optionally auto-inserts confirmed events

## Technical Details

### Files Created

| File | Purpose |
|------|---------|
| `src/components/dashboard/home/DashboardBackground.tsx` | Animated gradient orbs, particles, and breathing pulse for dashboard bg |
| `src/components/dashboard/home/TrendMiniChart.tsx` | Recharts dual-axis line chart for compliance + energy trends |
| `src/components/dashboard/home/FDATimelineCard.tsx` | Interactive FDA regulatory timeline with color-coded nodes |
| `src/hooks/useFDATimeline.ts` | Hook to fetch timeline events from database |
| `supabase/functions/update-fda-timeline/index.ts` | AI-powered extraction of timeline events from regulatory news |

### Files Modified

| File | Change |
|------|--------|
| `src/components/dashboard/DashboardLayout.tsx` | Add `DashboardBackground` component behind content |
| `src/components/dashboard/home/ActiveProtocolState.tsx` | Add `TrendMiniChart` and `FDATimelineCard` as new dashboard sections |

### Animation Performance

- Background orbs use CSS keyframe animations (not framer-motion driven) for zero JS overhead
- Particle count capped at 25 with `will-change: transform`
- Chart uses Recharts built-in animation (single render, no continuous repaints)
- Timeline pulsing dots use CSS `@keyframes` only

### Chart Data Processing

The `TrendMiniChart` processes `allLogs` to compute:
- Daily compliance: `completed_actions / total_actions * 100`
- Energy: pulled from `energy_level` field in each log
- Missing days show as gaps (no interpolation to keep it honest)


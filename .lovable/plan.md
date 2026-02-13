

# Redesign Protocols Page as Weekly Journey Brief

## Overview
Replace the current `/dashboard/protocols` page (Protocols.tsx) with a weekly journey brief system. Instead of showing protocol cards and peptide accordions, the page foregrounds the user's current week as a detailed, action-oriented brief with nutrition plans, movement guidance, progress benchmarks, and safety information.

## Data Architecture

### New File: `src/data/weeklyBriefs.ts`
A single TypeScript file containing all 20 weeks of structured content as a typed object. Each week entry includes:
- `title`, `phase`, `phaseName`, `dose`
- `doseChange`, `previousDose`, `newDose`, `doseAlertMessage`
- `whatToExpect` (2-3 paragraphs)
- `nutrition` (detailed with bullet lists)
- `movement` (detailed with bullet lists)
- `progressStats` (array of stat objects: value, label)
- `progressNote` (reassurance paragraph)
- `normalSymptoms` (array of strings)
- `warningSymptoms` (array of strings)

All content comes directly from the prompt (weeks 1-20 with full nutrition/movement/progress/safety text). Special nutrition override for Week 4.

### No Database Changes
Current week is computed from `protocol_progress.start_date` via the existing `useActiveProtocolProgress` hook. No new tables or migrations needed.

## Page Layout

### When No Active Protocol
Redirect to `/dashboard` where the "Ready to Start Your Protocol?" card already exists.

### When Protocol Is Active

**1. Week Navigation Bar (top)**
- Horizontal scrollable row of 20 pills ("W1" through "W20")
- Current week: orange (#F97316) background, white text
- Completed weeks: light green background, green text, clickable
- Future weeks: dimmed (#F5F5F5), not clickable
- Dose change weeks (5, 9, 13, 16): tiny amber dot indicator
- Auto-scrolls to center current week on mount
- Clicking a past/current week scrolls to and expands that week's brief

**2. Current Week Brief Card (hero, expanded by default)**
- Warm cream (#FFF7ED) background with subtle orange shadow
- Header: "WEEK X" label in font-mono orange, phase name, week title (24-32px bold), dose badge (green pill), dose change amber badge if applicable
- Dose change alert banner (#FEF3C7 amber background) when applicable
- 5 content blocks separated by thin dividers:
  - Block 1: "What to Expect This Week" -- multi-paragraph body text
  - Block 2: "Your Nutrition This Week" -- bullet lists with orange bullets, food lists in inset #F9F9F9 containers
  - Block 3: "Your Movement This Week" -- structured exercise guidance with bullet lists
  - Block 4: "Progress Check" -- 2-3 stat boxes (value + label) in a row, plus reassurance note in italic
  - Block 5: "When to Be Concerned" -- two-column layout (green "Normal" vs red "Contact your doctor")

**3. Previous Weeks Section**
- "Previous Weeks" heading with divider
- Collapsed cards for weeks (currentWeek-1) down to 1
- Each shows: green check, "Week N: Title", dose badge
- Accordion behavior: click to expand same 5-block structure on white background
- Only one previous week expanded at a time

**4. Coming Up Section**
- "Coming Up" heading
- Next 2-3 upcoming weeks as dimmed, locked preview cards
- Dashed border, lock icon, non-clickable

## Files Summary

| File | Change |
|------|--------|
| `src/data/weeklyBriefs.ts` | New -- all 20 weeks of structured content (titles, nutrition, movement, progress, safety) |
| `src/pages/dashboard/Protocols.tsx` | Full rewrite -- weekly journey brief with week navigation, hero brief card, previous weeks accordion, upcoming preview |

## What Does NOT Change
- Dashboard home page (Home.tsx) -- untouched
- AI chat page -- untouched
- Navigation structure (DashboardLayout, sidebar, bottom nav) -- untouched
- Protocol detail view, check-in system, progress tracking hooks -- untouched
- All existing components not mentioned (WarningBox, StudyCard, etc.)
- No backend, auth, or payment changes
- No new database tables or migrations


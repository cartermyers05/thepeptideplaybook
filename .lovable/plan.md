

# Remove Streaks Feature

## Overview

Remove all streak-related functionality from the dashboard and product. This includes the streak badge, streak hooks, streak-based milestones, and streak calendar components.

---

## Changes Summary

| File | Action |
|------|--------|
| `src/pages/dashboard/Home.tsx` | Remove streak import, usage, and badge display |
| `src/pages/dashboard/Progress.tsx` | Remove streak stats, streak calendar section |
| `src/hooks/useStreak.ts` | Delete file (no longer needed) |
| `src/components/progress/StreakCalendar.tsx` | Delete file |
| `src/components/progress/AchievementGrid.tsx` | Remove streak-based milestone types |
| `src/hooks/useMilestones.ts` | Remove streak milestone types (streak_7, streak_14, etc.) |

---

## Detailed Changes

### 1. Dashboard Home (`src/pages/dashboard/Home.tsx`)

**Remove:**
- Import of `Flame` icon (line 3)
- Import of `useStreak` hook (line 8)  
- `const { currentStreak } = useStreak();` (line 38)
- The entire streak badge display (lines 130-135)
- The "continue your streak" text in the check-in success banner (line 147)

**Update check-in success message:**
```
"Come back tomorrow to continue your streak" → "Great job! See you tomorrow."
```

---

### 2. Progress Page (`src/pages/dashboard/Progress.tsx`)

**Remove:**
- Import of `useStreak` hook (line 2)
- Import of `StreakCalendar` (line 7)
- Import of `Flame` icon (line 10)
- `useStreak()` hook call (line 13)
- Loading check for `isLoadingStreak` (line 19)
- Current Streak stat card (lines 40-45)
- Longest Streak stat card (lines 46-51)
- Entire Streak Calendar card section (lines 60-71)

**Keep:**
- Total Check-Ins stat (rename to "Days Active" or similar)
- Trend Charts
- Achievements (with streak milestones removed)

---

### 3. Delete Files

- `src/hooks/useStreak.ts` - No longer needed
- `src/components/progress/StreakCalendar.tsx` - No longer needed

---

### 4. Milestones (`src/hooks/useMilestones.ts`)

**Remove these streak milestone types:**
- `streak_7`
- `streak_14`
- `streak_30`
- `streak_60`
- `streak_90`

**Keep these course-based milestones:**
- `first_checkin`
- `first_recon`
- `week_1`
- `cycle_complete`

---

### 5. Achievement Grid (`src/components/progress/AchievementGrid.tsx`)

**Update `ALL_MILESTONES` array to remove streak items:**
```typescript
const ALL_MILESTONES: MilestoneType[] = [
  "first_checkin",
  "first_recon",
  "week_1",
  "cycle_complete",
];
```

---

## What Stays

- **Check-ins** still work (tracking daily engagement)
- **Milestones** still work (course-based achievements)
- **Trend Charts** still work (mood, energy, sleep tracking)
- **Progress ring** and day counter on dashboard

---

## Result

The dashboard will show:
- Greeting with day counter (no streak badge)
- Today's lesson
- Progress ring
- Next injection
- Week calendar
- Quick actions
- Milestones (course-based only)

Progress page will show:
- Total check-ins / days active
- Trend charts
- Course achievements (no streak achievements)


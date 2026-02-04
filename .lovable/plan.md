

# Dashboard Value Update - Complete Redesign

## Overview

Transform the current minimal dashboard (greeting, check-in card, two quick actions) into a value-rich command center showing everything users need at a glance: today's lesson, visual progress, next injection details, weekly calendar, streak, and milestones.

---

## Current State Analysis

The existing `Home.tsx` has:
- Header with greeting + streak (basic)
- Simple progress bar
- Today's lesson card (good, keep it)
- Check-in prompt when needed
- Two quick action cards (AI Coach, My Plan)
- Basic milestones list

**Missing:**
- Circular progress visualization
- Next injection card with date, dose, units
- Week calendar strip showing completed days and injection days
- Current phase display
- Better milestone timeline with dates

---

## New Dashboard Layout

```text
+-----------------------------------------------------------------------+
|                                                                       |
|  Good evening, Carter                                  [fire] 5 days  |
|  Day 5 of 56 - Fat Loss Course                                        |
|                                                                       |
+-----------------------------------------------------------------------+
|                                                                       |
|  TODAY'S LESSON                                            Day 5      |
|  -------------------------------------------------------------------- |
|  Your First Injection                                                 |
|  Everything has been building to this moment...                       |
|  [clock] 4 min read                          [ Start Lesson -> ]      |
|                                                                       |
+-----------------------------------------------------------------------+
|                                   |                                   |
|  YOUR PROGRESS                    |  NEXT INJECTION                   |
|  +-------------+                  |  [syringe] Sunday, Feb 9          |
|  | [O] 9%      |  5 of 56        |  In 4 days                        |
|  +-------------+  days complete   |  +----------------------------+   |
|                                   |  | Dose:  0.25mg              |   |
|  Phase: Getting Started           |  | Draw:  10 units            |   |
|                                   |  +----------------------------+   |
|                                   |  [ View Full Schedule ]           |
|                                   |                                   |
+-----------------------------------+-----------------------------------+
|                                                                       |
|  THIS WEEK                                                            |
|  +-----+ +-----+ +-----+ +-----+ +-----+ +-----+ +-----+             |
|  | Mon | | Tue | | Wed | | Thu | | Fri | | Sat | | Sun |             |
|  | [x] | | [x] | | [x] | | [x] | | [*] | |     | | [s] |             |
|  |  3  | |  4  | |  5  | |  6  | |  7  | |  8  | |  9  |             |
|  +-----+ +-----+ +-----+ +-----+ +-----+ +-----+ +-----+             |
|                                                                       |
+-----------------------------------------------------------------------+
|                                   |                                   |
|  [purple] AI Coach                |  [orange] My Plan                 |
|  Ask anything about your course   |  Peptides, schedule & guides      |
|                                   |                                   |
+-----------------------------------+-----------------------------------+
|                                                                       |
|  MILESTONES                                                           |
|  [x] First Check-In                                          Feb 3   |
|  [x] Reconstitution Complete                                 Feb 6   |
|  [o] First Injection                                         Today   |
|  [ ] Week 1 Complete                                         Day 7   |
|  [ ] First Dose Increase                                     Day 14  |
|                                                                       |
+-----------------------------------------------------------------------+
```

---

## Data Requirements

The dashboard needs to calculate and display:

| Data Point | Source | Calculation |
|------------|--------|-------------|
| `displayName` | `useProfile()` | First name from profile |
| `currentDay` | `userCourse.current_day` | Direct |
| `totalDays` | `userCourse.duration_days` | Direct |
| `progressPercent` | `useCourse()` | `(currentDay / totalDays) * 100` |
| `currentStreak` | `useStreak()` | Direct |
| `todayLesson` | `userCourse.lessons` | Filter by `day === currentDay` |
| `currentPhase` | `todayLesson.phase` | From lesson data |
| `currentWeek` | Calculated | `Math.ceil((currentDay + 1) / 7)` |
| `nextInjection` | Calculated | Based on injection day (Sunday) + current dose from `peptideDetails` |
| `weekDays` | Calculated | 7-day array with status flags |
| `milestones` | Static + dynamic | Course milestones with completion status |

---

## Implementation Details

### 1. Helper Functions (add to Home.tsx)

**Time of Day Greeting:**
```typescript
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}
```

**Get Current Week's Days:**
```typescript
function getWeekDays(courseStartDate: Date, currentDay: number, injectionDay: number = 0) {
  // injectionDay: 0 = Sunday, 1 = Monday, etc.
  const today = new Date();
  const startOfWeek = startOfWeek(today, { weekStartsOn: 1 }); // Start on Monday
  
  return Array.from({ length: 7 }, (_, i) => {
    const date = addDays(startOfWeek, i);
    const dayOfWeek = getDay(date);
    const lessonDay = differenceInDays(date, courseStartDate);
    
    return {
      dateKey: format(date, 'yyyy-MM-dd'),
      dayName: format(date, 'EEE'),
      dayNumber: format(date, 'd'),
      isToday: isSameDay(date, today),
      isCompleted: lessonDay >= 0 && lessonDay < currentDay,
      isInjectionDay: dayOfWeek === injectionDay,
      lessonDay: lessonDay >= 0 ? lessonDay : null,
      isFuture: isAfter(date, today),
    };
  });
}
```

**Calculate Next Injection:**
```typescript
function getNextInjection(currentDay: number, courseStartDate: Date, peptideDetails: PeptideDetail) {
  const injectionDayOfWeek = 0; // Sunday
  const today = new Date();
  
  // Find next injection day (Sunday)
  let nextDate = today;
  while (getDay(nextDate) !== injectionDayOfWeek) {
    nextDate = addDays(nextDate, 1);
  }
  
  // If today is injection day and we haven't passed injection time, it's today
  if (getDay(today) === injectionDayOfWeek) {
    nextDate = today;
  }
  
  const daysUntil = differenceInDays(nextDate, today);
  
  // Calculate current dose based on week
  const currentWeek = Math.ceil((currentDay + 1) / 7);
  let dose = "0.25mg";
  let units = 10;
  
  if (currentWeek >= 5) {
    dose = "1.0mg";
    units = 40;
  } else if (currentWeek >= 3) {
    dose = "0.5mg";
    units = 20;
  }
  
  return {
    date: nextDate,
    dateFormatted: format(nextDate, 'EEEE, MMM d'),
    daysUntil,
    dose,
    units,
    weekNumber: currentWeek,
  };
}
```

**Course Milestones:**
```typescript
const courseMilestones = [
  { id: 'first-checkin', title: 'First Check-In', day: 1, type: 'lesson' },
  { id: 'reconstitution', title: 'Reconstitution Complete', day: 4, type: 'lesson' },
  { id: 'first-injection', title: 'First Injection', day: 5, type: 'lesson' },
  { id: 'week-1', title: 'Week 1 Complete', day: 7, type: 'streak' },
  { id: 'first-increase', title: 'First Dose Increase', day: 14, type: 'dose' },
  { id: 'one-month', title: 'One Month Complete', day: 28, type: 'streak' },
  { id: 'halfway', title: 'Halfway There!', day: 28, type: 'progress' },
  { id: 'complete', title: 'Course Complete!', day: 56, type: 'progress' },
];

function getMilestones(currentDay: number, courseStartDate?: Date) {
  return courseMilestones.slice(0, 5).map(milestone => {
    const completed = currentDay >= milestone.day;
    const isCurrent = currentDay === milestone.day || 
      (currentDay < milestone.day && currentDay >= (courseMilestones.find(m => m.day < milestone.day)?.day || 0));
    
    let dateLabel = `Day ${milestone.day}`;
    if (completed && courseStartDate) {
      dateLabel = format(addDays(courseStartDate, milestone.day), 'MMM d');
    } else if (milestone.day === currentDay) {
      dateLabel = 'Today';
    }
    
    return {
      ...milestone,
      completed,
      isCurrent: milestone.day === currentDay,
      dateLabel,
    };
  });
}
```

---

### 2. New Component Structure

```tsx
export default function Dashboard() {
  // Existing hooks
  const { user } = useAuth();
  const { data: profile } = useProfile();
  const { userCourse, progressPercent } = useCourse();
  const { currentStreak } = useStreak();
  const { hasCheckedInToday } = useCheckIn();
  const { protocol } = useProtocol();

  // Derived data
  const displayName = profile?.full_name?.split(' ')[0] || 'there';
  const currentDay = userCourse?.current_day ?? 0;
  const totalDays = userCourse?.duration_days ?? 56;
  const courseTitle = userCourse?.title ?? 'Your Course';
  const todayLesson = userCourse?.lessons?.find(l => l.day === currentDay);
  const currentPhase = todayLesson?.phase || 'Getting Started';
  
  // Calculate injection schedule
  const peptideName = userCourse?.peptides?.[0]?.name?.toLowerCase() || 'semaglutide';
  const peptideInfo = peptideDetails[peptideName];
  const nextInjection = getNextInjection(currentDay, userCourse?.started_at);
  
  // Calculate week view
  const weekDays = getWeekDays(userCourse?.started_at, currentDay);
  
  // Get milestones
  const milestones = getMilestones(currentDay, userCourse?.started_at);
  
  return (
    <DashboardLayout>
      {/* Header with Streak */}
      {/* Today's Lesson Card */}
      {/* Progress + Next Injection Row (grid-cols-2) */}
      {/* Week Calendar Strip */}
      {/* Quick Actions */}
      {/* Milestones Timeline */}
    </DashboardLayout>
  );
}
```

---

### 3. Component Sections

#### A. Header with Streak Badge
- Left: Greeting + "Day X of Y - Course Title"
- Right: Flame icon + streak count in orange-tinted pill

#### B. Today's Lesson Card (Hero)
- Coral gradient top bar
- "TODAY'S LESSON" label + Day number
- Lesson title (large, bold)
- Preview text (2 lines max)
- Clock icon + read time
- Black "Start Lesson" button with arrow

#### C. Progress Card (Left Column)
- Circular SVG progress ring (black fill on gray track)
- Percentage in center
- "X of Y days complete" text
- "Phase: [current phase]" below

#### D. Next Injection Card (Right Column)
- Syringe icon with rose/pink background
- Day name + date (e.g., "Sunday, Feb 9")
- "In X days" or "Today!" label
- Gray info box with Dose and Draw units
- "View Full Schedule" button linking to /dashboard/plan

#### E. Week Calendar Strip
- 7-day horizontal grid (Mon-Sun)
- Each day shows: abbreviation, date number, status icon
- Today: black background, white text
- Completed: green check or green border
- Injection day: syringe emoji
- Future: gray background

#### F. Quick Action Cards (keep existing design)
- AI Coach: purple gradient bar
- My Plan: orange gradient bar

#### G. Milestones Timeline
- Vertical list with status indicators
- Completed: green circle with check
- Current: black circle with white dot
- Upcoming: gray circle with empty circle
- Date/day label on right

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/pages/dashboard/Home.tsx` | Complete redesign with new layout and components |
| `src/lib/courseContent.ts` | Already has `peptideDetails` - no changes needed |

---

## New Dependencies

Add these imports to `Home.tsx`:
```typescript
import { 
  format, 
  addDays, 
  startOfWeek, 
  getDay, 
  differenceInDays, 
  isSameDay, 
  isAfter,
  parseISO
} from "date-fns";
import { peptideDetails } from "@/lib/courseContent";
```

---

## Styling Notes

All components follow the established design system:
- White cards with `border-gray-100` and `shadow-sm`
- Gradient top bars for featured cards (coral, purple, orange)
- Black buttons with white text
- Gray-400/500 for secondary text
- 16px (`rounded-2xl`) border radius for cards
- Clean typography with proper hierarchy

---

## Edge Cases to Handle

1. **No course yet** - Show "Build My Course" CTA (existing)
2. **Course not started** - Show "Start your journey" instead of injection schedule
3. **No streak** - Don't show streak badge
4. **Completed course** - Show celebration state, hide injection schedule
5. **Already checked in** - Show success banner (existing)

---

## Expected Outcome

Users will log in and immediately see:
1. Their name and current position in the course
2. Exactly what to do today (Today's Lesson)
3. Visual progress toward completion
4. When their next injection is and what dose
5. This week at a glance with injection days marked
6. Quick access to AI Coach and Plan
7. Milestones achieved and upcoming

This transforms the dashboard from "empty greeting" to "$99 worth of actionable value."


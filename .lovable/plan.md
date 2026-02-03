
# Complete Build Plan: Phase 1 Fix + Phases 2-4 Implementation

## Phase 1 Bug Fix (Must Do First)

### Issue Identified
The quiz flow has a bug where localStorage isn't set before navigation when the database insert fails (which always happens for unauthenticated users due to RLS). This causes the results page to redirect back to /quiz.

### Fix Required
**File: `src/pages/Quiz.tsx`**
- Move `localStorage.setItem()` BEFORE the database insert attempt
- This ensures quiz data is available on the results page regardless of database insert success

```
Current flow (broken):
1. Try DB insert → fails for anonymous
2. Throw error
3. Catch → navigate (but localStorage never set)
4. Results page → no data → redirect to /quiz

Fixed flow:
1. Set localStorage first
2. Try DB insert → may fail for anonymous (that's okay)
3. Navigate to results
4. Results page → has data → shows protocol
```

---

## Phase 2: Dashboard Redesign + Protocol Page + AI Coach Interface

### 2.1 New Dashboard Sidebar
**File: `src/components/dashboard/DashboardSidebar.tsx`**

Update navigation items to match new structure:
- Dashboard (home)
- My Protocol (document)
- AI Coach (bot/message)
- Chat (message-square) 
- Progress (chart)
- Settings (gear)

### 2.2 Dashboard Home Redesign
**File: `src/pages/dashboard/Home.tsx`**

New layout:
- Welcome header with streak badge
- Protocol status banner (Week X, Day Y)
- TODAY'S CHECK-IN card (prominent, center)
- Quick action buttons (Talk to Coach, View Protocol)
- Recent milestones list

### 2.3 Protocol Page
**New File: `src/pages/dashboard/Protocol.tsx`**

Features:
- Protocol header with name, status badge, cycle progress
- Peptide cards showing name, purpose, dosage, frequency, timing
- Weekly schedule calendar view
- Action buttons (Pause, Restart, Download PDF)

### 2.4 AI Coach Interface
**New File: `src/pages/dashboard/Coach.tsx`**

Tab-based interface with 4 modes:
- Daily Check-In (structured flow)
- Reconstitution Guide (step-by-step)
- Injection Guide (step-by-step)
- Ask Coach (free-form chat)

### 2.5 New Hooks
**New Files:**
- `src/hooks/useProtocol.ts` - Protocol CRUD operations
- `src/hooks/useCheckIn.ts` - Check-in operations
- `src/hooks/useStreak.ts` - Streak logic
- `src/hooks/useMilestones.ts` - Achievement tracking

### 2.6 Route Updates
**File: `src/App.tsx`**

Add new routes:
- `/dashboard/protocol` → Protocol page
- `/dashboard/coach` → AI Coach page
- `/dashboard/progress` → Progress page

---

## Phase 3: Check-In Flow + Guides

### 3.1 Check-In Flow Component
**New File: `src/components/coach/CheckInFlow.tsx`**

Structured conversation:
1. Injection completion (Yes/Not Yet/Skipped buttons)
2. Energy level (1-5 emoji scale)
3. Mood (1-5 emoji scale)
4. Sleep quality (1-5 emoji scale)
5. Side effects (multi-select chips)
6. Optional notes (text input)

On completion:
- Save to check_ins table
- Update streak
- Check for milestones
- Show celebration animation

### 3.2 Reconstitution Guide Component
**New File: `src/components/coach/ReconGuide.tsx`**

8-step guided walkthrough:
1. Gather Supplies (checklist)
2. Wash Hands
3. Clean Vials
4. Calculate Water (with peptide-specific values)
5. Draw Water
6. Add to Peptide (SLOWLY)
7. Dissolve
8. Storage

Each step waits for user to click "Done" before proceeding.

### 3.3 Injection Guide Component
**New File: `src/components/coach/InjectionGuide.tsx`**

7-step guided walkthrough:
1. Gather supplies
2. Clean injection site
3. Draw correct dosage
4. Remove air bubbles
5. Pinch skin, insert needle
6. Inject slowly
7. Apply pressure, dispose

### 3.4 Coach Edge Function
**New File: `supabase/functions/coach/index.ts`**

Context-aware AI responses with:
- User's protocol details
- Current day/week of cycle
- Recent check-in history
- Warm, supportive tone

---

## Phase 4: Progress Tracking + Gamification

### 4.1 Progress Page
**New File: `src/pages/dashboard/Progress.tsx`**

Sections:
- Stats overview (current streak, longest, total check-ins)
- Streak calendar (monthly view with green highlights)
- Check-in history (expandable list)
- Trend charts (energy, mood, sleep over time using Recharts)
- Achievement badges grid

### 4.2 Streak Calendar Component
**New File: `src/components/progress/StreakCalendar.tsx`**

Monthly calendar showing:
- Days with check-ins (green)
- Current streak highlighted
- Missed days (gray)

### 4.3 Achievement Badges Component
**New File: `src/components/progress/AchievementGrid.tsx`**

Grid of badges:
- First Check-In
- First Reconstitution
- Week 1 Complete
- 7-Day Streak
- 14-Day Streak
- 30-Day Streak
- Cycle Complete

Earned badges shown in color, locked badges grayed out.

### 4.4 Streak Logic Implementation
**Hook: `src/hooks/useStreak.ts`**

Logic:
- Check-in today + yesterday = streak++
- Check-in today, missed yesterday = streak = 1
- Streak freezes protect against single missed days
- Milestone triggers at 7, 14, 30, 60, 90 days

---

## New Files Summary

### Components
```
src/components/
├── coach/
│   ├── CoachInterface.tsx
│   ├── CheckInFlow.tsx
│   ├── ReconGuide.tsx
│   ├── InjectionGuide.tsx
│   └── AskCoach.tsx
├── protocol/
│   ├── ProtocolCard.tsx
│   ├── PeptideCard.tsx
│   └── ScheduleCalendar.tsx
└── progress/
    ├── StreakCalendar.tsx
    ├── TrendCharts.tsx
    └── AchievementGrid.tsx
```

### Pages
```
src/pages/dashboard/
├── Protocol.tsx
├── Coach.tsx
└── Progress.tsx
```

### Hooks
```
src/hooks/
├── useProtocol.ts
├── useCheckIn.ts
├── useStreak.ts
└── useMilestones.ts
```

### Edge Functions
```
supabase/functions/
└── coach/index.ts
```

---

## Implementation Order

1. **First**: Fix Phase 1 quiz bug (localStorage before DB insert)
2. **Test**: Verify quiz → results flow works for anonymous users
3. **Phase 2**: Build dashboard redesign + protocol page + coach interface
4. **Test**: Verify new dashboard loads, navigation works
5. **Phase 3**: Build check-in flow + guides
6. **Test**: Complete a check-in, verify data saves
7. **Phase 4**: Build progress page + gamification
8. **Test**: Verify streak updates, milestones trigger
9. **Final Test**: Complete full user journey (quiz → signup → dashboard → check-in → progress)

---

## Database Considerations

The schema is already in place from Phase 1:
- `quiz_responses` - stores quiz data
- `protocols` - stores user protocols
- `check_ins` - stores daily check-ins
- `user_streaks` - stores streak data
- `milestones` - stores achievements

No additional migrations needed.

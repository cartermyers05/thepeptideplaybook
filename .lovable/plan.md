

# Complete the Peptide Playbook Deliverable System

## Current State Analysis

After exploring the codebase, here's what exists vs. what's missing:

### What Already Exists ✓
| Feature | Status | Location |
|---------|--------|----------|
| Daily Lessons UI | ✓ Working | `/dashboard/course` (CourseLessons.tsx) |
| Lesson Modal with Content | ✓ Working | Dialog in CourseLessons.tsx |
| AI Coach | ✓ Working | `/dashboard/coach` with context-aware responses |
| My Plan (Reference) | ✓ Working | `/dashboard/plan` with peptides, schedules, guides |
| Reconstitution Guide | ✓ Built | Accordion in MyPlan.tsx |
| Injection Guide | ✓ Built | Accordion in MyPlan.tsx |
| Progress Ring | ✓ Built | Dashboard home |
| Welcome Flow | ✓ Built | 3-step supplies check |
| Milestones Timeline | ✓ Built | Dashboard home |
| Week Calendar Strip | ✓ Built | Dashboard home |

### Critical Gaps ✗

| Gap | Problem | Impact |
|-----|---------|--------|
| **Only 8 lessons seeded** | Course templates have 8 lessons but claim 42-84 days | Users hit "no content" on Day 9 |
| **Goal not passed to checkout** | `useCheckout.ts` doesn't send goal to `create-checkout` | Courses created with wrong goal |
| **Quiz data not used after payment** | Quiz saves to localStorage but `verify-payment` doesn't read it | User's preferences ignored |
| **Dosing Calculator missing** | Not built | Users can't calculate units to draw |
| **Interactive checkboxes missing** | Guides are read-only, not interactive | Users can't confirm steps |

---

## Implementation Plan

### Phase 1: Fix Critical Data Flow (Priority)

#### 1.1 Fix Goal Passing Through Checkout Flow

**Problem**: When user clicks "Get Your Course" on `/course/[goal]`, the goal IS passed correctly. But `useCheckout.ts` (used by `/checkout` page) doesn't pass any goal.

**Solution**: Since the CoursePreview page already handles checkout correctly (line 67-68 in CoursePreview.tsx passes `{ goal }`), we just need to ensure users always go through the course preview, not the old checkout page.

**Files to update:**
- Remove or redirect `/checkout` to `/quiz` since it's no longer part of the flow
- The CoursePreview already correctly calls `create-checkout` with goal

#### 1.2 Seed Full 56-Day Course Content

**Problem**: Course templates only have 8 lessons but promise 56 days.

**Solution**: Create database migration to populate all 56 lessons for each course template with proper:
- Day number (0-55)
- Phase (Preparation, Getting Started, Week 1-8, Mastery)
- Title
- Content (200-400 words each)
- Action item

**Content structure per the spec:**
```
Days 0-3: Preparation
- Day 0: Welcome & Your Plan
- Day 1: Understanding your peptide
- Day 2: Supplies checklist
- Day 3: Reconstitution prep

Days 4-7: Getting Started
- Day 4: Reconstitution day (link to guide)
- Day 5: First injection (link to guide)
- Day 6: Day after - what's normal
- Day 7: Week 1 complete

Days 8-14: Building Routine
- Managing side effects
- Second injection
- What to eat
- Tracking progress

Days 15-28: Optimization
- Dose increase consideration
- Non-scale victories
- One month milestone

Days 29-56: Mastery
- Fine-tuning
- Maintenance habits
- Course completion
```

### Phase 2: Enhance User Experience

#### 2.1 Add Dosing Calculator to My Plan

**New component**: `src/components/dashboard/DosingCalculator.tsx`

Features:
- Input: Vial size (mg), Water added (ml)
- Output: Units to draw for each dose tier
- Formula: `(desired_dose / vial_size) * water_added * 100 = units`
- Auto-populated based on user's current week/dose

#### 2.2 Make Guides Interactive (Checkboxes)

**Update**: `src/pages/dashboard/MyPlan.tsx`

Convert guide steps from read-only to interactive:
- Add checkboxes to each step
- Save completion state to localStorage or database
- Show progress indicator
- Prevent proceeding to injection until reconstitution is confirmed

#### 2.3 Enhance Today's Lesson Card

**Update**: `src/components/dashboard/home/TodayLessonCard.tsx`

Add quick links based on current day:
- Day 3-4: Show "Open Reconstitution Guide" button
- Day 4-5: Show "Open Injection Guide" button  
- Any day: Show "Ask AI Coach" button

### Phase 3: Progress & Engagement

#### 3.1 Enhance Milestones System

**Update**: Milestones should unlock based on actual actions:
- First check-in ✓
- Reconstitution complete (when guide checkboxes done)
- First injection ✓
- Week 1 complete
- First dose increase
- One month complete
- Course complete

#### 3.2 Add Streak System

Already partially built in `useLessons.ts`. Enhance to show:
- Current streak on dashboard
- Longest streak
- Visual streak calendar

---

## Technical Implementation Details

### Database Migration: Seed Full Lesson Content

```sql
-- Update course_templates with complete 56-day content
-- Example for fat_loss course (would do for all 6 goals)

UPDATE course_templates 
SET lessons = '[
  {"day": 0, "phase": "Preparation", "title": "Welcome & Your Plan", "content": "...", "action_item": "..."},
  {"day": 1, "phase": "Preparation", "title": "Understanding Semaglutide", "content": "...", "action_item": "..."},
  -- ... 54 more lessons
]'::jsonb
WHERE goal = 'fat_loss';
```

### Dosing Calculator Component

```tsx
interface DosingCalculatorProps {
  vialSizeMg: number;
  waterMl: number;
  currentWeek: number;
}

function DosingCalculator({ vialSizeMg, waterMl, currentWeek }: DosingCalculatorProps) {
  // Calculate: (dose_mg / vial_mg) * water_ml * 100 = units
  const calculateUnits = (doseMg: number) => {
    return Math.round((doseMg / vialSizeMg) * waterMl * 100);
  };
  
  // Show units for each dose tier
  return (
    <div>
      <p>0.25mg = {calculateUnits(0.25)} units</p>
      <p>0.5mg = {calculateUnits(0.5)} units</p>
      <p>1.0mg = {calculateUnits(1.0)} units</p>
    </div>
  );
}
```

### Interactive Guide State

```tsx
// Store guide completion state
const [reconSteps, setReconSteps] = useState<boolean[]>([false, false, false, false, false, false]);

// Save to localStorage or database
useEffect(() => {
  localStorage.setItem('recon_progress', JSON.stringify(reconSteps));
}, [reconSteps]);
```

---

## Summary of Changes

| Priority | Change | Files |
|----------|--------|-------|
| 🔴 Critical | Seed 56 lessons per course | Database migration |
| 🔴 Critical | Ensure goal flows from quiz → preview → checkout → course creation | Verify existing flow works |
| 🟡 Important | Add dosing calculator | New component + MyPlan.tsx |
| 🟡 Important | Make guides interactive | MyPlan.tsx |
| 🟢 Enhancement | Add guide links to TodayLessonCard | TodayLessonCard.tsx |
| 🟢 Enhancement | Enhance milestones tracking | useMilestones.ts |

---

## Expected Outcome

After implementation:

1. **User completes quiz** → Answers stored
2. **Sees course preview** → Shows their peptide, schedule preview
3. **Pays $67** → Course created with their goal
4. **Welcome flow** → Supplies check, status saved
5. **Dashboard** → Day 0 ready with full 56 lessons
6. **My Plan** → Interactive guides, dosing calculator, peptide info
7. **AI Coach** → Knows their context, provides personalized answers
8. **Progress** → Milestones unlock as they complete actions


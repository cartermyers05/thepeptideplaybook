
# Fix Goal Cards to Link to Quiz (Demo Flow)

## Problem Summary

Currently, the "Pick Your Goal" cards on the landing page:
1. Say "Start Course" (implies immediate access)
2. Link directly to `/course/{goal}` (CoursePreview page)
3. Bypass the conversational quiz entirely
4. Show a purchase-ready preview without any personalization

This breaks the intended user journey:
- **Intended:** Landing → Quiz → Preview → Auth → Checkout
- **Current:** Landing → Preview → Checkout (broken, no auth)

---

## Solution Overview

Reframe the goal cards as the **entry point to the quiz**, not the course preview. When users click a goal, they should enter the quiz flow with that goal pre-selected.

---

## Changes Required

### 1. Update GoalSelectionSection.tsx

**File:** `src/components/landing/GoalSelectionSection.tsx`

| Current | Updated |
|---------|---------|
| Links to `/course/{goal}` | Links to `/quiz?goal={goal}` |
| "Start Course" text | "See Your Course" or "Preview" text |

```typescript
// Change from:
<Link to={`/course/${goal.id}`}>

// Change to:
<Link to={`/quiz?goal=${goal.id}`}>

// Change CTA text from:
<span>Start Course</span>

// Change to:
<span>See Your Course</span>
```

---

### 2. Update Quiz to Accept Pre-Selected Goal

**File:** `src/components/quiz/ConversationalQuiz.tsx`

Read the `goal` query parameter and:
- Skip the goal selection step if already provided
- Pre-fill the goal value
- Jump to experience level question

```typescript
// Read from URL params
const [searchParams] = useSearchParams();
const preSelectedGoal = searchParams.get('goal');

// If goal provided, skip to next step
useEffect(() => {
  if (preSelectedGoal) {
    // Set the goal value and advance to next question
    setExtractedValues(prev => ({ ...prev, goal: preSelectedGoal }));
    // Skip the goal question in the flow
  }
}, [preSelectedGoal]);
```

---

### 3. Update Section Copy (Optional Enhancement)

**File:** `src/components/landing/GoalSelectionSection.tsx`

Update the section description to reinforce the preview/demo nature:

```typescript
// Current:
<p>Choose what matters most to you, and we'll build your personalized course.</p>

// Updated:
<p>Choose what matters most to you. We'll show you exactly what your personalized course looks like.</p>
```

---

## Flow After Fix

```text
User clicks "Build Muscle" card
        ↓
/quiz?goal=muscle (goal pre-selected)
        ↓
Quiz asks: Experience level, concerns, timeline
        ↓
BuildingAnimation (shows "building" steps)
        ↓
/course/muscle (CoursePreview - now feels earned)
        ↓
"Get Your Course — $67" → Requires login → Checkout
```

---

## Technical Notes

- The quiz stores responses in localStorage for the preview page
- CoursePreview already handles the goal parameter correctly
- No backend changes needed
- The goal ID format matches between landing cards and quiz (`fat-loss`, `muscle`, etc.)

---

## Files to Modify

1. `src/components/landing/GoalSelectionSection.tsx` - Update links and CTA text
2. `src/components/quiz/ConversationalQuiz.tsx` - Accept pre-selected goal from URL

---

## Expected Outcome

- Goal cards feel like a preview/demo, not a purchase commitment
- Users go through personalization before seeing the course
- The "building your course" animation feels earned after answering questions
- Clear authentication gate before checkout

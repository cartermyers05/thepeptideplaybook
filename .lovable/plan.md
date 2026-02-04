
# End-to-End Post-Purchase Flow Audit

## Flow Verification Summary

I traced the complete user journey from quiz to dashboard and identified the following:

### Working Components
- **Quiz Flow**: Quiz → BuildingAnimation → navigates to `/course/{goal}` ✅
- **Course Preview**: Shows correct template data with peptides and duration ✅
- **Checkout Initiation**: CoursePreview passes `goal` to `create-checkout` edge function ✅
- **Stripe Session**: Includes `goal` in metadata ✅
- **Course Templates**: All 6 courses have full lesson content (42-60 days each) ✅
- **Dashboard Pages**: `Home.tsx`, `CourseLessons.tsx`, `MyPlan.tsx` all correctly use `useCourse()` hook ✅

### Issues Found

| Issue | Severity | Location | Impact |
|-------|----------|----------|--------|
| Promo codes don't create courses | High | `redeem-promo-code` | VIP users have no course after redemption |
| `/checkout` page missing goal | Medium | `Checkout.tsx` → `useCheckout.ts` | Users going directly to `/checkout` get "general" goal (no template) |
| QuizResults shows old pricing | Low | `QuizResults.tsx` | Shows "$29/mo" instead of "$67 one-time" |

---

## Issue 1: Promo Code Redemption Doesn't Create Course

**Current Behavior:**
- User enters promo code like `VIP2025`
- `redeem-promo-code` upgrades user to `tier: "insider"`
- User redirected to dashboard with **no course** assigned

**Impact:** VIP users see "No course found. Purchase a course to get started."

**Fix:** After upgrading tier, create a default course (beginner) or prompt user to select a goal:

```typescript
// In redeem-promo-code, after upgrading tier:
// Create a default beginner course for promo code users
const { data: template } = await supabaseAdmin
  .from("course_templates")
  .select("*")
  .eq("goal", "beginner")
  .single();

if (template) {
  await supabaseAdmin.from("user_courses").insert({
    user_id: userId,
    goal: "beginner",
    title: template.title,
    duration_days: template.duration_days,
    lessons: template.lessons,
    peptides: template.peptides,
    template_id: template.id,
    status: "not_started",
    purchased_at: new Date().toISOString(),
  });
}
```

---

## Issue 2: Direct /checkout Access Without Goal

**Current Behavior:**
- User navigates directly to `/checkout` (not through quiz flow)
- `Checkout.tsx` uses `useCheckout` which doesn't pass `goal`
- Edge function defaults to `goal: "general"` which has no template
- `verify-payment` falls back to `goal: "beginner"`

**Impact:** Minor - fallback works, but user may get beginner course when they wanted something else.

**The normal flow (quiz → course preview → checkout) works correctly** because CoursePreview passes the goal.

---

## Issue 3: QuizResults Shows Old Subscription Pricing

**Location:** `src/pages/QuizResults.tsx` line 308

Shows:
- "Unlock My Protocol – $29/mo"
- "Or $249/year (save 29%)"

Should show:
- "$67 one-time" (current pricing model)

---

## Database Verification

### User Courses Table
```
goal: muscle
lesson_count: 57 ✅
peptide_count: 2 ✅
template_id: linked ✅
status: not_started
```

### Course Templates (All Complete)
| Goal | Days | Lessons |
|------|------|---------|
| fat_loss | 56 | 57 ✅ |
| muscle | 56 | 57 ✅ |
| beginner | 42 | 43 ✅ |
| recovery | 42 | 43 ✅ |
| cognitive | 56 | 57 ✅ |
| anti_aging | 60 | 61 ✅ |

---

## Recommended Fixes (Priority Order)

### 1. Fix Promo Code to Create Course
- Update `redeem-promo-code` to create a beginner course after upgrading tier
- OR redirect user to quiz to pick their goal before going to dashboard

### 2. Update QuizResults Pricing
- Change "$29/mo" to "$67 one-time"
- Remove annual pricing reference
- Update CTA to link to `/course/{goal}` instead of `/signup`

### 3. Optional: Make /checkout Goal-Aware
- Store selected goal in localStorage during quiz
- Read from localStorage in `useCheckout` if goal not passed

---

## Launch Readiness

**For the PRIMARY flow (Quiz → Course Preview → Stripe → Dashboard):**
🟢 **READY** - This flow works correctly end-to-end.

**For PROMO CODE users:**
🔴 **BLOCKED** - They get no course assigned. Fix required before VIP access works.

**For DIRECT CHECKOUT users:**
🟡 **FALLBACK** - Gets beginner course (acceptable but not ideal).



# Fix Onboarding Flow to Match Desired User Journey

## Current vs Desired Flow

```text
CURRENT FLOW (broken):
Landing → /quiz (BLOCKED - needs payment) → /signup → /checkout → Stripe → /thank-you → /quiz → Dashboard

DESIRED FLOW:
Landing → /quiz (OPEN) → Building Animation → /course-preview → Auth (if needed) → Stripe → /thank-you → /welcome → /dashboard
```

---

## Summary of Changes

| Change | Description |
|--------|-------------|
| 1. Unprotect Quiz | Remove `ProtectedRoute` wrapper from `/quiz` |
| 2. Fix CoursePreview price | Change button text from "$99" to "$67" |
| 3. Fix BuildingAnimation redirect | Go to `/course-preview/:goal` instead of `/dashboard` |
| 4. Fix ThankYou redirect | Go to `/welcome` instead of `/quiz` |
| 5. Create /welcome route | Separate 3-step welcome page after payment |
| 6. Ensure course creation | Course is created in `verify-payment`, not quiz |
| 7. HeroSection CTA | Keep `/quiz` link (already correct) |

---

## Detailed Implementation

### 1. Unprotect the Quiz Route

**File:** `src/App.tsx`

Remove `ProtectedRoute` wrapper from quiz:

```tsx
// BEFORE
<Route path="/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />

// AFTER
<Route path="/quiz" element={<Quiz />} />
```

---

### 2. Fix CoursePreview Price

**File:** `src/pages/CoursePreview.tsx`

Update button text to match actual price ($67):

```tsx
// BEFORE (line 294)
"Get Your Course — $99"

// AFTER
"Get Your Course — $67"
```

---

### 3. Fix BuildingAnimation Redirect

**File:** `src/components/quiz/BuildingAnimation.tsx`

After quiz completion, redirect to course preview instead of dashboard:

```tsx
// BEFORE (line 62-65)
navigate("/dashboard", { replace: true });

// AFTER
const goal = extractedValues.goal?.replace('_', '-') || 'beginner';
navigate(`/course/${goal}`, { replace: true });
```

Also update the "Course Ready" messaging to be about preview, not dashboard.

---

### 4. Fix ThankYou Redirect

**File:** `src/pages/ThankYou.tsx`

After payment verification, redirect to `/welcome` instead of `/quiz`:

```tsx
// BEFORE (line 63-65)
setTimeout(() => {
  navigate("/quiz", { replace: true });
}, 2000);

// AFTER
setTimeout(() => {
  navigate("/welcome", { replace: true });
}, 2000);
```

Also update messaging from "build your personalized course" to "get started".

---

### 5. Create Welcome Page

**New file:** `src/pages/Welcome.tsx`

A dedicated 3-step welcome experience (celebration → supplies question → what's next):

- Step 1: Celebration with confetti-style animation
- Step 2: "Do you have your supplies?" with options
- Step 3: "Here's what's next" with CTA to dashboard

Uses existing `WelcomeModal` components but as a full page.

---

### 6. Add Welcome Route

**File:** `src/App.tsx`

Add the new protected welcome route:

```tsx
<Route path="/welcome" element={<ProtectedRoute><Welcome /></ProtectedRoute>} />
```

---

### 7. Update verify-payment Edge Function

**File:** `supabase/functions/verify-payment/index.ts`

Currently sets `status: 'pending_quiz'` but quiz already happened. Change to:

```tsx
// BEFORE
status: 'pending_quiz'

// AFTER  
status: 'not_started'
```

---

### 8. Update useQuizChat

**File:** `src/hooks/useQuizChat.ts`

Currently creates course/protocol on quiz save. Since payment hasn't happened yet at this point in the new flow, change this to:
- Save quiz responses to localStorage only (for course preview)
- Move actual course creation to after payment verification

OR keep the current behavior but ensure it handles the case where user hasn't paid yet (by using upsert logic that already exists).

---

### 9. Update Landing Page Price References

**Files to update:**
- `src/components/landing/HeroSection.tsx` - Change "$99" to "$67"
- `src/components/landing/PricingCTA.tsx` - Change "$99" to "$67"

---

## Technical Flow After Changes

```text
1. User clicks "Start Your Course" on landing page
   → Goes to /quiz (no auth required)

2. User completes 4-question AI chat
   → Quiz saves extractedValues to localStorage
   → Shows "Building your course..." animation (3-5 sec)

3. BuildingAnimation completes
   → Redirects to /course/[goal] (e.g., /course/fat-loss)

4. User sees CoursePreview with:
   - Their selected peptide + why
   - Curriculum outline
   - $67 price + guarantee
   
5. User clicks "Get My Course"
   → If not logged in: redirect to /login?redirect=/course/[goal]
   → If logged in: open Stripe checkout in new tab

6. After Stripe payment
   → Stripe redirects to /thank-you?session_id=xxx
   → verify-payment edge function:
     - Confirms payment
     - Creates user_courses record
     - Updates profile tier
     - Records purchase

7. ThankYou page
   → Redirects to /welcome after 2 seconds

8. Welcome page (3 steps)
   → Step 1: Celebration
   → Step 2: Supplies check
   → Step 3: What's next

9. User clicks final CTA
   → Goes to /dashboard ready for Day 0
```

---

## Summary

This plan restructures the flow so:
- **Quiz is accessible without payment** (removes friction)
- **Course preview shows personalized content** (builds desire)
- **Payment happens after personalization** (higher conversion)
- **Dedicated welcome experience after payment** (better UX)
- **Course data is properly created on payment verification** (data integrity)


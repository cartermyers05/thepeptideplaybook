
# Restructure Onboarding: Payment First, Then Build Course

## Current vs. Desired Flow

```text
CURRENT (Broken):
Landing → Quiz (pre-payment) → Building Animation → Email Collection → Course Preview → Payment → Dashboard

DESIRED (Clean):
Landing → Course Preview → Payment → Quiz/Build Course → Dashboard
```

## Overview

The "Build Your Peptide Course" AI conversation should happen **after payment**, not before. This creates a better experience because:
1. Users feel they're getting personalized value for their $99
2. The "building your course" animation feels earned after purchase
3. Email is already captured during signup/checkout, no need to ask again
4. No risk of the quiz "restarting" since it's a post-purchase one-time experience

---

## Key Changes

### 1. Remove `/quiz` from Pre-Payment Flow

**Current:** Landing page Goal cards → `/quiz` (conversational AI) → `/course/:goal`  
**New:** Landing page Goal cards → `/course/:goal` (direct)

The `/quiz` route will become a **post-payment** experience only.

---

### 2. Update Post-Payment Redirect Flow

**File: `src/pages/ThankYou.tsx`**

After successful payment verification, instead of showing "Start Exploring" button to dashboard, redirect users to the onboarding quiz:

```text
Payment verified → Redirect to /quiz (or /onboarding)
```

Changes:
- After `setVerificationState("success")`, auto-redirect to `/quiz` or show a "Build Your Course" CTA
- The quiz will now be personalization for paid users, not lead capture

---

### 3. Protect the Quiz Route (Post-Payment Only)

**File: `src/App.tsx`**

Move `/quiz` from public routes to protected routes:

```tsx
// Move from public:
<Route path="/quiz" element={<Quiz />} />

// To protected:
<Route path="/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
```

This ensures only authenticated + paid users can access the quiz.

---

### 4. Update Quiz Flow to Skip Email Collection

**File: `src/components/quiz/BuildingAnimation.tsx`**

Since users are now already authenticated and paid:
- Remove the email collection phase
- Skip directly from "building" animation to dashboard redirect
- Use the user's existing email from auth context

Changes:
- Remove `phase: 'email'` state
- After building animation completes, auto-redirect to dashboard
- No email input needed (user is already logged in)

**File: `src/hooks/useQuizChat.ts`**

Update `saveQuizResponse`:
- Remove email parameter (get from auth context)
- Remove newsletter checkbox (can be added to settings later)
- Simplify to just save quiz answers and redirect

---

### 5. Update ConversationalQuiz Redirect Destination

**File: `src/components/quiz/ConversationalQuiz.tsx`**

After quiz completion:
- Current: Redirects to `/course/:goal` (pre-purchase preview)
- New: Redirects to `/dashboard` (user's course dashboard)

```tsx
// Change from:
navigate(`/course/${coursePath}`);

// To:
navigate('/dashboard');
```

---

### 6. Update Course Creation Timing

The user_courses record needs to be created at payment time (in Stripe webhook or verify-payment), not during the quiz. The quiz should UPDATE the existing course with personalization data, not create a new one.

**File: `supabase/functions/verify-payment/index.ts`**

Ensure this creates a `user_courses` record when payment is verified, using the goal from the checkout session metadata.

**File: `src/hooks/useQuizChat.ts`**

Update `saveQuizResponse` to:
- Find the user's existing course (created at payment)
- Update it with the quiz personalization data (experience, concerns, timeline)

---

### 7. Handle "Quiz Not Complete" Edge Case

**File: `src/pages/dashboard/Home.tsx`**

Add logic to check if user has completed the quiz:
- If `user_courses` exists but quiz data is incomplete → prompt to finish quiz
- If quiz is complete → show normal dashboard

---

## File Summary

| File | Change |
|------|--------|
| `src/App.tsx` | Move `/quiz` to protected routes |
| `src/pages/ThankYou.tsx` | Redirect to `/quiz` after payment verification |
| `src/components/quiz/BuildingAnimation.tsx` | Remove email collection phase, auto-redirect to dashboard |
| `src/components/quiz/ConversationalQuiz.tsx` | Redirect to `/dashboard` instead of `/course/:goal` |
| `src/hooks/useQuizChat.ts` | Remove email param, use auth user, save to existing course |
| `src/components/landing/GoalSelectionSection.tsx` | Keep as-is (links to `/course/:goal` which is pre-purchase preview) |
| `src/pages/dashboard/Home.tsx` | Add check for incomplete quiz, prompt to complete |

---

## Visual Flow After Changes

```text
1. LANDING PAGE
   User clicks "Fat Loss" goal card
           ↓
2. COURSE PREVIEW (/course/fat-loss)
   Shows what's included, peptides, $99 price
   "Get Your Course" button → Stripe checkout
           ↓
3. STRIPE CHECKOUT
   User pays $99
           ↓
4. THANK YOU (/thank-you)
   Payment verified → Creates user_courses record
   Auto-redirect to /quiz
           ↓
5. BUILD YOUR COURSE (/quiz) [PROTECTED]
   AI conversation: "What's your experience level?"
   Collects: experience, concerns, timeline
   Shows building animation
   Saves personalization to user_courses
           ↓
6. DASHBOARD (/dashboard)
   "Welcome! Your Fat Loss Course is ready"
   Day 0: Getting started
```

---

## Technical Notes

- The quiz no longer creates quiz_responses or asks for email (user is authenticated)
- User courses are created at payment verification time with the goal from Stripe metadata
- The quiz becomes a "personalization" step that updates the existing course
- The `/quiz/results` page may become obsolete (was pre-purchase value stack)
- Consider renaming `/quiz` to `/onboarding` for clarity

---

## Summary

| Step | Files Modified |
|------|----------------|
| 1. Protect quiz route | `App.tsx` |
| 2. Redirect after payment | `ThankYou.tsx` |
| 3. Remove email from quiz | `BuildingAnimation.tsx`, `useQuizChat.ts` |
| 4. Update quiz destination | `ConversationalQuiz.tsx` |
| 5. Check quiz completion | `Home.tsx` (dashboard) |
| 6. Create course at payment | `verify-payment` edge function |

This restructure ensures the "Build Your Peptide Course" experience only happens once, after payment, creating a clean post-purchase onboarding flow.

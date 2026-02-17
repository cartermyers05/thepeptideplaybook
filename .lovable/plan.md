

# Remove Pre-Payment Quiz, Add Post-Payment Onboarding

## Overview

The quiz currently sits in the middle of the conversion funnel as a lead capture + personalization tool. We're removing it from the pre-payment flow entirely and replacing it with a streamlined post-payment onboarding that collects the same personalization data (goal, experience, concerns) after the user has already paid.

## What Changes

### 1. Update all "Take the Free Quiz" CTAs to go straight to checkout

Every landing page CTA currently points to `/quiz`. These all change to `/signup` (for new users) or `/checkout` (context-dependent). The main CTA text changes from "Take the Free Quiz" to something like "Get Your Blueprint" or "Start Now."

**Files affected:**
- `src/components/landing/HeroSection.tsx` -- Hero CTA
- `src/components/landing/PricingCTA.tsx` -- Pricing section CTA
- `src/components/landing/WhatsInsideSection.tsx` -- Bottom CTA
- `src/components/landing/GuidedDemo.tsx` -- Demo section CTA
- `src/components/landing/SolutionSection.tsx` -- Solution CTA
- `src/components/landing/GoalSelectionSection.tsx` -- Goal cards (these can link to `/signup` with a `?goal=` param to pre-select)
- `src/components/blog/BlogCTA.tsx` -- Blog CTA
- `src/components/chat/ChatWidget.tsx` -- Chat widget link
- `src/pages/tools/PeptideCalculator.tsx` -- Calculator CTA
- `src/components/landing/FloatingCTA.tsx` -- Floating bottom CTA (if it links to quiz)

### 2. Update post-payment redirect flow

Currently: ThankYou page --> Dashboard
New: ThankYou page --> `/welcome/onboarding` (new onboarding flow)

Also: Checkout promo code success currently goes to `/quiz` -- change to `/welcome/onboarding`

**Files affected:**
- `src/pages/ThankYou.tsx` -- Change redirect from `/dashboard` to `/welcome/onboarding`
- `src/pages/Checkout.tsx` -- Change promo success redirect from `/quiz` to `/welcome/onboarding`

### 3. Create post-payment onboarding page

New page at `/welcome/onboarding` that collects personalization data through a clean, step-by-step flow (not a chatbot -- just simple selection cards like the existing WelcomeStep2 pattern).

**Steps:**
1. **Goal selection** -- 6 goal cards (same as current quiz: Fat Loss, Build Muscle, Heal Injury, Anti-Aging, Cognitive, Not Sure)
2. **Experience level** -- 3 options (Never used peptides, Some research, Experienced)
3. **Main concern** -- What worries you most? (Injections, Side effects, Legal status, Cost, Nothing)
4. **Supplies status** -- Do you have supplies? (reuse existing WelcomeStep2 pattern)

On completion, saves to `quiz_responses` table (same schema) and redirects to `/dashboard/my-plan?updated=true`.

**New file:** `src/pages/Onboarding.tsx`

### 4. Add route and protect it

Add `/welcome/onboarding` as a protected route (requires auth + paid).

**File:** `src/App.tsx`

### 5. Remove quiz routes and pages (cleanup)

Remove the quiz-related routes from App.tsx. The quiz pages themselves can stay in the codebase for now (no harm), but the routes are removed so they're not accessible.

**Files affected:**
- `src/App.tsx` -- Remove `/quiz` and `/quiz/results` routes

### 6. Skip onboarding if already completed

The onboarding page checks if a `quiz_responses` record already exists for the user. If yes, redirect straight to `/dashboard`.

## What Stays the Same

- The `quiz_responses` database table -- same schema, same data
- The AI Coach's ability to read quiz responses for personalization
- The `useQuizResponse` hook -- still works exactly the same
- The My Plan page's "Blueprint Updated" banner
- All dashboard personalization based on quiz data

## Technical Details

### New Onboarding Page Structure

```
/welcome/onboarding (ProtectedRoute)
  Step 1: Goal Selection (6 cards with icons)
  Step 2: Experience Level (3 cards)
  Step 3: Main Concern (5 cards)
  Step 4: Supplies Status (3 cards, reuse WelcomeStep2 pattern)
  --> Save to quiz_responses
  --> Navigate to /dashboard/my-plan?updated=true
```

Each step is a simple card-tap interaction (no typing, no AI, no chatbot). Fast and friction-free since they've already paid.

### CTA Text Updates

| Location | Current | New |
|----------|---------|-----|
| Hero | "Take the Free Quiz" | "Get Started -- $67" |
| Pricing | "Get Your Blueprint" | "Get Your Blueprint" (no change needed) |
| Goal cards | Links to `/quiz?goal=X` | Links to `/signup?goal=X` |
| Blog CTA | "Take the Free Quiz" | "Get Your Blueprint" |
| Floating CTA | Quiz link | Signup/checkout link |

### Files Summary

| File | Action |
|------|--------|
| `src/pages/Onboarding.tsx` | CREATE -- New post-payment onboarding page |
| `src/App.tsx` | EDIT -- Remove quiz routes, add onboarding route |
| `src/pages/ThankYou.tsx` | EDIT -- Redirect to onboarding instead of dashboard |
| `src/pages/Checkout.tsx` | EDIT -- Promo success goes to onboarding |
| `src/components/landing/HeroSection.tsx` | EDIT -- CTA to signup |
| `src/components/landing/PricingCTA.tsx` | EDIT -- CTA to signup |
| `src/components/landing/WhatsInsideSection.tsx` | EDIT -- CTA to signup |
| `src/components/landing/GuidedDemo.tsx` | EDIT -- CTA to signup |
| `src/components/landing/SolutionSection.tsx` | EDIT -- CTA to signup |
| `src/components/landing/GoalSelectionSection.tsx` | EDIT -- Goal cards to signup |
| `src/components/blog/BlogCTA.tsx` | EDIT -- CTA to signup |
| `src/components/chat/ChatWidget.tsx` | EDIT -- Link to signup |
| `src/pages/tools/PeptideCalculator.tsx` | EDIT -- CTA to signup |



# Critical Fix: Stripe Checkout + check-subscription Mismatch + Flow Gaps

## The Root Problem

The `check-subscription` edge function searches for **active Stripe subscriptions**, but the product is a **one-time $67 payment** (mode: "payment"). A one-time payment never creates a subscription, so `check-subscription` will always return `subscribed: false` -- and **worse**, it actively resets the user's tier to "free" on every check (line 93-96 of check-subscription). This means:

1. User pays $67 (one-time)
2. `verify-payment` correctly sets `profiles.tier = "member"`
3. On next page load, `useTier` calls `check-subscription`
4. `check-subscription` finds no subscription, sets tier back to `"free"`
5. User is locked out of the dashboard they just paid for

This is the fundamental break. Everything downstream fails because of this.

## Fix Plan (4 changes)

### 1. Fix `check-subscription` edge function to support one-time purchases

The function currently only checks for active Stripe subscriptions. It needs to ALSO check:
- Whether `profiles.tier` is already "member" (set by verify-payment or promo codes)
- Whether there's a completed one-time payment in the `purchases` table
- Stop resetting tier to "free" when no subscription is found (one-time buyers lose access)

**Changes:**
- Before querying Stripe subscriptions, check the profile tier first -- if already "member", return `subscribed: true` immediately
- Also check the `purchases` table for a recorded payment
- Remove the destructive `tier: "free"` update when no subscription is found
- Only downgrade tier if the user has never made a one-time purchase AND has no active subscription

### 2. Fix `create-checkout` edge function -- use a real Stripe Price ID

The current function uses `price_data` (inline price) instead of a pre-created Stripe Price ID. This works technically but makes it harder to track in Stripe. More importantly, we need to verify the function actually deploys and executes correctly since there are zero logs.

**Changes:**
- Create a Stripe product + price ($67, one-time) using the Stripe tools
- Replace the `price_data` block with the real `price` ID
- Add the `quizGoal` field name fix (currently reads `quizGoal` from body but the CoursePreview sends `goal`)

### 3. Fix `useTier` hook -- handle one-time purchase tier correctly

The `useTier` hook maps "member" tier to "annual" (line 66), which works for `isPaid` but the naming is confusing. The real issue: `check-subscription` returns `subscribed: false` for one-time buyers, which makes the hook ignore the profile tier when it shouldn't.

**Changes:**
- Prioritize `profile.tier === "member"` as a paid state regardless of what `check-subscription` returns
- The subscription check should be additive (can upgrade from member to subscriber), never destructive

### 4. Fix the Quiz Results CTA link

Currently, QuizResults links to `/course/{goal}` (CoursePreview page), which opens Stripe in a **new tab** via `window.open`. The Checkout page (`/checkout`) opens Stripe in the **same tab** via `window.location.href`. These are two different checkout flows:

- `/quiz/results` CTA -> `/course/{goal}` -> new tab Stripe
- `/checkout` CTA -> same tab Stripe

Both should work, but the inconsistency and popup-blocker risk on the CoursePreview path is a problem. No changes needed here -- just documenting that both paths exist and both call `create-checkout`.

## File Changes Summary

| File | Change |
|------|--------|
| `supabase/functions/check-subscription/index.ts` | Check profile tier + purchases table before Stripe; stop resetting tier to free |
| `supabase/functions/create-checkout/index.ts` | Use real Stripe Price ID; fix body field name |
| `src/hooks/useTier.ts` | Prioritize profile tier for one-time purchase users |

## What This Fixes

- Users who pay $67 will retain "member" tier permanently
- `check-subscription` stops destroying one-time purchase access
- Stripe checkout creates sessions with a trackable Price ID
- The entire paid flow works: Quiz -> Results -> Signup -> Checkout -> Stripe -> Thank You -> Dashboard

## What This Does NOT Change

- No UI/layout changes
- No changes to the checkout page design (trust signals and FAQ already added)
- No changes to quiz, homepage, or dashboard pages
- No changes to verify-payment (it already works correctly)



# Bulletproof the Payment Verification Pipeline

## Root Cause Analysis

The logs confirm: when `assistant2je@aol.com` hit the thank-you page, `verify-payment` received **no session_id**. The fallback path checked `profiles.stripe_customer_id` but it was `null`, so it returned `verified: false` and the tier was never updated. Meanwhile the purchase WAS recorded (likely on a second attempt or via the `listUsers` email-lookup path), but the profile tier update failed silently due to the constraint issue we already fixed.

There are **three gaps** that let this happen:

1. **ThankYou page doesn't retry with session_id** -- if the initial call fails or auth is lost, it never re-attempts with the session_id after the user logs in
2. **verify-payment silently succeeds but doesn't update tier** -- when purchase is recorded but profile update fails (constraint error), the function still returns `verified: true`
3. **No retry/polling on the frontend** -- if verify-payment returns an error, the user sees a static error with no automatic recovery

## Changes

### 1. verify-payment: Add retry logic and error surfacing (backend)

**File:** `supabase/functions/verify-payment/index.ts`

- After inserting the purchase, verify the profile update actually succeeded by re-reading the profile
- If the profile update fails, retry once, then include `tier_update_failed: true` in the response so the frontend knows
- Log the exact constraint error so we catch similar issues early

### 2. ThankYou page: Retry verification after password/login (frontend)

**File:** `src/pages/ThankYou.tsx`

- When the user sets their password and logs in, re-call `verify-payment` WITH the `session_id` (not without it)
- Add a retry counter: if verification fails, auto-retry up to 3 times with a 2-second delay
- Store `session_id` in component state so it persists across re-renders

### 3. useTier: Client-side safety net (frontend)

**File:** `src/hooks/useTier.ts`

- Already calls `check-subscription` which has the auto-heal logic we added
- No changes needed here -- the auto-heal in `check-subscription` is the last line of defense

## Defense-in-Depth Summary

```text
Layer 1: verify-payment confirms tier update succeeded (not just attempted)
Layer 2: ThankYou page retries with session_id after login
Layer 3: check-subscription auto-heals on every dashboard load (already done)
```

## Files Modified

| File | Change |
|------|--------|
| `supabase/functions/verify-payment/index.ts` | Verify profile update succeeded; retry on failure; surface errors in response |
| `src/pages/ThankYou.tsx` | Re-verify with session_id after login; auto-retry up to 3 times on failure |



# Fix: Promo Code Redemption Flow

## Problem Identified
After entering a valid promo code during signup, users are still redirected to checkout because:

1. **Email confirmation blocks redemption**: When users sign up, Supabase requires email verification. This means there's no session immediately after signup (`signUpData.session` is `null`), so the promo code redemption never executes.

2. **Lost promo code context**: By the time the user confirms their email and logs in, the promo code information is lost (it was only stored in component state during signup).

3. **ProtectedRoute enforcement**: When the user navigates to `/dashboard`, the `ProtectedRoute` sees their tier is still "free" and redirects them to `/checkout`.

---

## Solution

Persist the promo code to localStorage before signup, then redeem it automatically when the user first logs in (after email confirmation).

### Step 1: Store Promo Code Before Signup
In `Signup.tsx`, save the valid promo code to localStorage before calling `supabase.auth.signUp()`.

### Step 2: Redeem on First Login
In the `useAuth.tsx` hook, after successful authentication:
- Check localStorage for a pending promo code
- If found, call `redeem-promo-code` Edge Function
- On success, clear the localStorage and refresh the profile data
- This ensures the promo code is redeemed regardless of whether the user signed up with email confirmation or not

### Step 3: Invalidate Profile Cache
After successful redemption, invalidate the React Query profile cache so `useTier` immediately reflects the updated tier.

---

## Technical Changes

| File | Change |
|------|--------|
| `src/pages/Signup.tsx` | Save promo code to localStorage before signup; simplify post-signup flow |
| `src/hooks/useAuth.tsx` | Add promo code redemption logic on `SIGNED_IN` event; invalidate profile cache |

---

## Flow After Fix

```text
1. User enters promo code → validated via Edge Function
2. User clicks "Create account" → promo code saved to localStorage
3. User receives confirmation email → clicks link
4. Auth state changes to SIGNED_IN → useAuth detects pending promo code
5. Promo code redeemed → profile updated to tier: "insider"
6. Profile cache invalidated → useTier returns isPaid: true
7. User proceeds to dashboard (not checkout)
```

---

## Edge Cases Handled

- **Already redeemed**: The `redeem-promo-code` function already checks if user has redeemed a code
- **Invalid/expired code**: Validation happens during signup; redemption failure won't break login
- **LocalStorage unavailable**: Graceful fallback (user goes to checkout as before)

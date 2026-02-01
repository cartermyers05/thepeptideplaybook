

# Fix: Promo Code Redemption Race Condition + Checkout Flow

## Problems Identified

### Problem 1: Promo Code Redemption Timing
The promo code is redeemed **after** the user is already redirected to checkout:

```text
Timeline:
1. Signup completes → Session created
2. Auth state changes → useAuth fires SIGNED_IN event  
3. useTier loads profile (tier: "free") 
4. ProtectedRoute sees isPaid=false → redirects to /checkout
5. redeemPendingPromoCode runs (in setTimeout with 100ms delay)
6. Profile updated to tier: "insider" → but user is already on /checkout
```

**Root cause**: The `setTimeout(() => redeemPendingPromoCode(), 100)` runs asynchronously and doesn't block the tier check. By the time it completes, React Query has already cached the profile with `tier: "free"`.

### Problem 2: Checkout Page Doesn't Check Tier
The `/checkout` page immediately starts the Stripe checkout without first checking if the user should skip checkout (e.g., promo code was just redeemed).

---

## Solution

### Step 1: Make Promo Code Redemption Awaitable
Convert `redeemPendingPromoCode` to return a Promise and track redemption state so components can wait for it to complete.

### Step 2: Add Checkout Page Tier Check
Before starting checkout, verify the user's tier. If they're already paid (from promo code), redirect to dashboard instead.

### Step 3: Ensure Profile Refetch After Redemption
After redemption succeeds, explicitly refetch the profile before any navigation decisions are made.

---

## Technical Changes

| File | Change |
|------|--------|
| `src/hooks/useAuth.tsx` | Track promo redemption status; await redemption before proceeding |
| `src/pages/Checkout.tsx` | Check tier status before initiating checkout; redirect to dashboard if already paid |
| `src/components/auth/ProtectedRoute.tsx` | Wait for pending promo code redemption before making routing decisions |

---

## Implementation Details

### useAuth.tsx Changes
- Add a state to track if promo code redemption is pending
- Await the redemption and ensure profile cache is invalidated **before** allowing navigation
- Export a flag indicating redemption is in progress

### Checkout.tsx Changes
- Import `useTier` hook
- Before calling `startCheckout`, check if `isPaid` is true
- If already paid, redirect to `/dashboard` instead of Stripe

### ProtectedRoute.tsx Changes  
- Check for pending promo code in localStorage
- If found, show loading state while redemption completes
- Only redirect to checkout after confirming tier is still "free"

---

## Expected Flow After Fix

```text
1. User enters promo code → validated during signup
2. User creates account → promo code saved to localStorage
3. Auth state changes (SIGNED_IN)
4. ProtectedRoute detects pending promo code → shows loading
5. redeemPendingPromoCode runs → awaited
6. Profile updated to tier: "insider"
7. Profile cache invalidated → useTier refetches
8. useTier returns isPaid: true
9. ProtectedRoute allows access → user proceeds to dashboard
```

---

## Backup Check in Checkout Page

Even if the ProtectedRoute fix misses the timing, the Checkout page will:
1. Check `useTier` for current payment status
2. If `isPaid: true`, navigate to `/dashboard` immediately
3. If `isPaid: false`, proceed with Stripe checkout


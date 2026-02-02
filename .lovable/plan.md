
# Enable Billing: Complete Payment Flow Implementation

## Overview

This plan re-enables the $67 one-time payment requirement and ensures all user flows work correctly. The billing system infrastructure already exists (Stripe integration, edge functions, thank-you page verification), but it was disabled by hardcoding `isPaid = true` and bypassing checkout redirects.

---

## Current State Analysis

### What's Currently Broken (Billing Disabled)

| File | Issue |
|------|-------|
| `src/hooks/useTier.ts` | Line 13: `isPaid = true` hardcoded for all users |
| `src/components/auth/ProtectedRoute.tsx` | Line 31: Only checks auth, doesn't redirect unpaid users to checkout |
| `src/pages/Checkout.tsx` | Lines 69-76: Immediately redirects authenticated users to dashboard |
| `src/pages/Signup.tsx` | Line 82-84: Always navigates to dashboard after signup |
| Landing page components | Show "Free" pricing instead of "$67" |
| `src/pages/Pricing.tsx` | Displays "Free" instead of $67 pricing |

### What Already Works

- `create-checkout` edge function: Creates Stripe sessions correctly
- `verify-payment` edge function: Verifies payment and updates tier to "member"
- `ThankYou.tsx`: Handles verification flow properly
- `useCheckout.ts` hook: Redirects to Stripe correctly
- Promo code system: Works for VIP access bypass
- Profile tier tracking: Database has `tier` column

---

## Implementation Plan

### Phase 1: Core Billing Logic (3 files)

#### 1.1 Fix `useTier.ts`

**Current (broken):**
```typescript
// Free access for everyone - billing disabled
const isPaid = true;
```

**Fixed:**
```typescript
// User is paid if tier is anything other than "free"
const isPaid = rawTier !== "free" && rawTier !== null;
```

#### 1.2 Fix `ProtectedRoute.tsx`

**Current (broken):**
```typescript
// Billing disabled - just require authentication
return <>{children}</>;
```

**Fixed:**
```typescript
// Not paid → go to checkout
if (!isPaid) {
  return <Navigate to="/checkout" replace />;
}

return <>{children}</>;
```

#### 1.3 Fix `Checkout.tsx`

**Remove this block (lines 69-76):**
```typescript
useEffect(() => {
  // Billing disabled - redirect authenticated users straight to dashboard
  if (authLoading) return;
  
  if (user) {
    navigate("/dashboard", { replace: true });
  }
}, [authLoading, user, navigate]);
```

**Replace with proper checkout trigger:**
```typescript
useEffect(() => {
  // If user is authenticated and not paid, start checkout
  if (authLoading || tierLoading) return;
  
  if (user && !isPaid && !hasStartedRef.current && !promoApplied) {
    hasStartedRef.current = true;
    startCheckout();
  }
}, [authLoading, tierLoading, user, isPaid, startCheckout, promoApplied]);
```

**Update UI copy:**
- Change "Free Access" to "Complete Access"
- Change "No payment required" to "One-time payment: $67"
- Add a visible "Pay $67" button as fallback

---

### Phase 2: Signup Flow Fix (1 file)

#### 2.1 Fix `Signup.tsx`

**Current (broken):**
```typescript
const handleContinue = () => {
  // Billing disabled - always go to dashboard
  navigate("/dashboard");
};
```

**Fixed:**
```typescript
const handleContinue = () => {
  // Check if user has valid promo code or needs to pay
  if (validPromoCode && promoCodeType === "free_access") {
    navigate("/dashboard");
  } else {
    navigate("/checkout");
  }
};
```

**Update welcome message:**
- Current: "Your account is ready. You have full access to everything!"
- Fixed: "Your account is ready. Complete checkout to unlock full access."

---

### Phase 3: Landing Page Pricing Updates (5 files)

#### 3.1 `HeroSection.tsx`

**Update trust items (line 8-11):**
```typescript
const trustItems = [
  { icon: Users, text: "4,200+ researchers" },
  { icon: Shield, text: "30-day guarantee" },
  { icon: CreditCard, text: "$67 one-time" },
];
```

**Update CTA button text:**
- Change "Try It Free Now" to "Get Full Access"

#### 3.2 `PricingCTA.tsx`

**Update pricing display:**
```typescript
<div className="flex items-baseline gap-2">
  <span className="text-5xl font-bold text-gradient">$67</span>
  <span className="text-muted-foreground line-through">$197</span>
</div>
<p className="text-sm text-muted-foreground mt-2">
  One-time payment. Lifetime access.
</p>
```

**Update button:**
- Change "Create Free Account" to "Get Full Access"

**Update bottom text:**
- Change "No credit card required" to "30-day money-back guarantee"

#### 3.3 `Navbar.tsx`

**Update CTA button:**
- Change "Try Free" to "Get Access"

#### 3.4 `FloatingCTA.tsx`

**Update button:**
- Change "Try Free" to "Get Access"

#### 3.5 `Pricing.tsx`

**Full page update:**
- Change "Free" to "$67"
- Update copy to match paid offering
- Route button to `/checkout` instead of `/signup`

---

### Phase 4: FAQ Updates (2 files)

#### 4.1 `FAQ.tsx` (landing page)

**Update FAQ item 4:**
```typescript
{
  question: "Is this a subscription?",
  answer: "No. You pay once ($67) and get lifetime access to everything, including all future updates. No recurring charges ever.",
}
```

#### 4.2 `Pricing.tsx` FAQ section

Same update as above.

---

### Phase 5: UpgradePrompt Component Update

#### 5.1 `UpgradePrompt.tsx`

**Update copy:**
```typescript
<p className="text-muted-foreground max-w-md mb-8">
  Get full access to {feature.toLowerCase()} and all other features for just $67.
</p>

<Button asChild size="lg" className="btn-primary-clean">
  <Link to="/checkout">
    Unlock for $67
  </Link>
</Button>
```

---

## Complete File Changes Summary

| File | Change Type | Key Changes |
|------|-------------|-------------|
| `src/hooks/useTier.ts` | Logic fix | `isPaid` based on actual tier |
| `src/components/auth/ProtectedRoute.tsx` | Logic fix | Redirect unpaid to `/checkout` |
| `src/pages/Checkout.tsx` | Logic + UI | Auto-trigger checkout, update copy |
| `src/pages/Signup.tsx` | Logic + UI | Route to checkout if no promo |
| `src/components/landing/HeroSection.tsx` | Copy | $67 pricing, updated CTAs |
| `src/components/landing/PricingCTA.tsx` | Copy | $67 pricing, updated CTAs |
| `src/components/landing/Navbar.tsx` | Copy | "Get Access" CTA |
| `src/components/landing/FloatingCTA.tsx` | Copy | "Get Access" CTA |
| `src/components/landing/FAQ.tsx` | Copy | Subscription answer update |
| `src/pages/Pricing.tsx` | Full update | $67 pricing throughout |
| `src/components/dashboard/UpgradePrompt.tsx` | Copy | $67 unlock message |

---

## User Flow Testing Scenarios

### Scenario 1: New User (No Promo Code)
1. User lands on homepage → sees $67 pricing
2. Clicks "Get Full Access" → goes to `/signup`
3. Creates account → redirected to `/checkout`
4. Sees Stripe checkout → pays $67
5. Redirected to `/thank-you?session_id=xxx`
6. Payment verified → tier updated to "member"
7. Clicks "Start Exploring" → dashboard loads normally

### Scenario 2: New User (With Promo Code)
1. User lands on `/signup?code=VIPCODE`
2. Enters promo code → validated
3. Creates account → promo saved to localStorage
4. Auth confirms → promo redeemed automatically
5. Tier updated to "member" → dashboard accessible

### Scenario 3: Existing Free User
1. Logs in → goes to dashboard
2. ProtectedRoute sees `isPaid = false`
3. Redirected to `/checkout`
4. Can enter promo code or pay $67
5. After payment → full access

### Scenario 4: Existing Paid User
1. Logs in → dashboard loads normally
2. No checkout redirect
3. Full feature access

### Scenario 5: Checkout Cancel
1. User at Stripe → clicks "back"
2. Returns to `/pricing` (cancel URL)
3. Can try again

### Scenario 6: Payment Verification Failure
1. User completes payment
2. Redirected to `/thank-you`
3. If verification fails → shows retry button
4. Backup verification runs on next login

---

## Edge Cases Handled

| Edge Case | Solution |
|-----------|----------|
| User refreshes during checkout | `hasStartedRef` prevents duplicate sessions |
| Promo code entered during signup | Saved to localStorage, redeemed after auth |
| Email confirmation required | Promo code persists in localStorage |
| Payment succeeds but verification fails | Backup check on login (useAuth) |
| User already has Stripe customer | create-checkout reuses customer ID |
| Multiple browser tabs | `isProcessingRef` prevents race conditions |

---

## Testing Checklist

After implementation, verify:

- [ ] Homepage shows $67 pricing
- [ ] New signup → redirects to checkout
- [ ] Promo code bypass works during signup
- [ ] Promo code bypass works on checkout page
- [ ] Stripe checkout creates session correctly
- [ ] Payment success → thank-you page verifies
- [ ] Verified user can access dashboard
- [ ] Unpaid user gets redirected to checkout
- [ ] Cancel button returns to pricing page
- [ ] Mobile flows work correctly
- [ ] All CTAs route to correct pages
- [ ] FAQ mentions $67 pricing correctly

---

## Stripe Configuration Check

The existing setup uses:
- Price ID: `price_1SuiuLKivWYlZk5KLQmOGU1S` ($67 one-time)
- Success URL: `/thank-you?session_id={CHECKOUT_SESSION_ID}`
- Cancel URL: `/pricing`
- Metadata: `tier: "member"`, `user_id: user.id`

No changes needed to edge functions.

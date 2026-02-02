

# Disable Billing & Make Product Free

## Overview

You want to remove the paywall and let everyone access the product for free. This involves modifying the access control logic so authenticated users can use all features without payment verification.

---

## Changes Required

### Core Access Control (Most Important)

| File | Change |
|------|--------|
| `src/hooks/useTier.ts` | Always return `isPaid: true` regardless of database tier |
| `src/components/auth/ProtectedRoute.tsx` | Remove the checkout redirect for non-paying users |

### UI Updates (Hide Payment References)

| File | Change |
|------|--------|
| `src/pages/Checkout.tsx` | Redirect to dashboard instead of showing payment UI |
| `src/pages/Pricing.tsx` | Update messaging to reflect free access |
| `src/components/landing/PricingCTA.tsx` | Change "$67" to "Free" and update CTA text |
| `src/components/dashboard/UpgradePrompt.tsx` | This will no longer be shown, but can leave as-is |
| `src/components/dashboard/WelcomeBanner.tsx` | Remove "Upgrade" CTA for free users |
| `src/pages/dashboard/Settings.tsx` | Update tier display text |

---

## Technical Details

### 1. useTier.ts - Force Free Access

```typescript
// Before
const isPaid = currentTier === "member";

// After  
const isPaid = true; // Free access for everyone
```

### 2. ProtectedRoute.tsx - Remove Payment Check

```typescript
// Before
if (!isPaid) {
  return <Navigate to="/checkout" replace />;
}

// After
// Remove this check entirely - just require authentication
```

### 3. Checkout.tsx - Redirect to Dashboard

```typescript
// Immediately redirect logged-in users to dashboard
useEffect(() => {
  if (user && !authLoading) {
    navigate("/dashboard", { replace: true });
  }
}, [user, authLoading]);
```

### 4. Landing Page Pricing Updates

- Change "$67" → "Free"
- Change "Get Instant Access" → "Get Free Access"
- Change "one-time payment" → "No payment required"
- Keep the feature list to show value

---

## What This Preserves

- **Authentication still required** - Users must sign up/log in
- **Promo code system** - Still works (just not needed)
- **Stripe integration** - Remains in codebase for future reactivation
- **User profiles & tiers** - Database structure unchanged
- **All features** - AI chat, database, digest, checklist all work

---

## Easy to Revert

When you're ready to re-enable billing:
1. Revert `useTier.ts` to check actual tier
2. Restore `ProtectedRoute.tsx` checkout redirect
3. Update pricing copy back to $67

---

## Expected User Flow After Changes

```text
Before:
Landing → Signup → Checkout ($67) → Pay → Dashboard

After:
Landing → Signup → Dashboard (instant access)
```


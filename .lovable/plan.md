
# Fix Checkout Page Display Issue

## Problem Analysis

The screenshot shows a skeleton/loading UI. Based on my investigation:

1. **What the screenshot shows**: This is **Stripe's hosted checkout page** loading with its skeleton placeholders - a two-column layout with gray boxes. This is normal Stripe behavior while their payment form loads.

2. **Why you might not see our checkout page**: The `/checkout` page auto-redirects to Stripe immediately when an authenticated user arrives. The flow is:
   - Page loads → checks auth & tier status (loading state shown)
   - Once loaded, `useEffect` triggers `startCheckout()` automatically
   - Browser redirects to Stripe before you see the actual checkout content

3. **The code is correct**: The pricing updates ARE in the code (lines 140-144):
   ```typescript
   <p className="text-xs text-primary font-medium mb-1">Early Access Pricing</p>
   <h1 className="text-xl font-semibold mb-1">Complete Your Purchase</h1>
   <p className="text-sm text-muted-foreground">
     One-time payment: <span className="line-through opacity-60">$99</span> $67
   </p>
   ```

## Potential Fixes

### Option A: Stop Auto-Redirect (Show Checkout Page First)

Currently the page auto-redirects authenticated users to Stripe. We could change this to:
- Show the checkout page content with pricing
- Require user to click "Pay $67" button to redirect to Stripe

**Change in `src/pages/Checkout.tsx`:**
- Remove the auto-redirect in `useEffect` (lines 79-83)
- Keep only the manual button trigger

This would let users see the pricing/early access messaging before going to Stripe.

### Option B: Keep Auto-Redirect (Current Behavior)

If the skeleton is Stripe's page loading - this is expected and not something we control. The Stripe checkout should fully load within 1-3 seconds normally.

---

## My Recommendation

**Option A** - Remove the auto-redirect so users can see the checkout page with:
- "Early Access Pricing" label
- "$67" price with "$99" strikethrough
- "Pay $67 — Get Full Access" button
- Promo code input
- Trust elements

This makes the pricing clear before they go to Stripe and gives them the option to enter a promo code first.

---

## Files to Modify

**`src/pages/Checkout.tsx`** - Remove the auto-`startCheckout()` call from useEffect so users must click the button to proceed.

```typescript
// Remove lines 79-83:
// Authenticated but not paid → trigger checkout
if (user && !isPaid && !hasStartedRef.current && !promoApplied && !isRedeeming) {
  hasStartedRef.current = true;
  startCheckout();
}
```

This way:
1. User arrives at `/checkout`
2. Sees the full checkout page with early access pricing
3. Can enter promo code OR click "Pay $67" to go to Stripe
4. Stripe redirect only happens on button click

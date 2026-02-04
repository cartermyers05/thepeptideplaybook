

# Fix Checkout Button Not Working

## Problem

The "Pay $67 — Get Full Access" button doesn't work because:

1. **Ref blocks clicks**: When the page loads, the `useEffect` sets `hasStartedRef.current = true` before calling `startCheckout()`. The button's `onClick` handler then checks `if (!hasStartedRef.current)` which is now `true`, so clicking does nothing.

2. **useCheckout also blocked**: The `isProcessingRef.current` in the hook is set to `true` and never reset if the checkout fails or the user navigates back.

Additionally, there's a **price mismatch**: the UI shows "$67" but the edge function charges "$99" (unit_amount: 9900).

---

## Solution

### 1. Fix Checkout.tsx Button Logic

**File:** `src/pages/Checkout.tsx`

Remove the ref check from the button's onClick handler. The button should always allow starting checkout:

```tsx
// BEFORE (broken)
onClick={() => {
  if (!hasStartedRef.current) {
    hasStartedRef.current = true;
    startCheckout();
  }
}}

// AFTER (fixed)
onClick={() => {
  startCheckout();
}}
```

### 2. Fix useCheckout Hook to Allow Retries

**File:** `src/hooks/useCheckout.ts`

Reset `isProcessingRef` when the hook is called again, or remove the blocking logic that prevents retries:

```tsx
const startCheckout = useCallback(async (plan: Plan = "monthly") => {
  // Only block if we're currently redirecting to Stripe
  if (redirectingRef.current) return;
  
  // Allow retry if not currently processing
  if (isProcessingRef.current && isLoading) return;
  
  isProcessingRef.current = true;
  setIsLoading(true);
  
  // ... rest of the function
```

### 3. Fix Price Mismatch

**File:** `supabase/functions/create-checkout/index.ts`

Update the price to match the UI ($67 = 6700 cents):

```tsx
// BEFORE
unit_amount: 9900, // $99.00

// AFTER
unit_amount: 6700, // $67.00
```

---

## Summary of Changes

| File | Change |
|------|--------|
| `src/pages/Checkout.tsx` | Remove ref check from button onClick |
| `src/hooks/useCheckout.ts` | Allow retrying checkout after failed attempt |
| `supabase/functions/create-checkout/index.ts` | Fix price from $99 to $67 |


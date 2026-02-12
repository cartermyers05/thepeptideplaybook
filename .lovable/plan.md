
# Fix Stripe Checkout Flow

## Problems Found

### Backend (`create-checkout/index.ts`)
1. **Wrong mode**: Set to `"subscription"` with `recurring.interval: 'month'` at $29/month -- should be `"payment"` (one-time) at $67
2. **Wrong price**: `unit_amount: 2900` ($29) instead of `6700` ($67)
3. **Wrong success URL**: Points to `/dashboard?subscription=success` instead of `/thank-you?session_id={CHECKOUT_SESSION_ID}`
4. **Unnecessary subscription_data**: Includes `subscription_data` block that doesn't apply to one-time payments
5. **Ignores frontend body params**: The function never reads the request body (`plan`, `goal`, `successUrl`, `cancelUrl`) -- it hardcodes everything

### Frontend (`useCheckout.ts`)
6. **Sends unused params**: Passes `plan`, `goal`, `successUrl`, `cancelUrl` that the backend ignores
7. **Plan type is wrong**: Typed as `"monthly" | "annual"` -- should be irrelevant for one-time payment

### Frontend (`Checkout.tsx`)
8. **No error display**: Errors only show as toasts (easy to miss), no inline error text below the button
9. **Otherwise OK**: Button uses `window.location.href` (same tab) and has loading/disabled states via `isLoading`

## Changes

### 1. Rewrite `supabase/functions/create-checkout/index.ts`
- Change `mode` from `"subscription"` to `"payment"`
- Change `unit_amount` from `2900` to `6700`
- Update product name to "Peptide Blueprint -- Lifetime Access"
- Set `success_url` to use origin + `/thank-you?session_id={CHECKOUT_SESSION_ID}`
- Set `cancel_url` to origin + `/checkout`
- Remove `recurring` block and `subscription_data`
- Read `quizGoal` from request body and store in session metadata
- Add `allow_promotion_codes: true`
- Keep existing auth flow (Supabase user lookup, Stripe customer creation/reuse)

### 2. Simplify `src/hooks/useCheckout.ts`
- Remove `Plan` type (no longer needed for one-time payment)
- Pass user email and quiz goal from localStorage to the edge function
- Keep `window.location.href` redirect (same tab, correct)
- Keep double-click protection and error handling

### 3. Minor update to `src/pages/Checkout.tsx`
- Add inline error state that shows error text in red below the button (in addition to toast)
- Update `startCheckout()` call (no plan argument needed)

### 4. No changes needed to:
- `ThankYou.tsx` (already reads `session_id` from URL params and calls `verify-payment`)
- `supabase/config.toml` (already has `verify_jwt = false` for create-checkout)
- Environment variables (`STRIPE_SECRET_KEY` is already configured)
- Any page layouts or designs

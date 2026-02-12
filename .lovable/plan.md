

# Fix Post-Payment Flow

## Problems Found

1. **Metadata key mismatch**: `create-checkout` stores `quiz_goal` in Stripe metadata, but `verify-payment` reads `session.metadata?.goal` — the goal is never found, defaulting to "beginner" every time
2. **ThankYou page hangs if not logged in**: If the auth session is lost (rare but possible), the page shows "verifying" forever with no escape
3. **Wrong success copy**: Shows "Payment Confirmed!" instead of "Welcome to Peptide Playbook!" and "Your personalized blueprint is ready."
4. **Redirects to /welcome**: Should redirect to `/dashboard` after 5 seconds
5. **No password-set flow for unauthenticated users**: If somehow a user lands on /thank-you without being logged in, there's no way to set a password and access the dashboard

## Changes

### 1. Fix `verify-payment` metadata key (`supabase/functions/verify-payment/index.ts`)
- Change `session.metadata?.goal` to `session.metadata?.quiz_goal` (line 198) to match what `create-checkout` stores
- Also support unauthenticated verification: if no auth header, verify payment by session alone, return email so the frontend can help the user log in
- Keep all existing logic (idempotency, referral completion, course creation, tier update)

### 2. Update `ThankYou.tsx` (`src/pages/ThankYou.tsx`)
- **If user is logged in**: Call verify-payment as before, on success show:
  - "Welcome to Peptide Playbook!"
  - "Your personalized blueprint is ready."
  - "Go to My Dashboard" button
  - Auto-redirect to `/dashboard` after 5 seconds
- **If user is NOT logged in** (session expired/lost):
  - Still call verify-payment without auth to confirm payment is valid
  - On success, show email from Stripe session + "Set your password" form (just password field)
  - On password set, sign the user in and redirect to `/dashboard`
- **If no session_id**: Show current "Looking for Something?" state (no change)

### 3. No changes to:
- `create-checkout/index.ts` (already fixed in previous prompt)
- `ProtectedRoute.tsx` (already correctly gates dashboard)
- `useTier.ts` (correctly treats "member" as paid)
- `Checkout.tsx` (no changes requested)
- Any page layouts or designs
- Navigation or other pages

## Technical Details

### verify-payment changes
```text
Line 32-35: Make auth optional instead of required
- If auth header present: authenticate user as before
- If no auth header: proceed without user context, verify session only
Line 164: Remove user_id mismatch check when no authenticated user
Line 198: Change session.metadata?.goal to session.metadata?.quiz_goal
Line 290: Return email from Stripe session in response
```

### ThankYou.tsx changes
- Add new state: `stripeEmail` (string from verify response)
- Add new state: `needsPassword` (boolean)
- Add password form with single field + submit button
- On form submit: call `supabase.auth.signInWithPassword({ email, password })` or `supabase.auth.updateUser({ password })` depending on whether user exists
- On success: redirect to `/dashboard`
- Update success copy text
- Change auto-redirect target from `/welcome` to `/dashboard`


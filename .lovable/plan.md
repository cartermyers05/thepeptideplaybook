

# Webhook-less Payment Verification Implementation

## Overview

Replace the current `stripe-webhook` approach with a cleaner, more secure `verify-payment` Edge Function that gets called when users land on the success page. This eliminates the critical security vulnerability and simplifies the payment flow.

---

## Current Flow (Problematic)

```text
User → Checkout → Stripe → /thank-you → (hope webhook fires) → tier updated
                    ↓
              Webhook (insecure fallback allows spoofing)
```

## New Flow (Secure)

```text
User → Checkout → Stripe → /thank-you?session_id=xxx → verify-payment → tier updated
                                                             ↓
                                                   Direct Stripe API check
```

---

## Implementation Steps

### Step 1: Create `verify-payment` Edge Function

Create `supabase/functions/verify-payment/index.ts`:

**Logic:**
1. Receive `session_id` from request body
2. Validate user is authenticated (JWT)
3. Call Stripe API to retrieve the checkout session
4. Verify payment_status is "paid"
5. Verify the session's user_id metadata matches authenticated user
6. Update profiles table to set tier = "member"
7. Record purchase in purchases table (if not already recorded)
8. Return success/failure status

**Security features:**
- Requires valid JWT (user must be logged in)
- Verifies payment directly with Stripe (no spoofing possible)
- Checks metadata matches to prevent cross-user attacks
- Idempotent (can be called multiple times safely)

---

### Step 2: Update ThankYou Page

Modify `src/pages/ThankYou.tsx`:

**Changes:**
1. Extract `session_id` from URL query params
2. Call `verify-payment` Edge Function on mount
3. Show loading state during verification
4. Handle success → show current UI
5. Handle failure → show error with retry option
6. Invalidate profile query to refresh tier status

---

### Step 3: Add Backup Tier Check on Login

Modify `src/hooks/useAuth.tsx`:

**Changes:**
1. After successful auth state change (login/signup)
2. Check if user has `stripe_customer_id` in profile
3. If yes, call `verify-payment` with empty session_id to trigger a Stripe customer payment check
4. This catches edge cases where verification failed on thank-you page

---

### Step 4: Delete stripe-webhook Function

Remove the entire `supabase/functions/stripe-webhook/` directory and update `supabase/config.toml` to remove webhook configuration.

---

## Technical Details

### verify-payment Edge Function Code Structure

```typescript
// supabase/functions/verify-payment/index.ts

// 1. CORS headers
// 2. Auth validation
// 3. Get session_id from body
// 4. Retrieve checkout session from Stripe
// 5. Verify payment_status === "paid"
// 6. Verify metadata.user_id matches auth user
// 7. Check if purchase already recorded (idempotency)
// 8. Update profile tier to "member"
// 9. Insert purchase record
// 10. Return success
```

### ThankYou Page Changes

```typescript
// Extract session_id
const searchParams = new URLSearchParams(location.search);
const sessionId = searchParams.get('session_id');

// Verify payment on mount
useEffect(() => {
  if (sessionId) {
    verifyPayment(sessionId);
  }
}, [sessionId]);

// Show appropriate UI based on verification state
```

### Config.toml Updates

```toml
# Add new function
[functions.verify-payment]
verify_jwt = false

# Remove stripe-webhook entry
```

---

## Files to Create/Modify

| File | Action |
|------|--------|
| `supabase/functions/verify-payment/index.ts` | Create |
| `src/pages/ThankYou.tsx` | Modify |
| `src/hooks/useAuth.tsx` | Modify (add backup check) |
| `supabase/config.toml` | Modify (add verify-payment) |
| `supabase/functions/stripe-webhook/index.ts` | Delete |

---

## Benefits

1. **No webhook secret needed** - Eliminates critical security vulnerability
2. **Direct verification** - Can't be spoofed (calls Stripe API directly)
3. **Simpler infrastructure** - No need to configure webhook endpoints
4. **Better UX** - User sees immediate confirmation
5. **Idempotent** - Safe to retry if initial verification fails
6. **Backup verification** - Login-time check catches edge cases


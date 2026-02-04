
# Skip Email Confirmation - Direct Signup to Checkout Flow

## Goal
After signup, users should be logged in immediately and redirected to checkout - no email confirmation required.

## Changes Required

### 1. Enable Auto-Confirm Emails
Use the configure-auth tool to enable automatic email confirmation. This makes users authenticated immediately after signup.

### 2. Update Signup Page (`src/pages/Signup.tsx`)
- After successful `signUp()`, redirect directly to checkout using `useNavigate`
- Remove Step 3 ("Check your email" screen) entirely since it's no longer needed
- Remove the `handleResendEmail` function
- Simplify the steps array to just 2 steps (Email, Account)
- Remove unused imports (`RefreshCw`)

### 3. Simplify Auth Hook (`src/hooks/useAuth.tsx`)  
- Remove `handlePostSignupRedirect` function since users now navigate directly
- Remove `redirectHandledRef` since it's no longer needed
- Remove `post_signup_redirect` localStorage handling

## Expected User Flow After Fix

```text
Sign Up (Email) → Sign Up (Account Details) → Checkout ($67) → Onboarding
```

1. User enters email (Step 1)
2. User enters name/password (Step 2)
3. User is immediately logged in and redirected to `/checkout`
4. User pays $67 via Stripe
5. User goes through onboarding flow

## Files to Modify

1. **Authentication settings** - Enable auto-confirm emails
2. **`src/pages/Signup.tsx`** - Remove Step 3, add direct navigation to checkout
3. **`src/hooks/useAuth.tsx`** - Remove post-signup redirect handling (cleanup)

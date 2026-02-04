

# Fix Signup Flow: Email Confirmation Handling

## Problem Summary

After completing signup, users are redirected back to the signup page instead of proceeding to checkout. This happens because:

1. **Email confirmation is enabled** in the authentication system
2. The signup page shows Step 3 (Welcome) immediately after calling `signUp()`, even though the user isn't actually logged in yet
3. When the user clicks "Continue to Checkout", the checkout page detects no authenticated user and redirects back to `/signup`

## Solution Overview

We need to modify the signup flow to properly handle email confirmation:

1. **Step 3 should inform users to check their email** for confirmation instead of pretending they can proceed
2. **After email confirmation**, users should be redirected to checkout automatically
3. The `emailRedirectTo` option should include the redirect destination

## Technical Changes

### 1. Update Signup Page (`src/pages/Signup.tsx`)

**Changes:**
- Extract `redirect` parameter from URL search params
- Update `emailRedirectTo` to include the redirect destination (e.g., `/checkout`)
- Change Step 3 messaging to inform users they need to confirm their email
- Remove the "Continue to Checkout" button since they can't proceed without email confirmation
- Add a "Resend confirmation email" option

### 2. Handle Email Confirmation Redirect

When users click the confirmation link in their email, they'll be redirected to the origin. We need to:
- Ensure the auth callback properly handles the redirect
- Consider creating a dedicated callback handler or updating `App.tsx` to handle the confirmation flow

### 3. Update useAuth Hook (`src/hooks/useAuth.tsx`)

**Changes:**
- On `SIGNED_IN` event (which fires after email confirmation), check localStorage for pending redirect
- Automatically navigate users to their intended destination (checkout)

## Implementation Details

### Step 1: Signup Page Changes

```typescript
// Extract redirect param
const redirect = searchParams.get("redirect") || "/checkout";

// Update emailRedirectTo to include redirect
const { data: signUpData, error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    emailRedirectTo: `${window.location.origin}${redirect}`,
    data: { full_name: name },
  },
});

// Store intended redirect in localStorage
localStorage.setItem("post_signup_redirect", redirect);

// Update Step 3 UI to show email confirmation message
```

### Step 2: Welcome Step UI Changes

Replace the current "Continue to Checkout" button with:
- "Check your email for a confirmation link" message
- Email icon visual
- "Didn't receive it? Resend" button
- Note that they'll be redirected to checkout after confirming

### Step 3: Auth Hook Changes

```typescript
// In onAuthStateChange, when SIGNED_IN fires:
if (event === "SIGNED_IN" && session?.user) {
  const pendingRedirect = localStorage.getItem("post_signup_redirect");
  if (pendingRedirect) {
    localStorage.removeItem("post_signup_redirect");
    // Navigation will happen in the component
  }
}
```

## Files to Modify

1. `src/pages/Signup.tsx` - Update email redirect URL and Step 3 UI
2. `src/hooks/useAuth.tsx` - Handle post-confirmation redirect (optional, can be handled in component)

## Expected User Flow After Fix

1. User enters email → Step 1
2. User enters name/password → Step 2
3. User sees "Check your email" message → Step 3
4. User clicks confirmation link in email
5. User is redirected to `/checkout` with active session
6. User completes checkout

## Alternative Approach (Disable Email Confirmation)

If immediate access is more important than email verification, we could disable email confirmation:
- Users would be logged in immediately after signup
- The current flow would work as intended
- Trade-off: Less security, potential for fake emails

This would require updating the authentication settings in Lovable Cloud.


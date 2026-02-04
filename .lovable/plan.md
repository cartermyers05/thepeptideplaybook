
# Fix: "Start Your Course" Should Redirect to Signup

## Problem

When a user clicks "Start Your Course" (or similar CTAs like "Build My Course") on the landing page:
1. They get sent to `/quiz` (a protected route)
2. `ProtectedRoute` sees they're not logged in
3. It redirects them to `/login` instead of `/signup`

Users who want to start their course are new users - they should be creating an account, not signing in.

---

## Solution

Update `ProtectedRoute` to redirect to `/signup` instead of `/login` for unauthenticated users.

This makes sense because:
- Users clicking "Start Your Course" are likely new and need to create an account
- The signup page can have a "Already have an account? Sign in" link for existing users
- This matches the user journey: discover → sign up → quiz → checkout → dashboard

---

## File to Modify

| File | Change |
|------|--------|
| `src/components/auth/ProtectedRoute.tsx` | Change redirect from `/login` to `/signup` |

---

## Code Change

```typescript
// Line 27 - Change:
return <Navigate to="/login" state={{ from: location }} replace />;

// To:
return <Navigate to="/signup" state={{ from: location }} replace />;
```

---

## Expected Result

1. User clicks "Start Your Course" on landing page
2. Tries to access `/quiz` (protected)
3. Redirects to `/signup` (create account page)
4. After signup, user is redirected back to `/quiz` to continue their journey
5. Existing users can click "Already have an account? Sign in" on the signup page

---

## Alternative Consideration

If you want `/login` to remain the default for some protected routes but `/signup` specifically for the quiz flow, we could instead:
- Make `/quiz` unprotected initially
- Show a "Create Account to Save Your Results" after quiz completion

But the simpler fix (redirect to signup) is recommended since new users are the primary audience for the "Start Your Course" CTA.

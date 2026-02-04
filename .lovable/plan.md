

# Fix Checkout Page Loading Bug

## Problem Identified

The checkout page gets stuck in a perpetual loading state due to a bug in `useTier.ts`.

**Root Cause:**
```typescript
const checkSubscription = useCallback(async () => {
  if (!user) return;
  
  setIsCheckingSubscription(true);  // ← Sets to true
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.access_token) return;  // ← EARLY RETURN - skips finally block!
    // ...
  } finally {
    setIsCheckingSubscription(false);  // ← Never reached on early return
  }
}, [user]);
```

When `getSession()` returns no session or access_token, the function returns early **before** the `finally` block executes, leaving `isCheckingSubscription` stuck as `true`.

This causes `useTier.isLoading` to always be `true`, which keeps Checkout.tsx showing the loading spinner forever.

---

## Solution

Fix the early return to properly reset the loading state:

### File: `src/hooks/useTier.ts`

**Change (lines 20-42):**

```typescript
const checkSubscription = useCallback(async () => {
  if (!user) return;
  
  setIsCheckingSubscription(true);
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.access_token) {
      setIsCheckingSubscription(false);  // ← Reset before early return
      return;
    }

    const response = await supabase.functions.invoke("check-subscription", {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });

    if (response.data && !response.error) {
      setSubscriptionStatus(response.data);
    }
  } catch (error) {
    console.error("Error checking subscription:", error);
  } finally {
    setIsCheckingSubscription(false);
  }
}, [user]);
```

---

## Technical Details

| Aspect | Current | Fixed |
|--------|---------|-------|
| Early return handling | Skips `finally` block | Explicitly resets state |
| Loading state cleanup | Only in `finally` | Guaranteed in all paths |
| User experience | Infinite loading | Proper checkout UI |

---

## Testing Checklist

After the fix:
1. ✅ Checkout page loads for authenticated users
2. ✅ Checkout page redirects unauthenticated users to signup
3. ✅ Loading spinner only shows briefly during auth/tier check
4. ✅ Stripe checkout URL is generated and redirect works


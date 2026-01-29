

# Fix Checkout Page Loading Issue

## Problem Identified

The checkout process is working (network request succeeds, Stripe URL is returned), but there's a race condition causing the page to appear "stuck" loading.

### Root Causes:

1. **Missing `startCheckout` in useEffect dependencies** - Can cause stale closures or multiple invocations
2. **Race condition in loading state** - `setIsLoading(false)` in the `finally` block can trigger a re-render before the redirect completes
3. **No "in-progress" tracking** - Nothing prevents `startCheckout` from being called multiple times during re-renders

## Solution

### 1. Fix `useCheckout.ts` - Add redirect tracking

Add a ref to track when redirect is in progress, so we don't reset loading state prematurely:

```typescript
import { useState, useRef } from "react";

export function useCheckout() {
  const [isLoading, setIsLoading] = useState(false);
  const redirectingRef = useRef(false);
  const { toast } = useToast();

  const startCheckout = async () => {
    if (isLoading || redirectingRef.current) return; // Prevent double calls
    setIsLoading(true);
    
    try {
      // ... existing code ...
      
      if (url) {
        redirectingRef.current = true;
        window.location.href = url;
        return; // Don't set isLoading to false - we're redirecting
      }
    } catch (error) {
      // Only show error if we're not redirecting
      if (!redirectingRef.current) {
        // ... existing error handling ...
        setIsLoading(false);
      }
    }
    // Remove finally block - we handle loading state explicitly
  };
```

### 2. Fix `Checkout.tsx` - Proper useEffect and state management

Add `startCheckout` to dependencies and use a ref to prevent double-invocation:

```typescript
import { useEffect, useRef } from "react";

export default function Checkout() {
  const { startCheckout, isLoading } = useCheckout();
  const { user, isLoading: authLoading } = useAuth();
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (!authLoading && user && !hasStartedRef.current) {
      hasStartedRef.current = true;
      startCheckout();
    }
  }, [authLoading, user, startCheckout]);
  // ...
}
```

## Files to Modify

| File | Changes |
|------|---------|
| `src/hooks/useCheckout.ts` | Add redirect tracking, prevent double-calls, fix loading state |
| `src/pages/Checkout.tsx` | Add ref to prevent double-invocation, fix useEffect dependencies |

## Technical Details

The fix ensures:
- `startCheckout()` can only be called once per component mount
- Loading state stays `true` while redirecting to Stripe
- No race condition between `setIsLoading(false)` and the browser redirect
- Proper React hook dependency tracking


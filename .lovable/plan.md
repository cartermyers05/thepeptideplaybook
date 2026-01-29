

# Fix Checkout Page - Redirect Not Working

## Problem Analysis

The network logs confirm the API call **succeeds** and returns a valid Stripe URL. The issue is the redirect (`window.location.href = url`) either:
1. Isn't executing due to a `useCallback` dependency issue
2. Is being blocked by the preview iframe sandbox

## Root Cause

The `startCheckout` function has `isLoading` in its dependency array:

```typescript
const startCheckout = useCallback(async () => {
  if (isLoading || redirectingRef.current) return;  // ← Checks isLoading
  setIsLoading(true);  // ← Changes isLoading
  // ...
}, [isLoading, toast]);  // ← Depends on isLoading
```

This creates a problematic cycle:
1. `startCheckout` is called
2. `setIsLoading(true)` runs
3. `startCheckout` gets a new reference (because isLoading changed)
4. React may interrupt the async operation

## Solution

### 1. Fix `useCheckout.ts` - Remove `isLoading` from dependencies

Since we use `redirectingRef` to prevent double-calls, we don't need `isLoading` in the dependency check. Use a ref for the guard instead:

```typescript
export function useCheckout() {
  const [isLoading, setIsLoading] = useState(false);
  const redirectingRef = useRef(false);
  const isProcessingRef = useRef(false);  // NEW: Track if already processing
  const { toast } = useToast();

  const startCheckout = useCallback(async () => {
    // Use ref instead of state for the guard
    if (isProcessingRef.current || redirectingRef.current) return;
    isProcessingRef.current = true;
    setIsLoading(true);
    
    try {
      // ... existing code ...
      
      if (url) {
        redirectingRef.current = true;
        window.location.href = url;
        return;
      }
    } catch (error) {
      // ... error handling ...
      isProcessingRef.current = false;
      setIsLoading(false);
    }
  }, [toast]);  // Remove isLoading from dependencies
```

### 2. Simplify `Checkout.tsx` - Remove `startCheckout` from dependencies

Since `startCheckout` will now have a stable reference, we can simplify:

```typescript
useEffect(() => {
  if (!authLoading && user && !hasStartedRef.current) {
    hasStartedRef.current = true;
    startCheckout();
  }
}, [authLoading, user]); // startCheckout is now stable, can omit
```

## Files to Modify

| File | Changes |
|------|---------|
| `src/hooks/useCheckout.ts` | Add `isProcessingRef`, remove `isLoading` from dependency array |
| `src/pages/Checkout.tsx` | Remove `startCheckout` from useEffect dependency array |

## Why This Fixes It

- `startCheckout` now has a **stable reference** that doesn't change when `isLoading` changes
- The guard check uses a ref (`isProcessingRef`) instead of state, so it works correctly in async operations
- The useEffect won't re-trigger unnecessarily when state changes
- The redirect will execute without interference from React re-renders



# Remove Free User Access - Redirect Unpaid Users to Checkout

## The Problem

Currently, unpaid users can still access the dashboard and see an "Upgrade Prompt". The user wants to eliminate this entirely - **no free users should exist in the app**. If someone hasn't paid, they should be redirected to checkout immediately.

## The Solution

Update the `ProtectedRoute` component to check **both** authentication AND payment status:
- If not logged in → redirect to `/login`
- If logged in but not paid → redirect to `/checkout`
- If logged in AND paid → show the protected content

## File to Modify

### `src/components/auth/ProtectedRoute.tsx`

**Current behavior:**
- Only checks if user is authenticated
- Unpaid users can access dashboard pages

**New behavior:**
- Check authentication first
- Then check payment status via `useTier`
- Redirect unpaid users to `/checkout`

```typescript
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useTier } from "@/hooks/useTier";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading: authLoading } = useAuth();
  const { isPaid, isLoading: tierLoading } = useTier();
  const location = useLocation();

  // Show loading while checking auth or tier
  if (authLoading || tierLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse-soft">
          <div className="w-8 h-8 rounded-lg bg-gradient-primary" />
        </div>
      </div>
    );
  }

  // Not logged in → go to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Logged in but hasn't paid → go to checkout
  if (!isPaid) {
    return <Navigate to="/checkout" replace />;
  }

  // Logged in AND paid → show content
  return <>{children}</>;
}
```

## Cleanup

Since unpaid users can no longer reach the dashboard, the `UpgradePrompt` conditional checks in `Home.tsx` become unnecessary (but harmless). We can optionally remove them for cleaner code, but the redirect in `ProtectedRoute` will prevent unpaid access regardless.

## Result

### New User Flow
```
Homepage → Signup → Checkout (required) → Payment → Dashboard
```

### Returning Unpaid User (edge case - started signup but didn't pay)
```
Login → Redirect to /checkout → Payment → Dashboard
```

### Returning Paid User
```
Login → Dashboard ✓
```

**No free users can ever access any protected route.**

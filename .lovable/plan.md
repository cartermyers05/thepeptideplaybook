
# Fix: Require Payment Before Using AI Assistant

## The Problem

Users can create an account and immediately access the full AI Assistant without paying because:

1. **Signup flow bypasses payment**: After signup, users go directly to `/dashboard` without being routed through checkout
2. **Dashboard Home shows full chat**: The main dashboard page (`/dashboard`) embeds `ChatInterface` directly **without checking if the user has paid**
3. **ProtectedRoute only checks login**: It verifies if someone is logged in, not if they've purchased

### Current Flow (Broken)
```text
Homepage → Signup → Account Created → /dashboard → Full AI Access (FREE!)
```

### Correct Flow
```text
Homepage → Signup → Account Created → /checkout → Payment → /dashboard → Full AI Access
```

---

## The Solution

### 1. Update Dashboard Home to Check Payment

**File:** `src/pages/dashboard/Home.tsx`

The main dashboard page currently shows `ChatInterface` to everyone. We need to:
- Import `useTier` hook
- Check if user `isPaid`
- Show `UpgradePrompt` instead of `ChatInterface` for free users

This mirrors how `ChatPage.tsx` already handles this for the dedicated chat route.

### 2. Update Signup Flow to Route to Checkout

**File:** `src/pages/Signup.tsx`

After successful account creation (Step 3), instead of going directly to `/dashboard`, redirect to `/checkout` to complete the purchase.

Change:
```typescript
// From:
navigate("/dashboard");

// To:
navigate("/checkout");
```

Also update the welcome message to set expectations:
```typescript
// From:
"Your account is ready. Let's ask your first peptide question."

// To:
"Your account is ready. Complete your purchase to unlock full access."
```

And the button text:
```typescript
// From:
"Start Exploring"

// To:
"Complete Purchase"
```

---

## Technical Details

### Dashboard Home Changes

```typescript
// Add imports
import { useTier } from "@/hooks/useTier";
import { UpgradePrompt } from "@/components/dashboard/UpgradePrompt";

// Inside component
const { isPaid } = useTier();

// Replace ChatInterface with conditional rendering:
{isPaid ? (
  <ChatInterface />
) : (
  <UpgradePrompt feature="AI Research Assistant" />
)}
```

### Signup Flow Changes

The "Welcome" step (Step 3) will:
- Change button action from `/dashboard` to `/checkout`
- Update copy to reflect that payment is the next step

---

## Files to Modify

| File | Change |
|------|--------|
| `src/pages/dashboard/Home.tsx` | Add `useTier` check, show `UpgradePrompt` for free users |
| `src/pages/Signup.tsx` | Redirect to `/checkout` after signup, update copy |

---

## Result

### New User Flow
```text
┌──────────────────┐
│  Landing Page    │
│  "Get Full Access"│
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Signup Page     │
│  Create Account  │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Checkout Page   │ ◄── Payment required here
│  Pay $67         │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Thank You Page  │
│  Payment Success │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Dashboard       │
│  Full AI Access  │ ◄── Only accessible after payment
└──────────────────┘
```

### Returning Paid User
```text
Login → Dashboard → Full AI Access ✓
```

### Returning Free User (edge case)
```text
Login → Dashboard → UpgradePrompt → Checkout → Payment → Full Access
```



# Fix: Stripe Checkout Popup Being Blocked

## Problem Identified

The `window.open()` call is being **blocked by the browser's popup blocker** because:

1. User clicks button
2. Async call to Supabase edge function (takes ~1-2 seconds)
3. `window.open()` is called after the async completes
4. Browser sees this as NOT a direct user action → blocks popup

**This is a common browser security feature** - popups must happen immediately on user click, not after async operations.

---

## Solution

Open a blank tab **immediately on click**, then redirect it to the Stripe URL after the async call completes.

### Changes to `src/pages/CoursePreview.tsx`

**Current code (lines 56-73):**
```typescript
setIsCheckingOut(true);
try {
  const { data: { session } } = await supabase.auth.getSession();
  
  const response = await supabase.functions.invoke("create-checkout", { ... });

  if (response.data?.url) {
    window.open(response.data.url, '_blank');  // ← Blocked!
    ...
  }
}
```

**Fixed code:**
```typescript
setIsCheckingOut(true);

// Open blank tab IMMEDIATELY (before any async) to avoid popup blocker
const checkoutWindow = window.open('about:blank', '_blank');

try {
  const { data: { session } } = await supabase.auth.getSession();
  
  const response = await supabase.functions.invoke("create-checkout", { ... });

  if (response.data?.url && checkoutWindow) {
    // Redirect the already-opened tab to Stripe
    checkoutWindow.location.href = response.data.url;
    toast.info("Checkout opened in new tab");
    setIsCheckingOut(false);
  } else if (!checkoutWindow) {
    // Fallback if popup was still blocked
    toast.error("Popup blocked - please allow popups for this site");
    setIsCheckingOut(false);
  }
} catch (error) {
  // Close the blank tab if there was an error
  checkoutWindow?.close();
  ...
}
```

---

## How This Works

| Step | What Happens |
|------|--------------|
| 1. User clicks | `window.open('about:blank')` runs immediately - browser allows it |
| 2. Blank tab opens | Tab shows loading/blank page |
| 3. Async completes | Edge function returns Stripe URL |
| 4. Redirect tab | `checkoutWindow.location.href = url` navigates to Stripe |

---

## Technical Details

- Opening a window **synchronously** on click is allowed by all browsers
- We can then redirect that window after async operations
- If the popup is still somehow blocked, we show a helpful error message
- If there's an error, we close the blank tab so user doesn't have orphaned tabs

---

## Implementation

**File:** `src/pages/CoursePreview.tsx`

Update the `handleCheckout` function (lines 49-79) to:
1. Open blank tab immediately on line 56
2. After async call, redirect the tab to Stripe URL
3. Handle edge case where popup is still blocked
4. Close the tab on error


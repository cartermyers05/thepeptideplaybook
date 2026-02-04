
# Fix: Checkout Tab Opens But Stays Blank

## Problem Identified

After debugging, the issue is:
1. **Blank tab opens successfully** - `window.open('about:blank')` works ✓
2. **Tab stays blank** - The `checkoutWindow.location.href = url` never executes
3. **No error toast appears** - Errors are not being caught/displayed properly

**Root cause**: The conditional logic after the edge function call has a gap. When `checkoutWindow` exists but `response.data?.url` is falsy (undefined/null/empty), there's no `else` clause to handle this case - the blank tab stays open with no redirect and no error message.

```typescript
// Current code (line 72-78)
if (response.data?.url && checkoutWindow) {
  checkoutWindow.location.href = response.data.url;
  // ...
} else if (!checkoutWindow) {
  toast.error("Popup blocked - please allow popups for this site");
  // ...
}
// 👆 MISSING: else clause for when checkoutWindow exists but url is missing
```

Additionally, the error handling for `FunctionsHttpError` may not properly extract the error message from the edge function's response.

---

## Solution

**Add comprehensive error handling and logging** to properly catch all failure cases.

### Changes to `src/pages/CoursePreview.tsx`

Update the `handleCheckout` function to:

1. **Add logging** to debug what's being returned
2. **Add missing else clause** to close blank tab when URL is missing
3. **Better error extraction** from Supabase Functions response

```typescript
const handleCheckout = async () => {
  if (!user) {
    navigate(`/login?redirect=/course/${goal}`);
    return;
  }

  setIsCheckingOut(true);
  
  // Open blank tab IMMEDIATELY (before any async) to avoid popup blocker
  const checkoutWindow = window.open('about:blank', '_blank');

  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.access_token) {
      throw new Error("No active session - please log in again");
    }

    const response = await supabase.functions.invoke("create-checkout", {
      body: { goal },
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });

    console.log("Checkout response:", response); // Debug logging

    // Handle edge function errors
    if (response.error) {
      // Extract error message from FunctionsHttpError
      let errorMsg = "Checkout failed";
      if (response.error.context) {
        try {
          const errorData = await response.error.context.json();
          errorMsg = errorData.error || errorMsg;
        } catch {
          errorMsg = response.error.message || errorMsg;
        }
      } else {
        errorMsg = response.error.message || errorMsg;
      }
      throw new Error(errorMsg);
    }
    
    // Handle successful response
    if (response.data?.url && checkoutWindow) {
      checkoutWindow.location.href = response.data.url;
      toast.info("Checkout opened in new tab");
      setIsCheckingOut(false);
    } else if (!checkoutWindow) {
      toast.error("Popup blocked - please allow popups for this site");
      setIsCheckingOut(false);
    } else {
      // NEW: Handle case where tab opened but no URL returned
      checkoutWindow.close();
      toast.error("Failed to create checkout session");
      setIsCheckingOut(false);
    }
  } catch (error: unknown) {
    checkoutWindow?.close();
    const errorMessage = error instanceof Error ? error.message : "Failed to start checkout";
    console.error("Checkout error:", errorMessage); // Debug logging
    toast.error(errorMessage);
    setIsCheckingOut(false);
  }
};
```

---

## Key Fixes

| Issue | Fix |
|-------|-----|
| No handling when URL is missing | Add else clause to close tab and show error |
| Error message not extracted | Parse `error.context.json()` for actual message |
| Silent failures | Add console.log for debugging |
| Session might be null | Check for `session?.access_token` explicitly |

---

## Implementation

**File:** `src/pages/CoursePreview.tsx`  
**Lines:** 49-86 (handleCheckout function)

After this fix, if the edge function returns an error or no URL, the user will:
1. See the blank tab close automatically
2. See an error toast with the actual error message
3. Console logs will help debug further if issues persist


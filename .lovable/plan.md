

# Fix: Stripe Checkout Not Loading

## Problem Identified

The Stripe checkout **is working correctly** on the backend - the edge function returns a valid checkout URL. However, the page doesn't load because:

1. **Lovable preview runs in an iframe**
2. **Stripe checkout blocks iframe embedding** for security (prevents clickjacking)
3. `window.location.href = url` tries to navigate the iframe, which Stripe blocks

## Solution

Open the Stripe checkout in a **new tab** instead of trying to redirect within the iframe.

### Changes Required

**File: `src/pages/CoursePreview.tsx`**

Update line 70 from:
```typescript
window.location.href = response.data.url;
```

To:
```typescript
window.open(response.data.url, '_blank');
```

This opens Stripe checkout in a new browser tab where it will work correctly.

### Optional Enhancement

Add user feedback after opening the checkout:
```typescript
if (response.data?.url) {
  window.open(response.data.url, '_blank');
  toast.info("Checkout opened in new tab");
  setIsCheckingOut(false);
}
```

## Alternative: Test on Published URL

The checkout will also work correctly when tested on the **published URL** (https://thepeptideplaybook.lovable.app) since it's not in an iframe there.

---

## Technical Details

| What | Status |
|------|--------|
| Edge function `create-checkout` | Working ✓ |
| Stripe session creation | Working ✓ |
| URL returned to frontend | Working ✓ |
| Issue | iframe navigation blocked by Stripe |

## Implementation

Single line change in `CoursePreview.tsx`:
- Line 70: Change `window.location.href` to `window.open(..., '_blank')`


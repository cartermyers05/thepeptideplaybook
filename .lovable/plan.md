

# Fix: Remove Purple Bar Behind Navbar

## The Issue

The "purple bar" you're seeing is the **UrgencyBanner** component - a countdown timer for a "New Year Special" promotion. The problem is a layout conflict:

- `UrgencyBanner` sits at the top of the page in normal document flow
- `Navbar` uses `fixed top-0` which pins it to the absolute top of the viewport
- This causes the navbar to **overlap** the banner, making it appear as a purple stripe behind/under the nav

## Solution Options

**Option A: Remove the banner entirely** (simpler)
- Delete the `UrgencyBanner` import and usage from `Index.tsx`
- The purple bar disappears completely

**Option B: Fix the positioning** (keeps the feature)
- Adjust the navbar to account for banner height when visible
- More complex, requires coordination between components

## Recommended: Option A (Remove Banner)

Since you've simplified to a single $67 tier, the "20% off Pro" promotion in the banner is outdated anyway. Removing it is cleaner.

---

## Changes

**File:** `src/pages/Index.tsx`

1. Remove the import for `UrgencyBanner`
2. Remove `<UrgencyBanner />` from the JSX

```text
Line 13: Remove - import { UrgencyBanner } from "@/components/landing/UrgencyBanner";
Line 25: Remove - <UrgencyBanner />
```

The result is a clean white background behind the navbar with no overlapping elements.

---

## Alternative (If You Want to Keep a Banner Later)

If you want an urgency banner in the future, it should either:
1. Be placed **inside** the fixed navbar header
2. Push the navbar down by making the banner sticky/fixed and offsetting the navbar's `top` value

But for now, removing it is the cleanest solution given the single-tier pricing change.


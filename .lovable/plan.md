
# Fix Remaining Broken Buttons: ProductPreview and PricingCTA

## Problem

Two "signup" buttons are not working:
1. **ProductPreview** - "Get Full Access" button
2. **PricingCTA** - "Get AI Access Now" button

Both use the correct `<Link to="/signup">` wrapping pattern, but clicks don't navigate.

## Root Cause

The buttons are inside glass-card containers with:
- `relative` positioning
- Gradient overlay divs with `absolute inset-0`
- Motion wrappers that may capture events

## Solution

Add explicit `z-index` and `relative` positioning to ensure the Link/Button is clickable above any overlays.

---

## File Changes

### 1. `src/components/landing/ProductPreview.tsx` (Line 140-145)

Add `relative z-10` to the Link wrapper:

```tsx
<Link to="/signup" className="relative z-10">
  <Button className="btn-primary-clean group">
    Get Full Access
    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
  </Button>
</Link>
```

### 2. `src/components/landing/PricingCTA.tsx` (Line 98-103)

Add `relative z-10 block` to the Link wrapper:

```tsx
<Link to="/signup" className="w-full relative z-10 block">
  <Button size="lg" className="w-full btn-primary-clean h-12 text-base">
    <Sparkles className="w-4 h-4 mr-2" />
    Get AI Access Now
  </Button>
</Link>
```

---

## Why This Works

The `relative z-10` ensures the Link element is positioned above any `absolute inset-0` overlay elements (like gradient backgrounds) that may be capturing pointer events. The glass-card's gradient overlay has `pointer-events: none` but adding z-index provides additional insurance.

---

## Files to Modify

1. `src/components/landing/ProductPreview.tsx` - Add z-index to Link
2. `src/components/landing/PricingCTA.tsx` - Add z-index to Link

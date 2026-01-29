
# Fix: "Get Access" Button Not Working on Homepage

## Problem

The "Get AI Access Now" button in the PricingCTA section at the bottom of the homepage is not responding to clicks.

## Root Cause

In `src/components/landing/PricingCTA.tsx`, the button is wrapped in a `motion.div` with hover/tap animations:

```tsx
<motion.div
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
>
  <Button asChild ...>
    <Link to="/signup">Get AI Access Now</Link>
  </Button>
</motion.div>
```

This causes two issues:
1. The `motion.div` wrapper can interfere with click event propagation to the child `Link` component
2. The CSS `.btn-primary-clean:hover` already applies `transform: translateY(-1px)` and custom hover effects, which conflict with the motion animations

## Solution

Remove the `motion.div` wrapper from around the Button. The button already has premium hover animations via CSS (`.btn-primary-clean` class), so the Framer Motion wrapper is redundant and causing the click issue.

---

## File Changes

### File: `src/components/landing/PricingCTA.tsx`

**Change:** Remove the `motion.div` wrapper around the Button (lines 98-108)

**Before:**
```tsx
<motion.div
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
>
  <Button asChild size="lg" className="w-full btn-primary-clean h-12 text-base">
    <Link to="/signup">
      <Sparkles className="w-4 h-4 mr-2" />
      Get AI Access Now
    </Link>
  </Button>
</motion.div>
```

**After:**
```tsx
<Button asChild size="lg" className="w-full btn-primary-clean h-12 text-base">
  <Link to="/signup">
    <Sparkles className="w-4 h-4 mr-2" />
    Get AI Access Now
  </Link>
</Button>
```

---

## Why This Works

1. The `Link` component will now receive click events directly without the motion wrapper intercepting them
2. The `.btn-primary-clean` CSS class already provides premium hover animations:
   - Shimmer effect on hover
   - Slight lift (`translateY(-1px)`)
   - Glow shadow
3. No visual degradation - the button will still look and animate beautifully

---

## Technical Note

The `Button asChild` pattern uses Radix's `Slot` component to pass props to the child element. When wrapped in a `motion.div`, the motion component can capture pointer events before they reach the actual clickable `Link` element, especially when combined with `whileTap` which listens for pointer down/up events.

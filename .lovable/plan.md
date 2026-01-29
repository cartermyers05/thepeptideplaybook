
# Revert WhoThisIsFor Design Change

## Summary

Keep the copy improvements but remove the "Is This Right for You?" header that made the design feel bland.

---

## What We're Keeping

| File | Change | Status |
|------|--------|--------|
| `Navbar.tsx` | "Get Started" → "Get Access", link to #pricing | ✓ Keep |
| `HowItWorks.tsx` | "Talk to Your Doctor" → "Have Informed Conversations" | ✓ Keep |

---

## What We're Reverting

**File:** `src/components/landing/WhoThisIsFor.tsx`

**Action:** Remove lines 23-32 (the motion.div with the h2 header)

```tsx
// REMOVE THIS BLOCK:
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  className="text-center mb-12"
>
  <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
    Is This Right for You?
  </h2>
</motion.div>
```

---

## Result

The section returns to its original layout where the two cards ("This Is For You If..." / "Not For You If...") appear directly without a redundant header above them.



# Landing Page Flow Refinements

## Overview

Three quick fixes to improve consistency and polish across the landing page.

---

## Changes

### 1. Navbar Mobile Menu CTA Fix

**File:** `src/components/landing/Navbar.tsx`

**Issue:** Mobile menu button says "Get Started" but desktop says "Get Access"

**Fix:** Update line 110 from:
```tsx
<Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
  Get Started
</Link>
```

To:
```tsx
<a href="#pricing" onClick={() => setIsMobileMenuOpen(false)}>
  Get Access
</a>
```

This also fixes the link destination — mobile should go to `#pricing` like desktop, not `/signup`.

---

### 2. WhoThisIsFor Section Header

**File:** `src/components/landing/WhoThisIsFor.tsx`

**Issue:** Section jumps straight into the two cards without context

**Fix:** Add a centered headline above the grid:

```tsx
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

### 3. HowItWorks Step 3 Refinement

**File:** `src/components/landing/HowItWorks.tsx`

**Issue:** "Talk to Your Doctor" is fine, but could be more outcome-focused

**Fix:** Update step 3 copy:
- **Title:** "Have Informed Conversations"
- **Description:** "Use the scripts and your research to discuss options with your healthcare provider."

This keeps the doctor-involvement message but emphasizes the user's informed role.

---

## Summary

| File | Change |
|------|--------|
| `Navbar.tsx` | Mobile CTA: "Get Started" → "Get Access", link to #pricing |
| `WhoThisIsFor.tsx` | Add "Is This Right for You?" section header |
| `HowItWorks.tsx` | Step 3: "Talk to Your Doctor" → "Have Informed Conversations" |




# Peptide Playbook — Critical Conversion Fixes

## Overview

This plan implements 10 high-impact fixes to maximize conversions, improve user experience, and add trust elements throughout the site.

---

## Changes Summary

| Fix | Priority | Effort |
|-----|----------|--------|
| 1. FinalCTA tiered pricing | Critical | 15 min |
| 2. Login redirect to /dashboard | Critical | 2 min |
| 3. Urgency banner with countdown | High | 15 min |
| 4. Exit intent popup | High | 20 min |
| 5. Floating mobile CTA | High | 10 min |
| 6. Print checklist functionality | Medium | 10 min |
| 7. Expand digest content | Medium | 30 min |
| 8. Enhanced testimonials | Medium | 15 min |
| 9. Trust badges/elements | Medium | 20 min |
| 10. Signup page redirect fix | Critical | 2 min |

---

## Fix 1: Update FinalCTA Section

**File:** `src/components/landing/FinalCTA.tsx`

Replace the single $167 pricing card with a 3-tier summary:
- Starter ($67) - Guide + Scripts + Checklist
- Pro ($197) - marked as "MOST POPULAR" - adds Database + AI + Digest  
- Insider ($497) - adds Community + 1:1 Call

Include two CTAs:
- "View Full Pricing" linking to /pricing
- "Get Free Guide First" linking to /free-guide

Update bottom CTA text to remove $167 reference and link to /pricing.

---

## Fix 2: Login Redirect

**File:** `src/pages/Login.tsx`

Change line 29:
```text
navigate("/chat")  →  navigate("/dashboard")
```

Also update the "Start free trial" link text to "Create account" since free trial was removed.

---

## Fix 3: Urgency Banner

**New File:** Create updated `src/components/landing/UrgencyBanner.tsx`

Features:
- Sticky banner at top of page with primary background
- 24-hour countdown timer (persisted in localStorage)
- Dismissible with X button
- "New Year Special: Get 20% off Pro with code PEPTIDE2026"
- Clean, non-spammy design

**Update:** `src/pages/Index.tsx` to include banner above Navbar

---

## Fix 4: Exit Intent Popup

**New File:** `src/components/landing/ExitIntentPopup.tsx`

Features:
- Triggers when mouse leaves viewport (clientY <= 0)
- Only shows once per session (stored in sessionStorage)
- 5-second delay before activating listener
- Offers free "5 Red Flags" checklist
- Email capture form → inserts to `leads` table with source: "exit-intent"
- Clean modal design with Gift icon

**Update:** `src/pages/Index.tsx` to include popup component

---

## Fix 5: Floating Mobile CTA

**New File:** `src/components/landing/FloatingCTA.tsx`

Features:
- Fixed button at bottom of screen on mobile
- Only appears after scrolling past 600px
- Links to /pricing
- "Get Instant Access" with arrow icon
- Subtle shadow and animation

**Update:** `src/pages/Index.tsx` to include floating CTA

---

## Fix 6: Print Checklist Functionality

**File:** `src/pages/dashboard/Checklist.tsx`

Changes:
- Add onClick handler to Print button: `window.print()`
- Add `print-content` class to main content wrapper

**File:** `src/index.css`

Add print media query:
```css
@media print {
  nav, .sidebar, button, .no-print { display: none !important; }
  .print-content { width: 100% !important; margin: 0 !important; padding: 20px !important; }
  * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
}
```

---

## Fix 7: Expand Digest Content

**File:** `src/pages/dashboard/Digest.tsx`

Changes:
- Add `fullContent` and `sources` fields to each digest object
- Add expandable state management with useState
- When "Read full digest" is clicked, expand to show:
  - Full markdown content (rendered with react-markdown)
  - Source links
- Collapse functionality to hide content again

---

## Fix 8: Enhanced Testimonials

**File:** `src/components/landing/Testimonials.tsx`

Updates to testimonials array:
- Add `title` field (e.g., "Marketing Director, Austin TX")
- Add `date` field (e.g., "January 2026")
- Enhance quotes with more specific details

Update component:
- Display job title below name
- Show verification date
- Add avatar placeholder styling

---

## Fix 9: Trust Badges/Elements

**File:** `src/components/landing/PricingSection.tsx`

Add below pricing cards:
- Security badges: "SSL Secured", "Stripe Payments", "30-Day Refund"
- Member count: "Join 4,200+ members"

**File:** `src/pages/Checkout.tsx`

Add trust elements near checkout button:
- Lock icon with "256-bit SSL encryption"
- Credit card icons
- Money-back guarantee text

---

## Fix 10: Signup Page Redirect

**File:** `src/pages/Signup.tsx`

Change line 66 in `handleContinue`:
```text
navigate("/chat")  →  navigate("/dashboard")
```

Also update marketing copy:
- Remove "7-day trial for just $1" (line 284)
- Update to match new pricing model

---

## Implementation Order

1. Login & Signup redirects (Critical path fixes)
2. FinalCTA tiered pricing (Landing page accuracy)
3. Urgency banner (Conversion lift)
4. Exit intent popup (Lead capture)
5. Floating mobile CTA (Mobile conversion)
6. Enhanced testimonials (Social proof)
7. Trust badges (Reduce friction)
8. Print checklist (Feature completion)
9. Expand digest content (Feature completion)
10. Print CSS styles (Finish print feature)

---

## Files to Create

| File | Purpose |
|------|---------|
| `src/components/landing/ExitIntentPopup.tsx` | Lead capture popup |
| `src/components/landing/FloatingCTA.tsx` | Mobile sticky CTA |

---

## Files to Update

| File | Changes |
|------|---------|
| `src/pages/Login.tsx` | Redirect to /dashboard |
| `src/pages/Signup.tsx` | Redirect to /dashboard, update copy |
| `src/components/landing/FinalCTA.tsx` | Complete rewrite with tiered pricing |
| `src/components/landing/UrgencyBanner.tsx` | Update with dismiss functionality |
| `src/components/landing/Testimonials.tsx` | Enhanced data and display |
| `src/components/landing/PricingSection.tsx` | Add trust badges |
| `src/pages/Index.tsx` | Add UrgencyBanner, ExitIntentPopup, FloatingCTA |
| `src/pages/dashboard/Checklist.tsx` | Add print functionality |
| `src/pages/dashboard/Digest.tsx` | Add expandable content |
| `src/pages/Checkout.tsx` | Add trust elements |
| `src/index.css` | Add print media query |

---

## Testing Checklist

After implementation, verify:
- Login redirects to /dashboard (not /chat)
- Signup flow ends at /dashboard
- FinalCTA shows 3 tiers with correct prices
- Urgency banner shows countdown, dismisses on X
- Exit intent fires when mouse leaves viewport (after 5s delay)
- Mobile floating CTA appears on scroll (test on mobile viewport)
- Print checklist opens browser print dialog
- Digest cards expand to show full content
- All testimonials show name, title, and date
- Trust badges visible on pricing section
- No console errors


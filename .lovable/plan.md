

# Revised Fix Plan -- 7 Prompts, 6 Core Changes

This is a large set of changes spanning new pages, updated CTAs, SEO fixes, and checkout cleanup. Here's the full implementation plan organized by the 7 prompts you outlined.

---

## Conflict: /welcome Route

The current `/welcome` route is a **ProtectedRoute** used for post-payment onboarding. Your plan wants `/welcome` as a **public** TikTok link-in-bio page.

**Resolution:** Make `/welcome` public (the TikTok landing page). The existing post-payment flow at `/welcome/onboarding` stays unchanged -- it's already a separate route.

---

## Prompt 1 + 2: Build /sales Page (New File)

**New file:** `src/pages/Sales.tsx`

A single-page, no-nav, no-footer sales/conversion page with 7 sections:
1. Hero -- badge, headline ("Stop Guessing. Start Understanding."), subheadline, CTA button to /checkout, trust line
2. The Problem -- "Sound familiar?" with 4 problem cards (Search, AlertTriangle, Stethoscope, DollarSign icons)
3. The Solution -- Mockup chat card showing AI interaction with evidence rating tag
4. What's Inside -- 5 value-stack rows with strikethrough pricing, total value anchor, CTA
5. Guarantee -- ShieldCheck icon, 30-day guarantee copy
6. FAQ -- Accordion with 5 questions (medical advice, knowledge level, refund, subscription, free info)
7. Final CTA -- "Pro-peptide. Pro-research. Anti-BS." with button and disclaimer

**Route addition in `src/App.tsx`:** Add `<Route path="/sales" element={<Sales />} />` (public, no ProtectedRoute).

All internal links use same-tab navigation. Back link in top-left corner to `/`.

---

## Prompt 3: Add Soft CTAs to Guide Pages

**Modified file:** `src/components/guides/GuideLayout.tsx`

Add two new CTA components inline within the guide layout:
- **CTA Box 1 (InlineGuideCTA):** Rendered after the breadcrumbs/metadata area, before `{children}`. Left-bordered accent card with "Want to go deeper?" copy and "See what's inside" link to /sales.
- **CTA Box 2 (BottomGuideCTA):** Rendered after `{children}`, before the footer. Centered card with headline, description, "$67" button to /sales, and guarantee text.

**Updated file:** `src/components/guides/GuideCTA.tsx` -- Update existing CTA to point to /sales instead of / and /signup. Change copy to match new messaging.

No guide content is gated, blurred, or hidden. Everything remains fully readable.

---

## Prompt 4: Sticky Mobile CTA Bar

**New file:** `src/components/MobileStickyBar.tsx`

A fixed-bottom bar visible only below 768px (`md:hidden`). Shows "Full Access -- $67" text + "Get Started" button linking to /sales.

**Show on:** `/`, `/guides`, `/guides/*`, `/welcome`
**Hide on:** `/sales`, `/checkout`, `/dashboard/*`, `/login`, `/signup`

Uses `useLocation()` to determine visibility.

**Modified files:**
- `src/pages/Index.tsx` -- Add MobileStickyBar + bottom padding on mobile
- `src/components/guides/GuideLayout.tsx` -- Add MobileStickyBar + bottom padding
- `src/pages/Guides.tsx` -- Add MobileStickyBar + bottom padding

The existing `FloatingCTA` component on the homepage will be replaced by this new sticky bar since they serve the same purpose.

---

## Prompt 5: TikTok Link-in-Bio Page (/welcome)

**Modified file:** `src/pages/Welcome.tsx` -- Complete rewrite to a simple, public link-in-bio page.

Content:
- "PEPTIDE PLAYBOOK" badge
- "Pro-peptide. Pro-research. Anti-BS." headline
- 3 stacked buttons: "Get the Full Playbook -- $67" (to /sales), "Read Free Research Guides" (to /guides), "Learn About the AI Coach" (to /sales)
- Disclaimer text

**Modified file:** `src/App.tsx`
- Remove `<ProtectedRoute>` wrapper from `/welcome` route (make it public)
- Keep `/welcome/onboarding` as ProtectedRoute (unchanged)

SEO: noindex meta tag added (already present in current Welcome.tsx).

---

## Prompt 6: SEO and Meta Tag Fixes

**Modified files:**

1. **`src/pages/Index.tsx`** -- Update SEOHead:
   - title: "Peptide Playbook -- AI-Powered Peptide Research Education"
   - description: Remove "Take the free quiz" -- use new copy about AI research coach

2. **`src/pages/Sales.tsx`** -- SEOHead with title "Get Full Access -- Peptide Playbook" and sales-focused description

3. **`src/pages/Guides.tsx`** -- Already updated in previous session, verify description

4. **`src/pages/Welcome.tsx`** -- SEOHead with noindex (already planned)

5. **`public/robots.txt`** -- Update:
   - Add `Disallow: /welcome` 
   - Remove `/admin/` and `/api/` lines (keep existing disallows)
   - Keep sitemap reference

6. **`public/sitemap.xml`** -- Add `/sales` route, update dates

7. **`src/components/landing/Navbar.tsx`** -- Replace "Get Your Protocol" CTA link from `/signup` to `/sales`. Update mobile menu to remove quiz references.

8. **`src/components/landing/HowItWorks.tsx`** -- If step 1 says "Take the Quiz", update to non-quiz language

9. **`src/pages/Quiz.tsx`** -- Keep route alive (for indexed URLs) but remove links TO it from nav/CTAs

10. **`index.html`** -- Update meta description to remove quiz references (already done in previous session, verify)

---

## Prompt 7: Checkout Cleanup

**Modified file:** `src/pages/Checkout.tsx` -- Rebuild to minimal conversion page:

- No nav, no footer
- Back arrow link to /sales
- "PEPTIDE PLAYBOOK" badge
- Order summary card with 5 bullet items (AI Research Coach, 41+ profiles, doctor scripts, legal guide, lifetime access)
- Total: $67.00, "One-time payment. No subscription."
- "Complete Purchase" button (triggers existing `startCheckout()` from `useCheckout` hook -- same-tab Stripe redirect)
- Loading spinner in button while Stripe loads
- Trust signals: Lock + "Secured by Stripe", ShieldCheck + "30-day guarantee", support email
- "Already have access? Log in" link
- Keep existing promo code functionality

The existing `useCheckout` hook and Stripe edge function stay unchanged -- only the UI is rebuilt.

---

## Files Summary

| Action | File |
|--------|------|
| Create | `src/pages/Sales.tsx` |
| Create | `src/components/MobileStickyBar.tsx` |
| Modify | `src/App.tsx` -- add /sales route, make /welcome public |
| Modify | `src/pages/Welcome.tsx` -- rewrite as link-in-bio |
| Modify | `src/pages/Checkout.tsx` -- minimal rebuild |
| Modify | `src/pages/Index.tsx` -- update SEOHead, swap FloatingCTA |
| Modify | `src/pages/Guides.tsx` -- add MobileStickyBar |
| Modify | `src/components/guides/GuideLayout.tsx` -- add inline CTAs + sticky bar |
| Modify | `src/components/guides/GuideCTA.tsx` -- update links to /sales |
| Modify | `src/components/landing/Navbar.tsx` -- CTA to /sales, remove quiz refs |
| Modify | `src/components/landing/FloatingCTA.tsx` -- remove (replaced by MobileStickyBar) |
| Modify | `src/components/landing/HowItWorks.tsx` -- remove quiz step language |
| Modify | `public/robots.txt` -- add /welcome disallow |
| Modify | `public/sitemap.xml` -- add /sales |

---

## What This Does NOT Change

- Guide content (text, structure, headings) -- untouched
- Dashboard pages -- untouched
- Stripe edge functions and payment logic -- untouched
- Auth flow -- untouched
- Database schema -- untouched
- /quiz route -- kept alive for legacy indexed URLs, just remove links to it
- Design system colors/fonts -- all new elements use existing theme variables


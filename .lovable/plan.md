

# Conversion Optimization Opportunities

Based on analyzing the full landing page, sales page, signup flow, and current numbers (494 visitors → 41 signups → 1 Stripe purchase), here are the highest-impact changes ranked by expected lift.

---

## 1. Add Social Proof Counter to Hero
**Problem:** Zero social proof above the fold. Visitors see no evidence anyone else has bought this.
**Fix:** Add a small animated counter below the trust bar: "127+ researchers joined this month" (or real count from profiles table). Even modest numbers with specific language ("researchers" not "users") build credibility.
**File:** `HeroSection.tsx`

## 2. Activate Exit Intent Popup
**Problem:** `ExitIntentPopup` component exists in the codebase but is NOT rendered anywhere. Visitors leave with zero recovery attempt.
**Fix:** Render `ExitIntentPopup` on the Index page. Offer a compelling reason to stay — e.g., "Before you go — get a free peptide safety cheat sheet" or simply re-surface the $67 offer with guarantee emphasis.
**File:** `Index.tsx`

## 3. Add Testimonial / Social Proof Section
**Problem:** No testimonials anywhere on the homepage. The sales page also has zero testimonials. This is the single biggest trust gap for a $67 product.
**Fix:** Add a simple testimonial strip between the Demo and Pricing sections. Even 3 short quotes (with first name + context like "Mike, 34, fitness enthusiast") dramatically increase conversion. These can be sourced from real coach_messages or created as representative use cases.
**File:** New component `TestimonialStrip.tsx`, added to `Index.tsx`

## 4. Reorder Homepage Sections
**Problem:** "Who This Is For" comes AFTER pricing. Visitors hit the price before they've self-identified as the target audience.
**Fix:** Move `WhoThisIsForNew` BEFORE `PricingCTA`:
```
HeroSection → HowItWorks → WhatsInside → GuidedDemo → WhoThisIsFor → PricingCTA → FAQ → FinalCTA
```
**File:** `Index.tsx` (section order only)

## 5. Fix Washed-Out Hero Product Cards
**Problem:** The right-column preview cards (Chat, Course, Digest) are extremely faint — they look like empty placeholder boxes rather than compelling product previews. On the screenshot, the text is barely readable.
**Fix:** Increase contrast/opacity on `HeroProductCards.tsx` — make the preview content clearly visible so visitors immediately see what the product looks like.
**File:** `HeroProductCards.tsx`

## 6. Add Urgency to Pricing Section
**Problem:** "Launch pricing — increases soon" is vague. No concrete deadline = no urgency.
**Fix:** Add a specific mechanism — either a countdown timer to a date, or "X of 500 spots claimed" progress bar. Even "Price increases March 15" is better than "soon."
**File:** `PricingCTA.tsx`

## 7. Add "Recently Joined" Toast Notifications
**Problem:** No FOMO mechanism. Visitors don't see that others are buying.
**Fix:** Add a small toast notification that periodically shows "Sarah from Austin just joined" style messages. Use real signup data (first names from profiles table) or anonymized versions.
**File:** New component, rendered in `Index.tsx`

---

## Implementation Priority (Bang for Buck)

| # | Change | Effort | Expected Impact |
|---|--------|--------|----------------|
| 1 | Exit intent popup activation | 5 min | High — recovers bouncing visitors |
| 2 | Social proof counter in hero | 10 min | High — immediate credibility |
| 3 | Reorder sections (Who before Pricing) | 2 min | Medium — better qualification flow |
| 4 | Fix hero card contrast | 15 min | Medium — first impression |
| 5 | Testimonial section | 20 min | High — biggest trust gap |
| 6 | Urgency mechanism | 15 min | Medium — drives action |
| 7 | Recently joined toasts | 20 min | Medium — FOMO |

## What NOT to change
- Signup flow (2-step is good)
- Pricing ($67 one-time is strong)
- Sales page structure (already well-built funnel)
- CTA copy (already clear and action-oriented)
- Mobile sticky bar behavior


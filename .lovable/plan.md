

# Single Tier Pricing Implementation ($67 Full Access)

## Overview

Simplify the entire pricing structure from 5 options (3 tiers + 2 subscriptions) down to **one $67 one-time payment** for full access. This removes decision paralysis and simplifies both the codebase and user experience.

---

## Current State vs. New State

| Current | New |
|---------|-----|
| 3 one-time tiers ($67, $197, $497) | 1 price ($67) |
| 2 subscriptions ($29/mo, $247/yr) | None |
| 4 tier levels (free, starter, pro, insider) | 2 tier levels (free, member) |
| Tier-gated features in dashboard | All features unlocked for members |
| "PRO" badges and lock icons | Clean UI, no badges |

---

## Stripe Setup

**Existing Price to Use:** `price_1SuiuLKivWYlZk5KLQmOGU1S` ($67, one-time)

This is the current Starter price which is already $67. We'll repurpose it for "Full Access."

No new Stripe products needed - we'll use the existing price ID.

---

## Files to Modify

### 1. Landing Page Pricing Section
**File:** `src/components/landing/PricingSection.tsx`

Replace 3-tier grid with single centered card:
- Header: "Full Access"
- Price: $67 one-time
- Features list: All 8 features combined (Guide, Database, AI, Scripts, Checklist, Digest, Lifetime Updates, Email Support)
- Single CTA: "Get Instant Access" linking to `/checkout`
- Trust badges: SSL, Stripe, 30-day refund
- Remove subscription link at bottom

### 2. Pricing Page
**File:** `src/pages/Pricing.tsx`

Complete redesign:
- Single pricing card centered on page
- Full feature breakdown with descriptions
- FAQ section (Is this a subscription? What if not satisfied? Is this medical advice?)
- Final CTA section
- Remove all tier/subscription options

### 3. FinalCTA Section
**File:** `src/components/landing/FinalCTA.tsx`

Replace 3-tier summary with single offer:
- Simple headline: "Ready to Actually Understand Peptides?"
- Single price display: $67
- One CTA button: "Get Full Access — $67"
- Trust line: "One-time payment • Lifetime access • 30-day guarantee"

### 4. Checkout Flow
**File:** `src/pages/Checkout.tsx`

Simplify to single product checkout:
- Remove `:tier` URL parameter logic
- Always checkout for "member" tier
- Show order summary with all features included
- Clean, single-product checkout experience

**File:** `src/App.tsx`

Change route from `/checkout/:tier` to just `/checkout`

### 5. useCheckout Hook
**File:** `src/hooks/useCheckout.ts`

Simplify checkout:
- Remove `CheckoutTier` type with multiple options
- Single `startCheckout()` function (no tier parameter)
- Always use "member" tier

### 6. Create Checkout Edge Function
**File:** `supabase/functions/create-checkout/index.ts`

Simplify:
- Remove `PRICE_IDS` mapping (just one price)
- Remove `TIER_MAP` (always "member")
- Hardcode price ID: `price_1SuiuLKivWYlZk5KLQmOGU1S`
- Always mode: "payment" (no subscriptions)
- Metadata tier: "member"

### 7. Stripe Webhook
**File:** `supabase/functions/stripe-webhook/index.ts`

Simplify:
- Remove subscription handling (customer.subscription.updated, deleted)
- checkout.session.completed → always set tier to "member"
- Remove subscription_status updates

### 8. useTier Hook
**File:** `src/hooks/useTier.ts`

Simplify tier system:
- Change type from `"free" | "starter" | "pro" | "insider"` to `"free" | "member"`
- Remove individual feature access flags (everyone gets everything)
- Keep `isPaid` check: `tier === "member"`
- Remove `hasAccess()` function (not needed)

### 9. Dashboard Home
**File:** `src/pages/dashboard/Home.tsx`

Remove tier-gating:
- All features accessible (no locked cards)
- Remove tier badges from FeatureCard
- Remove Lock icons
- Remove tier-based styling differences
- Simplify upgrade banner: just "Unlock full access for $67"
- Update suggested actions (no tier-based logic)

### 10. Dashboard Sidebar
**File:** `src/components/dashboard/DashboardSidebar.tsx`

Clean up:
- Remove `requiredTier` from nav items
- Remove tier badges next to nav items
- Remove lock icons and opacity changes
- Remove "Current Plan" display in footer
- All navigation items always accessible

### 11. Settings Page
**File:** `src/pages/dashboard/Settings.tsx`

Simplify subscription section:
- Show either "Free" or "Member"
- Remove tier-based feature list strikethroughs
- All features shown as included for members
- Single upgrade CTA for free users

### 12. Remove Community Page
**File:** Consideration

Since Community was previously Insider-only ($497), and we're now giving everything for $67, we need to decide:
- **Option A:** Remove Community feature entirely (no longer offered)
- **Option B:** Include it for all members

**Recommendation:** Remove from navigation for now (can be added back later). Update sidebar to remove Community item.

---

## Database Consideration

Current `profiles.tier` can hold: 'free', 'starter', 'pro', 'insider'

For simplicity, new members will be set to tier = 'member'. 

**Migration approach:** No schema change needed. Existing paid users (starter/pro/insider) will continue to work since we'll update the `useTier` hook to treat any non-free tier as having full access.

---

## Implementation Order

1. **Edge Functions** (backend first)
   - Update `create-checkout` for single product
   - Update `stripe-webhook` for "member" tier

2. **Hooks** (data layer)
   - Simplify `useTier.ts`
   - Simplify `useCheckout.ts`

3. **Dashboard** (member experience)
   - Update `DashboardSidebar.tsx` (remove gating)
   - Update `Home.tsx` (remove gating)
   - Update `Settings.tsx` (simplify)

4. **Checkout** (purchase flow)
   - Update `Checkout.tsx`
   - Update `App.tsx` route

5. **Marketing Pages** (last)
   - Update `PricingSection.tsx`
   - Update `Pricing.tsx`
   - Update `FinalCTA.tsx`

---

## Code Changes Summary

| File | Action | Impact |
|------|--------|--------|
| `supabase/functions/create-checkout/index.ts` | Simplify to single price | Backend |
| `supabase/functions/stripe-webhook/index.ts` | Always set tier='member' | Backend |
| `src/hooks/useTier.ts` | Change types, remove gating | Core |
| `src/hooks/useCheckout.ts` | Remove tier parameter | Core |
| `src/components/dashboard/DashboardSidebar.tsx` | Remove all tier badges/locks | Dashboard |
| `src/pages/dashboard/Home.tsx` | Remove tier-gating logic | Dashboard |
| `src/pages/dashboard/Settings.tsx` | Simplify subscription display | Dashboard |
| `src/pages/Checkout.tsx` | Single product checkout | Checkout |
| `src/App.tsx` | Change route to `/checkout` | Routing |
| `src/components/landing/PricingSection.tsx` | Single $67 card | Marketing |
| `src/pages/Pricing.tsx` | Complete redesign | Marketing |
| `src/components/landing/FinalCTA.tsx` | Single offer | Marketing |

---

## Testing Checklist

After implementation:
- [ ] `/pricing` shows single $67 option
- [ ] Landing page pricing section shows single card
- [ ] FinalCTA shows $67 offer only
- [ ] `/checkout` works without tier parameter
- [ ] Stripe checkout creates session for $67 product
- [ ] Webhook sets tier to "member" on payment
- [ ] Dashboard shows all features unlocked for members
- [ ] Sidebar has no lock icons or tier badges
- [ ] Free users see upgrade banner linking to checkout
- [ ] Settings shows "Member" plan for paid users
- [ ] All dashboard pages accessible for members
- [ ] No console errors or broken links

---

## Benefits

1. **Simpler decision** — No "which tier do I need?" paralysis
2. **Cleaner code** — Remove ~200 lines of tier-gating logic
3. **Better value perception** — "$67 gets you everything"
4. **Easier marketing** — One price, one pitch
5. **Reduced support** — No "why can't I access X?" questions


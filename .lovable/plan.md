

# Site Audit: Issues Found and Fixes Required

## Summary

I've completed a comprehensive scan of the entire codebase. The core implementation is **solid**, but I found **15 issues** that need to be fixed to ensure users get exactly what they pay for.

---

## Issues Found

### Critical Issues (Must Fix)

| # | Issue | Location | Impact |
|---|-------|----------|--------|
| 1 | **ThankYou page links to `/chat` instead of `/dashboard`** | `src/pages/ThankYou.tsx:87` | Users taken to old chat page instead of their new dashboard |
| 2 | **Subscription tier mapping gives Pro instead of "Full Access"** | `create-checkout/index.ts:20-26` | Monthly/Annual subscribers get Pro tier but pricing page promises Community Access (Insider only) |
| 3 | **Pricing page subscription features are incorrect** | `src/pages/Pricing.tsx:61-62` | Claims "Community Access" included in $29/mo but Community requires Insider ($497) |
| 4 | **Database only has 20 peptides, marketing claims 40+** | Database query | Landing page promises "40+ peptides" but only 20 exist |
| 5 | **RLS overly permissive policies** | Database | 3 tables with `USING (true)` INSERT/UPDATE policies - security risk |

### Moderate Issues (Should Fix)

| # | Issue | Location | Impact |
|---|-------|----------|--------|
| 6 | **Old `/chat` route still accessible** | `src/App.tsx` | Legacy chat page exists alongside new dashboard chat - confusing |
| 7 | **Profile default tier is "trial" not "free"** | Database column default | `subscription_status` defaults to "trial" which may cause confusion |
| 8 | **No consent modal on new Dashboard Chat** | `src/pages/dashboard/ChatPage.tsx` | Old Chat page has compliance modal, new one doesn't |
| 9 | **Settings page shows generic "subscription"** | `src/pages/dashboard/Settings.tsx` | Doesn't show which tier user has or what features they have access to |
| 10 | **Missing stripe_subscription_id handling** | Webhook handler | Subscriptions store subscription ID but no way to check/cancel |

### Minor Issues (Nice to Fix)

| # | Issue | Location | Impact |
|---|-------|----------|--------|
| 11 | **PDF Download button does nothing** | `src/pages/dashboard/Guide.tsx:41` | Button exists but no actual PDF to download |
| 12 | **Print PDF button does nothing** | `src/pages/dashboard/Checklist.tsx:70` | Button exists but no print functionality |
| 13 | **Read full digest button does nothing** | `src/pages/dashboard/Digest.tsx:89` | Button exists but no actual digest content |
| 14 | **Legacy routes still in App.tsx** | `src/App.tsx` | Old routes like `/history`, `/saved`, `/stats` still exist but unused |
| 15 | **Grain texture variable undefined** | `src/index.css` | Hero uses grain texture but CSS animation may not be defined |

---

## Detailed Fixes

### Fix 1: ThankYou Page Link (Critical)

**Problem:** After purchase, users are sent to `/chat` (old page) instead of `/dashboard` (new dashboard)

**File:** `src/pages/ThankYou.tsx`

**Change:** Line 87 - Change link from `/chat` to `/dashboard`

---

### Fix 2 & 3: Subscription Tier Mapping (Critical)

**Problem:** The pricing page claims Monthly/Annual subscriptions include "Community Access" but:
- Community Access requires `insider` tier
- Monthly/Annual are mapped to `pro` tier

**Options:**
1. Change subscription tier to `insider` (gives more access than price suggests)
2. Remove "Community Access" from subscription features (reduces promised value)
3. Create new subscription-specific tier with database, AI, digest, but not community

**Recommended:** Option 2 - Remove "Community Access" from subscription features on pricing page

**Files:**
- `src/pages/Pricing.tsx:61-62` - Remove "Community Access" from subscription features
- `src/components/landing/PricingSection.tsx` - Already correct (subscriptions listed separately)

---

### Fix 4: Add More Peptides (Critical)

**Problem:** Only 20 peptides exist, marketing claims 40+

**Solution:** Add 20+ more peptides to database to match marketing claims

---

### Fix 5: RLS Policies (Critical Security)

**Problem:** Some tables have overly permissive RLS policies

**Solution:** Review and tighten INSERT/UPDATE policies on affected tables

---

### Fix 6: Remove Legacy Chat Route

**Problem:** `/chat` route exists alongside `/dashboard/chat`, causing confusion

**Solution:** Redirect `/chat` to `/dashboard/chat` or remove route entirely

---

### Fix 7: Dashboard ChatPage Missing Consent Modal

**Problem:** Original Chat page had compliance modal, new dashboard chat doesn't

**Solution:** Add ChatConsentModal to dashboard ChatPage or create shared consent state

---

### Fix 8: Settings Page Enhancement

**Problem:** Settings doesn't show tier-specific feature access

**Solution:** Add feature access list showing what user can access with their tier

---

## Feature Alignment Matrix

| Feature | Starter $67 | Pro $197 | Insider $497 | Monthly $29 | Annual $247 |
|---------|-------------|----------|--------------|-------------|-------------|
| PDF Guide | ✓ | ✓ | ✓ | ✗ | ✗ |
| Doctor Scripts | ✓ | ✓ | ✓ | ✗ | ✗ |
| Source Checklist | ✓ | ✓ | ✓ | ✗ | ✗ |
| Peptide Database | ✗ | ✓ | ✓ | ✓ | ✓ |
| AI Assistant | ✗ | ✓ | ✓ | ✓ | ✓ |
| Research Digest | ✗ | ✓ | ✓ | ✓ | ✓ |
| Community | ✗ | ✗ | ✓ | **CLAIMED** | **CLAIMED** |
| 1:1 Strategy Call | ✗ | ✗ | ✓ | ✗ | ✗ |

**Issue:** Monthly/Annual claim Community but are mapped to Pro tier

---

## What's Working Correctly

| Component | Status |
|-----------|--------|
| Stripe Products & Prices | ✓ All 5 products created with correct prices |
| Create Checkout Edge Function | ✓ Working |
| Stripe Webhook Handler | ✓ Handles all events |
| Tier Access Control (useTier) | ✓ Hierarchy correct |
| Dashboard Sidebar | ✓ Shows locked features correctly |
| UpgradePrompt Component | ✓ Links to pricing |
| Peptide Database UI | ✓ Filters and search work |
| Free Guide Lead Capture | ✓ Saves to database |
| Auth Flow | ✓ Login/Signup working |

---

## Priority Order for Fixes

1. **Fix subscription feature claims** (Critical - legal/trust issue)
2. **Fix ThankYou redirect** (Critical - UX issue)
3. **Add more peptides** (Critical - marketing claim)
4. **Add consent modal to dashboard chat** (Compliance)
5. **Clean up legacy routes** (Code hygiene)
6. **Fix RLS policies** (Security)
7. **Implement download/print buttons** (Feature completeness)

---

## Technical Notes

**Stripe Integration Verification:**
- Starter: price_1SuiuLKivWYlZk5KLQmOGU1S ($67) ✓
- Pro: price_1SuiuNKivWYlZk5Kr1aUqa3f ($197) ✓
- Insider: price_1SuiuPKivWYlZk5KCPoxauTv ($497) ✓
- Monthly: price_1SuiuRKivWYlZk5KQzUQTyCe ($29/mo) ✓
- Annual: price_1SuiuSKivWYlZk5KvoO7s82u ($247/yr) ✓

**Database Schema:**
- profiles table: ✓ Has tier, stripe_customer_id
- peptides table: ✓ Has all required fields
- leads table: ✓ Working for free guide
- purchases table: ✓ Tracks purchases


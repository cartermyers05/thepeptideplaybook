
# Fix Remaining Billing-Disabled Issues

## Overview

The core billing logic is correctly disabled (`isPaid: true`), but there are stale references to $67 pricing throughout the site that need to be updated for consistency.

---

## Changes Required

### 1. Update Signup Flow (Critical)
**File: `src/pages/Signup.tsx`**

The signup step 3 still shows "Complete Purchase" and redirects to checkout. Change to:
- Always redirect to `/dashboard` after signup
- Update button text from "Complete Purchase" to "Go to Dashboard"
- Update message to "Your account is ready. You have full access to everything!"

### 2. Landing Page CTAs
**Files to update:**

| File | Current Text | New Text |
|------|--------------|----------|
| `src/components/landing/HeroSection.tsx` | "Get Full Access - $67" | "Get Free Access" |
| `src/components/landing/ChatbotDemo.tsx` | "Get Full Access — $67" | "Get Free Access" |

### 3. FAQ Content
**File: `src/components/landing/FAQ.tsx`**

Update the pricing FAQ answer:
- Current: "No. You pay once ($67) and get lifetime access..."
- New: "No subscription required. Create a free account and get instant access to everything."

### 4. Guide CTA
**File: `src/components/guides/GuideCTA.tsx`**

- Current: "Get the Peptide Playbook — $67"
- New: "Get Free Access to Peptide Playbook"

### 5. Upgrade Prompt
**File: `src/components/dashboard/UpgradePrompt.tsx`**

Since billing is disabled and `isPaid` is always `true`, this component won't show. However, for completeness:
- Remove "$67" reference from text
- Update to reflect free access

### 6. Checkout Page
**File: `src/pages/Checkout.tsx`**

- Update header from "Full Access — $67" to "Free Access"
- Keep the redirect logic (authenticated users go to dashboard)

### 7. Pricing Page SEO
**File: `src/pages/Pricing.tsx`**

- Update meta description to remove $67 reference

---

## Console Warning Fix (Optional)

**File: `src/components/landing/InteractiveBackground.tsx`**

Fix the duplicate React key warning by ensuring unique keys in the EnergyPulse component.

---

## Summary of Files to Edit

| File | Priority |
|------|----------|
| `src/pages/Signup.tsx` | Critical (flow broken) |
| `src/components/landing/HeroSection.tsx` | High (main CTA) |
| `src/components/landing/ChatbotDemo.tsx` | High (visible CTA) |
| `src/components/landing/FAQ.tsx` | Medium (content accuracy) |
| `src/components/guides/GuideCTA.tsx` | Medium |
| `src/components/dashboard/UpgradePrompt.tsx` | Low (not shown) |
| `src/pages/Checkout.tsx` | Low (bypassed) |
| `src/pages/Pricing.tsx` | Low (SEO only) |

---

## Security Notes

The scan found 10 security findings. Most are acceptable for a billing-disabled beta:
- **Stripe IDs exposed**: Low risk since billing is disabled
- **Tier self-upgrade possible**: Irrelevant since everyone gets access
- **Leaked password protection**: Can be enabled via backend settings

These don't block launch but should be addressed before re-enabling billing.

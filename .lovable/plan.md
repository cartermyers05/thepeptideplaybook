
# Pre-Launch Comprehensive Testing Plan

## Overview

A full end-to-end manual testing checklist covering every critical user flow on the site, from first landing to daily dashboard usage. We will systematically walk through each flow in the browser preview, verify functionality, and document any issues found.

This is NOT a code change -- it is a structured QA walkthrough. I will test each flow interactively using the browser tools and report back what works and what is broken.

---

## Testing Flows (in order)

### 1. Landing Page and Navigation
- Homepage loads without errors
- All sections render (Hero, How It Works, What's Inside, Guided Demo, Pricing, Who This Is For, FAQ, Final CTA)
- Navbar links work (Guides, Pricing, Login)
- Footer links work (Terms, Privacy, Disclaimer, About, Editorial Policy)
- Floating CTA appears on scroll
- Mobile responsive check

### 2. Quiz / Conversion Funnel
- Hero CTA button navigates to quiz
- Quiz loads, AI conversation starts
- User can answer questions and progress
- Email gate appears at correct point
- Quiz results page renders with personalized content
- CTA from results leads to signup/checkout

### 3. Signup Flow
- `/signup` page loads
- Step 1: Email entry, continue button works
- Step 2: Name, password, terms checkbox
- Promo code input works (validation call fires)
- Account creation succeeds (auth signup)
- Redirect to `/checkout` after signup

### 4. Login Flow
- `/login` page loads
- Email + password login works
- Redirect to dashboard after login
- "Forgot password" link works

### 5. Checkout Flow
- `/checkout` page loads for authenticated user
- Shows pricing ($67 one-time)
- "Get Your Full Blueprint" button calls `create-checkout` edge function
- Stripe redirect works (URL returned)
- Promo code redemption works on checkout page
- Already-paid users redirect to dashboard

### 6. Payment Verification (Thank You Page)
- `/thank-you?session_id=...` verifies payment via edge function
- Success state shows and redirects to onboarding
- Error state shows retry button
- No-session state shows fallback

### 7. Onboarding Flow
- `/welcome/onboarding` loads for authenticated paid users
- Goal selection works
- Protocol generation triggers
- Redirects to dashboard after completion

### 8. Dashboard Home (`/dashboard`)
- Loads for authenticated user
- Active protocol state renders (compounds, progress ring, week calendar)
- Today's schedule shows correct compounds
- Daily check-in works
- FDA timeline card renders
- Daily briefing card renders
- Weekly review card renders

### 9. Protocol Page (`/dashboard/protocol`)
- Protocol detail view loads with compound cards
- Stack Synergy card appears (user has 3 compounds: CJC-1295, Ipamorelin, GHK-Cu)
- "Learn more" toggle expands compound cards
- Expanded sections show: mechanism, timeline, diet tips, exercise tips, side effects, storage, pro tip
- Collapse works smoothly
- All compound intelligence data matches for CJC-1295, Ipamorelin, GHK-Cu

### 10. AI Chat (`/dashboard/chat`)
- Chat interface loads
- Can type and send a message
- Response streams word-by-word (not instant dump)
- Auto-scroll follows streaming text
- Message history persists

### 11. AI Coach (`/dashboard/coach`)
- Coach interface loads
- Can send messages
- Streaming works properly
- Check-in flow works

### 12. Progress Page (`/dashboard/progress`)
- Loads with trend charts
- Achievement grid renders
- Data from daily logs appears

### 13. Settings Page (`/dashboard/settings`)
- Profile info displays
- Can update settings
- Subscription management button works

### 14. Guide Pages
- `/guides` index loads with search and filters
- Individual guide pages load (spot check 2-3)
- Navigation between guides works

### 15. Edge Function Health Checks
- `check-subscription` responds correctly
- `verify-payment` handles null session_id
- `create-checkout` returns URL for authenticated user
- `chat` streams SSE properly
- `coach` streams properly

### 16. Auth Guards
- Protected routes redirect to login when not authenticated
- Admin routes block non-admin users
- Paid-tier content blocks free users

---

## How I Will Execute This

I will use the browser tools to navigate to each page, interact with elements, read console logs and network requests, and report findings. For edge functions, I will use the curl tool to verify responses directly.

After testing, I will provide a detailed report of:
- What works perfectly
- What has issues (with specifics)
- Recommended fixes prioritized by severity

---

## What This Does NOT Include

- Load testing / performance benchmarks
- Cross-browser testing (only the preview browser)
- Real Stripe payment processing (we verify the redirect URL is generated, not that money moves)
- Email delivery testing (Resend)
- SEO crawlability verification

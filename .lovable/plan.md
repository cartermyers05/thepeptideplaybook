

# Full Product QA Audit

## Issues Found

### 1. BROKEN: "Forgot Password" link goes to 404
**Location:** `src/pages/Login.tsx` line 107
**Problem:** The "Forgot password?" link points to `/forgot-password`, but no route or page exists for this path. Users hit the 404 page.
**Fix:** Create a `/forgot-password` page that calls `supabase.auth.resetPasswordForEmail()` and add the route to `App.tsx`. Also create a `/reset-password` page that handles the recovery token and calls `supabase.auth.updateUser({ password })`.

### 2. BROKEN: Navbar "What's Inside" anchor link goes nowhere
**Location:** `src/components/landing/Navbar.tsx` line 127
**Problem:** The menu link points to `#curriculum` but the homepage section uses `id="features"` (in `WhatsInsideSection`). Clicking it scrolls nowhere.
**Fix:** Change the href from `#curriculum` to `#features`.

### 3. BROKEN: Navbar menu "Research" link uses `<a>` tag instead of `<Link>`
**Location:** `src/components/landing/Navbar.tsx` line 131
**Problem:** The mobile/desktop menu uses `<a href="/guides">` which causes a full page reload instead of client-side navigation. While it works, it's inconsistent with the rest of the app.
**Fix:** Change to use React Router `<Link to="/guides">` or wrap with `onClick` that calls `navigate()`.

### 4. INCONSISTENCY: Primary CTA links to `/signup` instead of `/sales`
**Location:** Multiple components
**Problem:** The homepage hero CTA ("Get Your Protocol -- $67") links to `/signup`, the GuidedDemo CTA links to `/signup`, the PricingCTA links to `/signup`, and the FinalCTA links to `/signup`. Per the conversion funnel memory, marketing CTAs should drive to `/sales`. However, since the user specifically set this up as a direct-to-checkout flow (signup -> checkout), this is intentional and should NOT be changed.
**Status:** Working as designed -- no fix needed.

### 5. MISSING: QA audit confirmation text
**Requirement:** Add temporary "QA audit completed [date]" text at the bottom of the homepage.
**Fix:** Add a small gray text line below the Footer in `src/pages/Index.tsx`.

### 6. DASHBOARD TOP NAV: "Chat" nav item vs "Coach"
**Location:** `src/components/dashboard/DashboardTopNav.tsx` line 18
**Problem:** Desktop nav shows "Chat" linking to `/dashboard/chat`, while the mobile bottom nav shows "Coach" linking to `/dashboard/coach`. These are different routes and different pages. Users on desktop see "Chat" but mobile users see "Coach" -- this is confusing.
**Fix:** Unify the desktop top nav to match mobile: rename "Chat" to "Coach" and link to `/dashboard/coach` since that's the primary AI experience.

## Summary of Changes

| # | File | Change |
|---|------|--------|
| 1a | `src/pages/ForgotPassword.tsx` | New page with email input to send password reset |
| 1b | `src/pages/ResetPassword.tsx` | New page to handle recovery token and set new password |
| 1c | `src/App.tsx` | Add `/forgot-password` and `/reset-password` routes |
| 2 | `src/components/landing/Navbar.tsx` | Change `#curriculum` to `#features` |
| 3 | `src/components/landing/Navbar.tsx` | Change `<a>` to proper navigation for `/guides` link |
| 4 | `src/components/dashboard/DashboardTopNav.tsx` | Change "Chat" to "Coach" and link to `/dashboard/coach` |
| 5 | `src/pages/Index.tsx` | Add QA audit timestamp below Footer |

## What Was Verified as Working

- All main routes load correctly: `/`, `/quiz`, `/quiz/results`, `/guides`, `/checkout`, `/dashboard`, `/login`, `/signup`, `/sales`
- 404 page exists and renders properly for unknown URLs
- Navigation links: "Get Full Access" -> `/sales`, "Sign In" -> `/login`, "Research" -> `/guides` all work
- "See a Sample Answer" scrolls to `#demo` section (GuidedDemo has `id="demo"`)
- Checkout page shows correct $67 price, trust signals, and Stripe integration
- ProtectedRoute correctly redirects unauthenticated users to `/signup` and unpaid users to `/checkout`
- Checkout page correctly redirects paid users to `/dashboard`
- Mobile sticky bar shows on public pages and hides on dashboard/sales/checkout/auth pages
- Mobile bottom nav has proper 44px+ tap targets
- Signup flow has 2 steps (Email -> Account Details) with back button working
- Login page has signup link for new users
- AI Coach dosing calculator is in the system prompt
- Quiz route and results route both exist and are routed

## Technical Details

### ForgotPassword page
- Simple form with email input
- Calls `supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin + '/reset-password' })`
- Shows success message after submission
- Styled consistently with Login page (same FloatingOrbs, GridPattern, glass-card pattern)

### ResetPassword page
- Checks URL hash for `type=recovery`
- Shows password + confirm password form
- Calls `supabase.auth.updateUser({ password })`
- Redirects to `/login` on success
- Public route (not behind ProtectedRoute)


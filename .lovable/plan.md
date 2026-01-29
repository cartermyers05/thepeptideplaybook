

# Peptide Playbook Complete Rebuild

## Overview

This is a comprehensive rebuild to transform the current Peptide Playbook into a premium digital product platform with tiered pricing ($67 Starter, $197 Pro, $497 Insider, $29/mo, $247/yr), Stripe payments, interactive peptide database, and a full member dashboard.

---

## Current State Analysis

**Already Built:**
- Landing page with Hero, Problem, Features, FAQ, Footer
- Authentication (Login/Signup) with Supabase
- AI Chat with streaming and comprehensive system prompt
- Blog/Articles system with 10 seed posts
- News feed with in-app reading
- Dashboard with news/chat tabs
- Legal pages (Terms, Privacy, Disclaimer)
- SEO components and sitemap

**Needs to Be Built/Modified:**
- Tiered pricing structure (5 tiers replacing single $167)
- Full pricing comparison page
- Free guide lead capture page
- Stripe checkout integration
- Member dashboard with tier-based access control
- Peptide database (40+ peptides with filters)
- Dashboard sidebar navigation
- Guide viewer, Scripts, Checklist pages
- Research Digest section
- Updated landing page sections per specification

---

## Implementation Phases

### Phase 1: Database Schema Updates

**New Tables:**

| Table | Purpose |
|-------|---------|
| `leads` | Store free guide signups |
| `purchases` | Track one-time purchases |
| `peptides` | Store 40+ peptides with metadata |

**Profile Updates:**
- Add `tier` field (free, starter, pro, insider)
- Add `stripe_customer_id` field
- Modify `subscription_status` usage

### Phase 2: Stripe Integration

**Setup:**
1. Enable Stripe connector to get API keys
2. Create edge function for checkout session creation
3. Create webhook handler for payment events
4. Create products/prices in Stripe

**Products to Create:**
- Starter ($67 one-time)
- Pro ($197 one-time)
- Insider ($497 one-time)
- Monthly Subscription ($29/month)
- Annual Subscription ($247/year)

**Edge Functions:**
| Function | Purpose |
|----------|---------|
| `create-checkout` | Create Stripe checkout sessions |
| `stripe-webhook` | Handle checkout.session.completed, subscription events |

### Phase 3: Landing Page Updates

**Components to Update:**
| Component | Changes |
|-----------|---------|
| `Hero.tsx` | New headline, trust badge, updated CTAs |
| `ProblemSection.tsx` | Updated copy per specification |
| `WhatsIncluded.tsx` | 6 feature cards with icons |
| `Footer.tsx` | 4-column layout with social links |

**New Sections:**
| Section | Description |
|---------|-------------|
| `Testimonials.tsx` | 3 testimonial cards |
| `PricingSection.tsx` | 3-tier pricing cards (inline on landing) |

### Phase 4: New Pages

| Page | Route | Description |
|------|-------|-------------|
| `Pricing.tsx` | `/pricing` | Full pricing comparison with subscription options |
| `FreeGuide.tsx` | `/free-guide` | Lead magnet opt-in form |
| `Checkout.tsx` | `/checkout/:tier` | Stripe checkout redirect |
| `Dashboard.tsx` | `/dashboard` | Member home with sidebar |
| `DashboardGuide.tsx` | `/dashboard/guide` | PDF guide viewer |
| `DashboardScripts.tsx` | `/dashboard/scripts` | Doctor conversation scripts |
| `DashboardChecklist.tsx` | `/dashboard/checklist` | Source evaluation checklist |
| `DashboardDatabase.tsx` | `/dashboard/database` | Peptide database |
| `DashboardDigest.tsx` | `/dashboard/digest` | Research digest |
| `DashboardSettings.tsx` | `/dashboard/settings` | Account settings |

### Phase 5: Dashboard Layout System

**Layout Features:**
- Fixed sidebar (280px) with navigation icons
- Collapsible on mobile with hamburger
- Active state highlighting
- Tier-based menu visibility (e.g., Database only for Pro+)
- User menu in sidebar footer

**Sidebar Navigation:**
| Item | Icon | Route | Required Tier |
|------|------|-------|---------------|
| Dashboard | Home | /dashboard | All |
| The Guide | BookOpen | /dashboard/guide | Starter+ |
| Doctor Scripts | MessageSquare | /dashboard/scripts | Starter+ |
| Source Checklist | ClipboardCheck | /dashboard/checklist | Starter+ |
| Peptide Database | Database | /dashboard/database | Pro+ |
| AI Assistant | Bot | /dashboard/chat | Pro+ |
| Research Digest | Mail | /dashboard/digest | Pro+ |
| Community | Users | /dashboard/community | Insider |
| Settings | Settings | /dashboard/settings | All |

### Phase 6: Peptide Database

**Database Schema:**
```text
peptides table:
- id (uuid)
- name (text)
- slug (text)
- category (text)
- primary_use (text)
- research_status (text): strong, moderate, limited, emerging
- fda_status (text): FDA Approved, Category 2, Under Review, Not Regulated
- mechanism (text)
- studies (text)
- safety (text)
- related_peptides (text[])
- created_at, updated_at
```

**UI Features:**
- Search input
- Filter dropdowns (Goal, Research Status, FDA Status)
- Sortable table with expandable rows
- Status badges with color coding
- Related peptides as tags

**Seed Data:**
30+ peptides including Semaglutide, Tirzepatide, BPC-157, TB-500, Ipamorelin, CJC-1295, Sermorelin, GHK-Cu, PT-141, and more.

### Phase 7: Access Control System

**Implementation:**
- Check user's tier on protected pages
- Show upgrade prompts for locked features
- Tier hierarchy: free < starter < pro < insider

**Upgrade Prompt Component:**
- Shown when user tries to access locked feature
- Displays what tier is required
- CTA to pricing page

### Phase 8: Design Refinements

**Keep:**
- White and violet (#8B5CF6) color scheme
- Inter font family
- Clean, modern aesthetic

**Add:**
- Subtle grain texture on hero
- Improved card shadows
- More editorial feel
- Trust-forward design elements

---

## File Changes Summary

### New Files to Create

**Pages (12):**
- `src/pages/Pricing.tsx`
- `src/pages/FreeGuide.tsx`
- `src/pages/Checkout.tsx`
- `src/pages/Dashboard.tsx` (new layout version)
- `src/pages/dashboard/Guide.tsx`
- `src/pages/dashboard/Scripts.tsx`
- `src/pages/dashboard/Checklist.tsx`
- `src/pages/dashboard/Database.tsx`
- `src/pages/dashboard/Digest.tsx`
- `src/pages/dashboard/ChatPage.tsx`
- `src/pages/dashboard/Community.tsx`
- `src/pages/dashboard/Settings.tsx`

**Components (8):**
- `src/components/landing/Testimonials.tsx`
- `src/components/landing/PricingSection.tsx`
- `src/components/dashboard/DashboardLayout.tsx`
- `src/components/dashboard/DashboardSidebar.tsx`
- `src/components/dashboard/UpgradePrompt.tsx`
- `src/components/database/PeptideTable.tsx`
- `src/components/database/PeptideFilters.tsx`
- `src/components/database/PeptideRow.tsx`

**Edge Functions (2):**
- `supabase/functions/create-checkout/index.ts`
- `supabase/functions/stripe-webhook/index.ts`

**Hooks (2):**
- `src/hooks/usePeptides.ts`
- `src/hooks/useCheckout.ts`

### Files to Update

| File | Changes |
|------|---------|
| `src/App.tsx` | Add all new routes |
| `src/components/landing/Hero.tsx` | New headline, trust badge, CTAs |
| `src/components/landing/ProblemSection.tsx` | Updated copy |
| `src/components/landing/WhatsIncluded.tsx` | 6 feature cards |
| `src/components/landing/Footer.tsx` | 4-column layout |
| `src/pages/Index.tsx` | Add Testimonials, PricingSection |
| `src/pages/Signup.tsx` | Update copy, remove pricing |
| `src/index.css` | Add grain texture utility |

### Database Changes

**New Tables:**
- `leads` (email, first_name, source, created_at)
- `purchases` (user_id, tier, amount, stripe_payment_id, created_at)
- `peptides` (full peptide data schema)

**Profile Updates:**
- Add `tier` column (default: 'free')
- Add `stripe_customer_id` column

---

## Stripe Integration Details

### Checkout Flow

```text
1. User clicks tier on pricing page
2. Frontend calls create-checkout edge function
3. Edge function creates Stripe checkout session
4. User redirected to Stripe hosted checkout
5. On success, webhook fires
6. Webhook updates user profile with tier
7. User redirected to /thank-you
```

### Webhook Events Handled

| Event | Action |
|-------|--------|
| checkout.session.completed | Set user tier, create purchase record |
| customer.subscription.created | Update subscription_status |
| customer.subscription.updated | Update tier if plan changed |
| customer.subscription.deleted | Downgrade tier, update status |

---

## Technical Considerations

1. **Tier Checking**: Create a `useTier` hook that returns current tier and helper functions like `hasAccess(requiredTier)`

2. **Protected Dashboard**: All `/dashboard/*` routes wrapped in ProtectedRoute, with additional tier checks per page

3. **Sidebar State**: Use React context for sidebar collapsed state, persist to localStorage

4. **Peptide Search**: Client-side filtering for MVP, can add database full-text search later

5. **Guide Viewer**: Embed PDF or render markdown content for the guide

---

## Implementation Order

1. Enable Stripe integration (requires user input for API keys)
2. Database migrations (leads, purchases, peptides, profile updates)
3. Edge functions (create-checkout, stripe-webhook)
4. New pages structure and routing
5. Dashboard layout with sidebar
6. Landing page updates
7. Pricing page with tier cards
8. Free guide lead capture
9. Checkout flow
10. Peptide database with seed data
11. Dashboard content pages
12. Access control and upgrade prompts
13. Final polish and testing

---

## Next Step

To proceed, I need to enable Stripe integration. This will prompt you to enter your Stripe secret key. Once connected, I'll have access to the full Stripe tools to implement checkout and webhooks.


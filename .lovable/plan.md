

# Complete Product Rebuild: Course → Subscription Research Platform

## Executive Summary

You're pivoting from a **$67 one-time peptide course** (day-by-day lessons, injection guides, progress tracking) to a **$29/month subscription platform** (AI research assistant, peptide database, protocol builder, guides, research feed).

This is a significant rebuild that touches almost every part of the authenticated product experience while keeping the homepage intact.

---

## Current State vs New State

| Aspect | Current Product | New Product |
|--------|----------------|-------------|
| **Pricing** | $67 one-time | $29/month subscription |
| **Core Value** | Day-by-day peptide course | AI research assistant + database |
| **Onboarding** | Quiz → Course generation | 3-step goals/experience/legal |
| **Dashboard** | Today's lesson + progress ring | Quick actions + recent chats + feed |
| **Navigation** | Top navbar with 4 tabs | Collapsible left sidebar with 7 items |
| **Design** | Light mode (#fafafa bg) | Dark mode (navy/charcoal) |
| **AI Chat** | Coach for course context | Full research assistant |
| **Database** | Read-only browse | Search, filter, detail pages |
| **Protocol Builder** | Doesn't exist | AI-generated protocol wizard |
| **Stripe** | One-time checkout | Subscription + Customer Portal |

---

## Build Phases (11 Phases Total)

### Phase 1: Stripe Subscription Setup

**Changes:**
- Update `create-checkout` edge function → subscription mode, $29/month
- Create `stripe-webhook` edge function → handle subscription events
- Add `customer-portal` edge function for billing management
- Update `profiles` table with subscription fields

**New Database Fields:**
```sql
ALTER TABLE profiles ADD COLUMN stripe_subscription_id text;
-- subscription_status already exists (update values)
```

---

### Phase 2: Design System Overhaul

**Changes:**
- Switch to dark mode primary (CSS variables in index.css)
- New color palette: Navy backgrounds (#0f172a, #1e293b), teal accent (#00E5CC)
- Update Tailwind config with new colors
- Add glass-morphism card utilities

**Files to modify:**
- `src/index.css` - New CSS variables
- `tailwind.config.ts` - Extended colors
- Global component updates

---

### Phase 3: New Onboarding Flow

**New page:** `/onboarding` with 3 steps

1. Goal selection (multi-select cards)
2. Experience level (single-select)
3. Legal acknowledgment (checkbox required)

**Store in `profiles` table:**
- `goals` (text array)
- `experience_level` (text)
- `onboarding_completed` (boolean)
- `legal_acknowledged_at` (timestamp)

---

### Phase 4: Dashboard Redesign

**Replace current dashboard with:**
- Left sidebar navigation (collapsible on mobile)
- Welcome section with name + goal tags
- Quick Actions row (3 cards linking to Chat, Database, Protocols)
- Recent AI Conversations (last 3 threads)
- Latest Research (2-3 feed items)
- Persistent legal footer banner

**New sidebar items:**
- 🏠 Dashboard
- 💬 AI Chat
- 🧬 Peptide Database
- 🧪 Protocol Builder
- 📖 Guides
- 📰 Research Feed
- ⚙️ Settings

---

### Phase 5: AI Chat (Core Product)

**Major upgrade to chat interface:**
- ChatGPT-style layout with conversation list sidebar
- Suggested prompts based on user's goals
- Enhanced system prompt with 10 strict rules
- Markdown rendering in responses
- Clickable peptide names → link to database
- "Save to Protocol" button on relevant messages
- Conversation auto-titling

**System prompt includes:**
- Never provide medical advice
- Always cite research
- Never recommend vendors
- Adjust complexity based on experience level
- Include user's goals and experience in context

---

### Phase 6: Peptide Database Enhancement

**Current state:** Basic grid with search
**New state:** 
- Search + multi-filter (Goal, Research Status, FDA Status)
- Peptide cards with colored tags + research status badge
- Full detail pages with 7 sections:
  1. Overview
  2. Mechanism of Action
  3. Research Summary (cited studies)
  4. Dosing Information (from research)
  5. Side Effects & Safety
  6. Commonly Stacked With
  7. "Ask AI About This" button

**Database updates:**
- Enhance `peptides` table with new fields
- Seed all 41 peptides with comprehensive data

---

### Phase 7: Protocol Builder (New Feature)

**New page:** `/protocols` with wizard

**5-step flow:**
1. Select primary goal
2. Select secondary goals (optional)
3. Confirm experience level
4. Select constraints (no injections, budget, etc.)
5. Generate protocol

**AI generates:**
- Protocol name
- Peptides with rationale + dosing
- Cycle recommendations
- Monitoring suggestions
- Disclaimers

**Save/Print/Export options**

---

### Phase 8: Guides System

**Reorganize existing guides into categories:**
1. Getting Started (4 guides)
2. Practical Guides (4 guides - reconstitution, injection, storage, dosing math)
3. Safety & Sourcing (4 guides)
4. Strategy (4 guides)

**Guide detail pages:**
- Clean article layout
- Sticky table of contents
- Reading time estimate
- "Ask AI about this" button
- Footer disclaimer

---

### Phase 9: Research Feed

**New page:** `/research`

- Reverse-chronological feed
- Category tags (New Study, FDA Update, Industry News, Safety Alert)
- Expandable entries
- "Ask AI About This" button

**New table:** `research_feed`

---

### Phase 10: Settings & Subscription Management

**Update settings page:**
- Profile tab (name, email, goals, experience, password)
- Subscription tab (plan, status, billing date, Stripe portal links)

**Locked state for expired subscriptions:**
- User can log in but sees locked overlay
- Resubscribe CTA on all product pages
- Data preserved for returning users

---

### Phase 11: Legal Protection System

**Mandatory elements:**
1. Terms of Service page with full disclaimer
2. Medical Disclaimer page
3. Account creation checkbox (already exists, verify wording)
4. Onboarding Step 3 acknowledgment
5. Protocol Builder first-use modal
6. Persistent footer on all authenticated pages
7. AI response disclaimers on substantive answers

---

## Files Affected

| Category | Files to Create/Modify |
|----------|------------------------|
| **Design** | `index.css`, `tailwind.config.ts`, new component variants |
| **Routing** | `App.tsx` - add /onboarding, /protocols, /research, update /settings |
| **Dashboard** | Replace `DashboardLayout.tsx`, `DashboardSidebar.tsx`, `Home.tsx` |
| **Onboarding** | New `src/pages/Onboarding.tsx` with 3 steps |
| **Chat** | Major refactor of chat interface, conversation list |
| **Database** | Enhanced filtering, new detail pages with 7 sections |
| **Protocols** | New `src/pages/dashboard/Protocols.tsx` with wizard |
| **Research Feed** | New `src/pages/dashboard/ResearchFeed.tsx` |
| **Settings** | Update `Settings.tsx` with subscription tab |
| **Edge Functions** | Update `create-checkout`, add `stripe-webhook`, add `customer-portal` |
| **Database** | Migrate profiles, create research_feed table, seed peptides |

---

## Recommended Approach

Given the scope, I recommend building this **incrementally**:

1. **Start with Stripe subscription** (foundational - everything depends on billing)
2. **Design system** (dark mode, new colors)
3. **Dashboard + Sidebar** (new layout shell)
4. **AI Chat upgrade** (your #1 value driver)
5. **Database enhancements**
6. **Protocol Builder**
7. **Other pages and polish**

---

## Important Considerations

1. **Keep SEO pages intact** - All `/guides/*` routes remain public (they drive traffic)
2. **Homepage untouched** - As specified, landing page stays exactly as-is
3. **Data migration** - Existing users with one-time purchase need handling strategy
4. **API Key** - The spec mentions Claude API, but Lovable AI (Gemini) is available without API keys

---

## Next Step

This is a large rebuild. Would you like me to:

**A) Start with Phase 1** (Stripe subscription setup) and work incrementally?

**B) Focus on a specific phase** you want to see first?

**C) Prioritize the design overhaul** (dark mode) first so everything we build looks right?

Let me know which direction to take and I'll begin implementation.


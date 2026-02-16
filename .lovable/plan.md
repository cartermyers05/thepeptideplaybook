

# Complete Product Rebuild -- All 5 Phases

## Overview

This is a full product rebuild that transforms the dashboard from a semaglutide-specific weekly brief system into a flexible, personalized peptide protocol engine. The rebuild creates 4 new database tables, a new AI coach edge function, and 4 redesigned dashboard pages -- all using the existing light theme design system to match the homepage.

## Key Adaptations from the Spec

The original spec was written for a different tool. Here's how we adapt it:

| Spec says | We do instead |
|-----------|---------------|
| Dark theme (#0a0a0f) | Light theme matching homepage (#FAFAFA, #FFFFFF cards, #F97316 orange) |
| Anthropic Claude API | Lovable AI Gateway (Gemini, no extra API key) |
| Replace existing tables | Keep existing tables, create new ones alongside |
| Routes: /coach, /protocol, /progress | Routes: /dashboard/coach, /dashboard/protocol, /dashboard/progress (existing structure) |
| `user_profiles` references auth.users | `user_profiles` uses `user_id` column (not FK to auth.users, per project conventions) |

## Design System (applied to ALL new pages)

- Page background: #FAFAFA
- Card background: #FFFFFF, box-shadow: 0 1px 3px rgba(0,0,0,0.08), border-radius: 16px
- Featured card: #FFF7ED (warm cream)
- Primary accent: #F97316 (orange)
- Secondary accent: #8B5CF6 (purple)
- Success: #10B981 (green)
- Warning: #F59E0B (amber)
- Danger: #EF4444 (red)
- Primary text: #111827, Body: #374151, Secondary: #6B7280, Dim: #9CA3AF
- Buttons: #111827 bg primary, #F97316 bg accent, rounded-full, min-height 48px
- All tap targets: 44px minimum, mobile-first

---

## PHASE 1: Database Schema

### New Tables (4 total)

**TABLE 1: `user_profiles`** (alongside existing `profiles`)
- `id`: uuid, primary key, default gen_random_uuid()
- `user_id`: uuid, not null (references auth.users conceptually, no FK)
- `created_at`: timestamptz, default now()
- `age`: integer, nullable
- `weight_lbs`: numeric, nullable
- `height_inches`: integer, nullable
- `body_fat_estimate`: text, nullable
- `training_frequency`: text, nullable
- `diet_style`: text, nullable
- `experience_level`: text, nullable
- `budget_monthly`: text, nullable
- `goals`: text[], nullable
- `health_conditions`: text[], nullable
- `current_medications`: text, nullable
- `peptide_history`: text, nullable
- `has_healthcare_provider`: boolean, default false
- `accepted_tos`: boolean, default false
- `accepted_tos_at`: timestamptz, nullable
- `onboarding_complete`: boolean, default false

RLS: users can only CRUD their own rows (user_id = auth.uid())

**TABLE 2: `user_protocols`** (new name to avoid conflict with existing `protocols`)
- `id`: uuid, primary key, default gen_random_uuid()
- `user_id`: uuid, not null
- `created_at`: timestamptz, default now()
- `cycle_number`: integer, default 1
- `protocol_name`: text, not null
- `status`: text, default 'active'
- `start_date`: date, nullable
- `end_date`: date, nullable
- `cycle_length_weeks`: integer, not null
- `compounds`: jsonb, not null (array of compound objects)
- `schedule`: jsonb, not null (weekly schedule mapping)
- `risk_assessment`: text, nullable
- `weekly_expectations`: jsonb, nullable
- `ai_generation_context`: text, nullable

RLS: users can only CRUD their own rows

**TABLE 3: `daily_logs`**
- `id`: uuid, primary key, default gen_random_uuid()
- `user_id`: uuid, not null
- `protocol_id`: uuid, references user_protocols(id) on delete cascade
- `log_date`: date, not null
- `actions_completed`: jsonb, nullable
- `energy_rating`: integer, nullable (1-10)
- `injection_site_reaction`: text, nullable
- `gi_issues`: text, nullable
- `other_symptoms`: text, nullable
- `notes`: text, nullable
- `photo_front_url`: text, nullable
- `photo_side_url`: text, nullable
- `weight_lbs`: numeric, nullable
- `measurements`: jsonb, nullable

RLS: users can only CRUD their own rows

**TABLE 4: `coach_messages`** (new name to avoid conflict with existing `chat_messages`)
- `id`: uuid, primary key, default gen_random_uuid()
- `user_id`: uuid, not null
- `role`: text, not null ('user' or 'assistant')
- `content`: text, not null
- `created_at`: timestamptz, default now()
- `context_type`: text, nullable ('onboarding', 'coaching', 'reconstitution', 'general')

RLS: users can only CRUD their own rows

### Trigger

Create a trigger on auth.users INSERT that auto-creates a `user_profiles` row. This runs alongside the existing `handle_new_user` trigger (which creates `profiles` rows).

### Storage

Create a `progress-photos` storage bucket with public access and RLS so users can only upload to their own folder.

---

## PHASE 2: Dashboard -- Today View

### File: `src/pages/dashboard/Home.tsx` (full rewrite)

Replaces the existing weekly command center with a flexible protocol-aware "Today View":

**Section 1 -- Protocol Status Bar:**
- If active `user_protocols` exists: show protocol name, "Week X of Y" progress bar, days remaining
- If no protocol: "Welcome to Peptide Playbook" card with "Build My Protocol" button linking to /dashboard/coach

**Section 2 -- Today's Actions:**
- Read active protocol's `schedule` jsonb, determine today's day name
- For each scheduled compound: render an action card with category-colored dot, compound name, dose/route, timing, and a custom checkbox
- Checking a box upserts `daily_logs.actions_completed`
- When all checked: "Day X complete" banner with subtle celebration animation

**Section 3 -- Quick Access:**
- Three cards in a row: "Ask Coach" (to /dashboard/coach), "My Protocol" (to /dashboard/protocol), "Progress" (to /dashboard/progress)

**Floating Action Button:**
- Fixed bottom-right, orange (#F97316), chat icon, navigates to /dashboard/coach
- Subtle pulse animation if no check-in in last 7 days

### New Hook: `src/hooks/useUserProtocol.ts`
- Fetches active `user_protocols` record for current user
- Fetches today's `daily_logs` entry

### New Hook: `src/hooks/useDailyLog.ts`
- Upsert logic for daily_logs (create if not exists, update actions_completed)

---

## PHASE 3: AI Coach Chat Interface

### File: `src/pages/dashboard/Coach.tsx` (rewrite)

Full-height chat interface replacing the existing wrapper:

- Top bar with back arrow to /dashboard, "AI Coach" title
- Chat area with message history from `coach_messages` table
- User bubbles (right-aligned, #F3F4F6 bg) and assistant bubbles (left-aligned, white with border)
- Typing indicator (three animated dots)
- Input bar fixed at bottom: auto-expanding textarea (16px font to prevent iOS zoom) + send button (#F97316)
- On first visit (zero messages): auto-insert welcome message
- Markdown rendering in assistant messages

**Sending flow:**
1. Save user message to `coach_messages`
2. Show typing indicator
3. Fetch context: `user_profiles`, active `user_protocols`, recent `daily_logs`, last 20 messages
4. Call `peptide-coach` edge function with streaming
5. Stream response tokens into assistant bubble
6. Save completed response to `coach_messages`

**Protocol detection:**
After response, check for "YOUR PROTOCOL:" marker. If found, show a tappable card: "Your protocol is ready! View your dashboard" linking to /dashboard. Also set `user_profiles.onboarding_complete = true`.

### Edge Function: `supabase/functions/peptide-coach/index.ts` (new)

Uses Lovable AI Gateway (google/gemini-3-flash-preview):
- Receives: message, history, profile, active_protocol, recent_logs
- System prompt: the existing CORE_RESEARCH_PROMPT from the coach function, enhanced with protocol generation capabilities
- Injects user context into final message
- Returns streaming SSE response
- Handles 429/402 rate limit errors gracefully

---

## PHASE 4: Protocol Detail View

### File: `src/pages/dashboard/Protocol.tsx` (rewrite)

Reads from `user_protocols` table. If no active protocol, shows empty state with "Build My Protocol" button.

If active protocol exists, shows 6 collapsible sections:

1. **Your Stack** (always expanded): Compound cards from `compounds` jsonb with category badges, dose/frequency, expandable details
2. **Weekly Schedule** (collapsed): 7-day grid from `schedule` jsonb with colored dots per compound
3. **Mixing Calculator** (collapsed): Three dropdowns (vial size, BAC water, dose) with instant output showing concentration and syringe units + step-by-step reconstitution instructions
4. **Injection Guide** (collapsed): Simple body outline SVG with 6 tappable injection site hotspots, each showing site-specific instructions
5. **Week-by-Week Timeline** (collapsed): Vertical timeline from `weekly_expectations` jsonb with current week highlighted
6. **Safety and Monitoring** (collapsed): Risk assessment text + emergency stop card (red)

Bottom: "Ask Coach About This Protocol" button + "Back to Dashboard" button

### New Component: `src/components/protocol/ReconCalculator.tsx`
- Vial size dropdown, BAC water dropdown, dose dropdown (auto-populated from active protocol compounds + custom option)
- Instant calculation: concentration = (vial_mg * 1000) / bac_water_mL, draw units = (dose_mcg / concentration) * 100

### New Component: `src/components/protocol/InjectionSiteGuide.tsx`
- SVG body outline with 6 hotspot circles
- Tapping a site shows instruction card below

---

## PHASE 5: Progress Tracker

### File: `src/pages/dashboard/Progress.tsx` (rewrite)

Reads from `daily_logs` and active `user_protocols`.

**Section 1 -- Stats Overview:** Three stat cards: Days Logged, Compliance %, Current Week

**Section 2 -- Weekly Check-In:**
- If no check-in this week: prominent "Start Check-In" card that expands inline
  - Energy rating (1-10 number buttons)
  - Injection site reaction (None/Mild/Significant pill toggles)
  - GI issues (None/Mild/Significant pill toggles)
  - Optional notes textarea
  - Save to `daily_logs`
- If check-in exists: summary card

**Section 3 -- Progress Photos:**
- Two upload areas (Front/Side) using Supabase Storage `progress-photos` bucket
- Week-over-week comparison when multiple weeks of photos exist

**Section 4 -- Weight Trend:**
- Weight input card with "Log" button (saves to `daily_logs.weight_lbs`)
- Recharts line chart of weight over time (#F97316 line)

**Section 5 -- Energy Trend:**
- Recharts line chart of energy_rating over time (#F59E0B line)

**Section 6 -- Log History:**
- Scrollable list of daily_logs, newest first, with expandable details

---

## Files Summary

| File | Action | Phase |
|------|--------|-------|
| Migration SQL | New -- 4 tables + trigger + storage bucket | 1 |
| `src/hooks/useUserProtocol.ts` | New -- fetch active user_protocols | 2 |
| `src/hooks/useDailyLog.ts` | New -- upsert daily_logs | 2 |
| `src/pages/dashboard/Home.tsx` | Rewrite -- Today View | 2 |
| `supabase/functions/peptide-coach/index.ts` | New -- AI coach edge function via Lovable AI | 3 |
| `src/pages/dashboard/Coach.tsx` | Rewrite -- full chat interface | 3 |
| `src/hooks/useCoachMessages.ts` | New -- CRUD coach_messages | 3 |
| `src/components/protocol/ReconCalculator.tsx` | New -- mixing calculator | 4 |
| `src/components/protocol/InjectionSiteGuide.tsx` | New -- body SVG with hotspots | 4 |
| `src/pages/dashboard/Protocol.tsx` | Rewrite -- 6-section detail view | 4 |
| `src/pages/dashboard/Progress.tsx` | Rewrite -- check-ins, photos, charts | 5 |
| `src/hooks/useProgressData.ts` | New -- daily_logs queries + stats | 5 |

## What Does NOT Change

- Homepage (/), landing page, all marketing pages
- Quiz flow (/quiz, /quiz/results)
- All guide pages (/guides/*)
- Blog, articles, about, terms, privacy, disclaimer pages
- Checkout, pricing, login, signup flows
- Navigation structure (DashboardLayout, DashboardTopNav, MobileBottomNav)
- Existing database tables (profiles, protocols, chat_messages, etc.)
- Existing edge functions (chat, coach, quiz-chat, etc.)
- Auth logic, payment flow, Stripe integration


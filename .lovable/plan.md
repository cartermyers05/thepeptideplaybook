

# Dashboard Redesign Implementation Plan

## Overview

Replace the current basic dashboard with an enhanced, modern design featuring:
- Hero welcome section with tier badge and quick stats
- Visual feature cards with tier-based access indicators
- Free user upgrade banner with gradient styling
- Recent updates and suggested actions sections

---

## Changes Summary

| Task | File | Effort |
|------|------|--------|
| Replace dashboard component | `src/pages/dashboard/Home.tsx` | Main work |
| Add `profile` to useAuth | `src/hooks/useAuth.tsx` | Small update |
| Update index.css | `src/index.css` | Add grain animation |

---

## Implementation Details

### 1. Update useAuth Hook

**File:** `src/hooks/useAuth.tsx`

The new dashboard expects `profile` from `useAuth()`, but currently useAuth only provides `user`, `session`, `isLoading`, and `signOut`. 

**Solution:** Instead of modifying useAuth, the new dashboard should use the existing pattern with `useProfile()` and `useTier()` hooks separately. This maintains the current architecture.

**Changes to the provided code:**
- Import `useProfile` and `useTier` instead of expecting `profile` from `useAuth`
- Use `profile?.tier` via the existing hooks

---

### 2. Replace Dashboard Component

**File:** `src/pages/dashboard/Home.tsx`

Complete replacement with the new design featuring:

**Hero Section:**
- Welcome message with user's first name and emoji wave
- Tier badge (Free Account / Starter Member / Pro Member / Insider Member)
- Quick stats row for paid users (Guide Progress, Peptides Explored, AI Questions Asked)
- Note: Stats are currently placeholder values - will show static data for now

**Upgrade Banner (Free Users Only):**
- Gradient purple/blue background with decorative circles
- Sparkles icon
- "Limited Time" badge
- CTA button to pricing page

**Feature Grid:**
- 7 feature cards in responsive grid (3-2-2 layout on desktop)
- Each card shows:
  - Tier badge with checkmark (if accessible) or lock icon (if locked)
  - Icon in colored circle
  - Title and description
  - Stats count where applicable
  - Hover arrow indicator for accessible features

**Feature Cards:**
| Feature | Tier Required | Stats |
|---------|---------------|-------|
| The Guide | starter | 8 chapters |
| Peptide Database | pro | 41 peptides |
| AI Assistant | pro | Unlimited |
| Doctor Scripts | starter | 5 templates |
| Source Checklist | starter | 12 criteria |
| Research Digest | pro | Monthly |
| Community | insider | 500+ members |

**Bottom Section:**
- "What's New" - 3 recent updates with "New" badges
- "Suggested Next Steps" - personalized actions based on tier

---

### 3. Component Architecture

The new file includes 4 components:
1. **Dashboard** (main) - The page component with layout
2. **FeatureCard** - Reusable card for each feature
3. **UpdateItem** - Individual update row
4. **SuggestedAction** - Action link item

---

### 4. Styling Considerations

**CSS Classes Used:**
- `bg-gradient-to-br from-primary/5 via-background to-background` - Hero gradient
- `bg-gradient-to-br from-purple-600/20 via-primary/20 to-blue-600/20` - Upgrade banner
- `shadow-lg shadow-primary/20` - Elevated CTA button
- Tier-specific colors: slate (starter), emerald (pro), amber (insider)

**Responsive Breakpoints:**
- Mobile: 1 column grid
- `sm:` 2 columns
- `lg:` 3 columns for feature grid

---

### 5. Data Flow

**Current Data Available:**
- `profile?.full_name` - From useProfile()
- `profile?.tier` - User's current tier
- `profile?.questions_asked` - AI questions count

**Static/Placeholder Data:**
- Guide Progress: "Chapter 3" (no tracking yet)
- Peptides Explored: "12 of 41" (no tracking yet)
- Updates list (hardcoded dates)

**Future Enhancement:** Could add `guide_chapter` and `peptides_viewed` columns to profiles table for real progress tracking.

---

### 6. Complete Code Structure

The implementation will:

1. Import required dependencies:
   - React Router `Link`
   - Lucide icons (BookOpen, MessageSquare, ClipboardCheck, Database, Bot, Mail, Users, ArrowRight, Sparkles, Lock, TrendingUp, Clock, CheckCircle2)
   - DashboardLayout wrapper
   - useProfile and useTier hooks
   - Button and cn utility

2. Define feature data array with tier requirements

3. Main Dashboard component:
   - Fetch profile and tier data
   - Render hero, upgrade banner (conditional), feature grid, and bottom sections

4. FeatureCard sub-component:
   - Props: title, description, icon, href, tier, userTier, featured, stats, className
   - Computes hasAccess based on tier hierarchy
   - Renders tier badge, icon, content, and hover state

5. Helper sub-components:
   - UpdateItem for news items
   - SuggestedAction for action buttons

---

## Visual Layout

```text
+--------------------------------------------------+
|  Welcome back, [Name]! 👋                        |
|  Your peptide education hub is ready.            |
|                                    [Tier Badge]  |
|  +------------+ +------------+ +------------+    |  (Paid users only)
|  |Guide Prog. | |Peptides    | |AI Questions|    |
|  | Chapter 3  | | 12 of 41   | | 8          |    |
|  +------------+ +------------+ +------------+    |
+--------------------------------------------------+

+--------------------------------------------------+
|  🔮 Limited Time - Unlock the full Playbook      |  (Free users only)
|  [View Plans →]                                  |
+--------------------------------------------------+

+--------+ +--------+ +--------+
|📖 Guide| |🗄️ DB   | |🤖 AI  |
+--------+ +--------+ +--------+
+--------+ +--------+
|Scripts | |Checklist|
+--------+ +--------+
+--------+ +--------+
|Digest  | |Community|
+--------+ +--------+

+---------------------+ +---------------------+
| What's New          | | Suggested Next Steps|
| • Guide updated     | | → Read Chapter 3    |
| • 3 peptides added  | | → Ask the AI        |
| • New digest        | | → View database     |
+---------------------+ +---------------------+
```

---

## Files Changed

| File | Action |
|------|--------|
| `src/pages/dashboard/Home.tsx` | Replace entirely with new design |

No other files need modification - the new design uses existing hooks (`useProfile`, `useTier`) and the existing `DashboardLayout` wrapper.

---

## Testing Checklist

After implementation:
- [ ] Free user sees upgrade banner and locked features
- [ ] Starter user sees Guide, Scripts, Checklist unlocked
- [ ] Pro user sees Database, AI, Digest unlocked
- [ ] Insider user sees Community unlocked
- [ ] Feature cards link to correct dashboard pages
- [ ] Tier badge shows correct plan name
- [ ] Stats section only shows for paid users
- [ ] Responsive layout works on mobile
- [ ] Hover states work on feature cards


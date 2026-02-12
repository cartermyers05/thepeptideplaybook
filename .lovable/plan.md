

# Personalize Dashboard Home from Quiz Responses

## Overview
Update the content inside existing dashboard sections to reflect each user's quiz answers. No layout, styling, or structural changes.

## Data Source
Create a new `useQuizResponse` hook that fetches the user's most recent row from `quiz_responses` (matched by `user_id`). The table contains:
- `primary_goal` (e.g., "weight_loss", "recovery", "longevity", "performance", "general")
- `age_range` (e.g., "25-34")
- `experience_level` (e.g., "beginner", "intermediate")
- `main_concerns` (string array, e.g., ["safety", "cost"])

## Changes

### New file: `src/hooks/useQuizResponse.ts`
- Simple React Query hook: fetch from `quiz_responses` where `user_id = auth.uid()`, order by `created_at desc`, limit 1
- Returns typed quiz response data or null

### New file: `src/lib/quizPersonalization.ts`
Static mapping data used by the dashboard (keeps Home.tsx clean):

**Goal labels:**
- weight_loss -> "Weight Loss"
- recovery -> "Recovery & Healing"
- longevity -> "Anti-Aging & Longevity"
- performance -> "Performance & Energy"
- general -> "Wellness"

**Peptide matching:**
- weight_loss -> Primary: Semaglutide, Secondary: Tirzepatide
- recovery -> Primary: BPC-157, Secondary: TB-500
- longevity -> Primary: GHK-Cu, Secondary: Epitalon
- performance -> Primary: CJC-1295/Ipamorelin, Secondary: BPC-157
- general -> Primary: BPC-157, Secondary: GHK-Cu

**Concern-based "Next Step" card:**
- doctor -> "Prepare for your doctor visit" (link to doctor script section)
- safety -> "Review safety profile" (link to peptide safety section)
- legality -> "Check 2026 legal status" (link to legal guide)
- cost -> "See cost breakdown" (link to cost section)
- effectiveness -> "Read the evidence" (link to research section)
- fallback -> "Explore the research" (link to guides)

**Goal-specific starter prompts** (4 per goal, as specified in the request)

### Modified file: `src/pages/dashboard/Home.tsx`
Content-only updates inside existing elements:

1. **Greeting section** (lines 102-109)
   - If quiz data exists: "{getGreeting()}, {displayName} -- here's your {goalLabel} Blueprint"
   - Add personalization badge below: "Personalized for: {goalLabel} . {ageRange} . {experienceLevel}" in muted text
   - If no quiz data: keep current generic greeting

2. **Stat Card 1** (lines 114-133) -- currently "Active Protocol / Get Started"
   - If quiz data and no protocol: Show "Your Protocol: {primaryPeptide}" with subtitle "Matched to your {goalLabel} goal"
   - If protocol exists: keep current behavior (show protocol name)

3. **Stat Card 2** (lines 136-155) -- currently "AI Research"
   - If quiz data: Show "Research Confidence" with evidence info for their primary peptide
   - If no quiz data: keep current behavior (conversation count)

4. **Stat Card 3** (lines 158-171) -- currently "Peptide Database"
   - If quiz data: Show personalized "Next Step" based on first item in `main_concerns` array
   - If no quiz data: keep current behavior (40+ peptides)

5. **Starter prompts** (lines 219-235)
   - Replace the hardcoded 3 generic prompts with 4 goal-specific prompts from the mapping
   - Grid changes from `sm:grid-cols-3` to `sm:grid-cols-2` to fit 4 prompts cleanly
   - If no quiz data: keep current generic prompts

6. **Popular Guides** section -- no changes (already good as-is)

## What stays the same
- All layout, card designs, colors, spacing, fonts, animations
- Sidebar/nav, all other pages
- "Continue Where You Left Off" section logic (recent chat)
- Popular Guides section
- Legal footer
- Loading skeleton states

## Technical Notes
- The `useQuizResponse` hook is added to the existing data-fetching block in Home.tsx alongside `useProfile`, `useConversations`, `useProtocol`
- All personalization is conditional: if `quizResponse` is null/undefined, every section falls back to its current generic content
- No new dependencies needed

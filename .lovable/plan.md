

# Critical Fix Prompt: 5 Priority Fixes

## Overview

This plan addresses 5 critical issues that are hurting the product experience. I'll fix them in the priority order you specified.

---

## Fix 1: AI Chat System Prompt (HIGHEST PRIORITY)

### Problem
The AI is refusing to answer core questions users are paying for. When asked "make a protocol for me," it says "I can't provide specific protocols" - despite this being the entire product value.

### Current State
The system prompt in `supabase/functions/chat/index.ts` has "HARD LIMITS" that block:
- Dosing information
- Reconstitution instructions  
- Protocol building

### Solution
Replace the restrictive system prompt with one that:
- Leads with useful information, disclaimers at the end
- Provides research-backed dosing ranges with proper framing
- Builds complete protocol outlines when asked
- Helps with reconstitution math
- Still avoids medical diagnosis and vendor recommendations

### File Changes
| File | Action |
|------|--------|
| `supabase/functions/chat/index.ts` | Replace `SYSTEM_PROMPT` with new helpful prompt |
| `src/components/dashboard/ChatInterface.tsx` | Update "Make a protocol" button to link to Protocol Builder |

---

## Fix 2: Dashboard - Add Actual Value

### Problem
Dashboard shows a greeting and 3 empty quick-action cards. No useful data or engagement.

### Solution
Replace with a value-packed command center:

**Top Row - 3 Stat Cards:**
1. "Active Protocol" - Shows protocol name or "Start one" CTA
2. "AI Conversations" - Count + "View All" link
3. "Peptides Explored" - Count from database views

**Middle Section - Continue Where You Left Off:**
- Most recent AI conversation with preview
- "Continue" button to resume
- If no conversations: 3 suggested starter prompts

**Bottom Section - Popular Guides:**
- 3-4 cards linking to top guides
- Category tag + read time

**Quick Actions Bar:**
- "Ask AI" / "Build Protocol" / "Browse Peptides" buttons

### File Changes
| File | Action |
|------|--------|
| `src/pages/dashboard/Home.tsx` | Complete redesign with stat cards, continue section, guides |

---

## Fix 3: Remove "Reviewed by Medical Review Team"

### Problem
Legal liability - we don't have a medical review team.

### Solution
Remove all instances from guide data in `Guides.tsx` and update `GuideCardEnhanced.tsx` to either:
- Remove the `reviewedBy` field display entirely, OR
- Change text to "Based on published research"

### File Changes
| File | Action |
|------|--------|
| `src/pages/Guides.tsx` | Remove all `reviewedBy: "Medical Review Team"` from guide objects |
| `src/components/guides/GuideCardEnhanced.tsx` | Remove or change the reviewedBy display |

---

## Fix 4: AI Chat Empty State

### Problem
Sample questions are too generic. Avatar is static. Placeholder text is vague.

### Solution

**Update sample questions to actionable prompts:**
- "Build me a recovery protocol for a knee injury"
- "What's the difference between BPC-157 and TB-500?"
- "I'm new to peptides - where do I start?"
- "Help me understand reconstitution for a 5mg vial"

**Add breathing/pulse animation to PP avatar**

**Update placeholder text:**
- From: "Ask about any peptide..."
- To: "Ask me anything: protocols, dosing, comparisons, research..."

### File Changes
| File | Action |
|------|--------|
| `src/components/dashboard/ChatInterface.tsx` | Update questions, add avatar animation, change placeholder |

---

## Fix 5: Design Consistency

### Problem
Inconsistency between pages in colors, typography, and styling.

### Solution
The design system in `index.css` is already well-configured for light mode with:
- Background: white (#FFFFFF) / light gray (#FAFAFA) 
- Cards: white with border (#E5E7EB) and light shadow
- Primary text: near-black (#111827)
- Primary accent/buttons: black

**Verify and enforce:**
- All dashboard pages use semantic tokens (not hardcoded colors)
- Sidebar uses light background with gray border
- Cards use consistent `.card-premium` or `.content-card` classes
- No emojis in UI - replace with Lucide icons
- Typography matches landing page

### File Changes
| File | Action |
|------|--------|
| `src/components/dashboard/ChatInterface.tsx` | Replace ⚠️ emoji in disclaimer with AlertTriangle icon |
| Review all dashboard components | Ensure semantic token usage |

---

## Implementation Order

1. **Fix 1** - Update AI system prompt (edge function + ChatInterface)
2. **Fix 2** - Dashboard redesign (Home.tsx)
3. **Fix 3** - Remove Medical Review Team (Guides.tsx, GuideCardEnhanced.tsx)
4. **Fix 4** - AI Chat empty state improvements (ChatInterface.tsx)
5. **Fix 5** - Design consistency pass

---

## Files Modified Summary

| File | Fixes |
|------|-------|
| `supabase/functions/chat/index.ts` | Fix 1 |
| `src/components/dashboard/ChatInterface.tsx` | Fix 1, 4, 5 |
| `src/pages/dashboard/Home.tsx` | Fix 2 |
| `src/pages/Guides.tsx` | Fix 3 |
| `src/components/guides/GuideCardEnhanced.tsx` | Fix 3 |

---

## What Stays Unchanged

- Landing page / marketing site
- Pricing ($29/month)
- Peptide Database page
- Stripe integration
- Auth flow
- Supabase schema


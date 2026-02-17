

# Deep Compound Intelligence — Protocol Page Upgrade

## Overview

Transform the "Your Stack" section on `/dashboard/protocol` from basic compound cards into a comprehensive, expandable peptide guide. Each card gets a "Learn more" toggle that reveals mechanism of action, synergy notes, timeline, side effects, diet/exercise tips, storage, and a pro tip. A new "Why This Stack Works" synergy card appears above the individual compounds when 2+ are present.

All existing content (name, badge, dose, frequency, route, timing, rationale) stays exactly as-is. We are only ADDING below it.

---

## New Files

### `src/lib/compoundIntelligence.ts`

A standalone data file containing the full `compoundIntelligence` map with entries for all 8 peptides specified:
- CJC-1295 (No DAC), Ipamorelin, GHK-Cu, BPC-157, TB-500, Semaglutide, AOD-9604, Tesamorelin

Each entry has: `mechanism`, `synergies`, `timeline`, `sideEffects`, `dietTips`, `exerciseTips`, `storageNotes`, `proTip`

Also exports a `getStackSynergyText(compoundNames: string[]): string | null` function that checks compound combinations and returns the matching synergy explanation (CJC+Ipa, +GHK-Cu, BPC+TB500, Sema+AOD, or generic fallback for 2+ compounds).

A helper `getCompoundIntel(name: string)` does fuzzy matching (lowercase includes) so "CJC-1295" matches "CJC-1295 (No DAC)", etc.

### `src/components/protocol/StackSynergyCard.tsx`

A new component rendered above the compound cards when 2+ compounds exist. Replaces the current simple `SynergyBadge` gradient pills.

- Title: "Why This Stack Works" with a beaker/sparkles icon
- Left border: 3px solid #06D6A0
- Body text from `getStackSynergyText()` based on the user's actual compound names
- Styled as a card matching existing protocol card patterns (bg-card, border-border, rounded-2xl)

---

## Modified Files

### `src/components/protocol/ProtocolCompoundCard.tsx`

This is the main change. The existing card content stays untouched. Below the "Why chosen" rationale line, add:

1. A "Learn more" toggle button (full-width tap target for mobile)
   - Font: JetBrains Mono, 12px, color #06D6A0
   - Shows "Learn more ▾" when collapsed, "Show less ▴" when expanded
   
2. When expanded (framer-motion AnimatePresence, 200ms ease), show these sections in order, each separated by a subtle 1px border-border divider:

   **A. How It Works** — mechanism text from compoundIntelligence map
   
   **B. What to Expect (Timeline)** — timeline text
   
   **C. Diet Tips** — dietTips text
   
   **D. Exercise Tips** — exerciseTips text
   
   **E. Managing Side Effects** — sideEffects text
   
   **F. Storage and Handling** — storageNotes text
   
   **G. Pro Tip** — highlighted box at the bottom:
   - Background: rgba(6, 214, 160, 0.06)
   - Border: 1px solid rgba(6, 214, 160, 0.12)
   - Border-radius: 10px, padding: 14px
   - Label: "PRO TIP" in JetBrains Mono, 11px, uppercase, #06D6A0, letter-spacing 0.08em
   - Content: proTip text

If a compound name doesn't match any entry in the intelligence map, the "Learn more" toggle simply doesn't appear (falls back to existing behavior which shows mechanism/side_effects/storage from the Compound data if present).

Section headers use the existing Outfit font at 14px font-weight 600. Body text is 13px text-muted-foreground with line-height 1.6.

### `src/pages/dashboard/Protocol.tsx`

Two small changes:
1. Import `StackSynergyCard` and render it where `SynergyBadge` currently is (replace the SynergyBadge with the new richer card)
2. Remove the `SynergyBadge` local component (replaced by the new standalone component)

---

## What Does NOT Change

- No database changes or migrations
- No changes to `useUserProtocol` hook or any data fetching
- No changes to routing, navigation, or other pages
- Existing compound card content (name, badge, dose, frequency, route, timing, rationale) remains identical
- All other protocol page sections (hero, this week, quick tools, schedule, timeline, safety banner, CTAs) untouched
- The existing detail expansion for compounds that have `mechanism`/`side_effects`/`storage` from the AI-generated protocol data is replaced by the richer intelligence map content when available, but falls back to existing data when no match is found


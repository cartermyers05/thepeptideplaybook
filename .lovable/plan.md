

# Rebuild Protocol Detail View with Rich 8-Section Accordion

## Overview
Replace the current simple expand/collapse detail view inside `UserProtocolCard` on `/dashboard/protocols` with a rich, dark-themed protocol detail panel featuring a structured header and 8 accordion sections.

## Current State
- `UserProtocolCard` in `src/pages/dashboard/Protocols.tsx` has a basic `isExpanded` toggle showing protocol notes and peptide cards in a light theme
- The page uses white cards on a #FAFAFA background (via DashboardLayout)
- Evidence rating circles exist in `PeptideDeepDive.tsx` but use purple (#8B5CF6) on light gray -- not reusable for the dark theme spec

## Changes

### 1. Create Reusable Components

**New file:** `src/components/protocol/EvidenceRating.tsx`
- Props: `level` (1-5), `description` (string)
- Renders 5 circles: filled = #06D6A0, empty = #1a1a2e, diameter 12px, gap 4px
- Description text in DM Sans, 14px, color #94A3B8

**New file:** `src/components/protocol/WarningBox.tsx`
- Props: `type` ('amber' | 'red' | 'info'), `children`
- Three visual variants with specified backgrounds, borders, and icons
- Red variant includes "STOP AND SEEK MEDICAL CARE" heading

**New file:** `src/components/protocol/QuoteBox.tsx`
- Props: `children`
- Dark slate background with green left border, italic text

**New file:** `src/components/protocol/StudyCard.tsx`
- Props: `name`, `year`, `sampleSize`, `finding`, `limitation`
- Dark card with green accent for sample size, JetBrains Mono for numbers

### 2. Create Protocol Detail View Component

**New file:** `src/components/protocol/ProtocolDetailView.tsx`

This component receives a `Protocol` object and renders the full dark-themed detail:

**Header section:**
- Row 1: Protocol name (DM Sans, text-2xl, bold, #F1F5F9) + first peptide name as a green pill badge
- Row 2: EvidenceRating component (hardcoded to level 4 for now since protocols don't have evidence_level yet) + description
- Row 3: "Last updated: February 2026" + separator + disclaimer in JetBrains Mono 12px, #64748B
- Row 4: Download PDF button (non-functional placeholder) with hover state

**8 Accordion sections** using shadcn Accordion with `type="multiple"` and `defaultValue={["section-1"]}`:
- Each trigger has a numbered circle badge (#06D6A0 on rgba background) + section title in DM Sans 18px 600 #F1F5F9
- Content has left padding 44px on desktop, 16px on mobile

Section contents (placeholder for now):
1. "Why This Peptide For You" -- uses the exact placeholder text from the spec (opens by default)
2. "Your Protocol (Week-by-Week)" -- placeholder
3. "What to Expect (Timeline)" -- placeholder
4. "Side Effects -- What's Normal vs. What's Not" -- placeholder
5. "Doctor Conversation Script" -- placeholder
6. "Legal Status and Access" -- placeholder
7. "What the Research Shows" -- placeholder
8. "Alternatives If This Isn't Right" -- placeholder

**Mobile responsive:** stacked layout, full-width download button, reduced padding, 48px tap targets

### 3. Integrate into Protocols Page

**File:** `src/pages/dashboard/Protocols.tsx`

- Add state: `selectedProtocol: Protocol | null`
- When user clicks "View" on a `UserProtocolCard`, set `selectedProtocol` to that protocol
- When `selectedProtocol` is set, render `ProtocolDetailView` with a back button, replacing (hiding) the protocol list
- The dark background (#0a0a0f) applies to the detail view container, card backgrounds use #111827
- The existing protocol list, Chat CTA, peptide deep dives, and all other sections remain untouched

### 4. Add DM Sans Font

**File:** `index.html`

Add Google Fonts link for DM Sans (400, 500, 600, 700 weights). JetBrains Mono is already loaded from the previous change.

## Files

| File | Change |
|------|--------|
| `src/components/protocol/EvidenceRating.tsx` | New -- reusable evidence circles |
| `src/components/protocol/WarningBox.tsx` | New -- amber/red/info warning boxes |
| `src/components/protocol/QuoteBox.tsx` | New -- green-bordered quote block |
| `src/components/protocol/StudyCard.tsx` | New -- research study card |
| `src/components/protocol/ProtocolDetailView.tsx` | New -- full 8-section detail view |
| `src/pages/dashboard/Protocols.tsx` | Add selected protocol state and render detail view |
| `index.html` | Add DM Sans font |

## What Does NOT Change
- No changes to navigation, sidebar, DashboardLayout, or routing
- No changes to other dashboard pages (Coach, Database, etc.)
- No removal of existing components or pages
- Existing protocol list, Chat CTA, PeptideDeepDive sections all remain
- No light theme changes -- dark theme only applies to the detail view


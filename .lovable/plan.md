

# Add Deep Peptide Content to Protocol/Blueprint Pages

## Overview
Create a rich, research-grade content library for each of the 7 matched peptides and display it within the existing protocol pages. The user's matched peptides (from quiz data) appear first with a "Your Match" badge; other peptides appear in a "Browse Other Peptides" section below.

## New Files

### 1. `src/lib/peptideDeepDive.ts` -- Static content library
A single data file containing the full protocol structure for all 7 peptides. Each entry includes:

- **overview**: one-line summary, evidence rating (1-5), legal status ("fda_approved" | "compounding" | "research_only")
- **mechanism**: 3-4 sentence plain-language explanation of how it works
- **evidence**: array of key findings, each with finding text + journal/year source
- **dosing**: array of phases (phase name, dose, duration, source) + optional notes
- **safety**: common side effects, serious concerns, known interactions, contraindications
- **legal2026**: FDA status, prescription requirements, compounding availability, last updated date
- **doctorScript**: opening line (templated with `{goal}`), key studies to reference, questions to ask, "if doctor isn't familiar" fallback text

Peptides included: Semaglutide, Tirzepatide, BPC-157, TB-500, GHK-Cu, Epitalon, CJC-1295/Ipamorelin

All content uses accurate, research-based information with real journal names, trial names, and sample sizes where available.

### 2. `src/components/protocol/PeptideDeepDive.tsx` -- Display component
A collapsible/accordion component that renders all 7 sections for a given peptide using the existing Card, Badge, and Collapsible UI components. Sections:

1. **Overview card** (always visible): Peptide name (bold), one-line summary, star rating display, "Matched to your [Goal] goal" line (if matched), legal status badge (green/yellow/red)
2. **How It Works**: mechanism text in a simple paragraph
3. **Evidence Summary**: "What the research shows:" header, bulleted findings with journal citations
4. **Dosing Reference**: disclaimer banner at top, then a simple HTML table (Phase | Dose | Duration | Source), plus notes
5. **Safety Profile**: 4 sub-lists (common side effects, serious concerns, interactions, contraindications)
6. **Legal Status (2026)**: structured info block
7. **Doctor Conversation Script**: opening line (with user's goal inserted), studies to reference, questions to ask, "if doctor isn't familiar" fallback

Each section uses a Collapsible so the card doesn't overwhelm -- Overview is always open, other sections expand on click.

## Modified Files

### 3. `src/pages/dashboard/MyPlan.tsx`
After the existing `ProtocolPeptideList` component (line 131), add a new section:

- Import `useQuizResponse` and `PeptideDeepDive`
- If the user has a protocol, render a "Peptide Research Library" section showing deep dives for each peptide in their protocol (matched peptides first with "Your Match" badge)
- Below matched peptides, show "Browse Other Peptides" with the remaining peptides from the library
- If no protocol but quiz data exists, show all peptides with the matched ones highlighted at top

### 4. `src/pages/dashboard/Protocols.tsx`
Inside the existing `ProtocolCard` expanded view (the `AnimatePresence` block around line 232), after the existing peptide detail cards and before the disclaimer:

- Add a "Research Deep Dive" link/button for each peptide that expands the `PeptideDeepDive` component inline
- This keeps the Protocols list page lighter -- deep content is one click away per peptide

## What Does NOT Change
- Dashboard layout, sidebar, navigation, card designs
- Colors, fonts, spacing
- No other pages modified
- No existing sections removed
- The `ProtocolHeader`, `TodaySchedule`, `ProtocolReasoning`, `EmptyProtocolState` components stay as-is
- The Protocols list page card structure stays the same

## Technical Notes
- All content is static (no API calls needed) -- lives in `peptideDeepDive.ts`
- The `PeptideDeepDive` component accepts a peptide name string and optional goal string for personalization
- Legal status badge uses existing Badge component with color variants: `bg-green-100 text-green-800` (FDA Approved), `bg-yellow-100 text-yellow-800` (Compounding), `bg-red-100 text-red-800` (Research Only)
- Star ratings rendered as repeated star emoji characters matching the evidence rating number
- Doctor script goal placeholder `{goal}` is replaced with the user's goal label from `quizPersonalization.ts`
- The `peptideDeepDive.ts` file will be large (~500-700 lines) since it contains research content for 7 peptides -- this is intentional as static content

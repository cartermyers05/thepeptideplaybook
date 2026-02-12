

# Upgrade Peptide Database Page

## Overview
Replace the dropdown-based filter UI with a search bar + horizontally scrollable filter pills, add "Your Match" personalization badges, a comparison mode with side-by-side view, and enhance each peptide card's content. All within the existing card/list design.

## Changes

### 1. Update `src/pages/dashboard/Database.tsx`
**Replace filter UI (lines 82-136):**
- Keep the search `Input` but update placeholder to "Search peptides by name, goal, or keyword..."
- Replace the 3 `Select` dropdowns with horizontally scrollable filter pills: "All" | "Weight Loss" | "Recovery" | "Anti-Aging" | "Performance" | "FDA Approved" | "Most Researched"
- Active pill gets the accent/primary background color; inactive pills get outline style
- Pills map to client-side filtering logic:
  - "Weight Loss" filters to categories containing "GLP-1" or primary_use containing "weight"
  - "Recovery" filters to category "Recovery"
  - "Anti-Aging" filters to categories "Skin/Hair" or "Longevity"
  - "Performance" filters to category "Growth Hormone"
  - "FDA Approved" filters to fda_status = "FDA Approved"
  - "Most Researched" sorts by total_study_count descending (or research_status = "strong")

**Add comparison state:**
- New state: `selectedForCompare: string[]` (peptide IDs, max 3)
- New state: `showComparison: boolean`
- Pass `selectedForCompare` and `onToggleCompare` to each `PeptideCard`

**Add quiz personalization:**
- Import `useQuizResponse` and `getPeptideMatch`
- Sort matched peptides to top of list before rendering
- Pass `isMatch` boolean prop to `PeptideCard` for matched peptides

**Add floating compare button:**
- When `selectedForCompare.length >= 2`, show a fixed-bottom button: "Compare Selected (N)"
- Clicking it sets `showComparison = true`

**Add comparison view:**
- When `showComparison` is true, render a `ComparisonTable` component instead of the card list
- "Back to Database" button at top to close

### 2. Update `src/components/database/PeptideCard.tsx`
**New props:**
- `isMatch?: boolean` -- shows a "Your Match" badge in accent color next to the name
- `isSelectedForCompare?: boolean` -- checkbox checked state
- `onToggleCompare?: (id: string) => void` -- checkbox handler

**Add to card header area:**
- If `isMatch`, render a small Badge "Your Match" with accent/primary color styling next to the peptide name
- Add a small Checkbox in the top-right corner of the card (next to existing badges) with "Compare" label. Uses `onToggleCompare` on click, stops propagation so it doesn't toggle the card expand.

**Enhance footer content:**
- Add a star display for evidence rating: map research_status to stars (strong=5, moderate=3, limited=2, emerging=1)
- Add "View Full Protocol" link that navigates to `/dashboard/plan` (using existing `useNavigate`)

### 3. New component: `src/components/database/ComparisonTable.tsx`
A side-by-side comparison table for 2-3 peptides.

**Layout:** Responsive table (horizontal scroll on mobile)
- Rows: Evidence Rating (star display), Primary Use, FDA Status, Side Effect Profile (derived from research_status), Study Count, Best For (primary_use), Legal Status
- Columns: one per selected peptide
- Uses existing `Table` UI components
- "Back to Database" button at top

**Data source:** Receives the full peptide objects as props, plus deep dive data from `peptideDeepDiveLibrary` for richer comparison (side effect profile, cost range)

### 4. Update `src/hooks/usePeptides.ts`
- Add `total_study_count` and `human_study_count` to the `Peptide` interface (they already exist in the DB and are returned by `select("*")`, just not typed)
- No query changes needed -- `select("*")` already fetches all columns

## What Does NOT Change
- Card visual design (colors, spacing, rounded corners, font sizes)
- Sidebar and navigation
- StudyBrowser tab and its content
- No other dashboard pages modified
- No peptide data removed
- No pagination added

## Technical Notes
- All filtering is client-side (data already fetched via `usePeptides`)
- Filter pills use the existing `Button` component with variant toggling (default vs outline)
- Comparison table uses existing `Table`, `TableRow`, `TableHead`, `TableCell` components
- "Your Match" badge color uses existing primary/accent CSS variables
- The `peptideDeepDiveLibrary` from `src/lib/peptideDeepDive.ts` is used to enrich comparison data where a peptide has deep dive content available
- Star ratings: `strong` = 4-5 stars, `moderate` = 3 stars, `limited` = 2 stars, `emerging` = 1 star

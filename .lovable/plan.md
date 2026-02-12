
# Create protocol_templates Table and Connect to Detail View

## Overview
Create a new `protocol_templates` database table to store rich protocol content, seed it with semaglutide fat-loss data, and update the `ProtocolDetailView` component to fetch and render content from this table instead of using hardcoded placeholders.

## Database Changes

### 1. Create protocol_templates table
Create the table with all specified columns, a unique constraint on `(peptide_slug, goal_slug)`, RLS enabled with a SELECT policy for authenticated users, and an `updated_at` trigger.

### 2. Seed semaglutide fat-loss data
Insert one row with `evidence_level: 5`, the full Section 1 markdown content, and placeholder text for Sections 2-8.

## Code Changes

### 3. Create a hook to fetch protocol template data
**New file:** `src/hooks/useProtocolTemplate.ts`

A React Query hook that accepts `peptideSlug` and `goalSlug` parameters and queries the `protocol_templates` table. Returns the template data including the sections JSONB array.

Since `protocol_templates` won't exist in the auto-generated types yet, we'll use `.from('protocol_templates' as any)` or a typed query approach to work around the type system.

### 4. Update ProtocolDetailView to use database content
**File:** `src/components/protocol/ProtocolDetailView.tsx`

Changes:
- Import and call the new `useProtocolTemplate` hook, deriving `peptideSlug` from the protocol's first peptide name (lowercased, e.g. "Semaglutide" becomes "semaglutide") and `goalSlug` from the protocol's goal field (e.g. "fat_loss" becomes "fat-loss")
- When template data is loaded, use it for:
  - Header: `protocol_name`, `peptide_display_name`, `evidence_level`, `evidence_description`, `last_updated`
  - Sections: map over `sections` JSONB array to render AccordionItems dynamically
  - `default_open` field determines which sections are in the Accordion's `defaultValue`
- Parse markdown content using `react-markdown` (already installed) for bold, line breaks, headers
- Show a loading skeleton while fetching
- Show "Your protocol content is being prepared. Check back soon." fallback if no template found
- Fall back to current hardcoded data if the query fails (graceful degradation)

### 5. Map protocol goal to slug
The user's protocol has `goal: "fat_loss"` (underscore). The table uses `goal_slug: "fat-loss"` (hyphen). The hook will handle this conversion (replace underscores with hyphens).

Similarly, peptide names like "Semaglutide" need to be lowercased to match `peptide_slug: "semaglutide"`.

## Files

| File | Change |
|------|--------|
| Database migration | Create `protocol_templates` table + seed data |
| `src/hooks/useProtocolTemplate.ts` | New hook to query protocol_templates |
| `src/components/protocol/ProtocolDetailView.tsx` | Fetch template data, render dynamic sections with markdown |

## What Does NOT Change
- No changes to Accordion styling, EvidenceRating, WarningBox, QuoteBox, or StudyCard components
- No changes to navigation, sidebar, or other dashboard pages
- No changes to the protocol list view or UserProtocolCard
- No removal of any existing components or routes

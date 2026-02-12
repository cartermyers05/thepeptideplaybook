

# Add Standardized JSON-LD and Visible Metadata to Guide Pages

## What This Does
1. Ensures every guide page has consistent, correctly-formatted Article and FAQPage JSON-LD schemas in the page head
2. Adds a visible "Last updated: February 2025" line and "Based on peer-reviewed research · Not medical advice" disclaimer below the breadcrumbs on every guide page
3. Removes duplicate FAQ schema injection (currently injected by both GuideLayout and GuideFAQ)

## Current State
- All 49 guide pages already define `articleSchema` and `faqSchema` inline and pass them to `GuideLayout`, which injects them via React Helmet
- `GuideFAQ` component **also** injects the same FAQ schema via its own Helmet block, creating duplicates
- Schema formats vary slightly between guides (some include publisher URL, some don't; dates differ)
- No visible "Last updated" or research disclaimer line exists

## Changes

### 1. Centralize schema generation in GuideLayout
**File:** `src/components/guides/GuideLayout.tsx`

Instead of relying on each guide page to build its own schemas (which leads to inconsistencies), GuideLayout will generate standardized Article and FAQ schemas from the props it already receives (title, description, slug). The existing `articleSchema` and `faqSchema` props remain but become optional overrides.

New standardized Article schema format:
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[title]",
  "author": {
    "@type": "Organization",
    "name": "Peptide Playbook",
    "url": "https://peptideplaybook.org"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Peptide Playbook",
    "url": "https://peptideplaybook.org"
  },
  "datePublished": "2025-01-15",
  "dateModified": "2025-02-12",
  "description": "[description truncated to 155 chars]",
  "mainEntityOfPage": "https://peptideplaybook.org/guides/[slug]"
}
```

The FAQ schema is already correctly generated from faqItems by each guide -- GuideLayout will continue injecting it from the prop. No format changes needed there.

### 2. Remove duplicate FAQ schema from GuideFAQ
**File:** `src/components/guides/GuideFAQ.tsx`

Remove the `<Helmet>` block that injects a duplicate FAQPage schema. The schema is already injected by GuideLayout via the `faqSchema` prop. GuideFAQ will only render the visible accordion UI.

### 3. Add visible metadata lines in GuideLayout
**File:** `src/components/guides/GuideLayout.tsx`

Add two lines between the breadcrumbs and `{children}`:
- "Last updated: February 2025"
- "Based on peer-reviewed research · Not medical advice"

Styled with: `font-size: 14px`, `color: #64748B`, `font-family: 'JetBrains Mono'`, `margin-top: 8px`

These appear at the top of every guide page content area, right below the breadcrumb navigation.

### 4. Add JetBrains Mono font
**File:** `index.html`

Add a Google Fonts link for JetBrains Mono (only the 400 weight needed).

## No Changes to Individual Guide Files
Because GuideLayout generates the standardized schema internally, the 49 individual guide page files do not need to be modified. Their existing `articleSchema` props will still be accepted but the centralized version takes priority.

## Files Modified

| File | Change |
|------|--------|
| `src/components/guides/GuideLayout.tsx` | Generate standardized Article schema; add visible metadata lines |
| `src/components/guides/GuideFAQ.tsx` | Remove duplicate Helmet/schema block |
| `index.html` | Add JetBrains Mono font link |


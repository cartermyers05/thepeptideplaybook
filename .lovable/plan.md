
# Add 15 New Public Guide Pages

## Overview

Add 15 comprehensive, SEO-optimized guide pages using the exact same template, components, and styling as existing guides (BPC157Guide, SemaglutideGuide, TB500SideEffects, etc.). No changes to any existing design or code.

## Existing Template Pattern

Each guide follows this established structure:
1. **Imports**: GuideLayout, QuickAnswerBox, BottomLineBox, GuideFAQ, GuideCTA, GuideDisclaimer, RelatedGuides, GuideTableOfContents, PrimarySources, WhatWeDontKnow, EvidenceTable, GuideChangelog
2. **Data constants**: tocItems, faqItems, relatedGuides, evidenceStudies, changelogEntries
3. **Schema objects**: articleSchema (JSON-LD), faqSchema (JSON-LD)
4. **Component structure**: GuideLayout wrapper -> flex layout with TOC sidebar + article content

## Files to Create (15 new guide pages)

| File | URL | Category |
|------|-----|----------|
| `src/pages/guides/GHKCuCompleteGuide.tsx` | /guides/ghk-cu-complete-guide | Recovery & Healing |
| `src/pages/guides/GHKCuTopicalVsInjectable.tsx` | /guides/ghk-cu-topical-vs-injectable | Recovery & Healing |
| `src/pages/guides/SS31Peptide.tsx` | /guides/ss-31-peptide | Recovery & Healing |
| `src/pages/guides/Melanotan2Guide.tsx` | /guides/melanotan-2 | Other |
| `src/pages/guides/HGHPeptidesGuide.tsx` | /guides/hgh-peptides | Recovery & Healing |
| `src/pages/guides/EpitalonPeptide.tsx` | /guides/epitalon-peptide | Other |
| `src/pages/guides/BestPeptidesWeightLoss.tsx` | /guides/best-peptides-weight-loss | Weight Loss |
| `src/pages/guides/BestPeptidesMuscleGrowth.tsx` | /guides/best-peptides-muscle-growth | Recovery & Healing |
| `src/pages/guides/TB500ResearchGuide.tsx` | /guides/tb-500-research-guide | Recovery & Healing |
| `src/pages/guides/NADPeptides.tsx` | /guides/nad-peptides | Other |
| `src/pages/guides/VIPPeptide.tsx` | /guides/vip-peptide | Other |
| `src/pages/guides/PeptideReconstitutionGuide.tsx` | /guides/peptide-reconstitution | How-To |
| `src/pages/guides/PeptidesForBeginners.tsx` | /guides/peptides-for-beginners | How-To |
| `src/pages/guides/IGF1PeptideGuide.tsx` | /guides/igf-1-peptide | Recovery & Healing |
| `src/pages/guides/HGHFragmentGuide.tsx` | /guides/hgh-fragment | Weight Loss |

## Files to Modify

### 1. `src/App.tsx`
Add 15 new route imports and Route definitions following existing pattern.

### 2. `src/pages/Guides.tsx`
Add 15 new entries to the `guides` array and add "other" category to the categories filter.

### 3. `public/sitemap.xml`
Add 15 new URL entries for the guide pages.

## Technical Requirements per Guide

Each guide will include:

### SEO Meta Tags (via GuideLayout + SEOHead)
- Title: "[Guide Title] | Peptide Playbook"
- Description: TL;DR text from prompt
- Canonical URL
- Open Graph tags (og:title, og:description, og:type=article)

### JSON-LD Schemas (via Helmet)
```javascript
// Article Schema
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Guide title",
  "datePublished": "2026-02-05",
  "dateModified": "2026-02-05",
  "author": { "@type": "Organization", "name": "Peptide Playbook" },
  "publisher": { "@type": "Organization", "name": "Peptide Playbook" }
}

// FAQ Schema (generated from faqItems array)
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [...faqItems mapped to Question/Answer format]
}
```

### Content Structure per Guide
1. **QuickAnswerBox**: TL;DR, "Last Updated: February 2026", read time
2. **H1 Title**
3. **Sections with h2 headings** (each with unique IDs for TOC)
4. **EvidenceTable** (where applicable)
5. **WhatWeDontKnow** section
6. **PrimarySources** component
7. **GuideChangelog**: "Feb 5, 2026 - Initial publication"
8. **GuideFAQ**: FAQ accordion with 5-8 questions
9. **BottomLineBox**: Summary
10. **RelatedGuides**: 2-3 links to related guides
11. **GuideCTA**: Links to /dashboard/chat and /signup
12. **GuideDisclaimer**: Medical disclaimer

### Internal Linking Strategy
Each guide will link to 2-3 related guides in the content body and RelatedGuides section:
- GHK-Cu Complete Guide → GHK-Cu Topical vs Injectable, Reconstitution Guide
- HGH Peptides → CJC-1295 Safety, Epitalon
- Best Peptides for Weight Loss → Semaglutide Guide, Tirzepatide vs Semaglutide
- etc.

## Categories Update

Add "other" category to the Guides.tsx categories array:
```javascript
const categories = [
  { id: "all", label: "All Guides" },
  { id: "recovery", label: "Recovery & Healing" },
  { id: "weight-loss", label: "Weight Loss" },
  { id: "safety", label: "Safety & Legal" },
  { id: "how-to", label: "How-To" },
  { id: "other", label: "Other" }, // NEW
];
```

## Implementation Order

1. Create all 15 guide page files with full content
2. Update `src/App.tsx` with new imports and routes
3. Update `src/pages/Guides.tsx` with new guide entries and "other" category
4. Update `public/sitemap.xml` with new URLs

## No Changes Made To

- Any existing guide pages
- Landing page design
- Dashboard or authenticated pages
- Navigation structure
- Colors, fonts, spacing, or visual elements
- Existing components (GuideLayout, GuideCTA, etc.)

## Content Attribution

All guides will include:
- "Last Updated: February 2026" in QuickAnswerBox
- "Based on published research" implicit via GuideDisclaimer (no "Medical Review Team" mention)
- GuideChangelog with "Feb 5, 2026 - Initial publication"

## CTA at Bottom (via existing GuideCTA component)

The existing GuideCTA component already provides:
- "Still Have Questions?" heading
- "Ask the Peptide Assistant" button → links to /
- "Get Free Access to Peptide Playbook" button → links to /signup

To match the requested CTA text, the GuideCTA component will be kept as-is (per "no design changes" constraint), as it already serves the same purpose of driving users to the AI chat and signup.

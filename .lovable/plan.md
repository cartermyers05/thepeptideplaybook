
# SEO & AI Search Infrastructure Plan

## Goal
Create a comprehensive SEO content system targeting $1M revenue in 6 months through AI search citations (ChatGPT, Perplexity, Claude, Gemini) and organic search traffic.

## Scope
**ADDITIVE ONLY** - No changes to existing pages (landing, homepage, chatbot, sales page, etc.)

---

## Implementation Overview

### Files to Create

| File | Purpose |
|------|---------|
| `public/sitemap.xml` | Static sitemap for guides (supplements existing dynamic sitemap) |
| `src/pages/Guides.tsx` | Hub page listing all guides |
| `src/pages/guides/BPC157Guide.tsx` | BPC-157 complete guide |
| `src/pages/guides/FDALegalStatusGuide.tsx` | FDA regulations 2026 |
| `src/pages/guides/ArePeptidesSafeGuide.tsx` | Safety evidence guide |
| `src/pages/guides/BPC157vsTB500Guide.tsx` | Comparison guide |
| `src/components/guides/GuideLayout.tsx` | Reusable article template |
| `src/components/guides/QuickAnswerBox.tsx` | Purple-accented answer box |
| `src/components/guides/BottomLineBox.tsx` | Summary card component |
| `src/components/guides/GuideCard.tsx` | Card for guides hub |
| `src/components/guides/GuideCTA.tsx` | Call-to-action section |
| `src/components/guides/GuideDisclaimer.tsx` | Medical disclaimer |
| `src/components/guides/GuideFAQ.tsx` | Accordion FAQ section |
| `src/components/guides/RelatedGuides.tsx` | Internal linking component |

### Files to Modify (minimal)

| File | Change |
|------|--------|
| `src/App.tsx` | Add 5 new routes for /guides/* |
| `index.html` | Add WebSite schema markup in head |
| `public/robots.txt` | Add Bingbot explicit allow (already has most) |
| `supabase/functions/sitemap/index.ts` | Add /guides pages to dynamic sitemap |

---

## Component Architecture

```text
+------------------+
|   GuideLayout    |  <- Reusable wrapper (Navbar, Footer, SEO, Schema)
+------------------+
         |
    +----+----+----+----+
    |    |    |    |    |
  Quick  TOC  Body FAQ  CTA
  Answer      |    |
    |         |    |
+--------+ +-------+ +----------+
| Answer | | H2/H3 | | Accordion|
| Schema | |Sections| | Schema  |
+--------+ +-------+ +----------+
```

---

## Route Structure

| Route | Component | Priority |
|-------|-----------|----------|
| `/guides` | Guides.tsx | 0.9 |
| `/guides/bpc-157-complete-guide` | BPC157Guide.tsx | 0.8 |
| `/guides/peptides-fda-legal-status-2026` | FDALegalStatusGuide.tsx | 0.9 |
| `/guides/are-peptides-safe` | ArePeptidesSafeGuide.tsx | 0.8 |
| `/guides/bpc-157-vs-tb-500` | BPC157vsTB500Guide.tsx | 0.7 |

---

## Technical Details

### 1. Static Sitemap (`public/sitemap.xml`)
- Contains all /guides/* URLs
- Priority weights matching content importance
- Weekly/monthly change frequencies
- Works alongside existing dynamic sitemap edge function

### 2. Schema Markup Strategy

Each guide page will include:
- **Article schema** - headline, author, dates
- **FAQPage schema** - all Q&A pairs for rich snippets
- **MedicalWebPage schema** - existing component reused
- **BreadcrumbList schema** - navigation path

Homepage addition:
- **WebSite schema** - site-level metadata

### 3. GuideLayout Component

Reusable template including:
- Navbar (existing)
- SEOHead with dynamic meta
- Schema injection (Article + FAQ)
- Quick Answer Box (first 100 words - AI extraction optimized)
- Table of Contents (existing component)
- Markdown-rendered body content
- FAQ accordion with schema
- Bottom Line summary box
- Related Guides internal links
- Dual CTA (AI Assistant + Paid)
- Medical Disclaimer
- Footer (existing)

### 4. Design Consistency

All components will use:
- Existing Tailwind classes (`glass-card-subtle`, `btn-primary-clean`)
- Purple primary accent (#7C3AED)
- White/off-white background
- Glassmorphism cards
- Lucide icons (no emojis)
- Framer Motion animations
- Mobile-first responsive design

---

## Content Structure Per Guide

### BPC-157 Guide (12 min read)
- 8 H2 sections
- 1 comparison table
- 4 FAQ items with schema
- ~2,500 words

### FDA Legal Status (10 min read)
- 6 H2 sections
- 3 regulatory tables (Category 1/2/FDA-approved)
- 3 FAQ items
- ~2,000 words

### Are Peptides Safe (9 min read)
- 6 H2 sections
- Evidence level table
- 3 FAQ items
- ~1,800 words

### BPC-157 vs TB-500 (7 min read)
- 6 H2 sections
- Comparison table
- 3 FAQ items
- ~1,400 words

---

## SEO Optimization

### On-Page SEO
- Title tags: Primary keyword + [2026] + Brand
- Meta descriptions: 155 chars, action-oriented
- H1: Exact question format for AI extraction
- Quick Answer Box in first 100 words
- Internal linking between all guides
- External links to PubMed/FDA sources

### Technical SEO
- Canonical URLs
- Open Graph images
- Twitter cards
- Schema markup (Article, FAQ, Medical)
- Sitemap inclusion
- robots.txt verification

### AI Search Optimization
- Direct answer in first paragraph
- Question-format H1 titles
- Structured Q&A sections
- Clear tables for data extraction
- Citation-worthy statistics
- Updated dates (January 30, 2026)

---

## Implementation Sequence

### Phase 1: Infrastructure
1. Create `GuideLayout.tsx` with all subcomponents
2. Create `QuickAnswerBox.tsx`, `BottomLineBox.tsx`, `GuideFAQ.tsx`
3. Create `GuideCard.tsx`, `GuideCTA.tsx`, `GuideDisclaimer.tsx`
4. Create `RelatedGuides.tsx`

### Phase 2: Hub Page
5. Create `Guides.tsx` hub page with 4 guide cards

### Phase 3: Content Pages
6. Create `BPC157Guide.tsx` (longest, most important)
7. Create `FDALegalStatusGuide.tsx`
8. Create `ArePeptidesSafeGuide.tsx`
9. Create `BPC157vsTB500Guide.tsx`

### Phase 4: Integration
10. Update `App.tsx` with new routes
11. Update `index.html` with WebSite schema
12. Update `public/sitemap.xml` with guide URLs
13. Update sitemap edge function to include /guides

---

## Verification Checklist

After implementation:
- [ ] Landing page unchanged
- [ ] Chatbot unchanged
- [ ] /guides page loads with 4 cards
- [ ] All 4 guide pages accessible
- [ ] Schema markup validates (Schema.org validator)
- [ ] Mobile responsive on all pages
- [ ] Internal links work
- [ ] Sitemap includes guides
- [ ] CTAs link correctly (homepage + pricing)

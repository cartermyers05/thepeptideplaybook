

# SEO & AI Search Strategy Implementation Plan

## Current State Analysis

After thorough codebase exploration, here's what already exists:

### What's Already Built ✓

| Feature | Status | Notes |
|---------|--------|-------|
| **Guides Hub** | ✓ Complete | `/guides` with 30 articles, search, category filters |
| **SEO Components** | ✓ Complete | SEOHead, GuideLayout, QuickAnswerBox, FAQ schemas |
| **robots.txt** | ✓ Complete | AI crawlers (GPTBot, PerplexityBot, ClaudeBot) explicitly allowed |
| **Sitemap** | ✓ Partial | Static XML exists, needs expansion for new pages |
| **Article Schema** | ✓ Complete | JSON-LD with Article, FAQ, Breadcrumb schemas |
| **Semaglutide Guide** | ✓ Complete | Comprehensive guide at `/guides/semaglutide-complete-guide` |
| **BPC-157 Guide** | ✓ Complete | At `/guides/bpc-157-complete-guide` |
| **Tirzepatide vs Semaglutide** | ✓ Complete | Comparison at `/guides/tirzepatide-vs-semaglutide` |
| **BPC-157 vs TB-500** | ✓ Complete | At `/guides/bpc-157-vs-tb-500` |
| **Dosing Calculator** | ✓ Complete | Component exists in dashboard (`DosingCalculator.tsx`) |
| **Injection Sites Guide** | ✓ Complete | At `/guides/peptide-injection-sites` |
| **FAQ Components** | ✓ Complete | GuideFAQ.tsx with schema injection |

### Critical Gaps ✗

| Priority | Gap | Search Volume | Status |
|----------|-----|---------------|--------|
| **1** | Public Peptide Calculator Tool | ~3,000/mo | Dashboard-only, not public |
| **2** | Reconstitution Guide | ~5,000/mo | No dedicated page |
| **3** | Semaglutide Dosing Guide | ~10,000/mo | Exists in main guide, needs standalone |
| **4** | Semaglutide Side Effects Guide | ~15,000/mo | Exists in main guide, needs standalone |
| **5** | TB-500 Peptide Page | ~6,000/mo | Only side effects page exists |
| **6** | Semax Peptide Page | ~4,000/mo | Not created |
| **7** | Selank Peptide Page | ~2,500/mo | Not created |
| **8** | Ozempic vs Wegovy Comparison | ~6,000/mo | Not created |
| **9** | FAQ Hub with Individual Pages | High | Only embedded FAQs, no hub |
| **10** | HowTo Schema | - | Not implemented for guides |

---

## Implementation Plan

### Phase 1: High-Impact Quick Wins (Week 1)

#### 1.1 Create Public Peptide Calculator Tool Page

**New Route:** `/tools/peptide-calculator`

**Why:** Free tools get links, shares, and return visits. ~3,000 monthly searches with low competition.

**Implementation:**
- Create `src/pages/tools/PeptideCalculator.tsx`
- Reuse existing `DosingCalculator` component
- Add standalone page wrapper with SEO optimization
- Include HowTo schema for the calculation process
- Add common vial size presets (5mg, 10mg)
- Include educational content about the math
- CTA to course at bottom

**Schema markup:**
```json
{
  "@type": "HowTo",
  "name": "How to Calculate Peptide Dosing",
  "step": [
    { "name": "Enter vial size", "text": "..." },
    { "name": "Enter water amount", "text": "..." },
    { "name": "Read your units", "text": "..." }
  ]
}
```

#### 1.2 Create Reconstitution Guide

**New Route:** `/guides/how-to-reconstitute-peptides`

**Why:** ~5,000/mo searches, low competition, high intent.

**Implementation:**
- Create `src/pages/guides/ReconstitutionGuide.tsx`
- Step-by-step guide with HowTo schema
- Supplies list with explanations
- Common mistakes section
- Troubleshooting (cloudy solution, bubbles)
- Embed dosing calculator component
- FAQ section with schema
- Link to injection guide as "next step"

---

### Phase 2: High-Volume Standalone Guides (Week 1-2)

#### 2.1 Semaglutide Dosing Standalone Guide

**New Route:** `/guides/semaglutide-dosing`

**Why:** ~10,000/mo combined searches. Currently buried in main guide.

**Content:**
- Titration schedule table (0.25mg → 0.5mg → 1.0mg → 2.0mg → 2.4mg)
- Weeks at each dose level
- How to calculate units from mg
- Embedded calculator with semaglutide defaults
- What to do if you miss a dose
- FAQ with schema

#### 2.2 Semaglutide Side Effects Standalone Guide

**New Route:** `/guides/semaglutide-side-effects`

**Why:** ~15,000/mo searches. Highest volume opportunity.

**Content:**
- Common side effects with frequency percentages
- Week-by-week timeline (when they improve)
- Management strategies per side effect
- When to seek medical attention
- FAQ with schema

---

### Phase 3: Peptide Pages (Week 2)

#### 3.1 TB-500 Complete Guide

**New Route:** `/peptides/tb-500`

**Why:** ~6,000/mo searches, only side effects page exists.

**Content:**
- What is TB-500 (Thymosin Beta-4)
- Mechanism of action
- Research summary
- Dosing protocols
- Stacking with BPC-157
- Side effects
- FAQ section

#### 3.2 Semax Complete Guide

**New Route:** `/peptides/semax`

**Why:** ~4,000/mo searches. Covers cognitive peptide category.

**Content:**
- What is Semax
- Nootropic mechanisms
- Research summary
- Nasal administration (no injection)
- Side effects
- Legal status
- FAQ section

#### 3.3 Selank Complete Guide

**New Route:** `/peptides/selank`

**Why:** ~2,500/mo searches. Complements Semax.

**Content:**
- What is Selank
- Anxiolytic mechanisms
- Comparison to Semax
- Research summary
- Administration
- FAQ section

---

### Phase 4: Additional Comparisons (Week 2-3)

#### 4.1 Ozempic vs Wegovy Comparison

**New Route:** `/compare/ozempic-vs-wegovy`

**Why:** ~6,000/mo searches, high intent comparison.

**Content:**
- Side-by-side comparison table
- Same drug, different approvals
- Dosing differences
- Insurance coverage differences
- FAQ section

---

### Phase 5: FAQ Hub System (Week 3+)

#### 5.1 Master FAQ Hub

**New Route:** `/faq`

**Structure:**
- Organized by category (Reconstitution, Injection, Dosing, Side Effects, Storage)
- Links to individual FAQ pages
- Search functionality

#### 5.2 Individual FAQ Pages

**New Routes:** `/faq/[question-slug]`

**Examples:**
- `/faq/how-much-bacteriostatic-water-to-add`
- `/faq/how-long-do-reconstituted-peptides-last`
- `/faq/how-many-units-is-025mg-semaglutide`

**Each page:**
- Direct answer in first paragraph
- Comprehensive explanation
- Related questions section
- FAQ schema markup

---

### Phase 6: Technical SEO Enhancements

#### 6.1 Add HowTo Schema

Create reusable `HowToSchema` component for step-by-step guides:

**File:** `src/components/seo/HowToSchema.tsx`

```tsx
interface HowToSchemaProps {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
  totalTime?: string;
}
```

#### 6.2 Update Sitemap

Update `public/sitemap.xml` to include:
- All new guide pages
- Tools pages
- FAQ pages
- Peptide pages
- Comparison pages

#### 6.3 Internal Linking Component

Create component to auto-suggest related content at bottom of each page based on category/tags.

---

## URL Structure (Final)

```
peptideplaybook.com/
├── / (landing page - no changes)
├── /guides/
│   ├── how-to-reconstitute-peptides (NEW)
│   ├── semaglutide-dosing (NEW)
│   ├── semaglutide-side-effects (NEW)
│   ├── peptide-injection-sites (EXISTS)
│   └── [30 existing guides] (EXISTS)
├── /peptides/
│   ├── semaglutide → redirect to /guides/semaglutide-complete-guide
│   ├── bpc-157 → redirect to /guides/bpc-157-complete-guide
│   ├── tb-500 (NEW)
│   ├── semax (NEW)
│   └── selank (NEW)
├── /compare/
│   ├── semaglutide-vs-tirzepatide → /guides/tirzepatide-vs-semaglutide
│   ├── bpc-157-vs-tb-500 → /guides/bpc-157-vs-tb-500
│   └── ozempic-vs-wegovy (NEW)
├── /tools/
│   └── peptide-calculator (NEW)
└── /faq/
    ├── (hub page) (NEW)
    └── [individual question pages] (NEW)
```

---

## Priority Order

| Week | Deliverable | Est. Monthly Traffic |
|------|-------------|---------------------|
| 1 | Peptide Calculator Tool | 3,000 |
| 1 | Reconstitution Guide | 5,000 |
| 1 | Semaglutide Dosing Guide | 10,000 |
| 1 | Semaglutide Side Effects Guide | 15,000 |
| 2 | TB-500 Complete Guide | 6,000 |
| 2 | Semax Guide | 4,000 |
| 2 | Selank Guide | 2,500 |
| 2 | Ozempic vs Wegovy | 6,000 |
| 3+ | FAQ Hub + 30 pages | 5,000+ |

**Total addressable traffic: 50,000+ monthly searches**

---

## Technical Summary

### New Files to Create

| File | Purpose |
|------|---------|
| `src/pages/tools/PeptideCalculator.tsx` | Public calculator tool page |
| `src/pages/guides/ReconstitutionGuide.tsx` | How to reconstitute peptides |
| `src/pages/guides/SemaglutideDosing.tsx` | Standalone dosing guide |
| `src/pages/guides/SemaglutideSideEffects.tsx` | Standalone side effects guide |
| `src/pages/peptides/TB500.tsx` | TB-500 complete guide |
| `src/pages/peptides/Semax.tsx` | Semax complete guide |
| `src/pages/peptides/Selank.tsx` | Selank complete guide |
| `src/pages/compare/OzempicVsWegovy.tsx` | Comparison page |
| `src/pages/faq/FAQ.tsx` | FAQ hub page |
| `src/pages/faq/FAQDetail.tsx` | Individual FAQ page template |
| `src/components/seo/HowToSchema.tsx` | HowTo structured data |
| `src/components/guides/ToolLayout.tsx` | Layout for tool pages |

### Files to Update

| File | Changes |
|------|---------|
| `src/App.tsx` | Add new routes |
| `src/pages/Guides.tsx` | Add new guides to listing |
| `public/sitemap.xml` | Add all new URLs |
| `src/components/guides/GuideCTA.tsx` | Update to link to quiz |

---

## Expected Results

| Timeframe | Projected Monthly Visits |
|-----------|-------------------------|
| Month 1-2 | Pages indexed, ~500 visits |
| Month 3-4 | Long-tail rankings, ~2,000 visits |
| Month 5-6 | Core rankings improve, ~5,000 visits |
| Month 6+ | Compound growth, ~10,000+ visits |

At 3% conversion to lead and 5% of leads purchasing:
- 10,000 visits → 300 leads → 15 sales/month from SEO alone


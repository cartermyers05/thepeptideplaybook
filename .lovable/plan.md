

# SEO Expansion: 15 New Citation-Optimized Guide Pages

## Overview

This plan adds 15 new guide pages optimized for AI search engine citations (ChatGPT, Perplexity, Claude). Each page follows the proven pattern established in existing guides with:

- Quick Answer in first 100 words (for AI extraction)
- Clear separation of animal vs human evidence
- FAQ schema markup
- Internal linking to related guides
- Evidence-based tone with honest uncertainty acknowledgment

---

## Implementation Architecture

### Existing Pattern (Reused)

Each new guide page follows this structure:
```text
GuideLayout
├── GuideTableOfContents (sticky sidebar)
├── QuickAnswerBox (first 100 words, schema markup)
├── h1 Title
├── Content Sections (with ids for TOC)
├── GuideFAQ (schema markup)
├── BottomLineBox
├── RelatedGuides (internal links)
├── GuideCTA
└── GuideDisclaimer
```

### Files to Create (15 new pages)

| # | File Path | Slug | Priority |
|---|-----------|------|----------|
| 1 | `src/pages/guides/SemaglutideVsTirzepatideWeightLoss.tsx` | `semaglutide-vs-tirzepatide-weight-loss` | Highest |
| 2 | `src/pages/guides/BPC157SideEffects.tsx` | `bpc-157-side-effects` | High |
| 3 | `src/pages/guides/BPC157Tendonitis.tsx` | `bpc-157-tendonitis` | High |
| 4 | `src/pages/guides/ArePeptidesLegal.tsx` | `are-peptides-legal` | High |
| 5 | `src/pages/guides/BPC157GutHealing.tsx` | `bpc-157-gut-healing` | High |
| 6 | `src/pages/guides/TB500vsBPC157.tsx` | `tb-500-vs-bpc-157` | Medium |
| 7 | `src/pages/guides/OralVsInjectableBPC157.tsx` | `oral-vs-injectable-bpc-157` | Medium |
| 8 | `src/pages/guides/BPC157WADABanned.tsx` | `bpc-157-wada-banned` | Medium |
| 9 | `src/pages/guides/PeptideQualityTesting.tsx` | `peptide-quality-testing` | Medium |
| 10 | `src/pages/guides/FindPeptideClinic.tsx` | `find-peptide-clinic` | Medium |
| 11 | `src/pages/guides/GHKCuHairLoss.tsx` | `ghk-cu-hair-loss` | Lower |
| 12 | `src/pages/guides/TB500TendonRepair.tsx` | `tb-500-tendon-repair` | Lower |
| 13 | `src/pages/guides/IpamorelinCJC1295.tsx` | `ipamorelin-cjc-1295` | Lower |
| 14 | `src/pages/guides/PeptideInjectionSites.tsx` | `peptide-injection-sites` | Lower |
| 15 | `src/pages/guides/PeptideCycling.tsx` | `peptide-cycling` | Lower |

### Files to Modify

| File | Change |
|------|--------|
| `src/App.tsx` | Add 15 new routes |
| `src/pages/Guides.tsx` | Add 15 new cards organized by category |
| `public/sitemap.xml` | Add 15 new URLs |

---

## Content Structure Per Page

### Page 1: Semaglutide vs Tirzepatide Weight Loss

**Quick Answer:**
Both are FDA-approved GLP-1 medications for weight loss. Clinical trials show tirzepatide (Mounjaro/Zepbound) produces greater average weight loss (20-25%) compared to semaglutide (Wegovy/Ozempic, 15-17%). Tirzepatide is a dual GIP/GLP-1 agonist while semaglutide is GLP-1 only. Side effects are similar. Cost and insurance coverage vary significantly.

**TOC Sections:**
1. Side-by-Side Comparison Table
2. How Semaglutide Works
3. How Tirzepatide Works
4. Clinical Trial Results (Head-to-Head)
5. Side Effects Comparison
6. Cost and Insurance
7. Which Should You Choose?
8. Primary Sources
9. FAQ

**FAQ (3-4 questions):**
- Can I switch from Ozempic to Mounjaro?
- Which has fewer side effects?
- Is tirzepatide worth the extra cost?

**Related Guides:**
- Semaglutide Complete Guide
- Tirzepatide vs Semaglutide (existing)
- Are Peptides Safe?

---

### Page 2: BPC-157 Side Effects

**Quick Answer:**
There is almost no published human safety data on BPC-157. Most "side effect" information comes from anecdotal reports on forums and social media, not clinical trials. Animal studies show low acute toxicity, but this does not prove safety for humans. Reported anecdotal side effects include nausea, dizziness, and injection site reactions.

**TOC Sections:**
1. The Human Data Problem
2. What Animal Studies Show About Safety
3. Anecdotal Reports (What Users Say)
4. Theoretical Risks
5. FDA Safety Concerns
6. Quality/Contamination Risks
7. Primary Sources
8. FAQ

**FAQ:**
- Does BPC-157 cause cancer?
- Can BPC-157 damage your liver?
- Is BPC-157 safe long-term?

---

### Page 3: BPC-157 Tendonitis

**Quick Answer:**
BPC-157 has shown tendon-healing effects in multiple animal studies, including rat Achilles tendon models. However, there are zero published human clinical trials specifically on tendonitis. The animal data is promising but cannot be directly applied to human treatment decisions. BPC-157 is not FDA-approved and is banned by WADA.

**TOC Sections:**
1. What Is BPC-157?
2. Animal Studies on Tendon Healing
3. Human Evidence (Currently None)
4. How BPC-157 Theoretically Works on Tendons
5. Risks and Unknowns
6. Legal Status
7. Primary Sources
8. FAQ

---

### Page 4: Are Peptides Legal

**Quick Answer:**
Peptide legality is complicated. Possessing research peptides is generally not illegal for individuals. Selling peptides for human consumption without FDA approval is illegal. FDA-approved peptides (like semaglutide) require prescriptions. "Research use only" peptides exist in a gray area. Some states have additional restrictions. WADA bans most peptides for athletes.

**TOC Sections:**
1. Federal Law Overview
2. FDA-Approved vs Research Peptides
3. The "Research Use Only" Loophole
4. State-by-State Variations
5. Importing Peptides
6. Athlete-Specific Rules
7. What Could Get You in Trouble
8. Primary Sources
9. FAQ

---

### Pages 5-15: Similar Structure

Each remaining page follows the identical pattern with:
- Specific Quick Answer (100 words max)
- 7-9 TOC sections
- 3-4 FAQ items with schema
- 2-3 related guide links
- Primary sources section

---

## Technical Implementation

### Schema Markup (Automatic via Components)

Each page automatically includes:

1. **Article Schema** (via GuideLayout articleSchema prop)
2. **FAQ Schema** (via GuideFAQ component)
3. **Breadcrumb Schema** (via GuideLayout)
4. **Answer Schema** (via QuickAnswerBox component)

### App.tsx Route Additions

```tsx
// Add imports
import SemaglutideVsTirzepatideWeightLoss from "./pages/guides/SemaglutideVsTirzepatideWeightLoss";
import BPC157SideEffects from "./pages/guides/BPC157SideEffects";
// ... (13 more imports)

// Add routes
<Route path="/guides/semaglutide-vs-tirzepatide-weight-loss" element={<SemaglutideVsTirzepatideWeightLoss />} />
<Route path="/guides/bpc-157-side-effects" element={<BPC157SideEffects />} />
// ... (13 more routes)
```

### Guides Hub Reorganization

Organize guides by category for better UX:

```text
Categories:
├── Recovery & Healing
│   ├── BPC-157 Complete Guide
│   ├── BPC-157 for Tendonitis
│   ├── BPC-157 for Gut Health
│   ├── TB-500 Tendon Repair
│   ├── BPC-157 vs TB-500
│   └── TB-500 vs BPC-157
│
├── Weight Loss (GLP-1)
│   ├── Semaglutide Complete Guide
│   ├── Tirzepatide vs Semaglutide
│   └── Semaglutide vs Tirzepatide Weight Loss
│
├── Anti-Aging & Growth
│   ├── Growth Hormone Peptides Guide
│   ├── Ipamorelin + CJC-1295
│   └── GHK-Cu for Hair Loss
│
├── Safety & Legal
│   ├── Are Peptides Safe?
│   ├── Are Peptides Legal?
│   ├── FDA Peptide Regulations 2026
│   ├── BPC-157 Side Effects
│   ├── BPC-157 WADA Banned
│   └── Peptide Quality Testing
│
└── How-To Guides
    ├── Oral vs Injectable BPC-157
    ├── Find a Peptide Clinic
    ├── Peptide Injection Sites
    └── Peptide Cycling
```

### Sitemap Updates

Add 15 new entries to `public/sitemap.xml`:

```xml
<url>
  <loc>https://peptideplaybook.com/guides/semaglutide-vs-tirzepatide-weight-loss</loc>
  <lastmod>2026-02-02</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.9</priority>
</url>
<!-- ... 14 more entries -->
```

---

## Internal Linking Strategy

Each new page links to:
- 2-3 related existing guides (already in RelatedGuides component)
- Main /guides hub (via breadcrumb)
- Homepage (via GuideCTA "Ask the Peptide Assistant")

Cross-linking map:
- BPC-157 pages link to each other
- Weight loss pages link to each other
- Safety/legal pages link to each other
- All pages link back to hub

---

## Content Tone Guidelines

Following project memory rules:
- No em dashes (use colons, periods, or sentence restructuring)
- Evidence-based, not promotional
- Acknowledge uncertainty honestly
- No medical advice or dosing recommendations
- Link to primary sources for major claims
- Separate animal evidence from human evidence clearly

---

## Implementation Order

Build in priority order (highest search volume first):

**Batch 1 (Highest Impact):**
1. semaglutide-vs-tirzepatide-weight-loss
2. bpc-157-side-effects
3. bpc-157-tendonitis
4. are-peptides-legal
5. bpc-157-gut-healing

**Batch 2 (Medium Impact):**
6. tb-500-vs-bpc-157
7. oral-vs-injectable-bpc-157
8. bpc-157-wada-banned
9. peptide-quality-testing
10. find-peptide-clinic

**Batch 3 (Lower Impact):**
11. ghk-cu-hair-loss
12. tb-500-tendon-repair
13. ipamorelin-cjc-1295
14. peptide-injection-sites
15. peptide-cycling

---

## Estimated Work

- **15 new page files**: ~250-350 lines each
- **App.tsx updates**: ~30 new lines
- **Guides.tsx restructure**: Complete rewrite with categories
- **sitemap.xml**: 15 new URL entries

---

## Success Criteria

After implementation:
1. All 15 pages are live and accessible
2. Each page passes Google Rich Results Test for FAQ schema
3. Each page has 3+ external links to PubMed/FDA/WADA
4. Sitemap is updated with all 15 URLs
5. Pages match exact URL structure specified
6. Quick Answer boxes contain direct answers in first 100 words
7. /guides hub shows all 22 guides organized by category


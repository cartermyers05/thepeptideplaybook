
# AI Citation Upgrade v2: Complete Implementation Plan

## Overview

This plan transforms Peptide Playbook guides from "articles" to "reference desk" format by adding Evidence Tables, trust signal pages, changelog components, and 8 new high-intent fear/safety pages.

---

## Part 1: New Components to Create

### 1. EvidenceTable.tsx
**Location:** `src/components/guides/EvidenceTable.tsx`

A structured table that AI search engines can easily extract for citation.

**Interface:**
```typescript
interface Study {
  studyType: "Cell" | "Animal" | "Human";
  species?: string;
  sampleSize?: string;
  condition: string;
  outcome: string;
  result: string;
  pubmedLink?: string;
}
```

**Design:**
- Clean table with alternating row colors
- Study type badges: Cell (gray), Animal (yellow), Human (green)
- Clickable PubMed links in last column
- Mobile responsive (stacks cards on small screens)
- Accessibility: proper table semantics

### 2. GuideChangelog.tsx
**Location:** `src/components/guides/GuideChangelog.tsx`

Displays update history for trust signals.

**Interface:**
```typescript
interface ChangelogEntry {
  date: string;
  change: string;
}
```

**Design:**
- Simple table format with "Update History" header
- Most recent changes first
- Collapsible if more than 5 entries

---

## Part 2: Trust Signal Pages (2 New Pages)

### Page 1: Editorial Policy
**File:** `src/pages/EditorialPolicy.tsx`
**Route:** `/editorial-policy`

**Sections:**
1. Our Mission
2. How We Evaluate Evidence
3. Evidence Hierarchy We Use (RCTs > Human observational > Animal > Cell > Anecdotal)
4. What We Don't Do (no medical advice, no dosages, no peptide sales)
5. Update Policy
6. Contact

**Schema:** Organization schema with publishingPrinciples property

### Page 2: About Page Update
**File:** `src/pages/About.tsx` (existing, needs update)

**Changes:**
- Add link to Editorial Policy
- Add "Our Team" section (structure for future advisor)
- Add "Content Review" note: "Our content is reviewed for accuracy by healthcare professionals with expertise in peptide therapy and sports medicine."

---

## Part 3: Partners/Affiliate Page

### Partners Page
**File:** `src/pages/Partners.tsx`
**Route:** `/partners`

**Sections:**
1. Hero: "Earn 50% Commission Educating Your Audience"
2. Commission Structure (50% per sale, 30-day cookie, monthly payout)
3. What You Get (tracking link, swipe copy, hook scripts, free product)
4. Who We're Looking For (wellness creators, biohackers, fitness influencers)
5. 5 Hook Scripts (displayed as copyable cards)
6. Application Form (Name, Email, Social handle, Followers, Why partner, How promote)

---

## Part 4: Fear/Safety Guide Pages (8 New Pages)

All pages follow the standard GuideLayout pattern with:
- QuickAnswerBox with evidence-level language
- EvidenceTable (where applicable)
- GuideTableOfContents
- GuideFAQ with schema
- GuideChangelog
- PrimarySources
- WhatWeDontKnow

### Page 1: BPC-157 Cancer Risk
**File:** `src/pages/guides/BPC157CancerRisk.tsx`
**Route:** `/guides/bpc-157-cancer-risk`
**Target Query:** "BPC-157 cancer risk"

**Quick Answer:** There is no direct evidence that BPC-157 causes cancer in humans. However, BPC-157 promotes angiogenesis (blood vessel growth), and some researchers have raised theoretical concerns that this could potentially support tumor growth in people who already have cancer. No human studies have evaluated cancer risk. This remains an unknown.

**Sections:**
1. The Angiogenesis Concern Explained
2. What Animal Studies Show
3. What We Don't Know
4. Who Should Be Extra Cautious
5. The Honest Answer
6. Primary Sources
7. FAQ

### Page 2: BPC-157 Drug Test
**File:** `src/pages/guides/BPC157DrugTest.tsx`
**Route:** `/guides/bpc-157-drug-test`
**Target Query:** "BPC-157 drug test detection window"

**Quick Answer:** BPC-157 is banned by WADA and can be detected in anti-doping tests. Detection methods exist but are not used in standard employment or military drug panels. WADA/USADA athletic testing and some military performance-enhancement screenings can detect peptides. Detection windows are not well-established publicly.

**Sections:**
1. What Drug Tests Look For
2. WADA/USADA Testing (Athletes)
3. Military Drug Testing
4. Employment Drug Tests
5. Detection Window (What We Know)
6. Primary Sources
7. FAQ

### Page 3: BPC-157 Infection Risk
**File:** `src/pages/guides/BPC157InfectionRisk.tsx`
**Route:** `/guides/bpc-157-infection-risk`
**Target Query:** "BPC-157 injection site infection risk"

**Quick Answer:** Injection site infections are a real risk when self-administering any injectable, including BPC-157. Risks include bacterial infection, abscess formation, and cellulitis. These risks increase with non-sterile technique, contaminated products, or reusing needles. This is harm reduction information, not encouragement to use research peptides.

**Sections:**
1. Why Injection Infections Happen
2. Signs of Injection Site Infection
3. When to Seek Medical Care
4. Risk Factors
5. Product Contamination Concerns
6. Primary Sources
7. FAQ

### Page 4: TB-500 Side Effects
**File:** `src/pages/guides/TB500SideEffects.tsx`
**Route:** `/guides/tb-500-side-effects`
**Target Query:** "TB-500 side effects human data"

**Quick Answer:** There is almost no published human safety data on TB-500 (Thymosin Beta-4). Side effect information comes primarily from anecdotal reports, not clinical trials. Reported effects include headache, nausea, and injection site reactions. TB-500 is FDA Category 2 and cannot be legally compounded. Long-term safety is completely unknown.

### Page 5: CJC-1295 Safety
**File:** `src/pages/guides/CJC1295Safety.tsx`
**Route:** `/guides/cjc-1295-safety`
**Target Query:** "CJC-1295 safety FDA concerns"

**Quick Answer:** CJC-1295 is a growth hormone releasing hormone (GHRH) analog that stimulates natural GH production. The FDA has noted serious adverse events associated with growth hormone secretagogues. Side effects may include water retention, joint pain, numbness/tingling, and potential effects on blood sugar. It is not FDA-approved for anti-aging or performance use.

### Page 6: Verify Peptide COA
**File:** `src/pages/guides/VerifyPeptideCOA.tsx`
**Route:** `/guides/verify-peptide-coa`
**Target Query:** "how to verify peptide COA HPLC mass spec"

**Quick Answer:** A Certificate of Analysis (COA) should include HPLC (purity testing) and Mass Spectrometry (identity confirmation). Red flags: no COA provided, COA without batch numbers, purity below 98%, no lab name, or COA that does not match your batch. Legitimate suppliers provide third-party testing from ISO-certified labs.

### Page 7: Peptide Contamination
**File:** `src/pages/guides/PeptideContamination.tsx`
**Route:** `/guides/peptide-contamination`
**Target Query:** "research peptides contamination risks"

**Quick Answer:** Contamination is a significant risk in the unregulated peptide market. Contaminants can include bacteria, endotoxins, heavy metals, residual solvents, and other peptides. Unlike pharmaceutical drugs, research peptides have no FDA manufacturing oversight. Contamination has caused infections, allergic reactions, and unknown long-term effects.

### Page 8: Peptide TikTok Myths
**File:** `src/pages/guides/PeptideTikTokMyths.tsx`
**Route:** `/guides/peptide-tiktok-myths`
**Target Query:** "peptide myths TikTok"

**Quick Answer:** TikTok has popularized peptides with viral claims about "wolverine healing," "reversing aging," and "miracle fat loss." Most of these claims extrapolate wildly from limited animal research. This guide fact-checks the most common TikTok peptide claims against what peer-reviewed research actually shows.

**Sections:**
1. Myth: "BPC-157 heals anything in 2 weeks"
2. Myth: "Peptides are completely safe because they're natural"
3. Myth: "The FDA banned peptides because Big Pharma"
4. Myth: "Everyone in Hollywood uses peptides"
5. Myth: "You don't need a doctor for peptides"
6. What's Actually True
7. Primary Sources
8. FAQ

---

## Part 5: Update Existing Guides (4 Pages)

Add to each of these existing guide pages:
- **EvidenceTable** component (after QuickAnswerBox, before main content)
- **GuideChangelog** component (before FAQ section)
- **"Last reviewed" date** visible near title (update QuickAnswerBox)

### Pages to Update:
| Page | Evidence Table Data |
|------|---------------------|
| BPC157Guide.tsx | 4-5 animal studies from systematic review |
| FDALegalStatusGuide.tsx | Regulatory timeline table (different format) |
| ArePeptidesSafeGuide.tsx | General safety evidence summary |
| BPC157vsTB500Guide.tsx | Comparative evidence table |

---

## Part 6: File Changes Summary

### New Files to Create (12 files)

| File | Type |
|------|------|
| `src/components/guides/EvidenceTable.tsx` | Component |
| `src/components/guides/GuideChangelog.tsx` | Component |
| `src/pages/EditorialPolicy.tsx` | Page |
| `src/pages/Partners.tsx` | Page |
| `src/pages/guides/BPC157CancerRisk.tsx` | Guide |
| `src/pages/guides/BPC157DrugTest.tsx` | Guide |
| `src/pages/guides/BPC157InfectionRisk.tsx` | Guide |
| `src/pages/guides/TB500SideEffects.tsx` | Guide |
| `src/pages/guides/CJC1295Safety.tsx` | Guide |
| `src/pages/guides/VerifyPeptideCOA.tsx` | Guide |
| `src/pages/guides/PeptideContamination.tsx` | Guide |
| `src/pages/guides/PeptideTikTokMyths.tsx` | Guide |

### Files to Modify (8 files)

| File | Changes |
|------|---------|
| `src/App.tsx` | Add 10 new routes |
| `src/pages/About.tsx` | Add Editorial Policy link, advisor structure |
| `src/pages/Guides.tsx` | Add 8 new guide cards |
| `src/pages/guides/BPC157Guide.tsx` | Add EvidenceTable, GuideChangelog |
| `src/pages/guides/FDALegalStatusGuide.tsx` | Add timeline table, GuideChangelog |
| `src/pages/guides/ArePeptidesSafeGuide.tsx` | Add EvidenceTable, GuideChangelog |
| `src/pages/guides/BPC157vsTB500Guide.tsx` | Add EvidenceTable, GuideChangelog |
| `src/components/landing/Footer.tsx` | Add Editorial Policy and Partners links |
| `public/sitemap.xml` | Add 10 new URLs |

---

## Part 7: Sitemap Additions

Add these URLs to `public/sitemap.xml`:

```xml
<!-- Trust Signal Pages -->
<url>
  <loc>https://peptideplaybook.com/editorial-policy</loc>
  <lastmod>2026-02-02</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.6</priority>
</url>
<url>
  <loc>https://peptideplaybook.com/partners</loc>
  <lastmod>2026-02-02</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
</url>

<!-- Fear/Safety Pages (8 entries) -->
<url>
  <loc>https://peptideplaybook.com/guides/bpc-157-cancer-risk</loc>
  <lastmod>2026-02-02</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
<!-- ... 7 more guide entries -->
```

---

## Part 8: Implementation Priority Order

1. **EvidenceTable component** (used by multiple pages)
2. **GuideChangelog component** (used by all guides)
3. **EditorialPolicy page** (trust signal, links from other pages)
4. **Partners page** (revenue driver)
5. **PeptideTikTokMyths guide** (shareable, linkable, high engagement)
6. **BPC157CancerRisk guide** (high intent query)
7. **VerifyPeptideCOA guide** (high intent query)
8. Update 4 existing guides with EvidenceTable + Changelog
9. Remaining fear/safety pages
10. Sitemap and routing updates
11. Footer link updates

---

## Technical Notes

- All new guides follow the exact same pattern as `BPC157Guide.tsx`
- EvidenceTable is mobile-first (card view on small screens, table on desktop)
- GuideChangelog is collapsible to save vertical space
- QuickAnswerBox already displays "Last Updated" date
- Partners form will use a simple state-based form (no backend needed initially)
- All external links open in new tabs with `rel="noopener noreferrer"`
- FAQ schema automatically injected via GuideFAQ component

---

## Acceptance Checklist

After implementation:
- [ ] EvidenceTable displays correctly with colored badges
- [ ] GuideChangelog shows update history on all guides
- [ ] EditorialPolicy page is accessible and linked from footer
- [ ] Partners page displays application form
- [ ] All 8 new guides are accessible and have FAQ schema
- [ ] Existing 4 guides have EvidenceTable added
- [ ] Sitemap includes all 10 new URLs
- [ ] Footer links to Editorial Policy and Partners
- [ ] All pages pass mobile responsiveness check
- [ ] No dosing advice anywhere in new content

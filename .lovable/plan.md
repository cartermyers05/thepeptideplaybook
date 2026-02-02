

# Citation-Grade Upgrade: Static Guides + Database Articles

## Overview

This plan upgrades all existing guide pages and database article templates to "citation-grade" for AI search engines. The changes add structured evidence sections, primary sources, and explicit "What We Don't Know" content.

---

## Scope Analysis

### Static Guide Pages to Update (4 files)

| File | Current Structure |
|------|-------------------|
| `src/pages/guides/BPC157Guide.tsx` | Has "Research" section combined, no Primary Sources, no "What We Don't Know" |
| `src/pages/guides/FDALegalStatusGuide.tsx` | No research evidence sections (regulatory focus), no Primary Sources |
| `src/pages/guides/ArePeptidesSafeGuide.tsx` | Has combined safety info, no Primary Sources, no "What We Don't Know" |
| `src/pages/guides/BPC157vsTB500Guide.tsx` | Has "Research Reality" section, no Primary Sources, no "What We Don't Know" |

### Database Article Templates to Update (2 files)

| File | Purpose |
|------|---------|
| `src/pages/ArticleDetail.tsx` | Renders articles from `/articles/*` route |
| `src/pages/BlogPost.tsx` | Renders articles from `/blog/*` route |

### Domain Consistency Fix

Current `src/lib/seo.ts` uses `peptideplaybook.com` but published URL is `thepeptideplaybook.lovable.app`. The sitemap uses `.com`. This needs to be consistent.

---

## Changes Per Requirement

### 1. Add "Primary Sources" Section

**Placement:** Immediately before the GuideFAQ component

**Global links (use on ALL pages):**
- FDA Bulk Drug Substances: `https://www.fda.gov/drugs/human-drug-compounding/bulk-drug-substances-used-compounding`
- WADA Prohibited List: `https://www.wada-ama.org/en/prohibited-list`

**BPC-157 specific PubMed links:**
- `https://pubmed.ncbi.nlm.nih.gov/30915550/` (Systematic review)
- `https://pubmed.ncbi.nlm.nih.gov/21030672/` (Tendon healing)
- `https://pubmed.ncbi.nlm.nih.gov/27847366/` (Mechanism study)

**Format per page:**
```tsx
<section id="primary-sources" className="mb-10">
  <h2 className="text-2xl font-bold mb-4">Primary Sources</h2>
  <ul className="space-y-3">
    <li>
      <a href="URL" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
        Paper Title
      </a>
      <span className="text-muted-foreground"> — 1-sentence description</span>
    </li>
  </ul>
</section>
```

---

### 2. Split Evidence Sections into Animal & Lab Studies + Human Evidence

**Current state per file:**

| File | Current Section | Split Into |
|------|-----------------|------------|
| BPC157Guide.tsx | "What Does the Research Actually Show?" | "Animal & Lab Studies" + "Human Evidence" |
| ArePeptidesSafeGuide.tsx | "Research Peptide Safety" | "Animal & Lab Studies" + "Human Evidence" |
| BPC157vsTB500Guide.tsx | "Research Reality" | "Animal & Lab Studies" + "Human Evidence" |
| FDALegalStatusGuide.tsx | N/A (regulatory focus) | Add minimal "Evidence Context" section explaining FDA's reasoning |

**Required content per section:**

Animal & Lab Studies:
- What animal/cell data suggests
- Explicit limitation: "Animal models don't reliably predict human outcomes"

Human Evidence:
- If no trials exist: "No published human clinical trials exist for [TOPIC]."
- If trials exist: Summarize with sample size, endpoints, duration, limitations

---

### 3. Add "What We Don't Know" Section

**Placement:** After the Risks/Safety section (or create one if missing)

**Add to TOC:** `{ id: "what-we-dont-know", title: "What We Don't Know", level: 2 }`

**Standard bullets (adapt per topic):**

```tsx
<section id="what-we-dont-know" className="mb-10">
  <h2 className="text-2xl font-bold mb-4">What We Don't Know</h2>
  <p className="text-muted-foreground mb-4 leading-relaxed">
    Despite available research, significant knowledge gaps remain:
  </p>
  <ul className="list-disc list-inside text-muted-foreground space-y-2">
    <li>Long-term safety in humans (no multi-year studies exist)</li>
    <li>Optimal protocols (no clinical data to establish regimens)</li>
    <li>Drug interactions (never formally studied)</li>
    <li>Effects in specific populations (pregnancy, elderly, chronic disease)</li>
    <li>Product purity risks from unregulated sources</li>
    <li>Whether animal findings translate to clinical outcomes in humans</li>
  </ul>
</section>
```

---

### 4. Update QuickAnswerBox to State Evidence Level

**Pattern for each QuickAnswerBox:**

First 1-3 sentences must explicitly state:
1. What evidence exists (animal/lab vs human)
2. What does NOT exist (no human trials if applicable)
3. Regulatory status if relevant (not FDA-approved, WADA banned)

**Example rewrites:**

BPC157Guide.tsx (current):
> "BPC-157 (Body Protection Compound-157) is a synthetic peptide derived from..."

BPC157Guide.tsx (updated):
> "BPC-157 has shown tissue-healing effects in animal studies, but no published human clinical trials prove safety or efficacy. Because it is FDA Category 2 and not approved for human use, all claims should be treated as unproven. Animal research suggests potential mechanisms, but these do not translate to proven human benefits."

---

## File-by-File Changes

### BPC157Guide.tsx

| Change | Location |
|--------|----------|
| Update QuickAnswerBox answer text | Line 102-106 |
| Add to tocItems: "animal-lab-studies", "human-evidence", "what-we-dont-know", "primary-sources" | Lines 11-20 |
| Split section id="research" into two sections | Lines 149-207 |
| Add "What We Don't Know" section after safety section | After line 244 |
| Add "Primary Sources" section before FAQ | Before line 298 |

### FDALegalStatusGuide.tsx

| Change | Location |
|--------|----------|
| Update QuickAnswerBox to state regulatory basis (not evidence-based) | Line 96-100 |
| Add to tocItems: "what-we-dont-know", "primary-sources" | Lines 11-19 |
| Add "What We Don't Know" section (regulatory uncertainty focus) | After line 243 |
| Add "Primary Sources" section before FAQ | Before line 245 |

### ArePeptidesSafeGuide.tsx

| Change | Location |
|--------|----------|
| Update QuickAnswerBox answer text | Line 95-98 |
| Add to tocItems: "animal-lab-studies", "human-evidence", "what-we-dont-know", "primary-sources" | Lines 11-18 |
| Split "Research Peptide Safety" section into two | Lines 152-197 |
| Add "What We Don't Know" section after extra-cautious section | After line 232 |
| Add "Primary Sources" section before FAQ | Before line 234 |

### BPC157vsTB500Guide.tsx

| Change | Location |
|--------|----------|
| Update QuickAnswerBox answer text | Line 95-98 |
| Add to tocItems: "animal-lab-studies", "human-evidence", "what-we-dont-know", "primary-sources" | Lines 11-18 |
| Split "Research Reality" into two sections | Lines 189-205 |
| Add "What We Don't Know" section after stacking section | After line 223 |
| Add "Primary Sources" section before FAQ | Before line 225 |

### ArticleDetail.tsx (Database Articles)

The database articles use `DirectAnswerBlock` component which displays `article.tldr` as the quick answer. The content structure comes from `article.full_content` (markdown).

Changes needed:
- Update DirectAnswerBlock component to include evidence-level framing
- Add fallback Primary Sources section if `article.citations` is empty
- Inject "What We Don't Know" guidance into the template structure

However, since database articles have dynamic content, we need to:
1. Add a new `PrimarySources` component for static fallback links
2. Add a `WhatWeDontKnow` component for injectable uncertainty disclosure
3. Modify `ArticleDetail.tsx` and `BlogPost.tsx` to include these sections

### BlogPost.tsx (Database Articles)

Same changes as ArticleDetail.tsx:
- Add PrimarySources fallback component
- Add WhatWeDontKnow component  
- Ensure TLDRBox states evidence level (via component update)

---

## New Components to Create

### 1. PrimarySources.tsx

```tsx
// src/components/articles/PrimarySources.tsx
// Displays standard primary source links when article.citations is empty
// Includes FDA and WADA global links
```

### 2. WhatWeDontKnow.tsx

```tsx
// src/components/articles/WhatWeDontKnow.tsx
// Displays standard uncertainty bullets
// Accepts optional topic-specific customization
```

### 3. Update TLDRBox.tsx

Update to accept an optional `evidenceLevel` prop that prepends evidence framing.

---

## Domain Consistency Check

**Current state in `src/lib/seo.ts`:**
```ts
export const SITE_URL = "https://peptideplaybook.com";
```

**In sitemap.xml:**
Uses `peptideplaybook.com`

**Published URL:**
`thepeptideplaybook.lovable.app`

**Decision:** Keep `.com` domain as canonical (user appears to own this domain or intends to). The `.lovable.app` is the development/staging URL. No change needed as `.com` is the production intent.

---

## Implementation Order

1. **Create new components** (PrimarySources, WhatWeDontKnow, update TLDRBox)
2. **Update static guide pages** (4 files) in order:
   - BPC157Guide.tsx
   - ArePeptidesSafeGuide.tsx
   - BPC157vsTB500Guide.tsx
   - FDALegalStatusGuide.tsx
3. **Update database article templates** (2 files):
   - ArticleDetail.tsx
   - BlogPost.tsx
4. **Verify no dosing advice added** (QA check)

---

## Acceptance Checklist

After implementation:
- [ ] Every updated page contains Primary Sources with 3-5 links
- [ ] Every updated page contains Animal & Lab Studies and Human Evidence sections (where applicable)
- [ ] Every updated page contains What We Don't Know with 4-6 bullets
- [ ] Every QuickAnswerBox explicitly states the evidence level
- [ ] No dosing instructions added anywhere
- [ ] No change to unrelated copy, layout, or URL structure
- [ ] FDA link: `https://www.fda.gov/drugs/human-drug-compounding/bulk-drug-substances-used-compounding`
- [ ] WADA link: `https://www.wada-ama.org/en/prohibited-list`
- [ ] BPC-157 PubMed links included on relevant pages

---

## Technical Notes

- All static guide pages use identical component structure (GuideLayout, QuickAnswerBox, GuideFAQ, etc.)
- Database articles use different components (DirectAnswerBlock, TLDRBox, CitationsSection)
- Both need parallel updates for consistency
- The 15 newly created guide pages (BPC157SideEffects, etc.) already follow citation-grade patterns and only need minor consistency updates to Primary Sources links


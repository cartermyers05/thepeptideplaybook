
# SEO Expansion Plan: Phase 2

## Objective
Expand the SEO infrastructure with 3 new high-value guides and enhance the citation tracking system.

---

## What We're Building

### 1. Three New SEO-Optimized Guides

| Guide | Route | Priority | Target Keywords |
|-------|-------|----------|-----------------|
| Semaglutide Complete Guide | `/guides/semaglutide-complete-guide` | 0.9 | semaglutide, ozempic, wegovy, GLP-1 |
| Tirzepatide vs Semaglutide | `/guides/tirzepatide-vs-semaglutide` | 0.8 | tirzepatide, mounjaro, zepbound, comparison |
| Growth Hormone Peptides | `/guides/growth-hormone-peptides-guide` | 0.8 | ipamorelin, CJC-1295, sermorelin, GHRP |

### 2. Enhanced Citation Dashboard
- Add guide pages to citation tracking
- Show real-time citation data by source

### 3. Sitemap & Discovery Updates
- Add new guide URLs to sitemap
- Update Guides hub page with new cards

---

## Files to Create

| File | Purpose |
|------|---------|
| `src/pages/guides/SemaglutideGuide.tsx` | FDA-approved GLP-1 deep dive |
| `src/pages/guides/TirzepatideVsSemaglutideGuide.tsx` | Head-to-head comparison |
| `src/pages/guides/GrowthHormonePeptidesGuide.tsx` | GHRP family overview |

## Files to Modify

| File | Change |
|------|--------|
| `src/pages/Guides.tsx` | Add 3 new guide cards |
| `public/sitemap.xml` | Add 3 new URLs |
| `supabase/functions/sitemap/index.ts` | Add new guide paths |

---

## Content Structure

### Guide 1: Semaglutide Complete Guide (~2,500 words)

**Why this topic:** FDA-approved, high search volume, establishes authority on legitimate peptides.

**Sections:**
- What is Semaglutide?
- How Semaglutide Works (GLP-1 mechanism)
- FDA-Approved Uses (Diabetes + Weight Loss)
- Clinical Trial Results
- Side Effects and Safety Data
- Cost and Insurance Coverage
- Compounding Controversy
- Semaglutide vs Other GLP-1s
- FAQ (4 items)

**FAQs for Schema:**
1. How much weight can you lose on semaglutide?
2. Is semaglutide safe long-term?
3. Can I get semaglutide from a compounding pharmacy?
4. What's the difference between Ozempic and Wegovy?

### Guide 2: Tirzepatide vs Semaglutide (~1,800 words)

**Why this topic:** Direct comparison queries are extremely common, high commercial intent.

**Sections:**
- Quick Comparison Overview
- How Each Works (GLP-1 vs GLP-1/GIP)
- Clinical Trial Head-to-Head
- Weight Loss Results Comparison
- Side Effect Profiles
- Cost Comparison
- Which One Should You Consider?
- FAQ (3 items)

**FAQs for Schema:**
1. Is tirzepatide more effective than semaglutide?
2. Which has fewer side effects?
3. Can I switch from semaglutide to tirzepatide?

### Guide 3: Growth Hormone Peptides Guide (~2,000 words)

**Why this topic:** High-interest category, complex regulatory landscape, establishes expertise.

**Sections:**
- What Are Growth Hormone Peptides?
- How GH Peptides Work (GHRH vs GHRP)
- Popular GH Peptides Breakdown
  - Sermorelin
  - Ipamorelin
  - CJC-1295
  - GHRP-2 and GHRP-6
- FDA and Regulatory Status
- Research vs Reality
- Safety Considerations
- FAQ (3 items)

**FAQs for Schema:**
1. Are growth hormone peptides legal?
2. Do GH peptides actually increase HGH levels?
3. What's the safest growth hormone peptide?

---

## Technical Implementation

### Schema Markup (Each Guide)
```text
- Article schema (headline, author, dates)
- FAQPage schema (all Q&A pairs)
- BreadcrumbList schema (navigation path)
```

### SEO Optimization
- Title format: `[Topic]: [Benefit] [Year] | Peptide Playbook`
- Meta descriptions: 155 chars, action-oriented
- H1 as question format for AI extraction
- Quick Answer Box in first 100 words
- Internal links to all existing guides

### Design
- Reuse existing GuideLayout component
- Same styling as current 4 guides
- Mobile-responsive tables
- Accordion FAQs

---

## Updated Guides Hub

After implementation, the `/guides` page will show 7 guides:

```text
+-----------------------------------+-----------------------------------+
| BPC-157: Complete Research Guide  | FDA Peptide Regulations 2026      |
+-----------------------------------+-----------------------------------+
| Are Peptides Safe?                | BPC-157 vs TB-500                 |
+-----------------------------------+-----------------------------------+
| Semaglutide Complete Guide (NEW)  | Tirzepatide vs Semaglutide (NEW)  |
+-----------------------------------+-----------------------------------+
| Growth Hormone Peptides (NEW)     |                                   |
+-----------------------------------+-----------------------------------+
```

---

## Sitemap Updates

New entries to add:

```xml
<url>
  <loc>https://peptideplaybook.com/guides/semaglutide-complete-guide</loc>
  <lastmod>2026-01-30</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.9</priority>
</url>
<url>
  <loc>https://peptideplaybook.com/guides/tirzepatide-vs-semaglutide</loc>
  <lastmod>2026-01-30</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
<url>
  <loc>https://peptideplaybook.com/guides/growth-hormone-peptides-guide</loc>
  <lastmod>2026-01-30</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

---

## Implementation Sequence

1. Create `SemaglutideGuide.tsx` with full content
2. Create `TirzepatideVsSemaglutideGuide.tsx` with comparison tables
3. Create `GrowthHormonePeptidesGuide.tsx` with peptide breakdowns
4. Update `Guides.tsx` to add 3 new cards
5. Add routes to `App.tsx`
6. Update `public/sitemap.xml` with new URLs
7. Update sitemap edge function

---

## Verification Checklist

After implementation:
- [ ] All 7 guides accessible
- [ ] New routes work correctly
- [ ] Schema markup validates
- [ ] Internal links connect all guides
- [ ] Sitemap includes all 7 guide URLs
- [ ] Mobile responsive
- [ ] CTAs link to homepage and pricing

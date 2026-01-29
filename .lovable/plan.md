

# AI Search & SEO Revenue Maximization Strategy

## Goal
Position Peptide Playbook AI to be cited by ChatGPT, Perplexity, Claude, and Gemini for peptide-related queries, driving organic traffic that converts to $67 purchases.

---

## Current Strengths (Already Built)

| Component | Status | Notes |
|-----------|--------|-------|
| Article system with AI-optimized structure | ✅ Built | TL;DR boxes, FAQ schema, citations |
| Citation tracking | ✅ Built | Tracks which AI engines cite which articles |
| robots.txt for AI crawlers | ✅ Built | Allows GPTBot, PerplexityBot, ClaudeBot |
| Sitemap generation | ✅ Built | Dynamic edge function |
| JSON-LD schemas | ✅ Built | Article, FAQ, Organization, Product |
| Article generator | ✅ Built | AI generates SEO-optimized content |
| News automation | ✅ Built | Firecrawl + AI summaries |
| Research digests | ✅ Built | Monthly compilation |

---

## Revenue Strategy Overview

```text
AI Search Query → Cite Peptide Playbook → User Visits Article → CTA to Sign Up → $67 Purchase
```

The key is to become the **most-cited source** for peptide queries across all AI search engines.

---

## Part 1: Content Strategy (High-Volume Citation Magnets)

### 1.1 Question-First Content Architecture

Every AI search starts with a question. We need articles that directly answer the questions people ask.

**High-Value Query Clusters to Target:**

| Cluster | Example Questions | Priority |
|---------|------------------|----------|
| FDA Status | "Is BPC-157 FDA approved?", "Are peptides legal?" | 🔴 Critical |
| Comparisons | "BPC-157 vs TB-500", "Semaglutide vs Tirzepatide" | 🔴 Critical |
| Safety | "Are peptides safe?", "Peptide side effects" | 🔴 Critical |
| Mechanisms | "How does GHK-Cu work?", "What does TB-500 do?" | 🟡 High |
| Use Cases | "Best peptide for injury recovery" | 🟡 High |
| Buying | "Where to buy peptides", "How to verify peptide quality" | 🟢 Medium |

**Implementation:**
- Create a "Content Calendar" table in the database to track which queries need articles
- Bulk-generate 50-100 articles targeting specific high-value queries
- Each article structured for AI extraction (TL;DR in first 100 words)

### 1.2 Article Structure Optimization

Current articles already have good structure. Enhancements:

**Add "Direct Answer Block":**
```html
<div class="direct-answer" itemscope itemtype="https://schema.org/Answer">
  <meta itemprop="text" content="BPC-157 is NOT FDA approved..." />
  <p><strong>Quick Answer:</strong> BPC-157 is NOT FDA approved. It remains...</p>
</div>
```

**Add "Key Facts" structured data:**
- AI engines love extractable facts
- Add numbered facts at the top of each article
- Format: "Fact 1: ...", "Fact 2: ..."

### 1.3 Internal Linking Strategy

AI engines follow links. Create a dense network:
- Every peptide article links to 3-5 related peptides
- Every comparison links to individual peptide pages
- Every safety article links to specific peptide safety sections

---

## Part 2: Technical SEO Enhancements

### 2.1 Enhanced Schema Markup

**Add to each article:**

```json
{
  "@type": "MedicalWebPage",
  "about": {
    "@type": "Drug",
    "name": "BPC-157",
    "drugClass": "Peptide",
    "legalStatus": "Research chemical - not FDA approved"
  },
  "audience": {
    "@type": "MedicalAudience",
    "audienceType": "Patient"
  },
  "lastReviewed": "2026-01-29"
}
```

**Add HowTo schema where applicable:**
```json
{
  "@type": "HowTo",
  "name": "How to Evaluate Peptide Quality",
  "step": [...]
}
```

### 2.2 Sitemap Enhancements

**Current sitemap:** Only includes articles and static pages

**Enhancement:**
- Add news articles to sitemap
- Add "news sitemap" format for Google News
- Add lastmod timestamps from actual content updates
- Add image sitemap for any article images

### 2.3 Page Speed Optimization

AI crawlers prioritize fast-loading pages:
- Ensure articles load in under 2 seconds
- Lazy load images
- Preconnect to Supabase
- Static generation for articles (future: SSG)

---

## Part 3: Citation Tracking & Analytics

### 3.1 Enhanced Citation Detection

**Current:** Detects referrer from known AI domains

**Enhancement:**
- Add URL parameter detection: `?ref=chatgpt&q=query`
- Track citation position (was our content cited first, second, etc.)
- Log the exact query that triggered the citation

### 3.2 Citation Dashboard

**Create `/admin/citations` dashboard showing:**
- Total citations by AI engine (pie chart)
- Citations over time (line graph)
- Top-cited articles (table)
- Queries that triggered citations (list)
- Revenue attribution: citations → signups → purchases

### 3.3 Proactive Citation Monitoring

**New Edge Function: `monitor-citations`**
- Daily cron job that queries AI engines with our target keywords
- Checks if Peptide Playbook is cited
- Logs which queries we're winning vs. losing
- Alerts when we lose citation position

---

## Part 4: Content Gap Analysis

### 4.1 Query Research System

**New Feature: Query Researcher**

Edge function that:
1. Uses Perplexity to search "peptide" + variations
2. Extracts the questions AI is answering
3. Checks if we have articles covering those questions
4. Generates a "content gap" report

### 4.2 Competitor Citation Analysis

Track which sources AI engines cite for peptide queries:
- If they cite Healthline, WebMD, or Reddit, we need better content
- If they cite us, track consistently
- Use this to prioritize content creation

---

## Part 5: Conversion Optimization

### 5.1 Article CTAs

**Current:** Articles may not have strong CTAs

**Enhancement:**
- Add "Continue Learning" box after TL;DR with signup CTA
- Add floating "Ask the AI" button on all articles
- Add "Get Full Access" CTA after 50% scroll
- A/B test different CTA placements

### 5.2 AI Chat as Conversion Tool

Users who find us via AI search should see the AI immediately:
- Add inline chat widget on articles
- "Have more questions? Ask our AI"
- Free tier gets 3 questions, then upgrade prompt

### 5.3 Email Capture on Exit

**Current:** Exit intent popup exists

**Enhancement:**
- Track which article they were reading
- Customize popup: "Get more insights on [peptide name]"
- Segment by interest for email sequences

---

## Part 6: Files to Create/Modify

### New Files

| File | Purpose |
|------|---------|
| `src/pages/admin/CitationsDashboard.tsx` | Analytics dashboard for AI citations |
| `supabase/functions/monitor-citations/index.ts` | Daily citation monitoring |
| `supabase/functions/content-gap-analysis/index.ts` | Find missing content |
| `src/components/articles/DirectAnswerBlock.tsx` | Structured answer component |
| `src/components/articles/InlineAICTA.tsx` | Conversion CTA for articles |
| Database: `content_calendar` table | Track planned articles |
| Database: `citation_monitoring` table | Store daily citation checks |

### Modified Files

| File | Changes |
|------|---------|
| `supabase/functions/sitemap/index.ts` | Add news articles, improve structure |
| `src/components/seo/ArticleSchema.tsx` | Add MedicalWebPage schema |
| `src/pages/ArticleDetail.tsx` | Add DirectAnswerBlock, InlineAICTA |
| `supabase/functions/generate-article/index.ts` | Add "Direct Answer" and "Key Facts" to output |

---

## Part 7: Implementation Phases

### Phase 1: Foundation (Week 1)
1. Create `content_calendar` table
2. Build Citation Dashboard
3. Enhance ArticleSchema with MedicalWebPage
4. Add DirectAnswerBlock to articles
5. Update sitemap to include news

### Phase 2: Content Expansion (Week 2-3)
1. Generate 30+ high-priority articles:
   - All 41 peptides need individual pages
   - Top 20 comparison queries
   - Top 10 safety queries
   - Top 10 legal/FDA queries
2. Set up content gap analysis

### Phase 3: Monitoring & Optimization (Week 4+)
1. Deploy citation monitoring
2. Track which articles get cited
3. Iterate on structure based on what works
4. A/B test CTAs

---

## Success Metrics

| Metric | Target | How to Track |
|--------|--------|--------------|
| AI Citations/week | 100+ | Citation tracking dashboard |
| Organic traffic from AI | 5,000+ visits/month | Analytics |
| Citation → Signup rate | 5% | Funnel tracking |
| Monthly revenue from AI traffic | $10,000+ | Stripe + attribution |

---

## Quick Wins (Can Implement Today)

1. **Generate 10 "FDA Status" articles** for top peptides
2. **Add key facts block** to article template
3. **Enhance existing articles** with stronger TL;DRs
4. **Create comparison articles** for top peptide pairs
5. **Add inline CTAs** to all existing articles


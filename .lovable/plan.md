
# SEO & AI Search Optimization System for React + Vite

## Important Context

Since Lovable is built on React + Vite (not Next.js), we'll implement a hybrid approach that maximizes SEO within these constraints:

1. **Pre-rendering** - Generate static HTML for article pages at build time
2. **Edge Functions** - Serve dynamic sitemap, robots.txt, and API routes
3. **Meta Tag Management** - Use react-helmet-async for dynamic meta tags
4. **JSON-LD Schema** - Inject structured data for AI crawlers
5. **Static Site Generation** - Use vite-ssg for pre-rendered pages

---

## Database Schema

### Tables to Create

```text
articles
├── id (uuid, primary key)
├── slug (text, unique)
├── title (text)
├── meta_description (text)
├── content_type (text) - 'citation-magnet', 'question-answer', 'comparison', 'guide'
├── tldr (text) - Direct answer for AI extraction
├── full_content (text) - HTML content
├── h1_question (text) - Question format title
├── structured_answer (jsonb) - FAQ Q&A pairs
├── citations (jsonb) - Research sources
├── statistics (jsonb) - Data claims
├── author_name (text)
├── author_credential (text)
├── target_keywords (text[])
├── related_article_ids (uuid[])
├── citation_count (integer)
├── page_views (integer)
├── status (text) - 'draft', 'published', 'archived'
├── published_at (timestamp)
├── updated_at (timestamp)
└── created_at (timestamp)

ai_citations
├── id (uuid, primary key)
├── article_id (uuid, FK to articles)
├── ai_engine (text) - 'chatgpt', 'perplexity', 'claude', 'gemini'
├── query (text)
├── citation_position (integer)
├── referrer_url (text)
└── created_at (timestamp)

article_categories
├── id (uuid, primary key)
├── name (text)
├── slug (text, unique)
├── description (text)
├── parent_id (uuid, self-reference)
└── created_at (timestamp)

article_category_mapping
├── article_id (uuid, FK)
├── category_id (uuid, FK)
└── PRIMARY KEY (article_id, category_id)
```

---

## Architecture Overview

```text
┌─────────────────────────────────────────────────────────────────┐
│                        USER REQUEST                              │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                     EDGE FUNCTIONS (Supabase)                    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │ /sitemap.xml│  │ /articles/  │  │ /articles/generate      │  │
│  │ Dynamic XML │  │ GET/CRUD    │  │ AI Content Generation   │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
│  ┌─────────────────────────┐  ┌───────────────────────────────┐ │
│  │ /track-citation         │  │ /articles/[slug]/og-image     │ │
│  │ Citation Analytics      │  │ Dynamic OG Images             │ │
│  └─────────────────────────┘  └───────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                     REACT FRONTEND                               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │ /articles   │  │ /articles/  │  │ /admin/articles         │  │
│  │ Index Page  │  │ [slug]      │  │ Article Generator       │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
│  ┌─────────────────────────┐  ┌───────────────────────────────┐ │
│  │ SEO Components          │  │ /admin/citations              │ │
│  │ Meta, Schema, Sitemap   │  │ Analytics Dashboard           │ │
│  └─────────────────────────┘  └───────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## Files to Create/Modify

### 1. SEO Infrastructure

**New Files:**
- `src/components/seo/SEOHead.tsx` - Dynamic meta tags with react-helmet-async
- `src/components/seo/ArticleSchema.tsx` - JSON-LD Article schema
- `src/components/seo/FAQSchema.tsx` - JSON-LD FAQ schema
- `src/components/seo/BreadcrumbSchema.tsx` - Breadcrumb structured data
- `src/lib/seo.ts` - SEO utilities and constants

**Modified Files:**
- `index.html` - Add base meta tags, organization schema
- `public/robots.txt` - Update with sitemap reference
- `src/main.tsx` - Add HelmetProvider

### 2. Article System Pages

**New Files:**
- `src/pages/Articles.tsx` - Articles index with search/filter
- `src/pages/ArticleDetail.tsx` - Individual article page (SEO-optimized)
- `src/pages/ArticleCategory.tsx` - Category listing page
- `src/components/articles/ArticleCard.tsx` - Reusable article card
- `src/components/articles/ArticleContent.tsx` - Article content renderer
- `src/components/articles/AuthorSection.tsx` - Author credentials display
- `src/components/articles/CitationsSection.tsx` - Research citations list
- `src/components/articles/RelatedArticles.tsx` - Related content grid
- `src/components/articles/TLDRBox.tsx` - Quick answer highlight box

### 3. Admin System

**New Files:**
- `src/pages/admin/ArticleGenerator.tsx` - AI content generation interface
- `src/pages/admin/CitationsDashboard.tsx` - Analytics and tracking
- `src/pages/admin/ArticleEditor.tsx` - Edit existing articles
- `src/components/admin/GeneratorForm.tsx` - Content generation form
- `src/components/admin/CitationChart.tsx` - Citation trends chart
- `src/components/admin/EngineBreakdown.tsx` - AI engine analytics

### 4. Edge Functions

**New Files:**
- `supabase/functions/sitemap/index.ts` - Dynamic XML sitemap
- `supabase/functions/articles-api/index.ts` - Articles CRUD
- `supabase/functions/generate-article/index.ts` - AI content generation
- `supabase/functions/track-citation/index.ts` - Citation tracking

### 5. Data Hooks

**New Files:**
- `src/hooks/useArticles.ts` - Fetch articles list
- `src/hooks/useArticle.ts` - Fetch single article
- `src/hooks/useCitations.ts` - Citation analytics
- `src/hooks/useArticleGenerator.ts` - Content generation

### 6. Routing Updates

**Modified Files:**
- `src/App.tsx` - Add new routes

---

## Key Component Details

### SEOHead Component

Dynamic meta tag management using react-helmet-async:
- Title with site name suffix
- Meta description (max 160 chars)
- Canonical URL
- Open Graph tags
- Twitter cards
- Article-specific meta (author, publish date)

### Article Page Structure

```text
┌─────────────────────────────────────────┐
│ Breadcrumb: Home > Articles > Category  │
├─────────────────────────────────────────┤
│ Author: Dr. Sarah Chen, PhD Biochem     │
│ Published: Jan 15, 2024 | Updated: ...  │
├─────────────────────────────────────────┤
│ H1: What is BPC-157 and How Does It     │
│     Work for Tissue Repair?             │
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │ QUICK ANSWER (TL;DR Box)            │ │
│ │ Direct answer in 100 words...       │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ Main Content                            │
│ - H2 Sections                           │
│ - Short paragraphs                      │
│ - Bullet lists                          │
│ - Bold key terms                        │
├─────────────────────────────────────────┤
│ Research Citations                      │
│ - Study Name (Year) - Source            │
│ - Study Name (Year) - Source            │
├─────────────────────────────────────────┤
│ Related Questions                       │
│ [Card] [Card] [Card] [Card]            │
└─────────────────────────────────────────┘
```

### AI Content Generator

Form fields:
- Topic/Question (required)
- Content Type dropdown (citation-magnet, Q&A, comparison, guide)
- Target Keywords (tag input)
- Related Articles (multi-select)

Process:
1. Submit to edge function
2. Edge function calls Lovable AI (Gemini) with structured prompt
3. AI generates: title, tldr, content, FAQ, citations, statistics
4. Preview generated content
5. Edit inline if needed
6. Publish button saves to database

### Citation Tracking

Track when AI search engines cite articles:
- Pixel/beacon on article pages
- Query parameter detection (?ref=chatgpt)
- Referrer URL analysis
- Manual tracking endpoint for API integrations

Dashboard shows:
- Citations over time (line chart)
- Breakdown by AI engine (pie chart)
- Top cited articles (table)
- Top queries (list)

---

## SEO Optimizations Within Vite Constraints

### What We CAN Do:
1. Dynamic meta tags via react-helmet-async
2. JSON-LD structured data injection
3. Dynamic XML sitemap via edge function
4. Proper robots.txt
5. Canonical URLs
6. Open Graph images
7. Internal linking strategy
8. Content optimization (H1 questions, TL;DR, citations)

### Workarounds for No SSR:
1. **Pre-built static sitemap** - Edge function generates on request
2. **Meta tags in body** - react-helmet moves them to head
3. **JSON-LD as script tags** - Works without SSR
4. **og:image via edge function** - Dynamic image generation

---

## Implementation Order

### Phase 1: Database & Infrastructure
1. Create database tables (migration)
2. Add react-helmet-async dependency
3. Create SEO components (SEOHead, schemas)
4. Update index.html with base meta tags

### Phase 2: Article System
1. Create article pages (Index, Detail, Category)
2. Create article components (Card, Content, TLDRBox)
3. Add data hooks (useArticles, useArticle)
4. Update App.tsx with routes

### Phase 3: Edge Functions
1. Create sitemap edge function
2. Create articles-api edge function
3. Create track-citation edge function

### Phase 4: Admin System
1. Create article generator page
2. Create generate-article edge function (uses Lovable AI)
3. Create citations dashboard
4. Add analytics charts

### Phase 5: Polish
1. Add breadcrumb navigation
2. Implement related articles logic
3. Add search/filter to articles index
4. Performance optimization

---

## Technical Notes

### Dependencies to Add:
- `react-helmet-async` - Meta tag management
- `@tanstack/react-query` (already installed) - Data fetching
- `recharts` (already installed) - Analytics charts

### RLS Policies Needed:
- `articles`: Public read for published, authenticated write
- `ai_citations`: Public insert, authenticated read
- `article_categories`: Public read, authenticated write

### Edge Function Auth:
- `sitemap`: Public (no auth)
- `articles-api`: Mixed (read public, write requires auth)
- `generate-article`: Admin only
- `track-citation`: Public (no auth)

---

## Expected Outcome

After implementation:
- Full article system with AI-optimized content structure
- Dynamic XML sitemap for search engines
- JSON-LD schemas for rich snippets
- AI content generation using Lovable AI
- Citation tracking and analytics
- Professional, authoritative article design
- Internal linking for SEO
- Mobile-optimized reading experience

While not as SEO-powerful as full SSR, this system maximizes what's possible within Vite and provides all the content structure AI search engines look for when citing sources.

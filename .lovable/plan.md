
# In-App News System: Full Stories with Summaries

## Overview

Transform the News tab from linking to external sites into a full in-app reading experience. Users will be able to read complete peptide news stories within the platform, with clear summaries displayed under each title.

---

## Current Problem

The News tab currently uses mock data that links to external URLs (FDA.gov, PubMed, etc.):
- Users click on a story and leave the site
- No full content is available in-app
- No summaries beyond short excerpts
- Mock data only - not from database

---

## Solution Architecture

### 1. Create a `news_articles` Database Table

**Fields:**
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| slug | text | URL-friendly identifier |
| title | text | Story headline |
| summary | text | 2-3 sentence summary (displayed on cards) |
| full_content | text | Complete story content (HTML/Markdown) |
| category | text | research, clinical, regulatory, industry |
| source_name | text | Original source (e.g., "Journal of Peptide Science") |
| source_url | text | Link to original source (for attribution) |
| featured | boolean | Is this the top story? |
| published_at | timestamp | Publication date |
| created_at | timestamp | Record creation |
| updated_at | timestamp | Last update |

### 2. Create News Detail Page

**Route:** `/news/:slug`

**Layout:**
- Header with title and metadata
- Summary box (prominently displayed)
- Full article content
- Source attribution at bottom
- Related stories
- "Back to News" navigation

### 3. Update News Components

**NewsCard.tsx changes:**
- Remove external link (`<a href>`)
- Add internal navigation (`<Link to>`)
- Show summary below title prominently
- Change "Read Article" to "Read Full Story"

**NewsFeed.tsx changes:**
- Fetch from database instead of mock data
- Add useQuery hook for news articles
- Update featured story to link internally

### 4. Create News Hook

**File:** `src/hooks/useNews.ts`
- `useNewsArticles()` - fetch all news
- `useNewsArticle(slug)` - fetch single article
- Filter by category support

---

## Visual Design

### News Card (Updated)

```text
┌─────────────────────────────────────────┐
│ [Research]                    5 min     │
│                                         │
│ New BPC-157 Study Reveals               │
│ Mechanism Details                       │
│                                         │
│ Summary: A comprehensive study from     │
│ Croatian researchers demonstrates       │
│ how BPC-157 modulates VEGF pathways...  │
│                                         │
│ ─────────────────────────────────────── │
│ Journal of Peptide Science • Jan 25     │
│                        [Read Full Story]│
└─────────────────────────────────────────┘
```

### News Detail Page

```text
┌─────────────────────────────────────────────────┐
│ ← Back to News                                  │
│                                                 │
│ [Research]  Jan 25, 2025  •  5 min read        │
│                                                 │
│ New BPC-157 Study Reveals Mechanism Details     │
│ ════════════════════════════════════════════    │
│                                                 │
│ ┌─────────────────────────────────────────────┐ │
│ │ 📋 Summary                                  │ │
│ │                                             │ │
│ │ A comprehensive study published in the      │ │
│ │ Journal of Peptide Science explores how     │ │
│ │ BPC-157 promotes angiogenesis and modulates │ │
│ │ growth factor expression.                   │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
│ [Full Article Content...]                       │
│                                                 │
│ ─────────────────────────────────────────────── │
│ Source: Journal of Peptide Science              │
│ Original Article: [View Source →]               │
│                                                 │
│ Related Stories                                 │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐            │
│ │ Story 1 │ │ Story 2 │ │ Story 3 │            │
│ └─────────┘ └─────────┘ └─────────┘            │
└─────────────────────────────────────────────────┘
```

---

## Files to Create

| File | Description |
|------|-------------|
| `src/pages/NewsDetail.tsx` | Full news story page |
| `src/hooks/useNews.ts` | News data fetching hooks |
| `src/components/dashboard/NewsSummary.tsx` | Summary box component |

## Files to Update

| File | Changes |
|------|---------|
| `src/App.tsx` | Add `/news/:slug` route |
| `src/components/dashboard/NewsCard.tsx` | Internal links, add summary display |
| `src/components/dashboard/NewsFeed.tsx` | Fetch from database, internal links |

## Database Changes

| Action | Description |
|--------|-------------|
| Create `news_articles` table | Store all news content |
| Insert seed data | 6 initial news stories with full content |

---

## Seed Content (6 Stories)

Each story will include:
- Compelling title
- 2-3 sentence summary
- 500-800 word full content
- Proper category
- Source attribution

**Stories:**
1. BPC-157 mechanism research (research)
2. FDA peptide guidance update (regulatory)
3. GLP-1 Phase 2 trial results (clinical)
4. Peptide quality control advances (industry)
5. TB-500 wound healing findings (research)
6. GH secretagogue safety review (clinical)

---

## Technical Implementation

### useNews Hook Pattern

```typescript
// Fetch all news articles
const { data: articles, isLoading } = useNewsArticles({
  category: "research", // optional filter
  limit: 10
});

// Fetch single article
const { data: article } = useNewsArticle("bpc-157-mechanism-study");
```

### Navigation Flow

```text
News Tab → Click Story Card → /news/[slug] → Read Full Story
                                          → Click "Back to News"
                                          → Return to News Tab
```

---

## Key Features

1. **In-App Reading** - No more leaving the site to read stories
2. **Prominent Summaries** - 2-3 sentence summary displayed on every card and at top of article
3. **Source Attribution** - Always credit original sources with optional "View Source" link
4. **Category Filtering** - Works the same as before
5. **Featured Story** - Top story hero still works, just links internally
6. **Read Time Estimates** - Based on actual content length
7. **Related Stories** - Show similar category articles at bottom

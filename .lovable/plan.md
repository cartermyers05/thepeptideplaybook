

# Automated News & Research Digest System

## Summary

Build an automated content pipeline that keeps your users updated with fresh peptide news and monthly research digests - all generated and published automatically without manual intervention.

---

## Current State Analysis

| Feature | Status | Issue |
|---------|--------|-------|
| News Articles | Database ✓ | Manual entry only |
| Research Digests | Hardcoded ✓ | Not in database, static content |
| Auto-publishing | Missing ✗ | No scheduled jobs |
| External sources | Missing ✗ | No news aggregation |

---

## What We'll Build

### 1. Automated News Generation Pipeline

A backend function that runs daily to:
- Search for latest peptide research and industry news
- Generate AI-powered summaries
- Automatically publish to the news feed
- Categorize by type (research, clinical, regulatory, industry)

### 2. Monthly Research Digest System

Store digests in the database with:
- Automatic generation on the 1st of each month
- AI-compiled highlights from the past month's news
- Email notification to paid subscribers (optional)

### 3. Scheduled Jobs

Set up automated triggers:
- **Daily**: Scan for new research/news
- **Monthly**: Compile and publish digest
- **Weekly**: Review and feature top stories

---

## Technical Implementation

### Part 1: Database Updates

**New table: `research_digests`**
```sql
CREATE TABLE research_digests (
  id UUID PRIMARY KEY,
  month TEXT NOT NULL,           -- "January 2026"
  date DATE NOT NULL,            -- 2026-01-01
  highlights JSONB NOT NULL,     -- Array of highlight strings
  full_content TEXT NOT NULL,    -- Markdown content
  sources JSONB,                 -- Array of source objects
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### Part 2: New Backend Function

**`supabase/functions/generate-news/index.ts`**

Automated news generation that:
1. Uses web search to find latest peptide news
2. Filters for relevance (peptides, FDA, research, clinical trials)
3. Generates AI summaries for each story
4. Saves to `news_articles` table
5. Marks one story as "featured" daily

**Sources to monitor:**
- PubMed for new peptide research
- FDA announcements
- ClinicalTrials.gov updates
- Major science news outlets

### Part 3: Digest Generation Function

**`supabase/functions/generate-digest/index.ts`**

Monthly digest compiler:
1. Pulls all news from the past month
2. Uses AI to identify top 3-5 most important stories
3. Generates comprehensive analysis
4. Saves to `research_digests` table
5. Optionally triggers email notification

### Part 4: Scheduled Jobs (pg_cron)

Enable `pg_cron` extension and create jobs:

```sql
-- Daily news generation (runs at 8 AM UTC)
SELECT cron.schedule(
  'daily-news-generation',
  '0 8 * * *',
  $$ SELECT net.http_post(...) $$
);

-- Monthly digest (runs on 1st at 6 AM UTC)
SELECT cron.schedule(
  'monthly-digest',
  '0 6 1 * *',
  $$ SELECT net.http_post(...) $$
);
```

### Part 5: Frontend Updates

**Update `Digest.tsx`**:
- Fetch digests from database instead of hardcoded array
- Add loading states
- Show empty state if no digests yet

**Update `QuickNewsPanel.tsx`**:
- Add "Last updated" timestamp
- Show freshness indicator

---

## New Files to Create

| File | Purpose |
|------|---------|
| `supabase/functions/generate-news/index.ts` | Daily news generation |
| `supabase/functions/generate-digest/index.ts` | Monthly digest compilation |
| `src/hooks/useDigests.ts` | Fetch digests from database |

## Files to Modify

| File | Changes |
|------|---------|
| `src/pages/dashboard/Digest.tsx` | Use database instead of hardcoded |
| `src/components/dashboard/QuickNewsPanel.tsx` | Add freshness indicator |

---

## Content Generation Strategy

### News Sources (Automated Search)

The AI will search for content matching:
- "peptide research" + current date
- "FDA peptide" OR "FDA compounding"
- "clinical trial peptide"
- Specific peptide names from database (BPC-157, semaglutide, etc.)

### Quality Filters

Before publishing, verify:
- Source credibility (peer-reviewed, FDA, major outlets)
- Relevance to peptide research
- Not duplicate of existing content
- Factual accuracy check

### Content Categories

| Category | Search Terms | Frequency |
|----------|-------------|-----------|
| Research | PubMed, journals | Daily |
| Clinical | ClinicalTrials.gov | Daily |
| Regulatory | FDA announcements | As published |
| Industry | Business news | Weekly |

---

## User Experience

### What Users Will See

1. **Fresh news daily** in dashboard
2. **"Last updated: Today"** indicator
3. **Monthly digest** on 1st of each month
4. **Email notification** (paid users) for digests
5. **Featured story** rotates daily

### Admin Controls

- Override automated content if needed
- Mark stories as featured manually
- Edit AI-generated content before publish
- Pause automation if issues arise

---

## Implementation Steps

1. **Database**: Create `research_digests` table
2. **Backend**: Build `generate-news` edge function
3. **Backend**: Build `generate-digest` edge function
4. **Cron**: Enable pg_cron and pg_net extensions
5. **Cron**: Set up daily and monthly schedules
6. **Frontend**: Update Digest.tsx to use database
7. **Testing**: Manually trigger functions to verify

---

## Benefits

- Users get fresh content daily without you lifting a finger
- Research digests compile automatically each month
- News feed stays current with industry developments
- Positions Peptide Playbook AI as the go-to source
- Reduces manual content creation burden


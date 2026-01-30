

# Weekly Peptide Digest - Automated Monday Updates

## Overview

Transform the Research Digest from a monthly manual system to an **automated weekly digest** that posts every Monday with the top peptide stories, new research, and exciting developments.

## What You'll Get

Every Monday, your members will see a fresh digest with:
- Top 5 peptide stories from the past week
- What's new in GLP-1s, BPC-157, and other trending peptides
- FDA/regulatory updates
- Exciting research breakthroughs
- AI-generated summary making it easy to digest

## How It Works

```text
Every Monday at 8 AM UTC:
┌─────────────────┐     ┌──────────────────────┐     ┌─────────────────────┐
│ Cron Job Fires  │ --> │ Scrape Latest News   │ --> │ AI Summarizes Top   │
│ (pg_cron)       │     │ (Firecrawl)          │     │ Stories (Lovable AI)│
└─────────────────┘     └──────────────────────┘     └─────────────────────┘
                                                              │
                                                              v
                                                    ┌─────────────────────┐
                                                    │ Weekly Digest Posted│
                                                    │ to /dashboard/digest│
                                                    └─────────────────────┘
```

## Implementation

### 1. Create New Edge Function: `generate-weekly-digest`

A new function that:
- Fetches news articles from the past 7 days
- Uses Lovable AI to generate an engaging summary with highlights
- Creates a weekly digest entry in the database
- Labels it "Week of [Date]" instead of monthly

### 2. Update Database Schema

Add a `digest_type` column to `research_digests` table to distinguish:
- `weekly` - New automated weekly digests
- `monthly` - Legacy monthly digests (if any)

### 3. Schedule Weekly Cron Job

Set up `pg_cron` to run every Monday at 8 AM UTC:
```sql
SELECT cron.schedule(
  'weekly-peptide-digest',
  '0 8 * * 1',  -- Every Monday at 8 AM
  $$ ... $$
);
```

### 4. Update UI

- Change "Monthly updates" text to "Weekly updates every Monday"
- Show "Week of January 27, 2026" format for weekly digests
- Keep the same expandable card format

## Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| `supabase/functions/generate-weekly-digest/index.ts` | **Create** | New weekly digest generator with AI |
| Database migration | **Create** | Add `digest_type` column, set up cron job |
| `src/pages/dashboard/Digest.tsx` | **Modify** | Update text and date formatting |
| `src/components/dashboard/DigestCard.tsx` | **Modify** | Support weekly date format |
| `supabase/config.toml` | **Modify** | Register new function |

## Technical Details

### Weekly Digest Generation Flow

1. **Fetch Recent News** - Query `news_articles` from last 7 days
2. **AI Summary** - Use Lovable AI (Gemini Flash) to:
   - Pick the top 5 most interesting stories
   - Write engaging highlight bullets
   - Generate a "what's hot this week" narrative
3. **Save Digest** - Insert into `research_digests` with `digest_type: 'weekly'`

### AI Prompt Strategy

The AI will be prompted to act as a peptide research curator, focusing on:
- What's genuinely exciting or impactful
- Regulatory changes that affect readers
- New research that changes understanding
- Practical takeaways for the reader

### Cron Schedule

Using PostgreSQL's `pg_cron` extension:
- Schedule: `0 8 * * 1` (Every Monday at 8:00 AM UTC)
- The function first fetches fresh news via `generate-news`, then creates the weekly digest


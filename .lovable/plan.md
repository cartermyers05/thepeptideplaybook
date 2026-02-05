

# Peer-Reviewed Studies Database: 500+ Curated Citations

## Current State Analysis

The platform currently has:
- **41 peptides** in the database with basic `studies` text fields
- **Hardcoded knowledge base** in the chat edge function (~185 lines of static peptide info)
- **11 published articles** with JSON-based citations
- No structured, queryable studies database

The AI chatbot uses a **static PEPTIDE_DATABASE** string embedded in the system prompt, not a dynamic database.

---

## Solution Architecture

### Phase 1: Database Schema

Create a new `studies` table to store 500+ peer-reviewed citations:

```sql
CREATE TABLE studies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Core citation data
  pubmed_id TEXT UNIQUE,
  doi TEXT,
  title TEXT NOT NULL,
  authors TEXT[],
  journal TEXT NOT NULL,
  publication_year INTEGER NOT NULL,
  publication_date DATE,
  
  -- Study characteristics
  study_type TEXT NOT NULL, -- 'randomized_controlled_trial', 'meta_analysis', 'cohort', 'animal', 'in_vitro', 'case_study'
  species TEXT[], -- ['human', 'mouse', 'rat', 'pig', 'dog']
  sample_size INTEGER,
  
  -- Content
  abstract TEXT,
  key_findings TEXT NOT NULL, -- AI-friendly summary
  dosing_info TEXT, -- Extracted dosing from study
  safety_findings TEXT,
  
  -- Categorization
  peptide_ids UUID[], -- Links to peptides table
  peptide_names TEXT[] NOT NULL, -- ['BPC-157', 'TB-500'] for quick filtering
  research_areas TEXT[], -- ['tissue_repair', 'gut_healing', 'tendon']
  
  -- Quality indicators
  evidence_level TEXT, -- 'high', 'moderate', 'low', 'very_low' (GRADE scale)
  is_landmark_study BOOLEAN DEFAULT FALSE,
  
  -- Source links
  pubmed_url TEXT,
  full_text_url TEXT,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  verified_at TIMESTAMPTZ, -- When was this citation verified
  verified_by TEXT -- 'automated' or 'manual_review'
);

-- Index for peptide-based lookups
CREATE INDEX idx_studies_peptide_names ON studies USING GIN (peptide_names);

-- Index for filtering by study quality
CREATE INDEX idx_studies_evidence ON studies (evidence_level, study_type);
```

### Phase 2: Peptide-Studies Junction Table

Link peptides to their supporting studies:

```sql
CREATE TABLE peptide_studies (
  peptide_id UUID REFERENCES peptides(id) ON DELETE CASCADE,
  study_id UUID REFERENCES studies(id) ON DELETE CASCADE,
  relevance TEXT, -- 'primary', 'supportive', 'contradictory'
  PRIMARY KEY (peptide_id, study_id)
);
```

### Phase 3: Enhanced Peptides Table

Add structured citation data to the existing peptides:

```sql
ALTER TABLE peptides 
ADD COLUMN key_studies JSONB, -- Top 3-5 landmark studies per peptide
ADD COLUMN total_study_count INTEGER DEFAULT 0,
ADD COLUMN human_study_count INTEGER DEFAULT 0,
ADD COLUMN last_study_update TIMESTAMPTZ;
```

---

## AI Integration Strategy

### Dynamic Knowledge Base for Chatbot

Replace the static `PEPTIDE_DATABASE` string with a dynamic retrieval system:

**File: `supabase/functions/chat/index.ts`**

1. **On conversation start**, fetch relevant peptide + study data based on user query
2. **Build context dynamically** with actual PubMed citations
3. **Include study counts** and evidence levels in responses

```typescript
// Fetch peptide data with studies
async function getPeptideContext(peptideNames: string[], supabase) {
  const { data: peptides } = await supabase
    .from('peptides')
    .select('*')
    .in('name', peptideNames);

  const { data: studies } = await supabase
    .from('studies')
    .select('*')
    .overlaps('peptide_names', peptideNames)
    .order('evidence_level', { ascending: true })
    .limit(20);

  return formatForSystemPrompt(peptides, studies);
}
```

### System Prompt Enhancement

Include citation instructions in the AI prompt:

```text
When citing research, use actual study data:
- "A 2019 RCT (n=89) published in [Journal] found..."
- "Animal studies show [specific finding]"
- Always clarify: human vs animal data
- Mention sample sizes for human trials
- Reference PubMed IDs when available
```

---

## Data Population Strategy

### Phase 1: Seed 500+ Studies

Method: **Combination of automated + manual curation**

| Source | Expected Count | Method |
|--------|----------------|--------|
| PubMed API | 300+ | Automated search by peptide name |
| Existing article citations | 50+ | Extract from articles.citations JSON |
| Manual curation | 150+ | Research team adds landmark studies |

### Automated PubMed Scraper (Edge Function)

Create `supabase/functions/scrape-pubmed/index.ts`:

```typescript
// Search PubMed for peptide studies
const searchTerms = [
  'BPC-157', 'TB-500', 'Semaglutide', 'Tirzepatide',
  'CJC-1295', 'Ipamorelin', 'MK-677', 'GHK-Cu',
  // ... all 41 peptides
];

for (const term of searchTerms) {
  const results = await fetch(
    `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${term}&retmax=50&retmode=json`
  );
  // Process and store in studies table
}
```

---

## Frontend Integration

### 1. Peptide Database Cards

Update `PeptideCard` to show study counts:

```tsx
<div className="flex items-center gap-2 text-xs text-muted-foreground">
  <span>{peptide.total_study_count} studies</span>
  <span>•</span>
  <span>{peptide.human_study_count} human trials</span>
</div>
```

### 2. Study Browser Component

New component: `src/components/database/StudyBrowser.tsx`

- Filter by peptide, study type, evidence level
- Link to PubMed abstracts
- Show key findings in expandable cards

### 3. Article/Guide Citations

When displaying guides, pull from the `studies` table for live citations:

```tsx
// In guide pages
const { data: studies } = usePeptideStudies('BPC-157');
// Render as "Sources" section
```

---

## Files to Create/Modify

| File | Changes |
|------|---------|
| `supabase/migrations/*.sql` | Create `studies` table, junction table, alter peptides |
| `supabase/functions/chat/index.ts` | Replace static DB with dynamic fetching |
| `supabase/functions/coach/index.ts` | Add study data to coach context |
| `supabase/functions/scrape-pubmed/index.ts` | New edge function for PubMed API |
| `src/hooks/useStudies.ts` | New hook for fetching studies |
| `src/components/database/StudyBrowser.tsx` | New UI for browsing studies |
| `src/components/database/PeptideCard.tsx` | Add study counts display |
| `src/pages/dashboard/Database.tsx` | Integrate study browser tab |

---

## Data Quality Standards

Each study entry must include:

| Field | Requirement |
|-------|-------------|
| PubMed ID or DOI | At least one identifier |
| Study Type | Required classification |
| Species | Required (human vs animal) |
| Key Findings | 1-3 sentence summary |
| Evidence Level | GRADE scale assessment |
| Peptide Link | Which peptide(s) it supports |

---

## Implementation Timeline

| Phase | Tasks | Scope |
|-------|-------|-------|
| **1** | Create database schema, seed 100 studies | Database setup |
| **2** | Build PubMed scraper, populate 400+ more | Data population |
| **3** | Update chat edge function with dynamic retrieval | AI integration |
| **4** | Build Study Browser UI, update Peptide Cards | Frontend |
| **5** | Quality review, add landmark study flags | Data curation |

---

## Benefits

1. **Evidence-based responses**: AI cites real studies with PubMed links
2. **Credibility**: Users see "Based on X peer-reviewed studies"
3. **Up-to-date**: Studies table can be updated without code changes
4. **SEO value**: Study database becomes citable content
5. **Differentiator**: No other peptide platform has 500+ curated citations


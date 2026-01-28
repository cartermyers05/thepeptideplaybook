

# Dashboard Redesign: News + AI Chat Tabs with Legal Compliance

## Overview

Transform the current Chat page into a two-tab dashboard:
1. **News** - Curated peptide research news and top stories
2. **AI Chat** - The existing chatbot (enhanced with stronger disclaimers)

Plus comprehensive legal compliance measures throughout the experience.

---

## Dashboard Structure

### Header with Tabs

The main content area will have a clean tab interface at the top:

```text
+----------------------------------------------------------+
|  [Hamburger]  PeptideGPT                                 |
+----------------------------------------------------------+
|          [ News ]     [ AI Chat ]                         |
+----------------------------------------------------------+
|                                                           |
|               (Tab content renders here)                  |
|                                                           |
+----------------------------------------------------------+
```

---

## Tab 1: News & Top Stories

### Content Layout

A clean, scannable news feed featuring:

**Featured Story Card**
- Large hero card at top with featured peptide research news
- Eye-catching image placeholder
- Headline, excerpt, source, and date
- "Read More" link opens source

**Story Grid/List**
- 2-column grid on desktop, single column on mobile
- Each card shows:
  - Category badge (Research, Clinical Trial, Industry, Regulatory)
  - Headline
  - Short excerpt
  - Source name + publication date
  - "Read full article" external link

**Categories to Cover**
- Latest peptide research findings
- Clinical trial updates
- FDA/regulatory news
- Industry developments
- Safety advisories

### News Data Approach

For MVP, we'll use curated static content that can be easily updated:
- Create a `news-feed` edge function that returns curated articles
- Articles stored as structured data (title, excerpt, source, url, date, category)
- Easy to replace with real RSS feeds or API integration later

### News Source Attribution
- Always link to original sources
- Clear "Source:" labels
- No plagiarism, only excerpts + links

---

## Tab 2: AI Chat (Enhanced)

The existing chat functionality with improvements:

### Stronger Disclaimer Banner

Add a persistent, visible disclaimer at the top:

```text
+----------------------------------------------------------+
|  ⚠️ EDUCATIONAL PURPOSES ONLY                             |
|  PeptideGPT provides research information, not medical    |
|  advice. Always consult a qualified healthcare provider.  |
+----------------------------------------------------------+
```

### Enhanced System Prompt

Update the AI system prompt with stronger compliance language:

**Current:** General peptide expert  
**Enhanced:**
- Explicitly state information is for educational/research purposes
- Refuse to provide personalized dosing recommendations
- Add disclaimers to every response about peptide usage
- Reference regulatory status of peptides
- Encourage professional consultation more prominently
- Note that many peptides are not FDA-approved for human use

### Response Footer

Each AI response will include:
- "Was this helpful?" feedback buttons
- Bookmark functionality
- A small disclaimer: "This information is for research purposes only"

---

## Legal Compliance Framework

### 1. Persistent Disclaimers

**Dashboard Header Disclaimer**
- Subtle but visible banner that can be dismissed but reappears each session
- "For educational and research purposes only"

**Chat Input Placeholder**
- Update from "Ask anything about peptides..." to:
- "Ask a research question about peptides..."

**Every AI Response**
- End with: "Note: This information is educational. Consult a healthcare provider before any use."

### 2. Terms of Service Acceptance

- Require explicit Terms of Service acceptance during signup
- Include clear language about:
  - Educational nature of content
  - Not medical advice
  - User responsibility
  - Research-only context

### 3. Content Guardrails in AI

Enhanced system prompt additions:
```text
CRITICAL COMPLIANCE RULES:
1. Never provide personalized medical advice
2. Always clarify peptides discussed are for research purposes
3. Mention FDA approval status when relevant
4. Do not recommend specific sources for purchasing
5. Emphasize the importance of professional medical guidance
6. If asked about illegal activities, politely decline
7. When discussing dosing, use phrases like "research literature suggests" not "you should take"
```

### 4. User Agreement Flow

Before first chat, show a one-time modal:
```text
Before You Begin

PeptideGPT is an educational research tool that provides 
information based on published scientific literature.

By continuing, you acknowledge:
☐ This is not medical advice
☐ I will consult healthcare professionals before any use
☐ I understand peptides may not be FDA-approved
☐ I am using this for educational/research purposes

[I Understand - Continue]
```

---

## Technical Implementation

### New Components

1. **`src/components/dashboard/NewsFeed.tsx`**
   - Featured story card component
   - News card grid
   - Category filtering
   - Loading skeleton states

2. **`src/components/dashboard/NewsCard.tsx`**
   - Individual news article card
   - Source attribution
   - External link handling

3. **`src/components/dashboard/DisclaimerBanner.tsx`**
   - Persistent compliance banner
   - Dismissible per session

4. **`src/components/dashboard/ComplianceModal.tsx`**
   - First-use agreement modal
   - Checkbox acknowledgments
   - Stored acceptance in localStorage/database

### Updated Components

1. **`src/pages/Chat.tsx`**
   - Add Tabs component wrapping content
   - News tab renders NewsFeed
   - Chat tab renders existing chat interface
   - Add DisclaimerBanner at top

2. **`supabase/functions/chat/index.ts`**
   - Enhanced system prompt with compliance rules
   - Stronger guardrails in AI behavior

### Edge Function (Optional)

**`supabase/functions/news-feed/index.ts`**
- Returns curated peptide news articles
- Can be expanded later to pull from RSS feeds or APIs

### Database Schema Addition

```sql
-- Track user compliance acknowledgment
ALTER TABLE profiles ADD COLUMN 
  terms_accepted_at timestamptz DEFAULT NULL;
```

---

## UI/UX Design Details

### Tab Styling
- Use existing shadcn Tabs component
- Full-width tabs centered in header
- Active tab has underline indicator (Linear-style)
- Smooth transition between tabs

### News Feed Design
- Clean card design matching existing aesthetic
- Category badges with color coding:
  - Research: Blue
  - Clinical: Green  
  - Regulatory: Orange
  - Industry: Purple
- Subtle hover effects
- External link icons for source attribution

### Disclaimer Styling
- Soft yellow/amber background for visibility
- Dismissible X button (but returns next session)
- Professional, non-alarming tone

---

## Files to Create/Modify

**Create:**
- `src/components/dashboard/NewsFeed.tsx`
- `src/components/dashboard/NewsCard.tsx`
- `src/components/dashboard/DisclaimerBanner.tsx`
- `src/components/dashboard/ComplianceModal.tsx`
- `supabase/functions/news-feed/index.ts` (optional)

**Modify:**
- `src/pages/Chat.tsx` - Add tabs, disclaimer, modal
- `supabase/functions/chat/index.ts` - Enhanced compliance prompt

**Database:**
- Add `terms_accepted_at` column to profiles table

---

## Summary

This plan transforms the dashboard into a two-tab experience (News + AI Chat) while implementing robust legal compliance measures including:

- Persistent educational disclaimers
- First-use compliance acknowledgment modal
- Enhanced AI guardrails and response disclaimers
- Clear source attribution on news content
- Terms acceptance tracking

The result is a product that provides maximum value to users while protecting both users and the business through proper compliance frameworks.


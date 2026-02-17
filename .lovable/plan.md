

# AI-Powered Weekly Intelligence Report + Personalized Daily Briefing

## The Big Idea

You're collecting daily logs (compliance, energy, injection site reactions, GI issues, weight, symptoms) but the data just sits in charts. The highest-value feature you can add is turning that passive data into **active intelligence** — an AI that reads the user's week, spots patterns, and delivers a personalized briefing every time they open the dashboard.

This creates a "can't-live-without-it" feedback loop: log data -> get smarter insights -> feel motivated to log more.

## Feature 1: AI Weekly Intelligence Report

A new page/section that generates a personalized AI analysis of the user's week. Think of it like a "therapist session" for their protocol.

**What the AI analyzes:**
- Compliance trend (improving, declining, stable)
- Energy ratings over the past 7 days — are they trending up?
- Symptom patterns (e.g., "GI issues appeared on 3 of 5 logging days — consider taking BPC-157 with food")
- Weight trajectory and rate of change
- Where they are in their protocol timeline and what to expect next
- Whether they missed any compounds and which ones

**What the user sees:**
- A beautifully designed "Week X Review" card on the dashboard
- 3-4 bullet-point insights (not a wall of text)
- A "mood" indicator for the week (green/yellow/red based on overall data)
- One specific actionable recommendation
- A "deep dive" expandable section with the full AI analysis

**Example output:**
> **Week 3 Review** — Solid week overall
> - Compliance was 85% (up from 71% last week) — great improvement
> - Energy trending upward: averaged 7.2/10 vs 6.1 last week
> - You reported mild GI issues on 2 days — this is common in weeks 2-4 of semaglutide and typically resolves
> - **Recommendation:** You missed your Tuesday BPC-157 dose twice now. Consider setting a phone alarm for your morning window.

## Feature 2: "Today's Briefing" on Dashboard Home

Replace the current static "Smart Insight" card with a dynamic, AI-generated daily briefing that changes every day based on context:

- What compounds are scheduled today and any tips specific to them
- Where the user is in their protocol cycle and what to expect physically
- A motivational data point from their own tracking ("Your compliance this week is already at 100% — keep it going")
- A relevant research fact about one of their active compounds

This runs via a backend function that generates the briefing using the user's protocol + logs + week number, cached daily.

## Feature 3: Symptom Pattern Alerts

When the AI detects a repeating symptom pattern across multiple logs, surface it as a dismissible alert card:

- "You've reported injection site reactions 4 times in the last 2 weeks. Try rotating to a different site — here's our injection site guide." (links to existing guide)
- "Your energy dipped below 5 on days you skipped your morning dose. Consistency with timing may help."
- "Weight has plateaued for 2 weeks — this is normal at week 6 of GLP-1 protocols. Expect movement again by week 8."

---

## Technical Plan

### New Backend Function: `generate-weekly-review`

An edge function that:
1. Fetches the user's daily_logs for the past 7 days
2. Fetches their active protocol (compounds, schedule, week number)
3. Sends this data to Lovable AI (Gemini Flash) with a structured prompt
4. Returns 3-4 insights, a mood score, and one recommendation
5. Caches the result in a new `weekly_reviews` table so it's not regenerated on every page load

### New Database Table: `weekly_reviews`

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | References auth user |
| protocol_id | uuid | Active protocol |
| week_number | int | Protocol week |
| insights | jsonb | Array of insight objects |
| mood | text | "green", "yellow", "red" |
| recommendation | text | Single actionable tip |
| full_analysis | text | Detailed markdown analysis |
| generated_at | timestamptz | When AI generated this |

RLS: Users can only read their own reviews.

### New Backend Function: `generate-daily-briefing`

A lighter function that:
1. Checks what compounds are scheduled today
2. Looks at recent compliance and energy trends
3. Generates a 2-3 sentence personalized briefing
4. Caches in a `daily_briefings` table (one per user per day)

### New Database Table: `daily_briefings`

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | References auth user |
| briefing_date | date | The date this is for |
| content | text | The briefing text |
| compound_tips | jsonb | Tips for today's compounds |
| data_highlight | text | One stat from their data |
| created_at | timestamptz | Auto-generated |

### Frontend Changes

| File | Change |
|------|--------|
| `ActiveProtocolState.tsx` | Replace static insight card with dynamic daily briefing (fetched from daily_briefings table, with a "generate" button if none exists for today) |
| New: `WeeklyReview.tsx` | A new component showing the weekly intelligence report — expandable card with insights, mood indicator, and recommendation |
| `ActiveProtocolState.tsx` | Add WeeklyReview card between stats and Today's Stack (only shows if a review exists for the current week) |
| New: `SymptomAlert.tsx` | Dismissible alert cards that surface pattern-detected insights from symptom data |
| `Home.tsx` | Pass additional data (symptom patterns) to ActiveProtocolState |

### AI Prompt Strategy

The weekly review prompt will be structured to:
- Receive raw data (not ask the AI to fetch it)
- Output structured JSON (not free-form text)
- Include the user's specific compound names and dosing schedule
- Reference their protocol week and what's expected at that stage
- Keep insights under 30 words each
- Always include one actionable recommendation
- Never provide medical advice — frame everything as "based on your tracking data" and "discuss with your provider"

### Cost Control

- Weekly review: Generated once per week (Sunday night or first dashboard visit of the week)
- Daily briefing: Generated once per day on first visit, cached
- Uses Gemini Flash (cheapest model) since the prompts are structured and data-driven
- Total AI cost per user: ~2-3 calls per week


# Plan: Expand "How It Works" Section with Full Journey Details

## Overview
Transform the current brief 3-step "How It Works" section into a more comprehensive, engaging walkthrough that gives visitors a clear picture of exactly what they're getting and how the full journey unfolds.

## Current Issues
- Only 3 steps with very short descriptions
- Doesn't convey the depth of the product
- Missing key differentiators like daily lessons, AI coach, and progress tracking

## Proposed Solution
Expand to a **5-step journey** with richer detail blocks under each step. Each step will include:
- A clear title
- A detailed description
- **2-3 specific detail points** that explain what happens in that phase

## New Content Structure

### Step 01: Pick Your Goal
**Description:** Choose from fat loss, muscle building, recovery, anti-aging, or cognitive enhancement. Your selection shapes everything that follows.

**Details:**
- 6 focused goal tracks, each with curated peptide protocols
- 60-second quiz to understand your experience level
- No overwhelm—just clarity on where to start

### Step 02: AI Builds Your Course
**Description:** In seconds, your personalized program is generated with specific peptides, research-backed dosing, and a day-by-day curriculum tailored to your goal.

**Details:**
- Peptides selected specifically for your goal (not generic recommendations)
- Dosing based on published research, clearly explained
- 42-84 day structured program generated instantly

### Step 03: Learn the Fundamentals
**Description:** Before you inject anything, master the essentials. Step-by-step walkthroughs for reconstitution, injection technique, and supply preparation.

**Details:**
- Video-style guides for mixing your first vial
- Injection site maps and needle selection guidance
- Supply checklist so you know exactly what to order

### Step 04: Follow Daily Lessons
**Description:** Each day, a new lesson unlocks. No information overload—just what you need to know today, delivered in bite-sized format.

**Details:**
- Lessons unlock one day at a time (8-week program)
- Contextual guidance based on where you are in your cycle
- Action items to keep you on track

### Step 05: Track & Improve
**Description:** Build streaks, hit milestones, and ask your AI coach anything along the way. Watch your progress unfold day by day.

**Details:**
- Daily check-ins to log progress
- Streak tracking and milestone celebrations
- 24/7 AI coach for questions anytime

---

## Visual Design

Maintain the current editorial aesthetic with:
- Large step numbers (01, 02, etc.) in muted grey
- Bold section titles
- Grey description text
- **New:** A detail list under each step with subtle bullet styling (small dots or dashes)

```text
┌──────────────────────────────────────────────────────────────┐
│  01                                                          │
│  ─────────────────────────────────────────────────────────   │
│  Pick Your Goal                                              │
│                                                              │
│  Choose from fat loss, muscle building, recovery,            │
│  anti-aging, or cognitive enhancement...                     │
│                                                              │
│  · 6 focused goal tracks, each with curated protocols        │
│  · 60-second quiz to understand your experience              │
│  · No overwhelm—just clarity on where to start               │
└──────────────────────────────────────────────────────────────┘
```

---

## Technical Implementation

### File: `src/components/landing/HowItWorksSection.tsx`

**Changes:**
1. Expand the `steps` array from 3 to 5 items
2. Add a `details` array property to each step (2-3 bullet points)
3. Update the JSX to render the detail bullets below each description
4. Style details with smaller text and subtle list markers

### Step Data Structure:
```typescript
interface Step {
  number: string;
  title: string;
  description: string;
  details: string[];
}
```

### Styling for Details:
- Use `text-sm text-muted-foreground` for detail items
- Add subtle left border or dot markers
- Animate in with the parent step (no separate stagger needed)

---

## Summary
- Expand from 3 steps → 5 steps
- Add 2-3 detail bullet points per step
- Maintain current visual style (large numbers, editorial typography)
- Give visitors a complete picture of the journey without overwhelming them



# Seed All Course Templates - Complete Implementation Plan

## Overview

The uploaded document contains complete lesson content for all 5 remaining courses that currently only have 8 lessons each. This plan will seed the database with full curriculum for each course.

---

## Current State vs. Target

| Course | Current Lessons | Target Lessons | Status |
|--------|-----------------|----------------|--------|
| fat_loss | 57 | 57 | Complete |
| muscle | 8 | 56 | **NEEDS SEEDING** |
| recovery | 8 | 42 | **NEEDS SEEDING** |
| anti_aging | 8 | 60 | **NEEDS SEEDING** |
| cognitive | 8 | 56 | **NEEDS SEEDING** |
| beginner | 8 | 42 | **NEEDS SEEDING** |

**Note:** The document shows anti_aging as 60 days, but database has it at 84 days. We'll update duration_days to match the content.

---

## Course Content Summary (From Document)

### 1. Muscle & Performance Course (56 Days)

**Peptides:** BPC-157 + TB-500

**Phases:**
- Foundation (Days 0-7): Learning the stack, reconstitution, first injections
- Loading (Days 8-28): Building therapeutic levels  
- Optimization (Days 29-42): Maintenance phase begins
- Completion (Days 43-56): Tapering and results

**Full Lessons Provided:** 
- Days 0-7: Detailed daily content (7 lessons with full text)
- Days 8-28: Weekly summaries (condensed to key lessons)
- Days 29-56: Maintenance and completion phases

---

### 2. Injury Recovery Course (42 Days)

**Peptides:** BPC-157 + TB-500 (higher doses for acute injury)

**Phases:**
- Aggressive Healing (Days 0-21): Higher doses near injury
- Continued Recovery (Days 22-42): Taper and maintenance

**Key Difference:** Higher initial BPC-157 dose (500mcg vs 250mcg)

---

### 3. Anti-Aging & Longevity Course (60 Days)

**Peptides:** Epithalon + GHK-Cu

**Phases:**
- First Epithalon Cycle + GHK-Cu Start (Days 0-14)
- GHK-Cu Continuation (Days 15-35)
- Second Epithalon Cycle (Days 36-45)
- Completion (Days 46-60)

**Unique:** Epithalon runs in 10-day cycles with gaps

---

### 4. Cognitive Enhancement Course (56 Days)

**Peptides:** Semax + Selank (NASAL SPRAYS - No injections!)

**Phases:**
- Introduction (Days 0-7)
- Building Effects (Days 8-14)
- Dose Increase (Days 15-28)
- Optimization (Days 29-56)

**Key Difference:** No needles, nasal administration only

---

### 5. Beginner Course (42 Days)

**Peptides:** BPC-157 only

**Phases:**
- Getting Started (Days 0-7)
- Building Consistency (Days 8-21)
- Seeing Results (Days 22-35)
- Completion (Days 36-42)

**Simplest Protocol:** One peptide, one injection per day

---

## Implementation Approach

### Database Migrations

Will create 5 separate database migrations, one per course, to:
1. Update the `lessons` JSONB array with full daily content
2. Update `duration_days` if needed (anti_aging: 84 → 60)
3. Update `peptides` JSONB with complete peptide info from document

### Lesson Structure

Each lesson follows the existing format:
```json
{
  "day": 0,
  "phase": "Foundation",
  "title": "Welcome to Your Muscle & Performance Course",
  "content": "Full lesson content here...",
  "action_item": "Review My Plan tab..."
}
```

### Content Generation

For courses with outline-only content (Recovery, Anti-Aging, Cognitive, Beginner), I will:
- Expand the outlines into full 200-400 word lessons
- Maintain consistency with the Muscle course's detailed style
- Ensure phase-appropriate content for each day

---

## Files to Create/Modify

### Database Migrations (5)

| Migration | Course | Lessons | Notes |
|-----------|--------|---------|-------|
| Muscle Course | muscle | 56 | Full content from document |
| Recovery Course | recovery | 42 | Expanded from outline |
| Anti-Aging Course | anti_aging | 60 | Expanded from outline |
| Cognitive Course | cognitive | 56 | Expanded from outline |
| Beginner Course | beginner | 42 | Expanded from outline |

---

## Execution Plan

### Step 1: Muscle Course (Full Content Available)
- Use the complete 56-day lesson content from the document
- This course has the most detailed content

### Step 2: Beginner Course
- Simple single-peptide protocol
- 42 days, one injection daily
- Good foundation for other courses

### Step 3: Recovery Course
- Similar to Muscle but shorter (42 days)
- Higher initial doses, injury-focused

### Step 4: Cognitive Course
- Unique: nasal sprays, no injections
- Different tone (nootropic focus)

### Step 5: Anti-Aging Course
- Unique cycling protocol (Epithalon cycles)
- 60 days with two Epithalon cycles

---

## Quality Checks

After seeding each course:
1. Verify lesson count matches duration_days
2. Confirm all phases are represented
3. Check first/last lesson content
4. Verify peptides JSONB is complete

---

## Expected Outcome

After implementation:
- All 6 courses have full daily lesson content
- Users selecting any goal will have complete curriculum
- No "breaks" after Day 8
- Launch-ready content for all course types

---

## Technical Notes

### JSONB Lesson Array Size

- Muscle: ~56 lessons × ~500 chars = ~28KB
- Total per course: Well within JSONB limits

### Content Priorities

Given the document provides full detailed content for Muscle only, I will:
1. Seed Muscle exactly as documented (highest fidelity)
2. Generate detailed content for other courses following the same patterns and voice

This ensures consistency across all courses while respecting the source material.


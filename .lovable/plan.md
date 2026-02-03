
# Peptide Playbook Complete Product Rebuild

## Executive Summary

Transform the current peptide information product into an AI-powered peptide coaching platform ("Duolingo for peptides") with daily check-ins, progress tracking, personalized protocols, and gamified engagement.

---

## Current State Analysis

### What Exists (Can Be Reused)
| Component | Status | Reusability |
|-----------|--------|-------------|
| Authentication | Working | Keep as-is |
| Supabase integration | Working | Extend with new tables |
| Chat/AI Edge Function | Working | Adapt for AI Coach modes |
| Stripe integration | $67 one-time | Convert to subscriptions |
| Existing chat UI | Working | Repurpose for AI Coach |
| Dashboard layout | Working | Redesign structure |
| Landing components | Working | Update copy/CTAs |

### What Needs to Be Built
1. Onboarding quiz flow (new)
2. Protocol generator logic (new)
3. AI Coach with structured modes (new)
4. Daily check-in system (new)
5. Streak/gamification system (new)
6. Progress tracking (new)
7. Subscription billing (modify existing)

---

## Implementation Phases

### Phase 1: Foundation (Week 1-2)

#### 1.1 Database Schema Changes
Create new tables for the coaching platform:

```text
NEW TABLES:
┌─────────────────────────────────────────────────────────────┐
│ quiz_responses                                               │
│ - id, user_id, primary_goal, experience_level,              │
│   main_concerns[], timeline, age_range, completed_at        │
├─────────────────────────────────────────────────────────────┤
│ protocols                                                    │
│ - id, user_id, goal, protocol_name, peptides (JSONB),       │
│   cycle_length_weeks, current_day, current_week,            │
│   status, started_at, created_at                            │
├─────────────────────────────────────────────────────────────┤
│ check_ins                                                    │
│ - id, user_id, protocol_id, date, completed,                │
│   injection_done, energy_level, mood, sleep_quality,        │
│   side_effects[], notes, created_at                         │
├─────────────────────────────────────────────────────────────┤
│ streaks                                                      │
│ - id, user_id, current_streak, longest_streak,              │
│   last_check_in_date, streak_freezes_available              │
├─────────────────────────────────────────────────────────────┤
│ milestones                                                   │
│ - id, user_id, milestone_type, achieved_at                  │
└─────────────────────────────────────────────────────────────┘

MODIFY EXISTING:
┌─────────────────────────────────────────────────────────────┐
│ profiles - add:                                              │
│   subscription_tier ('free', 'monthly', 'annual')           │
│   stripe_subscription_id                                     │
│   referral_code (unique)                                     │
│   referred_by (uuid)                                         │
└─────────────────────────────────────────────────────────────┘
```

#### 1.2 Stripe Subscription Setup
Convert from one-time $67 payment to recurring subscriptions:

| Plan | Price | Stripe Product |
|------|-------|----------------|
| Monthly | $29/month | New product/price |
| Annual | $249/year ($20.75/mo) | New product/price |

Update `create-checkout` edge function to handle subscription mode.

#### 1.3 Route Structure
New routes to add:

```text
/quiz              - Multi-step onboarding quiz
/quiz/results      - Protocol preview (teaser for non-paid)
/dashboard         - Main home with today's card
/dashboard/protocol - Current protocol details
/dashboard/coach   - AI Coach (structured guidance)
/dashboard/chat    - General AI chat (existing)
/dashboard/progress - Stats, streaks, calendar
/dashboard/settings - Account management
/affiliate         - Affiliate dashboard (future)
```

#### 1.4 Landing Page Updates
- New hero: "Your AI Peptide Coach"
- Update subheadline to emphasize guided journey
- Change CTA: "Get Your Free Protocol" -> /quiz
- Update pricing section for subscriptions

---

### Phase 2: Quiz & Protocol Generator (Week 2-3)

#### 2.1 Quiz Flow Component
5-step interactive quiz with progress bar:

```text
Step 1: Goal Selection (single select)
├── Fat Loss
├── Muscle & Recovery  
├── Injury Recovery
├── Anti-Aging & Longevity
├── Cognitive Enhancement
└── General Wellness

Step 2: Experience Level (single select)
├── Complete Beginner
├── Some Experience
└── Experienced

Step 3: Main Concerns (multi-select, max 3)
├── Reconstitution
├── Dosing
├── Side Effects
├── Sourcing
├── Stacking
└── Injections

Step 4: Timeline (single select)
├── Ready Now
├── Soon (next month)
└── Just Researching

Step 5: Email Capture
└── Email input + newsletter opt-in
```

#### 2.2 Protocol Generation Logic
Map quiz responses to pre-defined protocols:

| Goal | Protocol | Duration | Peptides |
|------|----------|----------|----------|
| Fat Loss | GLP-1 Focus | 8 weeks | Semaglutide + optional BPC-157 |
| Muscle & Recovery | Performance Stack | 8 weeks | BPC-157 + TB-500 |
| Injury Recovery | Healing Focus | 6 weeks | BPC-157 + TB-500 |
| Anti-Aging | Longevity Stack | 12 weeks | Epithalon + GHK-Cu |
| Cognitive | Nootropic Stack | 8 weeks | Semax + Selank |
| General Wellness | Beginner Safe | 6 weeks | BPC-157 only |

Store protocol as JSONB with full peptide details (name, purpose, dosage, frequency, timing).

---

### Phase 3: AI Coach System (Week 3-4)

#### 3.1 Coach Interface Design
Chat-like interface with 4 modes (tabs):

```text
┌────────────────────────────────────────────────────────────┐
│  [Daily Check-In] [Reconstitution] [Injection] [Ask Coach] │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  🔥 Day 7 of 56 | Week 1 of 8 | 6-day streak              │
│                                                            │
│  AI Coach: "Good morning! Ready for today's check-in?"    │
│                                                            │
│  ┌──────────────────────────────────────────────┐         │
│  │ Did you complete today's injection?          │         │
│  │  [Yes ✓]  [Not Yet]  [Skipped]              │         │
│  └──────────────────────────────────────────────┘         │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

#### 3.2 Daily Check-In Flow
Structured conversation with checkpoints:

1. Injection completion (Yes/Not Yet/Skipped)
2. Energy level (1-5 emoji scale)
3. Mood (1-5 emoji scale)
4. Sleep quality (1-5 emoji scale)
5. Side effects (multi-select: None, Fatigue, Headache, etc.)
6. Optional notes (text input)

On completion:
- Update streak
- Check for milestones
- Show motivational message
- Flag concerning side effects with guidance

#### 3.3 Reconstitution Guide Mode
Step-by-step walkthrough with "Done" checkpoints:

```text
Step 1: Gather Supplies    [Done ✓]
Step 2: Wash Hands        [Done ✓]
Step 3: Clean Vials       [Current Step]
Step 4: Calculate Water   [Locked]
Step 5: Draw Water        [Locked]
Step 6: Add to Peptide    [Locked]
Step 7: Dissolve          [Locked]
Step 8: Storage           [Locked]
```

Each step shows detailed instructions before user can proceed.

#### 3.4 AI Coach Edge Function
Create new `coach` edge function with context-aware prompting:

- Inject user's protocol details
- Include current day/week of cycle
- Add recent check-in history
- Set appropriate tone (warm, supportive, safety-conscious)

---

### Phase 4: Gamification & Progress (Week 4-5)

#### 4.1 Streak System

```text
┌─────────────────────────────────────────────────────────────┐
│ Streak Logic:                                                │
│                                                              │
│ - Check-in today + yesterday = streak++                     │
│ - Check-in today, missed yesterday = streak = 1             │
│ - Already checked in today = no change                      │
│ - Streak freezes available = 2 (protect streak on miss)     │
│                                                              │
│ Milestone triggers: 7, 14, 30, 60, 90 day streaks           │
└─────────────────────────────────────────────────────────────┘
```

#### 4.2 Milestones/Achievements

| Milestone | Type | Trigger |
|-----------|------|---------|
| First Check-In | `first_checkin` | Complete first check-in |
| First Reconstitution | `first_recon` | Complete reconstitution guide |
| Week 1 Complete | `week_1` | 7 days into protocol |
| 7-Day Streak | `streak_7` | 7 consecutive check-ins |
| 14-Day Streak | `streak_14` | 14 consecutive check-ins |
| 30-Day Streak | `streak_30` | 30 consecutive check-ins |
| Cycle Complete | `cycle_complete` | Finish entire protocol |

#### 4.3 Progress Dashboard
- Streak calendar (monthly view with green highlights)
- Check-in history (expandable list)
- Trend charts (energy, mood, sleep over time)
- Achievement badges grid (earned vs locked)

---

### Phase 5: Dashboard Redesign (Week 5-6)

#### 5.1 New Sidebar Navigation

```text
┌──────────────────────┐
│ 🧬 Peptide Playbook  │
├──────────────────────┤
│ 🏠 Dashboard         │
│ 📋 My Protocol       │
│ 🤖 AI Coach          │
│ 💬 Chat              │
│ 📊 Progress          │
│ ⚙️  Settings         │
├──────────────────────┤
│ [Avatar] John Doe    │
│ 🟢 Monthly           │
└──────────────────────┘
```

#### 5.2 Dashboard Home Layout

```text
┌─────────────────────────────────────────────────────────────┐
│ Welcome back, John! 🔥 6-day streak                          │
│ Week 2, Day 3 of your 8-week cycle                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ TODAY'S CHECK-IN                                        │ │
│ │ Ready to log today? ───────────────── [Complete Check-In]│ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                              │
│ ┌─────────────────────────────┬───────────────────────────┐ │
│ │ 🗣️ Talk to Coach            │ 📋 View Protocol          │ │
│ └─────────────────────────────┴───────────────────────────┘ │
│                                                              │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ RECENT MILESTONES                                       │ │
│ │ 🏆 Week 1 Complete - Feb 1                              │ │
│ │ 🏆 First Check-In - Jan 25                              │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## Technical Architecture

### New Files to Create

```text
src/
├── pages/
│   ├── Quiz.tsx                    # Multi-step quiz
│   ├── QuizResults.tsx             # Protocol preview
│   └── dashboard/
│       ├── Protocol.tsx            # Protocol details
│       ├── Coach.tsx               # AI Coach interface
│       └── Progress.tsx            # Stats & achievements
├── components/
│   ├── quiz/
│   │   ├── QuizProgress.tsx        # Progress bar
│   │   ├── GoalStep.tsx            # Step 1
│   │   ├── ExperienceStep.tsx      # Step 2
│   │   ├── ConcernsStep.tsx        # Step 3
│   │   ├── TimelineStep.tsx        # Step 4
│   │   └── EmailStep.tsx           # Step 5
│   ├── coach/
│   │   ├── CoachInterface.tsx      # Main coach UI
│   │   ├── CheckInFlow.tsx         # Daily check-in
│   │   ├── ReconGuide.tsx          # Reconstitution steps
│   │   ├── InjectionGuide.tsx      # Injection steps
│   │   └── AskCoach.tsx            # Free-form chat
│   ├── protocol/
│   │   ├── ProtocolCard.tsx        # Protocol overview
│   │   ├── PeptideCard.tsx         # Individual peptide
│   │   └── ScheduleCalendar.tsx    # Weekly schedule
│   └── progress/
│       ├── StreakCalendar.tsx      # Monthly calendar
│       ├── TrendCharts.tsx         # Mood/energy charts
│       └── AchievementGrid.tsx     # Badges
├── hooks/
│   ├── useQuiz.ts                  # Quiz state management
│   ├── useProtocol.ts              # Protocol CRUD
│   ├── useCheckIn.ts               # Check-in operations
│   ├── useStreak.ts                # Streak logic
│   └── useMilestones.ts            # Achievement tracking
└── supabase/functions/
    ├── coach/index.ts              # AI Coach edge function
    └── generate-protocol/index.ts  # Protocol generation

```

### Modified Files

```text
src/
├── App.tsx                         # Add new routes
├── pages/Index.tsx                 # Update hero/CTAs
├── components/landing/
│   ├── HeroSection.tsx             # New copy
│   ├── HowItWorks.tsx              # New steps
│   └── PricingCTA.tsx              # Subscription pricing
├── hooks/useTier.ts                # Handle subscription tiers
└── supabase/functions/
    └── create-checkout/index.ts    # Switch to subscriptions
```

---

## Migration Strategy

### Data Preservation
- Existing users keep access (grandfather them to "annual" tier)
- Existing conversations preserved
- Profile data retained

### Transition Plan
1. Deploy new database schema alongside existing
2. Build new UI components
3. Update landing page
4. Test with beta users
5. Full launch with email announcement

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Quiz completion rate | > 60% |
| Quiz-to-signup conversion | > 30% |
| Daily check-in completion | > 70% |
| 7-day streak achievement | > 50% |
| Monthly retention | > 80% |
| NPS score | > 50 |

---

## Implementation Order

1. **Week 1**: Database schema + Stripe subscriptions + updated landing
2. **Week 2**: Quiz flow + protocol generator
3. **Week 3**: Dashboard redesign + protocol page
4. **Week 4**: AI Coach - daily check-in mode
5. **Week 5**: AI Coach - reconstitution/injection guides
6. **Week 6**: Progress tracking + gamification
7. **Week 7**: Polish, testing, bug fixes
8. **Week 8**: Referral system + launch

---

## Questions Before Implementation

Before proceeding, I'd like to confirm a few things:

1. **Pricing Model**: Should I create new Stripe products for $29/month and $249/year subscriptions, or do you already have these configured?

2. **Existing Users**: How should we handle current paid users ($67 one-time)? Options:
   - Grandfather them to "annual" tier permanently
   - Give them 12 months of access then require subscription
   - Something else?

3. **Email Service**: Do you have Resend or another email service configured for transactional emails (check-in reminders, streak warnings)?

4. **Implementation Approach**: Would you prefer I:
   - Build everything in phases (can test incrementally)
   - Build complete MVP then launch all at once

These answers will help me tailor the implementation to your specific needs.

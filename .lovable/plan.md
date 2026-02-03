
# Peptide Playbook Complete Product Rebuild

## Overview

This rebuild transforms the product positioning from "AI chatbot" to "personalized peptide course" with the tagline: **"The $2,000 Peptide Course. For $29."**

The core insight: We're selling education delivered via AI, not the AI itself. The competitor is Jay Campbell's $2,000 courses, not ChatGPT.

---

## What's Staying (Do Not Touch)

| Component | Reason |
|-----------|--------|
| Database schema | Tables already support quiz, protocols, check-ins, streaks |
| Stripe edge functions | `create-checkout`, `check-subscription`, `customer-portal` working |
| Auth system | Supabase auth working |
| Existing hooks | `useProtocol`, `useCheckIn`, `useStreak`, `useMilestones` working |
| Coach edge function | AI gateway integration working |

---

## Implementation Plan

### Phase 1: Landing Page Complete Redesign

#### 1.1 Hero Section (`src/components/landing/HeroSection.tsx`)
**Complete rewrite with new positioning:**

```text
Headline: "The $2,000 Peptide Course. For $29."

Subheadline: "Jay Campbell charges $1,999 for his peptide 
masterclass. We built the same thing with AI - personalized 
to YOUR goals, guiding you step-by-step, for the price of 
a protein tub."

Primary CTA: "Build My Course (Free)" → /quiz
Secondary CTA: "See What's Inside" → scrolls to #curriculum

Trust badges:
- "500+ studies analyzed"
- "Personalized to your goals"  
- "Step-by-step guidance"
```

#### 1.2 Problem Section (`src/components/landing/ProblemSection.tsx`)
**Rewrite to attack expensive courses:**

```text
Headline: "Peptide courses are a scam. Here's why."

Three columns:
1. "They charge $2,000 for information that's free online" 
   - Icon: DollarSign
2. "They give everyone the same generic protocol" 
   - Icon: Users
3. "They teach you, then abandon you" 
   - Icon: UserX

Subtext: "You don't need another course. You need a guide 
that knows YOUR goals, walks you through every step, and 
answers your questions at 2am when you're nervous about 
your first injection."
```

#### 1.3 Solution Section (New: `src/components/landing/CourseFeatures.tsx`)
**Three pillars of the product:**

```text
Headline: "Your Personal Peptide Course"

Card 1: "Personalized Protocol"
- Answer 5 questions about your goals
- Get a complete protocol: peptides, dosing, timing, cycle length
- Not generic advice - built for YOU
- Icon: Target

Card 2: "Step-by-Step Guidance"  
- Day-by-day instructions through your cycle
- Reconstitution walkthrough with checkpoints
- Injection guide for complete beginners
- Icon: ListChecks

Card 3: "AI Coach On Call"
- Ask questions anytime, get instant answers
- Trained on 500+ peptide studies
- Like having an expert in your pocket
- Icon: MessageCircle
```

#### 1.4 Curriculum Section (New: `src/components/landing/CurriculumSection.tsx`)
**Show course modules like an actual course:**

```text
Headline: "What You'll Learn"

Module 1: Your Personalized Protocol
- Your recommended peptides based on goals
- Exact dosing schedule
- Cycle length and timing
- What to expect each week

Module 2: Reconstitution Mastery
- Supply checklist
- Step-by-step mixing guide
- Common mistakes to avoid
- Storage and handling

Module 3: Injection Confidence
- Site selection and rotation
- Proper technique
- Managing injection anxiety
- What's normal vs concerning

Module 4: Daily Optimization
- Daily check-in system
- Tracking your progress
- Adjusting based on feedback
- When to consult a professional

Module 5: Ongoing Support
- 24/7 AI coach access
- Weekly research updates
- Community Q&A (future)
```

#### 1.5 Comparison Section (New: `src/components/landing/ComparisonSection.tsx`)
**Direct comparison table:**

| Feature | Jay Campbell | Peptide Playbook |
|---------|--------------|------------------|
| Price | $299 - $1,999 | $29/month |
| Personalization | Generic protocols | Built for YOUR goals |
| Support | Watch videos alone | AI coach 24/7 |
| Updates | Static content | Always current |
| Format | 10+ hours of video | Bite-sized daily guidance |
| Refund | "No refunds" | Cancel anytime |

#### 1.6 Pricing Section (`src/components/landing/PricingCTA.tsx`)
**Single prominent card:**

```text
Headline: "One price. Everything included."

$29/month
- Personalized protocol for your goals
- Step-by-step reconstitution guide
- Injection walkthrough
- Daily guidance through your cycle
- 24/7 AI coach access
- Progress tracking
- Cancel anytime

CTA: "Start My Course"
Below: "Or save 29% with annual ($249/year)"
Small text: "30-day money-back guarantee. No questions asked."
```

#### 1.7 FAQ Section (`src/components/landing/FAQ.tsx`)
**Update with new positioning FAQs:**
- Is this medical advice?
- How is this different from ChatGPT?
- What if I'm a complete beginner?
- Can I cancel anytime?
- Do you sell peptides?

#### 1.8 Footer (`src/components/landing/Footer.tsx`)
**Add prominent legal disclaimer**

---

### Phase 2: Quiz Flow Rebuild

#### 2.1 Pre-Quiz Landing (Update `src/pages/Quiz.tsx`)
**New intro screen before Step 1:**

```text
Headline: "Let's build your peptide course"
Subtext: "5 quick questions. Takes 90 seconds. Your 
personalized protocol is on the other side."
Progress indicator
CTA: "Let's Go"
```

#### 2.2 Step 1: Goal Selection (Redesign)
**Change icons and copy for "course building" feel:**

```text
Question: "What's your #1 goal?"

Cards with icons:
- Burn Fat (Flame) - "Optimize metabolism and body composition"
- Build Muscle (Dumbbell) - "Accelerate recovery and growth"
- Heal Faster (Heart) - "Recover from injury or surgery"
- Slow Aging (Clock) - "Longevity, skin, vitality"
- Sharpen Mind (Brain) - "Focus, memory, clarity"
- Not Sure Yet (HelpCircle) - "Show me the options"

Auto-advance on selection
```

#### 2.3 Step 2: Experience Level (Keep structure, update copy)

#### 2.4 Step 3: Biggest Fear (Rename from "Concerns")
**Single select instead of multi-select:**

```text
Question: "What worries you most about starting?"

- Messing up reconstitution
- Getting the dose wrong
- The injection itself
- Side effects
- Nothing - I just need a protocol
```

#### 2.5 Step 4: Timeline (Keep current)

#### 2.6 Step 5: Email Capture (Enhance)
**Show protocol preview teaser:**

```text
Headline: "Your course is ready"
Preview: Show protocol name and peptide names (blur dosing)
Email input + newsletter checkbox
CTA: "See My Protocol"
```

---

### Phase 3: Quiz Results Page Rebuild

#### 3.1 For Non-Subscribed Users (`src/pages/QuizResults.tsx`)

**Value stack with comparison pricing:**

```text
Header: "Your [Goal] Protocol"
Subtext: "Built for [experience level] · Addressing [biggest fear]"

Protocol Preview Card:
- Show: Protocol name, Peptide names
- Blur/lock: Dosing, Timing, Cycle schedule

What's Included Section (checklist):
✓ Your complete protocol with exact dosing
✓ Step-by-step reconstitution walkthrough  
✓ Injection guide for beginners
✓ Day-by-day guidance through your cycle
✓ 24/7 AI coach for questions
✓ Progress tracking with streaks

Value Stack:
- Personalized protocol ($299 value)
- Reconstitution masterclass ($49 value)
- 24/7 AI coaching (priceless)
- Total value: $500+
- Your price: $29/month

CTA: "Unlock My Protocol - $29/month"
Below: "Or $249/year (save 29%)"
```

---

### Phase 4: Dashboard Simplification

#### 4.1 Sidebar Navigation (`src/components/dashboard/DashboardSidebar.tsx`)
**Simplify to 4 items:**

```text
- Dashboard (home)
- My Protocol
- AI Coach
- Settings

REMOVE: Progress (integrate streaks into dashboard home)
```

#### 4.2 Dashboard Home (`src/pages/dashboard/Home.tsx`)
**Focus on TODAY:**

```text
Top Section - Status Bar:
- Current streak with flame: "7 day streak"
- Cycle progress: "Week 2 of 8"
- Quick status: "On track" (green) or "Check in today" (yellow)

Main Section - Today's Focus:
- Large check-in card
- If not checked in: "Complete Check-In" button
- If checked in: Show summary with checkmark

Secondary Section - Quick Actions:
- "Need Help?" → AI Coach
- "View Protocol" → Protocol page

Bottom Section - Recent Milestones
```

#### 4.3 Check-In as Modal (Move from separate flow)
**Make check-in a modal that appears on dashboard:**
- Keep existing `CheckInFlow` logic
- Wrap in a Dialog/Modal
- Open from dashboard button
- Close and show celebration on complete

---

### Phase 5: AI Coach Simplification

#### 5.1 Single Chat Interface (`src/pages/dashboard/Coach.tsx`)
**Remove the 4 tabs. Make it ONE thing: Chat.**

```text
Reconstitution Guide → Move to Protocol page (collapsible)
Injection Guide → Move to Protocol page (collapsible)
Check-In Flow → Move to Dashboard (modal)
Ask Coach → Keep as the ONLY thing on Coach page
```

#### 5.2 Chat Interface Enhancement
**Add suggested questions when empty:**

```text
Suggested Questions:
- "What should I expect in week 1?"
- "How do I know if my dose is right?"
- "What are normal side effects?"
- "Can I stack [peptide] with [peptide]?"
```

---

### Phase 6: Protocol Page Enhancement

#### 6.1 Protocol Page with Guides (`src/pages/dashboard/Protocol.tsx`)
**Move reconstitution and injection guides here:**

```text
Section 1: Your Peptides (existing peptide cards)

Section 2: Your Schedule (weekly calendar view)

Section 3: Guides (NEW)
- Collapsible "Reconstitution Guide" 
- Collapsible "Injection Guide"
- Each step has "Mark Complete" checkbox

Section 4: Actions (Start/Pause/Resume)
```

---

### Phase 7: Protocol Templates Update

#### 7.1 Update `src/hooks/useProtocol.ts`
**Replace templates with specification from prompt:**

| Goal | Protocol Name | Peptides | Duration |
|------|---------------|----------|----------|
| fat_loss | Fat Loss Protocol | Semaglutide | 8 weeks |
| muscle_recovery | Muscle & Recovery Protocol | BPC-157 + TB-500 | 8 weeks |
| injury_recovery | Injury Recovery Protocol | BPC-157 + TB-500 | 6 weeks |
| anti_aging | Anti-Aging & Longevity Protocol | Epithalon + GHK-Cu | 12 weeks |
| cognitive | Cognitive Enhancement Protocol | Semax + Selank | 8 weeks |
| general_wellness | Beginner Protocol | BPC-157 | 6 weeks |

Each protocol includes full details: purpose, dosage, frequency, timing, site.

---

## Files to Create

| File | Purpose |
|------|---------|
| `src/components/landing/CourseFeatures.tsx` | 3-pillar solution section |
| `src/components/landing/CurriculumSection.tsx` | Course modules accordion |
| `src/components/landing/ComparisonSection.tsx` | Competitor comparison table |
| `src/components/dashboard/CheckInModal.tsx` | Modal wrapper for check-in |
| `src/components/protocol/CollapsibleGuide.tsx` | Reusable collapsible guide |

## Files to Modify

| File | Changes |
|------|---------|
| `src/pages/Index.tsx` | New section order, remove old sections |
| `src/components/landing/HeroSection.tsx` | Complete rewrite |
| `src/components/landing/ProblemSection.tsx` | New "courses are a scam" copy |
| `src/components/landing/PricingCTA.tsx` | Single card with value stack |
| `src/components/landing/FAQ.tsx` | New FAQ content |
| `src/components/landing/Navbar.tsx` | Update nav links and CTAs |
| `src/pages/Quiz.tsx` | Add intro screen, redesign steps |
| `src/pages/QuizResults.tsx` | Add value stack, comparison pricing |
| `src/pages/dashboard/Home.tsx` | Add status bar, check-in modal |
| `src/pages/dashboard/Coach.tsx` | Remove tabs, single chat |
| `src/pages/dashboard/Protocol.tsx` | Add collapsible guides |
| `src/components/dashboard/DashboardSidebar.tsx` | Simplify nav items |
| `src/hooks/useProtocol.ts` | Update protocol templates |

## Files to Remove/Deprecate

| File | Action |
|------|--------|
| `src/components/landing/ChatbotDemo.tsx` | Remove (positions AI as product) |
| `src/components/landing/SocialProof.tsx` | Keep but update messaging |
| `src/components/landing/ProductPreview.tsx` | Replace with CourseFeatures |
| `src/pages/dashboard/Progress.tsx` | Keep but simplify/integrate |

---

## Key Messaging Changes

### Headlines
- OLD: "Your AI Peptide Coach"
- NEW: "The $2,000 Peptide Course. For $29."

### CTAs
- OLD: "Get Your Free Protocol"
- NEW: "Build My Course (Free)"

### Value Proposition
- OLD: "AI-powered research assistant"
- NEW: "Personalized peptide course that replaces $2,000 guru courses"

### Competitor Framing
- OLD: None
- NEW: Direct comparison to Jay Campbell's $1,999 courses

---

## Implementation Order

1. **Landing Page** - Complete redesign (hero, problem, solution, curriculum, pricing)
2. **Quiz Flow** - Add intro, redesign steps for "course building"
3. **Quiz Results** - Add value stack and comparison pricing
4. **Dashboard Simplification** - Merge check-in into modal, simplify nav
5. **Coach Simplification** - Remove tabs, single chat only
6. **Protocol Enhancement** - Add collapsible guides
7. **Protocol Templates** - Update with detailed specifications

---

## Legal Disclaimer (Must Include)

```text
"Peptide Playbook provides educational content based on published 
research. This is not medical advice, diagnosis, or treatment. The 
information provided is for educational purposes only and is not 
intended to replace professional medical advice. Always consult a 
qualified healthcare provider before starting any new supplement, 
peptide, or health protocol. Individual results may vary. Peptide 
Playbook does not sell peptides or recommend specific vendors."
```

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Quiz start rate | > 20% of landing visitors |
| Quiz completion rate | > 60% |
| Quiz-to-signup conversion | > 30% |
| Daily check-in completion | > 70% |
| Monthly retention | > 80% |

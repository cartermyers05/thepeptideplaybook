

# Peptide Playbook - Complete Rebuild Plan

## Executive Summary

This is a **major product pivot** from a subscription-based AI chatbot ($29/month) to a **one-time purchase course platform** ($99 per course). The rebuild affects the business model, database schema, Stripe integration, routing, and the entire user experience.

---

## What's Being Kept (No Changes)

| Component | Status |
|-----------|--------|
| Supabase auth system | Keep as-is |
| Basic routing structure | Keep, add new routes |
| Edge function infrastructure | Keep structure, update logic |
| UI component library | Keep Shadcn/Tailwind |
| Existing hooks structure | Keep pattern, rebuild logic |

---

## Phase 1: Database Schema Changes

### New Tables to Create

**course_templates** (Admin-seeded, stores the 6 course types)
```text
- id: uuid (primary key)
- goal: text (unique: fat_loss, muscle, recovery, anti_aging, cognitive, beginner)
- title: text
- description: text
- peptides: jsonb (array of peptide objects)
- duration_days: integer (42-84 depending on course)
- lessons: jsonb (array of lesson objects with day, phase, title, content, action_item)
- created_at: timestamp
```

**user_courses** (Created when user purchases)
```text
- id: uuid (primary key)
- user_id: uuid (references profiles)
- template_id: uuid (references course_templates)
- goal: text
- title: text
- peptides: jsonb
- duration_days: integer
- lessons: jsonb
- current_day: integer (default 0)
- status: text (not_started, waiting_supplies, active, completed)
- supplies_status: text (have_them, this_week, ordering)
- started_at: timestamp
- purchased_at: timestamp
- created_at: timestamp
```

**lesson_progress** (Tracks completion per lesson)
```text
- id: uuid (primary key)
- user_id: uuid (references profiles)
- course_id: uuid (references user_courses)
- day: integer
- completed: boolean
- completed_at: timestamp
- notes: text
- UNIQUE(user_id, course_id, day)
```

**chat_messages** (Replaces conversations+messages for simpler coach chat)
```text
- id: uuid (primary key)
- user_id: uuid (references profiles)
- course_id: uuid (references user_courses, nullable)
- role: text (user, assistant)
- content: text
- created_at: timestamp
```

### Tables to Update

**purchases** - Add course_goal field
```text
- course_goal: text (which course was purchased)
```

**referrals** - Add discount/credit tracking
```text
- discount_amount: integer (default 2000 = $20)
- credit_amount: integer (default 2000 = $20)
```

---

## Phase 2: New Route Structure

### Routes to Add
```text
/course/:goal       → Course preview page (pre-purchase)
/dashboard/course   → Full course view (all lessons)
/dashboard/plan     → Peptides & schedule view
```

### Routes to Update
```text
/                   → Complete landing page redesign
/dashboard          → Today's lesson view (replace current)
/dashboard/coach    → Simplified chat (keep but update)
/dashboard/settings → Add purchases & referrals view
```

### Routes to Remove
```text
/quiz/results       → Replace with /course/:goal flow
/dashboard/protocol → Replace with /dashboard/plan
/dashboard/progress → Remove (integrate into dashboard home)
```

---

## Phase 3: Landing Page Redesign

### New Component Structure

```text
src/pages/Index.tsx
├── HeroSection (rewrite - "First AI-Powered Peptide Course")
├── HowItWorksSection (new - 3 steps with icons)
├── WhatsInsideSection (new - 6 feature cards)
├── GoalSelectionSection (new - 6 goal cards linking to /course/:goal)
├── PricingSection (rewrite - single $99 card)
├── FAQ (update content)
└── Footer (update with legal disclaimer)
```

### Key Messaging Changes

| Old | New |
|-----|-----|
| "The $2,000 Peptide Course. For $29." | "The First AI-Powered Peptide Course" |
| "Build My Course (Free)" | "Pick Your Goal" |
| Subscription pricing | One-time $99 per course |
| Protocol-focused | Lesson/course-focused |

---

## Phase 4: Course Preview Page (/course/:goal)

### New Page: `src/pages/CoursePreview.tsx`

**Flow:**
1. Show "Building your personalized course..." animation (3-4 seconds)
2. Reveal course preview with:
   - Course title
   - What's included checklist
   - Peptide list (no dosing shown pre-purchase)
   - CTA: "Get Your Course - $99"
3. If already purchased, show "Go to Dashboard" instead

---

## Phase 5: Stripe Integration Update

### Update: `supabase/functions/create-checkout/index.ts`

**Change from subscription to one-time payment:**
```text
Current: mode: "subscription"
New: mode: "payment"

Current: Uses price IDs for monthly/annual
New: Uses price_data with $99.00 unit_amount

Current: subscription_data metadata
New: payment metadata (user_id, goal)
```

### New Edge Function: `supabase/functions/handle-payment-success/index.ts`

**Webhook handler for checkout.session.completed:**
1. Extract user_id and goal from metadata
2. Create purchase record
3. Copy course template to user_courses
4. Set status to 'not_started'

---

## Phase 6: Dashboard Redesign

### Updated: `src/pages/dashboard/Home.tsx`

**New Layout:**
```text
┌─────────────────────────────────────────┐
│ [Course Title]                          │
│ Day X of Y                              │
├─────────────────────────────────────────┤
│ TODAY'S LESSON                          │
│ Day X: [Lesson Title]                   │
│ [Preview text...]                       │
│ [Start Today's Lesson]                  │
├─────────────────────────────────────────┤
│ Progress: ████████░░ X%                 │
├─────────────────────────────────────────┤
│ [My Plan] [AI Coach]                    │
└─────────────────────────────────────────┘
```

**Status-based views:**
- `waiting_supplies`: "Waiting for supplies" message + "Ready to start" button
- `active`: Today's lesson card
- `completed`: Celebration + "Browse Courses" link

### New Page: `src/pages/dashboard/CourseLessons.tsx`

**Full course view with all lessons:**
```text
Phase 1: Preparation
  Day 0: Welcome & Your Plan ✓
  Day 1: Understanding Peptides ✓
  Day 2: Supplies Checklist [Current]
  Day 3: Reconstitution 🔒
  ...

Phase 2: Week 1
  Day 4: Your First Injection 🔒
  ...
```

### New Page: `src/pages/dashboard/MyPlan.tsx`

**Replaces Protocol.tsx with course-appropriate naming:**
- Peptide cards with research-based dosing language
- Weekly schedule view
- Supplies checklist
- Move guides here from Protocol

---

## Phase 7: Welcome Flow

### New Component: `src/components/dashboard/WelcomeModal.tsx`

**Shown when `?welcome=true` in URL:**
```text
🎉 Your [Goal] Course is Ready!

Before we start, one question:
When are your supplies arriving?

[I have them] → status: active, start Day 0
[This week] → status: waiting_supplies
[Still ordering] → Show supplies checklist
```

---

## Phase 8: Course Templates Data

### Seed 6 course templates:

| Goal | Title | Peptides | Duration |
|------|-------|----------|----------|
| fat_loss | Fat Loss Course | Semaglutide | 56 days (8 weeks) |
| muscle | Muscle & Recovery Course | BPC-157, TB-500 | 56 days |
| recovery | Injury Recovery Course | BPC-157, TB-500 | 42 days (6 weeks) |
| anti_aging | Anti-Aging & Longevity Course | Epithalon, GHK-Cu | 84 days (12 weeks) |
| cognitive | Cognitive Enhancement Course | Semax, Selank | 56 days |
| beginner | Beginner Course | BPC-157 | 42 days |

Each includes full lesson array with day, phase, title, content, action_item.

---

## Phase 9: Hooks & State Management

### New Hooks

**useCourse.ts**
```text
- Fetch user's active course
- Start/complete lessons
- Update course status
- Track current day
```

**useLessons.ts**
```text
- Fetch lesson progress
- Mark lessons complete
- Get today's lesson
- Calculate streak (lessons completed consecutively)
```

**useChatMessages.ts** (simpler than current conversations)
```text
- Fetch chat history
- Send message to coach
- Store responses
```

### Hooks to Update

**useProtocol.ts** → Rename to useCourse, update structure
**useCheckIn.ts** → Merge into useLessons (lesson completion replaces check-in)

---

## Phase 10: AI Coach Updates

### Update: `supabase/functions/coach/index.ts`

**New system prompt:**
```text
You are an educational peptide coach helping a user through their course.

User's Course: {course_title}
User's Goal: {goal}
User's Peptides: {peptides}
Current Day: {current_day} of {duration_days}

Guidelines:
- Reference research: "Studies have shown...", "Research suggests..."
- Never diagnose, prescribe, or give medical advice
- If asked about sourcing, say you can't recommend specific sources
```

---

## File Changes Summary

### New Files (Create)
```text
src/pages/CoursePreview.tsx
src/pages/dashboard/CourseLessons.tsx
src/pages/dashboard/MyPlan.tsx
src/components/dashboard/WelcomeModal.tsx
src/components/course/LessonCard.tsx
src/components/course/LessonModal.tsx
src/components/landing/HowItWorksSection.tsx
src/components/landing/WhatsInsideSection.tsx
src/components/landing/GoalSelectionSection.tsx
src/hooks/useCourse.ts
src/hooks/useLessons.ts
src/hooks/useChatMessages.ts
supabase/functions/handle-payment-success/index.ts
```

### Files to Rewrite
```text
src/pages/Index.tsx (complete redesign)
src/components/landing/HeroSection.tsx
src/components/landing/PricingCTA.tsx
src/components/landing/FAQ.tsx
src/pages/dashboard/Home.tsx
supabase/functions/create-checkout/index.ts
supabase/functions/coach/index.ts
```

### Files to Deprecate/Remove
```text
src/pages/Quiz.tsx (replace with direct /course/:goal flow)
src/pages/QuizResults.tsx (merge into CoursePreview)
src/pages/dashboard/Protocol.tsx (replace with MyPlan)
src/pages/dashboard/Progress.tsx (integrate into Home)
src/hooks/useProtocol.ts (replace with useCourse)
src/hooks/useCheckIn.ts (replace with useLessons)
```

---

## Implementation Order

1. **Database migrations** - Create new tables (course_templates, user_courses, lesson_progress, chat_messages)
2. **Seed course templates** - Insert 6 course templates with full lesson content
3. **Stripe update** - Change create-checkout to one-time payment mode
4. **Payment webhook** - Create handle-payment-success edge function
5. **New hooks** - Create useCourse, useLessons, useChatMessages
6. **Course preview page** - Build /course/:goal with building animation
7. **Landing page redesign** - New sections and goal selection
8. **Dashboard redesign** - Today's lesson view, welcome modal
9. **Course lessons page** - Full day-by-day view
10. **My Plan page** - Peptides, schedule, supplies
11. **Coach updates** - New system prompt and context
12. **Settings updates** - Show purchases and referrals
13. **Referral system** - $20 discount/credit flow

---

## Success Verification Checklist

- [ ] Landing page loads with "Pick Your Goal" cards
- [ ] Clicking goal goes to /course/:goal with building animation
- [ ] Course preview shows peptides without dosing
- [ ] $99 checkout redirects to Stripe
- [ ] Payment success creates user_course record
- [ ] Welcome modal asks about supplies
- [ ] Dashboard shows today's lesson
- [ ] Lesson completion advances current_day
- [ ] My Plan shows peptides with research-based language
- [ ] AI Coach has course context
- [ ] Referral codes generate $20 discount


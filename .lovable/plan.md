

# PeptideGPT Implementation Plan
## AI-Powered Peptide Research Assistant → $1M ARR

---

## 🎯 Product Vision

A premium, conversion-optimized SaaS that provides instant, research-backed answers to peptide questions. Clean, Linear-inspired design with deep blue accents conveying authority and trust.

**Business Model:** $1 trial (7 days) → $20/month subscription
**Target:** 4,167 paying customers = $1M ARR

---

## Phase 1: Foundation & Landing Page
*The conversion machine*

### High-Converting Landing Page
- **Hero Section:** Bold headline "Get Instant, Expert-Level Peptide Answers" with a live interactive demo showing real AI responses
- **Problem Agitation:** 4-column grid highlighting pain points (hours wasted, conflicting info, no citations, outdated sources)
- **Solution Showcase:** Interactive chat demo with typing animation and real peptide Q&A
- **Feature Benefits:** Smart AI, research citations, protocol guidance, safety-first approach
- **Social Proof:** Testimonials with photos, 4.9/5 rating from 847 reviews, user count
- **Pricing Section:** Anchored pricing (~~$49~~ $20/month), trust badges (Stripe, SSL, money-back guarantee)
- **FAQ Accordion:** Address all major objections
- **Final CTA:** Full-width gradient section with strong call-to-action

### Design System
- **Aesthetic:** Minimal, clean like Linear/Notion
- **Primary Color:** Deep blue/indigo
- **Typography:** Inter font, clean spacing
- **Components:** Shadcn/ui with custom styling
- **Animations:** Smooth, subtle transitions

---

## Phase 2: Authentication & Onboarding
*Zero friction to first value*

### Multi-Step Signup Flow
1. **Step 1:** Email capture only (minimal friction)
2. **Step 2:** Create account (name, password, terms)
3. **Step 3:** Welcome → First free question → Payment prompt after seeing value

### User Profiles & Database
- User accounts with Supabase Auth
- Profiles table (name, avatar, preferences)
- Trial tracking (trial_ends_at, subscription_status)
- Separate roles table for admin access (security best practice)

### Onboarding Experience
- Welcome screen with personalized greeting
- Suggested questions to reduce "blank page" syndrome
- Quick Start Challenge: Ask 3 questions to unlock tips
- Progress indicator throughout

---

## Phase 3: AI Chat Dashboard
*The core product experience*

### Chat Interface
- Clean, minimal chat UI with sidebar navigation
- Real-time AI responses powered by Lovable AI (Google Gemini)
- System prompt trained for peptide expertise with citations
- Markdown rendering for formatted responses
- Source citations with links to research
- "Was this helpful?" feedback buttons
- Save/favorite answers functionality

### Sidebar Navigation
- Chat (main)
- History (past conversations)
- Saved (favorite answers)
- Stats (usage dashboard)
- Account (settings)
- Refer Friends

### Suggested Questions
Pre-populated peptide questions to help users get started:
- "What's the best peptide for recovery?"
- "How do I dose BPC-157 safely?"
- "Which peptides stack well together?"
- "What are the side effects of TB-500?"

---

## Phase 4: Retention & Gamification
*Building habits and preventing churn*

### Usage Statistics Dashboard
- Questions asked (total + this week)
- Research time saved (with $ value calculation)
- Studies cited count
- Current usage streak with 🔥 emoji
- Progress to next milestone tier

### Milestone System
- Celebrate 10, 50, 100, 500 questions
- Achievement badges ("Research Pro", "Expert Tier")
- Progress bars showing advancement
- Unlock "Pro Tips" after engagement thresholds

### Streak Tracking
- Daily usage streaks
- Visual streak indicator
- "Keep it going!" encouragement

---

## Phase 5: Account & Subscription Management
*Subscription UI ready for Stripe integration later*

### Account Settings
- Profile editing (name, email, avatar)
- Subscription display (plan, next billing date)
- Manage/Cancel subscription buttons (UI only for now)
- Password change
- Notification preferences

### Payment UI (Mock)
- Stripe-styled payment form UI
- $1 trial display with $20/month continuation
- Trust badges and security indicators
- Ready to connect real Stripe when you're ready

---

## Phase 6: Referral System
*Viral growth engine*

### Referral Program
- Unique referral links for each user
- "Give 14 days free, Get 1 month free"
- Copy link / Share on Twitter / Email friends buttons
- Referral tracking dashboard
- Rewards earned display

---

## Phase 7: Admin Dashboard
*Track your path to $1M*

### Admin Metrics View (protected route)
- MRR display with growth percentage
- Total users (trial vs. paid breakdown)
- Churn rate with trend indicator
- Trial-to-paid conversion rate
- Revenue over time chart
- User growth chart

### User Management
- User table with search/filter
- Status indicators (trial, paid, churned)
- Questions asked per user
- Risk score for churn prediction
- Export to CSV

### Alerts System
- High churn risk alerts (14+ days inactive)
- Conversion opportunities (trials ending soon)
- Power users ready for upgrade

---

## Technical Architecture

### Backend (Lovable Cloud)
- **Database:** Supabase PostgreSQL
  - users/profiles tables
  - user_roles table (separate for security)
  - questions/answers table
  - subscriptions table
  - referrals table
- **Authentication:** Supabase Auth with email
- **Edge Functions:** AI chat endpoint using Lovable AI gateway
- **Row Level Security:** Users can only access their own data

### AI Integration
- Lovable AI Gateway with google/gemini-3-flash-preview
- Streaming responses for real-time typing effect
- Peptide-expert system prompt with citation requirements
- Rate limit handling with user-friendly errors

### Frontend
- React + TypeScript + Tailwind CSS
- Shadcn/ui components
- React Router for navigation
- TanStack Query for data fetching
- Recharts for admin analytics

---

## Conversion Optimization Built-In

✅ Single, prominent CTA throughout  
✅ Social proof above the fold  
✅ Trust badges (SSL, secure payment, money-back)  
✅ Price anchoring (~~$49~~ $20)  
✅ Risk reversal messaging  
✅ Progressive onboarding (email only first)  
✅ Quick win (instant value from first question)  
✅ Gamification (streaks, milestones)  
✅ Referral incentives (viral loop)  
✅ Churn prevention alerts  

---

## What You'll Get

1. **High-converting landing page** optimized for 5% trial signup rate
2. **Frictionless signup flow** with progressive disclosure
3. **Real AI-powered chat** answering peptide questions with citations
4. **User dashboard** with stats, history, and saved answers
5. **Gamification system** with milestones and streaks
6. **Referral program** for viral growth
7. **Admin dashboard** to track your path to $1M
8. **Mobile-responsive** design throughout
9. **Stripe-ready UI** (real integration when you connect Stripe)

This is your complete growth machine, designed from the ground up to convert visitors into paying customers and keep them engaged for the long term.


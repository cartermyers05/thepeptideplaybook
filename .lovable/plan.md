
# Landing Page Conversion Optimization Plan

## Overview
Transform the landing page into a high-converting sales page by simplifying copy to a 5th-7th grade reading level, adding an interactive guided demo, improving social proof, and creating a single-focus CTA funnel. All changes maintain the existing design system.

---

## Files to Modify

| File | Purpose |
|------|---------|
| `src/pages/Index.tsx` | Reorder sections, add new components |
| `src/components/landing/HeroSection.tsx` | Simplify copy, add stats bar |
| `src/components/landing/GuidedDemo.tsx` | **NEW** - Interactive Q&A demo |
| `src/components/landing/StatsBar.tsx` | **NEW** - 500+ studies stats |
| `src/components/landing/ConversationPreviews.tsx` | **NEW** - Mini chat previews |
| `src/components/landing/TrustBadges.tsx` | **NEW** - Security/guarantee badges |
| `src/components/landing/WhoThisIsFor.tsx` | **NEW** - Target audience section |
| `src/components/landing/FinalCTA.tsx` | Improve with guarantee copy |
| `src/components/landing/HowItWorksSection.tsx` | Simplify copy |
| `src/components/landing/WhatsInsideSection.tsx` | Reframe as questions |
| `src/components/landing/GoalSelectionSection.tsx` | Simplify copy |
| `src/components/landing/PricingCTA.tsx` | Add guarantee, trust badges |
| `src/components/landing/FAQ.tsx` | Simplify language |

---

## CHANGE 1: Simplified Copy (5th-7th Grade Level)

### HeroSection.tsx Changes

**Current headline:**
```
Your
AI Peptide
Journey
```

**New headline:**
```
Stop Guessing
About Peptides
```

**New subheadline:**
```
Ask any question. Get answers backed by 500+ real studies.
No bro-science. No TikTok hype.
```

**CTA button text:**
- Current: "Start Your Course"
- New: "Get Full Access — $67"

**Supporting text kept:** "$67 one-time · Lifetime access · 30-day guarantee"

### HowItWorksSection.tsx - Simplified Copy

| Step | Current | New |
|------|---------|-----|
| 01 Title | "Pick Your Goal" | "Tell Us Your Goal" |
| 01 Desc | "Choose from fat loss, muscle building, recovery..." | "Pick what you want: burn fat, build muscle, recover faster, or slow aging. Takes 60 seconds." |
| 02 Title | "AI Builds Your Course" | "We Build Your Plan" |
| 02 Desc | "In seconds, your personalized program is generated..." | "You get a custom plan with the right peptides for your goal. Based on real research, not random forums." |
| 03 Title | "Learn the Fundamentals" | "Learn How to Do It Safely" |
| 03 Desc | "Before you inject anything, master the essentials..." | "Step-by-step guides show you exactly how to mix and use peptides. No guessing." |
| 04 Title | "Follow Daily Lessons" | "Follow Along Day by Day" |
| 04 Desc | "Each day, a new lesson unlocks..." | "One lesson a day. Never overwhelming. Just what you need to know today." |
| 05 Title | "Track & Improve" | "Ask Questions Anytime" |
| 05 Desc | "Build streaks, hit milestones..." | "Stuck? Ask the AI coach anything. It knows 500+ studies and your specific plan." |

### WhatsInsideSection.tsx - Question-Based Headings

**Section heading:** "What's Inside?" (currently "What You Get")

| Current Feature Title | New Title |
|----------------------|-----------|
| "Personalized Peptide Selection" | "Which Peptides Are Right for Me?" |
| "Research-Based Dosing" | "How Much Should I Take?" |
| "8-Week Day-by-Day Program" | "What Do I Do Each Day?" |
| "Reconstitution Walkthrough" | "How Do I Mix It?" |
| "Injection Guide" | "How Do I Actually Use It?" |
| "24/7 AI Coach Access" | "What If I Have Questions?" |

**Feature descriptions simplified:**
- "AI Chatbot" → "Ask any peptide question. Get a research-backed answer in seconds."
- "Guide Library" → "45+ peptides explained in plain English. No medical jargon."
- "Research Database" → "Every answer cites real published studies. Not Reddit threads."

### GoalSelectionSection.tsx - Simplified

**Section heading:** "What's Your Goal?" (currently "Pick Your Goal")

**Subheadline:** "Pick what matters most. We'll show you exactly what's in your plan."

### FAQ.tsx - Add Simpler Language

Keep existing FAQs but add 2 new ones:
- "Is this worth $67?" → "That's less than one doctor visit. And you get lifetime access to 500+ research-backed answers."
- "What if it doesn't work for me?" → "Email us within 30 days for a full refund. No questions asked."

---

## CHANGE 2: Guided Interactive Demo

### New Component: `GuidedDemo.tsx`

**Structure:**
```
┌─────────────────────────────────────────────────┐
│  What do you want to know?                       │
├─────────────────────────────────────────────────┤
│  ┌──────────────────┐  ┌──────────────────┐     │
│  │ Best peptide for │  │ Is BPC-157 safe? │     │
│  │ weight loss?     │  │                  │     │
│  └──────────────────┘  └──────────────────┘     │
│  ┌──────────────────┐  ┌──────────────────┐     │
│  │ How do I         │  │ Peptides for     │     │
│  │ reconstitute?    │  │ muscle growth?   │     │
│  └──────────────────┘  └──────────────────┘     │
│  ┌──────────────────┐  ┌──────────────────┐     │
│  │ Are peptides     │  │ TB-500 vs        │     │
│  │ legal in 2026?   │  │ BPC-157?         │     │
│  └──────────────────┘  └──────────────────┘     │
└─────────────────────────────────────────────────┘
```

**After clicking a question:**
```
┌─────────────────────────────────────────────────┐
│  [User bubble] What's the best peptide for      │
│                weight loss?                      │
│                                                  │
│  [AI bubble with typewriter effect]              │
│  The two most researched options are...         │
│  ┌────────────────────────────────────────┐     │
│  │ Semaglutide: 14.9% body weight loss    │     │
│  │ Tirzepatide: Up to 22.5% weight loss   │     │
│  └────────────────────────────────────────┘     │
│  ⚠️ Important: Both require a prescription...   │
│  📚 Based on published clinical trials          │
├─────────────────────────────────────────────────┤
│  This is 1 of 500+ questions we can answer.     │
│                                                  │
│  [ Get Full Access — $67 ]                      │
│  30-day money-back guarantee                    │
│                                                  │
│  Ask another question →                         │
└─────────────────────────────────────────────────┘
```

**Technical implementation:**
- State: `selectedQuestion: string | null`, `showAnswer: boolean`
- 6 hardcoded questions with pre-written answers (from spec)
- Reuse `useTypewriter` hook for answer animation
- Render markdown in answers using ReactMarkdown
- Chat bubble styling matches `ChatInterface.tsx` pattern
- Mobile: 2 columns on sm, 1 column on xs

**6 Pre-written Q&A pairs** (stored as constant, no API call):
1. Weight loss peptides (Semaglutide/Tirzepatide stats)
2. BPC-157 safety (what we know/don't know format)
3. Reconstitution steps (4 key steps)
4. Muscle growth peptides (with table)
5. Peptide legality 2026 (FDA approved vs research)
6. TB-500 vs BPC-157 comparison (table)

---

## CHANGE 3: Social Proof Section

### New Component: `StatsBar.tsx`

Horizontal bar below hero with 3 stats:
```
📚 500+ Studies Analyzed  |  💬 45+ Peptides Covered  |  🔬 Updated February 2026
```

**Styling:**
- Use existing `bg-secondary/50` background
- Icons from Lucide (BookOpen, MessageCircle, FlaskConical)
- Centered, responsive (stack on mobile)

### New Component: `ConversationPreviews.tsx`

3 mini chat preview cards:
```
┌─────────────────────────────────────────────────┐
│  "Can I take BPC-157    │  "Is semaglutide   │
│   with TB-500?"         │   safe long-term?" │
│                         │                     │
│  "Yes — they use        │  "The STEP trials  │
│   different..."         │   followed..."     │
│  ───────────────────    │  ──────────────────│
│  See full answer →      │  See full answer → │
└─────────────────────────────────────────────────┘
```

**Behavior:** Clicking "See full answer →" scrolls to GuidedDemo and selects relevant question OR triggers signup modal.

### New Component: `TrustBadges.tsx`

Horizontal row of 4 small badges near pricing:
```
🔬 Based on peer-reviewed research
🔒 Secure checkout via Stripe  
💰 30-day money-back guarantee
📱 Access on any device
```

**Styling:** Small icons, muted text, subtle background

---

## CHANGE 4: Money-Back Guarantee

### In PricingCTA.tsx

Add below the CTA button:
```tsx
<p className="mt-3 text-sm text-muted-foreground">
  30-day money-back guarantee. No questions asked.
</p>
```

### New mini-section before final CTA (in FinalCTA.tsx):

```
┌─────────────────────────────────────────────────┐
│  Not sure yet? No risk.                         │
│                                                  │
│  Try Peptide Playbook for 30 days. If it's not │
│  the clearest peptide resource you've ever     │
│  used, email us and we'll refund every penny.  │
│  No questions asked.                            │
│                                                  │
│  [ Get Full Access — $67 ]                      │
└─────────────────────────────────────────────────┘
```

---

## CHANGE 5: Single CTA Focus

### Primary CTA Everywhere:
- **Text:** "Get Full Access — $67"
- **Destination:** `/quiz` (maintains existing funnel)
- **Style:** `PillButton variant="dark" size="lg"`

### CTA Placement (3+ times):
1. Hero section (after headline)
2. After GuidedDemo answer
3. In PricingCTA section
4. Final CTA at bottom

### Secondary Actions (text links only):
- "See How It Works" → ghost button or text link
- Goal cards → keep as cards but add small "See Your Course" text
- Quiz link remains but as part of primary CTA flow

---

## CHANGE 6: Urgency/Value Framing

### Near primary CTAs, add supporting copy:

```
$67 one-time. That's less than one doctor visit to ask these same questions.
```

**No fake scarcity.** Remove or soften:
- Current: "Early Access Pricing" badge
- Current: "Price increases soon"

Keep simple: "$67 one-time · Lifetime access · 30-day guarantee"

---

## CHANGE 7: New "Who This Is For" Section

### New Component: `WhoThisIsFor.tsx`

```
Peptide Playbook is for you if...

• You've seen peptides on TikTok and want real answers
• Your doctor doesn't know much about peptides yet  
• You want research, not someone selling you something
• You're researching for yourself or a family member
```

**Styling:** Simple bullet list, muted foreground, max-w-xl centered

---

## Page Structure (New Order)

```tsx
// src/pages/Index.tsx
<Navbar />
<main>
  <HeroSection />        // Simplified + CTA
  <StatsBar />           // NEW: 500+ studies | 45+ peptides
  <GuidedDemo />         // NEW: Interactive Q&A
  <WhatsInsideSection /> // Simplified, question-based
  <ConversationPreviews /> // NEW: Mini chat previews
  <WhoThisIsFor />       // NEW: Target audience
  <PricingCTA />         // With guarantee + trust badges
  <FAQ />                // Simplified language
  <FinalCTA />           // Guarantee section + CTA
</main>
<Footer />
```

**Removed/demoted:**
- `ScrollIndicator` - removed (not needed)
- `HowItWorksSection` - moved lower or condensed into WhatsInside
- `GoalSelectionSection` - demoted to secondary (users go through quiz via main CTA)

---

## Technical Details

### New Files to Create:
1. `src/components/landing/GuidedDemo.tsx` (~200 lines)
2. `src/components/landing/StatsBar.tsx` (~40 lines)
3. `src/components/landing/ConversationPreviews.tsx` (~80 lines)
4. `src/components/landing/TrustBadges.tsx` (~40 lines)
5. `src/components/landing/WhoThisIsFor.tsx` (~50 lines)

### Existing Files to Modify:
1. `src/pages/Index.tsx` - Reorder sections, import new components
2. `src/components/landing/HeroSection.tsx` - New copy, CTA text
3. `src/components/landing/WhatsInsideSection.tsx` - Question-based titles
4. `src/components/landing/PricingCTA.tsx` - Add guarantee, trust badges
5. `src/components/landing/FAQ.tsx` - Add 2 new FAQs
6. `src/components/landing/FinalCTA.tsx` - Add guarantee section

### Reused Patterns:
- `useTypewriter` hook for demo answer animation
- `PillButton` component for all CTAs
- `motion` from framer-motion for animations
- Existing card styling (rounded-2xl, border-border)
- Chat bubble styling from `ChatInterface.tsx`

---

## What Will NOT Change

- Color scheme, fonts, spacing
- Navbar component
- Footer component  
- Any other pages (guides, dashboard, auth, etc.)
- Payment flow
- Quiz functionality
- Existing animations and hover effects
- Mobile responsive behavior (maintained)

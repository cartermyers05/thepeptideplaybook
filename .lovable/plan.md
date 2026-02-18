
# Landing Page Conversion Overhaul

## The Problem
82% bounce rate. 298 visitors -> ~10 checkouts (~3%). The hero isn't hooking visitors and the CTAs aren't compelling enough to drive action.

## Strategy
Rewrite copy and CTAs for outcome-focused messaging. Add urgency and social proof. Keep all layout, styling, and components exactly the same — only change TEXT content and minor additions.

---

## Changes (Copy + CTA Only — No Layout or Style Changes)

### 1. Hero Headline (`HeroSection.tsx`)
**Current:** "Your Personalized Peptide Protocol"
**New:** "Know Exactly What to Take, How Much, and When"

This shifts from describing the product to describing the outcome. It answers the visitor's actual question.

### 2. Hero Subhead (`HeroSection.tsx`)
**Current:** "Our AI — trained on 500+ studies — builds your personalized protocol with exact compounds, doses, timing, and safety info."
**New:** "Tell us your goal. Get a research-backed protocol with exact compounds, doses, timing, and safety info — built from 500+ peer-reviewed studies."

Leads with what the USER does, not what the AI does.

### 3. Hero Primary CTA (`HeroSection.tsx`)
**Current:** "Get Started"
**New:** "Get Your Protocol — $67"

Shows price upfront (filters tire-kickers, attracts serious buyers). Specific > vague.

### 4. Hero Secondary CTA (`HeroSection.tsx`)
**Current:** "Try the AI Free"
**New:** "See a Sample Answer"

Less commitment-sounding. Curiosity-driven.

### 5. Trust Items (`HeroSection.tsx`)
**Current:** "500+ Studies Analyzed", "45+ Peptides Covered", "Updated February 2026"
**Add a 4th item:** "30-Day Money-Back Guarantee"

Gets the risk-reversal above the fold.

### 6. How It Works Step 1 (`HowItWorksSection.tsx`)
**Current title:** "Create Your Free Account"
**New title:** "Tell Us Your Goal"
**Current description:** "Sign up in seconds. Tell us your goal, experience level, and any concerns."
**New description:** "Fat loss, muscle growth, recovery, anti-aging — pick your goal and tell us your experience level. Takes 60 seconds."

"Create your free account" is a friction word. Lead with the value step instead.

### 7. How It Works CTA (`HowItWorksSection.tsx`)
**Current:** "Get Started"
**New:** "Get Your Protocol — $67"

### 8. What's Inside CTA (`WhatsInsideSection.tsx`)
**Current:** "Get Your Full Blueprint"
**New:** "Get Your Protocol — $67"

### 9. Pricing CTA (`PricingCTA.tsx`)
**Current:** "Get Your Full Blueprint — $67"
**New:** "Get Instant Access — $67"

### 10. Final CTA Section (`FinalCTA.tsx`)
**Current headline:** "Stop Guessing. Start Knowing."
**New headline:** "Your Protocol Is Ready in 2 Minutes"
**Current subhead:** "Your personalized peptide protocol is waiting."
**New subhead:** "One payment. Lifetime access. 30-day money-back guarantee."
**Current CTA:** "Get Started"
**New CTA:** "Get Your Protocol — $67"

### 11. Floating Mobile CTA (`FloatingCTA.tsx`)
**Current:** "Get Started"
**New:** "Get Your Protocol — $67"

### 12. GuidedDemo CTA text (`GuidedDemo.tsx`)
**Current:** "This is 1 of 10,000+ questions Peptide Playbook can answer."
**New:** "This is a sample. Members get unlimited answers with full citations."
**Current CTA:** "Get Started"
**New CTA:** "Get Full Access — $67"

### 13. Add urgency line to PricingCTA (`PricingCTA.tsx`)
Below the $99 strikethrough, add a small line: "Launch pricing — increases soon" (text only, muted style, no countdown timer or fake scarcity).

### 14. Navbar CTA (`Navbar.tsx`)
**Current:** "Get Started"
**New:** "Get Your Protocol"

More specific, still concise for nav.

---

## What This Does NOT Change
- No layout changes
- No component restructuring
- No new dependencies
- No styling/color/font changes
- No dashboard, auth, quiz, or payment flow changes
- No new components created

## Expected Impact
- Lower bounce rate: Outcome-focused headline gives visitors a reason to keep reading
- Higher click-through: Specific CTAs with price reduce friction (no surprise at checkout)
- Better qualified traffic: Price in CTA filters out people who were never going to buy
- Urgency: "Launch pricing" gives a reason to act now

## Files Modified
1. `src/components/landing/HeroSection.tsx` — headline, subhead, CTAs, trust items
2. `src/components/landing/HowItWorksSection.tsx` — step 1 copy, CTA
3. `src/components/landing/WhatsInsideSection.tsx` — CTA text
4. `src/components/landing/PricingCTA.tsx` — CTA text, urgency line
5. `src/components/landing/FinalCTA.tsx` — headline, subhead, CTA
6. `src/components/landing/FloatingCTA.tsx` — CTA text
7. `src/components/landing/GuidedDemo.tsx` — CTA text
8. `src/components/landing/Navbar.tsx` — CTA text

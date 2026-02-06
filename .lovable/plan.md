

# Landing Page Maximum Clarity Optimization

## Current State Analysis

The landing page already has most of the structure in place from the previous optimization. Here's what exists vs. what needs refinement:

| Section | Current State | Needs Change? |
|---------|---------------|---------------|
| Hero | "Stop Googling Peptides" headline | Yes - new headline + subheadline |
| Demo | "See It In Action" with mock chat | Minor refinements only |
| Features | 6 cards with icons | Yes - copy updates |
| Who It's For | 4 persona cards | Yes - title change |
| How It Works | 3 steps | Yes - step 1 wording |
| Pricing | Comparison + card | Yes - copy refinements |
| FAQ | 6 questions | Yes - one question update |
| Final CTA | Working | Yes - copy update |
| SEO | robots.txt + sitemap exist | Already configured |

---

## Section-by-Section Changes

### 1. HERO SECTION
**File:** `src/components/landing/HeroSection.tsx`

**Current headline:** "Stop Googling Peptides. Get Research-Backed Answers in Seconds."
**New headline:** "Your Personal Peptide Research Assistant"

**Current subheadline:** "The AI-powered peptide research platform trusted by biohackers, athletes, and health-conscious people who want real science, not bro-science."
**New subheadline:** "An AI-powered platform that answers your peptide questions with real research. Not Reddit threads, not bro-science. 500+ studies. 45+ peptides. Protocols built for your goals."

**Trust bar update:** Change format to: "500+ Studies · 45+ Peptides · FDA Status Tracked · 30-Day Money Back"

---

### 2. DEMO SECTION
**File:** `src/components/landing/GuidedDemo.tsx`

**Current:** Already has mock conversation + interactive demo
**Update CTA text:** Change "This is 1 of 500+ questions..." to "This is real. Try it yourself →" after the mock chat

---

### 3. FEATURES SECTION
**File:** `src/components/landing/WhatsInsideSection.tsx`

**New title:** "Everything Inside The Peptide Playbook"

**Update feature copy (minor refinements):**
- AI Research Coach: "Ask any peptide question and get research-backed answers with study citations. Available 24/7."
- 45+ Peptide Database: "Every peptide with mechanisms, dosing research, safety profiles, and live FDA status."
- Custom Protocols: "Tell the AI your goals and experience. Get a personalized protocol built in 60 seconds."
- Daily Plan & Tracking: "See exactly what to take today, mark doses complete, and track your progress week by week."
- Doctor Scripts: "Pre-written conversation guides so you can talk to your provider about peptides confidently."
- 30+ Research Guides: "In-depth breakdowns of peptide science in plain English. Beginner to advanced."

**Add subtitle after grid:** "All of this. One payment. Lifetime access."

---

### 4. WHO IT'S FOR SECTION
**File:** `src/components/landing/WhoThisIsForNew.tsx`

**New title:** "Built For People Who Want Real Answers"

**Subtitle change:** Remove current subtitle, or change to implicit (no subtitle needed)

**Update persona descriptions:**
- New to peptides: "You've heard about BPC-157 or Semaglutide but don't know where to start."
- Deep in the rabbit hole: "You've spent hours on Reddit and YouTube and still don't feel confident."
- Athletes & recovery-focused: "You want to recover faster and perform better with science behind your decisions."
- Anti-aging & longevity: "You're exploring peptides like Epithalon and GHK-Cu and want to separate hype from evidence."

---

### 5. HOW IT WORKS SECTION
**File:** `src/components/landing/HowItWorksSection.tsx`

**New title:** "3 Steps. That's It."

**Update step descriptions:**
- Step 1: "Take a 2-Minute Quiz" → "Tell us your goals, experience level, and what you're curious about."
- Step 2: Keep as-is
- Step 3: Keep as-is (already says "real citations, not generic advice")

---

### 6. PRICING SECTION
**File:** `src/components/landing/PricingCTA.tsx`

Already matches the spec. Minor updates:
- Ensure feature list matches exactly (already close)
- Already has comparison box

---

### 7. FAQ SECTION
**File:** `src/components/landing/FAQ.tsx`

**Update first question wording:**
- Current: "Can't I just use ChatGPT for this?"
- New: "How is this different from ChatGPT?"
- Answer: "ChatGPT gives general answers and sometimes makes things up. Our AI is built specifically on peptide research. It cites real studies, tracks FDA status, and tells you when evidence is weak instead of guessing."

---

### 8. FINAL CTA SECTION
**File:** `src/components/landing/FinalCTA.tsx`

**New title:** "You've Already Been Researching. Let This Do the Heavy Lifting."

**New subtext:** "Research-backed answers. Personalized protocols. One payment. Lifetime access."

---

### 9. SEO HEAD UPDATE
**File:** `src/pages/Index.tsx`

Update the SEOHead component props:
- **Title:** "The Peptide Playbook — AI-Powered Peptide Research Platform"
- **Description:** "Stop Googling peptides. Get research-backed answers, personalized protocols, and a 45+ peptide database. Powered by 500+ studies. $67 lifetime access."

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/components/landing/HeroSection.tsx` | New headline, subheadline, trust bar format |
| `src/components/landing/GuidedDemo.tsx` | Update CTA text after mock conversation |
| `src/components/landing/WhatsInsideSection.tsx` | New title, refined feature copy, add subtitle |
| `src/components/landing/WhoThisIsForNew.tsx` | New title, updated persona descriptions |
| `src/components/landing/HowItWorksSection.tsx` | New title, step 1 description |
| `src/components/landing/FAQ.tsx` | Update first question and answer |
| `src/components/landing/FinalCTA.tsx` | New title and subtext |
| `src/pages/Index.tsx` | Update SEOHead title and description |

---

## Technical Items (Already Complete)

The following are already configured and working:
- **robots.txt** - Exists at `/public/robots.txt` with sitemap reference
- **sitemap.xml** - Static file at `/public/sitemap.xml` + dynamic edge function
- **SEO Head component** - Proper meta tags, OG tags, canonical URLs
- **Route mapping** - All CTAs already point to correct routes

---

## Summary

This is primarily a **copy refinement pass**. The structure is already correct from the previous optimization. The changes focus on:

1. Making the hero headline more product-focused ("Your Personal Peptide Research Assistant")
2. Simplifying section titles to match the "one question per section" framework
3. Refining feature descriptions to be more benefit-driven
4. Updating the SEO title/description for the homepage

No structural changes, no new components, no route changes. Just copy updates across 8 files.

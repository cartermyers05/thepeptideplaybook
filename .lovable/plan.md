

# Homepage Complete Rewrite — PAS Framework Implementation

## Overview

Complete redesign of the landing page following the PAS (Problem-Agitate-Solution) framework for higher conversions. This involves replacing all existing landing page components with new, research-backed copy and design.

---

## Current vs. New Structure

| Current Order | New Order |
|---------------|-----------|
| 1. Hero (fake trust badge) | 1. Hero (clean, outcome-focused) |
| 2. ProblemSection | 2. Problem (deeper pain points) |
| 3. WhatsIncluded (features) | 3. Agitation (consequences) |
| 4. Testimonials (fake) | 4. Solution (transformation) |
| 5. PricingSection | 5. What's Inside (product preview) |
| 6. FAQ | 6. How It Works (3 steps) |
| 7. FinalCTA | 7. Who This Is For / Not For |
| — | 8. FAQ (objection handling) |
| — | 9. Pricing + Final CTA |
| Footer | Footer (simplified) |

---

## Files to Create/Modify

### New Components to Create
| File | Purpose |
|------|---------|
| `src/components/landing/HeroSection.tsx` | New hero with direct copy |
| `src/components/landing/AgitationSection.tsx` | Consequences of staying confused |
| `src/components/landing/SolutionSection.tsx` | Transformation intro |
| `src/components/landing/ProductPreview.tsx` | 6-item "What's Inside" grid |
| `src/components/landing/HowItWorks.tsx` | 3-step process |
| `src/components/landing/WhoThisIsFor.tsx` | For/Not For qualifying section |
| `src/components/landing/PricingCTA.tsx` | Final pricing + CTA |

### Files to Modify
| File | Changes |
|------|---------|
| `src/pages/Index.tsx` | New section order, remove Testimonials |
| `src/components/landing/ProblemSection.tsx` | Rewrite copy per research |
| `src/components/landing/FAQ.tsx` | New objection-focused questions |
| `src/components/landing/Navbar.tsx` | Simplify nav links, update CTA |
| `src/components/landing/Footer.tsx` | Simplify, add disclaimer |
| `src/components/landing/FloatingCTA.tsx` | Update CTA text to "$67" |

### Files to Remove
| File | Reason |
|------|--------|
| `src/components/landing/Hero.tsx` | Replaced by HeroSection |
| `src/components/landing/WhatsIncluded.tsx` | Replaced by ProductPreview |
| `src/components/landing/Testimonials.tsx` | Fake testimonials — removing |
| `src/components/landing/PricingSection.tsx` | Merged into PricingCTA |
| `src/components/landing/FinalCTA.tsx` | Merged into PricingCTA |

---

## Design System Updates

### Color Adjustments (in `src/index.css`)

The user requested a new palette. We'll add these as CSS custom properties:

```css
/* New editorial palette */
--navy: 217 33% 17%;        /* #1a2b4a - headlines */
--emerald: 160 84% 39%;     /* #059669 - CTA buttons */
--cream: 40 33% 98%;        /* #fafaf9 - backgrounds */
--slate-text: 215 25% 27%;  /* #334155 - body text */
```

For this implementation, I recommend:
- Keep existing violet primary for CTAs (already established brand color)
- Use warmer off-white backgrounds per user request
- Headlines stay dark slate for readability

---

## Section-by-Section Implementation

### 1. Navbar Updates

**File:** `src/components/landing/Navbar.tsx`

Changes:
- Update nav links: "What's Inside" (#product), "FAQ" (#faq), "Log In"
- CTA: "Get Access" → links to #pricing
- Keep existing scroll/mobile behavior

### 2. HeroSection (New)

**File:** `src/components/landing/HeroSection.tsx`

Key elements:
- Badge: "Updated January 2026" (real, not fake member count)
- Headline: "Everything You Need to Know About Peptides — Without the TikTok BS"
- Subheadline: 80-page guide, database, AI assistant description
- Primary CTA: "Get Full Access — $67" → #pricing
- Secondary CTA: "See What's Inside" → #product
- Trust row: 30-Day Guarantee, Instant Access, No Subscription
- Remove: Chat mockup, "4,200+ members" fake badge

### 3. ProblemSection (Rewrite)

**File:** `src/components/landing/ProblemSection.tsx`

New copy:
- Headline: "You're Not Confused Because You're Stupid. You're Confused Because the Information Is a Mess."
- Conversational paragraphs about TikTok experts, Reddit contradictions, FDA changes
- Closing: "You don't need another influencer's opinion. You need actual information you can trust."

### 4. AgitationSection (New)

**File:** `src/components/landing/AgitationSection.tsx`

Elements:
- Headline: "Here's What Happens When You Stay Confused"
- 5 bullet points with X icons (consequences)
- Closing paragraph: "The only question is: are you going to keep guessing, or are you going to actually learn this stuff?"

### 5. SolutionSection (New)

**File:** `src/components/landing/SolutionSection.tsx`

Elements:
- Headline: "What If You Actually Understood Peptides?"
- 3-4 "Imagine..." paragraphs (transformation)
- "That's what Peptide Playbook gives you."
- Disclaimer: "It's not medical advice. It's not telling you what to take."
- CTA: "Get Full Access — $67"

### 6. ProductPreview (New)

**File:** `src/components/landing/ProductPreview.tsx`

Replaces WhatsIncluded with more detail:
- Headline: "Here's Exactly What You Get"
- 6-card grid (2x3 on desktop):
  1. Complete Guide — 80+ pages, 8 chapters
  2. Peptide Database — 41 peptides, searchable
  3. AI Research Assistant — 24/7 answers
  4. Doctor Scripts — 5 templates
  5. Source Checklist — 5 red flags
  6. Monthly Digest — lifetime updates
- Each card: Icon, title, description, stats line

### 7. HowItWorks (New)

**File:** `src/components/landing/HowItWorks.tsx`

3-step horizontal/vertical layout:
1. Get Instant Access — 2 minutes
2. Start With the Guide — read relevant sections
3. Talk to Your Doctor — use scripts

### 8. WhoThisIsFor (Update Existing)

**File:** `src/components/landing/WhoThisIsFor.tsx`

Existing file exists — update copy to:
- Left column: "This Is For You If..." (5 items with check icons)
- Right column: "Not For You If..." (4 items with X icons)

### 9. FAQ (Rewrite)

**File:** `src/components/landing/FAQ.tsx`

New objection-focused questions:
1. Is this medical advice?
2. How is this different from free info online?
3. What if I'm not satisfied?
4. Is this a subscription?
5. Will this tell me what peptides to take?
6. I'm not interested in taking peptides. Is this still useful?

### 10. PricingCTA (New)

**File:** `src/components/landing/PricingCTA.tsx`

Combines pricing + final CTA:
- Headline: "Get Complete Access"
- Subheadline: "Everything you need — one price, lifetime access"
- Price card:
  - $67 one-time
  - 7 feature bullets with checkmarks
  - Primary CTA button: "Get Full Access"
  - Guarantee text below button
- Contact line at bottom

### 11. Footer (Simplify)

**File:** `src/components/landing/Footer.tsx`

Reduce to essentials:
- Brand name + tagline
- Legal links inline: Terms, Privacy, Disclaimer, Contact
- Strong disclaimer text
- Copyright

---

## Index.tsx Final Structure

```tsx
<>
  <SEOHead ... />
  <HomepageSchemas />
  <div className="min-h-screen bg-[#fafaf9]">
    <Navbar />
    <main>
      <HeroSection />
      <ProblemSection />
      <AgitationSection />
      <SolutionSection />
      <ProductPreview />
      <HowItWorks />
      <WhoThisIsFor />
      <FAQ />
      <PricingCTA />
    </main>
    <Footer />
    <FloatingChatButton />
    <FloatingCTA />
    <ExitIntentPopup />
  </div>
</>
```

**Removed:** Testimonials (fake), old PricingSection, old FinalCTA

---

## Copy Tone Guidelines (Implementation Notes)

- Direct, not salesy
- Conversational paragraphs, not bullet-point marketing
- Specific numbers ("41 peptides", "80+ pages", "5 templates")
- Honest limitations upfront ("Not medical advice")
- No fake social proof

---

## Technical Considerations

### Animations
- Keep framer-motion for scroll-reveal effects
- Simpler fade-up animations (no complex orb floats)
- Subtle on-hover card lifts

### Mobile
- Single-column layouts stack naturally
- FloatingCTA shows $67 CTA on mobile
- Touch-friendly accordion for FAQ

### Performance
- Remove chat mockup animation from hero (simpler = faster)
- Lazy load sections below fold
- No heavy decorative elements

---

## Files Summary

| Action | Files |
|--------|-------|
| **Create** | HeroSection.tsx, AgitationSection.tsx, SolutionSection.tsx, ProductPreview.tsx, HowItWorks.tsx, PricingCTA.tsx |
| **Modify** | Index.tsx, ProblemSection.tsx, WhoThisIsFor.tsx, FAQ.tsx, Navbar.tsx, Footer.tsx, FloatingCTA.tsx |
| **Delete** | Hero.tsx, WhatsIncluded.tsx, Testimonials.tsx, PricingSection.tsx, FinalCTA.tsx |

---

## Testing Checklist

After implementation:
- [ ] All sections render in correct order
- [ ] No console errors
- [ ] CTA buttons link to #pricing section
- [ ] FAQ accordion works
- [ ] Mobile layout stacks correctly
- [ ] FloatingCTA shows "$67" on mobile scroll
- [ ] No references to old tier names (starter/pro/insider)
- [ ] No fake testimonials or member counts visible
- [ ] Exit intent popup still works




# High-Converting Landing Page Overhaul - $47 Launch Edition

## Overview

This is a complete landing page redesign with a more aggressive, direct-response marketing approach. The core angle: TikTok peptide advice is dangerous, and this guide is the antidote.

---

## Major Structural Changes

| Current Section | New Section | Key Change |
|-----------------|-------------|------------|
| (none) | **Urgency Banner** | NEW - Sticky countdown timer at top |
| Hero | Hero | New aggressive headline, video placeholder, $47 price |
| ProblemSection | Problem Agitation | More specific pain points, TikTok-focused copy |
| SolutionSection | Solution Intro | "20-minute safety briefing" angle, 3-step framework |
| WhatsIncluded | What's Inside | 5 cards instead of 4, more specific deliverables |
| (none) | **Who This Is For** | NEW - For/Not For two-column layout |
| SocialProof | Social Proof | Add testimonial placeholders (clearly marked), research stats |
| (none) | **Why I Made This** | NEW - Creator story section |
| FAQ | FAQ | Updated questions matching new angle |
| FinalCTA | Final CTA | Price anchoring ($197 crossed out), countdown reminder |
| Footer | Footer | Same structure, ensure disclaimers |

---

## New Components to Create

### 1. UrgencyBanner Component (NEW)

**File:** `src/components/landing/UrgencyBanner.tsx`

Features:
- Sticky to top of viewport
- Purple gradient background
- Countdown timer (hours:minutes:seconds)
- "Launch Price: $47 -> Increases to $67 in [timer]"
- Uses localStorage to persist countdown end date

```text
+------------------------------------------------------------------+
| [rocket emoji] Launch Price: $47 -> $67 in 47:23:15 | X claimed  |
+------------------------------------------------------------------+
```

### 2. WhoThisIsFor Component (NEW)

**File:** `src/components/landing/WhoThisIsFor.tsx`

Features:
- Two-column layout
- Left: "Perfect for you if..." (green checkmarks)
- Right: "Not for you if..." (red X marks)
- Glass card styling

```text
+---------------------------+---------------------------+
|  Perfect for you if...    |    Not for you if...      |
|  [check] Item 1           |    [x] Item 1             |
|  [check] Item 2           |    [x] Item 2             |
+---------------------------+---------------------------+
```

### 3. WhyIMadeThis Component (NEW)

**File:** `src/components/landing/WhyIMadeThis.tsx`

Features:
- Personal story section
- Photo placeholder (circular)
- Credibility line: "200+ hours of research"
- Placeholder text for creator to customize

---

## File-by-File Changes

### 1. UrgencyBanner.tsx (CREATE)

```tsx
// Sticky banner with countdown timer
// - Uses useState + useEffect for countdown
// - Stores end date in localStorage for persistence
// - Purple gradient background
// - Shows "X spots claimed" (can be static or dynamic later)
```

### 2. src/pages/Index.tsx (UPDATE)

```tsx
// Add new imports
import { UrgencyBanner } from "@/components/landing/UrgencyBanner";
import { WhoThisIsFor } from "@/components/landing/WhoThisIsFor";
import { WhyIMadeThis } from "@/components/landing/WhyIMadeThis";

// Remove Navbar (no navbar as per spec)
// Add UrgencyBanner at very top
// Reorder: UrgencyBanner -> Hero -> Problem -> Solution -> WhatsIncluded 
//          -> WhoThisIsFor -> SocialProof -> WhyIMadeThis -> FAQ -> FinalCTA -> Footer
```

### 3. Hero.tsx (MAJOR UPDATE)

Changes:
- Headline: "Stop Taking Peptide Advice From 19-Year-Olds on TikTok"
- Subheadline: "The 20-minute safety guide that replaces 40 hours of confusing research..."
- Specificity badge: "Covers the 15 most popular peptides"
- CTA: "Get Protected for $47" (purple glow)
- Below CTA: "30-day money-back guarantee - Instant access"
- Video placeholder with play button
- Social proof: "Join 500+ people who stopped guessing"

### 4. ProblemSection.tsx (MAJOR UPDATE)

Changes:
- Headline: "TikTok Peptide Advice is a Disaster Waiting to Happen"
- Lead-in paragraph about random creators
- 4 glass cards with specific pain points:
  - AlertTriangle: "Dosing advice from people who've been using peptides for 3 weeks"
  - Skull: "Zero mention of what's FDA-approved vs legal trouble"
  - DollarSign: "Wasted hundreds on 'research chemicals'"
  - Hospital: "No idea what to tell your doctor"
- Closing punch: "One wrong decision could cost you your health..."
- Transition: "There's a smarter way to navigate this."

### 5. SolutionSection.tsx (UPDATE)

Changes:
- Headline: "Peptide Playbook: Your 20-Minute Safety Briefing"
- Subheadline about avoiding guesswork and rabbit holes
- Glass card 1: "Not a course. Not a community. Just clarity."
- Glass card 2: "The 3-Step Framework" with numbered steps
- CTA: "Get the Safety Guide - $47"

### 6. WhatsIncluded.tsx (UPDATE)

Changes:
- Headline: "Here's Exactly What You Get"
- 5 cards instead of 4:
  1. The Complete Peptide Breakdown (15 peptides)
  2. The Legal Reality Check
  3. The Doctor Conversation Script
  4. The Red Flag Checklist (NEW)
  5. AI Assistant Access (Bonus)
- Value stack text: "Total value: $197 -> Yours today for $47"

### 7. WhoThisIsFor.tsx (CREATE)

Two-column layout:
- Left column (green checks):
  - "You've seen peptides on TikTok and want the real story"
  - "You're considering peptides but don't know where to start safely"
  - "You've already started but feel like you're guessing"
  - "You want to have an informed conversation with your doctor"
  - "You're tired of conflicting advice from random internet strangers"
- Right column (red X):
  - "You're looking for someone to tell you exactly what to inject"
  - "You want medical advice (this is educational, not prescriptive)"
  - "You're already working with a knowledgeable physician"
  - "You think the TikTok bros have it all figured out"

### 8. SocialProof.tsx (UPDATE)

Changes:
- Keep research stats
- Add 3 testimonial placeholders (glass cards)
- Each testimonial: photo placeholder, name, quote
- Quotes focus on "confused -> confident" transformation
- Clear note: these are placeholder testimonials to be replaced with real ones
- Trust element: "Based on 200+ hours of research..."

### 9. WhyIMadeThis.tsx (CREATE)

- Headline: "Why I Created This Guide"
- Personal story placeholder (3 paragraphs)
- Circular photo placeholder
- Credibility line with stats

### 10. FAQ.tsx (UPDATE)

Update questions to match new angle:
1. "Is this medical advice?" - No disclaimer
2. "I'm completely new to peptides. Is this for me?" - Yes, designed for beginners
3. "What if I've already started using peptides?" - Even better, catch red flags
4. "How is this different from free info on Reddit/TikTok?" - Organized, researched, 200+ hours
5. "Do I get lifetime access?" - Yes, one-time purchase
6. "What's the refund policy?" - 30-day money-back
7. "What about the AI assistant?" - Educational chatbot, not medical advice

### 11. FinalCTA.tsx (UPDATE)

Changes:
- Urgency reminder: "Launch price ends soon"
- Headline: "Get Peptide Clarity in 20 Minutes"
- Price display: ~~$197~~ crossed out, $47 large
- "One-time payment - Instant access - Lifetime updates"
- Bullet recap of all inclusions
- CTA: "Get Protected for $47"
- Guarantee badge with shield icon
- Micro-text disclaimer

### 12. Navbar.tsx (UPDATE)

- Update mobile CTA to $47
- Keep nav links functional
- Will be removed from Index.tsx per spec (no navbar on landing)

### 13. src/index.css (UPDATE)

Add new CSS classes:
- `.urgency-banner` - sticky purple gradient
- `.countdown-timer` - bold timer styling
- `.crossed-out` - strikethrough for price anchoring

---

## Technical Implementation Details

### Countdown Timer Logic

```typescript
// UrgencyBanner.tsx
const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

useEffect(() => {
  // Get or set end date in localStorage
  let endDate = localStorage.getItem('pp-launch-end');
  if (!endDate) {
    // Set to 48 hours from now
    endDate = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString();
    localStorage.setItem('pp-launch-end', endDate);
  }
  
  const timer = setInterval(() => {
    const diff = new Date(endDate).getTime() - Date.now();
    if (diff <= 0) {
      // Timer expired - could reset or show "Expired"
      return;
    }
    setTimeLeft({
      hours: Math.floor(diff / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
    });
  }, 1000);
  
  return () => clearInterval(timer);
}, []);
```

### Price Anchoring Display

```tsx
// FinalCTA price section
<div className="mb-6">
  <span className="text-2xl text-muted-foreground line-through mr-3">$197</span>
  <span className="text-5xl md:text-6xl font-bold">$47</span>
</div>
```

---

## Mobile Responsiveness

All new components will follow existing responsive patterns:
- 375px: Single column, full-width buttons
- 768px: Two-column grids where applicable
- 1024px+: Full desktop layouts

The UrgencyBanner will:
- Stack text on mobile if needed
- Reduce padding on smaller screens
- Keep countdown visible at all times

---

## Files Summary

| File | Action |
|------|--------|
| `src/components/landing/UrgencyBanner.tsx` | **CREATE** |
| `src/components/landing/WhoThisIsFor.tsx` | **CREATE** |
| `src/components/landing/WhyIMadeThis.tsx` | **CREATE** |
| `src/pages/Index.tsx` | UPDATE - new structure, remove navbar |
| `src/components/landing/Hero.tsx` | UPDATE - new copy, video placeholder |
| `src/components/landing/ProblemSection.tsx` | UPDATE - TikTok angle, new pain points |
| `src/components/landing/SolutionSection.tsx` | UPDATE - 20-minute angle, framework |
| `src/components/landing/WhatsIncluded.tsx` | UPDATE - 5 cards, value stack |
| `src/components/landing/SocialProof.tsx` | UPDATE - testimonial placeholders |
| `src/components/landing/FAQ.tsx` | UPDATE - new questions |
| `src/components/landing/FinalCTA.tsx` | UPDATE - price anchoring, urgency |
| `src/index.css` | UPDATE - urgency banner styles |
| `src/components/landing/Navbar.tsx` | UPDATE - $47 price |

---

## Compliance Notes

- All testimonials will be clearly marked as placeholders for real testimonials
- Medical disclaimer maintained throughout
- "Educational only" messaging preserved
- No promises of medical outcomes
- Clear "not medical advice" statements

---

## Expected Outcome

After implementation:
- Aggressive, direct-response landing page
- Clear villain (TikTok bros) and hero (the guide)
- Urgency via countdown timer and price anchoring
- Specific deliverables (15 peptides, 20 minutes, etc.)
- Professional health-tech aesthetic maintained
- Mobile-optimized with all interactive elements working


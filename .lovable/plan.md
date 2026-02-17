

# Landing Page Copy Rewrite

Text-only changes across 9 existing component files. No design, layout, animation, or structural changes. Every section keeps its current component architecture, styling, and behavior.

---

## Files to Modify

### 1. `src/components/landing/Navbar.tsx`
- Change "Our Studies" link text to "Research" (lines 71, 131)
- Change "Sign Up" button to "Take the Free Quiz" with teal/green styling and link to `/quiz` instead of `/signup` (line 60-63)
- Keep "Sign In" link as-is

### 2. `src/components/landing/HeroSection.tsx`
- Change `headlineWords` from `["Your", "Personal", "Peptide", "Research", "Assistant"]` to `["Your", "Exact", "Peptide", "Protocol", "in", "60", "Seconds"]`
- Change subheadline text to the new copy about quiz + AI + 500+ studies
- Change primary CTA from "Get Started -- $67" linking to `/signup` to "Take the Free Quiz" linking to `/quiz`
- Change secondary CTA from "Try the AI Free" to keep as-is (scrolls to demo, still useful)
- Change `trustItems` to `["500+ Studies Analyzed", "45+ Peptides Covered", "Updated February 2026"]` (remove "30-Day Money Back" -- moved to pricing)
- Add small text "Free. Takes 60 seconds. No account needed." below the CTA buttons

### 3. `src/components/landing/HowItWorksSection.tsx`
- Change section headline from "3 Steps. That's It." to "How It Works"
- Step 1: Title "Take the 60-Second Quiz", description updated
- Step 2: Title "Get Your Personalized Protocol", description updated
- Step 3: Title "Follow Your Blueprint", description updated

### 4. `src/components/landing/WhatsInsideSection.tsx`
- Change section headline from "Everything Inside The Peptide Playbook" to "Everything You Need. Nothing You Don't."
- Change subtitle to remove it or keep minimal
- Update all 6 feature card titles and descriptions to match the new copy:
  1. "Your Personalized Protocol" (was "AI Research Coach")
  2. "AI Coach -- 24/7" (was "45+ Peptide Database")
  3. "Daily Compound Tracker" (was "Custom Protocols")
  4. "Diet and Training Optimization" (was "Daily Plan and Tracking")
  5. "Week-by-Week Timeline" (was "Doctor Scripts")
  6. "FDA Regulatory Tracker" (was "30+ Research Guides")
- Change bottom CTA from "Get Your Full Blueprint -- $67" linking to `/signup` to "Build My Protocol -- Free Quiz" linking to `/quiz`

### 5. `src/components/landing/GuidedDemo.tsx`
- Change section headline from "Try It Yourself" to "See It In Action"
- Change subtitle to "Pick a question. Watch the AI answer it in real time."
- Update the 6 demo question texts to match the new copy
- Change post-answer CTA text from "This is real. Try it yourself." to "This is 1 of 10,000+ questions Peptide Playbook can answer."
- Change CTA button from "Get Your Full Blueprint -- $67" linking to `/signup` to "Take the Free Quiz" linking to `/quiz`

### 6. `src/components/landing/PricingCTA.tsx`
- Keep headline "One Payment. Lifetime Access. No Subscriptions." as-is (already matches)
- Update comparison items to new copy (clinic consultations $300-500, trial and error $200-400, Reddit rabbit holes)
- Update feature list to new copy (7 items matching the spec)
- Change CTA from "Get Your Full Blueprint -- $67" to "Take the Free Quiz -- It's Free" linking to `/quiz`
- Update trust badge text to match spec
- Keep price display ($99 strikethrough, $67 animated) as-is

### 7. `src/components/landing/WhoThisIsForNew.tsx`
- Keep section structure (4 persona cards)
- Update headline, titles, and descriptions to match new target audience copy (if the provided copy maps; otherwise keep existing since it already targets the right audience -- the existing copy is already well-targeted, but I'll refine card descriptions to be more specific to 20-35 male aesthetics audience)

### 8. `src/components/landing/FAQ.tsx`
- Replace all 6 FAQ items with the 8 new FAQ items from the spec

### 9. `src/components/landing/FinalCTA.tsx`
- Change headline from "You've Already Been Researching..." to "Stop Guessing. Start Knowing."
- Change subheadline to "Your personalized peptide protocol is 60 seconds away."
- Change CTA from "Get Your Full Blueprint -- $67" to "Take the Free Quiz"
- Change bottom text to "For educational purposes only. Not medical advice. Always consult a healthcare provider."

### 10. `src/components/landing/FloatingCTA.tsx`
- Change button text from "Get Your Blueprint" to "Take the Free Quiz"
- Change link from `/signup` to `/quiz`

### 11. `src/components/landing/HeroProductCards.tsx`
- No text changes needed (the preview cards show product UI mockups, not marketing copy)

### 12. `src/pages/Index.tsx`
- Update SEO title and description to match new headline focus
- No structural changes

---

## Technical Notes

- All changes are string/text replacements within existing data arrays, JSX text nodes, and component props
- No new components, no removed components, no layout changes
- Primary CTA destination changes from `/signup` to `/quiz` across Hero, WhatsInside, GuidedDemo, PricingCTA, FinalCTA, FloatingCTA, and Navbar
- The "Research" nav link keeps its existing `/guides` destination
- Footer copy stays as-is (already correct and contains required legal disclaimer)
- No changes to any dashboard, quiz, protocol, or other pages


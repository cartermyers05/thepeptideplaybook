

# Homepage Rewrite -- Full Implementation Plan

This is a complete rebuild of the homepage content. The Navbar and Footer remain unchanged. All existing homepage section components (HeroSection, HowItWorksSection, WhatsInsideSection, GuidedDemo, PricingCTA, WhoThisIsForNew, FAQ, FinalCTA) are removed from the homepage and replaced with new content.

## Important: Dark Theme on Homepage

The prompts specify dark backgrounds (#0a0a0f, #111827) throughout. The current site uses a light theme. To avoid breaking other pages, the homepage will wrap all content in a container with explicit dark background classes and inverted text colors using inline styles and Tailwind utilities -- not by changing the global theme.

---

## Files to Create

### `src/components/landing/HomepageHero.tsx`
New hero section with:
- Centered layout (no 2-column grid, no product preview cards)
- Headline: "What 500+ Studies Actually Say About Peptides -- Matched to Your Goal"
- Subheadline about the rabbit hole problem
- CTA button "Get Your Protocol -- $67" linking to /checkout
- Sub-button reassurance text
- Dark background (#0a0a0f), all text in explicit light colors

### `src/components/landing/ProblemAgitation.tsx`
6 paragraphs of agitation copy with paragraph 5 styled differently (bold, larger, light color). Dark background, muted text colors throughout.

### `src/components/landing/HomepageFeatures.tsx`
9 feature blocks in a single-column list (max-width 680px, centered). No card borders -- clean text blocks with emoji titles. Includes the "Here's what's inside" header.

### `src/components/landing/MidPageCTA.tsx`
Dark card-style CTA section with "Ready to stop guessing?" headline and the standard $67 button linking to /checkout.

### `src/components/landing/TrustBar.tsx`
5 trust items in a horizontal row (desktop) / 2-column grid (mobile). JetBrains Mono font, with emoji prefixes. Bordered top and bottom.

### `src/components/landing/ComparisonSection.tsx` (rewrite existing)
Card-based comparison (Reddit, TikTok, Clinics, Books, Peptide Playbook). Peptide Playbook row highlighted with teal border. Styled as stacked cards, not an HTML table. Italic closing line below.

### `src/components/landing/HomepageFAQ.tsx`
New FAQ with 6 questions (different from the current 8). Uses shadcn Accordion or the existing custom accordion pattern. Dark-themed.

### `src/components/landing/HomepageFinalCTA.tsx`
"Here's what happens next:" copy block with 3 lines + CTA button + guarantee text. Dark card background (#111827).

---

## Files to Modify

### `src/pages/Index.tsx`
- Remove imports for: HeroSection, HowItWorksSection, WhatsInsideSection, GuidedDemo, PricingCTA, WhoThisIsForNew, FAQ, FinalCTA
- Add imports for all new components listed above
- Wrap main content in a dark-themed container (`bg-[#0a0a0f]`) so all sections inherit the dark look
- Add `pb-20 md:pb-0` for mobile sticky bar padding
- Keep: Navbar, Footer, MobileStickyBar, SEOHead, HomepageSchemas, scroll progress bar

### `src/components/MobileStickyBar.tsx`
- Change left text to "Stop guessing. Get your protocol."
- Change button text to "$67"
- Change link from /sales to /checkout
- Add scroll-based visibility using Intersection Observer or scroll position (appears after scrolling past hero, ~600px)
- Add framer-motion slide-up animation on first appearance

---

## Files NOT Modified
- Navbar (kept exactly as-is)
- Footer (kept exactly as-is)
- All guide pages, /sales, /checkout, /dashboard pages
- No existing components are deleted (they just won't be imported on the homepage anymore, but remain available if used elsewhere)

## Technical Notes
- Dark backgrounds are applied via explicit Tailwind classes (`bg-[#0a0a0f]`, `bg-[#111827]`) and text colors (`text-[#F1F5F9]`, `text-[#94A3B8]`, `text-[#64748B]`), scoped to the homepage only
- All CTA buttons link to /checkout in same tab
- No images, no fake testimonials, no social proof numbers
- Font usage: DM Sans for body, JetBrains Mono for trust bar items
- The existing FAQ component (used on other pages or exported) is not modified -- a new HomepageFAQ is created specifically for the homepage


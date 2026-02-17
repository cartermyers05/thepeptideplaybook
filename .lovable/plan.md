

# Remove Quiz References from Landing Page

Replace every "Take the Free Quiz" CTA and `/quiz` link on the landing page with a direct `/signup` link. Text-only changes across the same landing page components. No design or layout changes.

---

## Changes

### 1. Navbar (`src/components/landing/Navbar.tsx`)
- Button text: "Take the Free Quiz" → "Get Started"
- Link: `/quiz` → `/signup` (2 places: desktop + mobile menu)

### 2. HeroSection (`src/components/landing/HeroSection.tsx`)
- Primary CTA: "Take the Free Quiz" → "Get Started"
- Link: `/quiz` → `/signup`
- Remove small text "Free. Takes 60 seconds. No account needed."

### 3. HowItWorksSection (`src/components/landing/HowItWorksSection.tsx`)
- Bottom CTA: "Take the Free Quiz" → "Get Started"
- Link: `/quiz` → `/signup`
- Step 1 title: "Take the 60-Second Quiz" → "Create Your Free Account"
- Step 1 description: updated to match (no quiz mention)

### 4. WhatsInsideSection (`src/components/landing/WhatsInsideSection.tsx`)
- Bottom CTA: "Build My Protocol — Free Quiz" → "Get Your Full Blueprint"
- Link: `/quiz` → `/signup`

### 5. GuidedDemo (`src/components/landing/GuidedDemo.tsx`)
- CTA button: "Take the Free Quiz" → "Get Started"
- Link: `/quiz` → `/signup`

### 6. PricingCTA (`src/components/landing/PricingCTA.tsx`)
- CTA: "Take the Free Quiz — It's Free" → "Get Your Full Blueprint — $67"
- Link: `/quiz` → `/signup`

### 7. FinalCTA (`src/components/landing/FinalCTA.tsx`)
- CTA: "Take the Free Quiz" → "Get Started"
- Link: `/quiz` → `/signup`

### 8. FloatingCTA (`src/components/landing/FloatingCTA.tsx`)
- Button: "Take the Free Quiz" → "Get Started"
- Link: `/quiz` → `/signup`

### 9. HeroSection headline update
- "Your Exact Peptide Protocol in 60 Seconds" → "Your Personalized Peptide Protocol" (remove "60 Seconds" quiz reference)
- Subheadline: remove quiz-specific language, keep the AI + 500 studies angle

---

## What stays untouched
- The `/quiz` and `/quiz/results` routes remain in `App.tsx` (they still work if someone has the link)
- Quiz components themselves are not deleted
- All design, layout, animations unchanged
- Dashboard, protocol, coach, chat pages unchanged


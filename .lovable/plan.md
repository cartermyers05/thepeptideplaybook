

# Peptide Playbook Landing Page Redesign

## Overview

This plan transforms the current "PeptideGPT" landing page into the "Peptide Playbook" branding with enhanced design elements matching the specification for a $67 one-time educational guide product.

---

## Current State vs. Required State

| Element | Current | Required (Peptide Playbook) |
|---------|---------|----------------------------|
| **Product Name** | PeptideGPT | Peptide Playbook |
| **Product Type** | $20/mo subscription with $1 trial | $67 one-time purchase guide |
| **Hero Headline** | "Get Instant, Expert-Level Peptide Answers" | "Finally Understand Peptides - Without the TikTok Confusion" |
| **Primary Color** | Violet (250 85% 60% - similar to #6366F1) | Violet (#8B5CF6 - need adjustment) |
| **Glass Effects** | Minimal glass-panel class exists | Full glassmorphism with backdrop blur |
| **Button Glow** | No glow effects | Subtle purple glow on hover |
| **Background** | Dot grid (exists) | Dot grid + abstract blob shapes |
| **Typography** | Inter (exists) | Inter or Space Grotesk |
| **Problem Section** | Generic "broken research" | TikTok-specific confusion messaging |
| **Solution Content** | AI chat assistant focus | Educational guide with sections |

---

## Branding Changes

### Logo & Product Name
- Change "PeptideGPT" to "Peptide Playbook" across:
  - Navbar component
  - Footer component
  - Hero section
  - All CTAs
  - Tab titles

### Color Adjustment
Update primary color to exact #8B5CF6 (263 89% 62%):
```css
--primary: 263 89% 62%; /* #8B5CF6 */
```

---

## Section-by-Section Changes

### 1. Hero Section

**Current:**
```
"Get Instant, Expert-Level Peptide Answers"
"Stop wasting hours searching forums..."
CTA: "Start 7-Day Trial for $1"
```

**New:**
```
"Finally Understand Peptides - Without the TikTok Confusion"
"The complete guide to peptides: what they are, how they work, 
what the research actually says, and how to have informed 
conversations with your doctor."
CTA: "Get the Playbook - $67" (with purple glow effect)
```

**Design Enhancements:**
- Add abstract futuristic graphic or 3D book mockup placeholder
- Add subtle floating blob shapes in background
- Button with glow effect on hover

### 2. Problem Section

**Current Pain Points:**
- Hours Wasted
- Conflicting Info
- No Citations
- Outdated Sources

**New Pain Points (aligned with prompt):**
- "Conflicting dosing advice everywhere"
- "Sketchy sources you can't trust"
- "No idea what's legal vs not"
- "Don't know what to ask your doctor"

**Lead-in Copy:**
"You've seen peptides everywhere on TikTok. But the information is confusing, contradictory, and sometimes dangerous."

### 3. Solution Section

**Current:** Focuses on AI chat assistant demo

**New:** Focus on the guide contents:

"Peptide Playbook gives you clarity."

What's Included:
- Complete peptide breakdown (what each one does, research status, legal status)
- FDA vs research peptide guide
- Questions to ask your doctor
- Red flags to avoid
- AI assistant for quick answers (with educational disclaimer)

**Design:** Remove chat demo, add feature cards with icons in glass-effect style

### 4. Social Proof Section

**Keep:** Stats section (can update numbers if needed)

**Modify Testimonials:**
- Update to reflect educational guide product
- Add placeholder text: "Based on 100+ research papers reviewed"

### 5. Pricing Section

**Current:**
- $20/month subscription
- $1 trial for 7 days
- Subscription feature list

**New:**
- Single glass-effect card
- "$67 one-time purchase"
- What's included bullet points
- CTA: "Get the Playbook - $67"
- Note: "Instant access. No subscription."

### 6. FAQ Section

**Update Questions:**
- Keep accordion style with smooth animations
- Update content for educational guide product (not subscription)
- Add questions about what's in the guide, legal disclaimers, etc.

### 7. Footer

**Updates:**
- Change branding to "Peptide Playbook"
- Ensure links: Terms, Privacy, Medical Disclaimer
- Add prominent disclaimer: "This product provides educational information only. Not medical advice."

---

## Design System Updates

### New CSS Classes

```css
/* Enhanced Glassmorphism */
.glass-card {
  background: hsl(var(--background) / 0.7);
  backdrop-filter: blur(20px);
  border: 1px solid hsl(var(--primary) / 0.2);
  border-radius: 16px;
}

/* Button Glow Effect */
.glow-primary {
  box-shadow: 0 0 20px -5px hsl(var(--primary) / 0.5);
  transition: box-shadow 0.3s ease;
}

.glow-primary:hover {
  box-shadow: 0 0 30px -5px hsl(var(--primary) / 0.7);
}

/* Abstract Blob Background */
.blob-bg {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.15;
  background: linear-gradient(135deg, hsl(var(--primary)), hsl(250 100% 75%));
}
```

### Color Variable Update

```css
:root {
  --primary: 263 89% 62%; /* #8B5CF6 */
}

.dark {
  --primary: 263 94% 67%; /* Slightly brighter for dark mode */
}
```

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/index.css` | Add glow effects, enhanced glass styles, blob backgrounds, update primary color |
| `src/components/landing/Navbar.tsx` | Change "PeptideGPT" to "Peptide Playbook" |
| `src/components/landing/Hero.tsx` | New headline, subheadline, CTA ($67), add abstract graphic |
| `src/components/landing/ProblemSection.tsx` | TikTok confusion messaging, new pain points |
| `src/components/landing/SolutionSection.tsx` | Guide contents instead of chat demo, glass cards |
| `src/components/landing/SocialProof.tsx` | Update messaging, add "100+ papers" stat |
| `src/components/landing/Pricing.tsx` | $67 one-time, glass card, remove subscription language |
| `src/components/landing/FAQ.tsx` | Update questions for guide product |
| `src/components/landing/FinalCTA.tsx` | $67 CTA, Peptide Playbook branding |
| `src/components/landing/Footer.tsx` | Rebrand, update disclaimer |
| `index.html` | Update title meta tags for "Peptide Playbook" |

---

## New Visual Elements

### Hero Background Enhancement
Add subtle floating abstract shapes:
```tsx
{/* Abstract blobs */}
<div className="absolute top-20 left-10 w-72 h-72 blob-bg animate-orb-float" />
<div className="absolute bottom-20 right-10 w-96 h-96 blob-bg animate-orb-float" 
     style={{ animationDelay: '-4s' }} />
```

### Glass Card Components
Update all cards to use enhanced glass effect with thin purple borders

### CTA Button with Glow
```tsx
<Button className="glow-primary h-14 px-10 text-lg">
  Get the Playbook - $67
  <ArrowRight className="ml-2" />
</Button>
```

---

## Content Updates Summary

### Headlines
- Hero: "Finally Understand Peptides - Without the TikTok Confusion"
- Problem: "You've Seen Peptides on TikTok. But..."
- Solution: "Peptide Playbook Gives You Clarity"
- Pricing: "Get Instant Access Today"
- CTA: "Ready to Finally Understand Peptides?"

### Key Messaging Shifts
- From: Subscription AI tool
- To: One-time educational guide with AI bonus

### What's Included (for Pricing Card)
- Complete peptide breakdown
- Research status for each peptide
- FDA classification guide
- Questions to ask your doctor
- Red flags to avoid
- Bonus: AI research assistant access

---

## Technical Implementation Order

### Phase 1: Design System
1. Update primary color to #8B5CF6
2. Add glass card styles
3. Add glow effects
4. Add blob background styles

### Phase 2: Branding
1. Update Navbar - "Peptide Playbook"
2. Update Footer - branding + disclaimer
3. Update index.html meta tags

### Phase 3: Hero Section
1. New headline and subheadline
2. $67 CTA with glow
3. Add abstract background elements

### Phase 4: Content Sections
1. Problem section - TikTok messaging
2. Solution section - guide contents
3. Pricing section - $67 one-time
4. FAQ section - guide-specific questions

### Phase 5: Polish
1. Social proof updates
2. FinalCTA updates
3. Mobile responsiveness check
4. Animation refinements

---

## Mobile Considerations

- All glass effects work on mobile
- Blob backgrounds reduced opacity on mobile
- Glow effects subtle on touch devices
- Responsive typography maintained
- CTA buttons full-width on mobile

---

## Expected Outcome

After implementation:
- Premium, futuristic aesthetic matching Linear/Vercel
- Clear $67 one-time purchase positioning
- TikTok-specific pain point messaging
- Enhanced glassmorphism throughout
- Purple glow effects on interactive elements
- Subtle animated blob backgrounds
- Trust-building educational product positioning
- Strong compliance disclaimers maintained


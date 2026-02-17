

# Homepage Redesign: Reorder Sections + Animation Upgrade

## Section Reorder

Current order vs. proposed new order:

| Current Position | Section | New Position | Rationale |
|---|---|---|---|
| 1 | Hero | 1 | Stays -- it's the entry point |
| 2 | GuidedDemo ("Try It Yourself") | 4 | Move down -- let users understand the product before trying it |
| 3 | WhatsInside (6 feature cards) | 3 | Move up one slot -- show what they get right after social proof |
| 4 | WhoThisIsFor (4 persona cards) | 6 | Move down -- less urgent than pricing |
| 5 | HowItWorks (3 steps) | 2 | Move UP -- immediately show how simple it is after the hero |
| 6 | PricingCTA | 5 | Move up -- price anchoring earlier increases conversions |
| 7 | FAQ | 7 | Stays |
| 8 | FinalCTA | 8 | Stays |

**New flow:** Hero --> How It Works --> What's Inside --> Try It Yourself --> Pricing --> Who This Is For --> FAQ --> Final CTA

This puts the "3 easy steps" right after the hook, then features, then the interactive demo as proof, then the price before objections/FAQ.

## Animation Upgrades

### 1. Hero Section -- Staggered Text Reveal + Floating Cards

- Each word in the headline animates in individually with a slight Y offset and blur, creating a "typewriter meets fade" effect
- The product preview cards on the right get a subtle continuous float animation (gentle Y oscillation, 3-4px, 6s loop)
- Trust bar items slide in from the left one by one with spring physics
- Add a subtle gradient orb behind the hero text that slowly drifts

### 2. HowItWorks -- Connected Timeline Animation

- The 3 steps animate in sequence with a visible "connecting line" that draws itself between them (SVG path animation)
- Each step number badge scales up with a spring bounce when it enters the viewport
- The icons inside each step do a subtle rotate-in (15 degrees to 0)
- Add a pulsing glow on each step badge that fades once the next step appears

### 3. WhatsInside -- Card Cascade with Hover Tilt

- Cards stagger in with a 3D perspective tilt (start rotated 5 degrees on Y axis, animate to 0)
- On hover, cards tilt slightly toward the mouse direction (CSS perspective transform)
- The gradient top bar on each card does a shimmer sweep animation on first appearance
- The icon in each card does a gentle bounce animation

### 4. GuidedDemo -- Attention-Grabbing Entrance

- The question cards fan out from the center like a card deck spread
- When an answer is showing, the chat bubbles slide in with elastic easing
- Add a subtle "typing indicator" animation before the AI answer appears (3 bouncing dots)

### 5. PricingCTA -- Dramatic Reveal

- The price number ($67) counts up from $0 with an animated counter
- Feature checkmarks cascade in one by one with a satisfying "pop" scale animation
- The comparison table rows slide in from the left with staggered delays
- The glow pulse behind the pricing card becomes more pronounced

### 6. WhoThisIsFor -- Slide-In Cards

- Cards alternate sliding in from left and right instead of all fading up together
- Icons do a gentle spin-in animation (180 degrees to 0) when entering viewport

### 7. FAQ -- Smooth Accordion Upgrade

- Questions slide in from the right with staggered timing
- The heading on the left gets a text gradient animation that slowly shifts colors
- Plus/minus icons rotate smoothly instead of swapping

### 8. Global -- Scroll Progress + Parallax

- Add a thin gradient progress bar at the very top of the page (below navbar) showing scroll progress
- Section backgrounds get subtle parallax movement (background moves at 0.3x scroll speed)
- Add smooth scroll-snap behavior between major sections on desktop

## Technical Details

### Files Modified

| File | Changes |
|---|---|
| `src/pages/Index.tsx` | Reorder section components, add scroll progress bar, wrap sections with parallax |
| `src/components/landing/HeroSection.tsx` | Word-by-word headline animation, floating card oscillation, gradient orb background |
| `src/components/landing/HowItWorksSection.tsx` | SVG connecting line draw animation, spring bounce on step badges, icon rotate-in |
| `src/components/landing/WhatsInsideSection.tsx` | 3D perspective card entrance, shimmer on gradient bars, icon bounce |
| `src/components/landing/GuidedDemo.tsx` | Card fan-out animation, elastic chat bubble entrance |
| `src/components/landing/PricingCTA.tsx` | Animated price counter, cascading checkmarks, comparison row slide-in |
| `src/components/landing/WhoThisIsForNew.tsx` | Alternating left/right slide-in, icon spin animation |
| `src/components/landing/FAQ.tsx` | Staggered question slide-in, smooth icon rotation, heading gradient |
| `src/components/landing/FinalCTA.tsx` | Scale-up entrance with glow pulse |

### No New Dependencies

All animations use existing `framer-motion` and CSS transforms/transitions.

### Performance Considerations

- All `whileInView` animations use `viewport: { once: true }` so they only play once
- Continuous animations (floating cards, gradient shifts) use CSS animations instead of JS-driven framer-motion to reduce repaints
- Parallax uses `transform: translateY()` for GPU acceleration
- Scroll progress bar uses a passive scroll listener with `requestAnimationFrame`

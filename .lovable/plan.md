

# Add Floating Orbs & Background Animation to Hero

## Overview

Add subtle, animated floating orbs behind the hero section to create depth and visual interest. The orbs will use the existing `animate-orb-float` animation from tailwind config and the primary color palette for consistency.

---

## Visual Design

```text
        ○ (orb 1 - top left, large, very subtle)
                    
  ┌─────────────────────────────────────────────────┐
  │  Stop Taking Peptide         ┌────────────────┐ │
  │  Advice From...              │  Chat Preview  │ │
  │                              │    Mockup      │ │
  │  Stay current on...          │                │ │
  │                              └────────────────┘ │
  │  [Start Learning — $67]                         │
  └─────────────────────────────────────────────────┘

             ○ (orb 2 - bottom right, medium)
                              ○ (orb 3 - mid right, small)
```

---

## Orb Specifications

| Orb | Size | Position | Opacity | Animation Delay | Color |
|-----|------|----------|---------|-----------------|-------|
| 1 | 400-500px | Top-left | 10-15% | 0s | Primary (violet) |
| 2 | 300-350px | Bottom-right | 12-18% | -4s | Primary (violet) |
| 3 | 200-250px | Mid-right | 8-12% | -8s | Primary/accent blend |

---

## Technical Implementation

### File: `src/components/landing/Hero.tsx`

**Add before the container div (inside section):**

1. A `div` with `absolute inset-0 overflow-hidden pointer-events-none` to contain the orbs
2. Three orb divs with:
   - `absolute` positioning
   - `rounded-full` shape
   - `bg-primary/10` or similar subtle opacity
   - `blur-3xl` for soft glow effect
   - `animate-orb-float` animation (already in tailwind)
   - Different `animation-delay` values for offset movement

**Key Styling:**
- Use `pointer-events-none` so orbs don't interfere with clicks
- Use `overflow-hidden` on container to prevent orbs from causing horizontal scroll
- Use very low opacity (10-20%) to keep it subtle
- Large blur radius creates soft, atmospheric effect

---

## Code Structure

```tsx
<section className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
  {/* Floating background orbs */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div 
      className="absolute -top-20 -left-20 w-[500px] h-[500px] 
                 rounded-full bg-primary/10 blur-3xl animate-orb-float"
    />
    <div 
      className="absolute -bottom-32 -right-20 w-[350px] h-[350px] 
                 rounded-full bg-primary/15 blur-3xl animate-orb-float"
      style={{ animationDelay: "-4s" }}
    />
    <div 
      className="absolute top-1/2 right-0 w-[250px] h-[250px] 
                 rounded-full bg-violet-400/10 blur-3xl animate-orb-float"
      style={{ animationDelay: "-8s" }}
    />
  </div>
  
  <div className="container px-4 relative z-10">
    {/* existing content */}
  </div>
</section>
```

---

## Animation Details

- Using existing `animate-orb-float` (12s cycle, translate + scale)
- Staggered delays create organic, non-synchronized movement
- Large blur makes movement very subtle and atmospheric

---

## Dark Mode Consideration

The orbs use `bg-primary/10` which automatically adapts to dark mode since `--primary` is defined for both themes.

---

## File Changes Summary

| File | Action |
|------|--------|
| `src/components/landing/Hero.tsx` | UPDATE - Add floating orb background layer |


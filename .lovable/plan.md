

# Replace Floating Orbs with Cooler Background Effects

## Summary

Replace the large blurry purple circles with a more sophisticated, modern background treatment that feels more "tech" and less generic.

---

## New Background Concept: Animated Gradient Mesh + Particle Field

Instead of big blob orbs, we'll create:

1. **Gradient Mesh Waves** — Flowing, organic gradient shapes that morph subtly
2. **Floating Particles** — Tiny animated dots/stars that drift slowly (think Linear/Vercel)
3. **Subtle Light Beams** — Diagonal gradient streaks that add depth
4. **Noise/Grain Texture** — Already exists, will keep it

---

## Technical Changes

### File: `src/components/landing/FloatingOrbs.tsx` → Rename to `BackgroundEffects.tsx`

**Remove:** Big circular blurred orbs

**Add:**
- Animated gradient mesh shapes (organic, elongated, morphing)
- Floating micro-particles (20-30 tiny dots that drift)
- Subtle diagonal light streaks
- Animated aurora-style gradients

```text
Visual Concept:
┌──────────────────────────────────────────────────┐
│  ·    ·         ·                    ·           │
│        ╲                                         │
│    ·    ╲ [gradient streak]    ·                 │
│          ╲                                       │
│   ·       ╲___________________    ·              │
│              [aurora gradient]                   │
│    ·    ·                          ·             │
│                    ·                             │
│  ·     [flowing mesh gradient]          ·        │
│           ·                ·                     │
│     ·                                  ·         │
│              ·        ·                          │
└──────────────────────────────────────────────────┘

Legend:
· = floating micro-particles
╲ = subtle diagonal light beam
[aurora] = soft, morphing gradient areas
```

---

## Particle System Design

- **Count:** 30-40 particles
- **Size:** 1-3px (tiny, not blobs)
- **Color:** White with varying opacity (0.1-0.4)
- **Animation:** Slow upward drift with slight horizontal sway
- **Distribution:** Random across viewport

---

## Aurora Gradient Design

- **Shape:** Elongated, organic blobs (not circular)
- **Colors:** Purple → Blue → Pink (subtle transitions)
- **Opacity:** Very low (0.05-0.15)
- **Animation:** Slow morphing/breathing effect
- **Blur:** Heavy blur for soft glow

---

## Light Beam Design

- **Count:** 2-3 beams
- **Angle:** Diagonal (45°-60°)
- **Color:** White/purple gradient
- **Opacity:** Very subtle (0.03-0.08)
- **Animation:** Slow fade in/out cycle

---

## Files to Change

| File | Action |
|------|--------|
| `FloatingOrbs.tsx` | Complete rewrite with new effects |
| `HeroSection.tsx` | Update import if component renamed |
| Other sections using FloatingOrbs | Update to new component |

---

## Visual Inspiration

Think: **Linear.app**, **Vercel**, **Raycast** — subtle, sophisticated backgrounds with:
- Floating particles that feel alive
- Organic gradient washes
- Subtle light effects
- Clean, premium feel

This replaces the "generic purple blob" look with something more refined and tech-forward.


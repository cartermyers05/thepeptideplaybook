

# Living, AI-Powered Background Experience

## The Vision

Transform the landing page into a living, breathing canvas that responds to user interaction. When users click anywhere, particle bursts and ripple effects will create a "wow" moment that reinforces the AI-powered nature of the product.

```text
Visual Effect Map:
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│    ✨ Floating neurons         Aurora gradients ✨          │
│         (new)                    (enhanced)                  │
│                                                             │
│        ╭─ Click here ─╮                                     │
│        │   💥 BURST   │  ← Particle explosion + ripple      │
│        │   ~~~~ ~~~~  │     on every click                  │
│        ╰──────────────╯                                     │
│                                                             │
│    Neural connection lines         Energy pulses            │
│    flowing between particles       radiating outward        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Key Enhancements

### 1. Click-Triggered Effects (New)
When user clicks anywhere on the page:
- **Particle burst** - 8-12 particles explode outward from click point
- **Ripple wave** - Expanding ring of light emanates from click
- **Flash glow** - Brief bright flash at click location
- **Sound-like timing** - Animations staggered to feel percussive

### 2. Enhanced Ambient Motion
- **Neural network lines** - Faint lines connecting nearby particles
- **Energy pulses** - Periodic waves that travel across the background
- **More particles** - Increase count and add size variation
- **Faster aurora movement** - More noticeable gradient shifts

### 3. AI-Themed Visual Elements
- **Binary data streams** - Subtle falling text effect (like Matrix but lighter)
- **Scanning line** - Horizontal line that sweeps periodically
- **Cursor glow** - Subtle glow follows mouse position

---

## Implementation Approach

### New Component: `InteractiveBackground.tsx`

A wrapper component that captures clicks and mouse position:

```text
Structure:
├── InteractiveBackground (captures all interactions)
│   ├── FloatingOrbs (enhanced with more particles)
│   ├── ClickBursts (new - particle explosions on click)
│   ├── MouseGlow (new - subtle cursor follower)
│   ├── NeuralNetwork (new - connecting lines)
│   └── ScanningLine (new - periodic sweep)
```

### Click Burst Animation

When user clicks:
1. Create 8-12 particles at click position
2. Each particle shoots outward in random direction
3. Particles fade and shrink as they travel
4. Ripple ring expands from center
5. All elements clean up after animation completes

### Mouse Glow Effect

- Subtle radial gradient follows cursor
- Very low opacity (5-10%) so it's not distracting
- Creates feeling of "AI awareness" of user

---

## Files to Create/Modify

| File | Action |
|------|--------|
| `src/components/landing/InteractiveBackground.tsx` | Create - Main wrapper with click handlers |
| `src/components/landing/ClickBurst.tsx` | Create - Particle explosion component |
| `src/components/landing/FloatingOrbs.tsx` | Enhance - More particles, neural lines |
| `src/components/landing/HeroSection.tsx` | Integrate - Use InteractiveBackground |

---

## Technical Details

### Click Burst Particles

```text
Particle Behavior:
- Count: 10-15 per click
- Initial velocity: Random direction, 100-200px
- Duration: 0.6-1.0s
- Size: 3-8px, shrinking to 0
- Opacity: 1.0 → 0
- Colors: Primary purple with variations
```

### Ripple Wave

```text
Ripple Behavior:
- Expand from 0 to 200px radius
- Border: 2px solid primary/30
- Duration: 0.5s
- Fade out as it expands
```

### Enhanced Aurora Motion

```text
Current: 20s animation cycle
New: 12-15s cycle (faster, more noticeable)
- Add color shifting between purple/pink/blue
- Increase movement range
```

### Neural Network Lines

```text
- Connect particles within 150px of each other
- Line opacity based on distance (closer = more visible)
- Very subtle: 2-5% opacity
- Lines animate with particle movement
```

---

## Performance Considerations

- Use `requestAnimationFrame` for smooth animations
- Limit click bursts to 3 active at once (prevent spam)
- Clean up particles after animation completes
- Use CSS transforms (GPU accelerated)
- Debounce mouse position updates (every 50ms)

---

## Expected User Experience

1. **Page loads** → Particles floating, aurora shifting, feels alive
2. **User moves mouse** → Subtle glow follows, AI is "watching"
3. **User clicks anywhere** → Satisfying particle burst + ripple
4. **Continued interaction** → Each click rewarded with visual feedback
5. **Overall impression** → "This site feels powered by AI"

---

## Animation Timing

```text
Ambient (always running):
├── Aurora gradients: 12-15s loop
├── Particles: 15-25s drift cycles
├── Neural lines: Sync with particles
└── Scanning line: 8s sweep (every 30s)

On Click (triggered):
├── 0ms: Flash at click point
├── 0ms: Particles spawn
├── 50ms: Particles begin outward motion
├── 100ms: Ripple starts expanding
├── 600ms: Particles fade out
├── 500ms: Ripple completes
└── Cleanup after 1000ms
```


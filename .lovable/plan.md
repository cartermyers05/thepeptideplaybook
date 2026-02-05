

# Create a Premium "Wow" Hero Headline

## The Problem
The current headline is boring - just a simple gradient text with a shimmer. It doesn't create the "wow" factor that a premium product deserves.

## The Vision
Create an eye-catching headline that makes visitors stop and pay attention. Think Apple-level polish with modern web animation techniques.

---

## Option A: Glowing Typewriter Effect (Recommended)
Each word types in one at a time with a glowing cursor, then "AI Peptide" gets a metallic shimmer underline that draws itself.

```text
Your              ← types in with cursor
AI Peptide        ← types in, then rainbow underline draws itself
Journey           ← types in, cursor blinks and fades
```

### Visual Features
- Typewriter cursor that blinks
- Clean, readable black text (no transparency issues)
- Rainbow underline that animates under "AI Peptide" only
- Subtle glow pulse behind the entire headline

---

## Option B: Split-Flap Display Effect
Like airport departure boards - letters flip down into place with a satisfying cascade.

### Visual Features
- Each letter appears with a quick flip animation
- Staggered timing creates a wave effect
- "AI Peptide" gets a subtle rainbow glow after landing
- No blur or transparency - rock solid visibility

---

## Option C: Spotlight Reveal
Words start dimmed/gray, then a "spotlight" sweeps across revealing them in full color/black.

### Visual Features
- Horizontal light sweep animation
- "AI Peptide" revealed in rainbow gradient as spotlight passes
- Creates drama without readability issues
- Clean, high-contrast text throughout

---

## Recommended: Option A (Glowing Typewriter)

### Why This Works
1. **100% Readable** - Black text on white background, no transparency hacks
2. **Premium Feel** - Typewriter effect feels intentional and editorial
3. **Rainbow Preserved** - The underline keeps your brand colors without visibility issues
4. **Performant** - Simple CSS animations, no filter blur

### Implementation

| Component | Animation |
|-----------|-----------|
| "Your" | Types in (0.5s), cursor moves |
| "AI Peptide" | Types in (0.8s), then rainbow underline draws (0.6s) |
| "Journey" | Types in (0.5s), cursor blinks then fades |
| Background | Subtle radial glow pulse behind text |

### Technical Approach
1. Use `motion.span` with `initial={{ width: 0 }}` for each word
2. Blinking cursor as a `motion.span` with `opacity` animation  
3. Rainbow underline as absolute-positioned div with `scaleX` animation
4. Background glow as CSS pseudo-element with pulse keyframes

### File Changes

| File | Changes |
|------|---------|
| `src/components/landing/HeroSection.tsx` | New typewriter animation with cursor, rainbow underline for "AI Peptide" |
| `src/index.css` | Add `@keyframes cursor-blink` and glow pulse utilities if needed |

### Code Preview

```tsx
{/* "AI Peptide" - with animated rainbow underline */}
<motion.span className="block relative">
  <span className="text-foreground">AI Peptide</span>
  
  {/* Rainbow underline that draws itself */}
  <motion.div
    className="absolute bottom-0 left-0 h-1.5 rounded-full"
    style={{
      background: rainbowGradient,
      backgroundSize: "200% 100%",
    }}
    initial={{ scaleX: 0 }}
    animate={{ 
      scaleX: 1,
      backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"]
    }}
    transition={{
      scaleX: { delay: 1.2, duration: 0.6, ease: "easeOut" },
      backgroundPosition: { duration: 4, ease: "linear", repeat: Infinity }
    }}
    style={{ transformOrigin: "left" }}
  />
</motion.span>
```

## Result
A stunning, editorial-style headline where:
- All text is crisp and readable (black on white)
- "AI Peptide" is highlighted with a living, breathing rainbow underline
- The entrance feels premium and intentional
- No blur, transparency, or gradient-text conflicts


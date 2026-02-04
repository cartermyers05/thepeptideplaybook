

# Create a "Wow Moment" Hero Headline Animation

## Overview
Transform the "Your AI Peptide Journey" headline into a show-stopping entrance animation that immediately captivates visitors. We'll add dramatic text reveals, rainbow gradient effects, and smooth choreography.

## The "Wow" Effect

The animation will flow like this:

```text
Timeline (seconds):
0.0 ───────────────────────────────────────── 3.0s

0.0s    "Your" slides in from left with blur-to-sharp
        └── Subtle glow pulse on arrival

0.3s    "AI Peptide" explodes in with:
        ├── Character-by-character reveal
        ├── Rainbow gradient text (our logo colors!)
        └── Shimmer animation continues forever

0.6s    "Journey" sweeps in from right
        └── Completes the statement

1.5s+   Gentle floating begins on whole headline
```

## Animation Details

| Word | Effect | Why It's "Wow" |
|------|--------|----------------|
| **"Your"** | Slide from left with blur-to-sharp reveal | Sets the stage, personal touch |
| **"AI Peptide"** | Rainbow gradient text with letter stagger | The star - uses our brand colors flowing through |
| **"Journey"** | Slide from right, completing the sentence | Satisfying closure |

## Rainbow Gradient on "AI Peptide"

Instead of plain text, "AI Peptide" will be styled with our signature rainbow gradient (same as the hexagon logo):

- Yellow → Orange → Pink → Purple → Blue → Teal
- Animated shimmer flowing through continuously
- Creates immediate brand recognition

## Technical Implementation

### 1. New Animation Variants

```typescript
// Letter-by-letter stagger for "AI Peptide"
const letterContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03, // Fast stagger for snappy feel
      delayChildren: 0.3,   // Wait for "Your" to land
    }
  }
};

const letterVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

// Enhanced line variants with blur
const enhancedLineVariants = {
  hidden: { opacity: 0, x: -50, filter: "blur(8px)" },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { 
      delay: i * 0.25, 
      duration: 0.6, 
      ease: [0.25, 0.46, 0.45, 0.94] // Custom easing
    }
  })
};
```

### 2. Rainbow Text Gradient

```tsx
<motion.span 
  className="inline-block bg-clip-text text-transparent"
  style={{
    backgroundImage: "linear-gradient(90deg, hsl(45, 80%, 50%), hsl(25, 90%, 55%), hsl(350, 80%, 55%), hsl(270, 70%, 55%), hsl(210, 80%, 55%), hsl(160, 70%, 45%), hsl(45, 80%, 50%))",
    backgroundSize: "200% 100%",
  }}
  animate={{
    backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
  }}
  transition={{
    duration: 4,
    ease: "linear",
    repeat: Infinity,
  }}
>
  AI Peptide
</motion.span>
```

### 3. Subtle Glow Effect

Add a text-shadow glow that pulses subtly:

```typescript
const glowVariants = {
  initial: { textShadow: "0 0 0px transparent" },
  glow: {
    textShadow: [
      "0 0 20px rgba(139, 92, 246, 0.3)",
      "0 0 40px rgba(139, 92, 246, 0.5)",
      "0 0 20px rgba(139, 92, 246, 0.3)",
    ],
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
      delay: 1.5,
    }
  }
};
```

## File to Modify

| File | Changes |
|------|---------|
| `src/components/landing/HeroSection.tsx` | Complete animation overhaul with rainbow gradient text, blur reveals, and enhanced choreography |

## Result

When visitors land on the homepage, they'll see:

1. **Smooth blur-to-sharp reveal** of "Your"
2. **Stunning rainbow gradient "AI Peptide"** with letters dancing in
3. **Satisfying completion** with "Journey" sliding in
4. **Continuous shimmer** flowing through the rainbow text forever
5. **Gentle floating** once everything settles

This creates an immediate "premium product" impression that matches the modern, AI-forward branding.




# Make Logo Static Until User Asks a Question

## Overview

Update the AnimatedLogo component to support an `animate` prop that controls whether animations are active. By default, the logo will be static, and it will only "come to life" when the AI is processing a question.

---

## Changes

### 1. Update AnimatedLogo Component

**File:** `src/components/brand/AnimatedLogo.tsx`

Add an `animate` prop (default: `true` to maintain backward compatibility):

```tsx
interface AnimatedLogoProps {
  size?: number;
  className?: string;
  animate?: boolean;  // NEW - controls whether animations run
}
```

When `animate={false}`:
- No rotation on the SVG
- No pulsing on the center node
- No opacity animation on outer nodes
- Just a static, beautiful hexagon

When `animate={true}` (default):
- Full animations as before

---

### 2. Update AskCoach Component

**File:** `src/components/coach/AskCoach.tsx`

Pass `animate={isLoading}` to control when the logo animates:

| Location | Current | Change |
|----------|---------|--------|
| Empty state (line 138) | Always animating | `animate={false}` - static until first question |
| Message avatar (line 157) | Always animating | `animate={false}` - static for completed responses |
| Loading state (line 186) | Always animating | `animate={true}` - animate while thinking |

---

## Implementation Details

### AnimatedLogo.tsx Changes

```tsx
export function AnimatedLogo({ size = 40, className, animate = true }: AnimatedLogoProps) {
  // ...existing gradient definitions...

  return (
    <motion.svg
      // Only rotate if animate is true
      animate={animate ? { rotate: 360 } : { rotate: 0 }}
      transition={animate ? { 
        duration: 20, 
        repeat: Infinity, 
        ease: "linear" 
      } : undefined}
    >
      {/* Center node - only pulse if animate is true */}
      <motion.circle
        animate={animate 
          ? { scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] } 
          : { scale: 1, opacity: 1 }
        }
        transition={animate 
          ? { duration: 2, repeat: Infinity, ease: "easeInOut" } 
          : undefined
        }
      />

      {/* Outer nodes - only glow if animate is true */}
      <motion.circle
        animate={animate ? { opacity: [0.7, 1, 0.7] } : { opacity: 1 }}
        transition={animate ? { duration: 1.5, repeat: Infinity, delay: 0 } : undefined}
      />
      {/* ...similar for other outer nodes */}
    </motion.svg>
  );
}
```

### AskCoach.tsx Changes

```tsx
// Empty state - static logo
<AnimatedLogo size={40} animate={false} />

// Message avatars - static for completed responses
<AnimatedLogo size={20} animate={false} />

// Loading state - animated while AI is thinking
<AnimatedLogo size={20} animate={true} />
```

---

## Result

- **Before asking a question**: Logo is static and calm
- **While AI is thinking**: Logo comes to life with rotation and pulsing nodes
- **After response**: Logo returns to static state

This creates a clear visual feedback loop where the animation signals "the AI is working on your question."




# Animate Rainbow Gradient Line

## Overview
Add a smooth, flowing shimmer animation to the rainbow gradient line under "Everything peptides, one place" on the signup page.

## Animation Effect
The gradient will continuously shift from left to right, creating a mesmerizing "flowing" effect that draws the eye without being distracting.

## Implementation

### File: `src/pages/Signup.tsx`

Update the rainbow line div to use a wider gradient that can animate:

**Current:**
```tsx
<div 
  className="h-1 w-full rounded-full"
  style={{
    background: "linear-gradient(90deg, hsl(45, 80%, 50%), hsl(25, 90%, 55%), ...)"
  }}
/>
```

**Updated:**
```tsx
<div 
  className="h-1 w-full rounded-full animate-shimmer"
  style={{
    background: "linear-gradient(90deg, hsl(45, 80%, 50%), hsl(25, 90%, 55%), hsl(350, 80%, 55%), hsl(270, 70%, 55%), hsl(210, 80%, 55%), hsl(160, 70%, 45%), hsl(45, 80%, 50%), hsl(25, 90%, 55%), hsl(350, 80%, 55%))",
    backgroundSize: "200% 100%"
  }}
/>
```

**Key changes:**
- Add `animate-shimmer` class (already exists in tailwind config)
- Extend the gradient to repeat the colors (seamless loop)
- Set `backgroundSize: "200% 100%"` so the gradient can slide

## Technical Details

| Setting | Value | Purpose |
|---------|-------|---------|
| `animate-shimmer` | Existing animation | Shifts background position -200% to 200% |
| `backgroundSize` | 200% 100% | Makes gradient 2x wider for smooth sliding |
| Extended gradient | Repeat first 3 colors | Creates seamless loop |

## Result
A subtle, elegant shimmer effect that makes the rainbow line feel alive and premium, matching the modern feel of the brand.


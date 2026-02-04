
# Update Logo: Rainbow/Radiant Hexagon

## Overview
Replace the single-color teal hexagon logo with a vibrant rainbow gradient that incorporates all the goal colors from the homepage, creating a more dynamic and colorful brand identity.

---

## Color Palette (from Homepage Goals)

| Goal | Color | HSL |
|------|-------|-----|
| Fat Loss | Orange | hsl(25, 90%, 55%) |
| Muscle | Blue | hsl(210, 80%, 55%) |
| Recovery | Pink/Red | hsl(350, 80%, 55%) |
| Anti-aging | Purple | hsl(270, 70%, 55%) |
| Cognitive | Teal | hsl(160, 70%, 45%) |
| Beginner | Yellow | hsl(45, 80%, 50%) |

---

## Design Approach

The hexagon will use an SVG gradient that flows through all the homepage colors, creating a radiant rainbow effect. Each node (the 3 outer circles) will be a different color from the palette.

### Visual Concept
```text
           Yellow/Orange (top node)
              ◉
             /|\
            / | \
           /  |  \
          /   ●   \  ← Center: gradient fill
         /    |    \
        ◉─────┼─────◉
     Teal    (lines)  Purple/Pink
```

---

## Technical Implementation

### File: `src/components/brand/Logo.tsx`

**Changes:**
1. Add SVG `<defs>` with gradient definitions
2. Replace solid teal colors with gradient references
3. Color each outer node differently (orange/yellow, purple/pink, teal/blue)
4. Make the hexagon stroke use a rainbow gradient
5. Center node uses the gradient

### Also update: `public/favicon.svg`
Same gradient treatment for the favicon.

---

## Implementation Details

### New SVG Structure

```tsx
<svg width={size} height={size} viewBox="0 0 32 32">
  <defs>
    {/* Rainbow gradient for hexagon stroke */}
    <linearGradient id="rainbow-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="hsl(45, 80%, 50%)" />      {/* Yellow */}
      <stop offset="20%" stopColor="hsl(25, 90%, 55%)" />     {/* Orange */}
      <stop offset="40%" stopColor="hsl(350, 80%, 55%)" />    {/* Pink */}
      <stop offset="60%" stopColor="hsl(270, 70%, 55%)" />    {/* Purple */}
      <stop offset="80%" stopColor="hsl(210, 80%, 55%)" />    {/* Blue */}
      <stop offset="100%" stopColor="hsl(160, 70%, 45%)" />   {/* Teal */}
    </linearGradient>
    
    {/* Radial gradient for fill */}
    <radialGradient id="rainbow-fill" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="hsl(45, 80%, 50%)" stopOpacity="0.15" />
      <stop offset="100%" stopColor="hsl(270, 70%, 55%)" stopOpacity="0.05" />
    </radialGradient>
  </defs>
  
  {/* Hexagon with gradient stroke */}
  <path d="M16 2L28 9V23L16 30L4 23V9L16 2Z" 
        stroke="url(#rainbow-stroke)" 
        strokeWidth="2" 
        fill="url(#rainbow-fill)" />
  
  {/* Center node - warm gradient */}
  <circle cx="16" cy="16" r="3" fill="url(#rainbow-stroke)" />
  
  {/* Connection lines - gradient */}
  <path d="M16 16L16 7M16 16L23 20M16 16L9 20" 
        stroke="url(#rainbow-stroke)" 
        strokeWidth="2" 
        strokeLinecap="round" />
  
  {/* Outer nodes - different colors */}
  <circle cx="16" cy="7" r="2" fill="hsl(45, 80%, 50%)" />     {/* Yellow - top */}
  <circle cx="23" cy="20" r="2" fill="hsl(270, 70%, 55%)" />   {/* Purple - right */}
  <circle cx="9" cy="20" r="2" fill="hsl(160, 70%, 45%)" />    {/* Teal - left */}
</svg>
```

---

## Files to Update

| File | Changes |
|------|---------|
| `src/components/brand/Logo.tsx` | Add gradient defs, apply to hexagon, color nodes |
| `public/favicon.svg` | Same rainbow gradient treatment |

---

## Result

The logo will transform from a monochromatic teal hexagon to a vibrant, radiant design that:
- Uses all 6 goal colors from the homepage
- Creates visual cohesion between the logo and the goal selection cards
- Feels more dynamic and modern
- Each node represents a different wellness goal


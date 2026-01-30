

# Remove Mouse Glow and Click Bursts

## Overview

Remove the mouse glow cursor follower and click burst particle effects from the landing page, keeping only the ambient background animations (floating orbs, scanning line, and energy pulses).

## Changes Required

### File: `src/components/landing/InteractiveBackground.tsx`

1. **Remove MouseGlow component** - Delete the entire `MouseGlow` function component that creates the cursor-following radial gradient

2. **Remove ClickBurstManager wrapper** - Unwrap the children from the `ClickBurstManager` component

3. **Remove imports** - Remove unused imports:
   - `useMotionValue` and `useSpring` from framer-motion (only needed for mouse glow)
   - `ClickBurstManager` from `./ClickBurst`

### File: `src/components/landing/ClickBurst.tsx`

**Delete entirely** - This file is no longer needed since we're removing click burst functionality.

## Result

The landing page will retain:
- Floating orbs with aurora gradients
- Grid pattern dots
- Energy pulses radiating from center
- Periodic scanning line

The following will be removed:
- Cursor-following glow effect
- Click-triggered particle bursts and ripples


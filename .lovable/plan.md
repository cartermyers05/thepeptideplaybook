

# Signup Page Visual Upgrade -- Logo Pattern Background

Transform the bare signup page into a visually rich experience by adding a scattered logo watermark pattern and the same animated background effects used on the login page.

---

## Current State
- **Signup**: Plain white left side with form, gradient right panel (desktop only). Mobile is entirely bare white.
- **Login**: Already has FloatingOrbs, GridPattern, and gradient overlay -- looks great.

## What Changes

### 1. Add animated background to the full page (`src/pages/Signup.tsx`)
- Wrap the entire page with `FloatingOrbs` (subtle variant) and `GridPattern` (dots) -- same as login page
- Add a `gradient-mesh-bg` overlay for depth
- This fills the empty white space on mobile and behind the form on desktop

### 2. Add a scattered logo watermark pattern
- Create a new lightweight component `src/components/brand/LogoPattern.tsx`
- Renders 12-15 hexagon logos at randomized positions, sizes (24px-64px), rotations, and very low opacity (3-8%)
- Uses the `AnimatedLogo` component with `animate={false}` (static, no performance cost) for each instance
- Subtle floating animation on each logo (slow drift) using framer-motion
- Acts as a branded watermark wallpaper behind the form content

### 3. Glassmorphism card around the form
- Wrap the left-side form area in a `glass-card` container (same style as login card) so the form floats above the patterned background
- Keeps form readable against the busier background

### 4. Keep the right panel as-is
- The gradient right panel with features list stays unchanged on desktop
- The logo pattern only appears behind the left (form) side

---

## Technical Details

### New file: `src/components/brand/LogoPattern.tsx`
- Generates an array of 12-15 logo positions using `useMemo` (deterministic, no re-renders)
- Each logo: random x/y position (0-100%), random size (24-64px), random rotation (0-360deg), random opacity (0.03-0.08)
- Uses the existing hexagon SVG from `AnimatedLogo` with `animate={false}`
- Wrapped in `absolute inset-0 overflow-hidden pointer-events-none` so it sits behind content

### Modified file: `src/pages/Signup.tsx`
- Import `FloatingOrbs`, `GridPattern`, and new `LogoPattern`
- Add background layers before the flex container (same pattern as Login.tsx)
- Add `relative z-10` to the content container
- Wrap the form `max-w-md` div in a glass-card with padding and shadow
- No changes to form logic, steps, validation, or navigation


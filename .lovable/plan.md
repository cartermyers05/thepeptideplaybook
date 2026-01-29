

# Login Page Enhancement

## Summary

Add subtle but visually appealing background animations to the login page and center the "Peptide Playbook AI" branding, leveraging the existing premium animation components.

---

## Current State

The login page is functional but visually plain:
- Simple white background
- Logo is left-aligned in the card
- No background visual interest

---

## Changes to Make

### 1. Add Background Animations

Layer the existing animation components for a premium feel:

```text
┌─────────────────────────────────────────────┐
│  FloatingOrbs (subtle variant)              │ ← Morphing purple aurora gradients
│    ↓                                        │
│  GridPattern (dots)                         │ ← Animated dot grid
│    ↓                                        │
│  gradient-mesh-bg class                     │ ← Subtle radial gradients
│    ↓                                        │
│  Login Form Card (glass-card)               │ ← Glassmorphism effect
└─────────────────────────────────────────────┘
```

### 2. Center the Logo/Branding

Move the "Peptide Playbook AI" from inside the form card to a centered position above it, with a larger, more prominent presentation:

**Before:**
```text
┌──────────────────┐
│ ⚡ Peptide...    │ ← Small, inside card
│ ─────────────    │
│ Welcome back     │
└──────────────────┘
```

**After:**
```text
    ⚡ Peptide Playbook AI     ← Large, centered, above card
    
┌──────────────────────────┐
│     Welcome back         │
│     ─────────────        │
│     [email input]        │
│     [password input]     │
│     [Login button]       │
└──────────────────────────┘
```

---

## Technical Details

### File: `src/pages/Login.tsx`

**Changes:**

1. **Import animation components:**
   ```typescript
   import { FloatingOrbs } from "@/components/landing/FloatingOrbs";
   import { GridPattern } from "@/components/landing/GridPattern";
   ```

2. **Wrap content in container with animation layers:**
   ```tsx
   <div className="min-h-screen bg-background relative overflow-hidden">
     {/* Background animations */}
     <FloatingOrbs variant="subtle" />
     <GridPattern variant="dots" />
     
     {/* Gradient overlay */}
     <div className="absolute inset-0 gradient-mesh-bg" />
     
     {/* Content */}
     <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
       ...
     </div>
   </div>
   ```

3. **Enhance logo section:**
   - Make logo larger with animated glow
   - Add subtle entrance animation
   - Better visual hierarchy

4. **Apply glassmorphism to card:**
   ```tsx
   <div className="glass-card p-8 shadow-glow">
   ```

---

## Visual Result

The login page will now feature:
- Floating purple aurora gradients drifting in the background
- Animated dot grid pattern creating depth
- Micro-particles floating upward
- Centered, prominent branding with subtle glow
- Glassmorphism card with frosted effect
- Cohesive with the rest of the site's premium aesthetic

All animations use the existing "subtle" variant, ensuring they're noticeable but not distracting.



# Add "Our Studies" Button to Navbar

## Overview
Add a new "Our Studies" button next to the "Menu" button in the landing page navbar. This will provide quick access to the research guides section.

## Changes

### File: `src/components/landing/Navbar.tsx`

**Desktop Navigation (line ~69)**
- Add a new `Link` with `PillButton` for "Our Studies" that links to `/guides`
- Position it immediately before the Menu button
- Use the `light` variant to match the Menu button style

**Mobile Menu Overlay (line ~121)**
- Add "Our Studies" to the mobile menu links array so it appears in the full-screen menu as well

## Visual Result

**Desktop (right side of navbar):**
```
— [Sign Up] [Sign In] [Our Studies] [Menu]
```

**Mobile menu:**
- What's Inside
- How It Works
- Pricing
- FAQ
- **Our Studies** (new)

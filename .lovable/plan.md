

# Fix: Mobile Nav "Get Started" Link

## Problem
The mobile hamburger menu's "Get Started" button links to `/signup` instead of `/sales`. The desktop nav is correct (links to `/sales`), but the mobile menu was missed.

## Change

**File:** `src/components/landing/Navbar.tsx`, line 150

Change the mobile menu "Get Started" link from `/signup` to `/sales`:

```
// Before
<Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>

// After  
<Link to="/sales" onClick={() => setIsMobileMenuOpen(false)}>
```

Also update the button text from "Get Started" to "Get Full Access" (line 151) to match the desktop nav.

## What does NOT change
- Desktop nav (already correct)
- Menu items (What's Inside, How It Works, etc.)
- Sign In link
- Any other pages or components


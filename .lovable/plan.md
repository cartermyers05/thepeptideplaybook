

# Update Navbar: Replace "Start Course" with Sign Up/Sign In Buttons

## Overview
Update the navigation bar to replace the "Start Course" button with proper authentication buttons: "Sign Up" and "Sign In".

---

## Changes

### Desktop Navigation (lines 49-73)

**Current layout:**
```
— [Start Course] [Menu]
```

**New layout:**
```
— [Sign Up] [Sign In] [Menu]
```

Changes:
- Replace "Start Course" link (`/quiz`) with "Sign Up" link (`/signup`)
- Add new "Sign In" button linking to `/login`
- Keep the Menu button as-is

---

### Mobile Menu Overlay (lines 128-139)

**Current:**
```
Log In (text link)  [Start Course button]
```

**New:**
```
[Sign In button]  [Sign Up button]
```

Changes:
- Replace "Log In" text link with "Sign In" PillButton (light variant)
- Replace "Start Course" with "Sign Up" PillButton (dark variant)
- Both linking to `/login` and `/signup` respectively

---

## File to Update

### `src/components/landing/Navbar.tsx`

**Change 1: Desktop nav buttons (lines 52-56)**
```tsx
// Replace "Start Course" with "Sign Up"
<Link to="/signup">
  <PillButton variant="dark" icon={<span className="text-xs">•</span>}>
    Sign Up
  </PillButton>
</Link>

// Add "Sign In" button after Sign Up
<Link to="/login">
  <PillButton variant="light">
    Sign In
  </PillButton>
</Link>
```

**Change 2: Mobile menu buttons (lines 128-139)**
```tsx
<div className="pt-8 flex gap-4">
  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
    <PillButton variant="light">Sign In</PillButton>
  </Link>
  <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
    <PillButton variant="dark">Sign Up</PillButton>
  </Link>
</div>
```

---

## Summary

| Location | Current | New |
|----------|---------|-----|
| Desktop nav | "Start Course" → `/quiz` | "Sign Up" → `/signup`, "Sign In" → `/login` |
| Mobile menu | "Log In" text + "Start Course" button | "Sign In" button + "Sign Up" button |


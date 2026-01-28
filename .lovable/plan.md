

# Add Login Button to Navbar

## Overview

Add a "Log In" link to the navbar so existing users can easily access the login page. This will be placed next to the "Get Started" button on desktop and added to the mobile menu as well.

---

## Design

The login link will be styled as a subtle text link (not a button) to create visual hierarchy — the primary CTA remains "Get Started" while "Log In" is secondary for returning users.

```text
Desktop Layout:
┌─────────────────────────────────────────────────────────────────┐
│ Peptide Playbook    Features  About  FAQ     [Log In]  [Get Started] │
└─────────────────────────────────────────────────────────────────┘

Mobile Menu:
┌─────────────────┐
│ Features        │
│ About           │
│ FAQ             │
│ Log In          │  ← New link
│ [Get Started]   │
└─────────────────┘
```

---

## Implementation

### File: `src/components/landing/Navbar.tsx`

**Changes:**

1. **Desktop CTA Section (line 56-61)**
   - Add a "Log In" text link before the "Get Started" button
   - Style as `text-sm text-muted-foreground hover:text-foreground` to match nav links
   - Wrap both in a flex container with gap

2. **Mobile Menu (line 94-100)**
   - Add a "Log In" link before the "Get Started" button
   - Style consistently with other mobile nav links
   - Include same animation delay pattern

---

## Code Preview

**Desktop CTA section:**
```tsx
{/* Desktop CTA */}
<div className="hidden md:flex items-center gap-4">
  <Link 
    to="/login" 
    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
  >
    Log In
  </Link>
  <Button asChild size="sm" className="btn-primary-clean">
    <Link to="/signup">Get Started</Link>
  </Button>
</div>
```

**Mobile menu addition:**
```tsx
<Link
  to="/login"
  onClick={() => setIsMobileMenuOpen(false)}
  className="block text-lg font-medium py-2 opacity-0 animate-fade-in-up"
  style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
>
  Log In
</Link>
<div className="pt-4 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
  <Button asChild className="w-full btn-primary-clean">
    <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
      Get Started
    </Link>
  </Button>
</div>
```

---

## Files to Update

| File | Changes |
|------|---------|
| `src/components/landing/Navbar.tsx` | Add "Log In" link in desktop CTA area and mobile menu |


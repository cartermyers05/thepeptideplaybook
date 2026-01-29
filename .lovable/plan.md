

# Homepage Cleanup: Remove "Try Assistant" Demo + Fix All Buttons

## Summary

Remove the interactive AI demo section ("See the AI in Action") from the homepage since users shouldn't be able to "try" the assistant before purchasing. Also fix all buttons that aren't working due to the `asChild` pattern issue.

---

## Issue 1: AIShowcase Section (The "Try Assistant" Feature)

The `AIShowcase` component is an interactive demo that lets visitors "Run Demo" and see a fake AI response. This gives away value for free and creates confusion about what's paid vs. free.

**Location:** `src/components/landing/AIShowcase.tsx`  
**Rendered in:** `src/pages/Index.tsx` (line 35)

**Action:** Remove this section entirely from the homepage.

---

## Issue 2: Broken Buttons Audit

I've scanned all landing page components and identified buttons using the problematic `Button asChild` pattern that may not work reliably:

| Component | Button Text | Current Pattern | Issue |
|-----------|-------------|-----------------|-------|
| `HeroSection.tsx` | "Try AI Assistant Free" | `Button asChild` + `Link to="/signup"` | May not work |
| `HeroSection.tsx` | "See It In Action" | `Button asChild` + `<a href="#ai-demo">` | Points to removed section |
| `ProductPreview.tsx` | "Try AI Assistant" | `Button asChild` + `Link to="/signup"` | May not work |
| `SolutionSection.tsx` | "Get Full Access" | `Button asChild` + `<a href="#pricing">` | May not work |
| `Navbar.tsx` | "Get Access" (desktop) | `Button asChild` + `<a href="#pricing">` | May not work |
| `Navbar.tsx` | "Get Access" (mobile) | `Button asChild` + `<a href="#pricing">` | May not work |
| `FloatingCTA.tsx` | "Get Full Access" | `Button asChild` + `<a href="#pricing">` | May not work |
| `AIShowcase.tsx` | "Try It Free" | `Button asChild` + `Link to="/signup"` | Will be removed |

---

## Changes to Make

### 1. `src/pages/Index.tsx`
- Remove the `AIShowcase` import
- Remove `<AIShowcase />` from the JSX

### 2. `src/components/landing/HeroSection.tsx`
**Fix "Try AI Assistant Free" button:**
```tsx
// Change from:
<Button asChild size="lg" ...>
  <Link to="/signup">...</Link>
</Button>

// To:
<Link to="/signup">
  <Button size="lg" ...>...</Button>
</Link>
```

**Update "See It In Action" button:**
- Change `href="#ai-demo"` to `href="#product"` (points to ProductPreview section instead)
- Update button text to "See What's Included"

### 3. `src/components/landing/ProductPreview.tsx`
**Fix "Try AI Assistant" button:**
```tsx
// Change from:
<Button asChild className="btn-primary-clean group">
  <Link to="/signup">Try AI Assistant...</Link>
</Button>

// To:
<Link to="/signup">
  <Button className="btn-primary-clean group">Get Full Access...</Button>
</Link>
```

Also update the button text from "Try AI Assistant" to "Get Full Access" since users can't try it before purchasing.

### 4. `src/components/landing/SolutionSection.tsx`
**Fix "Get Full Access" button:**
```tsx
// Change from:
<Button asChild size="lg" ...>
  <a href="#pricing">Get Full Access</a>
</Button>

// To:
<a href="#pricing">
  <Button size="lg" ...>Get Full Access</Button>
</a>
```

### 5. `src/components/landing/Navbar.tsx`
**Fix desktop "Get Access" button (line 63-65):**
```tsx
// Change from:
<Button asChild size="sm" className="btn-primary-clean">
  <a href="#pricing">Get Access</a>
</Button>

// To:
<a href="#pricing">
  <Button size="sm" className="btn-primary-clean">Get Access</Button>
</a>
```

**Fix mobile "Get Access" button (line 108-112):**
```tsx
// Change from:
<Button asChild className="w-full btn-primary-clean">
  <a href="#pricing" ...>Get Access</a>
</Button>

// To:
<a href="#pricing" onClick={() => setIsMobileMenuOpen(false)}>
  <Button className="w-full btn-primary-clean">Get Access</Button>
</a>
```

### 6. `src/components/landing/FloatingCTA.tsx`
**Fix "Get Full Access" button:**
```tsx
// Change from:
<Button asChild size="lg" className="btn-primary-clean h-12 px-6 shadow-lg">
  <a href="#pricing">Get Full Access...</a>
</Button>

// To:
<a href="#pricing">
  <Button size="lg" className="btn-primary-clean h-12 px-6 shadow-lg">
    Get Full Access
    <ArrowRight className="ml-2 w-4 h-4" />
  </Button>
</a>
```

---

## Files to Modify

1. `src/pages/Index.tsx` - Remove AIShowcase
2. `src/components/landing/HeroSection.tsx` - Fix 2 buttons
3. `src/components/landing/ProductPreview.tsx` - Fix 1 button, update text
4. `src/components/landing/SolutionSection.tsx` - Fix 1 button
5. `src/components/landing/Navbar.tsx` - Fix 2 buttons
6. `src/components/landing/FloatingCTA.tsx` - Fix 1 button

---

## Result

After these changes:
- The "try assistant" interactive demo is removed
- All CTA buttons on the homepage will work correctly
- Consistent button pattern: wrap Link/anchor around Button (not using `asChild`)
- "See It In Action" redirects to product preview instead of removed demo section


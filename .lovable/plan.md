
# Footer Redesign: Match Purple Brand Identity

## Problem

The footer uses `bg-foreground` class which maps to a dark navy/slate blue color (`#1e293b`). This clashes with the purple-centric brand identity that uses `#7C3AED` as the primary accent on warm off-white backgrounds.

---

## Solution

Redesign the footer to use the purple brand colors with a sophisticated gradient treatment, matching the premium health-tech aesthetic.

---

## Design Approach

**Option: Dark Purple Gradient Footer**

Replace the navy blue with a rich, branded dark purple gradient:

```text
┌─────────────────────────────────────────────────────┐
│  Gradient: Deep Purple (#1a0a2e) → Dark Violet      │
│                                                     │
│  ⚡ Peptide Playbook AI                             │
│  Educational content. Not medical advice.           │
│                                                     │
│  Terms | Privacy | Disclaimer | Contact             │
│                                                     │
│  ─────────────────────────────────────              │
│  © 2025 Peptide Playbook AI. All rights reserved.   │
└─────────────────────────────────────────────────────┘
```

---

## Changes

### File: `src/components/landing/Footer.tsx`

**Background Styling:**

Replace:
```tsx
<footer className="bg-foreground text-muted py-12">
```

With a custom gradient that uses the purple brand colors:
```tsx
<footer className="bg-gradient-to-b from-[#1a0a2e] to-[#0f051a] text-white py-12 relative overflow-hidden">
```

**Add Subtle Visual Interest:**
- Add a subtle radial glow effect behind content
- Use purple-tinted text colors instead of gray muted colors
- Add a decorative gradient line at the top to connect with the page

**Text Colors:**
- Main brand text: `text-white`
- Secondary text: `text-purple-200/80` or `text-white/60`
- Links hover: `text-purple-300`

**Optional Enhancement:**
- Add a subtle gradient divider at the top of the footer to create a smooth transition from the page content

---

## Color Palette for Footer

| Element | Current | New |
|---------|---------|-----|
| Background | `#1e293b` (navy) | Gradient: `#1a0a2e` → `#0f051a` (deep purple) |
| Brand name | `text-background` | `text-white` |
| Disclaimer | `text-muted-foreground` | `text-purple-200/70` |
| Links | `text-muted-foreground` | `text-purple-200/60` → hover: `text-purple-300` |
| Border | `border-muted-foreground/20` | `border-purple-500/20` |

---

## Visual Result

The footer will now feature:
- A rich, deep purple gradient that aligns with the primary brand color
- Smooth color transition matching the site's premium aesthetic
- Better visual cohesion with the purple accents used throughout the landing page
- Subtle glow effects for added depth

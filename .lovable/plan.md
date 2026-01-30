
# SEO & AI Search Infrastructure: Fixes and Enhancements

## Summary
The core infrastructure is complete with 7 research guides, all schema markup, sitemaps, and AI crawler access. However, there are critical discoverability gaps that need fixing to maximize the revenue potential.

---

## Critical Fix: Navigation Links to /guides

### Problem
Users and search engines cannot discover the guides from the main site navigation. The Navbar and Footer don't link to `/guides`, which means:
- No internal link equity flowing to guide pages
- Users can't find guides without typing URL directly
- Reduces SEO effectiveness

### Solution

**File 1: `src/components/landing/Navbar.tsx`**
Add "Guides" to the navigation links:

```typescript
const navLinks = [
  { label: "What's Inside", href: "#product" },
  { label: "Guides", href: "/guides", isRoute: true }, // NEW
  { label: "FAQ", href: "#faq" },
];
```

Update the nav rendering to handle route vs anchor:
```typescript
{navLinks.map((link) => (
  link.isRoute ? (
    <Link key={link.label} to={link.href} className="...">
      {link.label}
    </Link>
  ) : (
    <a key={link.label} href={link.href} className="...">
      {link.label}
    </a>
  )
))}
```

**File 2: `src/components/landing/Footer.tsx`**
Add "Guides" link between Privacy and Disclaimer:

```typescript
<Link to="/guides" className="text-purple-200/60 hover:text-purple-300 transition-colors">
  Guides
</Link>
```

---

## Architecture Summary

After fixes:
```text
Homepage (/)
    │
    ├── Navbar ──────> /guides (hub)
    │                     │
    │                     ├── /guides/bpc-157-complete-guide
    │                     ├── /guides/peptides-fda-legal-status-2026
    │                     ├── /guides/are-peptides-safe
    │                     ├── /guides/bpc-157-vs-tb-500
    │                     ├── /guides/semaglutide-complete-guide
    │                     ├── /guides/tirzepatide-vs-semaglutide
    │                     └── /guides/growth-hormone-peptides-guide
    │
    └── Footer ──────> /guides
```

---

## Implementation Checklist

1. **Navbar.tsx** - Add Guides link that uses React Router
2. **Footer.tsx** - Add Guides link between Privacy and Disclaimer
3. **Verify mobile menu** - Ensure Guides appears in mobile nav

---

## Files to Modify

| File | Change |
|------|--------|
| `src/components/landing/Navbar.tsx` | Add Guides to navLinks, handle routing |
| `src/components/landing/Footer.tsx` | Add Guides link to footer nav |

---

## Current Infrastructure Status

| Component | Status |
|-----------|--------|
| 7 Guide Pages | ✅ Complete |
| Guides Hub Page | ✅ Complete |
| Route Registration | ✅ Complete |
| Schema Markup (Article, FAQ, Breadcrumb) | ✅ Complete |
| Sitemap (static + dynamic) | ✅ Complete |
| robots.txt with AI crawlers | ✅ Complete |
| Quick Answer Boxes | ✅ Complete |
| Internal Linking (RelatedGuides) | ✅ Complete |
| **Navbar/Footer Links** | ❌ Missing |

---

## Expected Outcome

After implementing navigation links:
- Search engines can crawl from homepage to all guides
- Users can discover guides from any page on the site
- Full internal link equity distribution
- Complete SEO infrastructure ready for AI search citations

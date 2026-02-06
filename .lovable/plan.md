
# Critical SEO Fixes Implementation Plan

## Summary

Fix 6 SEO issues without changing any design, layout, or functionality:
1. Replace all `peptideplaybook.com` → `peptideplaybook.org` (292 instances across 13 files)
2. Create OG image that returns 200
3. Add dynamic canonical tags to every page
4. Fix meta description length
5. Enhance 404 page with buttons
6. Verify per-page meta tags use correct domain

---

## FIX 1: Domain References (peptideplaybook.com → peptideplaybook.org)

Found 292 matches in 13 files. Files to update:

| File | Instances | Type |
|------|-----------|------|
| `src/lib/seo.ts` | 1 | SITE_URL constant |
| `index.html` | 1 | JSON-LD schema |
| `public/robots.txt` | 1 | Sitemap URL |
| `public/sitemap.xml` | ~60 | All URL entries |
| `supabase/functions/sitemap/index.ts` | 1 | baseUrl constant |
| `supabase/functions/customer-portal/index.ts` | 1 | fallback origin |
| `src/pages/Privacy.tsx` | 2 | Email addresses |
| `src/pages/Terms.tsx` | 1 | Email address |
| `src/pages/Disclaimer.tsx` | 1 | Email address |
| `src/pages/EditorialPolicy.tsx` | 2 | Email address |
| `src/pages/dashboard/Settings.tsx` | 2 | Email address |
| `src/components/landing/PricingCTA.tsx` | 2 | Email address |
| `src/components/landing/Footer.tsx` | 2 | Email address |

**Key Change in `src/lib/seo.ts`:**
```typescript
export const SITE_URL = "https://peptideplaybook.org";
```

This single change fixes all canonical URLs, OG URLs, and schema URLs generated dynamically.

---

## FIX 2: OG Image Creation

Create `public/og-image.png` (1200x630px):
- Background: #0F172A (dark slate matching site theme)
- "Peptide Playbook" - large white text, centered
- "Evidence-Based Peptide Education" - smaller gray text below

**Update `index.html` meta tags to absolute URLs:**
```html
<meta property="og:image" content="https://peptideplaybook.org/og-image.png" />
<meta name="twitter:image" content="https://peptideplaybook.org/og-image.png" />
```

**Update `src/components/seo/SEOHead.tsx`** to generate absolute OG image URLs:
```typescript
const ogImage = image 
  ? (image.startsWith('http') ? image : `${SITE_URL}${image}`)
  : `${SITE_URL}/og-image.png`;
```

---

## FIX 3: Dynamic Canonical Tags

Currently, `SEOHead` only sets canonical if explicitly passed. Need to auto-set based on current route.

**Create `src/components/seo/RouteCanonical.tsx`:**
```tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export function RouteCanonical() {
  const location = useLocation();
  const canonicalUrl = `https://peptideplaybook.org${location.pathname}`;
  
  return (
    <Helmet>
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
}
```

**Add to `src/App.tsx`** inside BrowserRouter:
```tsx
<RouteCanonical />
```

This ensures every page gets a canonical tag with the correct `.org` domain.

---

## FIX 4: Meta Description Fix

**Update `index.html`:**
```html
<meta name="description" content="Evidence-based peptide education. Understand what peptides are, how they work, and what research says. Cut through the hype." />
<meta property="og:description" content="Evidence-based peptide education. Understand what peptides are, how they work, and what research says. Cut through the hype." />
<meta name="twitter:description" content="Evidence-based peptide education. Understand what peptides are, how they work, and what research says. Cut through the hype." />
```

**Update `src/lib/seo.ts`:**
```typescript
export const SITE_DESCRIPTION = "Evidence-based peptide education. Understand what peptides are, how they work, and what research says. Cut through the hype.";
```

---

## FIX 5: Enhanced 404 Page

**Update `src/pages/NotFound.tsx`:**
```tsx
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, BookOpen } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center max-w-md px-4">
        <h1 className="mb-4 text-6xl font-bold text-foreground">404</h1>
        <h2 className="mb-2 text-2xl font-semibold">Page Not Found</h2>
        <p className="mb-8 text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/guides">
              <BookOpen className="mr-2 h-4 w-4" />
              Browse Guides
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
```

The 404 route already exists at line 201 in App.tsx: `<Route path="*" element={<NotFound />} />`

---

## FIX 6: Per-Page Meta Tags Verification

Guides already use `GuideLayout` which calls `SEOHead` with proper title, description, and canonical. Once `SITE_URL` is changed to `.org`, all guide pages will automatically use the correct domain.

**Current flow:**
1. Guide page passes `slug` to `GuideLayout`
2. `GuideLayout` calls `SEOHead` with `canonical={/guides/${slug}}`
3. `SEOHead` calls `getCanonicalUrl()` which uses `SITE_URL`
4. `SITE_URL` now points to `peptideplaybook.org`

No additional changes needed for guides - the SITE_URL fix propagates automatically.

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/lib/seo.ts` | Change SITE_URL + SITE_DESCRIPTION |
| `index.html` | Fix meta description, OG image URLs, JSON-LD schema URL |
| `public/robots.txt` | Change sitemap URL to .org |
| `public/sitemap.xml` | Replace all .com → .org |
| `public/og-image.png` | Create new file (1200x630px) |
| `src/components/seo/SEOHead.tsx` | Ensure absolute OG image URLs |
| `src/components/seo/RouteCanonical.tsx` | Create new component |
| `src/App.tsx` | Add RouteCanonical component |
| `src/pages/NotFound.tsx` | Add buttons and improve copy |
| `supabase/functions/sitemap/index.ts` | Change baseUrl to .org |
| `supabase/functions/customer-portal/index.ts` | Change fallback origin to .org |
| `src/pages/Privacy.tsx` | Change email domain |
| `src/pages/Terms.tsx` | Change email domain |
| `src/pages/Disclaimer.tsx` | Change email domain |
| `src/pages/EditorialPolicy.tsx` | Change email domain |
| `src/pages/dashboard/Settings.tsx` | Change email domain |
| `src/components/landing/PricingCTA.tsx` | Change email domain |
| `src/components/landing/Footer.tsx` | Change email domain |

---

## Verification Checklist

After implementation:
- `grep -r "peptideplaybook.com"` returns 0 results
- `/og-image.png` returns 200
- View source shows `rel="canonical"` with `.org` domain
- Guide pages have unique title + description + canonical
- `/asdfasdf` shows 404 page with buttons
- Meta description is 152 characters
- `sitemap.xml` shows all `.org` URLs

---

## What Will NOT Change

- Any design, colors, fonts, spacing, or layout
- Any page content or copy (except 404 improvement)
- Any functionality (chatbot, quiz, auth, payment)
- Number or structure of pages
- Navigation structure

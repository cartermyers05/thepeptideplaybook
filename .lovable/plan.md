

# SEO/AEO Infrastructure Fixes

## Summary of What's Already In Place
Most of the requested infrastructure already exists. Here's the gap analysis:

| Task | Status | Action Needed |
|------|--------|---------------|
| Task 1: Fix meta description in index.html | Needs update | Change description in 3 places |
| Task 2: react-helmet-async + per-page meta | 90% done | Update Guides.tsx title/desc, update PeptideCalculator title/desc |
| Task 3: Article JSON-LD on guides | Already done | Update dates from 2025 to 2026 |
| Task 4: FAQ schema on guides | Already done | No changes needed |
| Task 5: Breadcrumb schema on guides | Already done | No changes needed |
| Task 6: llms.txt | Missing | Create new file |
| Task 7: noscript fallback | Missing | Add to index.html |
| Task 8: Sitemap lastmod dates | Needs update | Change all dates to 2026-02-20 |

---

## Changes

### 1. `index.html` -- Update meta description (3 places) + add noscript block
- Line 9: Change `<meta name="description">` to: "AI-powered peptide research tool backed by 500+ published studies. Get personalized evidence ratings for semaglutide, BPC-157, tirzepatide, and 45+ compounds."
- Line 17: Change `og:description` to match
- Line 25: Change `twitter:description` to match
- After `<div id="root"></div>`, add the full noscript block with heading, description, guide links, and disclaimer text

### 2. `src/pages/Guides.tsx` -- Update SEOHead title and description
- Change title to: "Peptide Research Library -- Evidence-Based Guides | Peptide Playbook"
- Change description to: "Browse 50+ evidence-based peptide guides. Research ratings, dosing data, and legal status for semaglutide, BPC-157, tirzepatide, GHK-Cu, and more."

### 3. `src/pages/tools/PeptideCalculator.tsx` -- Update ToolLayout title and description
- Change title to: "Peptide Reconstitution Calculator | Peptide Playbook"
- Change description to: "Free peptide reconstitution and dosing calculator. Calculate exact doses for any vial size and concentration."

### 4. `src/components/guides/GuideLayout.tsx` -- Fix stale dates in Article schema
- Change `datePublished` from `"2025-01-15"` to `"2026-01-15"`
- Change `dateModified` from `"2025-02-12"` to `"2026-02-20"`
- Change visible text "Last updated: February 2025" to "Last updated: February 2026"

### 5. `public/llms.txt` -- Create new file
New file with site description, key pages, guide topics, about section, and contact info as specified.

### 6. `public/sitemap.xml` -- Update all lastmod dates
Change all `2026-02-12` and `2026-02-18` dates to `2026-02-20`.

### 7. `src/lib/seo.ts` -- Update SITE_DESCRIPTION constant
Change to match the new meta description so the fallback is consistent: "AI-powered peptide research tool backed by 500+ published studies. Get personalized evidence ratings for semaglutide, BPC-157, tirzepatide, and 45+ compounds."

---

## What This Does NOT Change
- No visual design, layout, colors, fonts, or styling changes
- No navigation changes
- No landing page content changes
- No quiz, dashboard, or auth changes
- No Stripe or backend changes
- No new routes or components removed

## Files Modified
1. `index.html` -- meta descriptions + noscript block
2. `src/pages/Guides.tsx` -- SEOHead title/description
3. `src/pages/tools/PeptideCalculator.tsx` -- ToolLayout title/description
4. `src/components/guides/GuideLayout.tsx` -- date fixes
5. `src/lib/seo.ts` -- SITE_DESCRIPTION constant
6. `public/sitemap.xml` -- lastmod dates

## Files Created
1. `public/llms.txt`

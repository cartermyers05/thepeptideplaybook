
# Add SEO Crawlability Infrastructure

## Current State
The site already has significant SEO infrastructure in place:
- A static `public/sitemap.xml` with all guide URLs
- A dynamic sitemap edge function for articles/news
- A `public/robots.txt` with detailed crawler rules
- `SEOHead` component used on every guide page (via `GuideLayout`) and the homepage
- `RouteCanonical` component for canonical tags on every route

Most of what you requested is already working. Here are the specific gaps to fill:

## Changes

### 1. Update robots.txt (minor tweak)
**File:** `public/robots.txt`

Add `Disallow: /dashboard` (currently only disallows `/chat`, `/history`, `/saved`, `/stats`, etc. individually but not the `/dashboard` prefix). The rest of the requested rules are already present.

### 2. Update sitemap.xml with correct date
**File:** `public/sitemap.xml`

Update all `<lastmod>` dates from `2026-02-05` / `2026-02-06` to `2026-02-12`. Add `/quiz` entry (priority 0.7) if not already present. All guide URLs, homepage, `/guides`, and `/pricing` are already listed.

### 3. Add explicit "index, follow" meta tag to guide pages
**File:** `src/components/seo/SEOHead.tsx`

Add `<meta name="robots" content="index, follow">` when `noIndex` is false (the default). Currently the component only sets a robots meta tag when `noIndex` is true.

### 4. Update homepage title and description
**File:** `src/pages/Index.tsx`

Change the `SEOHead` props to match the requested copy:
- title: "Peptide Playbook -- Personalized, Research-Backed Peptide Protocols"
- description: "Stop guessing about peptides. Take a 60-second quiz and get a personalized, research-backed protocol matched to your goals. Based on 500+ peer-reviewed studies."

### 5. Add OG "article" type to guide pages
**File:** `src/components/guides/GuideLayout.tsx`

The `SEOHead` component already sets `og:type` to "article" when an `article` prop is passed. Since `GuideLayout` doesn't pass an `article` prop, guides get `og:type: "website"` instead of `"article"`. Fix by passing an article-shaped object or adding dedicated OG props.

## What Already Works (no changes needed)
- Every guide page already gets `<title>`, `<meta description>`, `<link canonical>`, `<og:title>`, `<og:description>`, and `<og:url>` via `GuideLayout` -> `SEOHead`
- The sitemap already lists all 35+ guide URLs, homepage, /guides, /pricing
- robots.txt already allows all major AI and search engine crawlers

## Files Modified

| File | Change |
|------|--------|
| `public/robots.txt` | Add `Disallow: /dashboard` line |
| `public/sitemap.xml` | Update lastmod dates to 2026-02-12; add /quiz entry |
| `src/components/seo/SEOHead.tsx` | Add explicit `index, follow` robots meta tag |
| `src/pages/Index.tsx` | Update homepage title and description |
| `src/components/guides/GuideLayout.tsx` | Pass article metadata so og:type becomes "article" |
| `supabase/functions/sitemap/index.ts` | Add /quiz to the static pages list |


# Google Indexing Fix Plan

## The Core Problem
Google sees an empty `<div id="root"></div>` because this is a client-side React app (SPA). While we can't add server-side rendering within this stack, we CAN fix everything that's within our control to maximize what Google's JavaScript renderer picks up.

## What's Already Working
- `react-helmet-async` is installed and the `SEOHead` component sets unique titles/descriptions on most pages
- `GuideLayout` handles structured data (Article JSON-LD) for all guide pages
- Footer and Navbar already use `<Link>` components
- `sitemap.xml` and `robots.txt` exist
- `RouteCanonical` provides canonical URLs

## What's Broken

### Issue 1: 15 Guide Pages Have No Routes (Biggest Win)
15 fully-built guide pages exist as code files but are **not registered in the router** -- they are completely unreachable. This alone could explain many of the 39 "not indexed" pages if they were previously linked or in the sitemap.

### Issue 2: Homepage Title in `index.html` is Generic
The hardcoded `<title>` in `index.html` says "Peptide Playbook AI -- Finally Understand Peptides Without the TikTok Confusion" which is the fallback title Google sees. The React Helmet title should override it, but updating the HTML fallback is still important.

### Issue 3: Sitemap Missing Many Guides
The sitemap is missing the 15 unrouted guides plus a few others. It also lacks some public pages.

### Issue 4: Some Public Page Buttons Use `navigate()` Instead of `<Link>`
The `ArticleDetail` page has `onClick={() => navigate("/articles")}` buttons, which Google can't follow.

---

## Changes

### 1. Update `index.html` -- Better fallback title and description
- Change `<title>` to "Peptide Playbook -- Research-Based Peptide Protocols Matched to Your Goal"
- Update `<meta name="description">` to match the requested copy
- Update OG title/description to match

### 2. Update `src/pages/Index.tsx` -- Match requested homepage SEO
- Change SEOHead title to: "Peptide Playbook -- Research-Based Peptide Protocols Matched to Your Goal"
- Change description to the requested copy about the free quiz

### 3. Update `src/pages/Quiz.tsx` -- Match requested quiz SEO
- Change title to: "Free Peptide Quiz -- Find Your Personalized Protocol | Peptide Playbook"
- Change description to: "Answer 5 questions and get matched to the right peptide protocol for your goal. Takes 2 minutes."

### 4. Add 15 Missing Routes to `src/App.tsx`
Add imports and `<Route>` entries for all 15 missing guide pages:

| File | Route |
|------|-------|
| ArePeptidesLegal | `/guides/are-peptides-legal` |
| BPC157GutHealing | `/guides/bpc-157-gut-healing` |
| BPC157SideEffects | `/guides/bpc-157-side-effects` |
| BPC157Tendonitis | `/guides/bpc-157-tendonitis` |
| BPC157WADABanned | `/guides/bpc-157-wada-banned` |
| FindPeptideClinic | `/guides/find-peptide-clinic` |
| GHKCuHairLoss | `/guides/ghk-cu-hair-loss` |
| IpamorelinCJC1295 | `/guides/ipamorelin-cjc-1295` |
| OralVsInjectableBPC157 | `/guides/oral-vs-injectable-bpc-157` |
| PeptideCycling | `/guides/peptide-cycling` |
| PeptideInjectionSites | `/guides/peptide-injection-sites` |
| PeptideQualityTesting | `/guides/peptide-quality-testing` |
| SemaglutideVsTirzepatideWeightLoss | `/guides/semaglutide-vs-tirzepatide-weight-loss` |
| TB500TendonRepair | `/guides/tb-500-tendon-repair` |
| TB500vsBPC157 | `/guides/tb-500-vs-bpc-157` |

### 5. Update `public/sitemap.xml` -- Add All Missing URLs
Add entries for all 15 newly-routed guides plus any other missing public pages (blog, free-guide, quiz/results, course preview).

### 6. Fix `navigate()` to `<Link>` in `src/pages/ArticleDetail.tsx`
Convert the two `onClick={() => navigate("/articles")}` buttons to use `<Link to="/articles">` wrapping pattern.

### 7. Add Missing Guides to `src/pages/Guides.tsx` Index
Add the 15 missing guides to the `guides` array so they appear in the guide listing page and are crawlable via internal links.

### 8. Update `public/robots.txt`
Already looks good. No changes needed.

### 9. No changes to styling, layout, dashboard, auth, or payments
All changes are strictly additive SEO fixes: meta tags, routes, sitemap entries, and link components.



# AEO Master Plan — Implementation Scope

## What I CAN implement (code changes inside Lovable)

Your AEO plan is thorough. The core blocker — React SPA invisibility to crawlers — requires an external prerendering service (lovablehtml.com or similar) which I cannot set up for you. But I can implement everything else that maximizes your readiness the moment crawlers can see the content.

Here is what I will implement across the codebase:

---

## 1. Expand llms.txt with all guide URLs

Current `llms.txt` lists only 3 key pages and vague topic descriptions. The AEO plan specifies a comprehensive version with direct links to all top guides. I will rewrite `public/llms.txt` to include every guide URL, making it a complete discovery file for AI models.

## 2. Add missing FAQ schemas to top 10 guides

These guides have `faqItems` arrays but are NOT passing `faqSchema` to `GuideLayout`:

- `BestPeptidesWeightLoss.tsx` — has 8 FAQ items, no schema
- `WhatArePeptides.tsx` — has 10 FAQ items, no schema
- `HGHFragmentGuide.tsx` — has FAQ items, no schema

I will generate `faqSchema` objects and pass them to `GuideLayout` for all three.

## 3. Add answer-first opening paragraphs to top 10 guides

The AEO plan provides specific answer-first openings for guides 1-10. Currently, most guides open with contextual background instead of directly answering the primary search query. I will replace the opening paragraphs on:

1. `/guides/best-peptides-weight-loss` — add direct answer about tirzepatide/semaglutide ranking
2. `/guides/bpc-157-complete-guide` — add direct answer about what BPC-157 is and its FDA status
3. `/guides/what-are-peptides` — add direct answer defining peptides with examples
4. `/guides/tirzepatide-vs-semaglutide` — add direct answer with head-to-head data
5. `/guides/peptides-fda-legal-status-2026` — add direct answer about legal status variance
6. `/guides/semaglutide-complete-guide` — add direct answer about what semaglutide is
7. `/guides/bpc-157-side-effects` — add direct answer about common side effects
8. `/guides/semaglutide-side-effects` — add direct answer about GI side effects
9. `/guides/bpc-157-vs-tb-500` — add direct answer about mechanism differences
10. `/guides/semaglutide-dosing` — add direct answer about titration schedule

## 4. Add missing FAQ items to guides with fewer than 5

The AEO plan specifies 5-8 FAQ items per guide. Guides currently short:
- `BPC157vsTB500Guide` — 3 FAQs (need 5+)
- `FDALegalStatusGuide` — 3 FAQs (need 5+)
- `TirzepatideVsSemaglutideGuide` — 3 FAQs (need 5+)
- `SemaglutideGuide` — 4 FAQs (need 5+)
- `BPC157Guide` — 4 FAQs (need 5+)

I will add the specific FAQ items from the AEO plan to each.

## 5. Add contextual quiz CTAs with peptide-specific copy

The AEO plan specifies personalized quiz CTAs per guide (e.g., "Not sure which weight loss peptide matches your goals? Take the 60-second quiz"). Currently `GuideCTA` uses generic copy. I will add peptide-specific quiz CTA text to each of the top 10 guides.

## 6. Improve internal linking on top 10 guides

Several guides have 3 related guides; the AEO plan specifies 3-5 cross-links. I will update `relatedGuides` arrays to match the recommended internal link structure.

## 7. Add all missing guide URLs to sitemap

The sitemap edge function is missing many guide routes. Currently 17 guide paths are listed. There are 40+ guide pages. I will add every guide route to the sitemap with appropriate priority and changefreq values.

## 8. Update homepage SEO meta

The AEO plan specifies:
- Title: "Peptide Playbook — AI-Powered Peptide Education Platform"
- Description: "Research-backed peptide guides powered by AI..."

Current title is close but description can be improved.

## 9. Update dateModified to 2026-02-27 on all top 10 guide schemas

Several guides have stale `dateModified` values. AI models weight recency. I will update all Article schema `dateModified` to today's date.

---

## What you must do OUTSIDE Lovable

These items from your plan require external action:

1. **Prerendering service** — Sign up at lovablehtml.com or similar. This is the #1 blocker. Without it, none of the schema/content work matters to crawlers.
2. **Bing Webmaster Tools** — Submit site at bing.com/webmasters (critical for ChatGPT citations)
3. **Google Search Console** — Request indexing for top 10 URLs
4. **DNS changes** — For prerendering CNAME setup
5. **Weekly citation audits** — Manual testing across ChatGPT, Perplexity, Claude, Google AI Overviews
6. **Reddit backlink strategy** — Manual posting with guide links
7. **HARO/Connectively** — Manual journalist outreach

---

## Technical details

### Files modified (estimated ~15 files)
| File | Changes |
|------|---------|
| `public/llms.txt` | Rewrite with all 30+ guide URLs |
| `supabase/functions/sitemap/index.ts` | Add ~25 missing guide routes |
| `src/pages/Index.tsx` | Update meta description |
| `src/pages/guides/BestPeptidesWeightLoss.tsx` | Answer-first opening, faqSchema, expanded FAQs, updated relatedGuides, dateModified |
| `src/pages/guides/BPC157Guide.tsx` | Answer-first opening, expanded FAQs, relatedGuides, dateModified |
| `src/pages/guides/WhatArePeptides.tsx` | Answer-first opening, faqSchema, relatedGuides, dateModified |
| `src/pages/guides/TirzepatideVsSemaglutideGuide.tsx` | Answer-first opening, expanded FAQs, relatedGuides, dateModified |
| `src/pages/guides/FDALegalStatusGuide.tsx` | Answer-first opening, expanded FAQs, relatedGuides, dateModified |
| `src/pages/guides/SemaglutideGuide.tsx` | Answer-first opening, expanded FAQs, dateModified |
| `src/pages/guides/BPC157SideEffects.tsx` | Answer-first opening, dateModified |
| `src/pages/guides/SemaglutideSideEffects.tsx` | Answer-first opening, dateModified |
| `src/pages/guides/BPC157vsTB500Guide.tsx` | Answer-first opening, expanded FAQs, dateModified |
| `src/pages/guides/SemaglutideDosing.tsx` | Answer-first opening, dateModified |
| `src/pages/guides/HGHFragmentGuide.tsx` | Add faqSchema |

No existing layouts, styling, navigation, or routes are modified. All changes are content and structured data only — strictly additive per the SEO development rule.


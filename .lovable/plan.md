

# Complete Peptide Playbook Website Build - $167

## Overview

This is a comprehensive build to create the complete Peptide Playbook website with all pages, SEO optimization, blog system with 10 seed posts, floating AI chatbot, and legal pages. The price will be updated from $67 to $167 throughout.

---

## Current State Analysis

**Already Built:**
- Landing page with Hero, ProblemSection, WhatsIncluded, FAQ, FinalCTA, Footer
- Articles system (existing at /articles, /articles/[slug])
- AI Chat (existing at /chat - authenticated only)
- Authentication (Login/Signup pages)
- SEO components (SEOHead, ArticleSchema, FAQSchema, BreadcrumbSchema, OrganizationSchema)
- Edge function for chat with comprehensive system prompt
- Sitemap edge function
- robots.txt (exists but needs update)
- Design system (Tailwind config, CSS variables, animations)

**Needs to be Built:**
- New pages: /blog (repurpose /articles), /about, /terms, /privacy, /disclaimer, /thank-you
- Floating AI chatbot on landing page with pre-chat consent modal
- Update pricing from $67 to $167 everywhere
- Update homepage copy per specifications
- Enhanced schema markup on homepage
- 10 seed blog posts in database
- Update sitemap to include new pages

---

## Implementation Plan

### Phase 1: Update Pricing & Homepage Content

**Files to Update:**

| File | Changes |
|------|---------|
| `src/components/landing/Hero.tsx` | Update CTA to "Get Instant Access - $167", update subheadline copy |
| `src/components/landing/FinalCTA.tsx` | Update price to $167, update copy |
| `src/components/landing/WhatsIncluded.tsx` | Update features to match specification |
| `src/components/landing/ProblemSection.tsx` | Update problem points per spec |
| `src/components/landing/FAQ.tsx` | Update FAQs to match specification |
| `src/components/landing/Footer.tsx` | Add About, Blog, Contact links |
| `src/pages/Signup.tsx` | Update trial text to $167 pricing |

### Phase 2: New Static Pages

**Files to Create:**

| File | Description |
|------|-------------|
| `src/pages/About.tsx` | About page with mission, what we do, commitment |
| `src/pages/Terms.tsx` | Terms of Service page |
| `src/pages/Privacy.tsx` | Privacy Policy page |
| `src/pages/Disclaimer.tsx` | Medical Disclaimer page |
| `src/pages/ThankYou.tsx` | Purchase confirmation page |
| `src/pages/Blog.tsx` | Blog index (similar to Articles but at /blog route) |
| `src/pages/BlogPost.tsx` | Individual blog post (similar to ArticleDetail at /blog/[slug]) |

**Route Updates in App.tsx:**
- Add `/about` route
- Add `/terms` route
- Add `/privacy` route  
- Add `/disclaimer` route
- Add `/thank-you` route
- Add `/blog` route
- Add `/blog/:slug` route

### Phase 3: Floating AI Chatbot

**Files to Create:**

| File | Description |
|------|-------------|
| `src/components/chat/FloatingChatButton.tsx` | Fixed-position chat trigger button |
| `src/components/chat/ChatWidget.tsx` | Chat window component (380px wide) |
| `src/components/chat/ChatConsentModal.tsx` | Pre-chat legal consent modal |
| `src/components/chat/PublicChatInterface.tsx` | Simplified chat for public use (no auth required) |

**Integration:**
- Add FloatingChatButton to Index.tsx (landing page only)
- Store consent in localStorage
- Rate limit: 25 messages per session, 2-second cooldown

### Phase 4: Enhanced SEO & Schema

**Files to Create:**

| File | Description |
|------|-------------|
| `src/components/seo/ProductSchema.tsx` | Product schema for $167 offering |
| `src/components/seo/HomepageSchemas.tsx` | Combined Product + FAQ + Organization schemas |

**Files to Update:**

| File | Changes |
|------|---------|
| `src/lib/seo.ts` | Update SITE_URL to peptideplaybook.com |
| `public/robots.txt` | Update with full AI crawler allowances and correct sitemap URL |
| `src/pages/Index.tsx` | Add HomepageSchemas with Product, FAQ, Organization markup |

### Phase 5: Blog System

**Approach:** Repurpose the existing `/articles` system for `/blog` with updated styling and routes.

**Files to Create:**

| File | Description |
|------|-------------|
| `src/pages/Blog.tsx` | Blog index with grid layout, search, filters |
| `src/pages/BlogPost.tsx` | Individual blog post template with TL;DR, TOC, CTA |
| `src/components/blog/BlogCard.tsx` | Blog post card component |
| `src/components/blog/BlogCTA.tsx` | "Get the Peptide Playbook" CTA for blog posts |
| `src/components/blog/TableOfContents.tsx` | Auto-generated TOC from H2s |
| `src/components/blog/KeyTakeaways.tsx` | Key takeaways box component |

### Phase 6: Seed Blog Content

**Database Migration:** Insert 10 seed blog posts into the `articles` table:

1. "What is BPC-157? Complete Research Guide 2026" - /blog/what-is-bpc-157
2. "BPC-157 vs TB-500: Research Comparison" - /blog/bpc-157-vs-tb-500
3. "Semaglutide Explained: How It Works, Side Effects, What to Know" - /blog/semaglutide-guide
4. "FDA Peptide Regulations 2026: What's Legal, What's Not" - /blog/fda-peptide-regulations
5. "Peptides for Recovery: What the Research Actually Shows" - /blog/peptides-for-recovery
6. "How to Talk to Your Doctor About Peptides" - /blog/talk-to-doctor-about-peptides
7. "Red Flags When Buying Peptides: How to Spot Bad Sources" - /blog/peptide-source-red-flags
8. "Ipamorelin and CJC-1295: Research Guide" - /blog/ipamorelin-cjc-1295-guide
9. "Tirzepatide vs Semaglutide: Differences Explained" - /blog/tirzepatide-vs-semaglutide
10. "What Does FDA Category 2 Mean for Peptides?" - /blog/fda-category-2-peptides

Each post will include:
- Title (as exact question for H1)
- TL;DR (direct answer in first 100 words)
- Full markdown content with H2/H3 structure
- FAQ section (structured_answer JSON)
- Target keywords
- Meta description
- Author: "Peptide Playbook" with credential

### Phase 7: Update Edge Functions

**Files to Update:**

| File | Changes |
|------|---------|
| `supabase/functions/sitemap/index.ts` | Add /about, /terms, /privacy, /disclaimer, /blog routes |
| `supabase/functions/chat/index.ts` | Update system prompt to match specification exactly |

---

## Technical Details

### Floating Chat Implementation

```text
Position: Fixed bottom-right (24px from edges)
Size: 56px diameter button
Window: 380px wide, 520px tall on desktop
Mobile: Full width, 70vh height
```

### Chat Consent Flow

```text
1. User clicks chat button
2. Check localStorage for consent
3. If no consent -> Show consent modal
4. User checks acknowledgment and clicks "I Understand"
5. Store consent in localStorage
6. Open chat window with welcome message
```

### Rate Limiting (Client-side)

```text
- Max 25 messages per session (stored in sessionStorage)
- 2-second cooldown between sends
- Show friendly message when limit reached
```

### SEO Schema Structure

```text
Homepage will include:
1. Product schema (@type: Product, price: 167, rating: 4.9)
2. FAQ schema (5 questions from landing page)
3. Organization schema (name, URL, logo, social links)
```

---

## File Changes Summary

### New Files (17)

| Path | Purpose |
|------|---------|
| `src/pages/About.tsx` | About page |
| `src/pages/Terms.tsx` | Terms of Service |
| `src/pages/Privacy.tsx` | Privacy Policy |
| `src/pages/Disclaimer.tsx` | Medical Disclaimer |
| `src/pages/ThankYou.tsx` | Purchase confirmation |
| `src/pages/Blog.tsx` | Blog index |
| `src/pages/BlogPost.tsx` | Blog post template |
| `src/components/chat/FloatingChatButton.tsx` | Chat trigger |
| `src/components/chat/ChatWidget.tsx` | Chat window |
| `src/components/chat/ChatConsentModal.tsx` | Pre-chat consent |
| `src/components/chat/PublicChatInterface.tsx` | Public chat UI |
| `src/components/blog/BlogCard.tsx` | Blog card |
| `src/components/blog/BlogCTA.tsx` | Blog CTA |
| `src/components/blog/TableOfContents.tsx` | TOC component |
| `src/components/blog/KeyTakeaways.tsx` | Takeaways box |
| `src/components/seo/ProductSchema.tsx` | Product JSON-LD |
| `src/components/seo/HomepageSchemas.tsx` | Combined schemas |

### Updated Files (12)

| Path | Changes |
|------|---------|
| `src/App.tsx` | Add new routes |
| `src/pages/Index.tsx` | Add schemas, add FloatingChatButton |
| `src/components/landing/Hero.tsx` | Update copy, price to $167 |
| `src/components/landing/FinalCTA.tsx` | Update price to $167 |
| `src/components/landing/WhatsIncluded.tsx` | Update features |
| `src/components/landing/ProblemSection.tsx` | Update problem points |
| `src/components/landing/FAQ.tsx` | Update FAQ content |
| `src/components/landing/Footer.tsx` | Add new page links |
| `src/pages/Signup.tsx` | Update pricing references |
| `src/lib/seo.ts` | Update SITE_URL |
| `public/robots.txt` | Full AI crawler rules |
| `supabase/functions/sitemap/index.ts` | Add new pages |

### Database Changes

- Insert 10 seed blog posts into `articles` table

---

## Design Consistency

All new pages will:
- Use existing Tailwind config colors and typography
- Use existing animation patterns (Framer Motion)
- Use existing component library (shadcn/ui)
- Match the clean, premium health-tech aesthetic
- Use the violet primary color (#8B5CF6)
- Use Inter font family
- Use glass-card-subtle for elevated surfaces

---

## Deliverables Checklist

1. Homepage with $167 pricing and updated copy
2. Blog system at /blog with 10 seed posts
3. Individual blog post template with TL;DR, TOC, CTA
4. About page
5. Terms of Service page
6. Privacy Policy page
7. Medical Disclaimer page
8. Thank You page
9. Floating AI chatbot with consent modal
10. Full SEO schema markup
11. Updated robots.txt for AI crawlers
12. Updated sitemap including all pages


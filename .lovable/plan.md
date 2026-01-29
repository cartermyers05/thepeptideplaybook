
# Rename to Peptide Playbook AI

## Summary

Update all brand name references from "Peptide Playbook" and "PeptideGPT" to "Peptide Playbook AI" to emphasize the AI-powered nature of the platform.

---

## Files to Modify

### Core SEO & Meta Files

| File | Changes |
|------|---------|
| `src/lib/seo.ts` | Update `SITE_NAME` constant and `DEFAULT_AUTHOR.name` |
| `index.html` | Update title, meta tags, and Open Graph tags |

### Landing Page Components

| File | Changes |
|------|---------|
| `src/components/landing/Navbar.tsx` | Line 38: Update wordmark text |
| `src/components/landing/Footer.tsx` | Lines 9, 34, 38: Update footer brand references |
| `src/components/landing/HeroSection.tsx` | Line 55: Update hero title |
| `src/components/landing/FAQ.tsx` | Line 12: Update FAQ answer |
| `src/components/landing/SolutionSection.tsx` | Line 83: Update solution text |

### Dashboard Components

| File | Changes |
|------|---------|
| `src/components/dashboard/DashboardSidebar.tsx` | Line 58: Update sidebar header |
| `src/components/dashboard/DashboardHeader.tsx` | Line 36: "PeptideGPT" to "Peptide Playbook AI" |
| `src/components/dashboard/ComplianceModal.tsx` | Line 107: "PeptideGPT" to "Peptide Playbook AI" |

### Page Files

| File | Changes |
|------|---------|
| `src/pages/Login.tsx` | Line 53: "PeptideGPT" to "Peptide Playbook AI" |
| `src/pages/Saved.tsx` | Line 92: "PeptideGPT" to "Peptide Playbook AI" |
| `src/pages/Stats.tsx` | Line 91: "PeptideGPT" to "Peptide Playbook AI" |
| `src/pages/History.tsx` | Line 107: "PeptideGPT" to "Peptide Playbook AI" |
| `src/pages/Referral.tsx` | Update brand references |
| `src/pages/About.tsx` | Lines 11-12, 25, 42: Update page title and content |
| `src/pages/Blog.tsx` | Line 23: Update SEO title |
| `src/pages/Pricing.tsx` | Lines 53, 80-81: Update FAQ and SEO |
| `src/pages/Terms.tsx` | Update all legal references |
| `src/pages/Privacy.tsx` | Lines 10-11: Update SEO tags |

### Other Components

| File | Changes |
|------|---------|
| `src/components/chat/ChatWidget.tsx` | Line 21: Update welcome message |
| `src/components/blog/BlogCTA.tsx` | Lines 24, 30: Update CTA text |
| `src/components/seo/HomepageSchemas.tsx` | Lines 10, 14: Update Product schema |
| `src/components/seo/OrganizationSchema.tsx` | Uses SITE_NAME constant (auto-updated) |

---

## Technical Details

### Primary Constant Update
The `SITE_NAME` in `src/lib/seo.ts` will be updated:
```typescript
// Before
export const SITE_NAME = "Peptide Playbook";

// After
export const SITE_NAME = "Peptide Playbook AI";
```

This automatically updates:
- All SEO components using the constant
- Organization schema
- Homepage schemas

### Manual Updates Required
Hardcoded strings in ~20 files need direct replacement:
- "Peptide Playbook" -> "Peptide Playbook AI"
- "PeptideGPT" -> "Peptide Playbook AI"

---

## Result

After this update:
- All navigation headers will show "Peptide Playbook AI"
- SEO meta tags will reflect the AI branding
- Landing page and dashboard will consistently use the new name
- Users will immediately understand AI is a core feature

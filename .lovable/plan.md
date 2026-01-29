
# Remove Em Dashes from Landing Page

## Summary
Remove all "—" (em dash) characters from the landing page copy and replace with natural alternatives like periods, commas, or restructured sentences.

---

## Files to Update

### 1. `src/components/landing/HeroSection.tsx`

| Line | Current | New |
|------|---------|-----|
| 62 | `— Data-Backed Research, Made Simple` | `Data-Backed Research, Made Simple` |
| 71-73 | `...latest peptide science — breaking news...` | `...latest peptide science: breaking news...` |
| 83 | `Get Full Access — $67` | `Get Full Access` |

### 2. `src/components/landing/SolutionSection.tsx`

| Line | Current | New |
|------|---------|-----|
| 69 | `...about — not what some guy on Reddit thinks` | `...about. Not what some guy on Reddit thinks` |
| 87-89 | `...telling you what to take. It's giving you the education you need to stop guessing and start understanding — so you can make informed decisions...` | `...telling you what to take. It's giving you the education you need to stop guessing and start understanding, so you can make informed decisions...` |
| 95 | `Get Full Access — $67` | `Get Full Access` |

### 3. `src/components/landing/SocialProof.tsx`

| Line | Current | New |
|------|---------|-----|
| 58 | `...rabbit hole — TikTok videos...` | `...rabbit hole. TikTok videos...` |
| 66 | `...what's actually going on — so you can make...` | `...what's actually going on so you can make...` |

### 4. `src/components/landing/ProductPreview.tsx`

| Line | Current | New |
|------|---------|-----|
| 9 | `...peptide category — GLP-1s...` | `...peptide category: GLP-1s...` |
| 33 | `...look like — and what sketchy ones do.` | `...look like and what sketchy ones do.` |
| 92 | `Everything you need to understand peptides — in one place.` | `Everything you need to understand peptides. All in one place.` |

### 5. `src/components/landing/PricingCTA.tsx`

| Line | Current | New |
|------|---------|-----|
| 39 | `Everything you need to understand peptides — one price...` | `Everything you need to understand peptides. One price...` |

### 6. `src/components/landing/FloatingCTA.tsx`

| Line | Current | New |
|------|---------|-----|
| 25 | `Get Full Access — $67` | `Get Full Access` |

---

## Other Files (Secondary Priority)

### 7. `src/pages/Index.tsx`
- Line 22: SEO title uses em dash

### 8. `src/pages/Pricing.tsx`
- Lines 49, 61, 80, 192: FAQ answers and CTA buttons

### 9. `src/components/chat/ChatWidget.tsx`
- Lines 21, 29: Chat welcome message

### 10. `src/components/dashboard/UpgradePrompt.tsx`
- Lines 21, 26: Upgrade prompt copy

### 11. `src/components/blog/BlogCTA.tsx`
- Lines 24, 30: Blog CTA copy

### 12. `src/components/landing/ExitIntentPopup.tsx`
- Line 96: Popup copy

---

## Replacement Strategy

| Original | Replacement |
|----------|-------------|
| `— ` at start of new thought | Remove or use `.` |
| `text — text` (clarification) | Use `:` or `,` |
| `text — text` (contrast) | Use `.` to split into two sentences |
| `CTA — $67` | Just `CTA` (cleaner) |

This removes the AI writing pattern while keeping copy readable and natural.

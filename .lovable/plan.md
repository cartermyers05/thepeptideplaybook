
# Fix News Article Display: Clean Gibberish Content

## Problem Identified

The news articles are scraped from external websites using Firecrawl and stored with raw markdown content that includes:
- Navigation boilerplate (`[Skip to navigation]`, `[Skip to main content]`)
- Base64 encoded images that render as garbage text
- Tracking URLs with long parameter strings
- Website-specific UI elements ("Story Continues", image captions repeated)
- Press release headers with location/date stamps

This raw content is then rendered directly via `dangerouslySetInnerHTML` in the `ArticleContent` component, making the articles look messy and unprofessional.

---

## Solution: Two-Pronged Approach

### 1. Frontend Sanitization (Immediate Fix)
Create a utility function to clean markdown/HTML content before display:
- Strip navigation links and boilerplate patterns
- Remove base64 image references
- Clean up tracking URLs
- Remove duplicate headers and captions

### 2. Enhanced Summary Display
Redesign the `NewsSummary` component to be more visually appealing with:
- Better typography and spacing
- Gradient background accent
- Proper markdown rendering (not just plain text)

---

## Technical Changes

| File | Change |
|------|--------|
| `src/lib/contentSanitizer.ts` | New utility to clean scraped content |
| `src/components/dashboard/NewsSummary.tsx` | Enhanced design with markdown support |
| `src/components/articles/ArticleContent.tsx` | Use sanitizer before rendering; switch to ReactMarkdown |
| `src/pages/NewsDetail.tsx` | Apply sanitization to content |

---

## Implementation Details

### Content Sanitizer (`src/lib/contentSanitizer.ts`)

```typescript
export function sanitizeNewsContent(content: string): string {
  let cleaned = content
    // Remove skip navigation links
    .replace(/\[Skip to [^\]]+\]\([^)]+\)/g, '')
    // Remove base64 images
    .replace(/!\[[^\]]*\]\(<Base64-Image-Removed>\)/g, '')
    .replace(/!\[[^\]]*\]\(data:image[^)]+\)/g, '')
    // Remove "Story Continues" and similar boilerplate
    .replace(/^Story Continues$/gm, '')
    // Clean up excessive whitespace
    .replace(/\n{3,}/g, '\n\n')
    // Remove press release headers at start
    .replace(/^.*ACCESS Newswire.*$/gm, '')
    // Remove tracking URLs (keep display text)
    .replace(/\[([^\]]+)\]\(https:\/\/www\.globenewswire\.com\/Tracker[^)]+\)/g, '$1');
  
  return cleaned.trim();
}
```

### NewsSummary Component Enhancement

Redesign with:
- Subtle gradient border accent on the left
- Better icon placement
- Support for longer, formatted summaries
- Smooth entrance animation

```text
Before:
┌─────────────────────────────────┐
│ 📄 Summary                       │
│ Plain text paragraph...          │
└─────────────────────────────────┘

After:
┌─────────────────────────────────┐
│                                  │
│ ┃ 📄 Key Takeaways              │ (gradient accent bar)
│ ┃                                │
│ ┃ • Clean, formatted summary    │
│ ┃ • Key points highlighted      │
│ ┃ • Professional typography     │
│                                  │
└─────────────────────────────────┘
```

### ArticleContent Improvements

- Replace `dangerouslySetInnerHTML` with `ReactMarkdown` for safer rendering
- Apply content sanitizer before rendering
- Add loading skeleton for better UX

---

## Expected Result

```text
Before:
├── [Skip to navigation](link) [Skip to main content](link)
├── ![image](<Base64-Image-Removed>)
├── TUCSON, AZ / ACCESS Newswire / January 29, 2026 /
├── Story Continues
└── Unreadable mess of tracking URLs

After:
├── Clean, readable headline
├── Well-formatted paragraphs
├── Proper markdown rendering (bold, links, lists)
├── Professional source attribution
└── No gibberish or boilerplate
```

---

## Bonus: Visual Polish

- Add a subtle "AI Summary" badge to differentiate original content
- Implement smooth fade-in animations for content blocks
- Better mobile typography with responsive font sizing

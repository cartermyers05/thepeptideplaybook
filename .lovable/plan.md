

# Fix Scraped Content: Remove Error Messages & Paywall Notices

## Problem Identified

The news articles scraped from Yahoo Finance contain unwanted boilerplate that the current sanitizer doesn't catch:

1. **"Oops, something went wrong"** - Yahoo Finance error message appearing at the very top
2. **"This is a paid press release..."** - Press release disclosure notices
3. **"MARKETS LIVE BLOG"** - Promotional banners with links
4. **Yahoo image links** - Logo images with markdown formatting
5. **"Skip to right column"** - Additional navigation patterns not currently caught

These appear at the top of articles and make them look broken/unprofessional.

---

## Solution

Update the `contentSanitizer.ts` utility to catch these additional patterns specific to Yahoo Finance and press release content.

---

## Technical Changes

| File | Change |
|------|--------|
| `src/lib/contentSanitizer.ts` | Add regex patterns to remove Yahoo-specific errors, paid release notices, and promotional banners |

---

## New Patterns to Add

```typescript
// Yahoo Finance error messages
.replace(/^Oops,?\s*something went wrong\s*$/gim, '')

// Paid press release notices  
.replace(/This is a paid press release\.?\s*Contact the press release distributor directly with any inquiries\.?/gi, '')

// Markets live blog banners (with markdown formatting)
.replace(/\[\*\*MARKETS LIVE BLOG\*\*[^\]]*\]\([^)]+\)/gi, '')

// Skip to right column (missed pattern)
.replace(/\[Skip to right column\]\([^)]+\)/gi, '')

// GlobeNewswire logo images
.replace(/\[!\[[^\]]*\]\([^)]+\)\]\([^)]+\)/g, '') // Linked images
.replace(/!\[[^\]]*\]\(https?:\/\/[^)]*yimg\.com[^)]*\)/g, '') // Yahoo image CDN

// Dateline headers (e.g., "Fri, January 23, 2026 at 7:50 PM EST7 min read")
.replace(/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s*[A-Z][a-z]+\s+\d{1,2},\s*\d{4}\s+at\s+\d{1,2}:\d{2}\s*(AM|PM)\s*[A-Z]{3}\d*\s*min read\s*$/gim, '')

// Duplicate title/source lines (like "Direct Meds" appearing alone)
.replace(/^[A-Za-z\s]{2,30}$/gm, (match) => {
  // Only remove if it looks like a standalone source name
  const sourcePatterns = /^(Direct Meds|GlobeNewswire|Yahoo Finance|Reuters|AP News)$/i;
  return sourcePatterns.test(match.trim()) ? '' : match;
})
```

---

## Expected Result

```text
Before (top of article):
├── "Oops, something went wrong"
├── [Skip to navigation]...
├── "This is a paid press release..."
├── [GlobeNewswire logo image]
├── "Direct Meds"
├── "Fri, January 23, 2026 at 7:50 PM EST7 min read"
└── Actual content starts here...

After (clean):
├── Actual content starts immediately
├── No error messages or notices
├── Professional, clean presentation
└── Proper article formatting
```

---

## Additional Cleanup

Also clean up after sanitization:
- Remove any lines that are now empty after pattern removal
- Ensure content doesn't start with excessive blank lines
- Trim the result to remove leading/trailing whitespace


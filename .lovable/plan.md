

# Remove "Research Sourced From" Section

## Overview
Remove the FeaturedBy component (research sources trust bar) from the landing page.

## Changes Required

### File to Modify
`src/pages/Index.tsx`

### What Will Be Done
1. Remove the import statement for `FeaturedBy` component
2. Remove the `<FeaturedBy />` component from the JSX

### Result
The landing page will flow directly from HeroSection to SocialProof without the research sources section in between.

---

## Technical Details

**Before:**
```
HeroSection → FeaturedBy → SocialProof → ChatbotDemo → ...
```

**After:**
```
HeroSection → SocialProof → ChatbotDemo → ...
```

The `FeaturedBy.tsx` file will remain in the codebase but simply won't be used (can be deleted later if desired).


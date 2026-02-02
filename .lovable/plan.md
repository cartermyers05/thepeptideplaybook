
# Fix "Watch Demo" Button Navigation

## The Problem

The "Watch Demo" button in the Hero section uses a standard HTML anchor tag (`<a href="#demo">`), which doesn't work properly with React Router. When clicked:
- The URL updates to include `#demo`
- But no scrolling happens to the demo section
- The page may appear to do nothing

## The Solution

Replace the anchor tag with a proper onClick handler that uses native JavaScript smooth scrolling.

## Technical Changes

**File: `src/components/landing/HeroSection.tsx`**

Replace lines 81-89:
```tsx
// BEFORE (broken)
<a href="#demo">
  <Button variant="outline" size="lg" ...>
    Watch Demo
  </Button>
</a>

// AFTER (working)
<Button
  variant="outline"
  size="lg"
  className="h-12 px-8 text-base hover-lift border-border/60 bg-background/50 backdrop-blur-sm w-full sm:w-auto"
  onClick={() => {
    document.getElementById('demo')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }}
>
  Watch Demo
</Button>
```

## Why This Works

1. **Native scrolling**: Uses browser's native `scrollIntoView()` API with smooth behavior
2. **No URL change**: Avoids React Router interference by not changing the URL
3. **Reliable**: Works regardless of routing state or page position
4. **Consistent pattern**: Matches the project's existing approach of wrapping buttons in Link components only for actual route changes

## Single File Change

| File | Change |
|------|--------|
| `src/components/landing/HeroSection.tsx` | Replace anchor tag with onClick scroll handler |

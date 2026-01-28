

# News Feed Enhancements

## Overview

Improve the news feed with bigger card sizes, better click interactions, and a prominent "Top Story of the Day" feature for trending content.

---

## Changes

### 1. Bigger News Cards

**File: `src/components/dashboard/NewsCard.tsx`**

Increase sizing across the board:
- Padding: `p-5` to `p-6` (featured: `p-6` to `p-8`)
- Title font: `text-base` to `text-lg` (featured: `text-lg lg:text-xl` to `text-xl lg:text-2xl`)
- Excerpt: Show more lines (`line-clamp-3` to `line-clamp-4`)
- Add "Read Full Article" text next to the external link icon for clearer click affordance

### 2. Top Story of the Day Section

**File: `src/components/dashboard/NewsFeed.tsx`**

Add a prominent "Top Story" hero section at the top:
- Large featured card with gradient accent border
- "Top Story" badge with fire/trending icon
- Bigger image placeholder area (for future use)
- More prominent call-to-action

```text
+--------------------------------------------------+
|  [Fire Icon] TOP STORY TODAY                     |
|                                                   |
|  [Large Title - Much Bigger]                     |
|  [Longer excerpt with more detail]               |
|                                                   |
|  Source • Date           [Read Full Article ->]  |
+--------------------------------------------------+
```

### 3. Grid Layout Adjustments

**File: `src/components/dashboard/NewsFeed.tsx`**

- Increase gap from `gap-4` to `gap-5`
- Top story spans full width on all screens
- Regular cards in 2-column grid on tablet, 3-column on desktop

---

## Technical Details

### NewsCard.tsx Changes

```tsx
// Increased padding
<div className={cn(
  "p-6 flex flex-col h-full",
  featured && "lg:p-8"
)}>

// Bigger title
<h3 className={cn(
  "font-semibold leading-snug mb-3 group-hover:text-primary transition-colors",
  featured ? "text-xl lg:text-2xl" : "text-lg"
)}>

// More visible click prompt
<div className="flex items-center gap-1.5 text-sm text-primary font-medium">
  <span>Read Article</span>
  <ExternalLink className="w-4 h-4" />
</div>
```

### NewsFeed.tsx Changes

Add new TopStoryCard component inline or separate:
- Uses the first featured article or a dedicated "top story" field
- Styled with a subtle purple gradient border
- Trending/fire icon badge
- Full-width layout

```tsx
{/* Top Story Hero */}
<motion.a
  href={topStory.url}
  target="_blank"
  rel="noopener noreferrer"
  className="block mb-8 card-clean border-primary/20 hover:border-primary/40 transition-colors"
>
  <div className="p-8">
    <div className="flex items-center gap-2 mb-4">
      <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium flex items-center gap-1.5">
        <TrendingUp className="w-4 h-4" />
        Top Story Today
      </div>
    </div>
    <h2 className="text-2xl lg:text-3xl font-bold mb-4">{topStory.title}</h2>
    <p className="text-muted-foreground text-base mb-6 line-clamp-3">{topStory.excerpt}</p>
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">{topStory.source} • {topStory.date}</span>
      <div className="flex items-center gap-2 text-primary font-medium">
        Read Full Article
        <ExternalLink className="w-4 h-4" />
      </div>
    </div>
  </div>
</motion.a>
```

---

## Future Enhancement: Real Trending Data

For the "top story" feature to show actual trending content, you'd later connect this to:
- An edge function that fetches from a news API (PubMed, BioSpace, etc.)
- Logic to determine "trending" based on recency + engagement
- Daily refresh mechanism

For now, I'll use the existing featured article as the top story.

---

## Files Modified

1. **`src/components/dashboard/NewsCard.tsx`**
   - Increase padding (p-5 to p-6, featured p-8)
   - Larger typography
   - Add "Read Article" text with icon in footer

2. **`src/components/dashboard/NewsFeed.tsx`**
   - Add Top Story hero section at the top
   - Increase grid gap
   - Adjust featured article to be the "Top Story"

---

## Result

- Cards will be more spacious and easier to read
- Clear "Read Article" prompt makes clickability obvious
- Top Story section gives prominence to trending content
- Professional, magazine-style layout


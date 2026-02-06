

# Update Favicon to Rainbow Hexagon Logo

## The Issue

Your `index.html` correctly references `/favicon.svg` (the rainbow hexagon), but there's an old `public/favicon.ico` file that some browsers fall back to when they don't support SVG favicons.

## The Fix

1. **Delete the old favicon.ico** - Remove `public/favicon.ico` to prevent browser fallback to the old "pp" icon

2. **Add multiple favicon formats for browser compatibility** - Update `index.html` to include:
   - SVG favicon (modern browsers)
   - Apple Touch Icon reference (iOS)
   - Explicit fallback handling

## Changes to Make

**File: `public/favicon.ico`**
- Delete this file entirely

**File: `index.html`**
- Update the favicon section (lines 28-29) to:
  - Keep the SVG as primary favicon
  - Add `sizes="any"` attribute for better browser handling

## Result

After clearing browser cache (Cmd+Shift+R or Ctrl+Shift+R), the rainbow hexagon molecule logo will display in all browser tabs.

## Note

Browsers aggressively cache favicons. After the change, you may need to:
1. Hard refresh the page (Cmd+Shift+R / Ctrl+Shift+R)
2. Or open in an incognito window to see the updated favicon immediately


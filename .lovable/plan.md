

# Fix Browser Tab Favicon

The favicon SVG file and the `index.html` link tag are both present and correct, but the hexagon logo with gradients may not render well at tiny favicon sizes (16x16px) in all browsers, causing the browser to fall back to a generated "PP" icon.

## Fix

### 1. Simplify `public/favicon.svg`
- Keep the same hexagon molecule design but use solid fills instead of gradient references for better rendering at small sizes
- Gradients defined via `<defs>` inside SVGs can sometimes fail to render in favicon contexts across browsers
- Replace `url(#rainbow-stroke)` with a single solid color (e.g., the purple `hsl(270, 70%, 55%)`) for the stroke and nodes
- This ensures the icon is always visible in the browser tab

### 2. Update `index.html` favicon link
- Remove the `sizes="any"` attribute which can confuse some browsers
- Keep `type="image/svg+xml"` for proper SVG favicon support

These are two small changes -- one to simplify the SVG for favicon rendering, and one minor HTML attribute tweak.

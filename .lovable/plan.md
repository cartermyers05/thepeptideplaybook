

# Update Hero CTA Buttons

## Current State

| Button | Text | Action |
|--------|------|--------|
| Primary | "Try AI Assistant Free" | Links to /signup |
| Secondary | "See It In Action" | Scrolls to #ai-demo |

## Problem

Both buttons suggest "trying" or "seeing" the product. They feel like the same action. Users need a clear distinction between:
- **Exploring** (watching the demo)
- **Converting** (purchasing/getting access)

## Proposed Change

| Button | New Text | Action | Purpose |
|--------|----------|--------|---------|
| Primary | "Get Full Access - $67" | Links to /pricing | Direct purchase CTA with price anchoring |
| Secondary | "See It In Action" | Scrolls to #ai-demo (keep as-is) | Let visitors preview before buying |

### Primary Button Options (pick your preference):
- "Get Full Access - $67" (price anchoring)
- "Get Instant Access"
- "Unlock Full Access"
- "Start Learning Now"

## File to Modify

### `src/components/landing/HeroSection.tsx`

**Changes:**
- Update primary button text from "Try AI Assistant Free" to "Get Full Access - $67"
- Change link from `/signup` to `/pricing`
- Swap the `Sparkles` icon for `ArrowRight` (more action-oriented)
- Keep secondary button as "See It In Action" scrolling to `#ai-demo`

**Before:**
```tsx
<Button asChild size="lg" className="btn-primary-clean h-12 px-8 text-base group">
  <Link to="/signup">
    <Sparkles className="w-4 h-4 mr-2" />
    Try AI Assistant Free
  </Link>
</Button>
```

**After:**
```tsx
<Button asChild size="lg" className="btn-primary-clean h-12 px-8 text-base group">
  <Link to="/pricing">
    Get Full Access - $67
    <ArrowRight className="w-4 h-4 ml-2" />
  </Link>
</Button>
```

## Visual Result

The hero will have two clearly distinct CTAs:
- **Primary (filled):** "Get Full Access - $67" → goes to pricing page
- **Secondary (outline):** "See It In Action" → scrolls to demo section

This creates a clear conversion funnel: visitors can either buy directly or scroll down to see the demo first.


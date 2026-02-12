

# Add Trust Signals and FAQ to Checkout Page

## Overview
Add trust-building content below the existing payment button on `/checkout`. The page currently ends after the trust text line at line 207. All new content goes below that, inside the existing `max-w-sm` container. The page layout changes from `flex items-center justify-center` (vertically centered) to a scrollable page so the added content is accessible.

## Changes (single file)

### `src/pages/Checkout.tsx`

**Layout adjustment (line 154):**
Change the outer container from vertically centered (`flex items-center justify-center`) to top-aligned with vertical padding (`flex justify-center pt-16 pb-16`) so the page scrolls naturally when content extends beyond the viewport. Also widen the inner container from `max-w-sm` to `max-w-md` to give the trust cards and FAQ a bit more room.

**After the existing trust bar (line 207), add these sections in order:**

1. **Trust Cards** (3 cards in a vertical stack):
   - Uses the existing `Card` component from `@/components/ui/card`
   - Each card: icon area (using Lucide icons: `FlaskConical`, `ShieldCheck`, `RefreshCw`), bold title, and muted description text
   - Card 1: "Research-Backed" / "Every recommendation cites peer-reviewed studies with evidence ratings. Not opinions. Evidence."
   - Card 2: "We Don't Sell Peptides" / "Zero financial incentive to push any product. We're education-only, which means completely unbiased."
   - Card 3: "30-Day Guarantee" / "Not helpful? Full refund, no questions asked. Email support@peptideplaybook.org."

2. **Checkout FAQ** using the existing `Accordion` components from `@/components/ui/accordion` (same Radix accordion used elsewhere on the site):
   - "Common Questions" header
   - 5 FAQ items with the exact Q&A copy provided
   - Uses `AccordionItem`, `AccordionTrigger`, `AccordionContent` with the same `glass-card-subtle` styling used in `GuideFAQ`

3. **Second CTA** at the bottom:
   - Same `Button` as the primary checkout button, calling `startCheckout()`
   - Below it: "One-time payment. Lifetime access. Instant delivery." in muted small text

**New imports added:**
- `Card, CardContent` from `@/components/ui/card`
- `Accordion, AccordionContent, AccordionItem, AccordionTrigger` from `@/components/ui/accordion`
- `FlaskConical, ShieldCheck, RefreshCw, Lock` from `lucide-react`

## What Does NOT Change
- Everything above and including the trust bar (lines 153-207) stays exactly the same
- Loading states, promo code flow, redirect logic untouched
- No other pages modified
- No sidebar, navigation, or layout changes elsewhere



# Revert All Conversion Optimizations

Strip all 7 changes from the last round. No UI or content changes beyond undoing what was added.

## Changes

### 1. `src/pages/Index.tsx`
- Remove imports: `TestimonialStrip`, `RecentJoinToast`, `ExitIntentPopup`
- Remove from render: `<TestimonialStrip />`, `<RecentJoinToast />`, `<ExitIntentPopup />`
- Restore original section order: move `WhoThisIsForNew` back AFTER `PricingCTA`

### 2. `src/components/landing/HeroSection.tsx`
- Remove the "140+ researchers joined this month" social proof counter block (lines 91-106)
- Remove `Users` from lucide-react import

### 3. `src/components/landing/PricingCTA.tsx`
- Revert line 133: `"Launch pricing — increases March 15, 2026"` → `"Launch pricing — increases soon"`

### 4. `src/components/landing/HeroProductCards.tsx`
- Revert border opacity on all three cards back to lower values (`/20` instead of `/60`)

### 5. Delete files
- `src/components/landing/TestimonialStrip.tsx`
- `src/components/landing/RecentJoinToast.tsx`


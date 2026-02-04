
# Standardize All Pricing to $67 with Early Access Messaging

## Audit Summary

I found pricing references across multiple files. Some already show $67 correctly, but several still show old subscription pricing ($29/mo) or need the "early access" urgency messaging added.

---

## Files Requiring Updates

### 1. ComparisonSection.tsx (HIGH PRIORITY)

**Location:** `src/components/landing/ComparisonSection.tsx`

**Issues:**
- Line 8: Shows `$29/month` instead of `$67`
- Line 54: Headline says "Why pay $2,000 when you can pay $29?"

**Changes:**
```typescript
// Line 8: Update price in comparison data
us: "$67 one-time",

// Line 39: Update refund row
us: "30-day refund",  // Instead of "Cancel anytime"

// Line 54: Update headline
"Why pay $2,000 when you can pay $67?"
```

---

### 2. QuizResults.tsx (HIGH PRIORITY)

**Location:** `src/pages/QuizResults.tsx`

**Issues:**
- Line 278: Still shows `$29/month` in value stack

**Changes:**
```typescript
// Line 276-279: Update "Your price" section
<div className="flex items-center justify-between text-primary mt-2">
  <span className="font-medium">Your price:</span>
  <span className="font-bold text-xl">$67</span>
</div>
<p className="text-xs text-muted-foreground mt-2">
  Early access pricing. Going to $99 soon.
</p>
```

---

### 3. PricingCTA.tsx (ADD URGENCY)

**Location:** `src/components/landing/PricingCTA.tsx`

**Current:** Shows $67 correctly but missing early access messaging

**Changes:**
```typescript
// After line 53-54, add early access badge
<div className="mb-8">
  <span className="inline-block text-xs font-medium bg-primary/10 text-primary px-2.5 py-1 rounded-full mb-3">
    Early Access Pricing
  </span>
  <div className="flex items-baseline gap-2">
    <span className="text-6xl md:text-7xl font-bold">$67</span>
    <span className="text-muted-foreground text-lg">one-time</span>
  </div>
  <p className="mt-2 text-sm text-muted-foreground">
    <span className="line-through opacity-60">$99</span> — Price increases soon
  </p>
</div>
```

---

### 4. CoursePreview.tsx (ADD URGENCY)

**Location:** `src/pages/CoursePreview.tsx`

**Current:** Shows $67 correctly, needs early access messaging

**Changes (around line 294):**
```typescript
"Get Your Course — $67"

// Add after the button (line 297-299):
<p className="mt-4 text-sm text-muted-foreground">
  <span className="text-primary font-medium">Early access pricing.</span> Going to $99 soon.
</p>
<p className="text-xs text-muted-foreground mt-1">
  One-time purchase. Lifetime access. 30-day money-back guarantee.
</p>
```

---

### 5. Checkout.tsx (ADD URGENCY)

**Location:** `src/pages/Checkout.tsx`

**Current:** Shows $67 correctly, needs early access messaging

**Changes (around line 140-142):**
```typescript
<div className="mb-6">
  <p className="text-xs text-primary font-medium mb-1">Early Access Pricing</p>
  <h1 className="text-xl font-semibold mb-1">Complete Your Purchase</h1>
  <p className="text-sm text-muted-foreground">
    One-time payment: <span className="line-through opacity-60">$99</span> $67
  </p>
</div>
```

---

### 6. UpgradePrompt.tsx (ADD URGENCY)

**Location:** `src/components/dashboard/UpgradePrompt.tsx`

**Current:** Shows $67 correctly, needs early access messaging

**Changes:**
```typescript
<p className="text-muted-foreground max-w-md mb-4">
  Get full access to {feature.toLowerCase()} and all other features.
</p>
<p className="text-sm text-primary font-medium mb-4">
  Early access: $67 <span className="line-through opacity-60 text-muted-foreground">$99</span>
</p>

<Button asChild size="lg" className="btn-primary-clean">
  <Link to="/checkout">
    Unlock Now — $67
  </Link>
</Button>
```

---

### 7. ProblemSection.tsx (OPTIONAL)

**Location:** `src/components/landing/ProblemSection.tsx`

**Current:** Line 7 mentions "$2,000" for competitor courses — this is fine (it's about competitors, not us)

**No change needed** — keeping this creates contrast with our $67 price

---

## Summary of All Changes

| File | Current | Updated |
|------|---------|---------|
| ComparisonSection.tsx | $29/month | $67 one-time |
| QuizResults.tsx | $29/month | $67 + early access |
| PricingCTA.tsx | $67 (no urgency) | $67 + early access badge + $99 strikethrough |
| CoursePreview.tsx | $67 (no urgency) | $67 + early access messaging |
| Checkout.tsx | $67 (no urgency) | $67 + early access + $99 strikethrough |
| UpgradePrompt.tsx | $67 (no urgency) | $67 + early access + $99 strikethrough |

---

## Consistent Messaging Pattern

All pricing displays will follow this pattern:
1. **Early Access** badge or label (visual urgency)
2. **$67** as the current price (prominent)
3. **$99** strikethrough (anchors value, creates urgency)
4. **"Going to $99 soon"** or similar (deadline implication)

This creates FOMO without requiring an actual countdown timer.


# Remove AI-Template Icon Patterns: Custom Visual Language

## Problem Analysis

The site uses Lucide icons in patterns that scream "AI-generated template":

1. **Rounded circle/square backgrounds with small icons** (HeroSection trust items, SocialProof stats, WhoThisIsFor checkmarks, ProblemSection pain points)
2. **Check/X icons in feature lists** (PricingCTA, WhoThisIsFor)
3. **Sparkles icon everywhere** (very AI-template)
4. **Bot icon** for AI assistant (generic)
5. **Colored icon containers** with primary/10 backgrounds

## Solution: Replace with Typography-First, Editorial Design

Instead of icon-heavy design, we shift to a more editorial, text-focused approach that feels like a professional publication.

---

## Part 1: Trust Items in HeroSection

**Current (AI-template):**
```tsx
<div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
  <item.icon className="w-3 h-3 text-primary" />
</div>
```

**New (editorial):**
- Use simple text with a subtle separator or bullet
- No icon containers at all

```tsx
const trustItems = [
  "4,200+ researchers",
  "30-day guarantee",
  "$67 one-time",
];

// Render as simple text with dots between
<div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-2 text-sm text-muted-foreground">
  {trustItems.map((item, index) => (
    <span key={index} className="flex items-center gap-2">
      {index > 0 && <span className="w-1 h-1 rounded-full bg-border" />}
      {item}
    </span>
  ))}
</div>
```

---

## Part 2: SocialProof Stats Section

**Current (AI-template):**
```tsx
<div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
  <stat.icon className="w-6 h-6 text-primary" />
</div>
```

**New (typography-focused):**
- Remove icons entirely
- Use bold numbers with subtle styling
- Add a thin colored accent line above each stat instead

```tsx
const stats = [
  { value: 15, suffix: "", label: "Research Guides" },
  { value: 47, suffix: "", label: "TikTok Myths Exposed" },
  { value: 200, suffix: "+", label: "Studies Cited" },
];

// Render with accent lines instead of icons
<div className="text-center">
  <div className="w-8 h-0.5 bg-primary/60 mx-auto mb-4" />
  <p className="text-3xl md:text-4xl font-bold text-foreground mb-1">
    <CountUp end={stat.value} />{stat.suffix}
  </p>
  <p className="text-sm text-muted-foreground">{stat.label}</p>
</div>
```

---

## Part 3: WhoThisIsFor - Check/X Lists

**Current (AI-template):**
```tsx
<div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center">
  <Check className="w-3 h-3 text-success" />
</div>
```

**New (editorial):**
- Use simple text bullets with left border accent
- Green left border for "For You", red for "Not For You"

```tsx
// For You list item
<li className="pl-4 border-l-2 border-success/60 text-muted-foreground">
  {item}
</li>

// Not For You list item
<li className="pl-4 border-l-2 border-destructive/60 text-muted-foreground">
  {item}
</li>
```

**Update section headers:**
```tsx
// Instead of icon in header
<h3 className="text-xl font-semibold mb-6 text-success">
  This Is For You If...
</h3>

<h3 className="text-xl font-semibold mb-6 text-destructive">
  Not For You If...
</h3>
```

---

## Part 4: PricingCTA Feature List

**Current (AI-template):**
```tsx
{feature.highlight ? (
  <Sparkles className="w-3 h-3 text-primary" />
) : (
  <Check className="w-3 h-3 text-success" />
)}
```

**New (minimal):**
- Use simple checkmark character or small dot
- No icon containers

```tsx
<li className="flex items-center gap-3">
  <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
  <span className={feature.highlight ? "font-medium" : ""}>
    {feature.text}
  </span>
</li>
```

---

## Part 5: ProblemSection Pain Points

**Current (AI-template):**
```tsx
<AlertCircle className="w-5 h-5 text-destructive/70" />
```

**New (editorial):**
- Use numbered list or simple dash
- No icons at all

```tsx
<div className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 border border-border/50">
  <span className="text-destructive/70 font-medium flex-shrink-0">{index + 1}.</span>
  <span className="text-foreground">{point}</span>
</div>
```

---

## Part 6: AIShowcase Capabilities

**Current (AI-template):**
```tsx
<div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
  <cap.icon className="w-5 h-5 text-primary" />
</div>
```

**New (text-focused):**
- Use a simple title with example, no icon

```tsx
const capabilities = [
  {
    title: "Compare Peptides",
    description: "Side-by-side analysis of any two peptides",
    example: '"BPC-157 vs TB-500 for recovery?"',
  },
  // ...
];

// Render without icons
<div className="p-4 border-l-2 border-primary/40 bg-muted/30">
  <h4 className="font-medium text-sm mb-1">{cap.title}</h4>
  <p className="text-xs text-muted-foreground mb-2">{cap.description}</p>
  <p className="text-xs text-primary font-medium italic">{cap.example}</p>
</div>
```

---

## Part 7: AI Chat Demo - Replace Bot Icon

**Current:**
```tsx
<Bot className="w-5 h-5 text-primary" />
```

**New:**
- Use initials or text avatar instead of robot icon
- Feels more like a real product

```tsx
<div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
  <span className="text-sm font-semibold text-primary-foreground">PP</span>
</div>
```

---

## Part 8: Checkout Trust Elements

**Current:**
```tsx
<Shield className="w-3.5 h-3.5" />
```

**New:**
- Just use text with subtle separators

```tsx
<div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
  <span>256-bit SSL</span>
  <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
  <span>Powered by Stripe</span>
  <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
  <span>30-day refund</span>
</div>
```

---

## Part 9: Navigation Sidebar Icons

**Keep these** - Navigation icons are functional and expected. However, simplify styling:
- Remove any hover effects that scale icons
- Keep them plain and functional

---

## Part 10: Remove Sparkles Icon Entirely

The `Sparkles` icon is heavily associated with AI-generated templates. Remove from:
- HeroSection trust items
- PricingCTA header badge and button
- AIShowcase header and buttons
- AIAssistant capability badges

Replace with text-only badges or remove entirely.

---

## Part 11: PricingCTA Header Badge

**Current:**
```tsx
<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
  <Sparkles className="w-4 h-4 text-primary" />
  <span>AI-Powered Research</span>
</div>
```

**New:**
```tsx
<p className="text-sm font-medium text-primary tracking-wide uppercase">
  AI-Powered Research
</p>
```

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/components/landing/HeroSection.tsx` | Replace icon trust items with text-only |
| `src/components/landing/SocialProof.tsx` | Replace icons with accent lines |
| `src/components/landing/WhoThisIsFor.tsx` | Replace Check/X icons with border accents |
| `src/components/landing/PricingCTA.tsx` | Replace checkmark icons with dots, remove Sparkles |
| `src/components/landing/ProblemSection.tsx` | Replace AlertCircle with numbered list |
| `src/components/landing/AIShowcase.tsx` | Replace icon cards with text-focused, replace Bot with initials |
| `src/components/landing/AIAssistant.tsx` | Replace Bot icon with initials avatar |
| `src/pages/Checkout.tsx` | Replace trust icons with text-only |
| `src/components/landing/FAQ.tsx` | No icons to remove (already clean) |
| `src/components/landing/HowItWorks.tsx` | Numbers already work, keep as-is |

---

## Visual Summary

| Before | After |
|--------|-------|
| Icon in colored circle container | Accent line or just text |
| Check/X icons in lists | Left border accent in list color |
| Sparkles everywhere | Removed entirely |
| Bot icon for AI | Text initials "PP" |
| Icon + title + description cards | Left-border accent cards |
| Trust badges with icons | Plain text with dot separators |

---

## What Stays

- **Navigation sidebar icons** - Functional, expected
- **Logo component** - Already custom SVG
- **Guide page metadata icons** (Clock, ShieldCheck) - Editorial and expected
- **Arrow icons** in buttons - Standard UX pattern

---

## Implementation Priority

1. Remove Sparkles icon from all files
2. Update HeroSection trust items
3. Update SocialProof section
4. Update WhoThisIsFor lists
5. Update PricingCTA features
6. Update ProblemSection
7. Update AIShowcase and AIAssistant
8. Update Checkout trust elements



# Replace Remaining Icons with Creative Alternatives

## Problem Analysis

The site still has Lucide icons scattered throughout that signal "vibe-coded" design. Even though we removed the most obvious ones (Sparkles, Bot), there are still patterns like:

1. **Functional icons in containers** (Database, ShieldCheck, Mail in ProductPreview)
2. **Action icons** (ArrowRight, Send, X, Menu)
3. **Stats icons** (BookOpen, Clock, FileText in WhyIMadeThis)
4. **Science icons** (FlaskConical in ExitIntentPopup)

The goal is to replace these with more creative, typography-first, or custom visual approaches that don't scream "I picked these from an icon library."

---

## The Creative Approach

Instead of icons, we'll use:

1. **Typographic numerals and symbols** — Bold numbers, ampersands, brackets
2. **Geometric shapes** — Simple circles, squares, lines as visual markers
3. **Initials/abbreviations** — Text-based identifiers like the "PP" pattern
4. **Decorative accent lines** — Thin colored lines as visual anchors
5. **Custom SVG graphics** — Simple unique shapes where needed

---

## Part 1: ProductPreview.tsx — Product Cards

**Current:** Each card has `<product.icon className="w-6 h-6 text-primary" />` (Database, ShieldCheck, Mail)

**Replace with typographic abbreviations in colored squares:**

```tsx
const products = [
  {
    abbrev: "DB",
    title: "Peptide Database",
    // ...
  },
  {
    abbrev: "SC",
    title: "Source Evaluation Checklist",
    // ...
  },
  {
    abbrev: "RD",
    title: "Monthly Research Digest",
    // ...
  },
];

// Render:
<motion.div 
  className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors"
>
  <span className="text-sm font-bold text-primary">{product.abbrev}</span>
</motion.div>
```

---

## Part 2: WhyIMadeThis.tsx — Stats Section

**Current:** `<stat.icon className="w-5 h-5 text-primary" />` (Clock, BookOpen, FileText)

**Replace with simple accent lines and bold numbers only — no icons:**

```tsx
const stats = [
  { value: "200+", label: "Hours of Research" },
  { value: "15", label: "Peptides Analyzed" },
  { value: "100+", label: "Sources Reviewed" },
];

// Render:
<div className="text-center">
  <div className="w-6 h-0.5 bg-primary/50 mx-auto mb-3" />
  <p className="text-xl md:text-2xl font-bold text-gradient">{stat.value}</p>
  <p className="text-xs text-muted-foreground">{stat.label}</p>
</div>
```

---

## Part 3: AgitationSection.tsx — Consequences List

**Current:** `<X className="w-4 h-4 text-destructive" />` in a circle

**Replace with a simple red dash or number:**

```tsx
// Instead of X icon in circle:
<span className="text-destructive font-bold text-lg flex-shrink-0 w-6">—</span>

// Or keep numbered approach but simpler:
<span className="text-destructive/70 font-semibold flex-shrink-0 w-6">{index + 1}.</span>
```

---

## Part 4: ExitIntentPopup.tsx — Flask Icon

**Current:** `<FlaskConical className="w-8 h-8 text-primary" />` in a circle

**Replace with initials "FDA" (since it's about FDA-approved peptides):**

```tsx
<div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
  <span className="text-lg font-bold text-primary">FDA</span>
</div>
```

---

## Part 5: HeroDemo & AIAssistant — Send Icon

**Current:** `<Send className="w-4 h-4 text-muted-foreground" />` in input field

**Replace with simple arrow character or right chevron using CSS:**

```tsx
// Instead of Send icon:
<span className="text-muted-foreground font-medium">→</span>

// Or use CSS arrow:
<span className="w-0 h-0 border-l-[6px] border-l-muted-foreground border-y-[4px] border-y-transparent" />
```

---

## Part 6: Navbar — Menu/X Icons

**Current:** Mobile hamburger uses `<Menu />` and `<X />` icons

**Replace with custom hamburger lines (CSS-based):**

```tsx
// Custom hamburger button
<button className="flex flex-col gap-1.5 p-2">
  <span className={cn(
    "w-5 h-0.5 bg-foreground transition-all",
    isOpen && "rotate-45 translate-y-2"
  )} />
  <span className={cn(
    "w-5 h-0.5 bg-foreground transition-all",
    isOpen && "opacity-0"
  )} />
  <span className={cn(
    "w-5 h-0.5 bg-foreground transition-all",
    isOpen && "-rotate-45 -translate-y-2"
  )} />
</button>
```

---

## Part 7: ArrowRight Icons in Buttons

**Current:** Many buttons have `<ArrowRight className="w-4 h-4 ml-2" />`

**Replace with typography arrow or CSS chevron:**

```tsx
// Typography arrow (more editorial)
<span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>

// Or simpler with font
<span className="ml-2 text-lg leading-none group-hover:translate-x-1 transition-transform">›</span>
```

---

## Part 8: UrgencyBanner — Close X

**Current:** `<X className="w-4 h-4" />` for close button

**Replace with typography × symbol:**

```tsx
<button
  onClick={handleDismiss}
  className="text-foreground/70 hover:text-foreground text-xl leading-none font-light"
  aria-label="Dismiss banner"
>
  ×
</button>
```

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/components/landing/ProductPreview.tsx` | Replace Database/ShieldCheck/Mail icons with text abbreviations |
| `src/components/landing/WhyIMadeThis.tsx` | Remove Clock/BookOpen/FileText icons, use accent lines |
| `src/components/landing/AgitationSection.tsx` | Replace X icon with dash symbol |
| `src/components/landing/ExitIntentPopup.tsx` | Replace FlaskConical with "FDA" text |
| `src/components/landing/HeroDemo.tsx` | Replace Send icon with arrow character |
| `src/components/landing/AIAssistant.tsx` | Replace Send icon with arrow character |
| `src/components/landing/Navbar.tsx` | Replace Menu/X with CSS hamburger animation |
| `src/components/landing/UrgencyBanner.tsx` | Replace X icon with × character |
| `src/components/landing/HeroSection.tsx` | Replace ArrowRight with → character |
| `src/components/landing/PricingCTA.tsx` | Replace ArrowRight with → character |
| `src/components/landing/FloatingCTA.tsx` | Replace ArrowRight with → character |
| `src/components/landing/AIShowcase.tsx` | Replace ArrowRight with → character |

---

## Visual Summary

| Before | After |
|--------|-------|
| `Database` icon | "DB" text in container |
| `ShieldCheck` icon | "SC" text in container |
| `Mail` icon | "RD" text in container |
| `Clock`, `BookOpen`, `FileText` | Accent lines + bold numbers |
| `X` icon (close) | × typography character |
| `X` icon (list) | — dash or number |
| `Send` icon | → arrow character |
| `ArrowRight` icon | → or › character |
| `Menu`/`X` hamburger | CSS animated lines |
| `FlaskConical` | "FDA" text |

---

## Why This Works

1. **Typography is harder to fake** — Icon libraries are easy; custom type choices aren't
2. **No more "icon picker" aesthetic** — Abbreviations feel intentional and branded
3. **Consistent with "PP" pattern** — We already use initials for the AI; extend this to products
4. **Faster loading** — No icon imports means smaller bundles
5. **More editorial** — Matches the publication-style design direction

---

## Implementation Order

1. ProductPreview.tsx (most visible product cards)
2. WhyIMadeThis.tsx (stats section)
3. AgitationSection.tsx (X icons in list)
4. ExitIntentPopup.tsx (Flask icon)
5. HeroDemo + AIAssistant (Send icons)
6. Navbar (hamburger menu)
7. All button ArrowRight replacements
8. UrgencyBanner (close X)


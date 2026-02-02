
# Make Site Look Custom-Built: Professional Media Site Transformation

## Overview

This plan transforms the site from a "generic AI template" to a professional, custom-built health media publication. We'll update the color palette, remove generic patterns, add credibility signals, and redesign the /guides page as a proper content hub.

---

## Part 1: New Color Palette (Teal/Emerald Theme)

Replace the generic purple (#7C3AED) with a distinctive teal/emerald palette that feels "health research" authentic.

### File: `src/index.css`

**New color values:**
```css
/* Primary - Teal/Emerald #0D9488 */
--primary: 173 82% 32%;
--primary-foreground: 0 0% 100%;

/* Accent - Warm amber for highlights */
--accent: 38 92% 50%;
--accent-foreground: 0 0% 0%;
```

**Update all purple references:**
- `hsl(263 70% 42%)` → `hsl(173 82% 32%)`
- `#7C3AED` → `#0D9488`
- `rgba(139, 92, 246, ...)` → `rgba(13, 148, 136, ...)`

### File: `tailwind.config.ts`

Update any hardcoded purple values in animations to teal.

---

## Part 2: Remove "Built with AI/Lovable" Signals

### File: `vite.config.ts`

Remove or disable `componentTagger`:
```typescript
// Remove: import { componentTagger } from "lovable-tagger";
// Remove componentTagger from plugins array
```

This removes any injected "Lovable" attributes.

---

## Part 3: Custom Logo Component

### New File: `src/components/brand/Logo.tsx`

Create a proper logo component with SVG icon:
```tsx
interface LogoProps {
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Logo({ showText = true, size = "md" }: LogoProps) {
  // Icon: DNA helix or molecule icon combined with book/page
  // Text: "Peptide Playbook" in custom typography
}
```

**Design:**
- Icon: Abstract DNA strand or molecular structure
- Colors: Teal primary with accent
- Typography: Inter Bold for "Peptide", Inter Medium for "Playbook"

### Update: `src/components/landing/Navbar.tsx`

Replace text logo with `<Logo />` component.

### Update: `public/favicon.svg`

New favicon matching the logo icon (molecule/helix shape in teal).

---

## Part 4: Custom Button Styles

### File: `src/index.css`

Replace generic `btn-primary-clean` with distinctive style:
```css
.btn-primary-custom {
  background: linear-gradient(135deg, hsl(173 82% 32%) 0%, hsl(173 82% 28%) 100%);
  color: white;
  border-radius: 6px; /* More subtle than 8px */
  font-weight: 600;
  letter-spacing: 0.01em;
  border: 1px solid hsl(173 82% 25%);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.btn-primary-custom:hover {
  background: linear-gradient(135deg, hsl(173 82% 28%) 0%, hsl(173 82% 24%) 100%);
  box-shadow: 0 2px 8px rgba(13, 148, 136, 0.25);
}
```

### File: `src/components/ui/button.tsx`

Add custom variant for the new style.

---

## Part 5: Remove Generic Card Styling

### File: `src/index.css`

Replace `.glass-card` with more subtle, editorial style:
```css
.content-card {
  background: white;
  border: 1px solid hsl(var(--border));
  border-radius: 8px;
  transition: border-color 0.2s ease;
}

.content-card:hover {
  border-color: hsl(173 82% 32% / 0.3);
}
```

Remove excessive glassmorphism, shadows, and hover transforms.

---

## Part 6: "Featured By" / Credibility Section

### New File: `src/components/landing/FeaturedBy.tsx`

Structure for future press mentions:
```tsx
export function FeaturedBy() {
  return (
    <section className="py-12 border-y border-border/50">
      <div className="container">
        <p className="text-center text-sm text-muted-foreground mb-6">
          Research trusted by
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
          {/* Placeholder logos - gray silhouettes */}
          <div className="h-6 w-24 bg-muted-foreground/20 rounded" />
          <div className="h-6 w-32 bg-muted-foreground/20 rounded" />
          <div className="h-6 w-28 bg-muted-foreground/20 rounded" />
          <div className="h-6 w-24 bg-muted-foreground/20 rounded" />
        </div>
      </div>
    </section>
  );
}
```

Add to Index.tsx after HeroSection.

---

## Part 7: Update SocialProof with Specific Numbers

### File: `src/components/landing/SocialProof.tsx`

Update stats to be more specific and impactful:
```tsx
const stats = [
  { icon: BookOpen, value: 15, suffix: "", label: "Research Guides" },
  { icon: FlaskConical, value: 47, suffix: "", label: "TikTok Myths Exposed" },
  { icon: Database, value: 200, suffix: "+", label: "Studies Cited" },
];
```

---

## Part 8: About Page - Team Section

### File: `src/pages/About.tsx`

Add team/advisor section with avatar placeholders:
```tsx
{/* Our Team */}
<motion.div className="glass-card-subtle p-8 mb-8">
  <h2 className="text-2xl font-semibold mb-6">Our Team</h2>
  
  <div className="grid md:grid-cols-2 gap-6">
    {/* Founder */}
    <div className="flex items-start gap-4">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
        <User className="w-8 h-8 text-muted-foreground" />
      </div>
      <div>
        <p className="font-medium">Research Team</p>
        <p className="text-sm text-muted-foreground">
          Our content is reviewed by healthcare professionals 
          with expertise in peptide therapy.
        </p>
      </div>
    </div>
    
    {/* Medical Advisor - Placeholder */}
    <div className="flex items-start gap-4">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
        <Stethoscope className="w-8 h-8 text-muted-foreground" />
      </div>
      <div>
        <p className="font-medium">Medical Review Board</p>
        <p className="text-sm text-muted-foreground">
          Coming Soon - We're establishing a formal advisory board.
        </p>
      </div>
    </div>
  </div>
</motion.div>
```

---

## Part 9: Guides Page - Content Hub Transformation

### File: `src/pages/Guides.tsx`

Complete redesign as a media-style content hub:

**New Structure:**
1. Hero with search bar
2. Category filters (tabs)
3. Featured/Latest article highlight
4. Grid of article cards with metadata

```tsx
// Categories
const categories = [
  { id: "all", label: "All Guides" },
  { id: "recovery", label: "Recovery & Healing" },
  { id: "weight-loss", label: "Weight Loss" },
  { id: "safety", label: "Safety & Legal" },
  { id: "how-to", label: "How-To" },
];

// Guide data with metadata
const guides = [
  {
    title: "BPC-157: Complete Research Guide",
    description: "...",
    href: "/guides/bpc-157-complete-guide",
    category: "recovery",
    readTime: "12 min",
    lastUpdated: "Jan 28, 2026",
    reviewedBy: "Dr. Sarah Chen, PhD",
  },
  // ... rest of guides
];
```

**New UI Elements:**
- Search input at top
- Category pills/tabs
- Card shows: title, excerpt, read time, date, reviewer badge
- Featured article with larger card

### New File: `src/components/guides/GuideCardEnhanced.tsx`

Enhanced card with metadata:
```tsx
interface GuideCardEnhancedProps {
  title: string;
  description: string;
  href: string;
  category: string;
  readTime: string;
  lastUpdated: string;
  reviewedBy?: string;
}

export function GuideCardEnhanced({ ... }: GuideCardEnhancedProps) {
  return (
    <Link to={href} className="block group">
      <article className="content-card p-6 h-full">
        {/* Category badge */}
        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
          {category}
        </span>
        
        <h3 className="text-lg font-semibold mt-3 mb-2 group-hover:text-primary">
          {title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4">
          {description}
        </p>
        
        {/* Metadata row */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {readTime} read
          </span>
          <span>Updated {lastUpdated}</span>
        </div>
        
        {reviewedBy && (
          <div className="mt-3 pt-3 border-t border-border/50 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-success" />
              Reviewed by {reviewedBy}
            </span>
          </div>
        )}
      </article>
    </Link>
  );
}
```

### New File: `src/components/guides/SearchBar.tsx`

Search input for guides:
```tsx
export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative max-w-md mx-auto">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search guides..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 h-12 bg-white border-border"
      />
    </div>
  );
}
```

### New File: `src/components/guides/CategoryFilter.tsx`

Category tabs:
```tsx
export function CategoryFilter({ 
  categories, 
  selected, 
  onSelect 
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-colors",
            selected === cat.id
              ? "bg-primary text-white"
              : "bg-muted hover:bg-muted/80"
          )}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
```

---

## Part 10: Footer Updates

### File: `src/components/landing/Footer.tsx`

Update footer styling from purple gradient to neutral dark:
```tsx
<footer className="bg-slate-900 text-white py-16">
  <div className="container px-4">
    {/* Logo and tagline */}
    <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
      <div className="max-w-xs">
        <Logo showText size="md" />
        <p className="text-slate-400 text-sm mt-4">
          Evidence-based peptide research. No hype. No sales pitch.
        </p>
      </div>
      
      {/* Link columns */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
        <div>
          <h4 className="font-semibold mb-4">Research</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link to="/guides">All Guides</Link></li>
            <li><Link to="/guides/bpc-157-complete-guide">BPC-157</Link></li>
            <li><Link to="/guides/semaglutide-complete-guide">Semaglutide</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/editorial-policy">Editorial Policy</Link></li>
            <li><Link to="/partners">Partners</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link to="/terms">Terms of Service</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/disclaimer">Medical Disclaimer</Link></li>
          </ul>
        </div>
      </div>
    </div>
    
    {/* Bottom bar */}
    <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-xs text-slate-500">
        © 2026 Peptide Playbook. All rights reserved. Not medical advice.
      </p>
      <a 
        href="mailto:hello@peptideplaybook.com" 
        className="text-sm text-slate-400 hover:text-white transition-colors"
      >
        hello@peptideplaybook.com
      </a>
    </div>
  </div>
</footer>
```

---

## File Changes Summary

### New Files (5)
| File | Purpose |
|------|---------|
| `src/components/brand/Logo.tsx` | Custom logo component |
| `src/components/landing/FeaturedBy.tsx` | Press/credibility section |
| `src/components/guides/GuideCardEnhanced.tsx` | Guide card with metadata |
| `src/components/guides/SearchBar.tsx` | Guides search input |
| `src/components/guides/CategoryFilter.tsx` | Category filter tabs |

### Modified Files (9)
| File | Changes |
|------|---------|
| `src/index.css` | New teal color palette, custom button styles, refined cards |
| `tailwind.config.ts` | Update animation colors to teal |
| `vite.config.ts` | Remove componentTagger |
| `public/favicon.svg` | New teal molecule icon |
| `src/components/landing/Navbar.tsx` | Use Logo component |
| `src/components/landing/Footer.tsx` | Professional 3-column layout |
| `src/components/landing/SocialProof.tsx` | Updated specific numbers |
| `src/pages/About.tsx` | Team/advisor section |
| `src/pages/Guides.tsx` | Full content hub redesign |
| `src/pages/Index.tsx` | Add FeaturedBy section |

---

## Visual Design Changes Summary

| Before | After |
|--------|-------|
| Purple (#7C3AED) everywhere | Teal (#0D9488) primary, warm accents |
| Generic glassmorphism cards | Clean white cards with subtle borders |
| Heavy shadows and glows | Minimal, editorial shadows |
| Text-only logo | Custom icon + wordmark |
| No dates/read times on guides | Full article metadata |
| Simple grid of guides | Searchable, filterable content hub |
| Purple gradient footer | Clean dark slate footer |
| Generic "4,200+ researchers" | Specific "15 Research Guides", "47 Myths Exposed" |

---

## Implementation Priority

1. Color palette update (index.css + tailwind.config.ts)
2. Remove componentTagger
3. Logo component and favicon
4. Footer redesign
5. SocialProof numbers update
6. FeaturedBy section
7. Guides page content hub transformation
8. About page team section
9. Card and button style refinements

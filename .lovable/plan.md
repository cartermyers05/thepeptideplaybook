
# Remove Remaining Sparkles & Bot Icons - Final Cleanup

## Overview

Four files still have `Sparkles` icons and three files still have `Bot` icons that were missed in the previous cleanup. Additionally, there are emojis in one file that need to be replaced.

---

## Files with Remaining `Sparkles` Icon

| File | Location | Replacement |
|------|----------|-------------|
| `src/pages/Partners.tsx` | Header badge (line 134), "What You Get" card (line 181) | Remove icon from badge, use text-only; use Edit icon instead of Sparkles for "5 Hook Scripts" |
| `src/pages/Account.tsx` | Sidebar logo (lines 130-133) | Replace with Logo component |
| `src/components/landing/ProductPreview.tsx` | AI features list bullets (line 134) | Replace with simple bullet dots |
| `src/pages/admin/ArticleGenerator.tsx` | Page header, button, empty state, publish button (lines 151, 236, 266, 320) | Replace with text "PP" initials or FileText icon - this is admin only so less critical |

---

## Files with Remaining `Bot` Icon

| File | Location | Replacement |
|------|----------|-------------|
| `src/components/landing/ProductPreview.tsx` | AI Research Assistant card icon (line 107) | Replace with "PP" initials avatar |
| `src/pages/dashboard/Home.tsx` | Mobile tab switcher for AI Assistant (lines 3, 30) | Replace with MessageSquare icon |

---

## Implementation Details

### 1. Partners.tsx

**Header badge (line 133-136):**
```tsx
// Current:
<div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
  <Sparkles className="w-4 h-4" />
  Affiliate Program
</div>

// Replace with text-only:
<p className="text-sm font-medium text-primary tracking-wide uppercase mb-6">
  Affiliate Program
</p>
```

**"What You Get" grid (line 181):**
```tsx
// Current:
{ icon: Sparkles, title: "5 Hook Scripts", desc: "Proven hooks for videos and reels" },

// Replace Sparkles with FileEdit or Pencil icon:
{ icon: FileEdit, title: "5 Hook Scripts", desc: "Proven hooks for videos and reels" },
```

**Also remove emojis from whoWeWant array (lines 33-38):**
```tsx
// Current:
{ icon: "🏋️", title: "Health & Wellness Creators", ... },

// Replace emojis with text-based categories:
const whoWeWant = [
  { title: "Health & Wellness Creators", desc: "Fitness influencers who prioritize evidence" },
  { title: "Biohacking Content Creators", desc: "Those exploring optimization responsibly" },
  // ... etc
];
```

### 2. Account.tsx

**Sidebar logo (lines 129-134):**
```tsx
// Current:
<Link to="/" className="flex items-center gap-2">
  <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
    <Sparkles className="w-4 h-4 text-primary-foreground" />
  </div>
  <span className="font-bold">PeptideGPT</span>
</Link>

// Replace with Logo component:
import { Logo } from "@/components/brand/Logo";

<Link to="/" className="flex items-center gap-2">
  <Logo size="sm" />
</Link>
```

### 3. ProductPreview.tsx

**Bot icon in AI card (lines 102-108):**
```tsx
// Current:
<motion.div 
  className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center"
  whileHover={{ scale: 1.1, rotate: 5 }}
  transition={{ type: "spring", stiffness: 400 }}
>
  <Bot className="w-7 h-7 text-primary" />
</motion.div>

// Replace with "PP" initials:
<motion.div 
  className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center"
  whileHover={{ scale: 1.1, rotate: 5 }}
  transition={{ type: "spring", stiffness: 400 }}
>
  <span className="text-lg font-bold text-primary-foreground">PP</span>
</motion.div>
```

**Sparkles in feature list (lines 132-136):**
```tsx
// Current:
<Sparkles className="w-4 h-4 text-primary flex-shrink-0" />

// Replace with simple dot:
<span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
```

### 4. Home.tsx (Dashboard)

**Bot icon in mobile tab (lines 3, 30):**
```tsx
// Current:
import { Bot, Newspaper } from "lucide-react";
...
<TabButton
  active={activeTab === "chat"}
  onClick={() => setActiveTab("chat")}
  icon={Bot}
  label="AI Assistant"
/>

// Replace Bot with MessageSquare:
import { MessageSquare, Newspaper } from "lucide-react";
...
<TabButton
  active={activeTab === "chat"}
  onClick={() => setActiveTab("chat")}
  icon={MessageSquare}
  label="AI Assistant"
/>
```

### 5. ArticleGenerator.tsx (Admin Only - Lower Priority)

Since this is an admin-only page, it's less visible to users. But for consistency:

**Replace Sparkles with FileText or a neutral icon:**
```tsx
// Import FileText instead of Sparkles
import { FileText, Loader2, ArrowLeft, Eye, Save, AlertCircle } from "lucide-react";

// In header (line 151):
<FileText className="w-6 h-6 text-primary" />

// In button (line 236):
<FileText className="w-4 h-4 mr-2" />

// In empty state (line 266):
<FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />

// In publish button (line 320):
<ArrowRight className="w-4 h-4 mr-2" /> // or just remove icon
```

---

## Files to Modify (Summary)

| File | Changes |
|------|---------|
| `src/pages/Partners.tsx` | Remove Sparkles from badge, replace icon in grid, remove emojis |
| `src/pages/Account.tsx` | Replace Sparkles sidebar logo with Logo component |
| `src/components/landing/ProductPreview.tsx` | Replace Bot with "PP", replace Sparkles bullets with dots |
| `src/pages/dashboard/Home.tsx` | Replace Bot with MessageSquare |
| `src/pages/admin/ArticleGenerator.tsx` | Replace Sparkles with FileText |

---

## Visual Summary

| Before | After |
|--------|-------|
| `Sparkles` in badges | Text-only label |
| `Bot` icon for AI | "PP" initials or MessageSquare |
| Emoji categories (🏋️🧬💪) | Text-only with left border accent |
| `Sparkles` in feature bullets | Simple dot bullets |

---

## Implementation Order

1. `src/pages/Account.tsx` - Quick sidebar logo fix
2. `src/pages/dashboard/Home.tsx` - Replace Bot with MessageSquare
3. `src/components/landing/ProductPreview.tsx` - Replace Bot and Sparkles
4. `src/pages/Partners.tsx` - Remove Sparkles and emojis
5. `src/pages/admin/ArticleGenerator.tsx` - Replace Sparkles (admin page, lower priority)

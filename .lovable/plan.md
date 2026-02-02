
# Remove Remaining Sparkles & Bot Icons

## Problem

The site still has `Sparkles` (star) and `Bot` (robot) icons throughout the codebase. These are dead giveaways of AI-template design and need to be replaced with the "PP" initials avatar or removed entirely.

---

## Files with Remaining Icons

### **Sparkles Icon (16 files)**

| File | Usage | Fix |
|------|-------|-----|
| `src/components/landing/HeroDemo.tsx` | Bot icon in chat header + answer area | Replace with "PP" initials |
| `src/components/landing/ChatbotDemo.tsx` | Bot + Sparkles in section header and paywall | Replace with text-only header, remove Sparkles from paywall |
| `src/components/chat/ChatWidget.tsx` | Bot icon in header | Replace with "PP" initials |
| `src/components/dashboard/ChatInterface.tsx` | Sparkles in empty state logo + message header | Replace with "PP" initials |
| `src/components/dashboard/DashboardHeader.tsx` | Sparkles in logo | Replace with Logo component |
| `src/components/dashboard/WelcomeBanner.tsx` | Bot + Sparkles icons | Replace with "PP" initials |
| `src/components/dashboard/NewsSummary.tsx` | Sparkles icon in Key Takeaways header | Remove icon, use text-only |
| `src/pages/Login.tsx` | Sparkles in logo | Replace with Logo component |
| `src/pages/Signup.tsx` | Sparkles in logo | Replace with Logo component |
| `src/pages/History.tsx` | Sparkles in sidebar logo | Replace with Logo component |
| `src/pages/Saved.tsx` | Sparkles in sidebar logo | Replace with Logo component |
| `src/pages/Stats.tsx` | Sparkles in sidebar logo | Replace with Logo component |
| `src/pages/Referral.tsx` | Sparkles in sidebar logo + content | Replace with Logo component, remove other uses |
| `src/pages/ReferralLanding.tsx` | Sparkles in loading indicator | Replace with simple arrow or text |
| `src/components/dashboard/DashboardSidebar.tsx` | Bot icon in nav | Replace with text-based approach |

---

## Implementation Details

### 1. HeroDemo.tsx

**Current:**
```tsx
<Bot className="w-4 h-4 text-primary" />
```

**Replace with "PP" initials:**
```tsx
<div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
  <span className="text-xs font-bold text-primary-foreground">PP</span>
</div>
```

Also remove emojis from the demo answers (lines 11-41).

### 2. ChatbotDemo.tsx

**Section header:**
Replace Bot icon badge with text-only:
```tsx
<p className="text-sm font-medium text-primary tracking-wide uppercase mb-4">
  Live Demo
</p>
```

**Paywall section:**
Remove Sparkles icon, use clean text:
```tsx
<div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
  <span className="text-sm font-bold text-primary-foreground">PP</span>
</div>
```

### 3. ChatWidget.tsx

**Header icon:**
```tsx
<div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
  <span className="text-sm font-bold text-primary-foreground">PP</span>
</div>
```

### 4. ChatInterface.tsx

**Empty state logo (line 367-368):**
```tsx
<div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-6">
  <span className="text-xl font-bold text-primary-foreground">PP</span>
</div>
```

**Message header icon (line 464-465):**
```tsx
<div className="w-5 h-5 rounded-md bg-primary flex items-center justify-center">
  <span className="text-[8px] font-bold text-primary-foreground">PP</span>
</div>
```

### 5. DashboardHeader.tsx

**Logo:**
Import and use the Logo component:
```tsx
import { Logo } from "@/components/brand/Logo";

// Replace:
<div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
  <Sparkles className="w-4 h-4 text-primary-foreground" />
</div>

// With:
<Logo showText={false} size="sm" />
```

### 6. WelcomeBanner.tsx

**Replace Bot icon:**
```tsx
<div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
  <span className="text-sm font-bold text-primary">PP</span>
</div>
```

**Remove Bot from mobile stats, just use text.**

### 7. NewsSummary.tsx

**Remove icon from header:**
```tsx
<div className="flex items-center gap-3 mb-4">
  <div className="w-8 h-0.5 bg-primary/60" />
  <h2 className="font-semibold text-lg">Key Takeaways</h2>
</div>
```

### 8-13. Login, Signup, History, Saved, Stats, Referral Pages

**All use Sparkles in sidebar logo. Replace with Logo component:**
```tsx
import { Logo } from "@/components/brand/Logo";

// In the sidebar header:
<Link to="/" className="flex items-center gap-2">
  <Logo size="sm" />
</Link>
```

### 14. ReferralLanding.tsx

**Remove Sparkles from redirect indicator:**
```tsx
<div className="flex items-center justify-center gap-2 text-primary mb-8">
  <span className="font-medium">Redirecting to signup</span>
  <ArrowRight className="w-5 h-5" />
</div>
```

### 15. DashboardSidebar.tsx

**Replace Bot icon with text:**

The sidebar uses icons for navigation, which is functional and expected. However, the "AI Assistant" label with Bot icon should be updated:

```tsx
// Instead of Bot icon, use a simple circle with PP
{ 
  icon: () => <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center"><span className="text-[8px] font-bold text-primary-foreground">PP</span></div>, 
  label: "AI Assistant", 
  path: "/dashboard/chat" 
}
```

Actually, for navigation this is complex. Keep the icon-based nav but change to a different icon like `MessageSquare` which is functional and standard:
```tsx
{ icon: MessageSquare, label: "AI Assistant", path: "/dashboard/chat" },
```

---

## Remove Emojis from Demo Content

### HeroDemo.tsx

Replace emoji-heavy demo answers with clean typography:

**Current:**
```tsx
✅ **Semaglutide** (Ozempic, Wegovy)
🔬 **No reported toxicity**
💪 **BPC-157**
```

**New:**
```tsx
• **Semaglutide** (Ozempic, Wegovy)
• **No reported toxicity** in animal models
• **BPC-157**: Gut-derived, promotes tissue healing
```

### ChatWidget.tsx

**Remove emoji from welcome message:**
```tsx
const WELCOME_MESSAGE = `Hey! I'm your Peptide Playbook research assistant.

**I can help you:**
• Compare any peptides side-by-side
• Check FDA approval status instantly
• Understand mechanisms and research
• Separate real science from TikTok hype

Ask me anything about peptides.`;
```

---

## Files to Modify (Summary)

| File | Changes |
|------|---------|
| `src/components/landing/HeroDemo.tsx` | Replace Bot with PP, remove emojis |
| `src/components/landing/ChatbotDemo.tsx` | Replace Bot/Sparkles with PP/text |
| `src/components/chat/ChatWidget.tsx` | Replace Bot with PP, remove emoji |
| `src/components/dashboard/ChatInterface.tsx` | Replace Sparkles with PP |
| `src/components/dashboard/DashboardHeader.tsx` | Use Logo component |
| `src/components/dashboard/WelcomeBanner.tsx` | Replace Bot with PP |
| `src/components/dashboard/NewsSummary.tsx` | Remove Sparkles |
| `src/components/dashboard/DashboardSidebar.tsx` | Replace Bot with MessageSquare |
| `src/pages/Login.tsx` | Use Logo component |
| `src/pages/Signup.tsx` | Use Logo component |
| `src/pages/History.tsx` | Use Logo component |
| `src/pages/Saved.tsx` | Use Logo component |
| `src/pages/Stats.tsx` | Use Logo component |
| `src/pages/Referral.tsx` | Use Logo component, remove Sparkles |
| `src/pages/ReferralLanding.tsx` | Remove Sparkles |

---

## Visual Changes

| Before | After |
|--------|-------|
| `Sparkles` star icon in logos | Custom molecule SVG (Logo component) |
| `Bot` robot icon in chat | "PP" initials avatar |
| Emoji bullets (✅🔬💪🦴🔥⚠️) | Simple bullet points (•) or dashes |
| Icon in colored container | Text initials or accent line |

---

## Implementation Order

1. Update HeroDemo.tsx (hero demo on landing page)
2. Update ChatbotDemo.tsx (interactive demo section)
3. Update ChatWidget.tsx (floating chat)
4. Update ChatInterface.tsx (dashboard chat)
5. Update all sidebar pages (Login, Signup, History, Saved, Stats, Referral, ReferralLanding)
6. Update dashboard components (DashboardHeader, WelcomeBanner, NewsSummary, DashboardSidebar)

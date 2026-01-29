
# Fix Misleading "Try Free" Language on Landing Page

## The Problem

The landing page has confusing messaging around "free" that makes it seem like users can try the full product for free:

1. **Hero button says "Try AI Assistant Free"** → Goes to `/signup` (a paid page)
2. **ChatbotDemo badge says "Try It Free"** → This IS the controlled demo, but the language is misleading

Users seeing "Try AI Assistant Free" expect to actually try it free, not land on a signup/payment page.

---

## The Solution

### 1. Update Hero CTA Button

Change from:
```
"Try AI Assistant Free" → links to /signup
```

To:
```
"Get Full Access" → links to /signup
```

OR point to the demo section:
```
"Try Demo" → links to #demo
```

**Recommended approach:** Change the primary CTA to point to the demo section (`#demo`) so users can actually "try" something, then update the text to match.

| Current | Proposed |
|---------|----------|
| "Try AI Assistant Free" → `/signup` | "See It In Action" → `#demo` |

The second button "See What's Included" stays as is, pointing to `#product`.

### 2. Update ChatbotDemo Badge

Change the badge from:
```
"Try It Free"
```

To:
```
"Live Demo"
```

This correctly sets expectations - it's a demo, not the full product for free.

---

## Files to Modify

### 1. `src/components/landing/HeroSection.tsx`

**Line 111-116:**
```tsx
// Change from:
<Link to="/signup">
  <Button size="lg" className="btn-primary-clean h-12 px-8 text-base group">
    <Sparkles className="w-4 h-4 mr-2" />
    Try AI Assistant Free
  </Button>
</Link>

// To:
<a href="#demo">
  <Button size="lg" className="btn-primary-clean h-12 px-8 text-base group">
    <Sparkles className="w-4 h-4 mr-2" />
    See It In Action
  </Button>
</a>
```

This makes the primary CTA scroll to the demo section where users can actually interact with the bot.

### 2. `src/components/landing/ChatbotDemo.tsx`

**Line 106-109:**
```tsx
// Change from:
<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
  <Bot className="w-4 h-4" />
  Try It Free
</div>

// To:
<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
  <Bot className="w-4 h-4" />
  Live Demo
</div>
```

---

## Updated User Flow

```
┌─────────────────────────────────────────────────────────────┐
│  HERO SECTION                                               │
│                                                             │
│  [See It In Action] ─────────────► Scrolls to #demo         │
│  [See What's Included] ──────────► Scrolls to #product      │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  DEMO SECTION (ChatbotDemo)                                 │
│                                                             │
│  Badge: "Live Demo"                                         │
│  User picks 1 of 4 questions → Gets real AI response        │
│  After response → Paywall: "Get Full Access — $67"          │
└─────────────────────────────────────────────────────────────┘
```

---

## Result

- **No more "free" confusion** - Language accurately describes what happens
- **Better conversion funnel** - Hero CTA leads to demo where users experience the product, then see the paywall
- **Controlled demo intact** - Users can only ask 1 of 4 questions, then hit the paywall

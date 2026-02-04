
# Internal Product Redesign - Premium Dashboard Experience

## Overview

Transform the internal product experience (dashboard, lessons, my plan, AI coach, settings) from "free template" to "premium $99 product" using the specified design direction: **Headspace meets Linear meets Duolingo**.

This is a **visual redesign only** - no functionality changes, no public page changes.

---

## Current State Analysis

| Component | Current Issue |
|-----------|---------------|
| Sidebar | Light/warm gray, blends with content, not distinct |
| Color Palette | Charcoal grays, no vibrant primary color |
| Cards | Basic borders, minimal shadows, flat feel |
| Typography | Good base, but lacks premium polish |
| Progress indicators | Basic, not celebratory |
| Overall feel | Template-like, not worth $99 |

---

## Design System Changes

### 1. Color Palette (CSS Variables)

Update `src/index.css` with new teal/emerald primary and warm grays:

```css
:root {
  /* Primary - Deep teal/emerald (health, trust, premium) */
  --primary: 168 76% 42%;           /* teal-500 */
  --primary-foreground: 0 0% 100%;
  
  /* Warm grays (not cold/sterile) */
  --background: 30 6% 98%;          /* warm off-white */
  --foreground: 20 14% 11%;         /* warm charcoal */
  
  --card: 0 0% 100%;
  --card-foreground: 20 14% 11%;
  
  --muted: 30 6% 96%;
  --muted-foreground: 24 5% 45%;
  
  /* Accent - Warm amber for celebrations */
  --accent-amber: 43 96% 56%;
  
  /* Success */
  --success: 142 76% 36%;
  
  /* Dark sidebar */
  --sidebar-background: 20 14% 11%; /* gray-900 warm */
  --sidebar-foreground: 30 6% 96%;
  --sidebar-border: 20 14% 18%;
  --sidebar-accent: 168 76% 42%;    /* teal highlight */
}
```

### 2. New Utility Classes

Add to `src/index.css`:

```css
/* Premium card styles */
.card-premium {
  @apply bg-white rounded-2xl border border-gray-200;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03);
  transition: all 0.2s ease;
}

.card-premium:hover {
  box-shadow: 0 2px 6px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.06);
  transform: translateY(-2px);
}

/* Featured card (gradient teal) */
.card-featured {
  @apply rounded-2xl text-white;
  background: linear-gradient(135deg, hsl(168, 76%, 42%) 0%, hsl(168, 76%, 36%) 100%);
}

/* Teal gradient progress bar */
.progress-teal .progress-indicator {
  background: linear-gradient(90deg, hsl(168, 76%, 52%) 0%, hsl(168, 76%, 42%) 100%);
}

/* Primary button with glow */
.btn-teal {
  background: linear-gradient(135deg, hsl(168, 76%, 42%) 0%, hsl(168, 76%, 36%) 100%);
  box-shadow: 0 2px 8px rgba(20, 184, 166, 0.3);
}

.btn-teal:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(20, 184, 166, 0.4);
}
```

---

## Component Redesigns

### 3. DashboardSidebar.tsx - Dark Sidebar

Transform from light to dark sidebar with teal accent:

**Key Changes:**
- Background: `bg-gray-900` (warm charcoal)
- Text: `text-gray-400` default, `text-white` on hover/active
- Active state: Teal left border + subtle teal background
- Logo: White text on dark
- User info: Avatar + name at bottom
- Collapse to icons on desktop, bottom nav on mobile

**Visual Structure:**
```
┌──────────────────┐
│  [Logo] Peptide  │  ← White text
│  Playbook        │
│  ─────────────── │
│                  │
│  ◉ Dashboard     │  ← Teal highlight bar when active
│  ○ My Course     │
│  ○ My Plan       │
│  ○ AI Coach      │
│                  │
│  ─────────────── │
│  ⚙ Settings      │
│                  │
│  [Avatar] Carter │  ← User at bottom
│  Fat Loss Course │
└──────────────────┘
```

### 4. Mobile Bottom Navigation

Create `src/components/dashboard/MobileBottomNav.tsx`:

**Purpose:** Replace sidebar with bottom tab bar on mobile (iOS-style)

**Structure:**
```
┌─────────────────────────────────────┐
│  🏠    📚    📋    💬    ⚙        │
│  Home  Course Plan  Coach Settings  │
└─────────────────────────────────────┘
```

**Styling:**
- Fixed bottom, safe area padding for notched phones
- Active tab: Teal icon + label
- Inactive: Gray icon, no label

### 5. DashboardLayout.tsx Updates

**Changes:**
- Add mobile bottom nav component
- Warm off-white background (`bg-stone-50`)
- Max-width container (1200px) with proper padding
- Hide sidebar on mobile, show bottom nav instead

### 6. Dashboard Home Page Redesign

**File:** `src/pages/dashboard/Home.tsx`

**Key Changes:**

1. **Personalized Greeting Header**
   - Time-of-day greeting ("Good morning, Carter")
   - Course context always visible ("Day 5 of 56 · Fat Loss Course")

2. **Progress Bar Card**
   - Prominent progress visualization
   - Percentage + days completed
   - Teal gradient fill

3. **Today's Lesson Card (FEATURED)**
   - Gradient teal background (card-featured)
   - Hero card styling
   - "Start Lesson" button (white on teal)
   - Read time indicator

4. **Quick Action Cards** (2-col grid)
   - AI Coach card with icon
   - My Plan card with icon
   - Hover lift effect

5. **Milestones Section**
   - Vertical timeline style
   - Completed: Check icon + green
   - Upcoming: Circle + muted
   - Celebratory when achieved

### 7. CourseLessons.tsx Redesign

**Key Changes:**

1. **Lesson Card States**
   - Completed: Check icon, subtle green left border, muted text
   - Current: Highlighted card, teal accent, "Continue" button visible
   - Locked: Lock icon, grayed out, visible but disabled

2. **Phase Headers**
   - Collapsible sections
   - Day range indicator

3. **Progress Bar**
   - Teal gradient fill
   - Percentage display

### 8. MyPlan.tsx Redesign

**Key Changes:**

1. **Peptide Cards**
   - Premium card styling with hover lift
   - Dosing schedule table with clean borders
   - Expandable sections for side effects, tips

2. **Guides Cards** (2-col grid)
   - Icon + title cards
   - Click to expand full guide

3. **Supplies Checklist**
   - Interactive checkboxes
   - Progress indicator

### 9. Coach.tsx / AskCoach.tsx Redesign

**Key Changes:**

1. **Empty State**
   - Centered welcome message
   - Suggested question chips (teal outline)
   - Warm, inviting copy

2. **Message Styling**
   - User: Right-aligned, teal background, white text
   - Assistant: Left-aligned, `bg-gray-100`, dark text
   - Avatar icons for both

3. **Input Area**
   - Rounded input with send button
   - Smooth typing indicator (3 dots animation)

### 10. Settings.tsx Redesign

**Key Changes:**
- Card sections for Profile, Membership, Legal
- Premium card styling
- Consistent spacing and typography

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/index.css` | New color palette, utility classes |
| `tailwind.config.ts` | Extended color tokens if needed |
| `src/components/dashboard/DashboardSidebar.tsx` | Dark sidebar with teal accents |
| `src/components/dashboard/DashboardLayout.tsx` | Mobile bottom nav, layout adjustments |
| `src/components/dashboard/MobileBottomNav.tsx` | NEW - Bottom navigation for mobile |
| `src/pages/dashboard/Home.tsx` | Premium dashboard layout |
| `src/pages/dashboard/CourseLessons.tsx` | Lesson card states, progress |
| `src/pages/dashboard/MyPlan.tsx` | Card styling, guides |
| `src/pages/dashboard/Coach.tsx` | Chat styling, suggestions |
| `src/components/coach/AskCoach.tsx` | Message bubbles, input |
| `src/pages/dashboard/Settings.tsx` | Card styling |
| `src/pages/dashboard/Progress.tsx` | Stats cards, calendar |
| `src/components/ui/progress.tsx` | Teal gradient variant |
| `src/components/ui/button.tsx` | Teal button variant |

---

## Micro-interactions

1. **Card Hover**: `translateY(-2px)` + enhanced shadow
2. **Button Hover**: `translateY(-1px)` + shadow glow
3. **Progress Bar**: Animated fill on value change
4. **Lesson Complete**: Check mark animate in (scale from 0)
5. **Page Transitions**: Subtle fade (already have framer-motion)
6. **Nav Items**: Background highlight fade in (150ms)

---

## Milestone Celebrations

Create `src/components/dashboard/MilestoneCelebration.tsx`:

**Trigger on:**
- First check-in
- First injection (Day 5)
- Week 1 complete
- First dose increase
- One month complete
- Course complete

**Visual:**
- Modal with centered content
- Celebratory icon (or subtle confetti)
- Warm copy
- Continue button

---

## Technical Notes

1. **No functionality changes** - Pure visual update
2. **No public page changes** - Only internal dashboard
3. **Preserve existing component structure** - Update styling only
4. **Mobile-first responsive** - Bottom nav replaces sidebar
5. **Framer Motion** - Already installed for animations
6. **Tailwind** - All styling via Tailwind utilities + CSS vars

---

## Expected Outcome

Before: "This looks like every other template"
After: "This feels like a premium product worth $99"

The redesign creates:
- Clear visual hierarchy with dark sidebar
- Celebratory progress tracking
- Premium card styling with depth
- Teal/emerald brand color (health/trust)
- Warm, approachable feel
- Modern micro-interactions



# Interior Redesign v2 - Match Landing Page Aesthetic

## Overview

Transform the internal dashboard to seamlessly match the landing page design language. The landing page uses:
- Clean black/white base with minimal color
- Soft pastel gradient accents on cards (teal, blue, purple, pink, orange)
- Cards with colored gradient bars at the top
- Dark buttons (black background, white text)
- Clean typography with generous white space
- Subtle shadows with no heavy visual elements

**Current problem:** The dashboard uses a dark sidebar with teal-heavy accent colors, which clashes with the landing page's clean black/white aesthetic.

---

## Design System Changes

### 1. Update CSS Variables (`src/index.css`)

Replace the current teal-focused palette with the landing page's clean black/white system:

```css
:root {
  /* Keep landing page's clean black/white base */
  --primary: 0 0% 9%;              /* Near black - matches PillButton dark variant */
  --primary-foreground: 0 0% 100%; /* White */
  
  /* Clean backgrounds */
  --background: 0 0% 100%;         /* Pure white for main bg */
  --foreground: 0 0% 9%;           /* Near black text */
  
  --card: 0 0% 100%;               /* White cards */
  --card-foreground: 0 0% 9%;
  
  /* Softer muted tones */
  --muted: 0 0% 96%;               /* #f5f5f5 - subtle gray bg */
  --muted-foreground: 0 0% 45%;    /* Gray-500 equivalent */
  
  /* Light sidebar (not dark!) */
  --sidebar-background: 0 0% 100%; /* White */
  --sidebar-foreground: 0 0% 9%;
  --sidebar-border: 0 0% 94%;      /* Very light gray border */
  
  /* Pastel accent colors for gradient cards */
  --accent-coral: 0 84% 85%;       /* #fda4af equivalent */
  --accent-purple: 260 80% 80%;    /* #c4b5fd equivalent */
  --accent-orange: 30 95% 72%;     /* #fdba74 equivalent */
  --accent-blue: 210 95% 78%;      /* #93c5fd equivalent */
  --accent-green: 140 75% 73%;     /* #86efac equivalent */
}
```

### 2. New Utility Classes

Replace teal-focused classes with black/white + pastel gradient system:

```css
/* Featured card with gradient top bar */
.card-featured-coral::before {
  background: linear-gradient(135deg, #fda4af 0%, #fb7185 100%);
}
.card-featured-purple::before {
  background: linear-gradient(135deg, #c4b5fd 0%, #a78bfa 100%);
}
.card-featured-orange::before {
  background: linear-gradient(135deg, #fdba74 0%, #fb923c 100%);
}
.card-featured-blue::before {
  background: linear-gradient(135deg, #93c5fd 0%, #60a5fa 100%);
}

/* Black primary button (matching PillButton dark variant) */
.btn-primary-dark {
  @apply bg-foreground text-background font-semibold px-6 py-3 rounded-full;
  transition: all 0.2s ease;
}
.btn-primary-dark:hover {
  @apply bg-foreground/90;
}

/* Progress bar - black fill (matching landing page minimalism) */
.progress-clean {
  @apply h-2 bg-muted rounded-full;
}
.progress-clean-fill {
  @apply h-full bg-foreground rounded-full;
}
```

---

## Component Changes

### 3. White Sidebar with Clean Navigation (`DashboardSidebar.tsx`)

Transform dark sidebar to clean white sidebar matching the landing page Navbar style:

**Changes:**
- Background: White (not dark gray)
- Logo: Same uppercase "PEPTIDE PLAYBOOK" style as Navbar
- Nav items: Gray text, black on hover/active
- Active state: Subtle gray background + black text (no teal accents)
- Border: Light gray right border
- User info: Clean avatar + name at bottom

**Code structure:**
```tsx
<aside className="fixed left-0 top-0 w-[220px] h-screen bg-white border-r border-gray-100 flex flex-col">
  {/* Logo - matches Navbar style */}
  <div className="p-6">
    <div className="flex flex-col">
      <span className="text-lg font-bold tracking-tight uppercase">Peptide</span>
      <span className="text-lg font-bold tracking-tight uppercase -mt-1">Playbook</span>
    </div>
  </div>
  
  {/* Navigation */}
  <nav className="flex-1 px-3">
    <NavLink className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:text-black hover:bg-gray-50">
      ...
    </NavLink>
  </nav>
  
  {/* User at bottom */}
  <div className="p-4 border-t border-gray-100">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-gray-200 rounded-full" />
      <div>
        <p className="text-sm font-medium text-black">Carter</p>
        <p className="text-xs text-gray-400">Fat Loss Course</p>
      </div>
    </div>
  </div>
</aside>
```

### 4. Mobile Bottom Nav (`MobileBottomNav.tsx`)

Keep bottom navigation but update colors:
- Background: White
- Active: Black icon/text
- Inactive: Gray icon/text

### 5. Dashboard Layout (`DashboardLayout.tsx`)

- Main content background: `#fafafa` (subtle off-white, matching landing page secondary areas)
- Content area padding: 32px
- Max-width container for content

---

## Page Redesigns

### 6. Dashboard Home (`src/pages/dashboard/Home.tsx`)

**Key changes:**

1. **Progress Card** - Simple white card with black progress bar fill (not teal gradient)

2. **Today's Lesson Card** - Featured card with coral gradient top bar (matching landing page feature cards):
```tsx
<div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
  {/* Coral gradient top bar */}
  <div className="h-1 bg-gradient-to-r from-[#fda4af] to-[#fb7185]" />
  <div className="p-6">
    {/* Content with black "Start Lesson →" button */}
  </div>
</div>
```

3. **Quick Action Cards** - AI Coach (purple gradient bar), My Plan (orange gradient bar)

4. **Milestones** - Simple white card with check icons (green for complete, gray for upcoming)

5. **Buttons** - Black rounded-full buttons like landing page PillButton

### 7. Course Lessons Page (`CourseLessons.tsx`)

**Key changes:**

1. **Progress bar** - Black fill instead of teal gradient

2. **Lesson cards**:
   - Completed: Green check icon, slightly muted text
   - Current: Black border highlight, "Current" badge in black rounded-full
   - Locked: Gray with lock icon

3. **Phase headers** - Clean gray background

### 8. My Plan Page (`MyPlan.tsx`)

**Key changes:**

1. **Peptide card** - Coral gradient top bar (like featured landing cards)

2. **Guide cards grid** - Each with different pastel gradient bars:
   - Reconstitution: Blue gradient
   - Injection Guide: Pink gradient  
   - Dosing Calculator: Orange gradient

3. **Supplies checklist** - Clean checkboxes with black accent color

### 9. AI Coach Page (`Coach.tsx` / `AskCoach.tsx`)

**Key changes:**

1. **Empty state** - Purple icon container, centered text, suggested question chips with gray borders

2. **Message bubbles**:
   - User: Black background, white text
   - Assistant: White background, gray border, black text

3. **Input area** - Rounded white input with black send button

### 10. Settings Page (`Settings.tsx`)

**Key changes:**
- Clean white cards with subtle borders
- Black buttons for primary actions
- Consistent typography

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/index.css` | New color palette, remove teal utilities, add pastel gradient classes |
| `src/components/dashboard/DashboardSidebar.tsx` | White sidebar, clean typography |
| `src/components/dashboard/MobileBottomNav.tsx` | White with black active states |
| `src/components/dashboard/DashboardLayout.tsx` | Off-white main background |
| `src/pages/dashboard/Home.tsx` | Black buttons, pastel gradient cards |
| `src/pages/dashboard/CourseLessons.tsx` | Black progress, clean lesson cards |
| `src/pages/dashboard/MyPlan.tsx` | Pastel gradient guide cards |
| `src/pages/dashboard/Coach.tsx` | Black/white chat bubbles |
| `src/components/coach/AskCoach.tsx` | Updated message styling |
| `src/pages/dashboard/Settings.tsx` | Clean white cards |

---

## Color Mapping Summary

| Landing Page Element | Dashboard Equivalent |
|---------------------|---------------------|
| `PillButton dark` (black bg) | Primary buttons in dashboard |
| `bg-secondary/50` (off-white sections) | Main content area background |
| Cards with colored gradient bars | Featured cards in dashboard |
| `text-muted-foreground` (gray-500) | Secondary text throughout |
| Black text headers | All headings |
| Clean white cards with subtle borders | All card components |

---

## Expected Outcome

**Before:** Dark sidebar, teal accents everywhere, feels disconnected from landing page
**After:** Clean white sidebar, black/white base, subtle pastel accents, seamless continuation of landing page aesthetic

The interior will feel like the user is still on the same premium, modern product they saw on the landing page.



# Dashboard "Command Center" Dark Theme Implementation

Complete visual overhaul of the dashboard home page from light mode to a cinematic dark theme. All 12 files modified, zero database changes, all existing data flow untouched.

---

## Step 1: Font Imports

**File: `index.html` (line 34)**

Update the Google Fonts link to add Plus Jakarta Sans (weights 500,600,700,800) and IBM Plex Mono (weights 400,500,600) alongside existing DM Sans and JetBrains Mono.

---

## Step 2: Dark Layout Background

**File: `DashboardLayout.tsx`**

- Import `useLocation` from react-router-dom
- When path starts with `/dashboard`: apply `#08080A` background with 3 CSS layers:
  - Gradient mesh nebula (3 radial gradients at 3-4% opacity for subtle warm glow)
  - Micro dot grid pattern (20px spacing, 3% white dots)
- Non-dashboard routes keep existing `#FAFAFA`

---

## Step 3: Dark Top Navigation

**File: `DashboardTopNav.tsx`**

- Import `useLocation`, detect `/dashboard` routes
- Dark mode: `#08080A` background, `rgba(255,255,255,0.05)` border
- Nav pills: `#4A4A5A` default, active gets `#19191E` bg + `#EBEBF0` text
- Mobile menu panel: `#111114` background with dark-styled items
- Avatar and dropdown styling adjusted for dark context

---

## Step 4: Dark Bottom Navigation

**File: `MobileBottomNav.tsx`**

- Import `useLocation`, detect `/dashboard` routes
- Dark mode: `#08080A` background, `rgba(255,255,255,0.05)` border
- Icons: `#4A4A5A` default, `#EBEBF0` active

---

## Step 5: Home Page Container

**File: `Home.tsx`**

- Loading skeletons: `bg-[#19191E]` instead of default muted
- Container animation variants updated with `filter: "blur(4px)"` for cinematic entrance
- All data passing to child components stays identical

---

## Step 6: Animated Gradient Progress Ring

**File: `ProgressRing.tsx` (full rewrite)**

- Built-in SVG `linearGradient` definition (orange to rose to violet)
- Track color: `#19191E` (dark)
- Animated `stroke-dashoffset` from 0% to current on mount (1.2s ease-out) using framer-motion `useMotionValue` + `useTransform`
- `stroke-linecap: round`
- Drop-shadow glow: `drop-shadow(0 0 8px rgba(249,115,22,0.15))`
- Center: percentage in IBM Plex Mono weight 700, `#EBEBF0` text, "complete" sublabel in `#4A4A5A`
- Props: size (100px desktop / 88px mobile), strokeWidth, animated flag, showLabel flag

---

## Step 7: No-Protocol State (Dark Redesign)

**File: `NoProtocolState.tsx` (full rewrite)**

- Greeting: Plus Jakarta Sans, weight 800, 32px (28px mobile), `#EBEBF0`, no emoji
- Subtitle: "Your protocol starts here." in `#8A8A9A`
- Hero CTA card:
  - Background: `linear-gradient(135deg, #111114, #16131E, #131118)`
  - Border: `rgba(255,255,255,0.06)`, 24px radius
  - Decorative SVG hexagons (bottom-right, clipped, hidden on mobile)
  - "PROTOCOL ENGINE" label in IBM Plex Mono, `#F97316`
  - Heading with gradient text on "personalized" using logo gradient
  - Orange gradient CTA button with glow hover/shadow effects
  - "Takes about 3 minutes" in IBM Plex Mono `#4A4A5A`
- 3 feature preview cards: `#111114` bg, 50% opacity (locked), lock icon top-right
- Trust strip: IBM Plex Mono uppercase, orange-tinted dots

---

## Step 8: Active Protocol State (Dark Command Center)

**File: `ActiveProtocolState.tsx` (full rewrite)**

All fonts switch to Plus Jakarta Sans (headings) and IBM Plex Mono (data). All colors to dark palette.

### Hero Status Card
- Dark card with gradient tint background, decorative hexagons (hidden mobile)
- Two-column desktop (info left, ProgressRing right), single column mobile (ring centered above)
- Greeting: `#4A4A5A`, protocol name: Plus Jakarta Sans weight 800 `#EBEBF0`
- Stat pills on `#19191E` with colored dot indicators (orange=week, rose=day, green=compliance)
- Full-width gradient progress bar with animated width reveal
- "X days remaining" right-aligned below bar

### Today's Stack
- "Today's Stack" in Plus Jakarta Sans `#EBEBF0`, date in IBM Plex Mono `#4A4A5A`
- Compound cards, completion banner, rest day card (all dark themed)

### Streak Counter (only if currentStreak >= 2)
- `#111114` card, fire icon with orange glow filter
- Streak number in `#F97316`, "day streak" label in `#EBEBF0`
- "Keep going." in `#4A4A5A`

### Quick Access
- 3 dark cards with colored icon containers on `#19191E`
- Arrow top-right in `#4A4A5A`
- Hover: bg `#222228`, `translateY(-2px)`
- Links: AI Coach, My Protocol, Progress

### Footer disclaimer
- `#4A4A5A` text, border `rgba(255,255,255,0.05)`

---

## Step 9: Dark Compound Cards

**File: `CompoundCard.tsx`**

- Background: `#111114`, border: `rgba(255,255,255,0.05)`
- 3px left accent bar (category colored, same logic)
- Compound name: `#EBEBF0` (Plus Jakarta Sans), dose in category color (IBM Plex Mono)
- Route: `#8A8A9A`, timing: `#4A4A5A`
- 28px circular checkbox:
  - Unchecked: border `rgba(255,255,255,0.12)`
  - Checked: `#34D399` fill, white checkmark, spring bounce animation
  - Card content fades to 40% opacity when checked
  - Brief green glow flash on checkbox
- Hover: `translateY(-1px)`, border brightens to `rgba(255,255,255,0.14)`

---

## Step 10: Dark Completion Banner

**File: `CompletionBanner.tsx`**

- Background: `rgba(52,211,153,0.08)`
- Border: `rgba(52,211,153,0.12)`, 16px radius
- 32px green circle with white checkmark
- "Day X Complete" in `#EBEBF0`, body in `#8A8A9A`
- "Consistency builds results. See you tomorrow."

---

## Step 11: Dark Rest Day Card

**File: `RestDayCard.tsx`**

- Border: `2px dashed rgba(255,255,255,0.06)`
- "Rest Day" in `#EBEBF0`, body in `#8A8A9A`
- Next scheduled info in `#4A4A5A` (IBM Plex Mono)

---

## Step 12: Orange Gradient Floating Chat Button

**File: `FloatingChatButton.tsx`**

- Background: `linear-gradient(135deg, #F97316, #EA580C)` (always, not just hover)
- Box-shadow: `0 4px 20px rgba(249,115,22,0.3)`
- CSS pulse keyframe animation when `shouldPulse` (expanding ring at 2.5s interval)
- Hover: `scale(1.08)`, increased glow
- Active: `scale(0.96)`

---

## What Does NOT Change

- Zero routing changes
- Zero hook/query changes (useUserProtocol, useDailyLog, useProfile, useProgressData all untouched)
- Zero database/schema changes
- Zero other pages affected
- All data flow remains identical
- All existing props and interfaces preserved



# Split Hero Layout with Live Chatbot Demo

## The Vision

A side-by-side hero layout that immediately demonstrates value - content on the left, live chatbot on the right. Visitors see the AI in action within seconds of landing.

```text
Desktop Layout:
+------------------------+------------------------+
|                        |                        |
|  Ask Anything About    |  ┌──────────────────┐  |
|  Peptides              |  │ What peptides    │  |
|  Get Research Backed   |  │ are FDA approved?│  |
|  Answers               |  ├──────────────────┤  |
|                        |  │ Several peptides │  |
|  [Get Full Access]     |  │ have FDA approval│  |
|  [See It In Action]    |  │ ✅ Semaglutide...│  |
|                        |  │ ▊ (typing)       │  |
|  ✓ 30-Day Guarantee    |  └──────────────────┘  |
|                        |                        |
+------------------------+------------------------+

Mobile Layout:
+------------------------+
|  Ask Anything About    |
|  Peptides              |
|  Get Research Backed   |
|  Answers               |
|                        |
|  [Get Full Access]     |
|                        |
|  ┌──────────────────┐  |
|  │ What peptides... │  |
|  └──────────────────┘  |
+------------------------+
```

---

## Implementation

### Step 1: Create `HeroDemo` Component

A compact, self-contained chatbot demo for the hero section:

- **Pre-cached response** - No API call, types out automatically on page load
- **Glassmorphism card** - Matches design system with glass effect
- **Typing animation** - Starts after 1.5s delay, types at realistic speed
- **Interactive question buttons** - 2-3 quick questions above the chat
- **Compact design** - Sized to fit alongside hero content

### Step 2: Restructure `HeroSection` Layout

Change from centered single-column to a two-column grid:

```text
Current:
- max-w-4xl mx-auto (centered)
- text-center

New:
- lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center
- Left column: text-left (H1, subhead, CTAs, trust signals)
- Right column: HeroDemo component
- Mobile: stacks vertically (content first, demo below)
```

### Step 3: Adjust Content Alignment

- H1, subhead, CTAs: Left-aligned on desktop, centered on mobile
- Stats row: Moves to left alignment on desktop
- Trust signals: Horizontal row under CTAs
- Remove redundant "See It In Action" button (demo is already visible)

---

## Files to Modify

| File | Action |
|------|--------|
| `src/components/landing/HeroDemo.tsx` | Create - Compact chatbot demo |
| `src/components/landing/HeroSection.tsx` | Modify - Two-column layout |

---

## Technical Details

### HeroDemo Component

```text
Features:
- Pre-written demo question + response
- Typing animation with realistic timing
- Blinking cursor during typing
- Bot icon + header styling
- Glassmorphism card background
- Optional: 2 quick-pick question pills at top
```

### Responsive Behavior

```text
Desktop (lg+):
- Two columns, 50/50 split
- Content left-aligned
- Demo card on right with slight upward offset

Tablet (md):
- Same two-column but tighter spacing

Mobile (<md):
- Single column, stacked
- Content centered
- Demo below CTAs (smaller version)
```

### Animation Sequence

1. **0s**: Page loads, left content starts animating in
2. **0.3s**: H1 visible
3. **0.5s**: Subheadline visible
4. **0.7s**: Demo card slides in from right
5. **1.5s**: Typing animation begins in demo
6. **~5s**: Full response typed out

---

## Key Differences from Previous Attempt

1. **Split layout** - Demo beside content, not below headline
2. **Left-aligned content** - Creates visual balance with demo on right
3. **More polished demo card** - Better styling, header with bot icon
4. **Proper responsive stacking** - Demo below on mobile, not crammed above stats




# Remove Green/Teal and Replace with Neutral Gray Accent

## Overview
The teal/green color (HSL 173 82% 32%) is currently set as `--primary` and used in 1890 places across 120 files. Rather than manually editing each file, we'll change the CSS variable definitions to a sophisticated neutral gray palette that matches your editorial aesthetic.

## The Solution
Update the `--primary` color in `src/index.css` from teal to a dark charcoal/slate gray. This single change will cascade across:
- All buttons (default variant uses `bg-primary`)
- All text highlights using `text-primary`
- All borders using `border-primary`
- All custom gradient and glow utilities

---

## Color Palette Change

### Before (Teal Green)
| Token | Light Mode | Dark Mode |
|-------|------------|-----------|
| `--primary` | 173 82% 32% (teal) | 173 82% 45% |
| `--ring` | 173 82% 40% | 173 82% 50% |
| `--sidebar-primary` | 173 82% 40% | 173 82% 50% |

### After (Neutral Charcoal)
| Token | Light Mode | Dark Mode |
|-------|------------|-----------|
| `--primary` | 0 0% 15% (charcoal) | 0 0% 90% (off-white) |
| `--ring` | 0 0% 20% | 0 0% 85% |
| `--sidebar-primary` | 0 0% 20% | 0 0% 85% |

---

## Files to Update

### 1. `src/index.css` - Core CSS Variables

**Light mode changes (lines 20-22, 43, 55-56, 60):**
```css
/* Before */
--primary: 173 82% 32%;
--primary-foreground: 0 0% 100%;
--ring: 173 82% 40%;
--sidebar-primary: 173 82% 40%;
--sidebar-ring: 173 82% 40%;

/* After */
--primary: 0 0% 15%;
--primary-foreground: 0 0% 100%;
--ring: 0 0% 20%;
--sidebar-primary: 0 0% 20%;
--sidebar-ring: 0 0% 20%;
```

**Dark mode changes (lines 78-80, 97, 105-106, 110):**
```css
/* Before */
--primary: 173 82% 45%;
--primary-foreground: 222 47% 3%;
--accent: 173 25% 18%;
--ring: 173 82% 50%;
--sidebar-primary: 173 82% 50%;
--sidebar-ring: 173 82% 50%;

/* After */
--primary: 0 0% 90%;
--primary-foreground: 0 0% 5%;
--accent: 0 0% 18%;
--ring: 0 0% 85%;
--sidebar-primary: 0 0% 85%;
--sidebar-ring: 0 0% 85%;
```

**Update custom utilities (lines 155-170, 269-280, 286-340, 359-370, 406-420, 510, 557):**

Replace all hardcoded teal values like:
- `rgba(13, 148, 136, ...)` → `rgba(38, 38, 38, ...)` (charcoal)
- `hsl(173 82% 32%)` → `hsl(0 0% 15%)`

---

## Visual Impact Summary

| Element | Before (Green) | After (Charcoal) |
|---------|----------------|------------------|
| Primary buttons | Teal | Dark charcoal |
| Link text | Teal | Charcoal |
| Focus rings | Teal glow | Subtle gray |
| Progress bars | Teal | Charcoal |
| Highlighted accents | Teal tint | Neutral gray tint |
| Gradient text | Teal gradient | Charcoal gradient |
| Glow effects | Teal shadows | Gray shadows |
| Icon containers | Teal background | Charcoal background |

---

## Technical Summary

- **1 file to edit**: `src/index.css`
- **~20 CSS variable changes**: Update `--primary`, `--ring`, `--accent` (dark mode), `--sidebar-primary`, `--sidebar-ring`
- **~15 hardcoded color value replacements**: Update rgba/hsl values in custom utilities
- **0 component files need editing**: All 120 files using `bg-primary`, `text-primary`, etc. will automatically inherit the new color

This approach is efficient because it uses the design system properly - all components reference CSS variables, so changing the source updates everything at once.


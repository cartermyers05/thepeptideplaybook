

# Remove All Emojis and Replace with Lucide Icons

## Overview
Remove all emoji usage across the site and replace them with clean Lucide icons to maintain the typography-first editorial aesthetic. The user specifically mentioned the party horn (🎉) and DNA (🧬) emojis on onboarding, but emojis are also used in milestones, streak displays, and banners.

## Files to Update

### 1. `src/components/quiz/BuildingAnimation.tsx`
Remove the large 🧬 and 🎉 emojis and replace with Lucide icons:

| Location | Current | Replacement |
|----------|---------|-------------|
| Line 83 (building phase) | 🧬 emoji | `Dna` icon from lucide-react |
| Line 195 (email phase) | 🎉 emoji | `PartyPopper` icon from lucide-react |

**Changes:**
- Import `Dna` and `PartyPopper` from lucide-react
- Replace emoji spans with styled icon components
- Use a circular background container to maintain visual presence

---

### 2. `src/components/landing/UrgencyBanner.tsx`
Remove the 🎉 emoji from the promotional banner:

| Location | Current | Replacement |
|----------|---------|-------------|
| Line 60 | `<span>🎉</span>` | `<Sparkles className="w-4 h-4" />` or simply remove |

**Changes:**
- Import `Sparkles` from lucide-react (or remove the icon entirely for cleaner look)
- Replace emoji with icon

---

### 3. `src/components/coach/CheckInFlow.tsx`
Remove streak fire emojis:

| Location | Current | Replacement |
|----------|---------|-------------|
| Line 83 | `toast.success("Check-in complete! 🎉")` | `toast.success("Check-in complete!")` |
| Line 103 | `<span>🔥</span>` | `<Flame className="w-5 h-5 text-orange-500" />` |
| Line 133 | `<span>🔥</span>` | `<Flame className="w-6 h-6 text-orange-500" />` |

**Changes:**
- Import `Flame` from lucide-react
- Replace fire emojis with Flame icons

---

### 4. `src/components/coach/ReconGuide.tsx`
Remove emoji from toast:

| Location | Current | Replacement |
|----------|---------|-------------|
| Line 65 | `toast.success("Achievement unlocked: First Reconstitution! 🎉")` | `toast.success("Achievement unlocked: First Reconstitution!")` |

---

### 5. `src/hooks/useMilestones.ts`
Replace all milestone emoji icons with Lucide icon names:

| Milestone | Current | Replacement Icon Name |
|-----------|---------|----------------------|
| first_checkin | 🎯 | `"Target"` |
| first_recon | 🧪 | `"FlaskConical"` |
| week_1 | 📅 | `"Calendar"` |
| streak_7 | 🔥 | `"Flame"` |
| streak_14 | ⚡ | `"Zap"` |
| streak_30 | 💪 | `"Dumbbell"` |
| streak_60 | 🏆 | `"Trophy"` |
| streak_90 | 👑 | `"Crown"` |
| cycle_complete | 🎉 | `"Award"` |

**Technical Note:** This changes the `icon` property from an emoji string to a Lucide icon name string, requiring updates to components that render these icons.

---

### 6. `src/pages/dashboard/Home.tsx` (line 164)
Update milestone icon rendering to use Lucide icons instead of emoji strings:

**Changes:**
- Import the icon map from lucide-react
- Create a lookup to render the correct Lucide icon based on the icon name

---

### 7. `src/pages/Stats.tsx` (line 194)
Replace the large fire emoji in stats:

| Location | Current | Replacement |
|----------|---------|-------------|
| Line 194 | `<p className="text-6xl">🔥</p>` | `<Flame className="w-16 h-16 text-orange-500" />` |

---

### 8. `src/components/progress/TrendCharts.tsx` (line 38)
Replace energy level emoji:

| Location | Current | Replacement |
|----------|---------|-------------|
| Line 38 | `<span>⚡</span>` | `<Zap className="w-4 h-4" />` |

---

## Icon Mapping Reference

| Emoji | Lucide Icon | Import |
|-------|-------------|--------|
| 🧬 | Dna | `import { Dna } from "lucide-react"` |
| 🎉 | PartyPopper or Award | `import { PartyPopper } from "lucide-react"` |
| 🔥 | Flame | `import { Flame } from "lucide-react"` |
| ⚡ | Zap | `import { Zap } from "lucide-react"` |
| 💪 | Dumbbell | `import { Dumbbell } from "lucide-react"` |
| 🏆 | Trophy | `import { Trophy } from "lucide-react"` |
| 👑 | Crown | `import { Crown } from "lucide-react"` |
| 🎯 | Target | `import { Target } from "lucide-react"` |
| 🧪 | FlaskConical | `import { FlaskConical } from "lucide-react"` |
| 📅 | Calendar | `import { Calendar } from "lucide-react"` |

---

## Summary

| File | Changes |
|------|---------|
| `BuildingAnimation.tsx` | Replace 🧬 with Dna icon, 🎉 with PartyPopper icon |
| `UrgencyBanner.tsx` | Remove or replace 🎉 with Sparkles icon |
| `CheckInFlow.tsx` | Replace 🔥 with Flame icons, remove emoji from toast |
| `ReconGuide.tsx` | Remove emoji from toast message |
| `useMilestones.ts` | Change emoji strings to Lucide icon name strings |
| `Home.tsx` (dashboard) | Update milestone rendering to use Lucide icons |
| `Stats.tsx` | Replace 🔥 with Flame icon |
| `TrendCharts.tsx` | Replace ⚡ with Zap icon |

This creates a consistent, professional look aligned with the typography-first editorial design system.


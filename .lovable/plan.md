
# Make Courses Feel Personalized to User's Goal

**STATUS: ✅ IMPLEMENTED**

## Overview
Transform the dashboard and course experience to feel deeply personalized based on the user's specific wellness goal. Each goal will have its own color scheme, icons, messaging, and visual identity that carries throughout the entire dashboard experience.

## Design System: Goal-Based Theming

### Goal Color Palettes
| Goal | Primary Color | Gradient | Icon | Tagline |
|------|--------------|----------|------|---------|
| **Fat Loss** | Rose/Coral | `from-rose-400 to-orange-400` | Scale/Flame | "Your metabolism journey" |
| **Muscle** | Blue/Indigo | `from-blue-400 to-indigo-500` | Dumbbell | "Your strength journey" |
| **Recovery** | Green/Emerald | `from-green-400 to-emerald-500` | Heart/Bandage | "Your healing journey" |
| **Anti-Aging** | Purple/Violet | `from-purple-400 to-violet-500` | Sparkles | "Your longevity journey" |
| **Cognitive** | Amber/Yellow | `from-amber-400 to-yellow-500` | Brain | "Your mental clarity journey" |
| **Beginner** | Teal/Cyan | `from-teal-400 to-cyan-500` | Rocket | "Your first peptide journey" |

## Implementation

### 1. Create Goal Theme Utility (`src/lib/goalThemes.ts`)
New file with theme configuration:
- Color mappings per goal
- Icon component references
- Motivational copy per goal
- Helper function `getGoalTheme(goal: string)` that returns the full theme object

### 2. Update Dashboard Header (`src/pages/dashboard/Home.tsx`)
**Current:**
```
Good morning, Carter
Day 0 of 56 · Fat Loss
```

**New personalized version:**
```
Good morning, Carter
Day 0 of 56 · Your metabolism journey 🔥
```
- Add goal-specific gradient accent bar at top
- Add subtle background gradient based on goal color
- Include goal-specific icon next to course title

### 3. Update Today's Lesson Card (`src/components/dashboard/home/TodayLessonCard.tsx`)
- Change the coral gradient bar to use goal-specific gradient
- Add goal icon in the header
- Update empty state to reference the specific goal

### 4. Update Progress Card (`src/pages/dashboard/Home.tsx`)
- ProgressRing stroke color matches goal theme
- Phase label styled with goal accent

### 5. Update Next Injection Card (`src/components/dashboard/home/NextInjectionCard.tsx`)
- Icon background matches goal theme
- Header accent matches goal

### 6. Update Quick Action Cards (`src/components/dashboard/home/QuickActionCards.tsx`)
- Add a goal-specific motivational message
- Optional: theme the AI Coach card to reference goal

### 7. Update My Plan Page (`src/pages/dashboard/MyPlan.tsx`)
- Header icon/color matches goal
- Add "Why this peptide for your goal" personalized section (already exists in data as `whyForYou`)

### 8. Update Course Lessons Page (`src/pages/dashboard/CourseLessons.tsx`)
- Progress bar uses goal color
- Phase headers match goal theme
- Current lesson indicator matches goal color

## File Changes

### New File: `src/lib/goalThemes.ts`
Contains all goal theme definitions with colors, icons, messaging

### Modified Files:
1. **`src/pages/dashboard/Home.tsx`**
   - Import goal theme utility
   - Apply goal gradient to header area
   - Update subtitle with personalized journey text
   - Pass goal theme to child components

2. **`src/components/dashboard/home/TodayLessonCard.tsx`**
   - Accept `goalTheme` prop
   - Replace hardcoded rose gradient with goal gradient
   - Add goal icon

3. **`src/components/dashboard/home/ProgressRing.tsx`**
   - Accept optional `color` prop for stroke
   - Default to current black if not provided

4. **`src/components/dashboard/home/NextInjectionCard.tsx`**
   - Accept `goalTheme` prop
   - Update icon background color

5. **`src/pages/dashboard/MyPlan.tsx`**
   - Import goal theme
   - Update header styling
   - Show personalized "Why this peptide for YOUR goal" text

6. **`src/pages/dashboard/CourseLessons.tsx`**
   - Import goal theme
   - Update progress bar color
   - Update current lesson indicator color

## Visual Result

### Before (Generic)
- All users see the same rose/coral accents
- Generic "Day X of Y · Fat Loss Course" text
- No visual connection between goal and UI

### After (Personalized)
- Fat Loss users: warm rose/coral theme, flame icon, "Your metabolism journey"
- Muscle users: strong blue/indigo theme, dumbbell icon, "Your strength journey"
- Recovery users: calming green/emerald theme, heart icon, "Your healing journey"
- And so on...

Every screen feels tailored specifically to their chosen goal, creating that personalized "aura" throughout the entire experience.

## Technical Notes
- The `userCourse.goal` field contains the goal type (e.g., "fat_loss", "muscle")
- The theme system is centralized in one utility file for easy maintenance
- All components receive theme via props or can access via hook
- Graceful fallback to default theme if goal is unknown

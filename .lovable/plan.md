

# Add Goal-Specific Colors to Quiz Quick Answer Buttons

## Overview
Match the quick answer buttons on the quiz page (`/quiz`) to their corresponding gradient colors from the homepage's Goal Selection section, creating visual consistency across the user journey.

## Color Mapping

| Goal | Homepage Gradient | Button Style |
|------|-------------------|--------------|
| Fat Loss | `hsl(25 90% 55%)` → `hsl(15 85% 45%)` (Orange) | Orange hover/active |
| Build Muscle | `hsl(210 80% 55%)` → `hsl(220 75% 45%)` (Blue) | Blue hover/active |
| Heal Injury | `hsl(350 80% 55%)` → `hsl(340 75% 45%)` (Red/Pink) | Red hover/active |
| Anti-Aging | `hsl(270 70% 55%)` → `hsl(280 65% 45%)` (Purple) | Purple hover/active |
| Cognitive | `hsl(160 70% 45%)` → `hsl(170 65% 35%)` (Teal/Green) | Teal hover/active |
| Not Sure | `hsl(45 80% 50%)` → `hsl(35 75% 40%)` (Amber/Gold) | Amber hover/active |

---

## File to Update

### `src/components/quiz/ConversationalQuiz.tsx`

**Changes:**
1. Add a `gradient` property to each quick answer in the `quickAnswers` array
2. Apply the gradient as the hover background using inline styles
3. Update button styling to show color on hover while keeping outline style at rest

**Updated quickAnswers array (lines 12-19):**
```tsx
const quickAnswers = [
  { 
    value: 'fat_loss', 
    label: 'Fat Loss', 
    icon: Flame,
    gradient: 'linear-gradient(135deg, hsl(25 90% 55%) 0%, hsl(15 85% 45%) 100%)',
    hoverBg: 'hsl(25 90% 55%)'
  },
  { 
    value: 'muscle', 
    label: 'Build Muscle', 
    icon: Dumbbell,
    gradient: 'linear-gradient(135deg, hsl(210 80% 55%) 0%, hsl(220 75% 45%) 100%)',
    hoverBg: 'hsl(210 80% 55%)'
  },
  { 
    value: 'recovery', 
    label: 'Heal Injury', 
    icon: Heart,
    gradient: 'linear-gradient(135deg, hsl(350 80% 55%) 0%, hsl(340 75% 45%) 100%)',
    hoverBg: 'hsl(350 80% 55%)'
  },
  { 
    value: 'anti_aging', 
    label: 'Anti-Aging', 
    icon: Clock,
    gradient: 'linear-gradient(135deg, hsl(270 70% 55%) 0%, hsl(280 65% 45%) 100%)',
    hoverBg: 'hsl(270 70% 55%)'
  },
  { 
    value: 'cognitive', 
    label: 'Cognitive', 
    icon: Brain,
    gradient: 'linear-gradient(135deg, hsl(160 70% 45%) 0%, hsl(170 65% 35%) 100%)',
    hoverBg: 'hsl(160 70% 45%)'
  },
  { 
    value: 'beginner', 
    label: 'Not Sure', 
    icon: HelpCircle,
    gradient: 'linear-gradient(135deg, hsl(45 80% 50%) 0%, hsl(35 75% 40%) 100%)',
    hoverBg: 'hsl(45 80% 50%)'
  },
];
```

**Updated button rendering (lines 182-193):**

Use a custom hover state with React's `useState` to apply the gradient on hover, since Tailwind can't handle dynamic inline styles:

```tsx
{quickAnswers.map(({ value, label, icon: Icon, gradient }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <button
      key={value}
      onClick={() => handleQuickAnswer(value, label)}
      disabled={isLoading}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="rounded-full px-4 py-2.5 flex items-center gap-2 border border-border 
                 font-medium text-sm transition-all duration-300 disabled:opacity-50"
      style={{
        background: isHovered ? gradient : 'transparent',
        color: isHovered ? 'white' : 'inherit',
        borderColor: isHovered ? 'transparent' : undefined,
      }}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );
})}
```

---

## Visual Result

| State | Appearance |
|-------|------------|
| Default | Outline button with icon + label |
| Hover | Fills with goal-specific gradient, white text |
| Disabled | 50% opacity |

This creates a direct visual connection between the homepage goal cards and the quiz quick answers, making the design feel cohesive and intentional.

---

## Summary
- **1 file to edit**: `src/components/quiz/ConversationalQuiz.tsx`
- Add gradient colors to `quickAnswers` array
- Apply gradient backgrounds on hover using inline styles
- Creates visual consistency with homepage Goal Selection cards


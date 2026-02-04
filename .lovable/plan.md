
# Update Quiz/Onboarding to Use Gray Styling

## Overview
Replace all green/teal (`primary`) colors in the quiz and onboarding flow with neutral gray styling to match the updated landing page aesthetic.

## Files to Update

### 1. `src/components/quiz/ConversationalQuiz.tsx`
| Line | Before | After |
|------|--------|-------|
| 129 | `bg-primary` (progress bar fill) | `bg-foreground` |

### 2. `src/components/quiz/QuizProgressSidebar.tsx`
| Line | Before | After |
|------|--------|-------|
| 52 | `bg-primary text-primary-foreground` (complete checkmark circle) | `bg-foreground text-background` |
| 54 | `bg-primary/20 text-primary` (current step spinner) | `bg-muted-foreground/20 text-muted-foreground` |

### 3. `src/components/quiz/QuizMessage.tsx`
| Line | Before | After |
|------|--------|-------|
| 29 | `bg-primary/10 text-primary` (AI avatar) | `bg-muted text-foreground` |
| 40 | `bg-primary text-primary-foreground` (user message bubble) | `bg-foreground text-background` |
| 4 | Remove `Bot` icon import | Keep `Bot` icon but style differently, OR replace with "PP" text |

**Avatar Change**: Replace the Bot icon with "PP" text initials to match the editorial style guidelines that remove robotic icons.

### 4. `src/components/quiz/BuildingAnimation.tsx`
| Line | Before | After |
|------|--------|-------|
| 100, 112, 124, 136 | `text-primary` (checkmarks) | `text-foreground` |
| 155 | `text-primary` (completed step checkmark) | `text-foreground` |
| 157 | `text-primary` (spinner) | `text-muted-foreground` |

---

## Visual Changes

| Element | Before (Green) | After (Gray) |
|---------|---------------|--------------|
| Progress bar fill | Teal | Dark (foreground) |
| Sidebar checkmark circles | Teal background | Dark background |
| AI avatar | Teal tint with Bot icon | Muted gray with "PP" text |
| User message bubble | Teal background | Dark (foreground) background |
| Building animation checkmarks | Teal | Dark |
| Loading spinners | Teal | Muted gray |

---

## Summary
- Edit 4 files: `ConversationalQuiz.tsx`, `QuizProgressSidebar.tsx`, `QuizMessage.tsx`, `BuildingAnimation.tsx`
- Replace `text-primary` → `text-foreground` or `text-muted-foreground`
- Replace `bg-primary` → `bg-foreground` or `bg-muted`
- Replace Bot icon with "PP" initials to match the editorial design system
- Creates consistent gray/neutral aesthetic throughout the onboarding experience

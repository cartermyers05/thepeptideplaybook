
# Global Copy Change: "Course" to "Blueprint" + CTA Standardization

## Overview
Text-only branding changes across ~25 files. No layout, styling, or component structure modifications.

## Change Categories

### 1. "Course" to "Blueprint" Replacements

| File | Current Text | New Text |
|------|-------------|----------|
| `src/components/quiz/ConversationalQuiz.tsx` | "Build Your Peptide Course" | "Build Your Peptide Blueprint" |
| `src/components/quiz/ConversationalQuiz.tsx` | "Answer a few questions to personalize your 8-week program" | (keep as-is, no "course" here) |
| `src/hooks/useQuizChat.ts` | "build your personalized peptide course" | "build your personalized Peptide Blueprint" |
| `src/components/quiz/BuildingAnimation.tsx` | "Building your curriculum..." | "Building your blueprint..." |
| `src/components/quiz/BuildingAnimation.tsx` | "Your Course is Ready!" | "Your Blueprint is Ready!" |
| `src/components/quiz/BuildingAnimation.tsx` | "Building Your Course..." | "Building Your Blueprint..." |
| `src/components/quiz/BuildingAnimation.tsx` | "Failed to create your course" | "Failed to create your blueprint" |
| `src/components/quiz/BuildingAnimation.tsx` | "We couldn't save your course" | "We couldn't save your blueprint" |
| `src/pages/Quiz.tsx` | "Build Your Peptide Course \| Peptide Playbook" | "Build Your Peptide Blueprint \| Peptide Playbook" |
| `src/pages/Quiz.tsx` | "build a personalized peptide course" | "build a personalized Peptide Blueprint" |
| `src/pages/QuizResults.tsx` | "Your Personalized Course" | "Your Peptide Blueprint" |
| `src/pages/QuizResults.tsx` | "Start My Course" | "Start My Blueprint" |
| `src/pages/QuizResults.tsx` | "Get My Course -- $67" | "Get Your Full Blueprint -- $67" |
| `src/pages/CoursePreview.tsx` | "Course not found" | "Blueprint not found" |
| `src/pages/CoursePreview.tsx` | "Building your personalized course..." | "Building your personalized blueprint..." |
| `src/pages/CoursePreview.tsx` | "Course Ready" | "Blueprint Ready" |
| `src/pages/CoursePreview.tsx` | "Get Your Course -- $67" | "Get Your Full Blueprint -- $67" |
| `src/pages/Checkout.tsx` | "build your personalized course" | "build your personalized blueprint" |
| `src/components/dashboard/DashboardNavbar.tsx` | "My Course" | "My Blueprint" |
| `src/pages/History.tsx` | "My Course" | "My Blueprint" |
| `src/components/dashboard/home/TodayLessonCard.tsx` | "Welcome to Your Course" | "Welcome to Your Blueprint" |
| `src/components/dashboard/home/QuickActionCards.tsx` | "Ask anything about your course" | "Ask anything about your blueprint" |
| `src/components/coach/AskCoach.tsx` | "your peptide course" | "your Peptide Blueprint" |
| `src/pages/dashboard/CourseLessons.tsx` | "No course found. Purchase a course to get started." | "No blueprint found. Purchase a blueprint to get started." |
| `src/pages/dashboard/Protocol.tsx` | "personalized peptide course" | "personalized Peptide Blueprint" |
| `src/components/landing/CourseFeatures.tsx` | "Your Personal Peptide Course" | "Your Personal Peptide Blueprint" |
| `src/components/landing/Footer.tsx` | "Your personal peptide course" | "Your personal Peptide Blueprint" |
| `src/components/landing/PricingCTA.tsx` | "Medical provider peptide course" | "Medical provider peptide program" |
| `src/components/landing/ProblemSection.tsx` | "Peptide courses are a scam" | "Peptide programs are a scam" |
| `src/components/landing/HeroProductCards.tsx` | "Building your course..." | "Building your blueprint..." |
| `src/pages/tools/PeptideCalculator.tsx` | "personalized peptide course" | "personalized Peptide Blueprint" |

### 2. CTA Standardization

**Primary CTA: "Take the Free Quiz"**

| File | Current CTA | New CTA |
|------|------------|---------|
| `src/components/landing/FloatingCTA.tsx` | "Get Access" | "Take the Free Quiz" |
| `src/components/landing/SolutionSection.tsx` | "Get Full Access" | "Take the Free Quiz" |
| `src/components/landing/HowItWorksSection.tsx` | "Start Your Free Quiz" | "Take the Free Quiz" |
| `src/components/blog/BlogCTA.tsx` | "Get Peptide Playbook AI" | "Take the Free Quiz" |
| `src/components/chat/ChatWidget.tsx` | "Get Full Access" | "Take the Free Quiz" |

**Secondary CTA: "Get Your Full Blueprint -- $67"**

| File | Current CTA | New CTA |
|------|------------|---------|
| `src/components/landing/GuidedDemo.tsx` | "Get Full Access -- $67" | "Get Your Full Blueprint -- $67" |
| `src/components/landing/FinalCTA.tsx` | "Get The Peptide Playbook -- $67" | "Get Your Full Blueprint -- $67" |
| `src/components/landing/PricingCTA.tsx` | "Get Instant Access" | "Get Your Full Blueprint -- $67" |
| `src/components/landing/WhatsInsideSection.tsx` | "Get Lifetime Access -- $99 $67" | "Get Your Full Blueprint -- $67" |
| `src/pages/Pricing.tsx` (3 instances) | "Get Full Access -- $67" | "Get Your Full Blueprint -- $67" |
| `src/pages/Checkout.tsx` | "Pay $67 -- Get Full Access" | "Get Your Full Blueprint -- $67" |
| `src/components/dashboard/UpgradePrompt.tsx` | "Unlock Now -- $67" | "Get Your Full Blueprint -- $67" |
| `src/components/dashboard/UpgradePrompt.tsx` | "Get full access to..." | "Get your full blueprint with..." |

### 3. Member Count / Social Proof Replacement

| File | Current | New |
|------|---------|-----|
| `src/pages/Pricing.tsx` | "Join 4,200+ members who stopped relying on TikTok and Reddit for peptide information" | "Built on 500+ peer-reviewed studies. Zero hype." |
| `src/pages/dashboard/Community.tsx` | "Active Members" | "Active Users" |
| `src/pages/dashboard/Community.tsx` | "Connect with other members" | "Connect with other users" |
| `src/pages/dashboard/Settings.tsx` | "Membership" heading | "Subscription" |
| `src/components/dashboard/UpgradePrompt.tsx` | "Requires Membership" | "Requires Full Access" |
| `src/pages/dashboard/Settings.tsx` | "Included with membership:" | "Included with your plan:" |

### 4. CTA Link Updates

Some CTAs currently link to `/signup` but should link to `/quiz` (for "Take the Free Quiz"):
- `src/components/landing/FloatingCTA.tsx`: `/signup` to `/quiz`
- `src/components/blog/BlogCTA.tsx`: `/signup` to `/quiz`
- `src/components/chat/ChatWidget.tsx`: `/signup` to `/quiz`

## Files NOT Changed
- Brand name "Peptide Playbook" kept everywhere
- Guide/article content untouched
- All layout, styling, and component structure untouched
- Internal variable names (e.g., `useCourse`, `courseStartDate`) kept as-is since they are code-only
- Route paths (e.g., `/dashboard/course`) kept as-is to avoid breaking navigation

## Total: ~25 files with text-only changes

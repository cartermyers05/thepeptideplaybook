

# Fix the Funnel: From 80% Bounce to Conversions

## The 3 Root Causes (and the smart fixes)

Based on the analytics and codebase analysis, three specific problems are causing the funnel to collapse:

### Problem 1: The Hero pushes people DOWN the page, not INTO the funnel
The primary hero CTA says "Try the AI Free" and scrolls to a demo section. 90% of your traffic is mobile TikTok users with 5-second attention spans -- they need ONE clear action, not a scroll destination. Meanwhile, the "Take the Free Quiz" floating CTA only appears after 600px of scrolling (most bouncers never get there).

### Problem 2: The quiz completion flow is a 3-step maze
After completing the quiz, users go through: Quiz -> BuildingAnimation -> /course/{goal} (CoursePreview page) -> Stripe opens in a NEW TAB. On mobile, popup blockers kill that new tab silently. The user taps "Get Your Blueprint" and literally nothing happens. This alone could explain why 35 signups produced 0 purchases.

### Problem 3: Zero email capture = zero follow-up
Quiz takers who don't buy immediately are gone forever. The results page shows personalized matches but never asks for an email. With 262 visitors and 0 purchases, every single lead was lost.

---

## The Fix Plan

### Fix 1: Make the Hero CTA drive directly to the quiz
**File:** `src/components/landing/HeroSection.tsx`

- Change primary CTA from "Try the AI Free" (scroll to #demo) to **"Take the Free Quiz"** linking to `/quiz`
- Change secondary CTA from "See What's Inside" (scroll to #features) to **"Try the AI Free"** (scroll to #demo) -- keeps the demo accessible but deprioritized
- This matches the proven "How It Works" and "Final CTA" sections which already link to /quiz

### Fix 2: Simplify the post-quiz flow (eliminate the CoursePreview detour)
**File:** `src/components/quiz/BuildingAnimation.tsx`

- Change the redirect destination from `/course/{goal}` to `/quiz/results`
- The QuizResults page already has the personalized match, blurred content, value stack, and $67 CTA -- it's a better conversion page than CoursePreview

**File:** `src/pages/QuizResults.tsx`

- Change the CTA from linking to `/course/{goal}` to linking directly to `/signup` (for non-authenticated users) or `/checkout` (for authenticated users)
- Fix the "Unlock with subscription" text to say "Unlock with your Blueprint"
- This eliminates the entire CoursePreview popup-blocker problem

### Fix 3: Add email gate before showing quiz results
**File:** `src/pages/QuizResults.tsx`

- Before revealing the personalized results, show a simple email capture overlay:
  - Heading: "Your Blueprint Is Ready"
  - Subtext: "Enter your email to see your personalized peptide match"
  - Email input + "See My Results" button
  - Small text: "No spam. Just your results."
- On submit, save to the existing `leads` table (columns: email, source = "quiz_results", first_name = null)
- Also save email to localStorage so returning visitors skip the gate
- After email submission, reveal the full results page

### Fix 4: Fix stale copy throughout the funnel
**Files:** `src/pages/QuizResults.tsx`, `src/components/quiz/ConversationalQuiz.tsx`

- "Unlock with subscription" -> "Unlock with your Blueprint"
- "8-week program" -> "personalized blueprint" (in quiz subtitle)
- Ensure "Blueprint" terminology is consistent everywhere in the funnel

### Fix 5: Add the FloatingCTA to the homepage
**File:** `src/pages/Index.tsx`

- Import and render `FloatingCTA` on the homepage -- it already exists and links to /quiz, but it's never rendered on the page. Adding it gives mobile users a persistent "Take the Free Quiz" button as they scroll.

---

## Technical Details

### BuildingAnimation redirect change (Fix 2)
Line 64-67 of `BuildingAnimation.tsx`: Change `navigate(\`/course/\${goal}\`)` to `navigate('/quiz/results')`. The quiz data is already in localStorage, so QuizResults will pick it up.

### QuizResults CTA change (Fix 2)
Lines 307-312 of `QuizResults.tsx`: Replace the `Link to={/course/...}` with:
- If not logged in: `Link to="/signup"`
- If logged in but not paid: `Link to="/checkout"`
This keeps the user in the same tab and avoids popup blockers entirely.

### Email gate implementation (Fix 3)
Add state `emailCaptured` (boolean) to QuizResults. Check localStorage for `quiz_email` on mount. If not found, render an overlay with email input. On submit, call `supabase.from('leads').insert(...)` and set localStorage. Then reveal the results content underneath.

### Files modified
| File | Change |
|------|--------|
| `src/components/landing/HeroSection.tsx` | Swap primary CTA to quiz link |
| `src/components/quiz/BuildingAnimation.tsx` | Redirect to /quiz/results instead of /course/{goal} |
| `src/pages/QuizResults.tsx` | Email gate + fix CTA destination + fix copy |
| `src/components/quiz/ConversationalQuiz.tsx` | Fix "8-week program" copy |
| `src/pages/Index.tsx` | Add FloatingCTA component |

### What does NOT change
- Quiz conversational flow and AI logic
- Checkout page (trust signals already added)
- Dashboard pages
- Guide pages
- CoursePreview page (still accessible at /course/{goal} for direct links, just no longer the default path)
- Stripe edge functions (already fixed in previous session)


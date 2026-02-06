

# Remove "See It In Action" Mock Conversation

## Current Structure

The GuidedDemo component has two parts stacked vertically:
1. **Static mock conversation** (lines 218-253) - Shows a hardcoded User/AI exchange about BJJ recovery
2. **Interactive demo** (lines 255-339) - Clickable questions with real typewriter-animated answers

## What's Changing

Remove the static mock conversation entirely. Keep only the interactive "Try it yourself" section.

## Changes to Make

**File:** `src/components/landing/GuidedDemo.tsx`

1. **Update section title** (line 211-216):
   - Change "See It In Action" → "Try It Yourself" 
   - Keep the subtitle about research-backed answers

2. **Remove the mock conversation block** (lines 218-253):
   - Delete the entire `<motion.div>` containing the User Message and AI Response
   - This removes ~35 lines of static mock chat

3. **Remove the "Try it yourself" label** (lines 255-260):
   - Since we're making the whole section "Try it yourself", we don't need this small label

4. **Remove unused imports**:
   - `User` and `Sparkles` icons (only used in the mock conversation)

## Result

Visitors land on a clean interactive demo section titled "Try It Yourself" with 6 clickable question buttons. No redundant static example before it.


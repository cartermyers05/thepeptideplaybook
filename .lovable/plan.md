

# Upgrade AI Research Coach System Prompt

## What Changes

### 1. Replace system prompt in `supabase/functions/chat/index.ts`

The `buildSystemPrompt` function (lines 323-651) will be replaced with the new prompt provided. The new prompt will be inserted **before** the existing peptide database and landmark studies data, which will continue to be appended as dynamic context.

**New prompt structure:**
- Core identity: "Peptide Playbook AI Research Coach" (research assistant, not generic chatbot)
- Response format: Direct answer first, evidence basis with star ratings, practical context, doctor talking point
- Evidence ratings: 5-star scale (Strong/Good/Moderate/Preliminary/Emerging)
- Safety rules: Always recommend healthcare provider, never say "safe" without qualification
- Legal status awareness: 2026-current status for semaglutide, tirzepatide, BPC-157, TB-500, GHK-Cu, CJC-1295/Ipamorelin
- Banned words list: "comprehensive," "cutting-edge," "unlock," "leverage," "utilize," "empower"

**What stays the same inside the function:**
- The peptide database section (dynamically fetched from DB) continues to be appended
- The landmark studies section continues to be appended
- The reconstitution reference section stays
- The aesthetics/looksmaxxing protocol section stays
- The protocol creation questionnaire and tool definitions stay
- All tool handling logic (create_protocol, get_user_progress) stays
- The personal context section (check-ins, course, protocol) stays

### 2. Add quiz response fetching to `supabase/functions/chat/index.ts`

Add a new function `getQuizContext` that queries the `quiz_responses` table for the authenticated user (using the service role client). If a quiz response exists, prepend this context block to the system prompt:

```
The user took our quiz and reported: Goal = [goal], Biggest Concern = [concern], 
Experience Level = [experience], Age Range = [age_range]. Tailor your responses to 
their experience level and focus on their stated goal. If they're a beginner 
(experience = 'none' or 'researching'), explain concepts simply. If experienced, 
you can use more technical language.
```

This will be fetched alongside the existing `getPeptideContext` and `getUserPersonalContext` calls (around line 1015-1027).

### 3. Also update the `coach/index.ts` system prompt

The coach function has a simpler inline prompt (lines 104-325). Replace **both** prompts (the no-context fallback at line 106-128 and the full context version at line 184-324) with the same new core prompt, while keeping all the existing user-context-aware sections (check-in data, lesson progress, streak, etc.) that make the coach personalized.

## Files Modified

1. `supabase/functions/chat/index.ts` -- Replace `buildSystemPrompt` content, add quiz context fetching
2. `supabase/functions/coach/index.ts` -- Replace both system prompt variants with new prompt

## What Does NOT Change

- Chat UI layout or message bubble styling
- No other backend functions modified
- No other pages changed
- Conversation history functionality stays intact
- All existing tool calling (create_protocol, get_user_progress) stays
- Dynamic peptide database fetching stays
- Personal context (check-ins, courses, protocols) stays


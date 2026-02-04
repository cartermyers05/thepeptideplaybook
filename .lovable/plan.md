
# Fix Quiz Completion: Create Protocol After Onboarding

## Problem Summary
After completing the quiz onboarding, the user gets redirected to the dashboard but no course/protocol is created. This happens because:

1. The `saveQuizResponse` function only **updates** an existing `user_courses` record - it doesn't create one
2. No protocol is being created in the `protocols` table
3. The dashboard shows "No Protocol Yet" because there's no data

## Root Cause Analysis

```text
Current Flow:
Quiz Complete → saveQuizResponse() → looks for user_courses → none found → does nothing → dashboard empty

Expected Flow:
Quiz Complete → saveQuizResponse() → create protocol from template → redirect → dashboard shows course
```

## Solution

Update the `saveQuizResponse` function in `src/hooks/useQuizChat.ts` to:

1. **Create a protocol** in the `protocols` table using the extracted goal
2. **Create a user_courses record** by copying from the matching `course_templates` entry
3. Properly handle the case where no existing course exists (which is the normal onboarding case)

---

## Technical Changes

### File: `src/hooks/useQuizChat.ts`

**Current behavior (lines 177-246):**
- Saves to localStorage
- Looks for existing `user_courses` record (finds none for new users)
- Only updates if found, otherwise silently does nothing useful
- Saves to `quiz_responses` for analytics

**Updated behavior:**
1. Keep localStorage backup
2. **Create a protocol** using the goal from extracted values (calling `useProtocol`'s template logic)
3. **Copy course_template to user_courses** for the user's goal
4. Save to `quiz_responses` as before

### Implementation Details

```typescript
// In saveQuizResponse function:

// 1. Create the protocol record
const protocolTemplate = getProtocolTemplateForGoal(goal);
const { data: newProtocol, error: protocolError } = await supabase
  .from("protocols")
  .insert({
    user_id: user.id,
    goal,
    protocol_name: protocolTemplate.name,
    peptides: protocolTemplate.peptides,
    cycle_length_weeks: protocolTemplate.weeks,
    status: "not_started",
    current_day: 0,
    current_week: 1,
  })
  .select()
  .single();

// 2. Copy course template to user_courses
const { data: template } = await supabase
  .from("course_templates")
  .select("*")
  .eq("goal", goal)
  .maybeSingle();

if (template) {
  await supabase.from("user_courses").insert({
    user_id: user.id,
    template_id: template.id,
    goal: template.goal,
    title: template.title,
    peptides: template.peptides,
    duration_days: template.duration_days,
    lessons: template.lessons,
    current_day: 0,
    status: "not_started",
    purchased_at: new Date().toISOString(),
  });
}

// 3. Save quiz_responses (keep existing code)
```

---

## Files to Update

| File | Changes |
|------|---------|
| `src/hooks/useQuizChat.ts` | Update `saveQuizResponse` to create protocol and user_courses |

---

## Additional Context

The protocol templates are already defined in `useProtocol.ts` (lines 31-154). We need to:
- Either import and reuse that logic
- Or inline the template lookup in the quiz hook

The `course_templates` table already has templates for each goal (I can see `fat_loss` template with 56 days of lessons).

---

## Expected Result

After this fix:
1. User completes quiz → protocol created → user_courses created
2. Dashboard Home shows their protocol status and check-in card
3. My Plan page shows their peptides and curriculum
4. AI Coach has context about their goal and progress

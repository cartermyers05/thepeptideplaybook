

# Fix Quiz → Dashboard Data Flow

## Problem Identified

After completing the "Build My Course" quiz, the data isn't showing up on the dashboard pages (My Course, My Plan). Two issues found:

### Issue 1: Foreign Key Mismatch
The `user_courses` table has a foreign key constraint:
- `user_courses.user_id` → references → `profiles.id`

But the code is inserting using `auth.user.id` (from Supabase Auth), which should reference `profiles.user_id` instead. This causes a foreign key violation error:
```
"insert or update on table 'user_courses' violates foreign key constraint 'user_courses_user_id_fkey'"
```

### Issue 2: No Updates on Re-Quiz
The `saveQuizResponse` function only creates a new protocol/course **if one doesn't already exist**. When you re-take the quiz:
- Quiz responses ARE saved to `quiz_responses` table
- But protocol and course are NOT updated because the "already exists" check skips the insert

---

## Solution

### Part 1: Fix the Foreign Key

**Option A (Recommended):** Update the foreign key constraint to reference `profiles.user_id` instead of `profiles.id`

This makes more sense because:
- All other tables (protocols, quiz_responses, etc.) use `user_id` referencing the auth user
- The code consistently uses `user.id` from Supabase Auth

We'll run a migration to:
1. Drop the existing foreign key constraint
2. Create a new foreign key referencing `profiles(user_id)` instead of `profiles(id)`

### Part 2: Handle Re-Quiz Flow

Update `saveQuizResponse` in `src/hooks/useQuizChat.ts` to:

1. **If course exists with SAME goal**: Update the existing course (reset progress if user wants to start fresh)
2. **If course exists with DIFFERENT goal**: 
   - Either update the existing course to the new goal
   - Or create a new course for the new goal (allowing multiple courses)
3. **If no course exists**: Create new course (current behavior, once FK is fixed)

For now, we'll implement: **Update existing course/protocol to match the new quiz goal**

### Part 3: Invalidate React Query Cache

After saving, invalidate the course and protocol queries so the dashboard shows fresh data.

---

## Files to Modify

| File | Change |
|------|--------|
| Database migration | Fix foreign key on `user_courses.user_id` |
| `src/hooks/useQuizChat.ts` | Update or upsert logic for protocols and courses, invalidate cache |
| `src/components/quiz/BuildingAnimation.tsx` | Possibly invalidate queries before redirect |

---

## Implementation Details

### Migration SQL
```sql
-- Drop the incorrect foreign key
ALTER TABLE public.user_courses 
DROP CONSTRAINT IF EXISTS user_courses_user_id_fkey;

-- Add correct foreign key referencing profiles.user_id
ALTER TABLE public.user_courses 
ADD CONSTRAINT user_courses_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES profiles(user_id) ON DELETE CASCADE;
```

### Updated saveQuizResponse Logic
```typescript
// 1. Get or create protocol
const { data: existingProtocol } = await supabase
  .from('protocols')
  .select('id')
  .eq('user_id', user.id)
  .maybeSingle();

if (existingProtocol) {
  // UPDATE existing protocol with new goal
  await supabase
    .from('protocols')
    .update({
      goal,
      protocol_name: template.name,
      peptides: template.peptides,
      cycle_length_weeks: template.weeks,
      status: 'not_started',
      current_day: 0,
      current_week: 1,
    })
    .eq('id', existingProtocol.id);
} else {
  // INSERT new protocol
  await supabase.from('protocols').insert({...});
}

// 2. Same pattern for user_courses - update if exists, insert if not
const { data: existingCourse } = await supabase
  .from('user_courses')
  .select('id')
  .eq('user_id', user.id)
  .maybeSingle();

if (existingCourse) {
  // UPDATE existing course with new goal data
  await supabase
    .from('user_courses')
    .update({
      goal: courseTemplate.goal,
      title: courseTemplate.title,
      peptides: courseTemplate.peptides,
      duration_days: courseTemplate.duration_days,
      lessons: courseTemplate.lessons,
      current_day: 0,
      status: 'not_started',
      supplies_status: null,
      started_at: null,
    })
    .eq('id', existingCourse.id);
} else {
  // INSERT new course
  await supabase.from('user_courses').insert({...});
}

// 3. Invalidate React Query cache
queryClient.invalidateQueries({ queryKey: ['user-course'] });
queryClient.invalidateQueries({ queryKey: ['protocol'] });
```

---

## Expected Outcome

After this fix:
1. First-time quiz completion → Creates protocol and course correctly
2. Re-taking quiz → Updates existing protocol/course with new goal
3. Dashboard shows the correct data immediately after quiz completion
4. My Course shows lessons for the selected goal
5. My Plan shows peptides for the selected goal


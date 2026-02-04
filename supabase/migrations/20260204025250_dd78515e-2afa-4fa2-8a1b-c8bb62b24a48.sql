-- Allow users to insert their own user_courses records (for onboarding flow)
CREATE POLICY "Users can insert own courses"
ON public.user_courses
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Drop the restrictive service-role-only policy
DROP POLICY IF EXISTS "Service role can insert courses" ON public.user_courses;
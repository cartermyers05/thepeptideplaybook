-- Drop the incorrect foreign key (references profiles.id instead of profiles.user_id)
ALTER TABLE public.user_courses 
DROP CONSTRAINT IF EXISTS user_courses_user_id_fkey;

-- Add correct foreign key referencing profiles.user_id (the auth user id)
ALTER TABLE public.user_courses 
ADD CONSTRAINT user_courses_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES profiles(user_id) ON DELETE CASCADE;
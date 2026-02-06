-- Add columns to protocols table for personalized protocol data
ALTER TABLE protocols 
ADD COLUMN IF NOT EXISTS secondary_goals text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS user_context text,
ADD COLUMN IF NOT EXISTS experience_level text DEFAULT 'beginner',
ADD COLUMN IF NOT EXISTS constraints text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS notes text;
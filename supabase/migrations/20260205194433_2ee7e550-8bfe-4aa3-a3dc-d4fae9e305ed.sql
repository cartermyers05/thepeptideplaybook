-- Add column to track AI disclaimer acceptance (separate from general terms)
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS ai_disclaimer_accepted_at timestamptz;
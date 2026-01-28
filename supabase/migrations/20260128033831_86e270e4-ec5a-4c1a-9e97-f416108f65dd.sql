-- Track user compliance acknowledgment
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS terms_accepted_at timestamptz DEFAULT NULL;
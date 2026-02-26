
-- Add missing attribution columns to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS utm_term text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS attribution_captured_at timestamptz;

-- Add attribution jsonb column to purchases
ALTER TABLE public.purchases ADD COLUMN IF NOT EXISTS attribution jsonb;

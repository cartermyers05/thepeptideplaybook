-- Add digest_type column to research_digests table
ALTER TABLE public.research_digests 
ADD COLUMN IF NOT EXISTS digest_type text NOT NULL DEFAULT 'monthly';

-- Add a check constraint for valid types
ALTER TABLE public.research_digests 
ADD CONSTRAINT research_digests_type_check 
CHECK (digest_type IN ('weekly', 'monthly'));

-- Create index for faster querying by type
CREATE INDEX IF NOT EXISTS idx_research_digests_type 
ON public.research_digests(digest_type);

-- Enable pg_cron and pg_net extensions for scheduled jobs
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA pg_catalog;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;
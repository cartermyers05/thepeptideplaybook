-- Fix tier constraint to include all tiers used by the application
ALTER TABLE public.profiles DROP CONSTRAINT profiles_tier_check;
ALTER TABLE public.profiles ADD CONSTRAINT profiles_tier_check CHECK (tier = ANY (ARRAY['free'::text, 'starter'::text, 'pro'::text, 'insider'::text, 'member'::text, 'monthly'::text, 'annual'::text]));

-- Fix the buyer's tier immediately
UPDATE public.profiles SET tier = 'member', subscription_status = 'active' WHERE user_id = 'fba483f8-bdbb-457f-937d-a8c7a1aea3a8';
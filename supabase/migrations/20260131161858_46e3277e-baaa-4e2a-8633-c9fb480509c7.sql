-- Fix promo_codes RLS policy to prevent exposing business intelligence
-- Drop the overly permissive SELECT policy
DROP POLICY IF EXISTS "Anyone can read active promo codes for validation" ON public.promo_codes;

-- Create a more restrictive policy that only allows reading specific codes during validation
-- This prevents enumeration of all active codes
CREATE POLICY "Validate specific promo code only" 
ON public.promo_codes 
FOR SELECT 
USING (
  -- Only admins can see all codes
  has_role(auth.uid(), 'admin'::app_role)
);

-- Note: Promo code validation should now happen through the validate-promo-code edge function
-- which uses service role and doesn't expose all codes to the client

-- Fix leads table RLS - remove public INSERT since we now use edge function
DROP POLICY IF EXISTS "Anyone can insert leads with valid email" ON public.leads;

-- Create policy that only allows service role (edge function) to insert
-- The edge function handles rate limiting, validation, and honeypot
CREATE POLICY "Service role can insert leads" 
ON public.leads 
FOR INSERT 
WITH CHECK (false);
-- Note: WITH CHECK (false) blocks direct client inserts; service role bypasses RLS

-- Add admin policy to purchases for audit trail documentation
-- (Users can already only see their own purchases, this documents admin access)
CREATE POLICY "Admins can read all purchases for auditing" 
ON public.purchases 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Fix ai_citations INSERT policy - use restrictive policy since edge function uses service role
DROP POLICY IF EXISTS "Anyone can insert citations" ON public.ai_citations;

CREATE POLICY "Service role can insert citations" 
ON public.ai_citations 
FOR INSERT 
WITH CHECK (false);
-- Note: Edge function uses service role which bypasses RLS

-- Fix citation_monitoring INSERT policy
DROP POLICY IF EXISTS "Service can insert citation monitoring" ON public.citation_monitoring;

CREATE POLICY "Service role can insert citation monitoring" 
ON public.citation_monitoring 
FOR INSERT 
WITH CHECK (false);
-- Note: Service role bypasses RLS for legitimate backend operations

-- Fix promo_code_redemptions INSERT policy
DROP POLICY IF EXISTS "Service can insert redemptions" ON public.promo_code_redemptions;

CREATE POLICY "Service role can insert redemptions" 
ON public.promo_code_redemptions 
FOR INSERT 
WITH CHECK (false);
-- Note: Service role bypasses RLS for legitimate backend operations
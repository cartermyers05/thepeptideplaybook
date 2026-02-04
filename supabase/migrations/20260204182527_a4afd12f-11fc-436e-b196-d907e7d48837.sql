-- Update partner_applications RLS to route through edge function only
-- Drop the existing permissive policy
DROP POLICY IF EXISTS "Public can submit partner application with valid data" ON public.partner_applications;

-- Create a restrictive policy that only allows service role inserts
-- This ensures all inserts go through the submit-partner-application edge function
CREATE POLICY "Service role can insert partner applications" 
ON public.partner_applications 
FOR INSERT 
WITH CHECK (false);
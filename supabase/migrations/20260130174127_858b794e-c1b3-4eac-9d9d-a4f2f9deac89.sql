-- Drop the overly permissive INSERT policy on leads table
DROP POLICY IF EXISTS "Anyone can insert leads for signup" ON public.leads;

-- Create a new policy that still allows unauthenticated inserts but adds basic validation
-- The application handles validation, but we restrict email format at DB level
ALTER TABLE public.leads ADD CONSTRAINT leads_email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Re-create the INSERT policy - this is intentionally permissive for lead generation
-- but now with email format validation at database level
CREATE POLICY "Anyone can insert leads with valid email" 
ON public.leads 
FOR INSERT 
WITH CHECK (
  -- Basic email format validation is now enforced by the constraint
  -- Length limit to prevent abuse
  length(email) <= 255
);
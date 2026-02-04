-- Fix overly permissive RLS policy on partner_applications table
-- The current policy allows anyone to insert any data without validation

-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Anyone can submit partner application" ON public.partner_applications;

-- Create a more restrictive policy that still allows public submissions
-- but requires the inserted data to be validated (non-empty required fields)
CREATE POLICY "Public can submit partner application with valid data" 
ON public.partner_applications 
FOR INSERT 
WITH CHECK (
  -- Ensure required fields are not empty
  name IS NOT NULL AND 
  name <> '' AND 
  email IS NOT NULL AND 
  email <> '' AND
  social_handle IS NOT NULL AND
  social_handle <> ''
);
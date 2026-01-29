-- Remove duplicate SELECT policy on purchases table
DROP POLICY IF EXISTS "Users can view own purchases" ON public.purchases;

-- Update purchases INSERT policy to be more restrictive (service role only)
-- First drop the overly permissive policy
DROP POLICY IF EXISTS "Service role can insert purchases" ON public.purchases;

-- Create a more specific policy that only allows inserts via service role
-- (The service role bypasses RLS, so this policy won't match regular users)
CREATE POLICY "Only service role can insert purchases"
ON public.purchases
FOR INSERT
WITH CHECK (false);

-- Add DELETE policies for GDPR compliance
CREATE POLICY "Users can delete their own messages"
ON public.messages
FOR DELETE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own profile"
ON public.profiles
FOR DELETE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own referrals"
ON public.referrals
FOR DELETE
USING (auth.uid() = referrer_id);
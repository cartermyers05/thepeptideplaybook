-- Fix overly permissive RLS policies on leads, purchases, peptides tables

-- Drop existing permissive policies
DROP POLICY IF EXISTS "Anyone can insert leads" ON leads;
DROP POLICY IF EXISTS "Users can insert own purchases" ON purchases;
DROP POLICY IF EXISTS "Users can update own purchases" ON purchases;
DROP POLICY IF EXISTS "Admin can manage peptides" ON peptides;

-- Leads table: Only allow insert (lead capture), no update needed by users
CREATE POLICY "Anyone can insert leads for signup"
ON leads FOR INSERT
WITH CHECK (true);
-- Note: This is intentionally permissive for lead capture forms

-- Purchases table: Only system/webhook should insert, users can only view their own
CREATE POLICY "Users can view own purchases"
ON purchases FOR SELECT
USING (auth.uid() = user_id);

-- For purchases insert, we need service role (webhook) - no client policy needed
-- Removing the permissive insert/update policies

-- Peptides table: Read-only for everyone, admin only for writes
-- Keep SELECT as public (already correct)
-- Remove permissive admin policy - use service role for admin operations
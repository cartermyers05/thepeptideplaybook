-- Add restrictive UPDATE and DELETE policies to purchases table
-- Only admins can update or delete purchase records for audit purposes

-- Policy: Only admins can update purchases (for corrections/audit)
CREATE POLICY "Only admins can update purchases"
ON public.purchases
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Policy: Only admins can delete purchases (should be rare, for audit cleanup)
CREATE POLICY "Only admins can delete purchases"
ON public.purchases
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));
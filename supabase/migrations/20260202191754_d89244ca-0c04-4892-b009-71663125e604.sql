-- Create partner_applications table for affiliate program applications
CREATE TABLE public.partner_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  social_handle TEXT NOT NULL,
  follower_count TEXT,
  why_partner TEXT,
  how_promote TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now(),
  reviewed_at TIMESTAMPTZ,
  notes TEXT
);

-- Enable RLS
ALTER TABLE public.partner_applications ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit an application (public form)
CREATE POLICY "Anyone can submit partner application" 
  ON public.partner_applications 
  FOR INSERT 
  WITH CHECK (true);

-- Only admins can read applications
CREATE POLICY "Admins can view partner applications"
  ON public.partner_applications 
  FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can update applications
CREATE POLICY "Admins can update partner applications"
  ON public.partner_applications 
  FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete applications
CREATE POLICY "Admins can delete partner applications"
  ON public.partner_applications 
  FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));
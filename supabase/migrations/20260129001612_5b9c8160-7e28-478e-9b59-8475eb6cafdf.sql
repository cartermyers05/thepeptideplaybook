-- Create leads table for free guide signups
CREATE TABLE public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  first_name text,
  source text DEFAULT 'free-guide',
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on leads
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Anyone can insert leads (public form)
CREATE POLICY "Anyone can insert leads"
ON public.leads
FOR INSERT
WITH CHECK (true);

-- Only admins can read leads
CREATE POLICY "Admins can read leads"
ON public.leads
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Create purchases table
CREATE TABLE public.purchases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  tier text NOT NULL,
  amount integer NOT NULL,
  stripe_payment_id text,
  stripe_subscription_id text,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on purchases
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;

-- Users can view their own purchases
CREATE POLICY "Users can view their own purchases"
ON public.purchases
FOR SELECT
USING (auth.uid() = user_id);

-- Service role can insert purchases (webhook)
CREATE POLICY "Service role can insert purchases"
ON public.purchases
FOR INSERT
WITH CHECK (true);

-- Create peptides table
CREATE TABLE public.peptides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  category text NOT NULL,
  primary_use text NOT NULL,
  research_status text NOT NULL CHECK (research_status IN ('strong', 'moderate', 'limited', 'emerging')),
  fda_status text NOT NULL CHECK (fda_status IN ('FDA Approved', 'Category 2', 'Under Review', 'Not Regulated')),
  mechanism text NOT NULL,
  studies text NOT NULL,
  safety text NOT NULL,
  related_peptides text[] DEFAULT '{}',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on peptides
ALTER TABLE public.peptides ENABLE ROW LEVEL SECURITY;

-- Anyone authenticated can read peptides
CREATE POLICY "Authenticated users can read peptides"
ON public.peptides
FOR SELECT
TO authenticated
USING (true);

-- Only admins can manage peptides
CREATE POLICY "Admins can manage peptides"
ON public.peptides
FOR ALL
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Add tier and stripe_customer_id to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS tier text DEFAULT 'free' CHECK (tier IN ('free', 'starter', 'pro', 'insider')),
ADD COLUMN IF NOT EXISTS stripe_customer_id text;

-- Create trigger for peptides updated_at
CREATE TRIGGER update_peptides_updated_at
BEFORE UPDATE ON public.peptides
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
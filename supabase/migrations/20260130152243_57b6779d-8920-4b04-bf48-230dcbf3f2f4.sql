-- Create promo_codes table
CREATE TABLE public.promo_codes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL DEFAULT 'free_access',
  max_uses INTEGER,
  times_used INTEGER NOT NULL DEFAULT 0,
  expires_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create promo_code_redemptions table
CREATE TABLE public.promo_code_redemptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  promo_code_id UUID NOT NULL REFERENCES public.promo_codes(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  redeemed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id)
);

-- Enable RLS on both tables
ALTER TABLE public.promo_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promo_code_redemptions ENABLE ROW LEVEL SECURITY;

-- RLS policies for promo_codes
CREATE POLICY "Anyone can read active promo codes for validation" 
ON public.promo_codes 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can manage all promo codes" 
ON public.promo_codes 
FOR ALL 
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

-- RLS policies for promo_code_redemptions
CREATE POLICY "Users can view their own redemptions" 
ON public.promo_code_redemptions 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all redemptions" 
ON public.promo_code_redemptions 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'));

-- Service role can insert redemptions (via edge function)
CREATE POLICY "Service can insert redemptions" 
ON public.promo_code_redemptions 
FOR INSERT 
WITH CHECK (true);

-- Create index for faster code lookups
CREATE INDEX idx_promo_codes_code ON public.promo_codes(code);
CREATE INDEX idx_promo_codes_active ON public.promo_codes(is_active) WHERE is_active = true;
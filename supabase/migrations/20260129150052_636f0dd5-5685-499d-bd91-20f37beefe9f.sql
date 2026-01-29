-- Create research_digests table for storing monthly digest content
CREATE TABLE public.research_digests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  month TEXT NOT NULL,
  date DATE NOT NULL,
  highlights JSONB NOT NULL DEFAULT '[]'::jsonb,
  full_content TEXT NOT NULL,
  sources JSONB DEFAULT '[]'::jsonb,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create unique index on month to prevent duplicates
CREATE UNIQUE INDEX idx_research_digests_month ON public.research_digests(month);

-- Create index on date for ordering
CREATE INDEX idx_research_digests_date ON public.research_digests(date DESC);

-- Enable Row Level Security
ALTER TABLE public.research_digests ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can read published digests" 
ON public.research_digests 
FOR SELECT 
USING (published_at IS NOT NULL);

CREATE POLICY "Admins can manage all digests" 
ON public.research_digests 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_research_digests_updated_at
BEFORE UPDATE ON public.research_digests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
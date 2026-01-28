-- Create news_articles table for in-app news reading
CREATE TABLE public.news_articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  full_content TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('research', 'clinical', 'regulatory', 'industry')),
  source_name TEXT NOT NULL,
  source_url TEXT,
  featured BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;

-- Anyone can read published news articles
CREATE POLICY "Anyone can read news articles" 
ON public.news_articles 
FOR SELECT 
USING (true);

-- Admins can manage news articles
CREATE POLICY "Admins can manage news articles" 
ON public.news_articles 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create index for slug lookups
CREATE INDEX idx_news_articles_slug ON public.news_articles(slug);

-- Create index for category filtering
CREATE INDEX idx_news_articles_category ON public.news_articles(category);

-- Create index for featured articles
CREATE INDEX idx_news_articles_featured ON public.news_articles(featured) WHERE featured = true;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_news_articles_updated_at
BEFORE UPDATE ON public.news_articles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
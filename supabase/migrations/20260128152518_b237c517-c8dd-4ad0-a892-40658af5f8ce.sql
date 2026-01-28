-- Create articles table (AI Search Optimized)
CREATE TABLE public.articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  meta_description TEXT,
  content_type TEXT NOT NULL DEFAULT 'guide', -- 'citation-magnet', 'question-answer', 'comparison', 'guide'
  
  -- Content Structure
  tldr TEXT NOT NULL, -- Direct answer for AI extraction
  full_content TEXT NOT NULL, -- Complete article HTML
  
  -- AI Search Optimization Fields
  h1_question TEXT NOT NULL, -- Question format title
  structured_answer JSONB DEFAULT '[]'::jsonb, -- FAQ Q&A pairs
  citations JSONB DEFAULT '[]'::jsonb, -- Research sources
  statistics JSONB DEFAULT '[]'::jsonb, -- Data claims
  
  -- Authority Signals
  author_name TEXT DEFAULT 'Dr. Sarah Chen',
  author_credential TEXT DEFAULT 'PhD Biochemistry, 15 years research',
  
  -- SEO Metadata
  target_keywords TEXT[] DEFAULT '{}',
  related_article_ids UUID[] DEFAULT '{}',
  
  -- Performance Tracking
  citation_count INTEGER DEFAULT 0,
  page_views INTEGER DEFAULT 0,
  
  -- Status
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  
  published_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for articles
CREATE INDEX idx_articles_slug ON public.articles(slug);
CREATE INDEX idx_articles_status ON public.articles(status);
CREATE INDEX idx_articles_published_at ON public.articles(published_at DESC);
CREATE INDEX idx_articles_content_type ON public.articles(content_type);

-- Enable RLS on articles
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for articles
-- Public can read published articles
CREATE POLICY "Anyone can read published articles"
ON public.articles
FOR SELECT
USING (status = 'published');

-- Admins can do everything
CREATE POLICY "Admins can manage all articles"
ON public.articles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create AI citations tracking table
CREATE TABLE public.ai_citations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID REFERENCES public.articles(id) ON DELETE CASCADE,
  ai_engine TEXT NOT NULL CHECK (ai_engine IN ('chatgpt', 'perplexity', 'claude', 'gemini', 'other')),
  query TEXT NOT NULL,
  citation_position INTEGER,
  referrer_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for ai_citations
CREATE INDEX idx_citations_article ON public.ai_citations(article_id);
CREATE INDEX idx_citations_engine ON public.ai_citations(ai_engine);
CREATE INDEX idx_citations_date ON public.ai_citations(created_at DESC);

-- Enable RLS on ai_citations
ALTER TABLE public.ai_citations ENABLE ROW LEVEL SECURITY;

-- Anyone can insert citations (for tracking)
CREATE POLICY "Anyone can insert citations"
ON public.ai_citations
FOR INSERT
WITH CHECK (true);

-- Admins can read all citations
CREATE POLICY "Admins can read all citations"
ON public.ai_citations
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create article categories table
CREATE TABLE public.article_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  parent_id UUID REFERENCES public.article_categories(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create index for article_categories
CREATE INDEX idx_categories_slug ON public.article_categories(slug);
CREATE INDEX idx_categories_parent ON public.article_categories(parent_id);

-- Enable RLS on article_categories
ALTER TABLE public.article_categories ENABLE ROW LEVEL SECURITY;

-- Anyone can read categories
CREATE POLICY "Anyone can read categories"
ON public.article_categories
FOR SELECT
USING (true);

-- Admins can manage categories
CREATE POLICY "Admins can manage categories"
ON public.article_categories
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create article-category mapping table
CREATE TABLE public.article_category_mapping (
  article_id UUID REFERENCES public.articles(id) ON DELETE CASCADE,
  category_id UUID REFERENCES public.article_categories(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, category_id)
);

-- Enable RLS on mapping table
ALTER TABLE public.article_category_mapping ENABLE ROW LEVEL SECURITY;

-- Anyone can read mappings
CREATE POLICY "Anyone can read article category mappings"
ON public.article_category_mapping
FOR SELECT
USING (true);

-- Admins can manage mappings
CREATE POLICY "Admins can manage article category mappings"
ON public.article_category_mapping
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create trigger to update updated_at on articles
CREATE TRIGGER update_articles_updated_at
BEFORE UPDATE ON public.articles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
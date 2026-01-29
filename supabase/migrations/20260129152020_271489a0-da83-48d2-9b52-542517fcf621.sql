-- Content Calendar table for tracking planned articles and query targets
CREATE TABLE public.content_calendar (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  query_cluster TEXT NOT NULL, -- FDA Status, Comparisons, Safety, etc.
  target_query TEXT NOT NULL, -- The exact query to target
  priority TEXT NOT NULL DEFAULT 'medium', -- critical, high, medium, low
  status TEXT NOT NULL DEFAULT 'planned', -- planned, in_progress, published
  article_id UUID REFERENCES public.articles(id),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Citation Monitoring table for daily citation checks
CREATE TABLE public.citation_monitoring (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  query TEXT NOT NULL, -- The query searched
  ai_engine TEXT NOT NULL, -- chatgpt, perplexity, claude, gemini
  is_cited BOOLEAN NOT NULL DEFAULT false,
  citation_position INTEGER, -- 1 = first, 2 = second, etc.
  competing_sources TEXT[], -- URLs of other sources cited
  checked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  article_id UUID REFERENCES public.articles(id)
);

-- Enable RLS
ALTER TABLE public.content_calendar ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.citation_monitoring ENABLE ROW LEVEL SECURITY;

-- RLS Policies for content_calendar (admin only)
CREATE POLICY "Admins can manage content calendar"
ON public.content_calendar
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for citation_monitoring (admin read, service insert)
CREATE POLICY "Admins can read citation monitoring"
ON public.citation_monitoring
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Service can insert citation monitoring"
ON public.citation_monitoring
FOR INSERT
WITH CHECK (true);

-- Update trigger for content_calendar
CREATE TRIGGER update_content_calendar_updated_at
BEFORE UPDATE ON public.content_calendar
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Indexes for performance
CREATE INDEX idx_content_calendar_status ON public.content_calendar(status);
CREATE INDEX idx_content_calendar_priority ON public.content_calendar(priority);
CREATE INDEX idx_citation_monitoring_engine ON public.citation_monitoring(ai_engine);
CREATE INDEX idx_citation_monitoring_checked_at ON public.citation_monitoring(checked_at);
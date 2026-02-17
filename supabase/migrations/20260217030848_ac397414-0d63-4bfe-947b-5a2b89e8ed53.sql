
CREATE TABLE public.fda_timeline_events (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  peptide_name text NOT NULL,
  event_date date NOT NULL,
  event_type text NOT NULL,
  title text NOT NULL,
  description text,
  status text NOT NULL DEFAULT 'confirmed',
  source_url text,
  news_article_id uuid REFERENCES public.news_articles(id),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.fda_timeline_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for FDA timeline" ON public.fda_timeline_events
  FOR SELECT USING (true);

CREATE INDEX idx_fda_timeline_event_date ON public.fda_timeline_events(event_date DESC);

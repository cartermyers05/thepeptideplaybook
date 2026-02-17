
-- Weekly Reviews table
CREATE TABLE public.weekly_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  protocol_id UUID REFERENCES public.user_protocols(id) ON DELETE CASCADE,
  week_number INT NOT NULL,
  insights JSONB NOT NULL DEFAULT '[]'::jsonb,
  mood TEXT NOT NULL DEFAULT 'green',
  recommendation TEXT,
  full_analysis TEXT,
  generated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, protocol_id, week_number)
);

ALTER TABLE public.weekly_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own weekly reviews"
  ON public.weekly_reviews FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own weekly reviews"
  ON public.weekly_reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Daily Briefings table
CREATE TABLE public.daily_briefings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  briefing_date DATE NOT NULL DEFAULT CURRENT_DATE,
  content TEXT NOT NULL,
  compound_tips JSONB DEFAULT '[]'::jsonb,
  data_highlight TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, briefing_date)
);

ALTER TABLE public.daily_briefings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own daily briefings"
  ON public.daily_briefings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own daily briefings"
  ON public.daily_briefings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

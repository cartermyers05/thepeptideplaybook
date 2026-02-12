
-- Create protocol_checkins table
CREATE TABLE public.protocol_checkins (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  protocol_progress_id uuid NOT NULL REFERENCES public.protocol_progress(id),
  week_number integer NOT NULL,
  weight_lbs decimal,
  symptom_rating integer,
  energy_rating integer,
  notes text,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT protocol_checkins_week_unique UNIQUE (protocol_progress_id, week_number),
  CONSTRAINT protocol_checkins_symptom_range CHECK (symptom_rating IS NULL OR (symptom_rating >= 1 AND symptom_rating <= 5)),
  CONSTRAINT protocol_checkins_energy_range CHECK (energy_rating IS NULL OR (energy_rating >= 1 AND energy_rating <= 5))
);

-- Enable RLS
ALTER TABLE public.protocol_checkins ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Users can select own checkins"
  ON public.protocol_checkins FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own checkins"
  ON public.protocol_checkins FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own checkins"
  ON public.protocol_checkins FOR UPDATE
  USING (auth.uid() = user_id);

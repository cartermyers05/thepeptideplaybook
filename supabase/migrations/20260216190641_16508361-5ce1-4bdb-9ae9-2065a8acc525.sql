
-- TABLE 1: user_profiles (alongside existing profiles)
CREATE TABLE public.user_profiles (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  age integer,
  weight_lbs numeric,
  height_inches integer,
  body_fat_estimate text,
  training_frequency text,
  diet_style text,
  experience_level text,
  budget_monthly text,
  goals text[],
  health_conditions text[],
  current_medications text,
  peptide_history text,
  has_healthcare_provider boolean NOT NULL DEFAULT false,
  accepted_tos boolean NOT NULL DEFAULT false,
  accepted_tos_at timestamptz,
  onboarding_complete boolean NOT NULL DEFAULT false,
  CONSTRAINT user_profiles_user_id_unique UNIQUE (user_id)
);

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can select own user_profiles" ON public.user_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own user_profiles" ON public.user_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own user_profiles" ON public.user_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own user_profiles" ON public.user_profiles FOR DELETE USING (auth.uid() = user_id);

-- TABLE 2: user_protocols (new name to avoid conflict with existing protocols)
CREATE TABLE public.user_protocols (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  cycle_number integer NOT NULL DEFAULT 1,
  protocol_name text NOT NULL,
  status text NOT NULL DEFAULT 'active',
  start_date date,
  end_date date,
  cycle_length_weeks integer NOT NULL,
  compounds jsonb NOT NULL DEFAULT '[]'::jsonb,
  schedule jsonb NOT NULL DEFAULT '{}'::jsonb,
  risk_assessment text,
  weekly_expectations jsonb,
  ai_generation_context text
);

ALTER TABLE public.user_protocols ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can select own user_protocols" ON public.user_protocols FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own user_protocols" ON public.user_protocols FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own user_protocols" ON public.user_protocols FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own user_protocols" ON public.user_protocols FOR DELETE USING (auth.uid() = user_id);

-- TABLE 3: daily_logs
CREATE TABLE public.daily_logs (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  protocol_id uuid REFERENCES public.user_protocols(id) ON DELETE CASCADE,
  log_date date NOT NULL,
  actions_completed jsonb,
  energy_rating integer,
  injection_site_reaction text,
  gi_issues text,
  other_symptoms text,
  notes text,
  photo_front_url text,
  photo_side_url text,
  weight_lbs numeric,
  measurements jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT daily_logs_user_date_unique UNIQUE (user_id, protocol_id, log_date)
);

ALTER TABLE public.daily_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can select own daily_logs" ON public.daily_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own daily_logs" ON public.daily_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own daily_logs" ON public.daily_logs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own daily_logs" ON public.daily_logs FOR DELETE USING (auth.uid() = user_id);

-- TABLE 4: coach_messages (new name to avoid conflict with existing chat_messages)
CREATE TABLE public.coach_messages (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  role text NOT NULL,
  content text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  context_type text
);

ALTER TABLE public.coach_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can select own coach_messages" ON public.coach_messages FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own coach_messages" ON public.coach_messages FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own coach_messages" ON public.coach_messages FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own coach_messages" ON public.coach_messages FOR DELETE USING (auth.uid() = user_id);

-- Trigger: auto-create user_profiles row on new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user_profile()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO public.user_profiles (user_id) VALUES (NEW.id);
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created_user_profile
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user_profile();

-- Storage: progress-photos bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('progress-photos', 'progress-photos', true);

CREATE POLICY "Users can upload own progress photos"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'progress-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view own progress photos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'progress-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update own progress photos"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'progress-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own progress photos"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'progress-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Public can view progress photos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'progress-photos');

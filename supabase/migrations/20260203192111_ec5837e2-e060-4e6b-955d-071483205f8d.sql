-- =============================================
-- PEPTIDE PLAYBOOK COACHING PLATFORM SCHEMA
-- =============================================

-- 1. Quiz Responses table
CREATE TABLE public.quiz_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  primary_goal TEXT NOT NULL CHECK (primary_goal IN ('fat_loss', 'muscle_recovery', 'injury_recovery', 'anti_aging', 'cognitive', 'general_wellness')),
  experience_level TEXT NOT NULL CHECK (experience_level IN ('beginner', 'some_experience', 'experienced')),
  main_concerns TEXT[] NOT NULL DEFAULT '{}',
  timeline TEXT NOT NULL CHECK (timeline IN ('ready_now', 'soon', 'researching')),
  age_range TEXT CHECK (age_range IN ('18-25', '26-35', '36-45', '46-55', '56+')),
  email TEXT,
  newsletter_opt_in BOOLEAN DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 2. Protocols table (stores personalized peptide protocols)
CREATE TABLE public.protocols (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  quiz_response_id UUID REFERENCES public.quiz_responses(id) ON DELETE SET NULL,
  goal TEXT NOT NULL,
  protocol_name TEXT NOT NULL,
  peptides JSONB NOT NULL DEFAULT '[]',
  cycle_length_weeks INTEGER NOT NULL DEFAULT 8,
  current_day INTEGER DEFAULT 0,
  current_week INTEGER DEFAULT 1,
  status TEXT DEFAULT 'not_started' CHECK (status IN ('not_started', 'active', 'paused', 'completed')),
  started_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 3. Check-ins table (daily logging)
CREATE TABLE public.check_ins (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  protocol_id UUID REFERENCES public.protocols(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  completed BOOLEAN DEFAULT false,
  injection_done TEXT CHECK (injection_done IN ('yes', 'not_yet', 'skipped')),
  energy_level INTEGER CHECK (energy_level >= 1 AND energy_level <= 5),
  mood INTEGER CHECK (mood >= 1 AND mood <= 5),
  sleep_quality INTEGER CHECK (sleep_quality >= 1 AND sleep_quality <= 5),
  side_effects TEXT[] DEFAULT '{}',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, date)
);

-- 4. Streaks table (gamification)
CREATE TABLE public.user_streaks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_check_in_date DATE,
  streak_freezes_available INTEGER DEFAULT 2,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 5. Milestones/Achievements table
CREATE TABLE public.milestones (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  milestone_type TEXT NOT NULL,
  achieved_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, milestone_type)
);

-- 6. Add subscription fields to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS referral_code TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS referred_by UUID REFERENCES public.profiles(id);

-- Create trigger for auto-generating referral codes on profile creation
CREATE OR REPLACE FUNCTION public.generate_user_referral_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.referral_code IS NULL THEN
    NEW.referral_code := public.generate_referral_code();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER set_referral_code
  BEFORE INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.generate_user_referral_code();

-- Update existing profiles with referral codes
UPDATE public.profiles 
SET referral_code = public.generate_referral_code() 
WHERE referral_code IS NULL;

-- =============================================
-- ROW LEVEL SECURITY POLICIES
-- =============================================

-- Quiz Responses RLS
ALTER TABLE public.quiz_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own quiz responses"
  ON public.quiz_responses FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own quiz responses"
  ON public.quiz_responses FOR INSERT
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can update own quiz responses"
  ON public.quiz_responses FOR UPDATE
  USING (auth.uid() = user_id);

-- Protocols RLS
ALTER TABLE public.protocols ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own protocols"
  ON public.protocols FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own protocols"
  ON public.protocols FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own protocols"
  ON public.protocols FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own protocols"
  ON public.protocols FOR DELETE
  USING (auth.uid() = user_id);

-- Check-ins RLS
ALTER TABLE public.check_ins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own check-ins"
  ON public.check_ins FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own check-ins"
  ON public.check_ins FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own check-ins"
  ON public.check_ins FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own check-ins"
  ON public.check_ins FOR DELETE
  USING (auth.uid() = user_id);

-- User Streaks RLS
ALTER TABLE public.user_streaks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own streaks"
  ON public.user_streaks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own streaks"
  ON public.user_streaks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own streaks"
  ON public.user_streaks FOR UPDATE
  USING (auth.uid() = user_id);

-- Milestones RLS
ALTER TABLE public.milestones ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own milestones"
  ON public.milestones FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own milestones"
  ON public.milestones FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================

CREATE INDEX idx_check_ins_user_date ON public.check_ins(user_id, date);
CREATE INDEX idx_check_ins_protocol ON public.check_ins(protocol_id);
CREATE INDEX idx_protocols_user_status ON public.protocols(user_id, status);
CREATE INDEX idx_milestones_user ON public.milestones(user_id);
CREATE INDEX idx_quiz_responses_user ON public.quiz_responses(user_id);
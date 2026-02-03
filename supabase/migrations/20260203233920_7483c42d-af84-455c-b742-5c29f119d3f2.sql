-- Create course_templates table (admin-seeded, stores 6 course types)
CREATE TABLE public.course_templates (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  goal text UNIQUE NOT NULL,
  title text NOT NULL,
  description text,
  peptides jsonb NOT NULL DEFAULT '[]'::jsonb,
  duration_days integer NOT NULL,
  lessons jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamp with time zone DEFAULT now()
);

-- Create user_courses table (created when user purchases)
CREATE TABLE public.user_courses (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  template_id uuid REFERENCES public.course_templates(id),
  goal text NOT NULL,
  title text NOT NULL,
  peptides jsonb NOT NULL DEFAULT '[]'::jsonb,
  duration_days integer NOT NULL,
  lessons jsonb NOT NULL DEFAULT '[]'::jsonb,
  current_day integer DEFAULT 0,
  status text DEFAULT 'not_started',
  supplies_status text,
  started_at timestamp with time zone,
  purchased_at timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now()
);

-- Create lesson_progress table (tracks completion per lesson)
CREATE TABLE public.lesson_progress (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  course_id uuid REFERENCES public.user_courses(id) ON DELETE CASCADE NOT NULL,
  day integer NOT NULL,
  completed boolean DEFAULT false,
  completed_at timestamp with time zone,
  notes text,
  UNIQUE(user_id, course_id, day)
);

-- Create chat_messages table (simplified coach chat)
CREATE TABLE public.chat_messages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  course_id uuid REFERENCES public.user_courses(id) ON DELETE SET NULL,
  role text NOT NULL,
  content text NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on all new tables
ALTER TABLE public.course_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- course_templates policies (public read, admin write)
CREATE POLICY "Anyone can read course templates" ON public.course_templates
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage course templates" ON public.course_templates
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- user_courses policies (users see their own)
CREATE POLICY "Users can view own courses" ON public.user_courses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own courses" ON public.user_courses
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Service role can insert courses" ON public.user_courses
  FOR INSERT WITH CHECK (false);

-- lesson_progress policies
CREATE POLICY "Users can view own lesson progress" ON public.lesson_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own lesson progress" ON public.lesson_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own lesson progress" ON public.lesson_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- chat_messages policies
CREATE POLICY "Users can view own chat messages" ON public.chat_messages
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own chat messages" ON public.chat_messages
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Add course_goal column to purchases table
ALTER TABLE public.purchases ADD COLUMN IF NOT EXISTS course_goal text;

-- Create indexes for performance
CREATE INDEX idx_user_courses_user_id ON public.user_courses(user_id);
CREATE INDEX idx_user_courses_status ON public.user_courses(status);
CREATE INDEX idx_lesson_progress_course_id ON public.lesson_progress(course_id);
CREATE INDEX idx_chat_messages_course_id ON public.chat_messages(course_id);
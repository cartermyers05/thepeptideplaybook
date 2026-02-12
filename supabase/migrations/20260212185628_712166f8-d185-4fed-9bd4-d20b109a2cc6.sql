
-- Create protocol_templates table
CREATE TABLE public.protocol_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  peptide_slug TEXT NOT NULL,
  goal_slug TEXT NOT NULL,
  protocol_name TEXT NOT NULL,
  peptide_display_name TEXT NOT NULL,
  evidence_level INTEGER NOT NULL,
  evidence_description TEXT NOT NULL,
  last_updated TEXT NOT NULL,
  sections JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Unique constraint
CREATE UNIQUE INDEX idx_protocol_templates_peptide_goal ON public.protocol_templates (peptide_slug, goal_slug);

-- Enable RLS
ALTER TABLE public.protocol_templates ENABLE ROW LEVEL SECURITY;

-- Authenticated users can read
CREATE POLICY "Authenticated users can read protocol templates"
  ON public.protocol_templates
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Admins can manage
CREATE POLICY "Admins can manage protocol templates"
  ON public.protocol_templates
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Updated_at trigger
CREATE TRIGGER update_protocol_templates_updated_at
  BEFORE UPDATE ON public.protocol_templates
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Seed semaglutide fat-loss data
INSERT INTO public.protocol_templates (peptide_slug, goal_slug, protocol_name, peptide_display_name, evidence_level, evidence_description, last_updated, sections)
VALUES (
  'semaglutide',
  'fat-loss',
  'Fat Loss Protocol',
  'Semaglutide (Wegovy)',
  5,
  'Strong — Multiple large-scale Phase 3 RCTs, FDA-approved, 14,000+ trial participants',
  'February 2026',
  '[
    {"section_number": 1, "title": "Why This Peptide For You", "default_open": true, "content": "You selected fat loss as your primary goal, and you mentioned you''re concerned about safety. That''s exactly why semaglutide is your top match.\n\nIt''s the most studied weight-loss peptide in history — not by a little, by a lot. We''re talking 14,000+ participants across multiple Phase 3 trials, FDA approval, and real-world data from millions of prescriptions since 2021.\n\nSemaglutide works by mimicking GLP-1, a hormone your body already makes. It reduces appetite, slows gastric emptying, and helps your brain register fullness faster. The result: you eat less without white-knuckling it.\n\n**Evidence Rating: ⬢⬢⬢⬢⬢ Strong**\n\nBased on STEP 1–5, STEP UP, SELECT, and SURMOUNT-5 trials. This is not experimental. This is not animal data. This is the most robust clinical evidence in the history of weight-loss medicine."},
    {"section_number": 2, "title": "Your Protocol (Week-by-Week)", "default_open": false, "content": "Your complete week-by-week semaglutide protocol will appear here. This section includes the FDA-approved dosing schedule from 0.25mg through 2.4mg maintenance, with specific guidance for each phase."},
    {"section_number": 3, "title": "What to Expect (Timeline)", "default_open": false, "content": "Your realistic timeline of changes will appear here. Week-by-week expectations based on STEP trial data, including when to expect appetite changes, weight loss milestones, and side effect patterns."},
    {"section_number": 4, "title": "Side Effects — What''s Normal vs. What''s Not", "default_open": false, "content": "Complete side effect guide with actual trial incidence rates will appear here. Organized by frequency: Very Common (>20%), Common (10-20%), Less Common (<10%), and emergency red flags."},
    {"section_number": 5, "title": "Doctor Conversation Script", "default_open": false, "content": "Your personalized doctor conversation script will appear here. Multiple opening approaches, anticipated questions with pre-written answers, insurance navigation, and rebuttals for common physician hesitation."},
    {"section_number": 6, "title": "Legal Status & Access", "default_open": false, "content": "Legal status and access information will appear here. FDA approval status, cost landscape ($1,300/month list price, savings programs, telehealth options), insurance coverage strategies."},
    {"section_number": 7, "title": "What the Research Shows", "default_open": false, "content": "Research summaries will appear here. Plain-English breakdowns of STEP 1 (n=1,961), STEP 4 (weight regain data), STEP 5 (2-year data), SELECT (cardiovascular), and SURMOUNT-5 (head-to-head vs tirzepatide)."},
    {"section_number": 8, "title": "Alternatives If This Isn''t Right", "default_open": false, "content": "Alternative options will appear here. Tirzepatide (stronger efficacy, less long-term data), lifestyle-first approach, oral semaglutide, and what we don''t recommend (AOD-9604)."}
  ]'::jsonb
);

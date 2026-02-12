
-- Table 1: protocol_progress
CREATE TABLE public.protocol_progress (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id),
  protocol_template_id uuid NOT NULL REFERENCES public.protocol_templates(id),
  peptide_slug text NOT NULL,
  goal_slug text NOT NULL,
  start_date date NOT NULL,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.protocol_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can select own progress" ON public.protocol_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own progress" ON public.protocol_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON public.protocol_progress FOR UPDATE USING (auth.uid() = user_id);

CREATE TRIGGER update_protocol_progress_updated_at
  BEFORE UPDATE ON public.protocol_progress
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Table 2: protocol_weekly_content
CREATE TABLE public.protocol_weekly_content (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  peptide_slug text NOT NULL,
  week_number integer NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  dose_info text,
  dose_change boolean DEFAULT false,
  new_dose text,
  previous_dose text,
  alert_message text,
  phase_name text,
  UNIQUE (peptide_slug, week_number)
);

ALTER TABLE public.protocol_weekly_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read weekly content" ON public.protocol_weekly_content FOR SELECT USING (auth.role() = 'authenticated');

-- Seed 20 weeks of semaglutide content
INSERT INTO public.protocol_weekly_content (peptide_slug, week_number, title, content, dose_info, dose_change, new_dose, previous_dose, alert_message, phase_name) VALUES
('semaglutide', 1, 'Starting Your Protocol', 'Welcome to Week 1. Your first injection is 0.25mg — the lowest therapeutic dose. Most people feel mild appetite reduction starting this week. Nausea affects about 44% of people at some point, but it''s usually mild at this dose. Pick a consistent injection day and time. The abdomen or thigh are the most common sites.', '0.25mg weekly', false, NULL, NULL, NULL, 'Phase 1: Low-Dose Titration'),
('semaglutide', 2, 'Building the Habit', 'Week 2 at 0.25mg. Your body is adjusting. Appetite changes may become more noticeable — many people describe the ''food noise'' getting quieter. If you had mild nausea in Week 1, it often improves this week. Weight change is typically minimal so far. That''s normal.', '0.25mg weekly', false, NULL, NULL, NULL, 'Phase 1: Low-Dose Titration'),
('semaglutide', 3, 'Finding Your Rhythm', 'Week 3 at 0.25mg. By now you should have a consistent injection routine. Most early side effects are stabilizing. Average weight change at this point: 1-2% of body weight. Don''t weigh yourself daily — weekly is enough.', '0.25mg weekly', false, NULL, NULL, NULL, 'Phase 1: Low-Dose Titration'),
('semaglutide', 4, 'Last Week Before First Increase', 'Final week at 0.25mg. Your dose increases next week to 0.5mg. This is the standard titration — your body has had 4 weeks to adjust. Some GI side effects may briefly return with the increase. That''s expected and usually resolves within a few days.', '0.25mg weekly', false, NULL, NULL, NULL, 'Phase 1: Low-Dose Titration'),
('semaglutide', 5, 'First Dose Increase', 'Welcome to 0.5mg. This is where appetite reduction becomes significantly more noticeable. In the STEP trials, meaningful weight loss acceleration begins at this dose. Eat slowly, choose smaller portions, and stay hydrated. If nausea hits, bland foods and ginger can help.', '0.5mg weekly', true, '0.5mg', '0.25mg', 'Dose increase this week: 0.25mg → 0.5mg. GI side effects may briefly return. This is the most common week for nausea to reappear. It usually resolves within 3-7 days. If severe, contact your doctor before continuing.', 'Phase 2: Building'),
('semaglutide', 6, 'Adjusting to 0.5mg', 'Second week at 0.5mg. If you had nausea last week, it''s likely improving now. Appetite suppression is usually stronger at this dose — you may notice you''re satisfied with less food. Average weight loss by Week 6: approximately 3-4% of starting body weight.', '0.5mg weekly', false, NULL, NULL, NULL, 'Phase 2: Building'),
('semaglutide', 7, 'Settling In', 'Week 7 at 0.5mg. Most people are well-adjusted to this dose. Energy levels often improve as weight decreases. Focus on protein intake — at least 60-80g per day to preserve muscle mass. This becomes increasingly important as weight loss progresses.', '0.5mg weekly', false, NULL, NULL, NULL, 'Phase 2: Building'),
('semaglutide', 8, 'Approaching Next Milestone', 'Final week at 0.5mg. Average weight loss at 8 weeks: approximately 5-7% of starting body weight. Your dose increases to 1.0mg next week. Same pattern as before — brief GI adjustment is possible, usually milder than the first increase.', '0.5mg weekly', false, NULL, NULL, NULL, 'Phase 2: Building'),
('semaglutide', 9, 'Moving to 1.0mg', 'Welcome to 1.0mg. This is where most people start seeing significant, visible changes. The STEP trials showed the steepest weight loss curve between weeks 9-16. Keep up protein intake and stay hydrated.', '1.0mg weekly', true, '1.0mg', '0.5mg', 'Dose increase this week: 0.5mg → 1.0mg. You know the pattern — brief GI side effects are possible. Usually milder than your first increase because your body has adapted. Contact your doctor if nausea persists beyond 5-7 days.', 'Phase 3: Acceleration'),
('semaglutide', 10, 'The Acceleration Phase', 'Week 10 at 1.0mg. Weight loss typically accelerates at this dose. You may notice changes in how your clothes fit before the scale moves much. Non-scale victories matter — energy, sleep quality, and lab values are all important markers.', '1.0mg weekly', false, NULL, NULL, NULL, 'Phase 3: Acceleration'),
('semaglutide', 11, 'Building Momentum', 'Week 11. You''re nearly 3 months in. This is a good time to check in with your doctor and review any lab work. Most GI side effects have resolved by now. If you''re experiencing persistent issues, discuss dose adjustment with your provider.', '1.0mg weekly', false, NULL, NULL, NULL, 'Phase 3: Acceleration'),
('semaglutide', 12, 'Three-Month Mark', 'Congratulations — 12 weeks in. Average weight loss at this point in the STEP trials: approximately 8-10% of starting body weight. Your dose increases to 1.7mg next week. You''re in the home stretch of titration.', '1.0mg weekly', false, NULL, NULL, NULL, 'Phase 3: Acceleration'),
('semaglutide', 13, 'Moving to 1.7mg', 'Welcome to 1.7mg. Your body has successfully titrated through three dose levels. Most people tolerate this increase well since the GI tract has gradually adapted. Weight loss continues to accelerate.', '1.7mg weekly', true, '1.7mg', '1.0mg', 'Dose increase this week: 1.0mg → 1.7mg. Two more increases to go. Same pattern — temporary GI adjustment possible. You''ve done this three times now. Contact your doctor if anything feels different from previous increases.', 'Phase 4: Near-Maintenance'),
('semaglutide', 14, 'Continuing at 1.7mg', 'Week 14 at 1.7mg. Appetite suppression is significant at this dose. Make sure you''re eating enough — undereating can cause fatigue, hair thinning, and muscle loss. Aim for at least 1,200 calories daily and prioritize protein.', '1.7mg weekly', false, NULL, NULL, NULL, 'Phase 4: Near-Maintenance'),
('semaglutide', 15, 'Preparing for Maintenance Dose', 'Week 15. One more week until your final dose increase to 2.4mg — the maintenance dose used in the STEP trials. Average weight loss at this stage: 10-12% of starting body weight.', '1.7mg weekly', false, NULL, NULL, NULL, 'Phase 4: Near-Maintenance'),
('semaglutide', 16, 'Last Week Before Maintenance', 'Final week at 1.7mg. Next week you''ll reach 2.4mg — the dose where STEP 1 participants averaged 14.9% body weight loss by week 68. You''ve completed the titration. The rest is maintenance and continued progress.', '1.7mg weekly', false, NULL, NULL, NULL, 'Phase 4: Near-Maintenance'),
('semaglutide', 17, 'Reaching Maintenance Dose', 'You''ve reached 2.4mg — the full maintenance dose. This is the dose at which all the major trial results were achieved. From here, it''s about consistency. Weight loss will continue gradually for months. In STEP 1, participants continued losing weight through week 68.', '2.4mg weekly', true, '2.4mg', '1.7mg', 'Final dose increase: 1.7mg → 2.4mg. This is your maintenance dose — the same dose used in the major clinical trials. No more increases from here.', 'Phase 5: Maintenance'),
('semaglutide', 18, 'First Full Week at Maintenance', 'Week 18 at the full dose. Your titration is complete. Weight loss continues gradually from here. The biggest risk now is complacency — keep your protein intake up, stay active, and keep logging your check-ins.', '2.4mg weekly', false, NULL, NULL, NULL, 'Phase 5: Maintenance'),
('semaglutide', 19, 'Settling Into Maintenance', 'Week 19. You''re well into the maintenance phase. STEP 5 showed that participants who stayed on semaglutide maintained 15.2% weight loss at 2 years. Consistency is the game now. Discuss long-term planning with your doctor.', '2.4mg weekly', false, NULL, NULL, NULL, 'Phase 5: Maintenance'),
('semaglutide', 20, 'Five Months In', '20 weeks — almost 5 months. If you''ve been consistent, you''re likely seeing 10-14% body weight reduction based on STEP trial averages. Remember: STEP 4 showed that stopping semaglutide led to regaining roughly 2/3 of lost weight within a year. Talk to your doctor about the long-term plan.', '2.4mg weekly', false, NULL, NULL, NULL, 'Phase 5: Maintenance');

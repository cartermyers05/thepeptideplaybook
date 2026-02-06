-- Add adherence tracking to check_ins
ALTER TABLE check_ins 
ADD COLUMN IF NOT EXISTS adherence text DEFAULT 'yes',
ADD COLUMN IF NOT EXISTS routine_changes text,
ADD COLUMN IF NOT EXISTS weight_kg numeric;
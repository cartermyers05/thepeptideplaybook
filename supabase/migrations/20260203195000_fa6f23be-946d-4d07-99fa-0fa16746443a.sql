-- Add unique constraint for check_ins on user_id and date for upsert functionality
ALTER TABLE check_ins ADD CONSTRAINT check_ins_user_date_unique UNIQUE (user_id, date);

-- Add unique constraint for user_streaks on user_id for upsert functionality  
ALTER TABLE user_streaks ADD CONSTRAINT user_streaks_user_unique UNIQUE (user_id);
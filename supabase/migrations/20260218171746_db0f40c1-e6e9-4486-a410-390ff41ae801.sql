
-- Make the progress-photos bucket private
UPDATE storage.buckets SET public = false WHERE id = 'progress-photos';

-- Drop the overly permissive public SELECT policy
DROP POLICY IF EXISTS "Public can view progress photos" ON storage.objects;

-- Enable the pg_cron extension
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Create a table to store generation logs
CREATE TABLE IF NOT EXISTS content_generation_logs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  timestamp timestamptz DEFAULT now(),
  total_cities integer,
  total_services integer,
  successfully_generated integer,
  failed_count integer,
  failures jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create a function to trigger the Edge Function
CREATE OR REPLACE FUNCTION trigger_content_generation()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Call the Edge Function using pg_net
  PERFORM net.http_post(
    url := current_setting('app.settings.supabase_url') || '/functions/v1/generate-annual-content',
    headers := jsonb_build_object(
      'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key'),
      'Content-Type', 'application/json'
    ),
    body := '{}'
  );
END;
$$;

-- Schedule the function to run annually (at 2 AM on January 1st)
SELECT cron.schedule(
  'annual-content-generation',   -- unique schedule name
  '0 2 1 1 *',                  -- cron schedule (2 AM on Jan 1st)
  'SELECT trigger_content_generation()'
); 
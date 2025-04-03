-- Add reCAPTCHA columns if they don't exist
ALTER TABLE leads
ADD COLUMN IF NOT EXISTS recaptcha_v3_token TEXT,
ADD COLUMN IF NOT EXISTS recaptcha_v3_score FLOAT,
ADD COLUMN IF NOT EXISTS recaptcha_v2_token TEXT;

-- Create rate limiting function
CREATE OR REPLACE FUNCTION check_rate_limit(
  ip_address TEXT,
  action_type TEXT,
  max_requests INTEGER,
  window_minutes INTEGER,
  v3_score FLOAT
) RETURNS BOOLEAN AS $$
DECLARE
  recent_count INTEGER;
  adjusted_max_requests INTEGER;
BEGIN
  -- Increase limit for high-trust users (v3 score > 0.7)
  adjusted_max_requests := CASE
    WHEN v3_score > 0.7 THEN max_requests * 2  -- Double the limit for trusted users
    ELSE max_requests
  END;

  -- Count recent requests from this IP
  SELECT COUNT(*)
  INTO recent_count
  FROM leads
  WHERE 
    client_ip = ip_address 
    AND created_at > NOW() - (window_minutes || ' minutes')::INTERVAL;
    
  RETURN recent_count < adjusted_max_requests;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing policy
DROP POLICY IF EXISTS "Enhanced submission verification" ON leads;

-- Create new policy without reCAPTCHA verification (since we do it in the Edge Function)
CREATE POLICY "Lead submission rate limiting" 
ON leads
FOR INSERT 
TO authenticated, anon
WITH CHECK (
  -- Only check rate limiting
  check_rate_limit(
    COALESCE(current_setting('request.headers', true)::json->>'cf-connecting-ip', '0.0.0.0'),
    'lead_submission',
    3,  -- Base limit: 3 submissions
    60, -- Per hour
    COALESCE(recaptcha_v3_score, 0)
  )
); 
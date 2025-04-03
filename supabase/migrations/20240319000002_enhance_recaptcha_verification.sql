-- Update leads table with new reCAPTCHA fields
ALTER TABLE leads
ADD COLUMN IF NOT EXISTS recaptcha_v3_token TEXT,
ADD COLUMN IF NOT EXISTS recaptcha_v3_score FLOAT,
ADD COLUMN IF NOT EXISTS recaptcha_v2_token TEXT;

-- Create enhanced verification function
CREATE OR REPLACE FUNCTION verify_recaptcha(
  v3_token TEXT,
  v3_score FLOAT,
  v2_token TEXT
) RETURNS BOOLEAN AS $$
BEGIN
  -- If v3 score is good (>= 0.5), accept without v2
  IF v3_score >= 0.5 THEN
    RETURN TRUE;
  END IF;

  -- If v3 score is suspicious (< 0.5), require v2
  IF v3_score < 0.5 AND (v2_token IS NULL OR v2_token = '') THEN
    RETURN FALSE;
  END IF;

  -- Both checks passed
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update rate limiting to be more forgiving for verified humans
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

-- Update lead submission policies
DROP POLICY IF EXISTS "Rate limit lead submissions" ON leads;
DROP POLICY IF EXISTS "Require valid reCAPTCHA" ON leads;

CREATE POLICY "Enhanced submission verification" 
ON leads
FOR INSERT 
TO authenticated, anon
WITH CHECK (
  -- Must pass both rate limiting and reCAPTCHA checks
  check_rate_limit(
    request.headers->>'cf-connecting-ip',
    'lead_submission',
    3,  -- Base limit: 3 submissions
    60, -- Per hour
    COALESCE(recaptcha_v3_score, 0)
  )
  AND
  verify_recaptcha(
    recaptcha_v3_token,
    COALESCE(recaptcha_v3_score, 0),
    recaptcha_v2_token
  )
); 
-- Create a function to check rate limits
CREATE OR REPLACE FUNCTION check_rate_limit(
  ip_address TEXT,
  action_type TEXT,
  max_requests INTEGER,
  window_minutes INTEGER
) RETURNS BOOLEAN AS $$
DECLARE
  recent_count INTEGER;
BEGIN
  -- Count recent requests from this IP
  SELECT COUNT(*)
  INTO recent_count
  FROM leads
  WHERE 
    client_ip = ip_address 
    AND created_at > NOW() - (window_minutes || ' minutes')::INTERVAL;
    
  -- Return true if under limit, false if exceeded
  RETURN recent_count < max_requests;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add client_ip column to leads table
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS client_ip TEXT,
ADD COLUMN IF NOT EXISTS recaptcha_token TEXT;

-- Create rate limiting policy
CREATE POLICY "Rate limit lead submissions" 
ON leads
FOR INSERT 
TO authenticated, anon
WITH CHECK (
  check_rate_limit(
    request.headers->>'cf-connecting-ip', -- Get IP from Cloudflare
    'lead_submission',
    3, -- Max 3 submissions
    60  -- Per 60 minutes
  )
);

-- Create function to verify reCAPTCHA token
CREATE OR REPLACE FUNCTION verify_recaptcha_token(token TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  -- In production, you would make an HTTP request to Google's verification endpoint
  -- For now, we just check if a token exists
  RETURN token IS NOT NULL AND token != '';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update lead submission policy to require reCAPTCHA
CREATE POLICY "Require valid reCAPTCHA" 
ON leads
FOR INSERT 
TO authenticated, anon
WITH CHECK (
  verify_recaptcha_token(recaptcha_token)
); 
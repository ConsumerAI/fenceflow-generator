-- Enable RLS on tables
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_cache ENABLE ROW LEVEL SECURITY;

-- Policy for leads table
CREATE POLICY "Enable insert for authenticated users only" 
ON leads FOR INSERT 
TO authenticated, anon
WITH CHECK (true);  -- Allow inserts from anyone (form submissions)

CREATE POLICY "Enable read for service role only" 
ON leads FOR SELECT 
TO service_role 
USING (true);

-- Policy for content_cache table
CREATE POLICY "Enable read access for everyone to content_cache" 
ON content_cache FOR SELECT 
TO authenticated, anon
USING (true);

CREATE POLICY "Enable content_cache modifications for service role only" 
ON content_cache FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);

-- Ensure tables have proper indexes
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads(created_at);
CREATE INDEX IF NOT EXISTS content_cache_page_url_idx ON content_cache(page_url);
CREATE INDEX IF NOT EXISTS content_cache_expires_at_idx ON content_cache(expires_at); 
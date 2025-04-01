-- Drop existing functions first
DROP FUNCTION IF EXISTS cache_content(TEXT, TEXT, INTEGER);
DROP FUNCTION IF EXISTS get_cached_content(TEXT);

-- Create the content_cache table if it doesn't exist
CREATE TABLE IF NOT EXISTS content_cache (
    cache_key TEXT PRIMARY KEY,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL
);

-- Create index on expires_at for efficient cleanup
CREATE INDEX IF NOT EXISTS idx_content_cache_expires_at ON content_cache(expires_at);

-- Function to cache content with expiration
CREATE OR REPLACE FUNCTION cache_content(
    p_cache_key TEXT,
    p_cache_content TEXT,
    p_expire_days INTEGER DEFAULT 365
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Delete existing content for this key if it exists
    DELETE FROM content_cache WHERE cache_key = p_cache_key;
    
    -- Insert new content
    INSERT INTO content_cache (cache_key, content, expires_at)
    VALUES (
        p_cache_key,
        p_cache_content,
        NOW() + (p_expire_days || ' days')::INTERVAL
    );
END;
$$;

-- Function to get cached content
CREATE OR REPLACE FUNCTION get_cached_content(p_cache_key TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    cached_content TEXT;
BEGIN
    -- Get content if it exists and hasn't expired
    SELECT content INTO cached_content
    FROM content_cache
    WHERE cache_key = p_cache_key
    AND expires_at > NOW();
    
    -- Delete expired content
    DELETE FROM content_cache WHERE expires_at <= NOW();
    
    RETURN cached_content;
END;
$$;

-- Grant access to the anon role
GRANT EXECUTE ON FUNCTION cache_content(TEXT, TEXT, INTEGER) TO anon;
GRANT EXECUTE ON FUNCTION get_cached_content(TEXT) TO anon;
GRANT ALL ON content_cache TO anon; 
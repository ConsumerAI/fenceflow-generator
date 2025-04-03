-- Create a table for content caching
CREATE TABLE IF NOT EXISTS public.content_cache (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_url TEXT NOT NULL UNIQUE,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT (now() + interval '30 days')
);

-- Create an index on page_url for faster lookups
CREATE INDEX IF NOT EXISTS idx_content_cache_page_url ON public.content_cache(page_url);

-- Create a function to get cached content
CREATE OR REPLACE FUNCTION public.get_cached_content(cache_key TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    cached_content TEXT;
BEGIN
    -- Get content if it exists and hasn't expired
    SELECT content INTO cached_content
    FROM public.content_cache
    WHERE page_url = cache_key
        AND expires_at > now();
    
    RETURN cached_content;
END;
$$;

-- Create a function to cache content
CREATE OR REPLACE FUNCTION public.cache_content(
    cache_key TEXT,
    cache_content TEXT,
    expire_days INTEGER DEFAULT 30
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Insert or update cached content
    INSERT INTO public.content_cache (page_url, content, expires_at)
    VALUES (
        cache_key,
        cache_content,
        now() + (expire_days * INTERVAL '1 day')
    )
    ON CONFLICT (page_url) 
    DO UPDATE SET
        content = EXCLUDED.content,
        expires_at = now() + (expire_days * INTERVAL '1 day'),
        created_at = now();
END;
$$; 
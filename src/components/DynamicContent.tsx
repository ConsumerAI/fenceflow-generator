import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { marked } from 'marked';
import { CityContent } from '@/lib/types';
import { ServiceType } from '@/lib/types';
import { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

export interface DynamicContentProps {
  cityName: string;
  serviceName?: ServiceType;
  content?: CityContent;
  onContactClick?: () => void;
}

const typedSupabase = supabase as unknown as SupabaseClient<Database>;

const LoadingSkeleton = () => (
  <div className="animate-pulse space-y-8">
    <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto"></div>
    <div className="space-y-4">
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      <div className="h-4 bg-gray-200 rounded w-4/6"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
    <div className="space-y-4">
      <div className="h-6 bg-gray-200 rounded w-1/3"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      <div className="h-4 bg-gray-200 rounded w-4/6"></div>
    </div>
    <div className="space-y-4">
      <div className="h-6 bg-gray-200 rounded w-1/3"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      <div className="h-4 bg-gray-200 rounded w-4/6"></div>
    </div>
  </div>
);

const DynamicContent: React.FC<DynamicContentProps> = ({ 
  cityName, 
  serviceName = ServiceType.ResidentialFencing, 
  content,
  onContactClick 
}) => {
  const [contentState, setContentState] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    marked.setOptions({
      gfm: true,
      breaks: true
    });
  }, []);

  useEffect(() => {
    const fetchContent = async () => {
      if (!cityName) return;
      
      try {
        setIsLoading(true);
        
        const cacheKey = serviceName !== ServiceType.ResidentialFencing 
          ? `${cityName.toLowerCase()}-${String(serviceName).toLowerCase().replace(/\s+/g, '-')}-dynamic`
          : `${cityName.toLowerCase()}-dynamic`;
        
        console.log('Attempting to fetch cached content for:', cacheKey);
        
        const { data: cachedContent, error: cacheError } = await typedSupabase
          .rpc('get_cached_content', { p_cache_key: cacheKey });
        
        if (!cacheError && cachedContent) {
          console.log('Found cached dynamic content for:', cacheKey);
          setContentState(cachedContent);
          setIsLoading(false);
          return;
        }
        
        console.log(`No cache found. Attempting to generate new content for ${cityName} and ${serviceName}`);
        
        const promptTemplate = `You are an elite-level professional content writer specializing in fence installation and athletic court construction. Create rich, SEO-optimized content for ${cityName}, Texas focusing on ${String(serviceName)} that positions Fences Texas as the premier local connection to top fence contractors.

CRITICAL REQUIREMENTS:
1. ALWAYS use "Fences Texas" as the company name
2. NEVER include any CTAs, contact information, or form references
3. NEVER include internal notes about SEO or content strategy
4. NEVER mention being a contractor - we connect homeowners with contractors
5. Use the exact markdown structure provided below
6. STOP after the "Quality Installation" section - do not add any additional sections

FORMAT YOUR RESPONSE WITH THIS EXACT STRUCTURE AND MARKDOWN:

# ${String(serviceName)} Services in ${cityName}, Texas

When it comes to enhancing the beauty, security, and value of your property in **${cityName}, Texas**, Fences Texas stands out as your #1 connection to quality ${String(serviceName).toLowerCase()} contractors. With 15+ years of experience connecting homeowners with trusted professionals and a deep understanding of ${cityName}'s unique needs, we ensure you get the perfect fence that complements your home while addressing local conditions and regulations.

## Why Choose Fences Texas for ${String(serviceName)}?

### Local Expertise
[Write a paragraph about local knowledge, mentioning specific neighborhoods, developments, or landmarks]

### Tailored Solutions for Local Conditions
[Write about local weather, soil conditions, and specific challenges]

#### Materials Our Contractors Specialize In
- **[Material 1]**: [Brief description of benefits]
- **[Material 2]**: [Brief description of benefits]
- **[Material 3]**: [Brief description of benefits]

## The Benefits of Professional ${String(serviceName)}

### Enhanced Privacy and Security
[Write about privacy and security benefits]

### Increased Property Value
[Write about property value benefits]

### Customization Options
[Write about customization possibilities]

## Our Comprehensive Process

### 1. Initial Consultation
[Describe the consultation process]

### 2. Expert Contractor Matching
[Explain how we match with the right contractor]

### 3. Quality Installation
[Describe the installation process]`;
        
        try {
          console.log('Calling generate-city-content function...');
          const { data, error } = await supabase.functions.invoke('generate-city-content', {
            body: {
              cityName,
              serviceName: String(serviceName),
              prompt: promptTemplate
            }
          });

          if (error) {
            console.error("Error with generate-city-content:", error);
            return;
          }

          if (data?.content) {
            console.log("Successfully generated content, caching...");
            const { error: cachingError } = await typedSupabase
              .rpc('cache_content', { 
                p_cache_key: cacheKey,
                p_cache_content: data.content,
                p_expire_days: 30
              });
            
            if (cachingError) {
              console.error("Error caching content:", cachingError);
            } else {
              console.log("Successfully cached content");
            }
            
            setContentState(data.content);
          } else {
            console.error("No content received from function");
          }
        } catch (invokeError) {
          console.error("Error invoking function:", invokeError);
        }
      } catch (error) {
        console.error("Error in dynamic content generation:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [cityName, serviceName]);

  const handleContactClick = () => {
    if (onContactClick) {
      onContactClick();
    } else {
      const form = document.getElementById('quote');
      if (form) {
        form.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {isLoading ? (
            <LoadingSkeleton />
          ) : contentState ? (
            <article>
              <div 
                className="prose prose-lg max-w-none
                  prose-headings:font-display
                  prose-h1:text-4xl prose-h1:md:text-5xl prose-h1:font-bold prose-h1:text-center prose-h1:mb-8 prose-h1:text-foreground
                  prose-h2:text-3xl prose-h2:font-bold prose-h2:text-texas-earth prose-h2:mt-12 prose-h2:mb-6
                  prose-h3:text-2xl prose-h3:font-semibold prose-h3:text-texas-terracotta prose-h3:mt-8 prose-h3:mb-4
                  prose-h4:text-xl prose-h4:font-medium prose-h4:text-texas-earth/80 prose-h4:mt-6 prose-h4:mb-3
                  prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
                  prose-strong:text-foreground prose-strong:font-semibold
                  prose-em:text-texas-terracotta prose-em:font-medium
                  prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6 prose-ul:space-y-2
                  prose-li:text-muted-foreground prose-li:marker:text-texas-terracotta
                  prose-a:text-texas-terracotta prose-a:no-underline hover:prose-a:text-texas-earth"
                dangerouslySetInnerHTML={{ __html: marked.parse(contentState) }} 
              />
              
              <div className="mt-12 prose prose-lg max-w-none
                prose-headings:font-display
                prose-h1:text-4xl prose-h1:md:text-5xl prose-h1:font-bold prose-h1:text-center prose-h1:mb-8 prose-h1:text-foreground
                prose-h2:text-3xl prose-h2:font-bold prose-h2:text-texas-earth prose-h2:mt-12 prose-h2:mb-6
                prose-h3:text-2xl prose-h3:font-semibold prose-h3:text-texas-terracotta prose-h3:mt-8 prose-h3:mb-4
                prose-h4:text-xl prose-h4:font-medium prose-h4:text-texas-earth/80 prose-h4:mt-6 prose-h4:mb-3
                prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
                prose-strong:text-foreground prose-strong:font-semibold
                prose-em:text-texas-terracotta prose-em:font-medium">
                <h2 className="text-3xl font-bold text-texas-earth mt-12 mb-6">Get Started Today</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Ready to enhance your property with a top-quality {serviceName.toLowerCase()}? At Fences Texas, we're committed to 
                  delivering exceptional service and results that stand the test of time.
                </p>
                
                <h2 className="text-3xl font-bold text-texas-earth mt-12 mb-6">Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Fill out our online form for a free consultation and estimate. Discover why we are {cityName}'s premier 
                  choice for {serviceName.toLowerCase()}!
                </p>
                
                <p className="text-muted-foreground leading-relaxed mb-8">
                  By choosing us, you're not just getting a fence; you're investing in a lasting solution that adds value, 
                  security, and beauty to your home. Let's build something great together!
                </p>

                <Button 
                  className="bg-texas-terracotta text-white hover:bg-texas-earth transition-colors"
                  onClick={handleContactClick}
                >
                  Get Your Perfect Fence Match™
                </Button>
              </div>
            </article>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No content available.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DynamicContent;

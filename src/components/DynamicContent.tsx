import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { marked } from 'marked';
import { Button } from '@/components/ui/button';
import { ServiceType } from '@/lib/types';
import { SupabaseClient } from '@supabase/supabase-js';
import type { Database as GeneratedDatabase } from '@/integrations/supabase/types';

interface DynamicContentProps {
  cityName: string;
  serviceName?: ServiceType;
  onContactClick?: () => void;
}

type Database = GeneratedDatabase & {
  public: {
    Functions: {
      get_cached_content: {
        Args: { cache_key: string };
        Returns: string;
      };
      cache_content: {
        Args: { 
          cache_key: string;
          cache_content: string;
          expire_days: number;
        };
        Returns: void;
      };
    };
  };
};

const typedSupabase = supabase as unknown as SupabaseClient<Database>;

const DynamicContent: React.FC<DynamicContentProps> = ({ 
  cityName, 
  serviceName = ServiceType.ResidentialFencing, 
  onContactClick 
}) => {
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Configure marked
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
        
        // Generate a cache key based on city and optional service
        const cacheKey = serviceName !== ServiceType.ResidentialFencing 
          ? `${cityName.toLowerCase()}-${String(serviceName).toLowerCase().replace(/\s+/g, '-')}-dynamic`
          : `${cityName.toLowerCase()}-dynamic`;
        
        // Use RPC function to get cached content
        const { data: cachedContent, error: cacheError } = await typedSupabase
          .rpc('get_cached_content', { cache_key: cacheKey });
        
        if (!cacheError && cachedContent) {
          console.log('Using cached dynamic content');
          setContent(cachedContent);
          setIsLoading(false);
          return;
        }
        
        // No cached content, generate new content
        console.log(`Attempting to generate new content for ${cityName} and ${serviceName}`);
        
        const promptTemplate = `You are an elite-level professional content writer specializing in fence installation and athletic court construction. Create rich, SEO-optimized content for ${cityName}, Texas focusing on ${String(serviceName)} that positions our service as the premier local connection to top fence contractors.

Important: We are a lead generation service connecting homeowners with qualified fence contractors, NOT a fence contractor ourselves. All content must make this relationship clear.

Your content must:

1. DEMONSTRATE DEEP LOCAL KNOWLEDGE:
   - Reference specific ${cityName} neighborhoods, developments, or landmarks
   - Address unique local conditions (weather patterns, soil types, architectural styles)
   - Mention any relevant local regulations, HOA requirements, or permitting considerations

2. SHOWCASE INDUSTRY EXPERTISE FOR ${String(serviceName)}:
   - Explain what homeowners should know about ${String(serviceName)} in ${cityName}
   - Detail material selection considerations unique to this service and location
   - Describe what to look for in quality contractors for this service

3. INCORPORATE CUSTOMER PSYCHOLOGY:
   - Address the specific pain points ${cityName} residents face regarding ${String(serviceName)}
   - Frame solutions in terms of tangible lifestyle benefits, not just features
   - Use persuasive language that resonates with local property owners' values

4. ESTABLISH CLEAR VALUE PROPOSITION:
   - Explain how our service helps connect homeowners with the right contractors
   - Emphasize our knowledge of ${cityName}'s unique conditions and requirements
   - Highlight the benefits of using our matching service rather than finding contractors alone

5. OPTIMIZE FOR LOCAL SEO:
   - Naturally integrate "${cityName} ${String(serviceName)}" and related long-tail keywords
   - Format content with proper H2/H3 headings, brief paragraphs, and bullet points
   - Include specific calls-to-action relevant to local customers

6. PROVIDE ACTIONABLE INFORMATION:
   - Include specific considerations for ${String(serviceName)} in ${cityName}'s climate
   - Offer transparent insights into what to expect from a quality contractor
   - Give readers genuine value even if they don't convert immediately

Write in a professional yet conversational tone that builds trust while establishing authority. Avoid generic platitudes - every sentence should deliver specific, valuable information that demonstrates our unique expertise in connecting ${cityName} homeowners with quality ${String(serviceName)} contractors.

Use markdown formatting with ## for main headings and ### for subheadings. Use **bold** for important terms and *italics* for emphasis. Use bullet points where appropriate. Replace any mentions of 'Your Company Name' with 'Fences Texas' and remove any phone number references.`;
        
        // Try generate-content first
        let data;
        let error;
        
        try {
          const result = await supabase.functions.invoke('generate-content', {
            body: {
              city: cityName,
              service: String(serviceName),
            }
          });
          
          if (result.error) {
            console.error("Error with generate-content:", result.error);
            // If first function fails, try generate-city-content
            console.log("Trying fallback function generate-city-content...");
            const fallbackResult = await supabase.functions.invoke('generate-city-content', {
              body: {
                cityName,
                serviceName: String(serviceName),
                prompt: promptTemplate
              }
            });
            data = fallbackResult.data;
            error = fallbackResult.error;
          } else {
            data = result.data;
            error = result.error;
          }
        } catch (invokeError) {
          console.error("Error invoking function:", invokeError);
          error = invokeError;
        }

        if (error) {
          console.error("Error fetching dynamic content:", error);
          return;
        }

        if (data?.content) {
          console.log("Successfully generated content:", data.content.substring(0, 100) + "...");
          // Cache the content using RPC function
          const { error: cachingError } = await typedSupabase
            .rpc('cache_content', { 
              cache_key: cacheKey,
              cache_content: data.content,
              expire_days: 30
            });
          
          if (cachingError) {
            console.error("Error caching content:", cachingError);
          } else {
            console.log("Successfully cached content");
          }
          
          setContent(data.content);
        } else {
          console.error("No content received from function");
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
      // Scroll to the form if no click handler provided
      const form = document.getElementById('quote');
      if (form) {
        form.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="py-16 md:py-24 bg-secondary/30 texas-section">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-texas-terracotta mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Generating content for {cityName}...</p>
            </div>
          ) : content ? (
            <div>
              <div 
                className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: marked.parse(content) }}
              />
              <div className="mt-8 flex justify-center">
                <Button 
                  onClick={handleContactClick}
                  className="bg-texas-terracotta text-white hover:bg-texas-earth transition-colors"
                >
                  Get Your Perfect Fence
                </Button>
              </div>
            </div>
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

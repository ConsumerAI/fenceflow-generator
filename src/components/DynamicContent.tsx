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

When it comes to enhancing the beauty, security, and value of your property in **${cityName}, Texas**, Fences Texas stands out as your premier connection to quality ${String(serviceName).toLowerCase()} contractors. With 15+ years of experience connecting homeowners with trusted professionals and a deep understanding of ${cityName}'s unique needs, we ensure you get the perfect fence that complements your home while addressing local conditions and regulations.

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
[Describe the installation process]

[END OF CONTENT - DO NOT ADD ANY MORE SECTIONS, CALLS TO ACTION, OR CONTACT INFORMATION]

Remember to:
1. Use **bold** for important terms and locations
2. Use *italics* for emphasis
3. Maintain consistent heading hierarchy (h1 > h2 > h3)
4. Use bullet points for lists
5. Keep paragraphs short and scannable
6. Include specific local details throughout

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
   - Include specific calls-to-action relevant to local customers
   - Use location-specific terms and phrases

6. PROVIDE ACTIONABLE INFORMATION:
   - Include specific considerations for ${String(serviceName)} in ${cityName}'s climate
   - Offer transparent insights into what to expect from a quality contractor
   - Give readers genuine value even if they don't convert immediately

Write in a professional yet conversational tone that builds trust while establishing authority. Avoid generic platitudes - every sentence should deliver specific, valuable information that demonstrates our unique expertise in connecting ${cityName} homeowners with quality ${String(serviceName)} contractors.

## Get Started Today!

Ready to enhance your property with a beautiful and functional fence? Fill out our quick form below to get matched with trusted ${String(serviceName).toLowerCase()} contractors in ${cityName}. Our expert team will connect you with professionals who understand your specific needs and local requirements.

## Transform Your Property

*Simply complete the form below to begin your fencing project. Our team will review your requirements and match you with the perfect contractors for your needs.*

[END OF CONTENT - DO NOT ADD ANY OTHER TEXT, SECTIONS, OR CONTACT METHODS]`;
        
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
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-texas-terracotta mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Generating content for {cityName}...</p>
            </div>
          ) : content ? (
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
                dangerouslySetInnerHTML={{ __html: marked.parse(content) }} 
              />
              
              {/* Hardcoded CTA Section */}
              <div className="mt-16 text-center border-t border-texas-terracotta/20 pt-16">
                <h2 className="text-3xl font-bold text-texas-earth mb-6">Get Started Today</h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Ready to enhance your property with a top-quality {serviceName.toLowerCase()}? At Fences Texas, we're committed to 
                  delivering exceptional service and results that stand the test of time.
                </p>
                
                <h3 className="text-2xl font-semibold text-texas-terracotta mb-4">Contact Us</h3>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Fill out our online form for a free consultation and estimate. Discover why we are {cityName}'s premier 
                  choice for {serviceName.toLowerCase()}!
                </p>
                
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  By choosing us, you're not just getting a fence; you're investing in a lasting solution that adds value, 
                  security, and beauty to your home. Let's build something great together!
                </p>

                <Button 
                  onClick={handleContactClick}
                  className="bg-texas-terracotta text-white hover:bg-texas-earth transition-colors text-lg px-8 py-3"
                >
                  Get Your Perfect Fence
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

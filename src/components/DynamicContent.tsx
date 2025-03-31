
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { marked } from 'marked';
import { Button } from '@/components/ui/button';

interface DynamicContentProps {
  cityName: string;
  serviceName?: string;
  onContactClick?: () => void;
}

const DynamicContent: React.FC<DynamicContentProps> = ({ 
  cityName, 
  serviceName = "Fencing Services", 
  onContactClick 
}) => {
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchContent = async () => {
      if (!cityName) return;
      
      try {
        setIsLoading(true);
        
        // Generate a cache key based on city and optional service
        const cacheKey = serviceName !== "Fencing Services" 
          ? `${cityName.toLowerCase()}-${serviceName.toLowerCase().replace(/\s+/g, '-')}-dynamic`
          : `${cityName.toLowerCase()}-dynamic`;
        
        // Check for cached content in the database using RPC call
        // We're using a function_select since we cannot access content_cache directly from the client
        const { data: functionData, error: functionError } = await supabase.rpc(
          'get_cached_content',
          { cache_key: cacheKey }
        );
        
        if (!functionError && functionData) {
          console.log('Using cached dynamic content');
          setContent(functionData);
          setIsLoading(false);
          return;
        }
        
        // No cached content, generate new content
        console.log(`Generating new dynamic content for ${cityName} and ${serviceName}`);
        
        const promptTemplate = serviceName !== "Fencing Services"
          ? `Write an informative, engaging, and detailed section about ${serviceName} in ${cityName}, Texas. Include specific information about ${cityName}'s local conditions (climate, regulations, popular styles) and how they influence ${serviceName.toLowerCase()} projects. Format with H2/H3 headings and use HTML formatting for emphasis.`
          : `Write an informative, engaging, and detailed section about fencing services in ${cityName}, Texas. Include specific information about ${cityName}'s local conditions (climate, regulations, popular styles) and how they influence fencing projects. Format with H2/H3 headings and use HTML formatting for emphasis.`;
        
        const { data, error } = await supabase.functions.invoke('generate-city-content', {
          body: {
            cityName,
            serviceName: serviceName,
            prompt: promptTemplate
          }
        });

        if (error) {
          console.error("Error fetching dynamic content:", error);
          return;
        }

        if (data?.content) {
          // Cache the content for future use using RPC call
          const { error: cacheError } = await supabase.rpc(
            'cache_content',
            { 
              cache_key: cacheKey,
              cache_content: data.content,
              expire_days: 30
            }
          );
          
          if (cacheError) {
            console.error("Error caching content:", cacheError);
          }
          
          setContent(data.content);
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
    <section className="py-12 md:py-16 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Expert Insights for {serviceName} in {cityName}
          </h2>
          
          {isLoading ? (
            <div className="flex flex-col items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-texas-terracotta"></div>
              <p className="mt-4 text-sm text-gray-500">
                Generating specialized {serviceName.toLowerCase()} insights for {cityName}...
              </p>
            </div>
          ) : (
            <>
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: marked.parse(content) }} 
              />
              
              <div className="mt-8 flex justify-center">
                <Button 
                  className="bg-texas-terracotta text-white hover:bg-texas-earth transition-colors"
                  onClick={handleContactClick}
                >
                  Get a Free Quote
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default DynamicContent;

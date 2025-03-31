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
        console.log(`Generating new dynamic content for ${cityName} and ${serviceName}`);
        
        const promptTemplate = serviceName !== ServiceType.ResidentialFencing
          ? `Write an informative, engaging, and detailed section about ${String(serviceName)} in ${cityName}, Texas. Include specific information about ${cityName}'s local conditions (climate, regulations, popular styles) and how they influence ${String(serviceName).toLowerCase()} projects. Use markdown formatting with ## for main headings and ### for subheadings. Use **bold** for important terms and *italics* for emphasis. Use bullet points where appropriate.`
          : `Write an informative, engaging, and detailed section about fencing services in ${cityName}, Texas. Include specific information about ${cityName}'s local conditions (climate, regulations, popular styles) and how they influence fencing projects. Use markdown formatting with ## for main headings and ### for subheadings. Use **bold** for important terms and *italics* for emphasis. Use bullet points where appropriate.`;
        
        const { data, error } = await supabase.functions.invoke('generate-city-content', {
          body: {
            cityName,
            serviceName: String(serviceName),
            prompt: promptTemplate
          }
        });

        if (error) {
          console.error("Error fetching dynamic content:", error);
          return;
        }

        if (data?.content) {
          // Cache the content using RPC function
          const { error: cachingError } = await typedSupabase
            .rpc('cache_content', { 
              cache_key: cacheKey,
              cache_content: data.content,
              expire_days: 30
            });
          
          if (cachingError) {
            console.error("Error caching content:", cachingError);
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
    <section className="py-16 md:py-24 bg-secondary/30 texas-section">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-texas-earth">
            Expert Insights for {String(serviceName)} in {cityName}
          </h2>
          
          {isLoading ? (
            <div className="flex flex-col items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-texas-terracotta"></div>
              <p className="mt-4 text-sm text-gray-500">
                Generating specialized {String(serviceName).toLowerCase()} insights for {cityName}...
              </p>
            </div>
          ) : (
            <div className="glass-card p-8 md:p-10">
              <div 
                className="prose prose-lg max-w-none [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mb-4 [&>h2]:text-texas-earth [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:mb-3 [&>h3]:mt-6 [&>h3]:text-texas-terracotta [&>p]:mb-4 [&>p]:text-muted-foreground [&>ul]:pl-5 [&>ul]:mb-6 [&>ul]:space-y-2 [&>ul]:list-disc [&>ul]:text-muted-foreground [&>li]:ml-4 [&>strong]:font-semibold [&>strong]:text-foreground [&>em]:text-texas-terracotta [&>em]:font-medium"
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
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DynamicContent;

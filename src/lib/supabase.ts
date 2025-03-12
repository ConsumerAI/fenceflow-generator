
import { createClient } from '@supabase/supabase-js';
import { Lead, CityContent, ContentCache } from './types';

// Initialize the Supabase client
const supabaseUrl = 'https://vmniocmdyxvhqbetsjub.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtbmlvY21keXh2aHFiZXRzanViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3MjY3NjIsImV4cCI6MjA1NzMwMjc2Mn0.woc9RNWJNDgYAk_84aPgCRLg32WtkEjYpMuhZvagp1M';
const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

class Supabase {
  async submitLead(lead: Lead): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabaseClient
        .from('leads')
        .insert(lead);
      
      if (error) throw error;
      
      console.log('Lead submitted successfully:', lead);
      return { success: true };
    } catch (err) {
      console.error('Error submitting lead:', err);
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Unknown error occurred' 
      };
    }
  }

  async getCachedContent(cityUrl: string): Promise<CityContent | null> {
    try {
      const { data, error } = await supabaseClient
        .from('content_cache')
        .select('content')
        .eq('page_url', cityUrl)
        .single();
      
      if (error || !data) {
        console.log(`No cached content found for: ${cityUrl}`);
        return null;
      }
      
      return data.content as CityContent;
    } catch (err) {
      console.error(`Error getting cached content for: ${cityUrl}`, err);
      return null;
    }
  }

  async cacheContent(pageUrl: string, content: CityContent): Promise<void> {
    try {
      const { error } = await supabaseClient
        .from('content_cache')
        .upsert({ 
          page_url: pageUrl, 
          content,
          expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
        });
      
      if (error) throw error;
      
      console.log(`Content cached for: ${pageUrl}`);
    } catch (err) {
      console.error(`Error caching content for: ${pageUrl}`, err);
    }
  }
}

export const supabase = new Supabase();

// OpenAI integration for content generation
export async function generateCityContent(city: string): Promise<CityContent> {
  try {
    // Check if we have content in the cache first
    const cachedContent = await supabase.getCachedContent(`/${city.toLowerCase()}`);
    if (cachedContent) {
      console.log(`Using cached content for ${city}`);
      return cachedContent;
    }

    console.log(`Generating new content for ${city}`);
    
    // If no cached content, use OpenAI to generate (future implementation)
    // For now, return static content with the city name
    const content: CityContent = {
      metaTitle: `Fence Companies in ${city} | New Fences Texas`,
      metaDescription: `Top new fence installation in ${city} – residential, commercial, gates. Free quotes, no repairs. Call now!`,
      h1: `New Fence Installation Services in ${city}`,
      intro: `${city}'s growing neighborhoods deserve the finest new fence installations. With expanding communities and beautiful properties, a quality fence enhances security, privacy, and curb appeal. Our experienced team specializes exclusively in new installations (no repairs), delivering premium fencing solutions tailored to ${city}'s unique landscape and architectural styles.`,
      serviceSections: {
        "Residential Fencing": `For homeowners in ${city}, we offer premium residential fencing solutions that enhance property value and security. Our wood fences provide classic Texas charm with guaranteed durability against ${city}'s weather patterns. We also specialize in decorative pool fences that meet all local safety codes while complementing your outdoor aesthetic. As ${city}'s most trusted new fence installers, we focus exclusively on fresh installations with quality materials.`,
        "Commercial Fencing": `Business owners throughout ${city} trust our commercial fencing solutions for security, durability, and professional appearance. Our iron fences provide elegant security for office buildings, while our heavy-duty installations protect industrial properties and warehouses. As the leading commercial fence company in ${city}, we understand local business needs and zoning requirements, delivering custom solutions with premium materials and professional installation.`,
        "Sports Courts": `${city} families and facilities love our sports court fencing installations. Whether for tennis, basketball, or multi-purpose courts, our fence contractors provide durable, safe enclosures designed for years of active use. We're the sports fencing specialists near you, offering custom heights, gate configurations, and high-quality materials that stand up to intense play and ${city}'s varied weather conditions.`,
        "Access Control": `Upgrade your ${city} property with our custom gate installation services. From elegant entrance gates for residential estates to secure access points for commercial properties, our gate installation team in ${city} delivers outstanding craftsmanship. We specialize in custom gates near you, tailored to your property's specific style and security requirements, with options ranging from classic wood to contemporary metal designs.`,
        "Automatic Gates": `Experience ultimate convenience with our automatic gates, perfectly designed for ${city} properties. Our automated gate systems combine security with ease of access, featuring remote controls, keypads, and smartphone integration options. As the preferred automated gate company in ${city}, we handle everything from design to installation of new systems (no repairs or replacements), ensuring smooth operation and reliable performance.`
      },
      benefits: [
        `Free, no-obligation quotes for all ${city} customers`,
        `Specialized expertise in new installations only (no repair services)`,
        `Premium materials selected for ${city}'s specific climate conditions`,
        `Fully licensed, insured, and experienced installation teams`,
        `Comprehensive warranties on all new fence installations`
      ],
      faq: `New fences in ${city} provide enhanced security, privacy, and significant property value increase. With our climate-specific materials and professional installation techniques, a new fence from Fences Texas delivers lasting performance while complementing ${city}'s architectural styles, making it an excellent investment for any property.`,
      cta: `Ready for your new fence in ${city}? Complete our quick form for a free, no-obligation quote from the best fence company in ${city}. Our specialists will contact you within 24 hours to discuss your project needs and arrange a convenient consultation.`,
      keywords: [
        `fence companies ${city}`,
        `fence installation ${city}`,
        `new fence installers ${city}`,
        `residential fencing ${city}`,
        `commercial fence company ${city}`,
        `custom wood fences ${city}`,
        `automatic gate installation ${city}`,
        `sports court fencing ${city}`,
        `iron fence contractors ${city}`,
        `pool fence installation ${city}`
      ],
      images: [
        { src: "/placeholder.svg", alt: `Residential wood fence installation in ${city}, Texas` },
        { src: "/placeholder.svg", alt: `Commercial security fencing for ${city} businesses` },
        { src: "/placeholder.svg", alt: `Custom automatic gate installation in ${city}, Texas` }
      ]
    };
    
    // Cache the generated content
    await supabase.cacheContent(`/${city.toLowerCase()}`, content);
    
    return content;
  } catch (error) {
    console.error('Error generating content:', error);
    // Return basic content if generation fails
    return {
      metaTitle: `Fence Services in ${city}`,
      metaDescription: `Fence installation services in ${city}`,
      h1: `Fence Services in ${city}`,
      intro: `Quality fence installation in ${city}.`,
      serviceSections: {
        "Residential Fencing": `Residential fencing in ${city}`,
        "Commercial Fencing": `Commercial fencing in ${city}`,
        "Sports Courts": `Sports court fencing in ${city}`,
        "Access Control": `Access control solutions in ${city}`,
        "Automatic Gates": `Automatic gates in ${city}`
      },
      benefits: [`Quality service in ${city}`],
      faq: `Frequently asked questions about fencing in ${city}`,
      cta: `Contact us for fencing in ${city}`,
      keywords: [`fencing ${city}`],
      images: [{ src: "/placeholder.svg", alt: `Fencing in ${city}` }]
    };
  }
}

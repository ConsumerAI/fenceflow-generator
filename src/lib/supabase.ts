
import { createClient } from '@supabase/supabase-js';
import { Lead, CityContent, ContentCache } from './types';

// Initialize the Supabase client
const supabaseUrl = 'https://vmniocmdyxvhqbetsjub.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtbmlvY21keXh2aHFiZXRzanViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3MjY3NjIsImV4cCI6MjA1NzMwMjc2Mn0.woc9RNWJNDgYAk_84aPgCRLg32WtkEjYpMuhZvagp1M';
const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

class Supabase {
  async submitLead(lead: Omit<Lead, 'id' | 'created_at'>): Promise<{ success: boolean; error?: string }> {
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

// Function to generate city content, with fallback to static content
export async function generateCityContent(city: string): Promise<CityContent> {
  try {
    // First, check if there's cached content
    const cached = await supabase.getCachedContent(`/${city.toLowerCase()}`);
    if (cached) {
      console.log(`Using cached content for ${city}`);
      return cached;
    }

    console.log(`Generating new content for ${city}`);
    
    try {
      // Try to get content from the edge function
      const response = await fetch(`${supabaseUrl}/functions/v1/generate-city-content`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`
        },
        body: JSON.stringify({ city })
      });
      
      if (!response.ok) {
        throw new Error(`Failed to generate content: ${response.statusText}`);
      }
      
      const content = await response.json();
      
      // Cache the generated content
      await supabase.cacheContent(`/${city.toLowerCase()}`, content);
      
      return content;
    } catch (err) {
      console.error('Error generating content with edge function:', err);
      
      // Service image mapping for fallback content
      const serviceImages = {
        "Residential Fencing": "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/6d4752ad-e781-4bec-92ec-b07a9dc74a07/Board+on+Board+with+Trim+and+Cap.jpg",
        "Commercial Fencing": "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/4d9c257b-d4c7-4206-8aa5-22623aa2f863/301399581_23852070435550391_1586117276639848672_n.jpg",
        "Sports Courts": "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/1709258995381-OZJ85PI1IF9KHG170S1W/GettyImages-145988391.jpg",
        "Access Control": "/lovable-uploads/223b3ff5-7edb-4b9f-8993-449414f2518b.png",
        "Automatic Gates": "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/7426f5b7-ded7-4a47-bc45-c4cb46fec966/star+gate.jpg"
      };
      
      // Fallback content
      const fallbackContent: CityContent = {
        metaTitle: `Fence Services in ${city}`,
        metaDescription: `Professional fence installation services in ${city}, Texas. Get a free quote today!`,
        h1: `Quality Fence Installation in ${city}`,
        intro: `We provide expert fence installation services in ${city}, Texas, meeting all your residential and commercial fencing needs with quality craftsmanship and materials.`,
        serviceSections: {
          "Residential Fencing": `Our residential fencing solutions in ${city} include wood, vinyl, and ornamental options, perfect for enhancing your home's security and curb appeal.`,
          "Commercial Fencing": `Trust our team for durable commercial fencing in ${city}, designed to secure your business property while maintaining a professional appearance.`,
          "Sports Courts": `We specialize in sports court fencing in ${city}, providing safe and attractive enclosures for tennis, basketball, and other recreational areas.`,
          "Access Control": `Enhance your property security in ${city} with our access control solutions, including keypads, card readers, and remote access systems.`,
          "Automatic Gates": `Our automatic gate installations in ${city} offer convenience and security, with custom designs to match your property's style.`
        },
        benefits: [
          `Free, no-obligation quotes for all ${city} customers`,
          `Expert craftsmanship and attention to detail`,
          `Premium materials selected for ${city}'s specific climate conditions`,
          `Fully licensed, insured, and experienced installation teams`,
          `Comprehensive warranties on all fence installations`
        ],
        faq: `Our fences in ${city} are built to withstand local weather conditions and typically last 15-20 years with proper maintenance. We handle permits and usually complete residential projects within 2-3 days.`,
        cta: `Ready for your new fence in ${city}? Contact us today for a free, no-obligation quote. Our team is ready to help you enhance your property's security and appearance.`,
        keywords: [
          `fence installation ${city}`,
          `fence companies ${city}`,
          `residential fencing ${city}`,
          `commercial fence contractors ${city}`,
          `wooden fence installation ${city}`,
          `automatic gate installation ${city}`,
          `fence repair ${city}`,
          `privacy fence ${city}`,
          `security fencing ${city}`,
          `fence builders near me ${city}`
        ],
        images: [
          { src: serviceImages["Residential Fencing"], alt: `Residential wood fence installation in ${city}, Texas` },
          { src: serviceImages["Commercial Fencing"], alt: `Commercial security fencing for ${city} businesses` },
          { src: serviceImages["Automatic Gates"], alt: `Custom automatic gate installation in ${city}, Texas` }
        ]
      };
      
      // Cache the fallback content
      await supabase.cacheContent(`/${city.toLowerCase()}`, fallbackContent);
      
      return fallbackContent;
    }
  } catch (error) {
    console.error('Error in generateCityContent:', error);
    
    // Return very basic content if all else fails
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
      images: [
        { src: "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/6d4752ad-e781-4bec-92ec-b07a9dc74a07/Board+on+Board+with+Trim+and+Cap.jpg", alt: `Residential fencing in ${city}` },
        { src: "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/4d9c257b-d4c7-4206-8aa5-22623aa2f863/301399581_23852070435550391_1586117276639848672_n.jpg", alt: `Commercial fencing in ${city}` }
      ]
    };
  }
}


import { createClient } from '@supabase/supabase-js';
import { Lead, CityContent, ContentCache } from './types';
import type { Database } from './types';
import { env } from '@/lib/env';

// Create Supabase client with validated environment variables
export const supabase = createClient<Database>(
  env.VITE_SUPABASE_URL,
  env.VITE_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    },
    global: {
      headers: {
        'x-application-name': 'fenceflow',
      },
    },
  }
);

// Error handling for Supabase
const handleSupabaseError = (error: Error) => {
  console.error('Supabase Error:', error);
  // You can add error reporting service here
  return error;
};

class Supabase {
  async submitLead(lead: Lead): Promise<{ success: boolean; error?: string }> {
    try {
      console.log('Attempting to submit lead to Supabase:', lead);
      
      // Validate lead data before submission
      if (!lead.name || !lead.email || !lead.phone) {
        throw new Error('Missing required fields');
      }

      const { error } = await supabase
        .from('leads')
        .insert(lead);
      
      if (error) {
        console.error('Supabase insert error:', error);
        throw error;
      }
      
      console.log('Lead submitted successfully:', lead);
      return { success: true };
    } catch (err) {
      console.error('Error submitting lead to Supabase:', err);
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Unknown error occurred' 
      };
    }
  }

  async getCachedContent(cityUrl: string): Promise<CityContent | null> {
    try {
      const { data, error } = await supabase
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
      const { error } = await supabase
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

export const supabaseInstance = new Supabase();

// Service image mapping for content generation
export const SERVICE_IMAGES = {
  "Residential Fencing": "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/6d4752ad-e781-4bec-92ec-b07a9dc74a07/Board+on+Board+with+Trim+and+Cap.jpg",
  "Commercial Fencing": "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/4d9c257b-d4c7-4206-8aa5-22623aa2f863/301399581_23852070435550391_1586117276639848672_n.jpg",
  "Athletic Courts and Sports Facilities": "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/1709258995381-OZJ85PI1IF9KHG170S1W/GettyImages-145988391.jpg",
  "Access Control": "/lovable-uploads/223b3ff5-7edb-4b9f-8993-449414f2518b.png",
  "Automatic Gates": "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/7426f5b7-ded7-4a47-bc45-c4cb46fec966/star+gate.jpg"
};

// OpenAI integration for content generation
export const generateCityContent = async (city: string): Promise<CityContent> => {
  try {
    // Check if we have content in the cache first
    const cachedContent = await supabaseInstance.getCachedContent(`/${city.toLowerCase()}`);
    if (cachedContent) {
      console.log(`Using cached content for ${city}`);
      return cachedContent;
    }

    console.log(`Generating new content for ${city}`);
    
    // If no cached content, use OpenAI to generate (future implementation)
    // For now, return static content with the city name
    const content: CityContent = {
      metaTitle: `Fence Companies in ${city}`,
      metaDescription: `We are ${city}'s premier fence company, trusted for residential & commercial projects of all sizes (we did Brock ISDs new stadium fencing 😊). From backyards to stadiums, we got you.`,
      h1: `Quality Fence Installation Services in ${city}`,
      intro: `We're excited to elevate ${city} with beautiful fences! From cozy residential privacy to strong commercial security and sleek automated gates, our team delivers quality across the metroplex. Transform your space with a fence you'll love!`,
      serviceSections: {
        "Residential Fencing": `For homeowners in ${city}, we offer premium residential fencing solutions that enhance property value and security. Our wood fences provide classic Texas charm with guaranteed durability against ${city}'s weather patterns. We also specialize in decorative pool fences that meet all local safety codes while complementing your outdoor aesthetic. As ${city}'s most trusted fence installers, we focus on quality materials and expert craftsmanship.`,
        "Commercial Fencing": `Business owners throughout ${city} trust our commercial fencing solutions for security, durability, and professional appearance. Our iron fences provide elegant security for office buildings, while our heavy-duty installations protect industrial properties and warehouses. As the leading commercial fence company in ${city}, we understand local business needs and zoning requirements, delivering custom solutions with premium materials and professional installation.`,
        "Athletic Courts and Sports Facilities": `Looking for professional athletic courts and sports facilities in ${city}? We're the leading contractor serving ${city} and surrounding areas. Our expert team specializes in building regulation courts and facilities for residential properties, community centers, and commercial facilities throughout ${city}. Whether you need a new pickleball court installed or are looking to upgrade existing facilities, we provide end-to-end services including site preparation, concrete work, surfacing, line marking, net post installation, and perimeter fencing. As ${city}'s trusted tennis court installer, we create premium tennis facilities built to professional standards, featuring proper drainage systems, high-quality surfacing options, and premium court accessories.`,
        "Access Control": `Upgrade your ${city} property with our custom gate installation services. From elegant entrance gates for residential estates to secure access points for commercial properties, our gate installation team in ${city} delivers outstanding craftsmanship. We specialize in custom gates near you, tailored to your property's specific style and security requirements, with options ranging from classic wood to contemporary metal designs.`,
        "Automatic Gates": `Experience ultimate convenience with our automatic gates, perfectly designed for ${city} properties. Our automated gate systems combine security with ease of access, featuring remote controls, keypads, and smartphone integration options. As the preferred automated gate company in ${city}, we handle everything from design to installation, ensuring smooth operation and reliable performance.`
      },
      benefits: [
        `Free, no-obligation quotes for all ${city} customers`,
        `Expert craftsmanship and attention to detail`,
        `Premium materials selected for ${city}'s specific climate conditions`,
        `Fully licensed, insured, and experienced installation teams`,
        `Comprehensive warranties on all fence installations`
      ],
      faq: `Quality fences in ${city} provide enhanced security, privacy, and significant property value increase. With our climate-specific materials and professional installation techniques, our fences deliver lasting performance while complementing ${city}'s architectural styles, making it an excellent investment for any property.`,
      cta: `Ready for your new fence in ${city}? Complete our quick form for a free, no-obligation quote from the best fence company in ${city}. Our specialists will contact you within 24 hours to discuss your project needs and arrange a convenient consultation.`,
      keywords: [
        `fence companies ${city}`,
        `fence installation ${city}`,
        `fence installers ${city}`,
        `residential fencing ${city}`,
        `commercial fence company ${city}`,
        `custom wood fences ${city}`,
        `automatic gate installation ${city}`,
        `pickleball court installer ${city}`,
        `tennis court installation ${city}`,
        `athletic courts and sports facilities ${city}`,
        `pickleball court fencing ${city}`,
        `tennis court fence installation ${city}`,
        `athletic court builder ${city}`,
        `iron fence contractors ${city}`,
        `pool fence installation ${city}`,
        `athletic court fencing ${city}`
      ],
      images: [
        { src: SERVICE_IMAGES["Residential Fencing"], alt: `Residential wood fence installation in ${city}, Texas` },
        { src: SERVICE_IMAGES["Commercial Fencing"], alt: `Commercial security fencing for ${city} businesses` },
        { src: SERVICE_IMAGES["Automatic Gates"], alt: `Custom automatic gate installation in ${city}, Texas` },
        { src: SERVICE_IMAGES["Athletic Courts and Sports Facilities"], alt: `Athletic court fencing in ${city}` }
      ]
    };
    
    // Cache the generated content
    await supabaseInstance.cacheContent(`/${city.toLowerCase()}`, content);
    
    return content;
  } catch (error) {
    console.error('Error generating content:', error);
    // Return basic content if generation fails
    return {
      metaTitle: `Fence Services in ${city}`,
      metaDescription: `We are ${city}'s premier fence company, trusted for residential & commercial projects of all sizes (we did Brock ISDs new stadium fencing 😊). From backyards to stadiums, we got you.`,
      h1: `Fence Services in ${city}`,
      intro: `Quality fence installation in ${city}.`,
      serviceSections: {
        "Residential Fencing": `Residential fencing in ${city}`,
        "Commercial Fencing": `Commercial fencing in ${city}`,
        "Athletic Courts and Sports Facilities": `Athletic courts and sports facilities in ${city}`,
        "Access Control": `Access control solutions in ${city}`,
        "Automatic Gates": `Automatic gates in ${city}`
      },
      benefits: [`Quality service in ${city}`],
      faq: `Frequently asked questions about fencing in ${city}`,
      cta: `Contact us for fencing in ${city}`,
      keywords: [`fencing ${city}`],
      images: [
        { src: SERVICE_IMAGES["Residential Fencing"], alt: `Residential fencing in ${city}` },
        { src: SERVICE_IMAGES["Commercial Fencing"], alt: `Commercial fencing in ${city}` },
        { src: SERVICE_IMAGES["Automatic Gates"], alt: `Automatic gates in ${city}` },
        { src: SERVICE_IMAGES["Athletic Courts and Sports Facilities"], alt: `Athletic court fencing in ${city}` }
      ]
    };
  }
};

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

// Cities array - copied from src/lib/cities.ts
const cities = ["Dallas", "Fort Worth", "Arlington", "Plano", "Garland", "Irving", "Frisco", "McKinney", "Grand Prairie", "Denton", "Mesquite", "Carrollton", "Richardson", "Lewisville", "Allen", "Flower Mound", "North Richland Hills", "Mansfield", "Rowlett", "Bedford", "Euless", "Grapevine", "Cedar Hill", "Wylie", "Keller", "Coppell", "Hurst", "Duncanville", "The Colony", "Sherman", "Rockwall", "Burleson", "Little Elm", "Southlake", "Waxahachie", "Cleburne", "Farmers Branch", "Sachse", "Colleyville", "Midlothian", "Prosper", "Lancaster", "Haltom City", "DeSoto", "Watauga", "Anna", "Forney", "Celina", "Murphy", "Terrell", "Saginaw", "Benbrook", "Corinth", "Denison", "Crowley", "Lake Dallas", "Highland Village", "White Settlement", "Azle", "Forest Hill", "Trophy Club", "Greenville", "Royse City", "Melissa", "Princeton", "Ennis", "Fate", "Heath", "Roanoke", "Seagoville", "Sanger", "Fairview", "Granbury", "Aubrey", "Joshua", "Richland Hills", "Glenn Heights", "Gainesville"];

// Service types enum - copied from src/lib/types.ts
enum ServiceType {
  ResidentialFencing = "Residential Fencing",
  CommercialFencing = "Commercial Fencing",
  AthleticCourts = "Athletic Courts and Sports Facilities",
  AccessControl = "Access Control",
  AutomaticGates = "Automatic Gates"
}

const SERVICES = [
  ServiceType.ResidentialFencing,
  ServiceType.CommercialFencing,
  ServiceType.AthleticCourts,
  ServiceType.AccessControl,
  ServiceType.AutomaticGates
];

interface GenerationFailure {
  city: string;
  service: ServiceType;
  error: unknown;
}

async function generateContent(supabase: any, city: string, service: ServiceType): Promise<string> {
  const maxRetries = 3;
  let attempt = 0;
  
  while (attempt < maxRetries) {
    try {
      console.log(`Generating content for ${city} - ${service}... (Attempt ${attempt + 1}/${maxRetries})`);
      
      const { data, error } = await supabase.functions.invoke('generate-content', {
        body: { city, service }
      });

      if (error) throw error;
      return data.content;
      
    } catch (error) {
      attempt++;
      if (attempt === maxRetries) {
        console.error(`Error generating content for ${city} - ${service} after ${maxRetries} attempts:`, error);
        throw error;
      }
      console.log(`Attempt ${attempt} failed, retrying in 5 seconds...`);
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
  throw new Error('Unexpected error');
}

async function cacheContent(supabase: any, city: string, service: ServiceType, content: string) {
  try {
    const cacheKey = service !== ServiceType.ResidentialFencing 
      ? `${city.toLowerCase()}-${String(service).toLowerCase().replace(/\s+/g, '-')}-dynamic`
      : `${city.toLowerCase()}-dynamic`;

    const { error } = await supabase.rpc('cache_content', {
      p_cache_key: cacheKey,
      p_cache_content: content,
      p_expire_days: 365
    });

    if (error) throw error;
    console.log(`Successfully cached content for ${city} - ${service}`);
    
  } catch (error) {
    console.error(`Error caching content for ${city} - ${service}:`, error);
    throw error;
  }
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const failures: GenerationFailure[] = [];
    let totalGenerated = 0;

    // Process all cities and services
    for (const city of cities) {
      for (const service of SERVICES) {
        try {
          const content = await generateContent(supabaseClient, city, service);
          await cacheContent(supabaseClient, city, service, content);
          totalGenerated++;
          
          // Add a small delay to avoid rate limits
          await new Promise(resolve => setTimeout(resolve, 2000));
          
        } catch (error) {
          failures.push({ city, service, error });
          console.error(`Failed to generate/cache content for ${city} - ${service}`);
        }
      }
    }

    // Generate summary
    const summary = {
      timestamp: new Date().toISOString(),
      totalCities: cities.length,
      totalServices: SERVICES.length,
      successfullyGenerated: totalGenerated,
      failedCount: failures.length,
      failures: failures.map(f => ({
        city: f.city,
        service: f.service,
        error: String(f.error)
      }))
    };

    // Store the summary in Supabase
    const { error: summaryError } = await supabaseClient
      .from('content_generation_logs')
      .insert([summary]);

    if (summaryError) {
      console.error('Error storing summary:', summaryError);
    }

    return new Response(
      JSON.stringify(summary),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        },
        status: failures.length > 0 ? 500 : 200
      }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        },
        status: 500
      }
    )
  }
}) 
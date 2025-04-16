import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { ServiceType } from '../src/lib/types';

// Load environment variables
config();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function generateContent(city: string, service: ServiceType): Promise<string> {
  const maxRetries = 3;
  let attempt = 0;
  
  while (attempt < maxRetries) {
    try {
      console.log(`Generating content for ${city} - ${service}... (Attempt ${attempt + 1}/${maxRetries})`);
      
      const { data, error } = await supabase.functions.invoke('generate-city-content', {
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

async function cacheContent(city: string, service: ServiceType, content: string) {
  try {
    const cacheKey = service !== ServiceType.ResidentialFencing 
      ? `${city.toLowerCase()}-${String(service).toLowerCase().replace(/\s+/g, '-')}-dynamic`
      : `${city.toLowerCase()}-dynamic`;

    const { error } = await supabase
      .from('content_cache')
      .upsert({
        cache_key: cacheKey,
        content: content,
        expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 365 days from now
      }, {
        onConflict: 'cache_key'
      });

    if (error) throw error;
    console.log(`Successfully cached content for ${city} - ${service}`);
    
  } catch (error) {
    console.error(`Error caching content for ${city} - ${service}:`, error);
    throw error;
  }
}

async function main() {
  // Failed items to regenerate
  const failedItems = [
    { city: 'Ponder', service: ServiceType.CommercialFencing }
  ];

  console.log('Starting regeneration for failed items...');
  
  for (const item of failedItems) {
    try {
      console.log(`\nRegenerating content for ${item.city} - ${item.service}...`);
      const content = await generateContent(item.city, item.service);
      await cacheContent(item.city, item.service, content);
      console.log(`✓ Successfully regenerated content for ${item.city} - ${item.service}`);
    } catch (error) {
      console.error(`Failed to regenerate content for ${item.city} - ${item.service}:`, error);
      process.exit(1);
    }
  }

  console.log('\nRegeneration completed successfully!');
}

main().catch(console.error); 
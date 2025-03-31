import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { cities } from '../src/lib/cities';
import { ServiceType } from '../src/lib/types';
import * as fs from 'fs';
import * as path from 'path';

// Load environment variables
config();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Services we generate content for
const SERVICES = [
  ServiceType.ResidentialFencing,
  ServiceType.CommercialFencing,
  ServiceType.AthleticCourts,
  ServiceType.AccessControl,
  ServiceType.AutomaticGates
];

async function generateContent(city: string, service: ServiceType): Promise<string> {
  try {
    console.log(`Generating content for ${city} - ${service}...`);
    
    const { data, error } = await supabase.functions.invoke('generate-content', {
      body: { city, service }
    });

    if (error) throw error;
    return data.content;
    
  } catch (error) {
    console.error(`Error generating content for ${city} - ${service}:`, error);
    throw error;
  }
}

async function cacheContent(city: string, service: ServiceType, content: string) {
  try {
    const cacheKey = service !== ServiceType.ResidentialFencing 
      ? `${city.toLowerCase()}-${String(service).toLowerCase().replace(/\s+/g, '-')}-dynamic`
      : `${city.toLowerCase()}-dynamic`;

    const { error } = await supabase.rpc('cache_content', {
      cache_key: cacheKey,
      cache_content: content,
      expire_days: 365
    });

    if (error) throw error;
    console.log(`Successfully cached content for ${city} - ${service}`);
    
  } catch (error) {
    console.error(`Error caching content for ${city} - ${service}:`, error);
    throw error;
  }
}

async function main() {
  // Create logs directory if it doesn't exist
  const logsDir = path.join(process.cwd(), 'logs');
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
  }

  const logFile = path.join(logsDir, `content-generation-${new Date().toISOString().split('T')[0]}.log`);
  const successLog = fs.createWriteStream(logFile);

  console.log('Starting annual content generation...');
  let totalGenerated = 0;
  let failures = [];

  for (const city of cities) {
    for (const service of SERVICES) {
      try {
        const content = await generateContent(city, service);
        await cacheContent(city, service, content);
        
        successLog.write(`✓ ${city} - ${service}\n`);
        totalGenerated++;
        
        // Add a small delay to avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (error) {
        failures.push({ city, service, error });
        console.error(`Failed to generate/cache content for ${city} - ${service}`);
      }
    }
  }

  // Write summary
  const summary = `
Generation Summary (${new Date().toISOString()})
----------------------------------------------
Total Cities: ${cities.length}
Total Services: ${SERVICES.length}
Successfully Generated: ${totalGenerated}
Failed: ${failures.length}

Failed Items:
${failures.map(f => `- ${f.city} - ${f.service}: ${f.error}`).join('\n')}
`;

  fs.writeFileSync(path.join(logsDir, 'latest-generation-summary.txt'), summary);
  console.log(summary);

  if (failures.length > 0) {
    process.exit(1);
  }
}

main().catch(console.error); 
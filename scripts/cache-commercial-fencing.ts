
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { ServiceType } from '../src/lib/types';

// Load environment variables
config();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// The service we specifically want to cache
const SERVICE = ServiceType.CommercialFencing;

async function generateAndCacheCommercialContent() {
  try {
    console.log(`Generating and caching content for ${SERVICE}...`);
    
    // Call the edge function to generate content
    const { data, error } = await supabase.functions.invoke('generate-city-content', {
      body: {
        cityName: "DFW",
        serviceName: SERVICE,
        prompt: `You are an elite-level professional content writer specializing in fence installation. Create rich, SEO-optimized content for DFW, Texas focusing on ${SERVICE} that positions Fences Texas as the premier local connection to top fence contractors.

CRITICAL REQUIREMENTS:
1. ALWAYS use "Fences Texas" as the company name
2. NEVER include any CTAs, contact information, or form references
3. NEVER include internal notes about SEO or content strategy
4. NEVER mention being a contractor - we connect homeowners with contractors
5. Use the exact markdown structure provided below
6. STOP after the "Quality Installation" section - do not add any additional sections

FORMAT YOUR RESPONSE WITH THIS EXACT STRUCTURE AND MARKDOWN:

# ${SERVICE} Services in DFW, Texas

When it comes to enhancing the security and aesthetics of commercial properties in **DFW, Texas**, Fences Texas stands out as your #1 connection to quality ${SERVICE.toLowerCase()} contractors. With 15+ years of experience connecting businesses with trusted professionals and a deep understanding of DFW's unique commercial needs, we ensure you get the perfect fence that meets your specifications while addressing local conditions and regulations.

## Why Choose Fences Texas for ${SERVICE}?

### Local Expertise
[Write a paragraph about local knowledge, mentioning specific neighborhoods, commercial districts, or landmarks]

### Tailored Solutions for Commercial Properties
[Write about commercial property needs, security requirements, and specific challenges]

#### Materials Our Contractors Specialize In
- **[Material 1]**: [Brief description of benefits]
- **[Material 2]**: [Brief description of benefits]
- **[Material 3]**: [Brief description of benefits]

## The Benefits of Professional ${SERVICE}

### Enhanced Security and Property Protection
[Write about security and protection benefits]

### Improved Commercial Image
[Write about property value and image benefits]

### Customization Options
[Write about customization possibilities for businesses]

## Our Comprehensive Process

### 1. Initial Consultation
[Describe the consultation process]

### 2. Expert Contractor Matching
[Explain how we match with the right contractor]

### 3. Quality Installation
[Describe the installation process]`
      }
    });

    if (error) {
      console.error("Error generating content:", error);
      return;
    }

    if (!data?.content) {
      console.error("No content received from function");
      return;
    }

    console.log("Content generated successfully!");

    // Cache the content with long expiration
    const cacheKey = `dfw-commercial-fencing-dynamic`;
    const { error: cachingError } = await supabase.rpc('cache_content', {
      p_cache_key: cacheKey,
      p_cache_content: data.content,
      p_expire_days: 365 // Cache for a year
    });

    if (cachingError) {
      console.error("Error caching content:", cachingError);
      return;
    }

    console.log(`Successfully cached commercial fencing content with key: ${cacheKey}`);
    console.log("Content will now load instantly when users visit the commercial fencing page");
    
  } catch (error) {
    console.error("Error in cache generation process:", error);
  }
}

// Run the function
generateAndCacheCommercialContent();

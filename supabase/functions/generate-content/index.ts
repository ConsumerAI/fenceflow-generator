import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function getServicePrompt(serviceName: string): string {
  const basePrompt = `You are an elite-level professional content writer specializing in fence installation and athletic court construction with 15+ years of industry experience. Create rich, SEO-optimized content for {city}, Texas focusing on {service_type} that positions our company as the premier local expert.

Your content must:

1. DEMONSTRATE DEEP LOCAL KNOWLEDGE:
   - Reference specific {city} neighborhoods, developments, or landmarks
   - Address unique local conditions (weather patterns, soil types, architectural styles)
   - Mention any relevant local regulations, HOA requirements, or permitting considerations

2. SHOWCASE TECHNICAL EXPERTISE FOR {service_type}:
   - Explain specialized construction techniques specific to {service_type} in {city}
   - Detail material selection considerations unique to this service and location
   - Describe our proprietary installation methods that ensure superior results

3. INCORPORATE CUSTOMER PSYCHOLOGY:
   - Address the specific pain points {city} residents face regarding {service_type}
   - Frame solutions in terms of tangible lifestyle benefits, not just features
   - Use persuasive language that resonates with local property owners' values

4. ESTABLISH CLEAR DIFFERENTIATION:
   - Contrast our premium approach with competitors' standard practices
   - Emphasize our specialized knowledge of {city}'s unique conditions
   - Highlight our proven track record with {service_type} in this specific area

5. OPTIMIZE FOR LOCAL SEO:
   - Naturally integrate "{city} {service_type}" and related long-tail keywords
   - Format content with proper H2/H3 headings, brief paragraphs, and bullet points
   - Include specific calls-to-action relevant to local customers

6. PROVIDE ACTIONABLE INFORMATION:
   - Include specific maintenance advice for {service_type} in {city}'s climate
   - Offer transparent insights into project timelines and processes
   - Give readers genuine value even if they don't convert immediately

Write in a professional yet conversational tone that builds trust while establishing authority. Avoid generic platitudes - every sentence should deliver specific, valuable information that demonstrates our unique expertise in {service_type} for {city} properties.`;

  const prompts = {
    'Residential Fencing': basePrompt.replace(/{service_type}/g, 'residential fencing'),
    'Commercial Fencing': basePrompt.replace(/{service_type}/g, 'commercial fencing'),
    'Athletic Courts and Sports Facilities': basePrompt.replace(/{service_type}/g, 'athletic courts and sports facilities'),
    'Access Control': basePrompt.replace(/{service_type}/g, 'access control systems'),
    'Automatic Gates': basePrompt.replace(/{service_type}/g, 'automatic gates')
  };

  return prompts[serviceName] || basePrompt.replace(/{service_type}/g, serviceName);
}

// Initialize OpenAI API
const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // Parse request body
    const { city, service } = await req.json();
    console.log(`Generating content for ${city} and service ${service}`);
    
    // Prepare the OpenAI API request
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { 
            role: 'system', 
            content: getServicePrompt(service)
          },
          { 
            role: 'user', 
            content: `Write a detailed, SEO-optimized page about ${service} services in ${city}, Texas. Include information about the benefits, process, and why customers should choose our company.` 
          }
        ],
        temperature: 0.7,
        max_tokens: 2500,
      }),
    });

    // Check for successful response
    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    // Parse and return the generated content
    const data = await response.json();
    const generatedContent = data.choices[0].message.content;
    
    return new Response(
      JSON.stringify({ content: generatedContent }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Error in generate-content function:', error);
    
    return new Response(
      JSON.stringify({ error: error.message || 'An unexpected error occurred' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

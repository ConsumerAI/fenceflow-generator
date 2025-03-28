import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function getServicePrompt(serviceName: string): string {
  const prompts = {
    'Athletic Courts and Sports Facilities': 
      'You are a professional content writer specializing in athletic court and sports facility construction. Create SEO-optimized, engaging content that highlights the benefits of professional court installation, focusing on quality, safety, and performance. Include details about construction processes, materials, and local considerations.',
    'Chain Link Fences':
      'You are a professional content writer specializing in chain link fence installation. Create SEO-optimized content that highlights the durability, security, and cost-effectiveness of chain link fencing. Focus on commercial applications, property security, and the benefits of professional installation.',
    'Wood Fences':
      'You are a professional content writer specializing in wood fence installation. Create SEO-optimized content that emphasizes the natural beauty, privacy, and property value benefits of wood fencing. Include details about wood types, maintenance requirements, and aesthetic customization options.',
    'Vinyl Fences':
      'You are a professional content writer specializing in vinyl fence installation. Create SEO-optimized content that showcases the low-maintenance benefits, durability, and modern aesthetics of vinyl fencing. Highlight the long-term cost benefits and variety of styles available.',
    'Ornamental Iron Fences':
      'You are a professional content writer specializing in ornamental iron fence installation. Create SEO-optimized content that emphasizes the elegant aesthetics, security features, and lasting durability of iron fencing. Focus on custom design options and architectural enhancement.',
    'Commercial Fencing':
      'You are a professional content writer specializing in commercial fence installation. Create SEO-optimized content that addresses business security needs, property demarcation, and professional appearance. Include details about compliance, durability, and return on investment.',
    'Farm and Ranch Fencing':
      'You are a professional content writer specializing in farm and ranch fence installation. Create SEO-optimized content that focuses on livestock containment, property security, and agricultural applications. Include details about durability, maintenance, and specific agricultural requirements.',
    'Automatic Gates':
      'You are a professional content writer specializing in automatic gate installation. Create SEO-optimized content that highlights convenience, security features, and property value enhancement. Include details about access control options, maintenance requirements, and integration capabilities.'
  };

  return prompts[serviceName] || 'You are a professional content writer for a fence company website. Create SEO-optimized, engaging content that highlights the benefits of the requested service in the specified city. Focus on local relevance, customer pain points, and the high quality of service.';
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
    const { prompt, cityName, serviceName } = await req.json();
    console.log(`Generating content for ${cityName} and service ${serviceName}`);
    
    // Prepare the OpenAI API request
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: getServicePrompt(serviceName)
          },
          { 
            role: 'user', 
            content: prompt || `Write a detailed, SEO-optimized page about ${serviceName} services in ${cityName}, Texas. Include information about the benefits, process, and why customers should choose our company.` 
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

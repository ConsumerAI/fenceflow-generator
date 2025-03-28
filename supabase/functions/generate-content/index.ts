import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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
            content: serviceName === 'Athletic Courts and Sports Facilities' 
              ? 'You are a professional content writer specializing in athletic court and sports facility construction. Create SEO-optimized, engaging content that highlights the benefits of professional court installation, focusing on quality, safety, and performance. Include details about construction processes, materials, and local considerations.'
              : 'You are a professional content writer for a fence company website. Create SEO-optimized, engaging content that highlights the benefits of the requested fencing service in the specified city. Focus on local relevance, customer pain points, and the high quality of service.'
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


import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // Parse request body
    const { cityName, serviceName, prompt } = await req.json();
    console.log(`Generating content for ${cityName} and ${serviceName}`);
    
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
            content: `You are an expert fence and athletic court construction writer with 15+ years of industry experience. Create rich, SEO-optimized content focusing on ${serviceName} in ${cityName}, Texas. Include local knowledge, technical expertise, and relevant details for this location.`
          },
          { 
            role: 'user', 
            content: prompt || `Write an informative, engaging, and detailed section about ${serviceName} in ${cityName}, Texas. Include specific information about ${cityName}'s local conditions (climate, regulations, popular styles) and how they influence fencing projects. Format with H2/H3 headings and use HTML formatting for emphasis.` 
          }
        ],
        temperature: 0.7,
        max_tokens: 1500,
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
    console.error('Error in generate-city-content function:', error);
    
    return new Response(
      JSON.stringify({ error: error.message || 'An unexpected error occurred' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

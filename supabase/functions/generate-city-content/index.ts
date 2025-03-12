
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { CreateCompletionRequest } from "https://esm.sh/openai@3.2.1"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface CityContentRequest {
  city: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not set')
    }

    const { city } = await req.json() as CityContentRequest
    if (!city) {
      return new Response(
        JSON.stringify({ error: 'City parameter is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    console.log(`Generating content for city: ${city}`)

    // Service image mapping for content generation
    const serviceImages = {
      "Residential Fencing": "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/6d4752ad-e781-4bec-92ec-b07a9dc74a07/Board+on+Board+with+Trim+and+Cap.jpg",
      "Commercial Fencing": "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/4d9c257b-d4c7-4206-8aa5-22623aa2f863/301399581_23852070435550391_1586117276639848672_n.jpg",
      "Sports Courts": "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/1709258995381-OZJ85PI1IF9KHG170S1W/GettyImages-145988391.jpg",
      "Access Control": "/lovable-uploads/223b3ff5-7edb-4b9f-8993-449414f2518b.png",
      "Automatic Gates": "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/7426f5b7-ded7-4a47-bc45-c4cb46fec966/star+gate.jpg"
    };

    const prompt = `
      Create detailed, SEO-optimized content for a fence installation company website for the city of ${city}, Texas. Include:
      
      1. A compelling headline (h1) for the city page
      2. An introduction paragraph about fence installation services in ${city}
      3. Five distinct benefits of getting a fence installed in ${city} by this company
      4. Detailed descriptions for these services:
         - Residential Fencing
         - Commercial Fencing
         - Sports Courts
         - Access Control
         - Automatic Gates
         All descriptions should be tailored to ${city}
      5. A FAQ section about fencing in ${city}
      6. A call-to-action paragraph
      7. 10 SEO keywords related to fence installation in ${city}
      
      Format the response as a valid JSON object with these fields: 
      metaTitle, metaDescription, h1, intro, benefits (array), serviceSections (object with 5 entries), faq, cta, keywords (array).
      
      Make content unique to ${city} by mentioning local landmarks, neighborhoods, weather conditions, and architectural styles where appropriate.
    `

    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt,
        max_tokens: 1500,
        temperature: 0.7,
      } as CreateCompletionRequest),
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(`OpenAI API error: ${data.error?.message || 'Unknown error'}`)
    }

    try {
      // Parse the JSON content from the response
      const generatedText = data.choices[0]?.text || ''
      const contentObject = JSON.parse(generatedText)
      
      // Add specific images instead of placeholders
      contentObject.images = [
        { src: serviceImages["Residential Fencing"], alt: `Residential wood fence installation in ${city}, Texas` },
        { src: serviceImages["Commercial Fencing"], alt: `Commercial security fencing for ${city} businesses` },
        { src: serviceImages["Automatic Gates"], alt: `Custom automatic gate installation in ${city}, Texas` }
      ]
      
      // Cache the content in Supabase
      const { data: supabaseData, error: supabaseError } = await fetch(`${Deno.env.get('SUPABASE_URL')}/rest/v1/content_cache`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '',
          'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`
        },
        body: JSON.stringify({
          page_url: `/${city.toLowerCase()}`,
          content: contentObject,
          expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
        })
      }).then(res => res.json())
      
      if (supabaseError) {
        console.error('Error caching content:', supabaseError)
      }
      
      return new Response(
        JSON.stringify(contentObject),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    } catch (error) {
      console.error('Error parsing content:', error)
      throw new Error('Failed to parse generated content')
    }
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message || 'An error occurred during content generation' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})

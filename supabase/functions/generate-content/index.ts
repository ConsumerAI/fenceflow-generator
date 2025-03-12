
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Configuration, OpenAIApi } from "https://esm.sh/openai@3.2.1"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

    const { city } = await req.json()
    if (!city) {
      return new Response(
        JSON.stringify({ error: 'City parameter is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    console.log(`Generating content for city: ${city}`)

    const configuration = new Configuration({ apiKey: OPENAI_API_KEY })
    const openai = new OpenAIApi(configuration)

    const prompt = `
    Create detailed, SEO-optimized content for a fence installation company website for the city of ${city}, Texas. Include:
    
    1. A compelling headline (h1) for the city page
    2. An introduction paragraph about fence installation services in ${city}
    3. Five distinct benefits of getting a fence installed in ${city} by this company
    4. Detailed descriptions for these services: Residential Fencing, Commercial Fencing, Sports Courts, Access Control, Automatic Gates - each tailored to ${city}
    5. A FAQ section about fencing in ${city}
    6. A call-to-action paragraph
    7. 10 SEO keywords related to fence installation in ${city}
    
    Format the response as a valid JSON object with these fields: 
    metaTitle, metaDescription, h1, intro, benefits (array), serviceSections (object with 5 entries), faq, cta, keywords (array).
    
    Make content unique to ${city} by mentioning local landmarks, neighborhoods, weather conditions, and architectural styles where appropriate.
    The company only does new installations, not repairs.
    `

    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are an expert content writer for construction companies specializing in SEO." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 2500,
    })

    const content = completion.data.choices[0]?.message?.content
    if (!content) {
      throw new Error('Failed to generate content')
    }

    try {
      // Parse the JSON content
      const contentObject = JSON.parse(content)
      
      // Add placeholder images
      contentObject.images = [
        { src: "/placeholder.svg", alt: `Residential wood fence installation in ${city}, Texas` },
        { src: "/placeholder.svg", alt: `Commercial security fencing for ${city} businesses` },
        { src: "/placeholder.svg", alt: `Custom automatic gate installation in ${city}, Texas` }
      ]
      
      return new Response(
        JSON.stringify(contentObject),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    } catch (error) {
      console.error('Error parsing content:', error)
      console.log('Raw content:', content)
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

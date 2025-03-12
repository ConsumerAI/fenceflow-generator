
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
    4. Detailed descriptions for these services, with extra focus on Sports Courts section: 
       - Residential Fencing
       - Commercial Fencing
       - Sports Courts (heavily emphasize pickleball court installation and tennis court installation, using these exact terms multiple times)
       - Access Control
       - Automatic Gates
       All descriptions should be tailored to ${city}
    5. A FAQ section about fencing in ${city}
    6. A call-to-action paragraph
    7. 15 SEO keywords related to fence installation and sports courts in ${city}, including "pickleball court installer ${city}", "tennis court installation near me", and "pickleball court installation near me"
    
    Format the response as a valid JSON object with these fields: 
    metaTitle, metaDescription, h1, intro, benefits (array), serviceSections (object with 5 entries), faq, cta, keywords (array).
    
    Make content unique to ${city} by mentioning local landmarks, neighborhoods, weather conditions, and architectural styles where appropriate.
    The company only does new installations, not repairs.
    In the Sports Courts section, be sure to extensively use terms like "pickleball court installer", "tennis court installation", "pickleball court installation near me", and other relevant keywords.
    `

    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are an expert content writer for construction companies specializing in SEO, particularly for sports court installers." },
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
      
      // Add specific images instead of placeholders
      contentObject.images = [
        { src: "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/6d4752ad-e781-4bec-92ec-b07a9dc74a07/Board+on+Board+with+Trim+and+Cap.jpg", alt: `Residential wood fence installation in ${city}, Texas` },
        { src: "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/4d9c257b-d4c7-4206-8aa5-22623aa2f863/301399581_23852070435550391_1586117276639848672_n.jpg", alt: `Commercial security fencing for ${city} businesses` },
        { src: "/lovable-uploads/e375c1f0-53ad-4729-a527-958c7ccc73c8.png", alt: `Pickleball court installation in ${city}, Texas` },
        { src: "/lovable-uploads/ff181a35-3894-4eb0-82b4-f588c9c59ff1.png", alt: `Tennis court construction in ${city}, Texas` },
        { src: "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/7426f5b7-ded7-4a47-bc45-c4cb46fec966/star+gate.jpg", alt: `Custom automatic gate installation in ${city}, Texas` }
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

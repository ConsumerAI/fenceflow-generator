import { serve } from '@supabase/functions-js';
import { Configuration, OpenAIApi } from 'openai';

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
    7. 15 SEO keywords related to fence installation and sports courts in ${city}, including targeted sports court keywords like:
       "pickleball court installer ${city}", "tennis court installation near me", "pickleball court installation near me",
       "sports court fencing contractor ${city}", "pickleball court fencing ${city}", "tennis court fence installation ${city}",
       "sports field fencing near me", "basketball court fencing", "volleyball court fence", "chain link fence for tennis court", 
       "pickleball court fence specifications", "tennis court fencing company ${city}", "pickleball court fencing contractor"
    
    Format the response as a valid JSON object with these fields: 
    metaTitle, metaDescription, h1, intro, benefits (array), serviceSections (object with 5 entries), faq, cta, keywords (array).
    
    Make content unique to ${city} by mentioning local landmarks, neighborhoods, weather conditions, and architectural styles where appropriate.
    The company only does new installations, not repairs.
    
    For the Sports Courts section, include comprehensive information about:
    - Pickleball court installation, fencing, dimensions, safety barriers, windscreens, and chain link options
    - Tennis court installation, fencing heights, privacy screens, fence aesthetics, and maintenance
    - Basketball court fencing options and chain link installation
    - Baseball field fencing, outfield fence installation, safety netting, backstop fencing
    - Volleyball court fencing solutions
    - Football and soccer field perimeter fencing
    - Multi-court fencing systems
    - Various materials including galvanized chain link, vinyl-coated options, and aluminum fencing
    
    Use natural language that incorporates the keywords without obvious stuffing. The section should read fluidly while mentioning the various sports court fence types, materials, specifications, and installation processes.
    `

    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are an expert content writer for construction companies specializing in SEO, particularly for sports court installers and fence contractors." },
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
      
      // Add sports court specific content
      contentObject.sportsCourtsContent = {
        metaTitle: `Professional Sports Court Installation in ${city} | Tennis & Pickleball Courts`,
        metaDescription: `Top-rated sports court installers in ${city}, TX. Specializing in pickleball courts, tennis courts, basketball courts, and athletic field fencing. Free quotes!`,
        mainHeading: `Sports Court Installation & Fencing in ${city}, Texas`,
        intro: `Looking for professional sports court installation in ${city}? Our team specializes in designing and building high-quality athletic courts and sports field fencing throughout ${city} and surrounding areas. From pickleball court installation to tennis court fencing and baseball field safety solutions, we deliver premium results that enhance performance and safety.`,
        pickleball: {
          heading: `Professional Pickleball Court Installation in ${city}`,
          content: `As ${city}'s leading pickleball court installer, we create regulation-compliant courts featuring proper dimensions, premium surfacing, and durable pickleball court fencing. Our comprehensive pickleball court fence installation services include:

          • Professional site evaluation and preparation
          • Custom court design and layout
          • Premium surfacing materials and installation
          • Regulation net systems and equipment
          • Durable perimeter fencing with windscreens
          • Optional lighting and shade structures

          Whether you need a new pickleball court installed or are looking to upgrade existing facilities in ${city}, we provide end-to-end services including site preparation, concrete work, surfacing, line marking, net installation, and perimeter fencing.`
        },
        tennis: {
          heading: `Expert Tennis Court Fence Installation in ${city}`,
          content: `Our ${city} tennis court fence installation services include professional-grade chain link fences designed specifically for tennis facilities. We understand the importance of proper tennis court fencing heights, aesthetics, and durability. Our tennis court fencing company handles every aspect of the project, from design through installation. We also offer tennis court privacy screens, windscreens, and ongoing fence maintenance to keep your facility in top condition.`
        },
        baseball: {
          heading: `Baseball Field Fencing Solutions in ${city}`,
          content: `From backstop fencing to outfield fence installation, our team provides complete baseball field fencing services in ${city}. Our baseball field safety netting and protective barriers ensure spectator safety while our chain link fence for baseball fields offers durability and security. We handle all specifications including proper baseball field fence height requirements and custom designs to fit your facility's needs.`
        },
        basketball: {
          heading: `Basketball & Volleyball Court Fencing in ${city}`,
          content: `Enhance your ${city} recreational facilities with our basketball court fencing and volleyball court fence solutions. Our athletic field fencing provides security and ball containment while maintaining an open, welcoming atmosphere. We offer both chain link and privacy fencing options customized to your specific court layout and security requirements.`
        },
        otherSports: {
          heading: `Additional Sports Field Fencing Services`,
          content: `Beyond courts, we install stadium fence solutions, football field chain link fences, and soccer field perimeter fencing throughout ${city}. Our sports field boundary fencing adds security and definition to athletic facilities while our track field perimeter fences create professional-looking venues. We offer both permanent installations and temporary sports field fencing options to accommodate various event needs.`
        },
        materials: {
          heading: `Premium Sports Court Fence Materials`,
          content: `We utilize only the highest quality materials for sports field fence installation including galvanized chain link sports fences, vinyl-coated sports fencing, and aluminum fencing for sports fields. Our sports court fence materials are selected for durability, weather resistance, and aesthetic appeal, ensuring your ${city} facility looks professional while providing years of reliable service.`
        }
      }
      
      // Additional fence-specific keywords naturally integrated
      contentObject.additionalFenceSections = {
        pickleball: [
          "pickleball court fence dimensions",
          "pickleball court privacy fencing",
          "pickleball court safety barrier",
          "pickleball court fence installation",
          "pickleball court fencing materials",
          "pickleball court fence specifications"
        ],
        tennis: [
          "tennis court galvanized fencing",
          "tennis court fence aesthetics",
          "tennis court fence maintenance",
          "tennis court fencing solutions",
          "tennis court fence for privacy"
        ],
        other: [
          "sports court fence wind reduction",
          "athletic field fence aesthetics",
          "sports field fence height",
          "sports field fence for spectators",
          "sports court fence for security",
          "sports field fence company"
        ]
      }
      
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

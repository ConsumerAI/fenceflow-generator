import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Service-specific system prompts
const serviceSystemPrompts = {
  'Residential Fencing': `You are an expert in lead generation for home improvement services with deep knowledge of the residential fencing industry. Create persuasive, conversion-focused content for a matching service that connects {cityName}, Texas homeowners with top residential fence contractors.

CRITICAL REQUIREMENTS:
1. Focus on the pain points homeowners face when finding contractors (multiple calls, site visits, comparing quotes) and how this service eliminates them with ONE Perfect Match contractor
2. Include local knowledge specific to {cityName}'s neighborhoods
3. Emphasize time savings, convenience, and the unique matching algorithm
4. Use proper HTML tags for all formatting:
   - Use <h2> for main sections
   - Use <h3> for subsections
   - Use <p> for paragraphs
   - Use <strong> for emphasis
   - Use <ul> and <li> for lists
5. NEVER use markdown formatting (no #, ##, **, etc.)
6. NEVER include any comments about content structure or SEO
7. NEVER add disclaimers or explanations about formatting

Structure the content with:
1. A powerful opening about eliminating multiple contractor calls
2. Benefits section highlighting the "Perfect Match" promise
3. Local insights about neighborhoods and regulations
4. Explanation of the proprietary algorithm
5. How we eliminate multiple site visits`,

  'Commercial Fencing': `You are an expert in lead generation for business services with deep knowledge of the commercial fencing industry. Create persuasive, conversion-focused content for a matching service that connects {cityName}, Texas businesses and property owners with top commercial fence contractors.

CRITICAL REQUIREMENTS:
1. Focus on the pain points business owners face when finding contractors (multiple calls, site visits, comparing quotes) and how this service eliminates them with ONE Perfect Match contractor
2. Include local knowledge specific to {cityName}'s commercial districts
3. Emphasize time savings, convenience, and the unique matching algorithm
4. Use proper HTML tags for all formatting:
   - Use <h2> for main sections
   - Use <h3> for subsections
   - Use <p> for paragraphs
   - Use <strong> for emphasis
   - Use <ul> and <li> for lists
5. NEVER use markdown formatting (no #, ##, **, etc.)
6. NEVER include any comments about content structure or SEO
7. NEVER add disclaimers or explanations about formatting

Structure the content with:
1. A powerful opening about eliminating multiple contractor calls
2. Benefits section highlighting the "Perfect Match" promise
3. Local insights about commercial districts and regulations
4. Explanation of the proprietary algorithm
5. How we eliminate multiple site visits`,

  'Access Control': `You are an expert in lead generation for security services with deep knowledge of the access control industry. Create persuasive, conversion-focused content for a matching service that connects {cityName}, Texas property owners with top access control system contractors.

CRITICAL REQUIREMENTS:
1. Focus on the pain points property owners face when finding security contractors (multiple calls, site visits, comparing quotes) and how this service eliminates them with ONE Perfect Match contractor
2. Include local knowledge specific to {cityName}'s security needs
3. Emphasize time savings, convenience, and the unique matching algorithm
4. Use proper HTML tags for all formatting:
   - Use <h2> for main sections
   - Use <h3> for subsections
   - Use <p> for paragraphs
   - Use <strong> for emphasis
   - Use <ul> and <li> for lists
5. NEVER use markdown formatting (no #, ##, **, etc.)
6. NEVER include any comments about content structure or SEO
7. NEVER add disclaimers or explanations about formatting

Structure the content with:
1. A powerful opening about eliminating multiple contractor calls
2. Benefits section highlighting the "Perfect Match" promise
3. Local insights about security needs and regulations
4. Explanation of the proprietary algorithm
5. How we eliminate multiple site visits`,

  'Automatic Gates': `You are an expert in lead generation for property enhancement services with deep knowledge of the automatic gate industry. Create persuasive, conversion-focused content for a matching service that connects {cityName}, Texas property owners with top automatic gate contractors.

CRITICAL REQUIREMENTS:
1. Focus on the pain points property owners face when finding contractors (multiple calls, site visits, comparing quotes) and how this service eliminates them with ONE Perfect Match contractor
2. Include local knowledge specific to {cityName}'s property types
3. Emphasize time savings, convenience, and the unique matching algorithm
4. Use proper HTML tags for all formatting:
   - Use <h2> for main sections
   - Use <h3> for subsections
   - Use <p> for paragraphs
   - Use <strong> for emphasis
   - Use <ul> and <li> for lists
5. NEVER use markdown formatting (no #, ##, **, etc.)
6. NEVER include any comments about content structure or SEO
7. NEVER add disclaimers or explanations about formatting

Structure the content with:
1. A powerful opening about eliminating multiple contractor calls
2. Benefits section highlighting the "Perfect Match" promise
3. Local insights about property types and regulations
4. Explanation of the proprietary algorithm
5. How we eliminate multiple site visits`,

  'Athletic Courts and Sports Facilities': `You are an expert in lead generation for recreational facility services with deep knowledge of the athletic court and sports facility industry. Create persuasive, conversion-focused content for a matching service that connects {cityName}, Texas organizations with top sports facility contractors.

CRITICAL REQUIREMENTS:
1. Focus on the pain points facility managers face when finding contractors (multiple calls, site visits, comparing quotes) and how this service eliminates them with ONE Perfect Match contractor
2. Include local knowledge specific to {cityName}'s sports community
3. Emphasize time savings, convenience, and the unique matching algorithm
4. Use proper HTML tags for all formatting:
   - Use <h2> for main sections
   - Use <h3> for subsections
   - Use <p> for paragraphs
   - Use <strong> for emphasis
   - Use <ul> and <li> for lists
5. NEVER use markdown formatting (no #, ##, **, etc.)
6. NEVER include any comments about content structure or SEO
7. NEVER add disclaimers or explanations about formatting

Structure the content with:
1. A powerful opening about eliminating multiple contractor calls
2. Benefits section highlighting the "Perfect Match" promise
3. Local insights about sports facilities and regulations
4. Explanation of the proprietary algorithm
5. How we eliminate multiple site visits`
};

// Service-specific user prompts
const serviceUserPrompts = {
  'Residential Fencing': `Create compelling, SEO-optimized content about our Residential Fence Contractor Matching Service in {cityName}, Texas. Structure with:
    
1. A powerful opening emphasizing how we eliminate the #1 frustration of {cityName} homeowners - multiple contractor calls and wasted hours searching for residential fence installers

2. Specific benefits section highlighting our "Perfect Match" promise and how {cityName} families save 4+ hours of research time finding the right fence contractor

3. Local insights about {cityName}'s neighborhoods, HOA requirements, and residential fencing regulations that our matching service understands

4. Explanation of how our proprietary algorithm identifies the single most qualified local residential fence specialist in {cityName} for their exact project needs

5. Specific mention of how we eliminate multiple site visits and conflicting quotes with one perfect residential fence contractor match

Format with H2/H3 headings and use HTML formatting for emphasis.`,

  'Commercial Fencing': `Create compelling, SEO-optimized content about our Commercial Fence Contractor Matching Service in {cityName}, Texas. Structure with:
    
1. A powerful opening emphasizing how we eliminate the #1 frustration of {cityName} business owners - multiple contractor calls and wasted hours searching for commercial fence installers

2. Specific benefits section highlighting our "Perfect Match" promise and how {cityName} businesses save 4+ hours of research time finding the right fence contractor

3. Local insights about {cityName}'s commercial districts, business regulations, and commercial fencing requirements that our matching service understands

4. Explanation of how our proprietary algorithm identifies the single most qualified local commercial fence specialist in {cityName} for their exact project needs

5. Specific mention of how we eliminate multiple site visits and conflicting quotes with one perfect commercial fence contractor match

Format with H2/H3 headings and use HTML formatting for emphasis.`,

  'Access Control': `Create compelling, SEO-optimized content about our Access Control System Contractor Matching Service in {cityName}, Texas. Structure with:
    
1. A powerful opening emphasizing how we eliminate the #1 frustration of {cityName} property owners - multiple contractor calls and wasted hours searching for access control system installers

2. Specific benefits section highlighting our "Perfect Match" promise and how {cityName} property owners save 4+ hours of research time finding the right security contractor

3. Local insights about {cityName}'s security needs, compliance regulations, and access control requirements that our matching service understands

4. Explanation of how our proprietary algorithm identifies the single most qualified local access control specialist in {cityName} for their exact security needs

5. Specific mention of how we eliminate multiple site visits and conflicting quotes with one perfect access control contractor match

Format with H2/H3 headings and use HTML formatting for emphasis.`,

  'Automatic Gates': `Create compelling, SEO-optimized content about our Automatic Gate Contractor Matching Service in {cityName}, Texas. Structure with:
    
1. A powerful opening emphasizing how we eliminate the #1 frustration of {cityName} property owners - multiple contractor calls and wasted hours searching for automatic gate installers

2. Specific benefits section highlighting our "Perfect Match" promise and how {cityName} property owners save 4+ hours of research time finding the right gate contractor

3. Local insights about {cityName}'s property types, access requirements, and automatic gate regulations that our matching service understands

4. Explanation of how our proprietary algorithm identifies the single most qualified local automatic gate specialist in {cityName} for their exact project needs

5. Specific mention of how we eliminate multiple site visits and conflicting quotes with one perfect automatic gate contractor match

Format with H2/H3 headings and use HTML formatting for emphasis.`,

  'Athletic Courts and Sports Facilities': `Create compelling, SEO-optimized content about our Athletic Court and Sports Facility Contractor Matching Service in {cityName}, Texas. Structure with:
    
1. A powerful opening emphasizing how we eliminate the #1 frustration of {cityName} facility managers - multiple contractor calls and wasted hours searching for sports facility contractors

2. Specific benefits section highlighting our "Perfect Match" promise and how {cityName} organizations save 4+ hours of research time finding the right facility contractor

3. Local insights about {cityName}'s sports community, facility requirements, and construction regulations that our matching service understands

4. Explanation of how our proprietary algorithm identifies the single most qualified local sports facility specialist in {cityName} for their exact project needs

5. Specific mention of how we eliminate multiple site visits and conflicting quotes with one perfect facility contractor match

Format with H2/H3 headings and use HTML formatting for emphasis.`
};

// Default prompts if no specific service prompt is found
const defaultSystemPrompt = `You are an expert in lead generation for home improvement services with deep knowledge of the {serviceName} industry. Create persuasive, conversion-focused content for a matching service that connects {cityName}, Texas property owners with top {serviceName} contractors. Focus on the pain points customers face when finding contractors (multiple calls, site visits, comparing quotes) and how this service eliminates them with ONE Perfect Match contractor.`;

const defaultUserPrompt = `Create compelling, SEO-optimized content about our {serviceName} Contractor Matching Service in {cityName}, Texas. Structure with:
    
1. A powerful opening emphasizing how we eliminate the #1 frustration of {cityName} property owners - multiple contractor calls and wasted hours

2. Specific benefits section highlighting our "Perfect Match" promise and how {cityName} customers save 4+ hours of research time

3. Local insights about {cityName}'s areas, regulations, and {serviceName} requirements that our matching service understands

4. Explanation of how our proprietary algorithm identifies the single most qualified local specialist in {cityName} for their exact project needs

5. Specific mention of how we eliminate multiple site visits and conflicting quotes with one perfect contractor match

Format with H2/H3 headings and use HTML formatting for emphasis.`;

const cleanContent = (content: string): string => {
  return content
    // Remove ```html tags
    .replace(/```html\s*/g, '')
    .replace(/```\s*$/g, '')
    // Remove meta-comments about SEO/content
    .replace(/This content is designed to be.*$/gm, '')
    .replace(/Note: This content is optimized.*$/gm, '')
    // Clean up any extra newlines that might be left
    .replace(/\n{3,}/g, '\n\n')
    .trim();
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
    
    // Select the appropriate prompts
    const systemPrompt = (serviceSystemPrompts[serviceName] || defaultSystemPrompt)
      .replace(/{cityName}/g, cityName)
      .replace(/{serviceName}/g, serviceName);
      
    const userPrompt = prompt || 
      (serviceUserPrompts[serviceName] || defaultUserPrompt)
        .replace(/{cityName}/g, cityName)
        .replace(/{serviceName}/g, serviceName);
    
    // Prepare the OpenAI API request
    console.log("Calling OpenAI API...");
    const start = Date.now();
    
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
            content: systemPrompt
          },
          { 
            role: 'user', 
            content: userPrompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });

    const end = Date.now();
    console.log(`OpenAI API call completed in ${end - start}ms`);

    // Check for successful response
    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    // Parse and return the generated content
    const data = await response.json();
    const generatedContent = cleanContent(data.choices[0].message.content);
    
    console.log("Content generated successfully. Content length:", generatedContent.length);
    
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
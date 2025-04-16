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

// Clean and format content before returning
function cleanContent(content: string): string {
  let cleanedContent = content
    // Remove markdown headers
    .replace(/#+\s/g, '')
    // Remove any ```html tags
    .replace(/```html/g, '')
    .replace(/```/g, '')
    // Remove meta comments about content structure or SEO
    .replace(/This content is designed to be.*?(?=\n)/g, '')
    .replace(/I have structured this content.*?(?=\n)/g, '')
    .replace(/This HTML-formatted content.*?(?=\n)/g, '')
    // Clean up extra newlines
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  // Ensure proper HTML structure for headings
  cleanedContent = cleanedContent
    // Fix any improperly formatted headings
    .replace(/<h2>\s*(.*?)\s*<\/h2>/gi, (_, text) => `\n<h2>${text}</h2>\n`)
    .replace(/<h3>\s*(.*?)\s*<\/h3>/gi, (_, text) => `\n<h3>${text}</h3>\n`)
    // Fix any improperly formatted paragraphs
    .replace(/<p>\s*(.*?)\s*<\/p>/gi, (_, text) => `<p>${text}</p>\n`)
    // Fix any improperly formatted lists
    .replace(/<ul>\s*(.*?)\s*<\/ul>/gis, (_, items) => `\n<ul>\n${items}\n</ul>\n`)
    .replace(/<li>\s*(.*?)\s*<\/li>/gi, (_, text) => `  <li>${text}</li>\n`)
    // Clean up any remaining formatting issues
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  // Add a wrapper div for consistent styling
  return `<div class="dynamic-content">\n${cleanedContent}\n</div>`;
}

serve(async (req) => {
  // Add CORS headers
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { city, service } = await req.json();

    if (!city || !service) {
      throw new Error('City and service are required');
    }

    const systemPrompt = serviceSystemPrompts[service].replace('{cityName}', city);
    const userPrompt = serviceUserPrompts[service].replace('{cityName}', city);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    
    if (!data.choices?.[0]?.message?.content) {
      throw new Error('No content received from OpenAI');
    }

    const cleanedContent = cleanContent(data.choices[0].message.content);

    return new Response(
      JSON.stringify({
        content: cleanedContent,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    );
  }
});
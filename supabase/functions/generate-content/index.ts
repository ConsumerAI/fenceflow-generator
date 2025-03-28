import { serve } from "http/server.ts";
import { Configuration, OpenAIApi } from "openai";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Comprehensive environmental data function
async function getLocalEnvironmentalData(city: string) {
  const OPENWEATHER_API_KEY = Deno.env.get('OPENWEATHER_API_KEY')
  if (!OPENWEATHER_API_KEY) {
    console.warn('OPENWEATHER_API_KEY is not set, using default weather data')
    return {
      temp: 75,
      humidity: 50,
      rainfall: 36, // Texas average
      windSpeed: 8,
      description: 'typical Texas weather',
      soilType: {
        type: "mixed clay and loam",
        characteristics: "typical Texas soil conditions",
        postDepth: 24,
        fenceConsiderations: "standard post installation techniques"
      },
      isCoastal: false,
      uvIndex: 6,
      uvCategory: "moderate",
      hasFreezeCycles: false,
      hurricaneRisk: 1,
      specificChallenges: "general Texas weather patterns"
    }
  }

  try {
    // Get current weather data
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},TX,US&units=imperial&appid=${OPENWEATHER_API_KEY}`
    )
    
    if (!weatherResponse.ok) {
      throw new Error(`OpenWeather API error: ${weatherResponse.statusText}`)
    }

    const weatherData = await weatherResponse.json()
    
    // Comprehensive rainfall map for Texas cities
    const rainfallMap: {[key: string]: number} = {
      // East Texas (humid, high rainfall)
      'Tyler': 46, 'Beaumont': 60, 'Lufkin': 49, 'Nacogdoches': 49, 'Longview': 48,
      'Marshall': 51, 'Palestine': 44, 'Jacksonville': 47, 'Texarkana': 49,
      
      // Gulf Coast
      'Houston': 50, 'Galveston': 51, 'Corpus Christi': 32, 'Port Arthur': 59,
      'Pasadena': 50, 'Baytown': 52, 'League City': 51, 'Sugar Land': 48,
      'Texas City': 50, 'Victoria': 40, 'Lake Jackson': 52, 'Port Lavaca': 41,
      'Freeport': 52, 'Rockport': 35, 'Aransas Pass': 34, 'Port Aransas': 32,
      'South Padre Island': 29, 'Padre Island': 30, 'Mustang Island': 31,
      
      // Central Texas
      'Austin': 34, 'San Antonio': 32, 'Waco': 36, 'Temple': 35, 'Killeen': 33,
      'Georgetown': 35, 'San Marcos': 33, 'New Braunfels': 32, 'Round Rock': 35,
      'Cedar Park': 34, 'Belton': 34, 'Pflugerville': 34, 'Kyle': 33,
      
      // North Texas
      'Dallas': 41, 'Fort Worth': 37, 'Denton': 40, 'Plano': 41, 'Arlington': 39,
      'Garland': 41, 'Irving': 39, 'Grand Prairie': 39, 'McKinney': 42,
      'Frisco': 42, 'Mesquite': 40, 'Carrollton': 40, 'Lewisville': 40,
      'Richardson': 41, 'Allen': 42, 'Flower Mound': 40, 'Euless': 38,
      'Grapevine': 38, 'Bedford': 38, 'Hurst': 38, 'Southlake': 39,
      'Colleyville': 39, 'Keller': 39, 'North Richland Hills': 38,
      'Mansfield': 38, 'Burleson': 37, 'Cleburne': 37, 'Weatherford': 35,
      'Rowlett': 41, 'DeSoto': 40, 'Cedar Hill': 40, 'Duncanville': 40,
      'Sherman': 43, 'Denison': 44, 'Gainesville': 42, 'Greenville': 44,
      
      // West Texas (arid, low rainfall)
      'El Paso': 9, 'Midland': 14, 'Odessa': 14, 'Abilene': 24, 'San Angelo': 21,
      'Pecos': 11, 'Fort Stockton': 12, 'Alpine': 16, 'Marfa': 15,
      'Van Horn': 10, 'Monahans': 12, 'Andrews': 14, 'Big Spring': 19,
      'Snyder': 22, 'Sweetwater': 24, 'Brownwood': 26,
      
      // Panhandle (semi-arid)
      'Amarillo': 20, 'Lubbock': 19, 'Wichita Falls': 28, 'Pampa': 22,
      'Childress': 22, 'Dalhart': 16, 'Borger': 21, 'Dumas': 18,
      'Hereford': 18, 'Plainview': 19, 'Canyon': 19,
      
      // South Texas
      'McAllen': 22, 'Brownsville': 27, 'Laredo': 20, 'Harlingen': 27,
      'Edinburg': 22, 'Mission': 22, 'Pharr': 22, 'Weslaco': 24,
      'Del Rio': 19, 'Eagle Pass': 21, 'Kingsville': 26, 'Alice': 28
    }
    
    // Function to determine region based on coordinates
    const getRegionRainfall = (lat: number, lon: number) => {
      // East Texas
      if (lon > -96 && lat > 30 && lat < 34) return 48;
      // Gulf Coast
      if (lat < 30 && lon > -97) return 45;
      // West Texas
      if (lon < -100) return 15;
      // Panhandle
      if (lat > 34 && lon < -100) return 20;
      // Central Texas
      if (lon > -100 && lon < -97 && lat > 29 && lat < 32) return 34;
      // North Texas
      if (lat > 32 && lon > -98 && lon < -96) return 40;
      // South Texas
      if (lat < 29 && lon < -97) return 25;
      
      return 36; // State average as absolute fallback
    };
    
    // Default to regional average based on coordinates if city not in map
    let rainfall = rainfallMap[city] || getRegionRainfall(
      weatherData.coord.lat, 
      weatherData.coord.lon
    );
    
    // Determine regional classification for soil type and other factors
    const getRegion = (lat: number, lon: number) => {
      // East Texas
      if (lon > -96 && lat > 30 && lat < 34) return "eastTexas";
      // Gulf Coast
      if (lat < 30.5 && lon > -97.5 && lon < -93.5) return "gulfCoast";
      // West Texas
      if (lon < -100) return "westTexas";
      // Panhandle
      if (lat > 34 && lon < -100) return "panhandle";
      // Central Texas
      if (lon > -100 && lon < -97 && lat > 29 && lat < 32) return "centralTexas";
      // North Texas
      if (lat > 32 && lon > -98 && lon < -96) return "northTexas";
      // South Texas
      if (lat < 29 && lon < -97) return "southTexas";
      
      return "centralTexas"; // Default region
    };
    
    const region = getRegion(weatherData.coord.lat, weatherData.coord.lon);
    
    // Check if the location is coastal (within ~25 miles of Gulf Coast)
    const isCoastal = (
      (region === "gulfCoast" && weatherData.coord.lat < 29.8) || 
      city.includes("Island") || 
      ["Galveston", "Corpus Christi", "Port Aransas", "Rockport", "Freeport", 
       "South Padre Island", "Port Lavaca", "Texas City", "Baytown", "Surfside Beach", 
       "Padre Island", "Mustang Island", "Aransas Pass"].includes(city)
    );
    
    // Soil type mapping based on Texas regions
    const soilTypeMap = {
      eastTexas: {
        type: "acidic sandy loam",
        characteristics: "well-draining but can erode, moderately acidic",
        postDepth: 30, // inches
        fenceConsiderations: "deeper post holes with concrete footings to compensate for soil erosion"
      },
      centralTexas: {
        type: "clay and limestone",
        characteristics: "expansive clay that swells when wet, shallow limestone bedrock in places",
        postDepth: 36, // inches
        fenceConsiderations: "wider post holes with proper drainage to accommodate soil expansion/contraction"
      },
      gulfCoast: {
        type: "clay loam with poor drainage",
        characteristics: "high water table, prone to waterlogging",
        postDepth: 30, // inches
        fenceConsiderations: "drainage gravel beneath posts and galvanized metal for longevity"
      },
      northTexas: {
        type: "black clay (vertisol)",
        characteristics: "highly expansive, cracks when dry, sticky when wet",
        postDepth: 36, // inches
        fenceConsiderations: "bell-shaped post holes with reinforced concrete base for stability"
      },
      westTexas: {
        type: "alkaline sandy soil",
        characteristics: "loose structure, low organic content, high pH",
        postDepth: 32, // inches
        fenceConsiderations: "wider diameter post holes with stabilized soil backfill for secure anchoring"
      },
      panhandle: {
        type: "silt loam and caliche",
        characteristics: "hardpan caliche layer often present below topsoil",
        postDepth: 30, // inches
        fenceConsiderations: "special equipment needed for drilling through caliche layers"
      },
      southTexas: {
        type: "sandy clay loam",
        characteristics: "variable texture, moderate drainage",
        postDepth: 30, // inches
        fenceConsiderations: "standard post setting with attention to soil compaction around posts"
      }
    };
    
    // UV index approximation based on latitude and region
    const getUVIndex = (lat: number, region: string) => {
      // Base UV level on latitude (lower latitude = higher UV)
      let baseUV = 10 - ((lat - 26) / 10);
      
      // Adjust for regional factors
      if (region === "westTexas") baseUV += 1; // Higher elevation
      if (region === "gulfCoast") baseUV += 0.5; // Reflection from water
      
      return Math.min(Math.max(Math.round(baseUV * 10) / 10, 4), 11);
    };
    
    const uvIndex = getUVIndex(weatherData.coord.lat, region);
    
    // UV category based on index
    const getUVCategory = (index: number) => {
      if (index < 3) return "low";
      if (index < 6) return "moderate";
      if (index < 8) return "high";
      if (index < 11) return "very high";
      return "extreme";
    };
    
    // Freeze cycle likelihood based on region
    const hasFreezeCycles = ["northTexas", "panhandle", "westTexas"].includes(region);
    
    // Hurricane risk rating (1-5) based on coastal proximity and location
    const getHurricaneRisk = (isCoastal: boolean, region: string, city: string) => {
      if (!isCoastal) return 1;
      
      // Higher risk cities along the coast
      if (["Galveston", "Texas City", "Freeport", "Port Arthur", "South Padre Island", 
           "Corpus Christi", "Rockport", "Port Aransas", "Padre Island"].includes(city)) {
        return 5;
      }
      
      // Moderate risk coastal cities
      if (region === "gulfCoast") return 4;
      
      // Lower risk coastal areas
      return 3;
    };
    
    const hurricaneRisk = getHurricaneRisk(isCoastal, region, city);
    
    // Specific local challenges based on regional factors
    const getSpecificChallenges = (region: string, isCoastal: boolean, rainfall: number, hasFreezeCycles: boolean) => {
      const challenges = [];
      
      if (isCoastal) challenges.push("salt corrosion");
      if (rainfall > 45) challenges.push("high moisture and potential rot");
      if (rainfall < 20) challenges.push("dry soil and foundation stability");
      if (hasFreezeCycles) challenges.push("freeze-thaw cycles");
      if (region === "centralTexas") challenges.push("expansive clay soil");
      if (region === "westTexas" || region === "panhandle") challenges.push("high winds");
      if (region === "gulfCoast") challenges.push("periodic flooding");
      if (region === "eastTexas") challenges.push("acidic soil affecting metal components");
      
      // Return the top 2 challenges, or a default if none apply
      return challenges.length > 0 
        ? challenges.slice(0, 2).join(" and ") 
        : "standard seasonal weather variations";
    };
    
    const specificChallenges = getSpecificChallenges(region, isCoastal, rainfall, hasFreezeCycles);
    
    return {
      temp: weatherData.main.temp,
      humidity: weatherData.main.humidity,
      rainfall, // Annual rainfall using our mapping
      windSpeed: weatherData.wind.speed,
      description: weatherData.weather[0].description,
      coord: weatherData.coord, // Keep coordinates for reference
      soilType: soilTypeMap[region],
      isCoastal,
      uvIndex,
      uvCategory: getUVCategory(uvIndex),
      hasFreezeCycles,
      hurricaneRisk,
      specificChallenges,
      region // Include the detected region
    }
  } catch (error) {
    console.error('Error fetching environmental data:', error)
    // Return default values if API fails
    return {
      temp: 75,
      humidity: 50,
      rainfall: 36, // Texas average
      windSpeed: 8,
      description: 'typical Texas weather',
      soilType: {
        type: "mixed clay and loam",
        characteristics: "typical Texas soil conditions",
        postDepth: 24,
        fenceConsiderations: "standard post installation techniques"
      },
      isCoastal: false,
      uvIndex: 6,
      uvCategory: "moderate",
      hasFreezeCycles: false,
      hurricaneRisk: 1,
      specificChallenges: "general Texas weather patterns",
      region: "centralTexas" // Default region
    }
  }
}

serve(async (req) => {
  console.log('Updated generate-content function with weather API integration - ' + new Date().toISOString());
  
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

    // Get environmental data for the city
    const envData = await getLocalEnvironmentalData(city)
    console.log(`Environmental data for ${city}:`, envData)

    const configuration = new Configuration({ apiKey: OPENAI_API_KEY })
    const openai = new OpenAIApi(configuration)

    const prompt = `
    Create detailed, SEO-optimized content for a fence installation company website for the city of ${city}, Texas. Include:
    
    1. A compelling headline (h1) for the city page
    2. An introduction paragraph about fence installation services in ${city}
    3. Five distinct benefits of getting a fence installed in ${city} by this company
    4. Detailed descriptions for these services, with extra focus on Athletic Courts and Sports Facilities section: 
       - Residential Fencing
       - Commercial Fencing
       - Athletic Courts and Sports Facilities (heavily emphasize pickleball court installation and tennis court installation, using these exact terms multiple times)
       - Access Control
       - Automatic Gates
       All descriptions should be tailored to ${city}
    5. A FAQ section about fencing in ${city}
    6. A call-to-action paragraph
    7. 15 SEO keywords related to fence installation and athletic courts in ${city}, including targeted keywords like:
       - athletic courts ${city}
       - sports facilities near me
       - athletic court contractor ${city}
       - pickleball court fencing
       - tennis court fence
       - sports field fencing near me
       - chain link fence for baseball field
       - backstop fencing baseball
       - tennis court chain link fence
       - pickleball court windscreens
       - basketball court fencing
       - volleyball court fence
       - athletic field fencing

    Format the response as a valid JSON object with these fields: 
    metaTitle, metaDescription, h1, intro, benefits (array), serviceSections (object with 5 entries), faq, cta, keywords (array).
    
    Make content unique to ${city} by mentioning local landmarks, neighborhoods, and architectural styles where appropriate.
    
    IMPORTANTLY, incorporate these specific weather details about ${city} into your content:
    - Current temperature: ${envData.temp}°F
    - Humidity level: ${envData.humidity}%
    - Average annual rainfall: ${envData.rainfall} inches
    - Wind speed: ${envData.windSpeed} mph
    - Current weather conditions: ${envData.description}
    
    Explain how these weather conditions affect fence installations, material choices, and longevity throughout the content.
    For example:
    - With ${envData.rainfall} inches of annual rainfall, recommend moisture-resistant materials
    - If humidity is high (above 60%), mention how certain woods might not be ideal
    - If wind speed is high (above 10mph), explain how post depth and fence height considerations are important
    - For hot temperatures (above 90°F), discuss how material expansion needs to be factored into installation
    
    The company only does new installations, not repairs.
    
    For the Athletic Courts and Sports Facilities section, include comprehensive information about:
    - Pickleball court installation, fencing, dimensions, safety barriers, windscreens, and chain link options
    - Tennis court installation, fencing heights, privacy screens, fence aesthetics, and maintenance
    - Basketball court fencing options and chain link installation
    - Baseball field fencing, outfield fence installation, safety netting, backstop fencing
    - Volleyball court fencing solutions
    - Football and soccer field perimeter fencing
    - Multi-court fencing systems
    - Various materials including galvanized chain link, vinyl-coated options, and aluminum fencing
    
    ADDITIONALLY, CREATE A DETAILED "ENVIRONMENTAL CONSIDERATIONS" SECTION FOR ${city}, TEXAS FENCING THAT ANALYZES THESE SPECIFIC LOCAL CONDITIONS:

    ## Local Data Integration (Factual Foundation)
    - Current temperature: ${envData.temp}°F
    - Humidity level: ${envData.humidity}%
    - Average annual rainfall: ${envData.rainfall} inches
    - Wind speed: ${envData.windSpeed} mph
    - Current weather pattern: ${envData.description}
    - Coastal proximity: ${envData.isCoastal ? `${city} is in a coastal zone with salt exposure concerns` : `${city} is not in a coastal zone`}
    - Soil classification: ${envData.soilType.type}
    - UV exposure level: ${envData.uvIndex} (${envData.uvCategory})

    ## Material Impact Analysis
    1. Create detailed, evidence-based explanations of how each environmental factor specifically impacts fence materials in ${city}:
      - Explain how ${city}'s ${envData.rainfall} inches of annual rainfall affects wood fence durability and material selection
      - Detail how the local ${envData.soilType.type} soil conditions impact post installation depth and concrete setting
      - ${envData.isCoastal ? `Provide specific recommendations for corrosion-resistant materials and treatments due to coastal exposure` : `Explain standard material considerations for this inland location`}
      - ${envData.windSpeed > 10 ? `For areas with high winds (${envData.windSpeed} mph), explain proper reinforcement techniques` : `Discuss standard wind considerations for this area`}
      - ${envData.uvIndex > 7 ? `With high UV exposure (index ${envData.uvIndex}), outline special considerations for preventing material degradation` : `Explain standard UV protection measures for this region`}

    ## Seasonal Considerations
    2. Address how ${city}'s seasonal patterns affect fencing:
      - Winter considerations: ${envData.hasFreezeCycles ? "Include freeze-thaw cycle impacts on posts and materials" : "Explain mild winter benefits"}
      - Summer heat impacts: Detail material expansion concerns for ${city}'s peak temperatures
      - Storm/hurricane vulnerability: ${envData.hurricaneRisk > 3 ? "Include hurricane-resistant design factors" : "Focus on standard storm resistance"}

    ## Installation Best Practices
    3. Provide city-specific installation recommendations:
      - Optimal post depths for ${city}'s ${envData.soilType.type} soil (${envData.soilType.postDepth} inches minimum)
      - Foundation requirements based on local soil conditions
      - Special techniques for ${city}'s unique challenges (${envData.specificChallenges})
      - Long-term maintenance guidance specific to ${city}'s climate profile

    ## Environmental Selection Guide
    4. Create a material selection guide specific to ${city}:
      - Rank fence materials from 1-5 for suitability in ${city}'s specific conditions
      - Explain why certain materials excel or struggle in this specific environment
      - Include precise maintenance intervals based on local environmental stress factors

    FORMAT THIS AS A COHERENT, DETAILED MARKDOWN SECTION TITLED "ENVIRONMENTAL CONSIDERATIONS FOR ${city} FENCE INSTALLATIONS" THAT FLOWS NATURALLY AND PROVIDES GENUINELY VALUABLE INSIGHTS FOR PROPERTY OWNERS. USE SPECIFIC MEASUREMENTS, CONCRETE RECOMMENDATIONS, AND EVIDENCE-BASED EXPLANATIONS.
    
    Include this section in your JSON response as "environmentalConsiderations".
    
    Use natural language that incorporates the keywords without obvious stuffing. The section should read fluidly while mentioning the various sports court fence types, materials, specifications, and installation processes.
    `

    const completion = await openai.createChatCompletion({
      model: "gpt-4o-mini", // Using GPT-4o mini for cost control
      messages: [
        { role: "system", content: "You are an expert content writer for construction companies specializing in SEO, particularly for athletic courts and sports facilities installers and fence contractors. You excel at including specific local weather details and how they affect fencing materials and installation techniques." },
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
      
      // Add environmental data to the response
      contentObject.environmentalData = envData;
      
      // Add sports court specific content
      contentObject.sportsCourtsContent = {
        metaTitle: `Professional Athletic Courts and Sports Facilities in ${city} | Tennis & Pickleball Courts`,
        metaDescription: `Top-rated athletic courts and sports facilities installers in ${city}, TX. Specializing in pickleball courts, tennis courts, basketball courts, and athletic field fencing. Free quotes!`,
        mainHeading: `Athletic Courts and Sports Facilities Installation & Fencing in ${city}, Texas`,
        intro: `Looking for professional athletic courts and sports facilities installation in ${city}? Our team specializes in designing and building high-quality athletic courts and sports field fencing throughout ${city} and surrounding areas. From pickleball courts to tennis facilities, we deliver premium results.`,
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
          heading: `Premium Athletic Courts and Sports Facilities Materials`,
          content: `We use only the highest quality materials for our athletic courts and sports facilities, including premium chain link and aluminum fencing for sports fields. Our athletic court fence materials are selected for durability, weather resistance, and aesthetic appeal, ensuring your ${city} facility looks professional while providing years of reliable service.`
        },
        keywords: [
          "pickleball court fence dimensions",
          "pickleball court privacy fencing",
          "pickleball court safety barrier",
          "pickleball court fence installation",
          "pickleball court fencing materials",
          "pickleball court fence specifications",
          "tennis court galvanized fencing",
          "tennis court fence aesthetics",
          "tennis court fence maintenance",
          "tennis court fencing solutions",
          "tennis court fence for privacy",
          "athletic court fence wind reduction",
          "athletic court fence for security",
          "athletic field fence height",
          "athletic field fence for spectators"
        ]
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
          "athletic court fence wind reduction",
          "athletic court fence for security",
          "athletic field fence aesthetics",
          "sports court fence wind reduction",
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
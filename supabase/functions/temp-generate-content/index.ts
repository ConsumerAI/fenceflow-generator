import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Configuration, OpenAIApi } from "https://esm.sh/openai@3.2.1";

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
      
      return challenges.join(", ");
    };

    return {
      temp: weatherData.main.temp,
      humidity: weatherData.main.humidity,
      rainfall,
      windSpeed: weatherData.wind.speed,
      description: weatherData.weather[0].description,
      soilType: soilTypeMap[region],
      isCoastal,
      uvIndex,
      uvCategory: getUVCategory(uvIndex),
      hasFreezeCycles,
      hurricaneRisk,
      specificChallenges: getSpecificChallenges(region, isCoastal, rainfall, hasFreezeCycles)
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { city, service } = await req.json()

    if (!city || !service) {
      throw new Error('Missing required fields')
    }

    // Get environmental data for the city
    const envData = await getLocalEnvironmentalData(city);

    // Configure OpenAI
    const configuration = new Configuration({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    });
    const openai = new OpenAIApi(configuration);

    // Generate content based on service type
    let prompt = '';
    let systemPrompt = '';

    if (service === 'Athletic Courts and Sports Facilities') {
      systemPrompt = `You are a professional athletic court and sports facility construction expert in ${city}, Texas. 
      You specialize in designing and building high-quality sports facilities that meet specific local requirements and environmental conditions.
      Consider these local environmental factors in your response:
      - Temperature: ${envData.temp}°F
      - Humidity: ${envData.humidity}%
      - Annual Rainfall: ${envData.rainfall} inches
      - Wind Speed: ${envData.windSpeed} mph
      - Weather Description: ${envData.description}
      - Soil Type: ${envData.soilType.type}
      - Soil Characteristics: ${envData.soilType.characteristics}
      - UV Index: ${envData.uvIndex} (${envData.uvCategory})
      - Location Type: ${envData.isCoastal ? 'Coastal' : 'Inland'}
      - Freeze Cycles: ${envData.hasFreezeCycles ? 'Yes' : 'No'}
      - Hurricane Risk: ${envData.hurricaneRisk}/5
      - Specific Challenges: ${envData.specificChallenges}`;

      prompt = `Write a comprehensive guide about athletic court and sports facility construction in ${city}, Texas. 
      Include specific details about:
      1. The importance of proper court construction for safety and performance
      2. How local weather conditions affect court materials and construction methods
      3. Soil considerations and foundation requirements
      4. Drainage solutions for the local climate
      5. Material recommendations based on environmental factors
      6. Maintenance requirements considering local conditions
      7. Special considerations for the specific challenges in this area
      
      Format the response with clear sections and bullet points where appropriate. 
      Keep the tone professional but approachable.
      Focus on practical, actionable information.
      Include specific numbers and measurements where relevant.`;
    }

    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {"role": "system", "content": systemPrompt},
        {"role": "user", "content": prompt}
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    return new Response(
      JSON.stringify(completion.data.choices[0].message),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
}) 
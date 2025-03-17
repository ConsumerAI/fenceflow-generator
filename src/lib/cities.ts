export const cities = [
  "Dallas", "Fort Worth", "Arlington", "Plano", "Garland", 
  "Irving", "Frisco", "McKinney", "Grand Prairie", "Denton", 
  "Mesquite", "Carrollton", "Richardson", "Lewisville", "Allen", 
  "Flower Mound", "North Richland Hills", "Mansfield", "Rowlett", "Bedford", 
  "Euless", "Grapevine", "Cedar Hill", "Wylie", "Keller", 
  "Coppell", "Hurst", "Duncanville", "The Colony", "Sherman", 
  "Rockwall", "Burleson", "Little Elm", "Southlake", "Waxahachie", 
  "Cleburne", "Farmers Branch", "Sachse", "Colleyville", "Midlothian", 
  "Prosper", "Lancaster", "Haltom City", "DeSoto", "Watauga", 
  "Anna", "Forney", "Celina", "Murphy", "Terrell", 
  "Saginaw", "Benbrook", "Corinth", "Denison", "Crowley", 
  "Lake Dallas", "Highland Village", "White Settlement", "Azle", "Forest Hill", 
  "Trophy Club", "Greenville", "Royse City", "Melissa", "Princeton", 
  "Ennis", "Fate", "Heath", "Roanoke", "Seagoville", 
  "Sanger", "Fairview", "Granbury", "Aubrey", "Joshua", 
  "Richland Hills", "Kennedale", "Justin", "Red Oak", "Kaufman", 
  "River Oaks", "Glenn Heights", "Hutchins", "Sunnyvale", "Lake Worth", 
  "Argyle", "Pilot Point", "Keene", "Lucas", "Everman", 
  "Gainesville", "Springtown", "Rhome", "Lavon", "Alvarado", 
  "Venus", "Decatur", "Bridgeport", "Ponder", "Aledo"
];

export function getCityUrl(city: string): string {
  return `/${city.toLowerCase().replace(/\s+/g, '-')}`;
}

export function getCityFromUrl(url: string): string | null {
  const citySlug = url.replace('/', '');
  const foundCity = cities.find(
    city => city.toLowerCase().replace(/\s+/g, '-') === citySlug
  );
  return foundCity || null;
}

/**
 * Checks if a city exists in our list of supported cities
 */
export function isCityValid(citySlug: string): boolean {
  // Convert the slug to a standardized format for comparison
  const normalizedSlug = citySlug.toLowerCase().replace(/-/g, ' ');
  return cities.some(city => city.toLowerCase() === normalizedSlug);
}

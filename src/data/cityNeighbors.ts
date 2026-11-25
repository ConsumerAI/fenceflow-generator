// Geographic neighbor map for the rebuilt (wave 1 and wave 2) city pages.
// Editorial selection only: each city lists 4 to 5 real adjacent or near
// adjacent DFW communities, chosen by geography, never an all to all grid.
// Keys and values are city slugs from src/lib/cities.ts. Most values are
// themselves rebuilt pages; a few are non-rebuilt city pages where geography
// leaves no rebuilt alternative (for example Denison for Sherman).
// Consumed by src/components/CityLinkBlocks.tsx. Structural linking data
// only: it carries no claims, prices, or promise wording.

export const cityNeighbors: Record<string, string[]> = {
  'dallas': ['garland', 'richardson', 'irving', 'grand-prairie', 'farmers-branch'],
  'fort-worth': ['arlington', 'burleson', 'keller', 'haltom-city', 'watauga'],
  'arlington': ['fort-worth', 'grand-prairie', 'mansfield', 'euless', 'bedford'],
  'plano': ['richardson', 'allen', 'frisco', 'murphy', 'wylie'],
  'frisco': ['plano', 'mckinney', 'little-elm', 'the-colony', 'prosper'],
  'mckinney': ['allen', 'frisco', 'prosper', 'celina', 'anna'],
  'grapevine': ['southlake', 'colleyville', 'coppell', 'euless', 'flower-mound'],
  'denton': ['lewisville', 'flower-mound', 'little-elm', 'the-colony', 'sanger'],
  'irving': ['dallas', 'grand-prairie', 'coppell', 'farmers-branch', 'euless'],
  'garland': ['dallas', 'richardson', 'mesquite', 'rowlett', 'sachse'],
  'carrollton': ['farmers-branch', 'dallas', 'lewisville', 'the-colony', 'coppell'],
  'richardson': ['dallas', 'plano', 'garland', 'murphy', 'farmers-branch'],
  'lewisville': ['flower-mound', 'the-colony', 'carrollton', 'coppell', 'denton'],
  'grand-prairie': ['arlington', 'dallas', 'irving', 'cedar-hill', 'mansfield'],
  'sherman': ['denison', 'anna', 'mckinney', 'celina'],
  'allen': ['plano', 'mckinney', 'murphy', 'frisco', 'fairview'],
  'anna': ['mckinney', 'celina', 'melissa', 'sherman'],
  'bedford': ['euless', 'hurst', 'colleyville', 'north-richland-hills', 'grapevine'],
  'burleson': ['fort-worth', 'mansfield', 'cleburne', 'crowley'],
  'cedar-hill': ['duncanville', 'desoto', 'midlothian', 'grand-prairie', 'dallas'],
  'celina': ['prosper', 'anna', 'mckinney', 'frisco', 'denton'],
  'cleburne': ['burleson', 'mansfield', 'midlothian', 'waxahachie'],
  'colleyville': ['grapevine', 'southlake', 'bedford', 'euless', 'hurst'],
  'coppell': ['irving', 'lewisville', 'grapevine', 'carrollton', 'flower-mound'],
  'desoto': ['duncanville', 'cedar-hill', 'lancaster', 'dallas', 'midlothian'],
  'duncanville': ['cedar-hill', 'desoto', 'dallas', 'grand-prairie'],
  'euless': ['bedford', 'hurst', 'grapevine', 'irving', 'colleyville'],
  'farmers-branch': ['carrollton', 'dallas', 'richardson', 'irving', 'coppell'],
  'flower-mound': ['lewisville', 'grapevine', 'coppell', 'the-colony', 'denton'],
  'forney': ['mesquite', 'terrell', 'rockwall', 'garland'],
  'haltom-city': ['fort-worth', 'north-richland-hills', 'watauga', 'keller', 'richland-hills'],
  'hurst': ['bedford', 'euless', 'north-richland-hills', 'colleyville', 'watauga'],
  'keller': ['southlake', 'watauga', 'north-richland-hills', 'fort-worth', 'colleyville'],
  'lancaster': ['desoto', 'dallas', 'cedar-hill', 'waxahachie', 'hutchins'],
  'little-elm': ['frisco', 'the-colony', 'denton', 'prosper', 'lewisville'],
  'mansfield': ['arlington', 'burleson', 'midlothian', 'fort-worth', 'grand-prairie'],
  'mesquite': ['garland', 'dallas', 'forney', 'terrell', 'sunnyvale'],
  'midlothian': ['waxahachie', 'mansfield', 'cedar-hill', 'desoto'],
  'murphy': ['plano', 'wylie', 'sachse', 'richardson', 'allen'],
  'north-richland-hills': ['hurst', 'watauga', 'haltom-city', 'keller', 'bedford'],
  'prosper': ['celina', 'frisco', 'mckinney', 'little-elm', 'the-colony'],
  'rockwall': ['rowlett', 'wylie', 'forney', 'heath', 'garland'],
  'rowlett': ['garland', 'rockwall', 'sachse', 'wylie', 'mesquite'],
  'sachse': ['garland', 'wylie', 'murphy', 'rowlett', 'richardson'],
  'southlake': ['grapevine', 'colleyville', 'keller', 'coppell', 'flower-mound'],
  'terrell': ['forney', 'mesquite', 'kaufman', 'rockwall'],
  'the-colony': ['lewisville', 'frisco', 'little-elm', 'carrollton', 'plano'],
  'watauga': ['north-richland-hills', 'keller', 'haltom-city', 'hurst', 'fort-worth'],
  'waxahachie': ['midlothian', 'lancaster', 'desoto', 'ennis', 'mansfield'],
  'wylie': ['murphy', 'sachse', 'plano', 'rockwall', 'rowlett'],
};

export function formatSlug(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

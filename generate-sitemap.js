
import fs from 'fs';

// Define all cities (100 total)
const cities = [
  'dallas', 'fort-worth', 'arlington', 'plano', 'garland', 'irving', 'frisco', 'mckinney',
  'grand-prairie', 'denton', 'mesquite', 'carrollton', 'richardson', 'lewisville', 'allen',
  'flower-mound', 'north-richland-hills', 'mansfield', 'rowlett', 'bedford', 'euless',
  'grapevine', 'cedar-hill', 'wylie', 'keller', 'coppell', 'hurst', 'duncanville',
  'the-colony', 'sherman', 'rockwall', 'burleson', 'little-elm', 'southlake', 'waxahachie',
  'cleburne', 'farmers-branch', 'sachse', 'colleyville', 'midlothian', 'prosper', 'lancaster',
  'haltom-city', 'desoto', 'watauga', 'anna', 'forney', 'celina', 'murphy', 'terrell',
  'saginaw', 'benbrook', 'corinth', 'denison', 'crowley', 'lake-dallas', 'highland-village',
  'white-settlement', 'azle', 'forest-hill', 'trophy-club', 'greenville', 'royse-city',
  'melissa', 'princeton', 'ennis', 'fate', 'heath', 'roanoke', 'seagoville', 'sanger',
  'fairview', 'granbury', 'aubrey', 'joshua', 'richland-hills', 'kennedale', 'justin',
  'red-oak', 'kaufman', 'river-oaks', 'glenn-heights', 'hutchins', 'sunnyvale', 'lake-worth',
  'argyle', 'pilot-point', 'keene', 'lucas', 'everman', 'gainesville', 'springtown', 'rhome',
  'lavon', 'alvarado', 'venus', 'decatur', 'bridgeport', 'ponder', 'aledo'
];

// Define services with correct route format
const serviceRoutes = {
  'residential-fencing': 'Residential Fencing',
  'commercial-fencing': 'Commercial Fencing',
  'sports-courts': 'Sports Courts',
  'access-control': 'Access Control',
  'automatic-gates': 'Automatic Gates'
};

// Generate sitemap content
let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

// Homepage
sitemap += `
  <url>
    <loc>https://fencestexas.com/</loc>
    <lastmod>2025-03-14</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>`;

// Near-me page
sitemap += `
  <url>
    <loc>https://fencestexas.com/fence-companies-near-me</loc>
    <lastmod>2025-03-14</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`;

// Service pages (5)
Object.keys(serviceRoutes).forEach(serviceRoute => {
  sitemap += `
  <url>
    <loc>https://fencestexas.com/${serviceRoute}</loc>
    <lastmod>2025-03-14</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
});

// City pages (100)
cities.forEach(city => {
  sitemap += `
  <url>
    <loc>https://fencestexas.com/${city}</loc>
    <lastmod>2025-03-14</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
});

// City-service pages (500)
cities.forEach(city => {
  Object.keys(serviceRoutes).forEach(serviceRoute => {
    sitemap += `
  <url>
    <loc>https://fencestexas.com/${city}/${serviceRoute}</loc>
    <lastmod>2025-03-14</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
  });
});

sitemap += '\n</urlset>';

// Write to file
fs.writeFileSync('public/sitemap.xml', sitemap);
console.log('Sitemap generated with 607 URLs in public/sitemap.xml');

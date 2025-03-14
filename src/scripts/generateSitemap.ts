
import fs from 'fs';
import { cities } from '../lib/cities';
import { services } from '../lib/routes';

/**
 * Generate a complete sitemap.xml file with all city and service combinations
 */
function generateSitemap() {
  const baseUrl = 'https://fencestexas.com';
  const today = new Date().toISOString().split('T')[0];
  
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  // Add homepage
  sitemap += `  <url>\n    <loc>${baseUrl}/</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n  </url>\n`;
  
  // Add near me page
  sitemap += `  <url>\n    <loc>${baseUrl}/fence-companies-near-me</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;
  
  // Add service pages
  for (const service of services) {
    const serviceSlug = service.toLowerCase().replace(/\s+/g, '-');
    sitemap += `  <url>\n    <loc>${baseUrl}/${serviceSlug}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
  }
  
  // Add city pages
  for (const city of cities) {
    const citySlug = city.toLowerCase().replace(/\s+/g, '-');
    sitemap += `  <url>\n    <loc>${baseUrl}/${citySlug}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
  }
  
  // Add city-service pages
  for (const city of cities) {
    const citySlug = city.toLowerCase().replace(/\s+/g, '-');
    
    for (const service of services) {
      const serviceSlug = service.toLowerCase().replace(/\s+/g, '-');
      sitemap += `  <url>\n    <loc>${baseUrl}/${citySlug}/${serviceSlug}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
    }
  }
  
  // Close sitemap
  sitemap += '</urlset>';
  
  // Write to file
  fs.writeFileSync('public/sitemap.xml', sitemap);
  console.log('Sitemap generated successfully!');
  console.log(`Total URLs: ${1 + 1 + services.length + cities.length + (cities.length * services.length)}`);
}

// Run the generator
generateSitemap();

export default generateSitemap;

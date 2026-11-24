// Sitemap generator — builds sitemap.xml from the shared route data
// (scripts/routes.mjs) with a lastmod of the generation date, instead of the
// old static file whose 607 lastmod values were frozen at 2025-03-13.
//
// Used two ways:
//  - by scripts/prerender.mjs during `npm run build` (writes dist/sitemap.xml)
//  - standalone: `node scripts/generate-sitemap.mjs` (writes public/sitemap.xml)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getSitemapRoutes } from './routes.mjs';

export function buildSitemapXml(lastmod = new Date().toISOString().slice(0, 10)) {
  const urls = getSitemapRoutes()
    .map(
      (r) =>
        `  <url>\n    <loc>https://fencestexas.com${r.path}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const out = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../public/sitemap.xml');
  fs.writeFileSync(out, buildSitemapXml());
  console.log(`Sitemap generated with ${getSitemapRoutes().length} URLs in public/sitemap.xml`);
}

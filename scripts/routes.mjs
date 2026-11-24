// Shared route data for build-time tooling (prerender + sitemap).
// The city list is parsed out of src/lib/cities.ts so there is exactly one
// source of truth for the 100 cities — this file never duplicates it.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export function getCitySlugs() {
  const src = fs.readFileSync(path.join(repoRoot, 'src/lib/cities.ts'), 'utf8');
  const match = src.match(/export const cities = \[([\s\S]*?)\];/);
  if (!match) {
    throw new Error('routes.mjs: could not parse the cities array from src/lib/cities.ts');
  }
  const names = [...match[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);
  if (names.length === 0) {
    throw new Error('routes.mjs: no cities parsed from src/lib/cities.ts');
  }
  return names.map((name) => name.toLowerCase().replace(/\s+/g, '-'));
}

// Canonical service hub slugs. The duplicate courts hub
// (/athletic-courts-and-sports-facilities) is intentionally excluded: it
// 301-redirects to /sports-courts via vercel.json.
export const HUB_SERVICES = [
  'residential-fencing',
  'commercial-fencing',
  'sports-courts',
  'access-control',
  'automatic-gates',
];

// The sitemap route set (matches the URL inventory the site has always
// published: home, near-me, 5 hubs, 100 cities, 500 city x service).
export function getSitemapRoutes() {
  const cities = getCitySlugs();
  const routes = [
    { path: '/', changefreq: 'monthly', priority: '1.0' },
    { path: '/fence-companies-near-me', changefreq: 'monthly', priority: '0.9' },
  ];
  for (const service of HUB_SERVICES) {
    routes.push({ path: `/${service}`, changefreq: 'monthly', priority: '0.8' });
  }
  for (const city of cities) {
    routes.push({ path: `/${city}`, changefreq: 'monthly', priority: '0.8' });
  }
  for (const city of cities) {
    for (const service of HUB_SERVICES) {
      routes.push({ path: `/${city}/${service}`, changefreq: 'monthly', priority: '0.7' });
    }
  }
  return routes;
}

// Everything the prerenderer renders: the sitemap routes plus the two legal
// pages (real routes in the app, linked from the footer, historically not in
// the sitemap).
export function getPrerenderRoutes() {
  const paths = getSitemapRoutes().map((r) => r.path);
  paths.push('/privacy-policy', '/terms-and-conditions');
  return paths;
}

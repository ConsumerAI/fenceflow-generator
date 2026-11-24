// Sitemap generation now lives in scripts/generate-sitemap.mjs, which builds
// the sitemap from the shared route data (scripts/routes.mjs) with a current
// lastmod date. It also runs automatically as part of `npm run build`
// (see scripts/prerender.mjs). This shim keeps `node generate-sitemap.js`
// working for manual regeneration of public/sitemap.xml.
import('./scripts/generate-sitemap.mjs')
  .then(async (mod) => {
    const fs = await import('node:fs');
    const path = await import('node:path');
    const out = path.join(__dirname, 'public', 'sitemap.xml');
    fs.writeFileSync(out, mod.buildSitemapXml());
    console.log('Sitemap regenerated in public/sitemap.xml');
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

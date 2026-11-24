// Build-time prerenderer.
//
// The site is a client-side React SPA: without this step every URL serves
// the same empty index.html shell and crawlers see no content. This script
// runs after `vite build` (client) and `vite build --ssr` (server bundle):
// it renders every route with the server bundle, merges the page's
// react-helmet-async head state (title / meta description / canonical /
// JSON-LD) into the template <head>, and writes one static HTML file per
// route into dist/. Vercel serves those files directly; the SPA bundle
// still loads on top for interactivity (lead form, calculator).
//
// It also writes dist/sitemap.xml with a build-date lastmod.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getPrerenderRoutes, getSitemapRoutes } from './routes.mjs';
import { buildSitemapXml } from './generate-sitemap.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');
const serverEntry = ['entry-server.mjs', 'entry-server.js']
  .map((name) => path.join(root, 'dist-server', name))
  .find((candidate) => fs.existsSync(candidate));
if (!serverEntry) {
  throw new Error('prerender: no entry-server bundle found in dist-server/ — run the SSR build first');
}

const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');

const serverModule = await import(serverEntry);
const render = serverModule.render ?? serverModule.default?.render;
if (typeof render !== 'function') {
  throw new Error('prerender: the entry-server bundle does not export a render() function');
}

function buildPage(appHtml, helmet) {
  let html = template;
  const extras = [];

  const helmetTitle = helmet?.title?.toString() ?? '';
  const helmetMeta = helmet?.meta?.toString() ?? '';
  const helmetLink = helmet?.link?.toString() ?? '';
  const helmetScript = helmet?.script?.toString() ?? '';
  const helmetStyle = helmet?.style?.toString() ?? '';

  // If the page set its own <title>, it replaces the template's site-wide one.
  if (helmetTitle) {
    html = html.replace(/<title>[\s\S]*?<\/title>/, '');
    extras.push(helmetTitle);
  }
  // If the page set its own meta description, drop the template's generic one
  // so the page ships exactly one description: its own.
  if (helmetMeta.includes('name="description"')) {
    html = html.replace(/<meta\s+name="description"[^>]*>/, '');
  }
  for (const chunk of [helmetMeta, helmetLink, helmetStyle, helmetScript]) {
    if (chunk) extras.push(chunk);
  }
  if (extras.length > 0) {
    html = html.replace('</head>', `${extras.join('\n')}\n</head>`);
  }

  return html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
}

const routes = getPrerenderRoutes();
let failures = 0;
for (const route of routes) {
  try {
    const { html: appHtml, helmet } = await render(route);
    const page = buildPage(appHtml, helmet);
    const outFile =
      route === '/'
        ? path.join(distDir, 'index.html')
        : path.join(distDir, route.slice(1), 'index.html');
    fs.mkdirSync(path.dirname(outFile), { recursive: true });
    fs.writeFileSync(outFile, page);
  } catch (error) {
    failures += 1;
    console.error(`[prerender] FAILED ${route}:`, error);
  }
}

fs.writeFileSync(path.join(distDir, 'sitemap.xml'), buildSitemapXml());

console.log(
  `[prerender] ${routes.length - failures}/${routes.length} routes prerendered; ` +
    `sitemap.xml written with ${getSitemapRoutes().length} URLs`
);
if (failures > 0) {
  process.exitCode = 1;
}

/**
 * Claims-safe structured data generator.
 *
 * Implements ~/workspace/fence-rebuild/seo/schema-spec.md.
 * Governing source: the claims register
 * (~/workspace/fence-rebuild/samples-v5/claims-to-verify.md). If this file
 * and the register disagree, the register wins and this file gets edited.
 *
 * Core rule: schema may only state a fact that (1) is visible in the page
 * copy in substantially the same words, (2) is approved or published in
 * the claims register, and (3) is about this page, this city and this
 * service. Anything else stays out, even if it is probably true.
 *
 * Hard bans enforced here (schema-spec banned list): no price, priceRange
 * or offers (register item 3: pricing lives only in the calculator); no
 * aggregateRating, review or testimonial markup; no fabricated counts
 * (jobs, matches, contractors, cities as a number, years); no superlatives
 * or ranking claims ("#1", "best", "top rated", "perfect match"); no
 * openingHours and no geo unless a real public premises is confirmed in
 * writing; no sameAs that is not a real owned profile; no email or
 * telephone until one is published in visible copy and confirmed as a
 * monitored contact; no "paid by the contractors, not by you" (item 14,
 * activation pending); no plural competing-bid language and no Fences
 * Texas confirmation call (removed claims register, Nov 24, 2026).
 */

export const SITE_URL = 'https://fencestexas.com';
export const BUSINESS_ID = 'https://fencestexas.com/#business';

/**
 * The 50 cities with rebuilt pages live on Nov 25, 2026 (wave 1 plus
 * wave 2). Register item 17 (coverage by ZIP and job type) is still open,
 * so the business areaServed claims only these cities, stated as a list,
 * never as a count. Do not add the other sitemap cities until their pages
 * are rebuilt and live.
 */
export const AREA_SERVED_CITIES = [
  // Wave 1
  'Dallas', 'Sherman', 'Fort Worth', 'Arlington', 'Plano', 'Frisco',
  'McKinney', 'Grapevine', 'Denton', 'Irving', 'Garland', 'Carrollton',
  'Richardson', 'Lewisville', 'Grand Prairie',
  // Wave 2
  'Allen', 'Anna', 'Bedford', 'Burleson', 'Cedar Hill', 'Celina',
  'Cleburne', 'Colleyville', 'Coppell', 'DeSoto', 'Duncanville', 'Euless',
  'Farmers Branch', 'Flower Mound', 'Forney', 'Haltom City', 'Hurst',
  'Keller', 'Lancaster', 'Little Elm', 'Mansfield', 'Mesquite',
  'Midlothian', 'Murphy', 'North Richland Hills', 'Prosper', 'Rockwall',
  'Rowlett', 'Sachse', 'Southlake', 'Terrell', 'The Colony', 'Watauga',
  'Waxahachie', 'Wylie',
];

export interface SchemaNode {
  '@type': string;
  [key: string]: unknown;
}

export function cityNode(name: string): SchemaNode {
  return {
    '@type': 'City',
    name,
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'TX',
      addressCountry: 'US',
    },
  };
}

export function areaServedCities(): SchemaNode[] {
  return AREA_SERVED_CITIES.map(cityNode);
}

/**
 * The single business node for every page, referenced by @id.
 * Type: LocalBusiness (schema-spec entity model choice, used site wide).
 * Description must be a plain factual sentence taken from the page copy.
 */
export function businessNode(description: string): SchemaNode {
  return {
    '@type': 'LocalBusiness',
    '@id': BUSINESS_ID,
    name: 'Fences Texas',
    url: `${SITE_URL}/`,
    description,
    areaServed: areaServedCities(),
  };
}

export function webSiteNode(): SchemaNode {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: 'Fences Texas',
  };
}

export function webPageNode(url: string, name: string): SchemaNode {
  return {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name,
    isPartOf: { '@id': BUSINESS_ID },
  };
}

export interface ServiceNodeOptions {
  /** Canonical page URL, used to build the node @id. */
  pageUrl: string;
  /** Service name exactly as it appears on the page or hub. */
  name: string;
  /** One or two sentences copied or closely condensed from visible copy. */
  description: string;
  /** Single city for a city page; omit for the full 50 city list. */
  cityName?: string;
  /** Fragment for the node @id when a page carries more than one Service. */
  idSuffix?: string;
}

export function serviceNode(opts: ServiceNodeOptions): SchemaNode {
  return {
    '@type': 'Service',
    '@id': `${opts.pageUrl}#${opts.idSuffix ?? 'service'}`,
    name: opts.name,
    serviceType: opts.name,
    provider: { '@id': BUSINESS_ID },
    areaServed: opts.cityName ? cityNode(opts.cityName) : areaServedCities(),
    description: opts.description,
  };
}

/**
 * Strip the lightweight markdown emphasis used in the content data files
 * and normalise whitespace, so schema text matches the rendered visible
 * text (schema-spec FAQ mirror rule: verbatim, formatting stripped only).
 */
export function plainText(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

export interface FaqItem {
  q: string;
  a: string;
}

/**
 * FAQPage node generated from the same data object that renders the
 * visible FAQ section (mirror rule). Never hand write FAQ schema.
 */
export function faqPageNode(pageUrl: string, faqs: FaqItem[]): SchemaNode {
  return {
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: plainText(faq.q),
      acceptedAnswer: {
        '@type': 'Answer',
        text: plainText(faq.a),
      },
    })),
  };
}

export function buildGraph(nodes: SchemaNode[]): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': nodes,
  });
}

/**
 * Service descriptions copied verbatim from the visible ServiceCard copy
 * in src/pages/[service].tsx, so schema states only what the page states.
 */
export const SERVICE_DESCRIPTIONS: Record<string, string> = {
  'Residential Fencing':
    'Beautiful, durable fencing solutions for homes across DFW, enhancing privacy, security, and property value.',
  'Commercial Fencing':
    'Secure, professional fencing for businesses, industrial sites, and commercial properties throughout the metroplex.',
  'Athletic Courts and Sports Facilities':
    'Specialized fencing for tennis courts, basketball courts, and other recreational areas with durability in mind.',
  'Access Control':
    'Custom gate solutions for controlled entry points, enhancing security while adding aesthetic appeal.',
  'Automatic Gates':
    'Sophisticated automated gate systems for convenient access control with remote operation and smart features.',
};

/** Canonical hub path for each published service. */
export const SERVICE_HUB_PATHS: Record<string, string> = {
  'Residential Fencing': '/residential-fencing',
  'Commercial Fencing': '/commercial-fencing',
  'Athletic Courts and Sports Facilities': '/sports-courts',
  'Access Control': '/access-control',
  'Automatic Gates': '/automatic-gates',
};

export const BUSINESS_DESCRIPTION_DFW =
  'Fences Texas connects Dallas Fort Worth homeowners with a local fence contractor.';

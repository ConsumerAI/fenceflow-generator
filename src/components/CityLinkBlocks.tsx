import React from 'react';
import { Link } from 'react-router-dom';
import { cityNeighbors, formatSlug } from '@/data/cityNeighbors';
import type { Wave1Page } from '@/data/wave1Content';

/**
 * Structural internal linking blocks for the rebuilt wave pages.
 * Purely additive: breadcrumbs, a service cross-link list for the page's
 * own city, and a short geographic neighbor list. No locked body copy,
 * claims, prices, or promise wording live here. Anchor text rotates
 * through descriptive variants so no single exact match phrase repeats
 * across the network. See the internal linking spec in
 * ~/workspace/fence-rebuild/seo/internal-linking-spec.md.
 */

const SERVICES: { slug: string; label: string }[] = [
  { slug: 'residential-fencing', label: 'Residential fencing' },
  { slug: 'commercial-fencing', label: 'Commercial fencing' },
  { slug: 'sports-courts', label: 'Sports courts and pickleball courts' },
  { slug: 'access-control', label: 'Access control' },
  { slug: 'automatic-gates', label: 'Automatic gates' },
];

const NEIGHBOR_ANCHORS = [
  (name: string) => `Fence installation in ${name}`,
  (name: string) => `${name} fence installation and quotes`,
  (name: string) => `See fence options in ${name}`,
  (name: string) => `Residential fencing in ${name}`,
  (name: string) => `Fences in nearby ${name}`,
];

function citySlugOf(page: Wave1Page): string {
  return page.slug.split('/')[0];
}

export function CityBreadcrumbs({ page }: { page: Wave1Page }) {
  const citySlug = citySlugOf(page);
  const isCourts = page.kind === 'courts';
  return (
    <nav aria-label="Breadcrumb" className="bg-white border-b border-secondary">
      <div className="container mx-auto px-4 py-3">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <li>
            <Link to="/" className="hover:text-texas-terracotta transition-colors">Home</Link>
          </li>
          <li aria-hidden="true">/</li>
          {isCourts ? (
            <>
              <li>
                <Link to={`/${citySlug}`} className="hover:text-texas-terracotta transition-colors">
                  {page.cityName}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-foreground font-medium">Sports Courts</li>
            </>
          ) : (
            <li aria-current="page" className="text-foreground font-medium">{page.cityName}</li>
          )}
        </ol>
      </div>
    </nav>
  );
}

export function CityLinkBlocks({ page }: { page: Wave1Page }) {
  const citySlug = citySlugOf(page);
  const neighbors = cityNeighbors[citySlug] ?? [];
  const isCourts = page.kind === 'courts';
  // A courts page excludes its own service (it is that page). A residential
  // city page lists all five city service pages, including its residential
  // companion page, so every city service URL gets an inbound link.
  const otherServices = isCourts
    ? SERVICES.filter((s) => s.slug !== 'sports-courts')
    : SERVICES;
  // Rotate the starting anchor variant by city so the network does not
  // stamp one identical anchor pattern onto every page.
  const offset = citySlug.split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0);

  return (
    <section className="py-12 bg-white border-t border-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-bold mb-4">
              {isCourts ? `More services in ${page.cityName}` : `Fence services in ${page.cityName}`}
            </h2>
            <ul className="space-y-2">
              {otherServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    to={`/${citySlug}/${service.slug}`}
                    className="text-texas-terracotta hover:text-texas-earth transition-colors"
                  >
                    {service.label} in {page.cityName}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to={isCourts ? '/sports-courts' : '/residential-fencing'}
                  className="text-texas-terracotta hover:text-texas-earth transition-colors"
                >
                  {isCourts
                    ? 'Sports court building across Dallas Fort Worth'
                    : 'Residential fencing across Dallas Fort Worth'}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">
              {isCourts
                ? `Sports courts near ${page.cityName}`
                : `Fence installation near ${page.cityName}`}
            </h2>
            <ul className="space-y-2">
              {neighbors.map((slug, i) => {
                const name = formatSlug(slug);
                const anchor = NEIGHBOR_ANCHORS[(offset + i) % NEIGHBOR_ANCHORS.length];
                const href = isCourts ? `/${slug}/sports-courts` : `/${slug}`;
                const text = isCourts ? `Sports courts in ${name}` : anchor(name);
                return (
                  <li key={slug}>
                    <Link to={href} className="text-texas-terracotta hover:text-texas-earth transition-colors">
                      {text}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CityLinkBlocks;

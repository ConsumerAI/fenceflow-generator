import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LeadForm from '@/components/LeadForm';
import { CityBreadcrumbs, CityLinkBlocks } from '@/components/CityLinkBlocks';
import { Button } from '@/components/ui/button';
import type { Wave1Page, PageSection, ContentBlock } from '@/data/wave1Content';

/**
 * Renderer for Wave 1 pages (locked v5 copy, generated into
 * src/data/wave1Content.ts by scripts/build-wave1-content.mjs).
 *
 * The proof slot renders the partner's real photo with a DESCRIPTIVE
 * caption only (claims item 15 / photo catalog caption honesty rule):
 * no location, footage, or customer claim attaches to a photo until the
 * partner confirms which job it depicts.
 */

const PROOF_PHOTOS: Record<Wave1Page['kind'], { src: string; alt: string; caption: string }> = {
  residential: {
    src: '/images/residential-board-on-board.jpg',
    alt: 'Board-on-board cedar privacy fence with trim and cap rail on a stone base in a suburban backyard',
    caption: 'Board-on-board cedar privacy fence with trim and cap, built on a stone base.',
  },
  courts: {
    src: '/images/pickleball-complex.jpg',
    alt: 'Pickleball court complex with blue playing surfaces, black chain-link enclosures, and LED court lighting',
    caption: 'Multi-court pickleball complex with LED lighting and chain-link enclosures.',
  },
};

export function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

function scrollToQuote(e: React.MouseEvent) {
  e.preventDefault();
  const formElement = document.getElementById('quote');
  if (formElement) {
    formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

function CtaBlock({ label, micro }: { label: string; micro: string }) {
  return (
    <div className="my-8 text-center">
      <Button
        className="w-full sm:w-auto h-[52px] px-10 text-base bg-texas-terracotta text-white hover:bg-texas-earth transition-colors"
        onClick={scrollToQuote}
      >
        {label}
      </Button>
      {micro && <p className="text-sm text-muted-foreground mt-3">{micro}</p>}
    </div>
  );
}

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'p':
      return <p className="text-muted-foreground leading-relaxed mb-4">{renderInline(block.text)}</p>;
    case 'pull':
      return (
        <div className="border-l-4 border-texas-terracotta bg-texas-terracotta/5 rounded-r-lg px-6 py-4 my-6">
          <p className="text-lg font-semibold text-foreground">{renderInline(block.text)}</p>
        </div>
      );
    case 'cta':
      return <CtaBlock label={block.label} micro={block.micro} />;
    case 'steps':
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          {block.items.map((item, i) => (
            <div key={i} className="bg-white rounded-lg p-6 shadow-sm border border-secondary">
              <div className="w-8 h-8 bg-texas-terracotta rounded-full flex items-center justify-center text-white font-bold mb-3">
                {i + 1}
              </div>
              {item.title && <h3 className="font-semibold mb-2">{renderInline(item.title)}</h3>}
              <p className="text-muted-foreground text-sm leading-relaxed">{renderInline(item.text)}</p>
            </div>
          ))}
        </div>
      );
    case 'faqs':
      return (
        <div className="space-y-6 my-8">
          {block.items.map((item, i) => (
            <article key={i} className="bg-secondary/20 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">{renderInline(item.q)}</h3>
              <p className="text-muted-foreground leading-relaxed">{renderInline(item.a)}</p>
            </article>
          ))}
        </div>
      );
    default:
      return null;
  }
}

function BodySection({ section, tinted }: { section: PageSection; tinted: boolean }) {
  return (
    <section className={`py-12 md:py-16 ${tinted ? 'bg-secondary/10' : 'bg-white'}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">{renderInline(section.heading)}</h2>
          {section.blocks.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Hero({ page }: { page: Wave1Page }) {
  const hero = page.sections[0];
  const proof = PROOF_PHOTOS[page.kind];
  return (
    <section className="py-16 md:py-20 bg-secondary/10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-5 animate-page-transition">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">{renderInline(hero.heading)}</h1>
            {hero.blocks.map((block, i) => {
              if (block.type === 'p') {
                return (
                  <p key={i} className="text-lg text-muted-foreground leading-relaxed">
                    {renderInline(block.text)}
                  </p>
                );
              }
              if (block.type === 'cta') {
                return (
                  <div key={i} className="pt-2">
                    <Button
                      className="w-full sm:w-auto h-[52px] px-10 text-base bg-texas-terracotta text-white hover:bg-texas-earth transition-colors"
                      onClick={scrollToQuote}
                    >
                      {block.label}
                    </Button>
                    {block.micro && <p className="text-sm text-muted-foreground mt-3">{block.micro}</p>}
                  </div>
                );
              }
              return <Block key={i} block={block} />;
            })}
            {page.hasProofSlot && (
              <figure className="pt-4">
                <img
                  src={proof.src}
                  alt={proof.alt}
                  className="rounded-lg shadow-md w-full max-w-md object-cover"
                  loading="lazy"
                />
                <figcaption className="text-sm text-muted-foreground mt-2">{proof.caption}</figcaption>
              </figure>
            )}
          </div>
          <div className="lg:ml-auto w-full max-w-lg animate-fade-in">
            <LeadForm city={page.cityName} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Wave1Layout({ page, canonicalPath }: { page: Wave1Page; canonicalPath: string }) {
  return (
    <>
      <Helmet>
        <title>{page.metaTitle}</title>
        <meta name="description" content={page.metaDescription} />
        <link rel="canonical" href={`https://fencestexas.com${canonicalPath}`} />
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main>
          <CityBreadcrumbs page={page} />
          <Hero page={page} />
          {page.sections.slice(1).map((section, i) => (
            <BodySection key={i} section={section} tinted={i % 2 === 1} />
          ))}
          <CityLinkBlocks page={page} />
          <section className="py-16 md:py-20 bg-texas-terracotta/10">
            <div className="container mx-auto px-4">
              <div className="max-w-lg mx-auto">
                <LeadForm city={page.cityName} />
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}

export function Wave1CityLayout({ page }: { page: Wave1Page }) {
  return <Wave1Layout page={page} canonicalPath={`/${page.slug}`} />;
}

export function Wave1ServiceLayout({ page }: { page: Wave1Page }) {
  return <Wave1Layout page={page} canonicalPath={`/${page.slug}`} />;
}

export default Wave1CityLayout;

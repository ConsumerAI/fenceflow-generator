import React from 'react';
import { Button } from '@/components/ui/button';
import { ServiceType } from '@/lib/types';
import SocialProof from '@/components/SocialProof';

/**
 * Static, build-time-rendered body content for city x service pages.
 *
 * This replaces DynamicContent, which generated copy in the visitor's
 * browser via a Supabase cache + OpenAI edge function and rendered
 * "No content available." whenever that pipeline failed. Content now ships
 * with the page: real, stable, and crawlable in the initial HTML. The copy
 * is templated per service for now — per-city unique content arrives in a
 * later phase of the rebuild.
 */

interface ServiceContentData {
  heading: string;
  intro: string[];
  itemsTitle: string;
  items: { name: string; description: string }[];
  benefitsTitle: string;
  benefits: { title: string; description: string }[];
}

const getContent = (cityName: string, serviceName: ServiceType): ServiceContentData => {
  switch (serviceName) {
    case ServiceType.ResidentialFencing:
      return {
        heading: `Residential Fencing in ${cityName}, Texas`,
        intro: [
          `A good fence does a lot of quiet work for a ${cityName} home: it keeps kids and dogs safely in the yard, gives you privacy from the street and the neighbors, and frames the whole property. Fences Texas connects ${cityName} homeowners with a local residential fencing specialist matched to the exact project — no calling around, no collecting bids from contractors who may or may not show up.`,
          `Most residential projects in ${cityName} are wood privacy fences, but the right answer depends on your lot, your HOA, and how long you plan to stay in the home. Your matched contractor will measure the yard, confirm property lines, and walk you through the material trade-offs before you commit to anything.`,
        ],
        itemsTitle: 'Materials Our Contractors Install',
        items: [
          { name: 'Cedar and Pine Privacy Fences', description: 'The DFW standard. Board-on-board or side-by-side styles, with steel posts that hold up to Texas clay soil movement.' },
          { name: 'Ornamental Iron and Aluminum', description: 'Open-view fencing for front yards, pools, and properties where a wood fence would block the view or break HOA rules.' },
          { name: 'Chain-Link', description: 'The budget-friendly workhorse for large lots, side yards, and dog runs — galvanized or black vinyl-coated.' },
          { name: 'Pool Mesh and Safety Fencing', description: 'Removable mesh and code-compliant barriers that keep pools safe for kids and pets.' },
        ],
        benefitsTitle: 'Why Homeowners Start With a Match',
        benefits: [
          { title: 'One Specialist, Not Five Sales Calls', description: 'You get matched with a single contractor who specializes in your type of project instead of fielding pitches from every fence company in the metroplex.' },
          { title: 'A Real Quote From a Real Measurement', description: 'Estimates are based on your actual yard — footage, gates, tear-out, and grade — verified on site before work begins.' },
          { title: 'Free to Use', description: 'The matching service costs homeowners nothing. You only pay the contractor you hire, for the work you approve.' },
        ],
      };
    case ServiceType.CommercialFencing:
      return {
        heading: `Commercial Fencing in ${cityName}, Texas`,
        intro: [
          `For ${cityName} businesses, a fence is security infrastructure: it controls who gets in, protects inventory and equipment, and defines the property line. Fences Texas matches commercial property owners and facility managers in ${cityName} with a contractor who specializes in commercial work — not a residential crew learning on your job.`,
          `Your matched specialist will assess the site, flag code and permitting requirements, and propose a system sized to the property, from a single dumpster enclosure to a full perimeter with controlled access points.`,
        ],
        itemsTitle: 'Commercial Systems We Match',
        items: [
          { name: 'Security Chain-Link', description: 'Galvanized or vinyl-coated, with barbed wire or razor ribbon options where the site calls for it.' },
          { name: 'Steel and Ornamental Frontage', description: 'A cleaner public face for retail, office, and multifamily properties that still need real perimeter control.' },
          { name: 'Industrial Perimeter Fencing', description: 'Heavy-gauge materials and posts set for warehouses, yards, and utility sites.' },
          { name: 'Enclosures and Gates', description: 'Dumpster enclosures, mechanical-yard screening, and manual or automated entry gates.' },
        ],
        benefitsTitle: 'Built for Business Timelines',
        benefits: [
          { title: 'Minimal Disruption', description: 'Commercial crews plan around your operating hours and keep access points working during the install.' },
          { title: 'Code and Permit Handling', description: 'Your contractor manages the local requirements for height, materials, and screening so the project passes inspection the first time.' },
          { title: 'One Point of Contact', description: 'A single matched specialist owns the project from site walk to final walkthrough.' },
        ],
      };
    case ServiceType.AthleticCourts:
      return {
        heading: `Athletic Courts and Sports Facilities in ${cityName}, Texas`,
        intro: [
          `Backyard courts have become one of the most requested projects in ${cityName}, and the fence around the court matters more than most people expect: it keeps balls in play, protects the surface, and — with the right height and wind screening — makes the court usable on windy Texas days. Fences Texas matches ${cityName} homeowners and facilities with contractors who build court enclosures as a specialty.`,
          `Whether it is a pickleball court in the backyard or a full tennis facility, your matched specialist will spec the enclosure height, mesh gauge, and gate placement for the sport you are building for.`,
        ],
        itemsTitle: 'Court Enclosure Options',
        items: [
          { name: 'Galvanized Chain-Link Enclosures', description: 'The standard for tennis and pickleball courts, typically 10–12 feet, with smaller mesh available to keep pickleballs from passing through.' },
          { name: 'Wind Screens and Privacy Panels', description: 'Cut the crosswind that ruins rallies and add privacy from neighboring lots.' },
          { name: 'Court Gates and Access Points', description: 'Wide, self-closing gates placed for play flow and maintenance equipment.' },
          { name: 'Multi-Sport Configurations', description: 'Enclosures designed for courts that split duty between pickleball, tennis, and basketball.' },
        ],
        benefitsTitle: 'Why Court Owners Use a Specialist',
        benefits: [
          { title: 'Spec\'d for the Sport', description: 'Ball behavior, fence height, and mesh size differ between tennis and pickleball — a court specialist gets those details right the first time.' },
          { title: 'Built for Texas Weather', description: 'Posts, tensioning, and coatings chosen for heat, wind load, and clay soil so the enclosure stays tight season after season.' },
          { title: 'One Matched Expert', description: 'You skip the general contractors guessing at court work and go straight to a builder who does it every week.' },
        ],
      };
    case ServiceType.AccessControl:
      return {
        heading: `Access Control Installation in ${cityName}, Texas`,
        intro: [
          `Access control is what turns a fence and gate into a security system: keypads, card readers, and telephone entry that decide who gets through and keep a record of it. Fences Texas connects ${cityName} property owners with access control specialists who design systems for everything from a single residential gate to multi-entry commercial properties.`,
          `Your matched specialist will evaluate your entry points, power and connectivity options, and how the system should integrate with your existing gates and fencing before recommending hardware.`,
        ],
        itemsTitle: 'Access Control Systems We Match',
        items: [
          { name: 'Keypad and PIN Entry', description: 'Simple, reliable entry codes for homes, ranches, and small facilities — no keys to lose or copy.' },
          { name: 'Card and Fob Readers', description: 'Per-user credentials you can revoke individually, with entry logs for commercial sites.' },
          { name: 'Telephone and Intercom Entry', description: 'Visitors call a directory or a phone number; you buzz them in from anywhere.' },
          { name: 'Smartphone-Based Access', description: 'App-controlled entry with remote unlock, guest passes, and activity history.' },
        ],
        benefitsTitle: 'Control Without the Hassle',
        benefits: [
          { title: 'Right-Sized Systems', description: 'From one gate to a full property, the system is designed around your actual entry points — not a package you have to fit into.' },
          { title: 'Integrated With Your Gates', description: 'Access hardware is matched to your gate operators and fencing so everything works as one system.' },
          { title: 'Local Specialist Support', description: 'Your installer is local to the ${cityName} area, so programming changes and service calls do not wait on a national call center.' },
        ],
      };
    case ServiceType.AutomaticGates:
      return {
        heading: `Automatic Gate Installation in ${cityName}, Texas`,
        intro: [
          `An automatic gate is the hardest-working part of a ${cityName} property's frontage: it opens in the rain, closes behind the kids, and keeps the driveway secure the rest of the time. Fences Texas matches ${cityName} homeowners and businesses with gate automation specialists who install and service complete systems — gate, operator, and access controls together.`,
          `Your matched expert will look at your driveway grade, gate weight, and power access, then recommend a swing or slide configuration that will cycle reliably for years, not just on install day.`,
        ],
        itemsTitle: 'Gate Systems We Match',
        items: [
          { name: 'Swing Gates', description: 'Single or dual swing, in iron, wood, or custom steel — the classic driveway entrance for flat lots.' },
          { name: 'Slide Gates', description: 'For sloped driveways and tight frontages where a swing gate has no room to travel.' },
          { name: 'Operators and Automation', description: 'Residential and commercial operators sized to the gate, with battery backup so a power outage never traps your car.' },
          { name: 'Safety and Access Add-Ons', description: 'Photo eyes, safety loops, keypads, and smartphone control integrated at install.' },
        ],
        benefitsTitle: 'Why Gate Owners Start With a Match',
        benefits: [
          { title: 'Correctly Sized From Day One', description: 'An undersized operator is the number one cause of early gate failures. A specialist matches the operator to the gate\'s true weight and cycle count.' },
          { title: 'Safety Built In', description: 'Modern entrapment protection and sensor placement are part of the install, not an afterthought.' },
          { title: 'One Specialist for the Whole System', description: 'Gate, operator, and access controls from a single matched installer — one call if anything ever needs service.' },
        ],
      };
    default:
      return {
        heading: `${String(serviceName)} in ${cityName}, Texas`,
        intro: [
          `Fences Texas connects ${cityName} property owners with a local specialist for ${String(serviceName).toLowerCase()} projects — matched to your property and your timeline, with a free, no-obligation estimate before any work begins.`,
        ],
        itemsTitle: 'What We Match',
        items: [
          { name: String(serviceName), description: `Professional ${String(serviceName).toLowerCase()} services across ${cityName} and the surrounding area.` },
        ],
        benefitsTitle: 'How It Works',
        benefits: [
          { title: 'Tell Us About the Project', description: 'A 15-second form captures your ZIP, service type, and timeline.' },
          { title: 'Get Matched', description: 'We connect you with the single most qualified local specialist for the job.' },
          { title: 'Approve Your Quote', description: 'You only pay for work you approve, after an on-site measurement.' },
        ],
      };
  }
};

interface StaticServiceContentProps {
  cityName: string;
  serviceName?: ServiceType;
}

const StaticServiceContent: React.FC<StaticServiceContentProps> = ({
  cityName,
  serviceName = ServiceType.ResidentialFencing,
}) => {
  const content = getContent(cityName, serviceName);

  const handleContactClick = () => {
    const quoteElement = document.getElementById('quote');
    if (quoteElement) {
      window.location.hash = 'quote';
      quoteElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      quoteElement.classList.add('animate-shake');
      setTimeout(() => {
        quoteElement.classList.remove('animate-shake');
      }, 2000);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <article>
            <div className="prose prose-lg max-w-none prose-headings:font-display prose-h2:text-3xl prose-h2:font-bold prose-h2:text-texas-earth prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-2xl prose-h3:font-semibold prose-h3:text-texas-terracotta prose-h3:mt-8 prose-h3:mb-4 prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4 prose-strong:text-foreground prose-strong:font-semibold prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6 prose-ul:space-y-2 prose-li:text-muted-foreground prose-li:marker:text-texas-terracotta">
              <h2 className="text-center">{content.heading}</h2>
              {content.intro.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}

              <h3>{content.itemsTitle}</h3>
              <ul>
                {content.items.map((item) => (
                  <li key={item.name}>
                    <strong>{item.name}</strong>: {item.description}
                  </li>
                ))}
              </ul>

              <h3>{content.benefitsTitle}</h3>
              {content.benefits.map((benefit) => (
                <p key={benefit.title}>
                  <strong>{benefit.title}</strong> — {benefit.description}
                </p>
              ))}
            </div>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                className="w-full sm:w-[240px] h-[48px] text-base bg-texas-terracotta text-white hover:bg-texas-earth transition-colors"
                onClick={handleContactClick}
              >
                Get Your Perfect Fence Match™
              </Button>
              <SocialProof />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default StaticServiceContent;

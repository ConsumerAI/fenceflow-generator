
import { ServiceType } from '@/lib/types';

interface LocalBusinessJsonLdProps {
  city?: string;
  service?: ServiceType;
}

export default function JsonLd({ city, service }: LocalBusinessJsonLdProps) {
  const businessData = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: 'Fences Texas',
    image: 'https://fencestexas.com/og-image.png',
    '@id': 'https://fencestexas.com',
    url: 'https://fencestexas.com',
    telephone: '+1-555-555-5555', // Update with real phone number
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Main St', // Update with real address
      addressLocality: 'Dallas',
      addressRegion: 'TX',
      postalCode: '75201',
      addressCountry: 'US'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 32.7767,
      longitude: -96.7970
    },
    areaServed: city ? `${city}, Texas` : 'Dallas/Fort Worth Metroplex',
    description: service 
      ? `Professional ${service.toLowerCase()} services in ${city || 'DFW'}. Expert installation and quality materials.`
      : 'Expert fence installation across Dallas/Fort Worth. Residential, commercial, sports courts, and automatic gates.',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Fence Installation Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Residential Fencing'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Commercial Fencing'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Sports Courts'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Access Control'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Automatic Gates'
          }
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(businessData) }}
    />
  );
}

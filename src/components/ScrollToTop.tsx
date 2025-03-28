import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

interface FAQItem {
  question: string;
  answer: string;
}

export interface SEOData {
  title?: string;
  description?: string;
  faqs?: FAQItem[];
  imageUrl?: string;
}

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const prevPathRef = useRef<string>(pathname);

  useEffect(() => {
    // Only scroll to top if the path has changed (not on initial render)
    if (prevPathRef.current !== pathname) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' // Use 'instant' instead of 'smooth' for better performance
      });
      
      // Update title for accessibility and SEO based on pathname
      const path = pathname.substring(1); // Remove leading slash
      if (path === '') {
        document.title = "Fences Texas | Top-Rated Fence Installation in DFW Metroplex";
      } else {
        // Format path for title (e.g., "dallas" -> "Dallas", "residential-fencing" -> "Residential Fencing")
        const formattedPath = path
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        
        document.title = `${formattedPath} | Fences Texas - Premier Fence Installation`;
      }
      
      // Mark that we've navigated
      prevPathRef.current = pathname;
    }
  }, [pathname]);

  // Get page-specific metadata
  const getPageMetadata = () => {
    // Default description
    let description = "Expert fence installation services across the DFW metroplex. Premium materials, skilled craftsmanship, and competitive pricing.";
    
    // Customize based on current page
    if (pathname === '/') {
      description = "Transform your property with beautiful, durable fencing by DFW's most trusted fence contractors. Get your free quote today!";
    } else if (pathname.includes('residential')) {
      description = "Beautiful residential fencing solutions for Dallas/Fort Worth homes. Enhance privacy, security & property value with our expert installation.";
    } else if (pathname.includes('commercial')) {
      description = "Secure commercial fencing solutions for DFW businesses. High-security perimeter fencing, gates & access control systems. Free quotes!";
    } else if (pathname.includes('sports')) {
      description = "Professional athletic courts and sports facilities including tennis courts, basketball courts & more. Durable materials & expert installation across DFW.";
    } else if (pathname.includes('automatic-gates')) {
      description = "Custom automatic gate solutions for DFW homes & businesses. Smart features, remote access & professional installation. Get a quote!";
    } else if (pathname.includes('near-me')) {
      description = "Looking for reliable fence companies near you in DFW? Fences Texas provides top-quality installation services across 100+ cities.";
    }
    
    return {
      description,
      // Add more metadata as needed
    };
  };

  // Construct the canonical URL
  const canonicalUrl = `https://fencestexas.com${pathname}`;
  const metadata = getPageMetadata();
  
  // Default FAQ schema for all pages
  const defaultFaqs: FAQItem[] = [
    {
      question: "What areas do you service in Texas?",
      answer: "We provide fence installation services across the entire Dallas/Fort Worth metroplex, including over 100 cities and communities."
    },
    {
      question: "What types of fencing do you install?",
      answer: "We install residential fencing, commercial fencing, athletic courts and sports facilities, access control systems, and automatic gates throughout the DFW area."
    },
    {
      question: "How long does fence installation take?",
      answer: "Most residential fence installations can be completed in 1-3 days, while commercial projects may take longer depending on the scope and complexity."
    }
  ];

  // Check if we're on the homepage - if so, skip adding the FAQ schema here
  // since Index.tsx already has its own FAQ schema
  const isHomePage = pathname === '/';

  return (
    <Helmet>
      <meta name="description" content={metadata.description} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Add next/prev links for paginated content if applicable */}
      {pathname.includes('/fence-companies-near-me') && (
        <>
          <link rel="next" href="https://fencestexas.com/residential-fencing" />
        </>
      )}
      
      {/* Add schema.org structured data for breadcrumbs */}
      {pathname !== '/' && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://fencestexas.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": document.title.split('|')[0].trim(),
                "item": canonicalUrl
              }
            ]
          })}
        </script>
      )}
      
      {/* Add schema.org LocalBusiness structured data to every page */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HomeAndConstructionBusiness",
          "subType": "FenceContractor", 
          "name": "Fences Texas",
          "description": "DFW's Premier Fence Installation Experts serving Dallas, Fort Worth and surrounding areas.",
          "url": "https://fencestexas.com",
          "telephone": "+1-214-555-5555",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Fence Lane",
            "addressLocality": "Dallas",
            "addressRegion": "TX",
            "postalCode": "75201",
            "addressCountry": "US"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 32.7767,
            "longitude": -96.7970
          },
          "areaServed": {
            "@type": "GeoCircle",
            "geoMidpoint": {
              "@type": "GeoCoordinates",
              "latitude": 32.7767,
              "longitude": -96.7970
            },
            "geoRadius": "100 mi"
          },
          "priceRange": "$$",
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "08:00",
              "closes": "18:00"
            },
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": "Saturday",
              "opens": "09:00",
              "closes": "15:00"
            }
          ]
        })}
      </script>
      
      {/* Add FAQ Schema only for pages that don't have their own FAQ schema */}
      {!isHomePage && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": defaultFaqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })}
        </script>
      )}
    </Helmet>
  );
}

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
    let description = "STOP wasting hours comparing fence contractors! Our Perfect Match system finds THE ONE perfect DFW fence pro for YOUR project. Others waste time, you get precision-matched expertise. 100% FREE.";
    
    // Customize based on current page
    if (pathname === '/') {
      description = "STOP wasting hours comparing fence contractors! Our Perfect Match system finds THE ONE perfect DFW fence pro for YOUR project. Others waste time, you get precision-matched expertise. 100% FREE.";
    } else if (pathname.includes('residential')) {
      description = "STOP wasting hours comparing fence contractors! Our Perfect Match system finds THE ONE perfect DFW fence pro for YOUR project. Others waste time, you get precision-matched expertise. 100% FREE.";
    } else if (pathname.includes('commercial')) {
      description = "STOP wasting hours comparing fence contractors! Our Perfect Match system finds THE ONE perfect DFW fence pro for YOUR project. Others waste time, you get precision-matched expertise. 100% FREE.";
    } else if (pathname.includes('sports')) {
      description = "STOP wasting hours comparing fence contractors! Our Perfect Match system finds THE ONE perfect DFW fence pro for YOUR project. Others waste time, you get precision-matched expertise. 100% FREE.";
    } else if (pathname.includes('automatic-gates')) {
      description = "STOP wasting hours comparing fence contractors! Our Perfect Match system finds THE ONE perfect DFW fence pro for YOUR project. Others waste time, you get precision-matched expertise. 100% FREE.";
    } else if (pathname.includes('near-me')) {
      description = "STOP wasting hours comparing fence contractors! Our Perfect Match system finds THE ONE perfect DFW fence pro for YOUR project. Others waste time, you get precision-matched expertise. 100% FREE.";
    } else if (pathname.includes('/')) {
      // Extract city name from pathname for city-specific pages
      const cityMatch = pathname.match(/\/([^\/]+)(?:\/|$)/);
      if (cityMatch && cityMatch[1]) {
        const city = cityMatch[1].replace(/-/g, ' ');
        description = `STOP wasting hours comparing fence contractors! Our Perfect Match system finds THE ONE perfect ${city} fence pro for YOUR project. Others waste time, you get precision-matched expertise. 100% FREE.`;
      }
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
          "@type": "LocalBusiness",
          "name": "Fences Texas",
          "description": metadata.description,
          "email": "info@fencestexas.com",
          "url": "https://fencestexas.com",
          "areaServed": {
            "@type": "City",
            "name": "Dallas-Fort Worth Metroplex",
            "address": {
              "@type": "PostalAddress",
              "addressRegion": "TX",
              "addressCountry": "US"
            }
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
      {!isHomePage && !pathname.includes('commercial-fencing') && (
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

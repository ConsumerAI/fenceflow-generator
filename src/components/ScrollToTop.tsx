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

  // Human-readable page name derived from the path. (This used to read
  // document.title during render, which crashes build-time prerendering
  // where no DOM exists.)
  const pageName = (pathname.split('/').filter(Boolean).pop() ?? '')
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  // Structured data note (schema-spec, SEO cycle 1): this component emits
  // only the BreadcrumbList below. The legacy LocalBusiness block
  // (priceRange, opening hours, unapproved description) and the generic
  // FAQPage block that used to live here were deleted, not edited: their
  // facts failed the claims register. Claims-safe schema is generated per
  // page by src/lib/schema.ts on the homepage, the service hubs and the
  // rebuilt wave pages. Legacy pages carry no business or FAQ schema
  // until their copy is rebuilt.

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
                "name": pageName,
                "item": canonicalUrl
              }
            ]
          })}
        </script>
      )}
      
    </Helmet>
  );
}


import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

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
        document.title = "Fences Texas | DFW's Premier Fence Installation Experts";
      } else {
        // Format path for title (e.g., "dallas" -> "Dallas", "residential-fencing" -> "Residential Fencing")
        const formattedPath = path
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        
        document.title = `${formattedPath} | Fences Texas`;
      }
      
      // Mark that we've navigated
      prevPathRef.current = pathname;
    }
  }, [pathname]);

  // Construct the canonical URL
  const canonicalUrl = `https://fencestexas.com${pathname}`;

  return (
    <Helmet>
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
    </Helmet>
  );
}

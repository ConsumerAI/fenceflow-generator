
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
  
  // Default FAQ schema for all pages
  const defaultFaqs: FAQItem[] = [
    {
      question: "What areas do you service in Texas?",
      answer: "We provide fence installation services across the entire Dallas/Fort Worth metroplex, including over 100 cities and communities."
    },
    {
      question: "What types of fencing do you install?",
      answer: "We install residential fencing, commercial fencing, sports courts, access control systems, and automatic gates throughout the DFW area."
    },
    {
      question: "How long does fence installation take?",
      answer: "Most residential fence installations can be completed in 1-3 days, while commercial projects may take longer depending on the scope and complexity."
    }
  ];

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
      
      {/* Add FAQ Schema for all pages */}
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
    </Helmet>
  );
}

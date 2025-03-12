import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LeadForm from '@/components/LeadForm';
import PlanToPickets from '@/components/PlanToPickets';
import ImageCarousel from '@/components/ImageCarousel';
import { CityContent, ServiceType } from '@/lib/types';
import { cities, getCityFromUrl } from '@/lib/cities';
import { supabase, generateCityContent } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';
import { marked } from 'marked';

const CityPage = () => {
  const { city: citySlug } = useParams<{ city: string }>();
  const navigate = useNavigate();
  const [cityContent, setCityContent] = useState<CityContent | null>(null);
  const [loading, setLoading] = useState(true);
  
  const cityName = getCityFromUrl(`/${citySlug}`);
  
  const scrollToQuote = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const quoteElement = document.getElementById('quote');
    
    if (quoteElement) {
      window.location.hash = 'quote';
      
      quoteElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
      
      quoteElement.classList.add('animate-shake');
      setTimeout(() => {
        quoteElement.classList.remove('animate-shake');
      }, 2000);
    }
  };

  useEffect(() => {
    if (!cityName) {
      navigate('/not-found');
      return;
    }
    
    const fetchContent = async () => {
      setLoading(true);
      try {
        const cachedContent = await supabase.getCachedContent(`/${citySlug}`);
        
        if (cachedContent) {
          setCityContent(cachedContent);
        } else {
          const newContent = await generateCityContent(cityName);
          setCityContent(newContent);
          
          await supabase.cacheContent(`/${citySlug}`, newContent);
        }
      } catch (error) {
        console.error('Error fetching city content:', error);
        const fallbackContent = await generateCityContent(cityName);
        setCityContent(fallbackContent);
      } finally {
        setLoading(false);
      }
    };
    
    fetchContent();
  }, [citySlug, cityName, navigate]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-texas-terracotta" />
            <p className="mt-4 text-muted-foreground">Loading content for {cityName}...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!cityContent) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Error Loading Content</h1>
            <p className="text-muted-foreground">Unable to load content for {cityName}.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  const serviceImages = {
    "Residential Fencing": "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/6d4752ad-e781-4bec-92ec-b07a9dc74a07/Board+on+Board+with+Trim+and+Cap.jpg",
    "Commercial Fencing": "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/4d9c257b-d4c7-4206-8aa5-22623aa2f863/301399581_23852070435550391_1586117276639848672_n.jpg",
    "Sports Courts": "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/1709258995381-OZJ85PI1IF9KHG170S1W/GettyImages-145988391.jpg",
    "Access Control": "/lovable-uploads/223b3ff5-7edb-4b9f-8993-449414f2518b.png",
    "Automatic Gates": "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/7426f5b7-ded7-4a47-bc45-c4cb46fec966/star+gate.jpg"
  };
  
  return (
    <>
      <Helmet>
        <title>{cityContent.metaTitle}</title>
        <meta name="description" content={cityContent.metaDescription} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Fences Texas",
            "description": `Fence installation services in ${cityName}, Texas`,
            "email": "info@fencestexas.com",
            "areaServed": {
              "@type": "City",
              "name": cityName,
              "address": {
                "@type": "PostalAddress",
                "addressRegion": "TX",
                "addressCountry": "US"
              }
            },
            "serviceArea": {
              "@type": "GeoCircle",
              "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": 32.7767,
                "longitude": -96.7970
              },
              "geoRadius": "100 mi"
            },
            "sameAs": [
              "https://www.fencestexas.com"
            ]
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <section className="pt-24 pb-16 md:pt-32 md:pb-24 texas-section">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-page-transition">
                <div className="inline-block px-4 py-1 bg-texas-terracotta/10 rounded-full text-texas-terracotta text-sm font-medium">
                  Serving {cityName}, Texas
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                  {cityContent.h1}
                </h1>
                <div 
                  className="text-lg text-muted-foreground prose prose-p:text-muted-foreground max-w-none" 
                  dangerouslySetInnerHTML={{ __html: marked.parse(cityContent.intro) }} 
                />
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <a 
                    href="#quote" 
                    onClick={scrollToQuote}
                    className="bg-texas-terracotta text-white px-6 py-3 rounded-md font-medium hover:bg-texas-earth transition-colors text-center"
                  >
                    Get a Free Quote
                  </a>
                </div>
                <div className="mt-6">
                  <img 
                    src="https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/6d4752ad-e781-4bec-92ec-b07a9dc74a07/Board+on+Board+with+Trim+and+Cap.jpg?format=1000w" 
                    alt={`Professional fence installation in ${cityName}`} 
                    className="rounded-lg shadow-md w-full max-w-md mx-auto h-auto"
                  />
                </div>
              </div>
              
              <div className="lg:ml-auto w-full max-w-lg animate-fade-in">
                <LeadForm city={cityName} />
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-12 md:py-16 bg-secondary/30">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold">Our Work in {cityName}</h2>
              <p className="text-muted-foreground mt-2">Browse through our gallery of fence installations</p>
            </div>
            <ImageCarousel />
            
            <div className="mt-10 flex justify-center">
              <a 
                href="#quote" 
                onClick={scrollToQuote}
                className="bg-texas-terracotta text-white px-6 py-3 rounded-md font-medium hover:bg-texas-earth transition-colors text-center"
              >
                Get a Free Quote
              </a>
            </div>
          </div>
        </section>
        
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-8">
            <div className="space-y-16">
              {Object.entries(cityContent.serviceSections).map(([serviceKey, content], index) => {
                const service = serviceKey as ServiceType;
                const isEven = index % 2 === 0;
                
                return (
                  <div 
                    key={service} 
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                      isEven ? '' : 'lg:flex-row-reverse'
                    }`}
                    id={service.toLowerCase().replace(/\s+/g, '-')}
                  >
                    <div 
                      className={`space-y-6 ${isEven ? '' : 'lg:order-2'}`}
                      style={{
                        opacity: 0,
                        animation: `staggerFade 0.5s ease forwards ${index * 0.1}s`
                      }}
                    >
                      <h2 className="text-3xl font-bold">{service} in {cityName}</h2>
                      <div 
                        className="prose prose-p:text-muted-foreground max-w-none"
                        dangerouslySetInnerHTML={{ __html: marked.parse(content) }} 
                      />
                      <div>
                        <a 
                          href="#quote" 
                          onClick={scrollToQuote}
                          className="inline-block bg-texas-terracotta text-white px-6 py-3 rounded-md font-medium hover:bg-texas-earth transition-colors text-center mt-4"
                        >
                          Get a Free Quote
                        </a>
                      </div>
                    </div>
                    
                    <div className={`${isEven ? 'lg:order-2' : ''}`}>
                      <div 
                        className="aspect-video overflow-hidden rounded-xl shadow-md"
                        style={{
                          opacity: 0,
                          animation: `staggerFade 0.5s ease forwards ${index * 0.1 + 0.2}s`
                        }}
                      >
                        <img 
                          src={serviceImages[service]} 
                          alt={`${service} in ${cityName}, Texas`} 
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-16 flex justify-center">
              <a 
                href="#quote" 
                onClick={scrollToQuote}
                className="bg-texas-terracotta text-white px-6 py-3 rounded-md font-medium hover:bg-texas-earth transition-colors text-center"
              >
                Get a Free Quote
              </a>
            </div>
          </div>
        </section>
        
        <PlanToPickets />
        
        <section className="py-16 md:py-24 bg-texas-earth text-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose Us for Your {cityName} Fence Installation
              </h2>
              <p className="text-white/80 max-w-2xl mx-auto">
                We're dedicated to providing the highest quality fence installations
                with exceptional service and craftsmanship.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cityContent.benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/20"
                  style={{
                    opacity: 0,
                    animation: `staggerFade 0.5s ease forwards ${index * 0.1}s`
                  }}
                >
                  <div className="w-12 h-12 rounded-full bg-texas-terracotta/20 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{benefit}</h3>
                </div>
              ))}
            </div>
            
            <div className="mt-10 flex justify-center">
              <a 
                href="#quote" 
                onClick={scrollToQuote}
                className="bg-texas-terracotta text-white px-6 py-3 rounded-md font-medium hover:bg-texas-earth transition-colors text-center"
              >
                Get a Free Quote
              </a>
            </div>
          </div>
        </section>
        
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">
                  Frequently Asked Questions
                </h2>
              </div>
              
              <div className="glass-card p-8">
                <h3 className="text-xl font-bold mb-4">
                  Why choose a fence in {cityName}?
                </h3>
                <div 
                  className="prose prose-p:text-muted-foreground max-w-none"
                  dangerouslySetInnerHTML={{ __html: marked.parse(cityContent.faq) }} 
                />
                
                <div className="mt-6 flex justify-center">
                  <a 
                    href="#quote" 
                    onClick={scrollToQuote}
                    className="bg-texas-terracotta text-white px-6 py-3 rounded-md font-medium hover:bg-texas-earth transition-colors text-center"
                  >
                    Get a Free Quote
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 md:py-24 bg-texas-terracotta/10" id="quote">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">
                  Ready for Your Fence in {cityName}?
                </h2>
                <div 
                  className="prose prose-p:text-muted-foreground max-w-none"
                  dangerouslySetInnerHTML={{ __html: marked.parse(cityContent.cta) }} 
                />
              </div>
              
              <div className="lg:ml-auto w-full max-w-lg">
                <LeadForm 
                  city={cityName} 
                  variant="minimal" 
                  className="shadow-xl border border-white/30" 
                />
              </div>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </>
  );
};

export default CityPage;

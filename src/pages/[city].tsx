
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LeadForm from '@/components/LeadForm';
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
  
  // Find the properly capitalized city name from the slug
  const cityName = getCityFromUrl(`/${citySlug}`);
  
  useEffect(() => {
    // If city doesn't exist in our list, redirect to 404
    if (!cityName) {
      navigate('/not-found');
      return;
    }
    
    const fetchContent = async () => {
      setLoading(true);
      try {
        // First try to get from cache
        const cachedContent = await supabase.getCachedContent(`/${citySlug}`);
        
        if (cachedContent) {
          setCityContent(cachedContent);
        } else {
          // If not in cache, generate new content
          const newContent = await generateCityContent(cityName);
          setCityContent(newContent);
          
          // Cache the content for future requests
          await supabase.cacheContent(`/${citySlug}`, newContent);
        }
      } catch (error) {
        console.error('Error fetching city content:', error);
        // Fallback to generate content locally if there's an error
        const fallbackContent = await generateCityContent(cityName);
        setCityContent(fallbackContent);
      } finally {
        setLoading(false);
      }
    };
    
    fetchContent();
  }, [citySlug, cityName, navigate]);
  
  // Render loading state while content is being fetched
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
  
  // If content still doesn't exist after loading, return error
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
  
  // Render city page with content
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
            "description": `New fence installation services in ${cityName}, Texas`,
            "telephone": "555-123-4567",
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
        
        {/* Hero Section */}
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
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="#quote" 
                    className="bg-texas-terracotta text-white px-6 py-3 rounded-md font-medium hover:bg-texas-earth transition-colors text-center"
                  >
                    Get a Free Quote
                  </a>
                  <a 
                    href="tel:555-123-4567" 
                    className="border border-texas-terracotta/30 bg-transparent text-texas-terracotta px-6 py-3 rounded-md font-medium hover:bg-texas-terracotta/10 transition-colors text-center"
                  >
                    Call: 555-123-4567
                  </a>
                </div>
              </div>
              
              <div className="lg:ml-auto w-full max-w-lg animate-fade-in">
                <LeadForm city={cityName} />
              </div>
            </div>
          </div>
        </section>
        
        {/* Images Section */}
        <section className="py-12 md:py-16 bg-secondary/30">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cityContent.images.map((image, index) => (
                <div 
                  key={index} 
                  className="aspect-video overflow-hidden rounded-xl shadow-md bg-white/50"
                  style={{
                    opacity: 0,
                    animation: `staggerFade 0.5s ease forwards ${index * 0.1 + 0.2}s`
                  }}
                >
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Services Sections */}
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
                          src="/placeholder.svg" 
                          alt={`${service} in ${cityName}, Texas`} 
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-16 md:py-24 bg-texas-earth text-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose Us for Your {cityName} Fence Installation
              </h2>
              <p className="text-white/80 max-w-2xl mx-auto">
                We're dedicated to providing the highest quality new fence installations
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
          </div>
        </section>
        
        {/* FAQ Section */}
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
                  Why choose a new fence in {cityName}?
                </h3>
                <div 
                  className="prose prose-p:text-muted-foreground max-w-none"
                  dangerouslySetInnerHTML={{ __html: marked.parse(cityContent.faq) }} 
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action Section */}
        <section className="py-16 md:py-24 bg-texas-terracotta/10">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">
                  Ready for Your New Fence in {cityName}?
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

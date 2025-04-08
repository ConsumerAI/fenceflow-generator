import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LeadForm from '@/components/LeadForm';
import PlanToPickets from '@/components/PlanToPickets';
import ImageCarousel from '@/components/ImageCarousel';
import DynamicContent from '@/components/DynamicContent';
import { CityContent, ServiceType } from '@/lib/types';
import { cities, getCityFromUrl } from '@/lib/cities';
import { supabase, generateCityContent } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';
import { marked } from 'marked';
import { Button } from '@/components/ui/button';
import ServiceCard from '@/components/ServiceCard';
import { MapPin } from 'lucide-react';

const CityPage = () => {
  const { city: citySlug } = useParams<{ city: string }>();
  const navigate = useNavigate();
  const [cityContent, setCityContent] = useState<CityContent | null>(null);
  const [loading, setLoading] = useState(true);
  
  const cityName = getCityFromUrl(`/${citySlug}`);
  
  const scrollToQuote = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
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
    "Athletic Courts and Sports Facilities": "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/1709258995381-OZJ85PI1IF9KHG170S1W/GettyImages-145988391.jpg",
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
              "https://fencestexas.com"
            ]
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main>
          {/* Hero Section */}
          <section className="py-20 bg-secondary/10">
            <div className="container mx-auto px-4">
              <div className="inline-block px-4 py-1 mb-4 bg-red-100 text-texas-terracotta rounded-full text-sm">
                DFW's #1 Fence Contractor Network
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Fence Installation<br />
                Across <span className="text-texas-terracotta">{cityName}</span>
              </h1>
              <p className="text-muted-foreground mt-4 max-w-3xl mb-8">
                {cityName} homeowners trust us to match them with their perfect fence contractor. From residential privacy fences 
                to commercial security installations and automated gate systems, we connect you with one verified local expert 
                who's precisely right for your project. No multiple calls or comparing quotes - just one perfect match.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
                <Button 
                  onClick={scrollToQuote}
                  className="w-full sm:w-[240px] h-[48px] text-base bg-texas-terracotta text-white hover:bg-texas-earth transition-colors"
                >
                  Get Your Perfect Fence Match™
                </Button>
                
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white overflow-hidden">
                      <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white overflow-hidden">
                      <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white overflow-hidden">
                      <img src="https://randomuser.me/api/portraits/men/86.jpg" alt="" />
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold">732+</span> homeowners matched this week
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-texas-terracotta/10 rounded-full">
                  <svg className="w-5 h-5 text-texas-terracotta" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-sm font-medium text-texas-terracotta whitespace-nowrap">Triple-Verified</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-texas-terracotta/10 rounded-full">
                  <svg className="w-5 h-5 text-texas-terracotta" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-sm font-medium text-texas-terracotta whitespace-nowrap">100% Free Service</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-texas-terracotta/10 rounded-full">
                  <svg className="w-5 h-5 text-texas-terracotta" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-sm font-medium text-texas-terracotta whitespace-nowrap">Saves Time & Money</span>
                </div>
              </div>
            </div>
          </section>

          {/* Plan to Pickets Process Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <div className="inline-block px-4 py-1 mb-4 bg-red-100 text-texas-terracotta rounded-full text-sm">
                  Our Proven Process
                </div>
                <h2 className="text-4xl font-bold mb-4">Our "Plan to Pickets" Process</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Our simple 4-step process takes less than 15 seconds and connects you with top fence pros in your area
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-8 h-8 bg-texas-terracotta rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">1</div>
                  <h3 className="font-semibold mb-2">Tell Us About Your Project</h3>
                  <p className="text-muted-foreground">Answer a few quick questions about your fence needs, property, and timeline. It only takes 15 seconds.</p>
                </div>

                <div className="text-center">
                  <div className="w-8 h-8 bg-texas-terracotta rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">2</div>
                  <h3 className="font-semibold mb-2">Perfect Match™ System</h3>
                  <p className="text-muted-foreground">Our Perfect Match™ System identifies the ONE contractor who's ideal for your specific needs.</p>
                </div>

                <div className="text-center">
                  <div className="w-8 h-8 bg-texas-terracotta rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">3</div>
                  <h3 className="font-semibold mb-2">Direct Connection</h3>
                  <p className="text-muted-foreground">You'll be connected directly to your Perfect Match™ contractor.</p>
                </div>

                <div className="text-center">
                  <div className="w-8 h-8 bg-texas-terracotta rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">4</div>
                  <h3 className="font-semibold mb-2">Expert Installation</h3>
                  <p className="text-muted-foreground">Get your fence installed by a verified expert who specializes in your project type.</p>
                </div>
              </div>

              <div className="mt-8 text-center max-w-3xl mx-auto">
                <p className="text-muted-foreground mb-8">
                  Our matching service is 100% free, with no obligation. We never share your information with multiple contractors, only your Perfect Match™, saving you countless hours and eliminating the hassle of fielding dozens of phone calls, setting up multiple site inspections, and trying to figure who is the best quality and the best price. We've done it for you.
                </p>
              </div>

              <div className="mt-12 text-center">
                <Button 
                  onClick={scrollToQuote}
                  className="bg-texas-terracotta text-white hover:bg-texas-earth transition-colors"
                >
                  Find Your Fence Pro
                </Button>
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-texas-terracotta bg-texas-terracotta/10 inline-block px-4 py-2 rounded-full">
                  Pro Tip: The best time to schedule fence installations is 4-5 weeks in advance. With current demand, we recommend starting your search early.
                </p>
              </div>
            </div>
          </section>

          {/* Recent Projects Section */}
          <section className="py-12 md:py-16 bg-secondary/30">
            <div className="container mx-auto px-4 md:px-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold">Recent Projects from Our Verified Contractors in {cityName}</h2>
                <p className="text-muted-foreground mt-2">Browse through our gallery of fence installations in {cityName}. Each project showcases our commitment to quality and craftsmanship.</p>
              </div>
              <ImageCarousel />
              
              <div className="mt-10 flex justify-center">
                <Button 
                  className="w-full sm:w-[240px] h-[48px] text-base bg-texas-terracotta text-white hover:bg-texas-earth transition-colors"
                  onClick={scrollToQuote}
                >
                  Find Your Fence Pro
                </Button>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Our Fence Installation Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Object.entries(cityContent.serviceSections).map(([serviceKey, content], index) => {
                  const service = serviceKey as ServiceType;
                  return (
                    <ServiceCard 
                      key={service} 
                      service={{ 
                        title: service,
                        description: content,
                        icon: serviceImages[service],
                        benefits: []
                      }} 
                      index={index}
                    />
                  );
                })}
              </div>
            </div>
          </section>

          {/* About Us Section */}
          <section className="py-16 bg-texas-terracotta/5">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">About FencesTexas</h2>
                <div className="prose prose-lg mx-auto">
                  <p className="text-center mb-6">
                    FencesTexas takes the guesswork out of finding the right fence contractor in Dallas/Fort Worth. 
                    Unlike other services that sell your information to multiple companies, we use our proprietary 
                    Perfect Match™ system to connect you with just ONE contractor - the ideal professional for your 
                    specific project.
                  </p>
                  <p className="text-center mb-6">
                    Our rigorous 27-point verification process eliminates 81% of local fence companies, ensuring 
                    you're only matched with contractors who deliver exceptional quality, reliability, and value. 
                    We understand the unique challenges of Texas fence installation - from soil conditions to HOA 
                    requirements to withstanding extreme weather.
                  </p>
                  <p className="text-center mb-6">
                    When you use FencesTexas, you'll never be bombarded with calls from competing contractors. 
                    Your information is treated with respect, and you're matched with a single pre-screened expert 
                    who specializes in exactly what you need.
                  </p>
                </div>
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
                    Why choose a fence in {cityName}?
                  </h3>
                  <div 
                    className="prose prose-p:text-muted-foreground max-w-none"
                    dangerouslySetInnerHTML={{ __html: marked.parse(cityContent.faq) }} 
                  />
                  
                  <div className="mt-6 flex justify-center">
                    <Button 
                      className="bg-texas-terracotta text-white hover:bg-texas-earth transition-colors"
                      onClick={scrollToQuote}
                    >
                      Find Your Fence Pro
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Bottom Lead Form Section */}
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
        </main>
      </div>
    </>
  );
};

export default CityPage;

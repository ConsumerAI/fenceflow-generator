import React, { Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet-async';
import LeadForm from '@/components/LeadForm';
import ServiceCard from '@/components/ServiceCard';
import Navbar from '@/components/Navbar';
import { ServiceType } from '@/lib/types';
import { cities } from '@/lib/cities';
import { SERVICE_IMAGES } from '@/lib/images';
import { cn } from '@/lib/utils';
import { serviceRouteMap } from '@/lib/routes';
import { Button } from '@/components/ui/button';
import SocialProof from '@/components/SocialProof';

// Lazy load components that aren't immediately visible
const DynamicContent = lazy(() => import('@/components/DynamicContent'));
const PlanToPickets = lazy(() => import('@/components/PlanToPickets'));
const ImageCarousel = lazy(() => import('@/components/ImageCarousel'));
const Footer = lazy(() => import('@/components/Footer'));

interface CityServicePageProps {
  city: string;
  service: string;
}

const CityServicePage: React.FC<CityServicePageProps> = ({ city, service }) => {
  if (!city || !service) {
    return <div>Error: City and service must be provided in the URL.</div>;
  }

  // Format the city and service names
  const formatString = (str: string): string => {
    return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const formattedCity = formatString(city);
  
  // Get service type from route map
  const serviceType = serviceRouteMap[service];
  
  if (!serviceType) {
    return <div>Error: Invalid service type.</div>;
  }

  // Get service-specific content
  const getServiceContent = (type: ServiceType) => {
    switch(type) {
      case ServiceType.CommercialFencing:
        return {
          headline: `Fast, Quality Commercial Fencing in ${formattedCity}`,
          subHeadline: `Your Hassle-Free Perfect Contractor Match`,
          paragraph1: `What if finding your ideal ${formattedCity} commercial fencing contractor took less time than reading this paragraph? FencesTexas eliminates the frustrations business owners face—multiple contractor calls, conflicting quotes, and wasted hours.`,
          paragraph2: `Our proprietary matching algorithm identifies the single most qualified local specialist for your exact project needs. While others waste days comparison shopping, ${formattedCity} businesses who use our 15-second matching service move directly to project execution, securing their properties faster and with complete confidence.`
        };
      case ServiceType.ResidentialFencing:
        return {
          headline: `Effortless Residential Fencing in ${formattedCity}`,
          subHeadline: `We Guarantee the Perfect Contractor for Your Project`,
          paragraph1: `Tired of the time-consuming hassle of researching countless residential fence contractors in ${formattedCity}, sifting through conflicting quotes, and wondering if you've made the right choice? FencesTexas eliminates that frustration.`,
          paragraph2: `Our revolutionary matching system does the heavy lifting, connecting you with the *single*, most qualified and specialized residential fence installation expert for your exact project needs in ${formattedCity} – guaranteed. Say goodbye to wasted hours and hello to a seamless, confident path to the perfect fence for your home.`
        };
      case ServiceType.AthleticCourts:
        return {
          headline: "Stop Planning, Start Playing",
          subHeadline: `Your Dedicated Sports Facility Expert in ${formattedCity} - Built for Performance.`,
          paragraph1: `Ready to transform your ${formattedCity} property with a professional athletic court? Skip the endless contractor search. Our network includes the area's most qualified court construction specialists, ready to bring your vision to life.`,
          paragraph2: `From tennis courts to pickleball facilities, we match you with the top contractor who understands the unique requirements of athletic court construction on YOUR property. Get connected with your perfect contractor in just 15 seconds.`
        };
      case ServiceType.AccessControl:
        return {
          headline: `Top-Rated Access Control Installation in ${formattedCity}`,
          subHeadline: `Fast, Precise Matching to Your Ideal Security Specialist.`,
          paragraph1: `Finding the right access control specialist in ${formattedCity} shouldn't be a security risk itself. Our Perfect Match system connects you with the top local contractor who specializes in your exact needs. From basic keypads to advanced multi-point systems. We have an expert for your job.`,
          paragraph2: `Don't compromise on security. While others are collecting quotes from random contractors, you'll be one step closer to a secure property. Get matched with your ideal access control specialist in just 15 seconds.`
        };
      case ServiceType.AutomaticGates:
        return {
          headline: `Effortless Automatic Gate Installation in ${formattedCity}`,
          subHeadline: `Get Your Perfect Expert Match - Instantly!`,
          paragraph1: `Looking for automatic gate installation in ${formattedCity}? Skip the hassle of comparing multiple bids. We'll match you with the perfect local expert who specializes in your exact type of gate automation project.`,
          paragraph2: `While others spend days researching contractors, you'll be designing your dream entrance. Our Perfect Match™ system finds your ideal gate automation specialist in just 15 seconds.`
        };
      default:
        return {
          headline: `Find Your Perfect Fence Pro in ${formattedCity}`,
          subHeadline: `Your Perfect Local Match - Fast & Easy!`,
          paragraph1: `What if finding your ideal ${formattedCity} ${String(serviceType).toLowerCase()} contractor took less time than reading this paragraph? FencesTexas eliminates the frustrations property owners face—multiple contractor calls, conflicting quotes, and wasted hours.`,
          paragraph2: `Our proprietary matching algorithm identifies the single most qualified local specialist for your exact project needs. While others waste days comparison shopping, you'll be working with the perfect contractor for your specific requirements.`
        };
    }
  };

  const content = getServiceContent(serviceType);

  const breadcrumbLinks = [
    { to: '/', label: 'Home' },
    { to: `/${city}`, label: formattedCity },
    { to: `/${city}/${service}`, label: String(serviceType) },
  ];

  const handleQuoteClick = () => {
    // Implement the logic to handle the quote click
  };

  const scrollToQuote = () => {
    // Implement the logic to scroll to the quote section
  };

  return (
    <>
      <Helmet>
        <title>{`${serviceType} in ${formattedCity} | Fences Texas`}</title>
        <meta
          name="description"
          content={`Expert fence installation in ${formattedCity}. Transform your space with ${String(serviceType).toLowerCase()} services from the area's top contractors. Get matched with your perfect fence pro today!`}
        />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main>
          <section className="py-20 bg-secondary/10">
            <div className="container mx-auto px-4 md:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6 animate-page-transition">
                  <div className="inline-block px-4 py-1 bg-texas-terracotta/10 rounded-full text-texas-terracotta text-sm font-medium">
                    {`${formattedCity}'s #1 Fence Contractor Network`}
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                    {content.headline}
                    <div className="text-2xl md:text-3xl lg:text-4xl text-muted-foreground mt-2">
                      {content.subHeadline}
                    </div>
                  </h1>
                  <p className="text-muted-foreground mt-4 max-w-3xl mx-auto text-center">
                    {content.paragraph1}
                  </p>
                  <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button 
                      className="w-full sm:w-[240px] h-[48px] text-base bg-texas-terracotta text-white hover:bg-texas-earth transition-colors"
                      onClick={scrollToQuote}
                    >
                      Get Your Perfect Fence Match™
                    </Button>
                    <SocialProof />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 mt-6">
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
                
                <div className="lg:ml-auto w-full max-w-lg animate-fade-in">
                  <LeadForm city={formattedCity} />
                </div>
              </div>
            </div>
          </section>

          {/* Dynamic City-Specific Content */}
          <section className="py-8 md:py-12 bg-gray-50">
            <div className="container mx-auto px-4">
              <Suspense fallback={
                <div className="py-8 flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-texas-terracotta"></div>
                </div>
              }>
                <DynamicContent 
                  cityName={formattedCity} 
                  serviceName={serviceType}
                />
              </Suspense>
            </div>
          </section>
          
          <Suspense fallback={<div className="h-[200px]" />}>
            <PlanToPickets />
          </Suspense>

          <Suspense fallback={<div className="h-[200px]" />}>
            <ImageCarousel />
          </Suspense>

          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-8">Related Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Object.values(ServiceType).map((relatedService) => {
                  return (
                    <ServiceCard
                      key={String(relatedService)}
                      service={{
                        title: String(relatedService),
                        description: `Learn more about our ${String(relatedService).toLowerCase()} services in ${formattedCity}.`,
                        icon: SERVICE_IMAGES[relatedService],
                        benefits: ['Professional Installation', 'High-Quality Materials', 'Exceptional Customer Service']
                      }}
                      index={Object.values(ServiceType).indexOf(relatedService)}
                      city={city}
                    />
                  );
                })}
              </div>
            </div>
          </section>
        </main>
        
        <Suspense fallback={<div className="h-[100px]" />}>
          <Footer />
        </Suspense>
      </div>
    </>
  );
};

export default CityServicePage;

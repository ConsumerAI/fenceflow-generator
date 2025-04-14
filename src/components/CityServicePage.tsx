import React, { Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';
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

// Lazy load components that aren't immediately visible
const DynamicContent = lazy(() => import('@/components/DynamicContent'));
const PlanToPickets = lazy(() => import('@/components/PlanToPickets'));
const ImageCarousel = lazy(() => import('@/components/ImageCarousel'));
const Footer = lazy(() => import('@/components/Footer'));

interface CityServicePageProps {}

const CityServicePage: React.FC<CityServicePageProps> = () => {
  const { city, service } = useParams<{ city: string; service: string }>();

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
          content={`Transform your space with ${String(serviceType).toLowerCase()} services in ${formattedCity}. Contact us to get your perfect fence!`}
        />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1">
          <section className="py-20 bg-secondary/10">
            <div className="container mx-auto px-4 md:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6 animate-page-transition">
                  <div className="inline-block px-4 py-1 bg-texas-terracotta/10 rounded-full text-texas-terracotta text-sm font-medium">
                    {`${formattedCity}'s #1 ${serviceType} Contractor Network`}
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground lg:text-6xl">
                    <span>Stop <span className="text-texas-terracotta">Searching</span>, Start <span className="text-texas-terracotta">Building</span></span>
                    <div className="text-2xl md:text-3xl lg:text-4xl text-muted-foreground mt-2 my-[10px]">
                      One Perfect {serviceType} Contractor in {formattedCity}
                    </div>
                  </h1>
                  <p className="text-muted-foreground mt-4 max-w-3xl mx-auto text-justify">
                    What if finding your ideal {formattedCity} {String(serviceType).toLowerCase()} contractor took less time than reading this paragraph? FencesTexas eliminates the frustrations business owners face—multiple contractor calls, conflicting quotes, and wasted hours.
                  </p>
                  <p className="text-muted-foreground mt-4 max-w-3xl mx-auto text-justify">
                    Our proprietary matching algorithm identifies the single most qualified local specialist for your exact project needs. While others waste days comparison shopping, {formattedCity} businesses who use our 15-second matching service move directly to project execution, securing their properties faster and with complete confidence.
                  </p>
                  <div className="flex flex-wrap gap-4">
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

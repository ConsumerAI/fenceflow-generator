import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import LeadForm from '@/components/LeadForm';
import ServiceCard from '@/components/ServiceCard';
import PlanToPickets from '@/components/PlanToPickets';
import ImageCarousel from '@/components/ImageCarousel';
import DynamicContent from '@/components/DynamicContent';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ServiceType } from '@/lib/types';
import { cities } from '@/lib/cities';
import { SERVICE_IMAGES } from '@/lib/images';
import { cn } from '@/lib/utils';
import { serviceRouteMap } from '@/lib/routes';

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

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{`${serviceType} in ${formattedCity} | Fences Texas`}</title>
        <meta
          name="description"
          content={`Transform your space with ${String(serviceType).toLowerCase()} services in ${formattedCity}. Contact us to get your perfect fence!`}
        />
      </Helmet>

      <Navbar />

      <main className="flex-1">
        <section className="bg-texas-terracotta/10 py-16 md:py-24">
          <div className="container mx-auto px-4">
            {/* Use custom Breadcrumbs component which accepts links prop */}
            <nav className="mb-4 text-sm">
              <ol className="flex items-center space-x-2">
                {breadcrumbLinks.map((link, index) => (
                  <li key={index} className="flex items-center">
                    {index > 0 && <span className="mx-2">/</span>}
                    <a href={link.to} className={cn(
                      "hover:text-texas-terracotta",
                      index === breadcrumbLinks.length - 1 ? "font-semibold" : ""
                    )}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
              {serviceType} in {formattedCity}
            </h1>
            <p className="text-lg text-center text-gray-700">
              Your trusted source for quality fencing and athletic court services in the {formattedCity} area.
            </p>
          </div>
        </section>

        <DynamicContent 
          cityName={formattedCity} 
          serviceName={serviceType}
        />
        
        <PlanToPickets />

        <ImageCarousel />

        <section id="quote" className="py-16 md:py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Get Your Perfect Fence</h2>
            <LeadForm city={formattedCity} />
          </div>
        </section>

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

      <Footer />
    </div>
  );
};

export default CityServicePage;

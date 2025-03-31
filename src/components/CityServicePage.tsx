import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CITY_DATA } from '@/lib/cities';
import { capitalizeWords } from '@/lib/utils';
import LeadForm from '@/components/LeadForm';
import ServiceCard from '@/components/ServiceCard';
import PlanToPickets from '@/components/PlanToPickets';
import ImageCarousel from '@/components/ImageCarousel';
import Breadcrumbs from '@/components/Breadcrumbs';
import { ServiceType } from '@/lib/types';
import { SERVICE_IMAGES } from '@/lib/supabase';
import DynamicContent from '@/components/DynamicContent';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

interface CityServicePageProps {}

const CityServicePage: React.FC<CityServicePageProps> = () => {
  const { city, service } = useParams<{ city: string; service: string }>();

  if (!city || !service) {
    return <div>Error: City and service must be provided in the URL.</div>;
  }

  const cityData = CITY_DATA.find((c) => c.url === city);
  const formattedCity = cityData ? cityData.name : capitalizeWords(city.replace(/-/g, ' '));
  const formattedService = capitalizeWords(service.replace(/-/g, ' ')) as ServiceType;

  if (!Object.values(ServiceType).includes(formattedService)) {
    return <div>Error: Invalid service type.</div>;
  }

  const breadcrumbLinks = [
    { to: '/', label: 'Home' },
    { to: `/${city}`, label: formattedCity },
    { to: `/${city}/${service}`, label: formattedService },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{`${formattedService} in ${formattedCity} | Fences Texas`}</title>
        <meta
          name="description"
          content={`Get the best ${formattedService.toLowerCase()} services in ${formattedCity}. Contact us for a free quote!`}
        />
      </Helmet>

      <Navbar />

      <main className="flex-1">
        <section className="bg-texas-terracotta/10 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <Breadcrumbs links={breadcrumbLinks} />

            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
              {formattedService} in {formattedCity}
            </h1>
            <p className="text-lg text-center text-gray-700">
              Your trusted source for quality fencing and athletic court services in the {formattedCity} area.
            </p>
          </div>
        </section>

        {cityData && (
          <DynamicContent 
            cityName={cityData.name} 
            serviceName={formattedService as ServiceType}
          />
        )}
        
        <PlanToPickets />

        <ImageCarousel images={SERVICE_IMAGES} />

        <section id="quote" className="py-16 md:py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Get a Free Quote</h2>
            <LeadForm city={formattedCity} service_type={formattedService} />
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Related Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.values(ServiceType).map((relatedService) => (
                <ServiceCard
                  key={relatedService}
                  title={relatedService}
                  description={`Learn more about our ${relatedService.toLowerCase()} services in ${formattedCity}.`}
                  imageUrl={SERVICE_IMAGES[relatedService]}
                  linkTo={`/${city}/${relatedService.toLowerCase().replace(/ /g, '-')}`}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CityServicePage;

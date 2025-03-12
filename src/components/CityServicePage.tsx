
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import LeadForm from './LeadForm';
import { cities, getCityFromUrl } from '@/lib/cities';
import { ServiceType } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import { supabase, generateCityContent } from '@/lib/supabase';

interface CityServicePageProps {
  service: ServiceType;
}

const CityServicePage: React.FC<CityServicePageProps> = ({ service }) => {
  const { city: citySlug } = useParams<{ city: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const [content, setContent] = React.useState<any>(null);
  
  const cityName = getCityFromUrl(`/${citySlug}`);
  
  React.useEffect(() => {
    if (!cityName) {
      navigate('/not-found');
      return;
    }
    
    const fetchContent = async () => {
      setLoading(true);
      try {
        const cachedContent = await supabase.getCachedContent(`/${citySlug}/${service.toLowerCase()}`);
        if (cachedContent) {
          setContent(cachedContent);
        } else {
          const newContent = await generateCityContent(cityName);
          setContent(newContent);
          await supabase.cacheContent(`/${citySlug}/${service.toLowerCase()}`, newContent);
        }
      } catch (error) {
        console.error('Error fetching city service content:', error);
        const fallbackContent = await generateCityContent(cityName);
        setContent(fallbackContent);
      } finally {
        setLoading(false);
      }
    };
    
    fetchContent();
  }, [citySlug, cityName, navigate, service]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-texas-terracotta" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p>Error loading content</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${service} in ${cityName} | Fences Texas`}</title>
        <meta name="description" content={`Professional ${service.toLowerCase()} services in ${cityName}, TX. Get a free quote today!`} />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1">
          <section className="pt-24 pb-16 md:pt-32 md:pb-24 texas-section">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {service} in {cityName}, Texas
              </h1>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="prose prose-lg max-w-none">
                  <p>{content.serviceSections[service]}</p>
                </div>
                <div className="lg:ml-auto w-full max-w-lg">
                  <LeadForm city={cityName} />
                </div>
              </div>
            </div>
          </section>
          
          {/* Add more sections as needed */}
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default CityServicePage;

import { supabaseInstance, generateCityContent } from '../lib/supabase';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import React, { useEffect, useState } from 'react';
import { CityContent } from '../lib/types';
import { isCityValid } from '../lib/cities';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NotFound from './NotFound';
import DynamicContent from '../components/DynamicContent';
import Breadcrumbs from '../components/Breadcrumbs';
import { Button } from "@/components/ui/button";

const CityPage = () => {
  const { city } = useParams<{ city: string }>();
  const [content, setContent] = useState<CityContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchContent() {
      if (!city || !isCityValid(city)) {
        setIsLoading(false);
        return;
      }

      try {
        const cachedContent = await supabaseInstance.getCachedContent(`/${city.toLowerCase()}`);
        
        if (cachedContent) {
          setContent(cachedContent);
          setIsLoading(false);
          return;
        }

        const generatedContent = await generateCityContent(city);
        setContent(generatedContent);
        
        await supabaseInstance.cacheContent(`/${city.toLowerCase()}`, generatedContent);
        
      } catch (error) {
        console.error('Error fetching city content:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchContent();
  }, [city]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!city || !isCityValid(city) || !content) {
    return <NotFound />;
  }

  return (
    <>
      <Helmet>
        <title>{content.metaTitle}</title>
        <meta name="description" content={content.metaDescription} />
        <meta name="keywords" content={content.keywords.join(', ')} />
        <link rel="canonical" href={`https://fencestexas.com/${city.toLowerCase()}`} />
      </Helmet>

      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <Breadcrumbs />
        
        <h1 className="text-3xl font-semibold mb-4">{content.h1}</h1>
        <p className="mb-4">{content.intro}</p>

        <DynamicContent cityName={city} />

        <div className="mt-8">
          <Button asChild>
            <Link to="/contact" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Get a Free Quote
            </Link>
          </Button>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default CityPage;

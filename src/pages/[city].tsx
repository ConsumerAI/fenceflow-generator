// Import the supabaseInstance directly
import { supabaseInstance, generateCityContent } from '../lib/supabase';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import React, { useEffect, useState } from 'react';
import { CityContent } from '../lib/types';
import { isCityValid } from '../lib/cities';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NotFound from './NotFound';
import LeadForm from '@/components/LeadForm';
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
        // Try to get content from cache first
        const cachedContent = await supabaseInstance.getCachedContent(`/${city.toLowerCase()}`);
        
        if (cachedContent) {
          setContent(cachedContent);
          setIsLoading(false);
          return;
        }

        // If no cached content, generate new content
        const generatedContent = await generateCityContent(city);
        setContent(generatedContent);
        
        // Cache the generated content for future use
        await supabaseInstance.cacheContent(`/${city.toLowerCase()}`, generatedContent);
        
      } catch (error) {
        console.error('Error fetching city content:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchContent();
  }, [city]);

  if (!city || !isCityValid(city)) {
    return <NotFound />;
  }

  // Format city name for display (e.g., "dallas" -> "Dallas")
  const formatCityName = (cityName: string) => {
    return cityName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const formattedCity = formatCityName(city);

  return (
    <>
      <Helmet>
        <title>{`Fence Installation in ${formattedCity} | Fences Texas`}</title>
        <meta 
          name="description" 
          content={`Expert fence installation in ${formattedCity}. Get matched with the perfect local fence contractor for your project. Free service, instant matches!`}
        />
        <link rel="canonical" href={`https://fencestexas.com/${city.toLowerCase()}`} />
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
                    Expert Fence Installation in
                    <span className="text-texas-terracotta"> {formattedCity}</span>
                  </h1>
                  <p className="text-muted-foreground mt-4 max-w-3xl mx-auto text-center">
                    {`${formattedCity} homeowners trust us to match them with their perfect fence contractor. From residential privacy fences to commercial security installations, we connect you with one verified local expert who's precisely right for your project. No multiple calls or comparing quotes - just one perfect match.`}
                  </p>
                  <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button 
                      className="w-full sm:w-[240px] h-[48px] text-base bg-texas-terracotta text-white hover:bg-texas-earth transition-colors"
                      onClick={() => {
                        const formElement = document.querySelector('.lead-form');
                        if (formElement) {
                          formElement.classList.add('shake-animation');
                          setTimeout(() => {
                            formElement.classList.remove('shake-animation');
                          }, 820);
                          formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                      }}
                    >
                      Get Your Perfect Fence Match™
                    </Button>
                    <div className="flex items-center gap-1">
                      <div className="flex -space-x-2">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=faces&q=80" alt="Happy customer" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=faces&q=80" alt="Happy customer" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                        <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=32&h=32&fit=crop&crop=faces&q=80" alt="Happy customer" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                      </div>
                      <span className="text-muted-foreground ml-2">732+ homeowners matched this week</span>
                    </div>
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
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default CityPage;

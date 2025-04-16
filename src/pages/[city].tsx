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
import CityGrid from '@/components/CityGrid';
import ServiceCard from '@/components/ServiceCard';
import ImageCarousel from '@/components/ImageCarousel';
import PlanToPickets from '@/components/PlanToPickets';
import { ServiceInfo } from '@/lib/types';

// Service data
const services: ServiceInfo[] = [{
  title: "Residential Fencing",
  description: "Beautiful, durable fencing solutions for homes across DFW, enhancing privacy, security, and property value.",
  icon: "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/6d4752ad-e781-4bec-92ec-b07a9dc74a07/Board+on+Board+with+Trim+and+Cap.jpg",
  benefits: ["Classic wood fences with Texas craftsmanship", "Elegant iron and aluminum designs", "Privacy fences with premium materials", "Pool enclosures meeting safety codes", "Custom gates with optional automation"]
}, {
  title: "Commercial Fencing",
  description: "Secure, professional fencing for businesses, industrial sites, and commercial properties throughout the metroplex.",
  icon: "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/4d9c257b-d4c7-4206-8aa5-22623aa2f863/301399581_23852070435550391_1586117276639848672_n.jpg",
  benefits: ["High-security perimeter fencing", "Decorative commercial frontage", "Industrial-grade materials", "Property line demarcation", "Code-compliant installations"]
}, {
  title: "Athletic Courts and Sports Facilities",
  description: "Specialized fencing for tennis courts, basketball courts, and other recreational areas with durability in mind.",
  icon: "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/1709258995381-OZJ85PI1IF9KHG170S1W/GettyImages-145988391.jpg",
  benefits: ["Ball containment systems", "Wind screens and privacy panels", "Custom heights and configurations", "Specialized gates for easy access", "Weather-resistant materials"]
}, {
  title: "Access Control",
  description: "Custom gate solutions for controlled entry points, enhancing security while adding aesthetic appeal.",
  icon: "/lovable-uploads/223b3ff5-7edb-4b9f-8993-449414f2518b.png",
  benefits: ["Custom entry gates", "Pedestrian access points", "Matching fence-gate combinations", "Heavy-duty commercial gates", "Decorative and functional designs"]
}, {
  title: "Automatic Gates",
  description: "Sophisticated automated gate systems for convenient access control with remote operation and smart features.",
  icon: "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/7426f5b7-ded7-4a47-bc45-c4cb46fec966/star+gate.jpg",
  benefits: ["Remote control operation", "Keypad and card reader integration", "Smartphone connectivity options", "Safety sensors and features", "Battery backup systems"]
}];

// FAQ data with city-specific content
const generateCityFaqs = (cityName: string) => [{
  question: `What areas of ${cityName} do you serve?`,
  answer: `We proudly serve all neighborhoods and areas throughout ${cityName} and surrounding communities.`
}, {
  question: "What types of fences do you install?",
  answer: "We install a wide variety of fences including wood privacy fences, ornamental iron, chain link, vinyl, and custom designs for both residential and commercial properties."
}, {
  question: "How long does a typical fence installation take?",
  answer: "Most residential fence installations can be completed in 1-3 days, while commercial projects may take longer depending on the scope and complexity."
}, {
  question: "Do you offer free estimates?",
  answer: `Yes! We provide free, no-obligation estimates for all fence installation projects throughout ${cityName}.`
}, {
  question: "What warranties do you offer on fence installations?",
  answer: "We stand behind our work with comprehensive warranties on both materials and craftsmanship. Specific warranty details vary by product and installation type."
}];

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
  const cityFaqs = generateCityFaqs(formattedCity);

  // Function to handle smooth scrolling to the quote form with shake animation
  const scrollToQuote = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    const formElement = document.querySelector('.lead-form');
    if (formElement) {
      formElement.classList.add('shake-animation');
      setTimeout(() => {
        formElement.classList.remove('shake-animation');
      }, 820);
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

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
          {/* Hero Section */}
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
                      onClick={scrollToQuote}
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
          
          {/* Plan to Pickets Process Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <div className="inline-block px-4 py-1 mb-4 bg-red-100 text-texas-terracotta rounded-full text-sm">
                  Our Proven Process
                </div>
                <h2 className="text-4xl font-bold mb-4">Our "Plan to Pickets" Process</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Our simple 4-step process takes less than 15 seconds and connects you with top fence pros in {formattedCity}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="text-center bg-white rounded-lg p-6 shadow-sm">
                  <div className="w-8 h-8 bg-texas-terracotta rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">1</div>
                  <h3 className="font-semibold mb-2">Tell Us About Your Project</h3>
                  <p className="text-muted-foreground">Answer a few quick questions about your fence needs, property, and timeline. It only takes 15 seconds.</p>
                </div>

                <div className="text-center bg-white rounded-lg p-6 shadow-sm">
                  <div className="w-8 h-8 bg-texas-terracotta rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">2</div>
                  <h3 className="font-semibold mb-2">Perfect Match™ System</h3>
                  <p className="text-muted-foreground">Our Perfect Match™ System identifies the ONE contractor who's ideal for your specific needs.</p>
                </div>

                <div className="text-center bg-white rounded-lg p-6 shadow-sm">
                  <div className="w-8 h-8 bg-texas-terracotta rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">3</div>
                  <h3 className="font-semibold mb-2">Direct Connection</h3>
                  <p className="text-muted-foreground">You'll be connected directly to your Perfect Match™ contractor.</p>
                </div>

                <div className="text-center bg-white rounded-lg p-6 shadow-sm">
                  <div className="w-8 h-8 bg-texas-terracotta rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">4</div>
                  <h3 className="font-semibold mb-2">Expert Installation</h3>
                  <p className="text-muted-foreground">Get your fence installed by a local verified expert who specializes in your project type.</p>
                </div>
              </div>

              <div className="mt-8 text-center max-w-3xl mx-auto">
                <p className="text-muted-foreground mb-8">
                  Our matching service is 100% free, with no obligation. We never share your information with multiple contractors, only your Perfect Match™, saving you countless hours and eliminating the hassle of fielding dozens of phone calls, setting up multiple site inspections, and trying to figure who is the best quality and the best price. We've done it for you.
                </p>
              </div>

              <div className="mt-12 text-center">
                <Button onClick={scrollToQuote} className="bg-texas-terracotta text-white hover:bg-texas-earth transition-colors text-lg px-8 py-6 h-auto">
                  Find Your Fence Pro
                </Button>
              </div>

              <div className="mt-8 text-center">
                <div className="inline-flex items-center gap-2 bg-texas-terracotta/10 text-texas-terracotta px-6 py-3 rounded-lg">
                  <span className="font-semibold">Pro Tip:</span>
                  <span>The best time to schedule fence installations is 4-6 weeks in advance. With current demand in {formattedCity}, we recommend starting your search early.</span>
                </div>
              </div>
            </div>
          </section>
          
          {/* Recent Projects Section */}
          <section className="py-16 md:py-24 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold text-center mb-4">
                Recent Projects in {formattedCity}
              </h2>
              <p className="text-gray-600 text-center mb-12">
                Browse through our gallery of recently completed fence installations in {formattedCity}. Each project showcases our commitment to quality and craftsmanship.
              </p>
              
              <ImageCarousel />
              
              <div className="mt-10 flex justify-center">
                <Button onClick={scrollToQuote} className="bg-texas-terracotta text-white hover:bg-texas-earth transition-colors">
                  Find Your Fence Pro
                </Button>
              </div>
            </div>
          </section>
          
          {/* Services Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Fence Installation Services in {formattedCity}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                  <ServiceCard key={service.title} service={service} index={index} />
                ))}
              </div>
            </div>
          </section>

          {/* About Us Section */}
          <section className="py-16 bg-texas-terracotta/5">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">About FencesTexas in {formattedCity}</h2>
                <div className="prose prose-lg mx-auto">
                  <p className="text-center mb-6">
                    FencesTexas takes the guesswork out of finding the right fence contractor in {formattedCity}. 
                    Unlike other services that sell your information to multiple companies, we use our proprietary 
                    Perfect Match™ system to connect you with just ONE contractor - the ideal professional for your 
                    specific project.
                  </p>
                  <p className="text-center mb-6">
                    Our rigorous 27-point verification process eliminates 81% of local fence companies in {formattedCity}, ensuring 
                    you're only matched with contractors who deliver exceptional quality, reliability, and value. 
                    We understand the unique challenges of Texas fence installation - from soil conditions to HOA 
                    requirements to withstanding extreme weather.
                  </p>
                  <p className="text-center mb-6">
                    When you use FencesTexas in {formattedCity}, you'll never be bombarded with calls from competing contractors. 
                    Your information is treated with respect, and you're matched with a single pre-screened expert 
                    who specializes in exactly what you need.
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Cities Section */}
          <section className="py-16 md:py-24 texas-section">
            <div className="container mx-auto px-4 md:px-8">
              <div className="text-center mb-12 md:mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Serving {formattedCity} and Surrounding Areas</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  From {formattedCity} to surrounding communities, we provide expert fence 
                  installation services throughout the Dallas/Fort Worth region. Find your city below.
                </p>
              </div>
              
              <CityGrid />
              
              <div className="mt-16 text-center flex justify-center">
                <Button onClick={scrollToQuote} className="bg-texas-terracotta text-white hover:bg-texas-earth transition-colors">
                  Find Your Fence Pro
                </Button>
              </div>
            </div>
          </section>
          
          {/* FAQ Section */}
          <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 md:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions About Fence Installation in {formattedCity}</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Get answers to common questions about our fence installation services in {formattedCity}.
                </p>
              </div>
              
              <div className="max-w-3xl mx-auto">
                <div className="space-y-6">
                  {cityFaqs.map((faq, index) => (
                    <article key={index} className="bg-secondary/20 rounded-lg p-6">
                      <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </article>
                  ))}
                </div>
              </div>
              
              <div className="mt-10 flex justify-center">
                <Button onClick={scrollToQuote} className="bg-texas-terracotta text-white hover:bg-texas-earth transition-colors">
                  Find Your Fence Pro
                </Button>
              </div>
            </div>
          </section>
          
          {/* Call to Action Section */}
          <section className="py-16 md:py-24 bg-texas-terracotta/10" id="quote">
            <div className="container mx-auto px-4 md:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold">Ready for Your Fence Installation in {formattedCity}?</h2>
                  <p className="text-lg text-muted-foreground">
                    Take the first step toward enhancing your property with a premium fence installation. 
                    Our team of experts is dedicated to creating beautiful, durable fences that perfectly 
                    complement your {formattedCity} property and meet your specific needs.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Free, no-obligation quotes</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Service throughout {formattedCity} and surrounding areas</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Premium materials and expert installation</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Local experts who know {formattedCity} building codes</span>
                    </li>
                  </ul>
                </div>
                <div className="lg:ml-auto w-full max-w-lg">
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

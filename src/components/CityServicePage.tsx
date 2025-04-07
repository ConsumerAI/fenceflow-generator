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
          <section className="pt-24 pb-16 md:pt-32 md:pb-24">
            <div className="container mx-auto px-4">
              <div className="text-texas-terracotta text-sm font-medium mb-2">
                Serving {formattedCity}, Texas
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {serviceType} Services in {formattedCity}
              </h1>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
                <div className="flex items-center gap-4">
                  <Button 
                    onClick={handleQuoteClick}
                    className="bg-texas-terracotta text-white hover:bg-texas-earth transition-colors"
                  >
                    Find Your Fence Pro
                  </Button>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-3">
                      <div className="w-7 h-7 rounded-full bg-gray-200 border-2 border-white overflow-hidden">
                        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="" />
                      </div>
                      <div className="w-7 h-7 rounded-full bg-gray-200 border-2 border-white overflow-hidden">
                        <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="" />
                      </div>
                      <div className="w-7 h-7 rounded-full bg-gray-200 border-2 border-white overflow-hidden">
                        <img src="https://randomuser.me/api/portraits/men/86.jpg" alt="" />
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-semibold">732+</span> homeowners matched this week
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex items-center gap-2 px-4 py-2 bg-texas-terracotta/10 rounded-full">
                  <svg className="w-5 h-5 text-texas-terracotta" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-sm font-medium text-texas-terracotta">Triple-Verified</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-texas-terracotta/10 rounded-full">
                  <svg className="w-5 h-5 text-texas-terracotta" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-sm font-medium text-texas-terracotta">100% Free Service</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-texas-terracotta/10 rounded-full">
                  <svg className="w-5 h-5 text-texas-terracotta" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-sm font-medium text-texas-terracotta">Saves Time & Money</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                  <div className="prose prose-lg max-w-none">
                  {serviceType === ServiceType.AthleticCourts && (
                    <>
                      <h2 className="text-3xl font-bold mb-4">Professional Athletic Courts and Sports Facilities in {formattedCity}</h2>
                      
                      <div className="my-6 flex justify-center">
                        <img src="/lovable-uploads/7230064e-9fa2-45f8-abd3-d337e43f9067.png" alt={`Professional athletic courts and sports facilities in ${formattedCity}`} className="w-full rounded-lg" />
                      </div>
                      
                      <h3 className="text-2xl font-bold my-4">{formattedCity}'s Premier Pickleball Court Installer</h3>
                      <p className="text-left">Looking for professional pickleball court installers near you? We are the {formattedCity} area's leading pickleball court installation company. Our expert team specializes in building regulation pickleball courts for residential properties, community centers, and commercial facilities throughout {formattedCity}.</p>
                      
                      <p className="text-left">Whether you need a new pickleball court installed or are looking to upgrade existing facilities, we provide end-to-end services including site preparation, concrete work, surfacing, line marking, net post installation, and perimeter fencing.</p>
                      
                      <h3 className="text-2xl font-bold mt-6 mb-4">Expert Tennis Court Installation Services</h3>
                      <p className="text-left">As {formattedCity}'s trusted tennis court installer, we create premium tennis facilities built to professional standards. Our tennis court installation services include comprehensive solutions from initial design through completion, featuring proper drainage systems, high-quality surfacing options, and premium court accessories.</p>
                      
                      <p className="text-left">We handle every aspect of your tennis court project, including tennis court fence installation, windscreen installation, net post installation, and optional features like lighting systems and spectator areas.</p>
                      
                      <h4 className="text-xl font-bold mt-6 mb-4">The Cost to Install a Pickleball Court</h4>
                      <p>When considering the cost to install a pickleball court in the {formattedCity} area, several factors influence the final investment:</p>
                      
                      <ul className="list-disc pl-6 my-4">
                        <li><strong>Court Size:</strong> Standard pickleball courts are 20' x 44', but we can customize dimensions for your property.</li>
                        <li><strong>Surface Material:</strong> Options include acrylic hard court surfaces, cushioned surfaces, or modular tiles at varying price points.</li>
                        <li><strong>Site Preparation:</strong> The current condition of your property affects excavation and base preparation costs.</li>
                        <li><strong>Additional Features:</strong> Fencing, lighting, seating, and shade structures add functionality but increase the investment.</li>
                      </ul>
                      
                      <p className="text-left">Due to the variety of options available for pickleball court installations, we provide custom quotes tailored to your specific needs. Contact us for a detailed estimate specific to your property and requirements.</p>
                      
                      <h4 className="text-xl font-bold mt-6 mb-4">Our Athletic Courts and Sports Facilities Construction Process</h4>
                      <ol className="list-decimal pl-6 my-4">
                        <li><strong>Initial Consultation:</strong> We discuss your vision, budget, and specific requirements for your {formattedCity} pickleball or tennis court.</li>
                        <li><strong>Site Evaluation:</strong> Our experts inspect your property to assess conditions and identify any challenges.</li>
                        <li><strong>Custom Design:</strong> We create detailed plans for your court, including layout, surfacing options, and amenities.</li>
                        <li><strong>Proposal & Contract:</strong> You receive a comprehensive proposal with transparent pricing and timeline.</li>
                        <li><strong>Construction:</strong> Our skilled team executes the project with attention to detail and quality craftsmanship.</li>
                        <li><strong>Final Inspection:</strong> We ensure everything meets our high standards before final walkthrough.</li>
                        <li><strong>Ongoing Support:</strong> We stand behind our work with warranties and maintenance services.</li>
                      </ol>

                      <h3 className="text-2xl font-bold mt-10 mb-6">Premier Court Construction & Resurfacing Services</h3>
                      <p className="text-left">We understand the importance of a well-maintained court to your game. Our pickleball court installation and tennis court construction services are designed to provide the best playability and safety for athletes and enthusiasts alike. Here's why our solutions stand out:</p>
                      
                      <ul className="list-disc pl-6 my-4">
                        <li className="mb-2"><strong>Comprehensive Evaluation:</strong> Before we begin, our experts conduct a thorough assessment of your court area to identify all site requirements.</li>
                        <li className="mb-2"><strong>High-Performance Materials:</strong> We select the most durable and visually appealing surfacing materials, suitable for both pickleball and tennis courts in {formattedCity}'s climate.</li>
                        <li className="mb-2"><strong>Expert Application:</strong> Our skilled professionals use the latest techniques and equipment for perfect results every time.</li>
                      </ul>
                      
                      <img src="/lovable-uploads/06ad0853-44a4-41c1-bb88-5389b46bc009.png" alt="Tennis and pickleball court with blue playing surface and green surroundings" className="w-full rounded-lg my-6" />
                    </>
                  )}
                  
                  {serviceType === ServiceType.CommercialFencing && (
                    <>
                      <h2 className="text-3xl font-bold mb-4">Commercial Capabilities</h2>
                      <p>You need a partner who is <strong>Professional</strong>, <strong>Dependable</strong>, <strong>Scalable</strong>, and <strong>Proficient</strong> with any fencing requirements. That partner must offer the best fencing solutions to keep your properties, tenants, and customers protected.</p>
                      
                      <p className="my-4">General Contractors choose <strong>Fences Texas</strong> as a supplier-of-choice because we are <strong>technology-forward</strong>, <strong>process-driven</strong>, and committed to <strong>excellence</strong> at all levels.</p>
                      
                      <p>Our capabilities include:</p>
                      <ul className="list-disc pl-6 my-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                      <li>Pre-Fab Walls</li>
                      <li>Dumpster Enclosures</li>
                      <li>Farm and Ranch</li>
                      <li>Security Fencing</li>
                      <li>Apartment Fencing</li>
                      <li>Housing Development Fencing</li>
                      <li>Pool Fencing</li>
                        <li>Multi-family and Apartment Services</li>
                      <li>Athletics Fencing</li>
                      <li>Chain link Fencing</li>
                      <li>Custom Gates</li>
                      <li>Security Gates</li>
                      <li>Access Controls</li>
                      <li>Solar Power</li>
                      <li>Sound Barriers</li>
                      <li>Retaining Walls</li>
                    </ul>
                    </>
                  )}
                  
                  {serviceType === ServiceType.AccessControl && (
                    <>
                      <h2 className="text-3xl font-bold mb-4">Access Control Solutions</h2>
                      <h3 className="text-2xl font-bold mt-6 mb-4">Protect Your Property with Advanced Access Control Solutions</h3>
                      <p>At <strong>Fences Texas</strong>, we understand that your security is a top priority. That's why we offer <strong>state-of-the-art access control solutions</strong> tailored to meet your specific needs. Whether it's for commercial, residential, or industrial properties, we provide systems that integrate seamlessly with your fencing to create a secure perimeter.</p>
                      
                      <h3 className="text-2xl font-bold mt-8 mb-4">Our Access Control Offerings</h3>
                      <div className="space-y-6 mt-6">
                        <div>
                          <h4 className="text-xl font-bold mb-2">Gate Operators & Automation</h4>
                          <p>Simplify your entry points with automated gate systems. We offer durable and reliable solutions for swing, slide, and barrier gates.</p>
                        </div>
                  <div>
                          <h4 className="text-xl font-bold mb-2">Keypads & Card Readers</h4>
                          <p>Control access to your property with user-friendly keypads and card reader systems. Manage permissions efficiently to ensure only authorized individuals can enter.</p>
                  </div>
                </div>
                    </>
                  )}
                  
                  {serviceType === ServiceType.AutomaticGates && (
                    <>
                      <h2 className="text-3xl font-bold mb-4">Automatic Gate Solutions</h2>
                      <p className="my-4">At <strong>Fences Texas</strong>, we specialize in designing, installing, and maintaining automatic gate systems for residential and commercial properties throughout the DFW area. Our custom gate solutions enhance security, convenience, and curb appeal while providing reliable performance year after year.</p>
                      
                      <h3 className="text-2xl font-bold mt-8 mb-4">Why Choose an Automatic Gate?</h3>
                      <ul className="list-disc pl-6 my-4">
                        <li className="mb-2"><strong>Enhanced Security:</strong> Control access to your property and keep unauthorized visitors out.</li>
                        <li className="mb-2"><strong>Improved Convenience:</strong> Enter and exit your property without leaving your vehicle.</li>
                        <li className="mb-2"><strong>Increased Property Value:</strong> Add a luxurious, high-end feature that boosts curb appeal and resale value.</li>
                        <li className="mb-2"><strong>Privacy Protection:</strong> Maintain your privacy and security with controlled access.</li>
                        <li className="mb-2"><strong>Pet and Child Safety:</strong> Keep children and pets safely contained within your property.</li>
                    </ul>
                    </>
                  )}
                  
                  {serviceType === ServiceType.ResidentialFencing && (
                    <>
                      <h2 className="text-3xl font-bold mb-4">Residential Fencing Solutions</h2>
                      <p className="my-4">Transform your home with a beautiful, durable fence from <strong>Fences Texas</strong>. We offer a wide range of residential fencing solutions that combine aesthetics with functionality, enhancing both your property's value and security.</p>
                      
                      <h3 className="text-2xl font-bold mt-8 mb-4">Our Residential Services</h3>
                      <ul className="list-disc pl-6 my-4">
                        <li className="mb-2"><strong>Privacy Fences:</strong> Create your personal sanctuary</li>
                        <li className="mb-2"><strong>Pool Fencing:</strong> Safety-compliant barriers for your pool area</li>
                        <li className="mb-2"><strong>Decorative Fencing:</strong> Enhance your home's curb appeal</li>
                        <li className="mb-2"><strong>Security Fencing:</strong> Protect your property with style</li>
                        <li className="mb-2"><strong>Custom Gates:</strong> Personalized entry solutions</li>
                    </ul>
                    </>
                  )}
                  </div>
                  
                  <div>
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

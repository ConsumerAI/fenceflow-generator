
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LeadForm from '@/components/LeadForm';
import { cities } from '@/lib/cities';
import { MapPin } from 'lucide-react';

const NearMePage = () => {
  // In a real implementation, we would use geolocation to determine the user's city
  // For now, we'll just show a random city as an example
  const randomCity = cities[Math.floor(Math.random() * cities.length)];
  
  return (
    <>
      <Helmet>
        <title>Fence Companies Near Me | Fence Installation DFW</title>
        <meta 
          name="description" 
          content="Top fence companies near you in DFW. Quality fence installation for residential & commercial properties. Transform your space with a fence you'll love." 
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Fences Texas",
            "description": "DFW's Premier Fence Installation Experts",
            "telephone": "555-123-4567",
            "email": "info@fencestexas.com",
            "areaServed": {
              "@type": "GeoCircle",
              "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": 32.7767,
                "longitude": -96.7970
              },
              "geoRadius": "100 mi"
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
              "https://www.fencestexas.com"
            ]
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        {/* Hero Section */}
        <section className="pt-24 pb-16 md:pt-32 md:pb-24 texas-section">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-page-transition">
                <div className="inline-flex items-center gap-2 px-4 py-1 bg-texas-terracotta/10 rounded-full text-texas-terracotta text-sm font-medium">
                  <MapPin size={16} />
                  <span>Serving your area: {randomCity}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                  Fence Companies Near Me in Dallas/Fort Worth
                </h1>
                <p className="text-lg text-muted-foreground">
                  Looking for quality fence installation near you? We're excited to elevate Dallas/Fort Worth 
                  with beautiful fences! From cozy residential privacy to strong commercial security and 
                  sleek automated gates, our team delivers quality craftsmanship and exceptional service 
                  throughout the region.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="#quote" 
                    className="bg-texas-terracotta text-white px-6 py-3 rounded-md font-medium hover:bg-texas-earth transition-colors text-center"
                  >
                    Get a Free Quote
                  </a>
                  <a 
                    href="tel:555-123-4567" 
                    className="border border-texas-terracotta/30 bg-transparent text-texas-terracotta px-6 py-3 rounded-md font-medium hover:bg-texas-terracotta/10 transition-colors text-center"
                  >
                    Call: 555-123-4567
                  </a>
                </div>
              </div>
              
              <div className="lg:ml-auto w-full max-w-lg animate-fade-in">
                <LeadForm city="Near Me" />
              </div>
            </div>
          </div>
        </section>
        
        {/* Main Content Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Fence Installation Services Near You</h2>
                <div className="prose prose-p:text-muted-foreground max-w-none">
                  <p>
                    When searching for "fence companies near me," it's important to find a 
                    provider that delivers exactly what you need. At Fences Texas, we 
                    focus on creating beautiful, high-quality fence installations throughout the Dallas/Fort 
                    Worth metroplex, serving all surrounding communities with premium quality 
                    and expert craftsmanship.
                  </p>
                  <p>
                    Our service area spans the entire DFW region, from major cities to 
                    smaller communities. No matter where you're located in the metroplex, 
                    we're your local fence installation experts, ready to deliver a beautiful, 
                    durable fence that enhances your property's security, privacy, and value.
                  </p>
                  <p>
                    What sets us apart from other fence companies near you is our dedication
                    to quality and craftsmanship. We're committed to delivering fence installations 
                    that stand the test of time, using premium materials and expert techniques
                    to ensure your complete satisfaction.
                  </p>
                </div>
              </div>
              
              <div>
                <div className="aspect-square overflow-hidden rounded-xl shadow-md">
                  <img 
                    src="/placeholder.svg" 
                    alt="Fence installation in DFW" 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Services Section */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Comprehensive Fence Installation Services
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                No matter where you are in DFW, we offer a complete range of fencing solutions:
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="glass-card overflow-hidden transition-all duration-500 group hover:shadow-lg">
                <div className="p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-bold mb-4 group-hover:text-texas-terracotta transition-colors">
                    Residential Fencing
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Enhance your home's privacy, security, and curb appeal with custom residential 
                    fencing. From classic wood privacy fences to ornamental iron and modern designs, 
                    we deliver quality installations near you.
                  </p>
                </div>
              </div>
              
              <div className="glass-card overflow-hidden transition-all duration-500 group hover:shadow-lg">
                <div className="p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-bold mb-4 group-hover:text-texas-terracotta transition-colors">
                    Commercial Fencing
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Secure your business or commercial property with professional-grade fencing 
                    solutions. Our commercial fence installations near you provide security, 
                    define boundaries, and enhance your property's appearance.
                  </p>
                </div>
              </div>
              
              <div className="glass-card overflow-hidden transition-all duration-500 group hover:shadow-lg">
                <div className="p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-bold mb-4 group-hover:text-texas-terracotta transition-colors">
                    Sports Courts
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Create safe, enclosed recreational spaces with our specialized sports court 
                    fencing. Perfect for tennis courts, basketball courts, and multipurpose 
                    athletic areas throughout DFW.
                  </p>
                </div>
              </div>
              
              <div className="glass-card overflow-hidden transition-all duration-500 group hover:shadow-lg">
                <div className="p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-bold mb-4 group-hover:text-texas-terracotta transition-colors">
                    Access Control
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Enhance security and convenience with custom gate solutions. Our access 
                    control installations near you include pedestrian gates, driveway entrances, 
                    and specialized access points.
                  </p>
                </div>
              </div>
              
              <div className="glass-card overflow-hidden transition-all duration-500 group hover:shadow-lg">
                <div className="p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-bold mb-4 group-hover:text-texas-terracotta transition-colors">
                    Automatic Gates
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Add convenience and security with automated gate systems. Our local gate 
                    installation services include remote-controlled operation, keypads, 
                    and smart integration options.
                  </p>
                </div>
              </div>
              
              <div className="glass-card overflow-hidden transition-all duration-500 group hover:shadow-lg bg-texas-terracotta text-white">
                <div className="p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-bold mb-4">
                    Quality Craftmanship
                  </h3>
                  <p className="text-white/90 mb-6">
                    We're committed to delivering exceptional quality with every fence 
                    installation. Our focus on craftsmanship ensures you'll receive a beautiful, 
                    durable fence that enhances your property for years to come.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Areas We Serve */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Areas We Serve Near You
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our local fence installation services cover the entire Dallas/Fort Worth metroplex, 
                including these major areas and all surrounding communities:
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {cities.slice(0, 30).map((city) => (
                <div key={city} className="text-center p-3 rounded-lg hover:bg-secondary transition-colors">
                  <span>{city}</span>
                </div>
              ))}
              <div className="text-center p-3 rounded-lg font-semibold text-texas-terracotta">
                <span>And 70+ more cities!</span>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-lg">
                No matter where you are in the Dallas/Fort Worth area, we're the "fence company near me" 
                you've been searching for!
              </p>
            </div>
          </div>
        </section>
        
        {/* Call to Action Section */}
        <section className="py-16 md:py-24 bg-texas-terracotta/10">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">Find the Best Fence Company Near You</h2>
                <p className="text-lg text-muted-foreground">
                  When you're looking for "fence companies near me," choose experts dedicated to quality
                  and customer satisfaction. We're ready to provide a free, no-obligation quote for your 
                  fence project anywhere in the DFW metroplex.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Local experts serving your community</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Fast response times throughout DFW</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Expert craftsmanship and quality materials</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Free, no-obligation quotes</span>
                  </li>
                </ul>
              </div>
              
              <div className="lg:ml-auto w-full max-w-lg">
                <LeadForm city="Near Me" variant="minimal" className="shadow-xl border border-white/30" />
              </div>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </>
  );
};

export default NearMePage;

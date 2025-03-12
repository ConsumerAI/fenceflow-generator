
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LeadForm from '@/components/LeadForm';
import CityGrid from '@/components/CityGrid';
import ServiceCard from '@/components/ServiceCard';
import ImageCarousel from '@/components/ImageCarousel';
import { ServiceInfo } from '@/lib/types';

// Service data
const services: ServiceInfo[] = [
  {
    title: "Residential Fencing",
    description: "Beautiful, durable fencing solutions for homes across DFW, enhancing privacy, security, and property value.",
    icon: "/placeholder.svg",
    benefits: [
      "Classic wood fences with Texas craftsmanship",
      "Elegant iron and aluminum designs",
      "Privacy fences with premium materials",
      "Pool enclosures meeting safety codes",
      "Custom gates with optional automation"
    ]
  },
  {
    title: "Commercial Fencing",
    description: "Secure, professional fencing for businesses, industrial sites, and commercial properties throughout the metroplex.",
    icon: "/placeholder.svg",
    benefits: [
      "High-security perimeter fencing",
      "Decorative commercial frontage",
      "Industrial-grade materials",
      "Property line demarcation",
      "Code-compliant installations"
    ]
  },
  {
    title: "Sports Courts",
    description: "Specialized fencing for tennis courts, basketball courts, and other recreational areas with durability in mind.",
    icon: "/placeholder.svg",
    benefits: [
      "Ball containment systems",
      "Wind screens and privacy panels",
      "Custom heights and configurations",
      "Specialized gates for easy access",
      "Weather-resistant materials"
    ]
  },
  {
    title: "Access Control",
    description: "Custom gate solutions for controlled entry points, enhancing security while adding aesthetic appeal.",
    icon: "/placeholder.svg",
    benefits: [
      "Custom entry gates",
      "Pedestrian access points",
      "Matching fence-gate combinations",
      "Heavy-duty commercial gates",
      "Decorative and functional designs"
    ]
  },
  {
    title: "Automatic Gates",
    description: "Sophisticated automated gate systems for convenient access control with remote operation and smart features.",
    icon: "/placeholder.svg",
    benefits: [
      "Remote control operation",
      "Keypad and card reader integration",
      "Smartphone connectivity options",
      "Safety sensors and features",
      "Battery backup systems"
    ]
  }
];

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Fences Texas | DFW's Premier Fence Installation Experts</title>
        <meta 
          name="description" 
          content="Expert fence installation across Dallas/Fort Worth. Residential, commercial, sports courts, and automatic gates. Transform your space with a fence you'll love! Get a free quote today!"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Fences Texas",
            "description": "DFW's Premier Fence Installation Experts",
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
                <div className="inline-block px-4 py-1 bg-texas-terracotta/10 rounded-full text-texas-terracotta text-sm font-medium">
                  DFW's Premier Fence Installation Experts
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                  Fence Installation Across
                  <span className="text-texas-terracotta"> Dallas/Fort Worth</span>
                </h1>
                <p className="text-lg text-muted-foreground">
                  We're excited to elevate Dallas/Fort Worth with beautiful fences! 
                  From cozy residential privacy to strong commercial security and sleek 
                  automated gates, our team delivers quality across the metroplex. 
                  Transform your space with a fence you'll love!
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="#quote" 
                    className="bg-texas-terracotta text-white px-6 py-3 rounded-md font-medium hover:bg-texas-earth transition-colors text-center"
                  >
                    Get a Free Quote
                  </a>
                </div>
              </div>
              
              <div className="lg:ml-auto w-full max-w-lg animate-fade-in">
                <LeadForm />
              </div>
            </div>
          </div>
        </section>
        
        {/* Recent Projects Section */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Recent Projects</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Browse through our gallery of recently completed fence installations across DFW. 
                Each project showcases our commitment to quality and craftsmanship.
              </p>
            </div>
            
            <ImageCarousel />
          </div>
        </section>
        
        {/* Services Section */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Fence Installation Services</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore our comprehensive range of fence installation services. 
                Each project is custom-designed for your specific needs and property.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <ServiceCard key={service.title} service={service} index={index} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Cities Section */}
        <section className="py-16 md:py-24 texas-section">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Serving 100+ Cities Across DFW</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From major metropolitan areas to smaller communities, we provide expert fence 
                installation services throughout the Dallas/Fort Worth region. Find your city below.
              </p>
            </div>
            
            <CityGrid />
            
            <div className="mt-16 text-center">
              <a 
                href="/fence-companies-near-me" 
                className="inline-flex items-center gap-2 bg-texas-earth text-white px-6 py-3 rounded-md font-medium hover:bg-texas-earth/90 transition-colors"
              >
                Find Fence Companies Near Me
              </a>
            </div>
          </div>
        </section>
        
        {/* Call to Action Section */}
        <section className="py-16 md:py-24 bg-texas-terracotta/10">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">Ready for Your Fence Installation?</h2>
                <p className="text-lg text-muted-foreground">
                  Take the first step toward enhancing your property with a premium fence installation. 
                  Our team of experts is dedicated to creating beautiful, durable fences that perfectly 
                  complement your property and meet your specific needs.
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
                    <span>Service throughout the entire DFW metroplex</span>
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
                    <span>Custom solutions for your specific needs</span>
                  </li>
                </ul>
              </div>
              
              <div className="lg:ml-auto w-full max-w-lg">
                <LeadForm city="DFW" variant="minimal" className="shadow-xl border border-white/30" />
              </div>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;

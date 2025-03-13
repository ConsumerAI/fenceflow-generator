import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import LeadForm from '@/components/LeadForm';
import PlanToPickets from '@/components/PlanToPickets';
import { Button } from '@/components/ui/button';

const AutomaticGatesPage = () => {
  // Images for the gallery
  const gateImages = [
    {
      src: "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/f8b4f6b6-0ac3-4f7f-a7af-a0c13c99239c/Driveway+Gate.jpg",
      alt: "Elegant Driveway Gate"
    },
    {
      src: "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/4cabda6a-733c-41cf-883a-9aa081d48d44/Driveway+Gate%2C+Iron%2C+Solar.jpg",
      alt: "Iron Driveway Gate with Solar Power"
    },
    {
      src: "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/d7bbea15-3b91-480c-82b4-d3578aaa54f9/Gate%2C+Wrought+Iron%2C+Driveway%2C+2500px.jpg",
      alt: "Wrought Iron Driveway Gate"
    },
    {
      src: "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/ba1e4023-2b96-495d-b30b-ddfcf4d62b93/Gate%2C+Wrought+Iron%2C+Commercial%2C+720px.jpg",
      alt: "Wrought Iron Commercial Gate"
    },
    {
      src: "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/2433a5f7-7d8b-45bb-add3-55c0dfdcee86/Double+Gate+with+Doggie+Bubble+Wood.jpg",
      alt: "Double Gate with Doggie Bubble in Wood"
    },
    {
      src: "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/d37a2302-6605-4b39-992c-34349517b12b/Driveway+Gate%2C+Wood.jpg",
      alt: "Wooden Driveway Gate"
    }
  ];

  // Function to handle smooth scrolling to the quote form with shake animation
  const scrollToQuote = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    const quoteElement = document.getElementById('quote');
    
    if (quoteElement) {
      // Update URL with hash for page reloads
      window.location.hash = 'quote';
      
      quoteElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
      
      // Add and remove shake class to trigger animation
      quoteElement.classList.add('animate-shake');
      setTimeout(() => {
        quoteElement.classList.remove('animate-shake');
      }, 2000);
    }
  };

  return (
    <>
      <Helmet>
        <title>Automatic Gates | Fences Texas</title>
        <meta name="description" content="Custom automatic gate installation for residential and commercial properties across Texas. Solar-powered options, security features, and elegant designs." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        {/* Hero Section */}
        <section className="pt-24 pb-16 md:pt-32 md:pb-24 texas-section">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-page-transition">
                <div className="inline-block px-4 py-1 bg-texas-terracotta/10 rounded-full text-texas-terracotta text-sm font-medium">
                  Premium Gate Solutions
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                  Automatic Gates for Texas Properties
                </h1>
                <p className="text-lg text-muted-foreground">
                  Enhance your property's security, convenience, and curb appeal with our custom automatic gate installations. We specialize in designing and installing sophisticated gate systems tailored to your specific needs and aesthetic preferences.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    className="bg-texas-terracotta text-white hover:bg-texas-earth transition-colors"
                    onClick={scrollToQuote}
                  >
                    Get a Free Quote
                  </Button>
                </div>
                <div className="mt-6">
                  <img 
                    src="https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/6d4752ad-e781-4bec-92ec-b07a9dc74a07/Board+on+Board+with+Trim+and+Cap.jpg?format=1000w" 
                    alt="Elegant automatic gate installation" 
                    className="rounded-lg shadow-md w-full max-w-md mx-auto h-auto"
                  />
                </div>
              </div>
              
              <div className="lg:ml-auto w-full max-w-lg animate-fade-in">
                <LeadForm city="" />
              </div>
            </div>
          </div>
        </section>
        
        {/* Gallery Section */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4 md:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold">Our Automatic Gate Projects</h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                Browse our collection of custom automatic gates installed for residential and commercial properties across Texas.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {gateImages.map((image, index) => (
                <div 
                  key={index} 
                  className="overflow-hidden rounded-xl shadow-md bg-white hover:shadow-xl transition-shadow duration-300"
                  style={{
                    opacity: 0,
                    animation: `staggerFade 0.5s ease forwards ${index * 0.1 + 0.2}s`
                  }}
                >
                  <AspectRatio ratio={4/3}>
                    <img 
                      src={image.src} 
                      alt={image.alt} 
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </AspectRatio>
                  <div className="p-4">
                    <h3 className="font-medium text-lg">{image.alt}</h3>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10 flex justify-center">
              <Button 
                className="bg-texas-terracotta text-white hover:bg-texas-earth transition-colors"
                onClick={scrollToQuote}
              >
                Get a Free Quote
              </Button>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Automatic Gate Features</h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                Our gate systems combine security, convenience, and elegance with these premium features.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-6 rounded-xl bg-white shadow-md">
                <div className="w-12 h-12 rounded-full bg-texas-terracotta/20 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-texas-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Enhanced Security</h3>
                <p className="text-muted-foreground">
                  Control access to your property with secure entry systems, including keypads, remote controls, and smartphone integration.
                </p>
              </div>
              
              <div className="p-6 rounded-xl bg-white shadow-md">
                <div className="w-12 h-12 rounded-full bg-texas-terracotta/20 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-texas-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Solar Power Options</h3>
                <p className="text-muted-foreground">
                  Environmentally friendly and cost-effective solar-powered gate systems that operate efficiently even during power outages.
                </p>
              </div>
              
              <div className="p-6 rounded-xl bg-white shadow-md">
                <div className="w-12 h-12 rounded-full bg-texas-terracotta/20 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-texas-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Custom Designs</h3>
                <p className="text-muted-foreground">
                  Choose from a variety of materials and designs, including wrought iron, wood, and aluminum, customized to complement your property.
                </p>
              </div>
              
              <div className="p-6 rounded-xl bg-white shadow-md">
                <div className="w-12 h-12 rounded-full bg-texas-terracotta/20 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-texas-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Safety Features</h3>
                <p className="text-muted-foreground">
                  Advanced safety features including obstruction detection, safety edges, and backup systems to prevent accidents.
                </p>
              </div>
              
              <div className="p-6 rounded-xl bg-white shadow-md">
                <div className="w-12 h-12 rounded-full bg-texas-terracotta/20 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-texas-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Automation Options</h3>
                <p className="text-muted-foreground">
                  Choose from various automation options, including scheduled opening/closing, vehicle detection, and smart home integration.
                </p>
              </div>
              
              <div className="p-6 rounded-xl bg-white shadow-md">
                <div className="w-12 h-12 rounded-full bg-texas-terracotta/20 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-texas-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Professional Installation</h3>
                <p className="text-muted-foreground">
                  Expert installation by our experienced team, ensuring your gate operates smoothly and efficiently for years to come.
                </p>
              </div>
            </div>
            
            <div className="mt-10 flex justify-center">
              <Button 
                className="bg-texas-terracotta text-white hover:bg-texas-earth transition-colors"
                onClick={scrollToQuote}
              >
                Get a Free Quote
              </Button>
            </div>
          </div>
        </section>
        
        {/* Plan to Pickets Process Section */}
        <PlanToPickets />
        
        {/* Call to Action Section */}
        <section id="quote" className="py-16 bg-texas-terracotta/10">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">
                  Ready for Your Custom Automatic Gate?
                </h2>
                <p className="text-muted-foreground">
                  Whether you're looking for enhanced security, convenience, or curb appeal, our team is ready to design and install the perfect automatic gate solution for your property. Contact us today for a free, no-obligation quote.
                </p>
              </div>
              
              <div className="lg:ml-auto w-full max-w-lg">
                <LeadForm 
                  city="" 
                  variant="minimal" 
                  className="shadow-xl border border-white/30" 
                />
              </div>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </>
  );
};

export default AutomaticGatesPage;

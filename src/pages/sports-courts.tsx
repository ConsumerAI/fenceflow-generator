
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LeadForm from '@/components/LeadForm';

const SportsCourtPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Professional Sports Court Installation | Pickleball & Tennis Court Contractors</title>
        <meta name="description" content="Expert sports court installation in DFW. Specializing in pickleball court installation, tennis court construction, and sports field fencing solutions. Free quotes!" />
        <meta name="keywords" content="pickleball court installer, tennis court installation near me, sports court fencing contractor, pickleball court fencing, tennis court fence, sports field fencing near me, chain link fence for baseball field, backstop fencing baseball, tennis court chain link fence, pickleball court windscreens, basketball court fencing, volleyball court fence, athletic field fencing" />
        <link rel="canonical" href="https://fencestexas.com/sports-courts" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1">
          <section className="pt-24 pb-16 md:pt-32 md:pb-24">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Sports Court Installation & Fencing Solutions in DFW
              </h1>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-3xl font-bold mb-4">Professional Pickleball & Tennis Court Installation in DFW</h2>
                  <p><strong>Call us now at <a href="tel:(469)607-0505">(469) 607-0505</a></strong></p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                    <img 
                      src="/lovable-uploads/e375c1f0-53ad-4729-a527-958c7ccc73c8.png" 
                      alt="Professional pickleball court installation in DFW" 
                      className="w-full rounded-lg"
                    />
                    <img 
                      src="/lovable-uploads/ff181a35-3894-4eb0-82b4-f588c9c59ff1.png" 
                      alt="Expert tennis court installation services in Dallas Fort Worth" 
                      className="w-full rounded-lg"
                    />
                  </div>
                  
                  <h3 className="text-2xl font-bold my-4">DFW's Premier Pickleball Court Installer</h3>
                  <p>Looking for professional pickleball court installers near you? Fence Fanatics is the Dallas-Fort Worth area's leading pickleball court installation company. Our expert team specializes in building regulation pickleball courts for residential properties, community centers, and commercial facilities throughout DFW.</p>
                  
                  <p>Whether you need a new pickleball court installed or are looking to upgrade existing facilities, we provide end-to-end services including site preparation, concrete work, surfacing, line marking, net post installation, and perimeter fencing.</p>
                  
                  <h3 className="text-2xl font-bold mt-6 mb-4">Expert Tennis Court Installation Services</h3>
                  <p>As DFW's trusted tennis court installer, we create premium tennis facilities built to professional standards. Our tennis court installation services include comprehensive solutions from initial design through completion, featuring proper drainage systems, high-quality surfacing options, and premium court accessories.</p>
                  
                  <p>We handle every aspect of your tennis court project, including tennis court fence installation, windscreen installation, net post installation, and optional features like lighting systems and spectator areas.</p>
                </div>
                
                <div>
                  <LeadForm />
                </div>
              </div>
            </div>
          </section>
          
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="mb-16">
                <h2 className="text-3xl font-bold mb-8 text-center">Complete Sports Court Fencing Solutions</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <img 
                      src="/lovable-uploads/e375c1f0-53ad-4729-a527-958c7ccc73c8.png" 
                      alt="Pickleball court fencing and installation in DFW" 
                      className="rounded-lg shadow-lg w-full h-auto"
                    />
                  </div>
                  <div className="prose prose-lg max-w-none">
                    <h3 className="text-2xl font-bold mb-4">Sports Court Fencing Expertise</h3>
                    <p>At Fence Fanatics, we're not just court builders—we're the DFW area's leading sports court fencing contractor, specializing in comprehensive fencing solutions for all types of athletic facilities. From professional pickleball court fencing to tennis court fence installation, our team delivers durable, attractive enclosures designed for both functionality and appearance.</p>
                    
                    <p>Our sports field fencing options include:</p>
                    <ul className="list-disc pl-6 my-4">
                      <li><strong>Chain Link Fence for Tennis Courts</strong> - Professional-grade enclosures with proper tennis court fencing heights (typically 10-12 feet) and gate configurations.</li>
                      <li><strong>Pickleball Court Fence Specifications</strong> - Custom pickleball court fence dimensions tailored to your facility's needs, with options for windscreens and privacy panels.</li>
                      <li><strong>Basketball Court Fencing</strong> - Durable enclosures that provide ball containment while maintaining spectator visibility.</li>
                      <li><strong>Volleyball Court Fence Solutions</strong> - Specialized configurations for indoor and outdoor volleyball facilities.</li>
                      <li><strong>Baseball Field Fencing</strong> - Complete solutions including outfield fence installation, backstop fencing for baseball fields, and spectator protection.</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="mb-16">
                <h2 className="text-3xl font-bold mb-8">Pickleball Court Installation & Fencing</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="prose prose-lg max-w-none">
                    <h3 className="text-2xl font-bold mb-4">Comprehensive Pickleball Court Solutions</h3>
                    <p>As DFW's premier pickleball court installer, we provide complete court construction services from concept to completion. Our pickleball court installation process follows proven methodologies that ensure optimal playing surfaces and proper court layout.</p>
                    
                    <p>Our pickleball court services include:</p>
                    <ul className="list-disc pl-6 my-4">
                      <li><strong>Site Evaluation & Preparation</strong> - Expert assessment and ground preparation for proper drainage and stability.</li>
                      <li><strong>Base Construction</strong> - Engineered foundations specifically designed for pickleball play.</li>
                      <li><strong>Surface Installation</strong> - Premium acrylic surfaces with precise line markings.</li>
                      <li><strong>Pickleball Court Fencing</strong> - Durable perimeter fencing with customizable heights and configurations.</li>
                      <li><strong>Pickleball Court Windscreens</strong> - Wind reduction solutions that enhance playability and provide privacy.</li>
                      <li><strong>Pickleball Court Safety Barriers</strong> - Protective elements that enhance player and spectator safety.</li>
                      <li><strong>Residential Pickleball Court Fencing</strong> - Tailored solutions for home installations that combine functionality with aesthetic appeal.</li>
                    </ul>
                    
                    <p>From standard dimensions to custom configurations, our team creates pickleball facilities that deliver exceptional playing experiences while enhancing your property's value.</p>
                  </div>
                  <div className="prose prose-lg max-w-none">
                    <h3 className="text-2xl font-bold mb-4">Pickleball Court Fencing Options</h3>
                    <p>The right fencing is essential for a complete pickleball facility. As experienced pickleball court fencing contractors, we offer multiple options to meet your specific needs:</p>
                    
                    <ul className="list-disc pl-6 my-4">
                      <li><strong>Chain Link Pickleball Court Fence</strong> - Our most popular option, providing visibility and durability with various coating options.</li>
                      <li><strong>Pickleball Court Fence Dimensions</strong> - Typically installed at 8-10 feet height with proper spacing from court lines.</li>
                      <li><strong>Pickleball Court Privacy Fencing</strong> - Enhanced options for facilities requiring additional privacy or wind control.</li>
                      <li><strong>Pickleball Court Fence Specifications</strong> - All installations meet professional standards for safety and performance.</li>
                      <li><strong>Pickleball Court Fence Installation</strong> - Expert installation by experienced contractors who understand proper techniques.</li>
                    </ul>
                    
                    <p>Our pickleball court fencing materials are selected for their ability to withstand Texas weather while complementing your property's appearance. Whether you're building a single residential court or a multi-court pickleball fencing system for a club or community center, our team delivers superior results.</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-16">
                <h2 className="text-3xl font-bold mb-8">Tennis Court Fence Installation & Solutions</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="prose prose-lg max-w-none">
                    <h3 className="text-2xl font-bold mb-4">Premium Tennis Court Fencing</h3>
                    <p>Our tennis court fence installation services deliver professional-grade enclosures that enhance your facility's appearance, security, and functionality. As an experienced tennis court fencing company, we understand the specific requirements for these specialized sports enclosures.</p>
                    
                    <p>Our tennis court fencing solutions include:</p>
                    <ul className="list-disc pl-6 my-4">
                      <li><strong>Tennis Court Galvanized Fencing</strong> - Durable, corrosion-resistant options designed for longevity in outdoor environments.</li>
                      <li><strong>Tennis Court Fence Aesthetics</strong> - Attractive designs that complement your property while providing necessary functionality.</li>
                      <li><strong>Tennis Court Fence Maintenance</strong> - Ongoing services to ensure your fencing remains in optimal condition.</li>
                      <li><strong>Tennis Court Privacy Screens</strong> - Windscreen and privacy options that improve playing conditions.</li>
                      <li><strong>Tennis Court Fencing Solutions</strong> - Custom approaches for unique facility requirements.</li>
                    </ul>
                    
                    <p>From standard chain link fence for tennis court installations to premium custom enclosures, our team provides expert guidance and quality craftsmanship for tennis facilities throughout the DFW metroplex.</p>
                  </div>
                  <div>
                    <img 
                      src="/lovable-uploads/ff181a35-3894-4eb0-82b4-f588c9c59ff1.png" 
                      alt="Tennis court fence installation in Dallas Fort Worth" 
                      className="rounded-lg shadow-lg w-full h-auto"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mb-16">
                <h2 className="text-3xl font-bold mb-8">Additional Sports Field Fencing Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-bold mb-3">Baseball & Softball Field Fencing</h3>
                    <p>Our baseball field fencing services include outfield fence installation, backstop fencing for baseball and softball fields, and safety netting systems. We understand proper baseball outfield fence height requirements and provide durable chain link fence for baseball field enclosures tailored to league specifications and facility needs.</p>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-bold mb-3">Football & Soccer Field Fencing</h3>
                    <p>We provide complete stadium fence installation services including football stadium fencing, soccer field fence perimeters, and track field boundary solutions. Our sports field fence for spectators ensures safety while offering optimal viewing experiences, and our football field chain link fence systems offer security and durability for athletic complexes throughout DFW.</p>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-bold mb-3">Basketball & Volleyball Court Fencing</h3>
                    <p>Our basketball court fencing and volleyball court fence solutions provide secure, attractive boundaries for recreational facilities. We install durable basketball court chain link fence systems and volleyball court fencing designed to contain play while allowing spectator visibility, creating safe and functional spaces for athletes of all ages.</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-16">
                <h2 className="text-3xl font-bold mb-8">Sports Court Fencing Materials & Specifications</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <img 
                      src="/lovable-uploads/06ad0853-44a4-41c1-bb88-5389b46bc009.png" 
                      alt="Sports field fencing and materials in DFW" 
                      className="rounded-lg shadow-lg w-full h-auto"
                    />
                  </div>
                  <div className="prose prose-lg max-w-none">
                    <p>When it comes to sports field fence materials, quality and durability are essential. Our comprehensive options include:</p>
                    
                    <ul className="list-disc pl-6 space-y-3 my-4">
                      <li><strong>Galvanized Chain Link Sports Fence</strong> - Traditional, cost-effective option with excellent durability.</li>
                      <li><strong>Vinyl-Coated Sports Fencing</strong> - Enhanced appearance with additional corrosion protection.</li>
                      <li><strong>Aluminum Fencing for Sports Fields</strong> - Premium look with minimal maintenance requirements.</li>
                      <li><strong>Sports Field Fence Height</strong> - Various height options to meet specific sport requirements.</li>
                      <li><strong>Sports Court Fence Wind Reduction</strong> - Windscreen systems that improve playing conditions.</li>
                      <li><strong>Athletic Field Fence Aesthetics</strong> - Design options that enhance facility appearance.</li>
                      <li><strong>Sports Court Fence for Security</strong> - Enhanced security features for public facilities.</li>
                      <li><strong>Sports Field Fence Company</strong> - Professional installation and ongoing support.</li>
                    </ul>
                    
                    <p>Our sports court fence design experts work with you to create the perfect enclosure solution for your specific needs, considering factors like sports field fence installation cost, maintenance requirements, and aesthetic preferences.</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-16">
                <h2 className="text-3xl font-bold mb-8">The Cost to Install a Pickleball Court</h2>
                <div className="prose prose-lg max-w-none">
                  <p>When considering the cost to install a pickleball court in the DFW area, several factors influence the final investment:</p>
                  
                  <ul className="list-disc pl-6 my-4">
                    <li><strong>Court Size:</strong> Standard pickleball courts are 20' x 44', but we can customize dimensions for your property.</li>
                    <li><strong>Surface Material:</strong> Options include acrylic hard court surfaces, cushioned surfaces, or modular tiles at varying price points.</li>
                    <li><strong>Site Preparation:</strong> The current condition of your property affects excavation and base preparation costs.</li>
                    <li><strong>Additional Features:</strong> Fencing, lighting, seating, and shade structures add functionality but increase the investment.</li>
                  </ul>
                  
                  <p>Most residential pickleball court installations in DFW range from $25,000 to $45,000 for a complete project with quality materials and professional construction. For multi-court facilities or commercial projects, economies of scale may reduce per-court costs. Contact us for a detailed estimate specific to your property.</p>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-4 text-center">Contact DFW's Premier Sports Court Fencing Contractor</h3>
                <p className="text-lg mb-6 text-center">Ready to discuss your sports court project? Whether you need pickleball court installation, tennis court fencing, or athletic field solutions, contact Fence Fanatics today for expert advice and a free installation estimate.</p>
                <div className="flex justify-center">
                  <a href="tel:(469)607-0505" className="inline-block bg-texas-terracotta text-white px-6 py-3 rounded-md font-semibold text-lg hover:bg-texas-terracotta/90 transition-colors">
                    Call (469) 607-0505
                  </a>
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

export default SportsCourtPage;

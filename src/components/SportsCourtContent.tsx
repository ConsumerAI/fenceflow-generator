import React from 'react';
import { SPORTS_COURT_IMAGES } from '@/lib/images';
import LeadForm from './LeadForm';

interface SportsCourtContentProps {
  cityName?: string;
}

const SportsCourtContent: React.FC<SportsCourtContentProps> = ({ cityName = 'DFW' }) => {
  return (
    <main className="flex-1">
      <section className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Sports Court Installation & Fencing Solutions in {cityName}
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold mb-4">Professional Pickleball & Tennis Court Installation in {cityName}</h2>
              <p><strong>Call us now at <a href="tel:(469)607-0505">(469) 607-0505</a></strong></p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                <img 
                  src={SPORTS_COURT_IMAGES.pickleball}
                  alt={`Professional pickleball court installation in ${cityName}`}
                  className="w-full rounded-lg"
                />
                <img 
                  src={SPORTS_COURT_IMAGES.tennis}
                  alt={`Expert tennis court installation services in ${cityName}`}
                  className="w-full rounded-lg"
                />
              </div>
              
              <h3 className="text-2xl font-bold my-4">{cityName}'s Premier Pickleball Court Installer</h3>
              <p>Looking for professional pickleball court installers near you? Fence Fanatics is the {cityName} area's leading pickleball court installation company. Our expert team specializes in building regulation pickleball courts for residential properties, community centers, and commercial facilities throughout {cityName}.</p>
              
              <p>Whether you need a new pickleball court installed or are looking to upgrade existing facilities, we provide end-to-end services including site preparation, concrete work, surfacing, line marking, net post installation, and perimeter fencing.</p>
              
              <h3 className="text-2xl font-bold mt-6 mb-4">Expert Tennis Court Installation Services</h3>
              <p>As {cityName}'s trusted tennis court installer, we create premium tennis facilities built to professional standards. Our tennis court installation services include comprehensive solutions from initial design through completion, featuring proper drainage systems, high-quality surfacing options, and premium court accessories.</p>
              
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
            <h2 className="text-3xl font-bold mb-8 text-center">Complete Sports Court Fencing Solutions in {cityName}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src={SPORTS_COURT_IMAGES.fencing}
                  alt={`Pickleball court fencing and installation in ${cityName}`}
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>
              <div className="prose prose-lg max-w-none">
                <h3 className="text-2xl font-bold mb-4">Sports Court Fencing Expertise</h3>
                <p>At Fence Fanatics, we're not just court builders—we're the {cityName} area's leading sports court fencing contractor, specializing in comprehensive fencing solutions for all types of athletic facilities. From professional pickleball court fencing to tennis court fence installation, our team delivers durable, attractive enclosures designed for both functionality and appearance.</p>
                
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
            <h2 className="text-3xl font-bold mb-8">Pickleball Court Installation & Fencing in {cityName}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="prose prose-lg max-w-none">
                <h3 className="text-2xl font-bold mb-4">Comprehensive Pickleball Court Solutions</h3>
                <p>As {cityName}'s premier pickleball court installer, we provide complete court construction services from concept to completion. Our pickleball court installation process follows proven methodologies that ensure optimal playing surfaces and proper court layout.</p>
                
                <p>Our pickleball court services include:</p>
                <ul className="list-disc pl-6 my-4">
                  <li><strong>Site Evaluation & Preparation</strong> - Expert assessment and ground preparation for proper drainage and stability.</li>
                  <li><strong>Court Construction</strong> - Professional installation of concrete base, surfacing, and line marking.</li>
                  <li><strong>Net & Equipment Installation</strong> - Proper setup of net posts, nets, and other court equipment.</li>
                  <li><strong>Pickleball Court Fencing</strong> - Installation of regulation height fencing with gates.</li>
                  <li><strong>Lighting Systems</strong> - Optional court lighting for extended play hours.</li>
                  <li><strong>Windscreens & Accessories</strong> - Addition of windscreens, benches, and other court amenities.</li>
                </ul>
              </div>
              <div>
                <img 
                  src={SPORTS_COURT_IMAGES.pickleball}
                  alt={`Professional pickleball court installation in ${cityName}`}
                  className="rounded-lg shadow-lg w-full h-auto mb-8"
                />
                <img 
                  src={SPORTS_COURT_IMAGES.tennis}
                  alt={`Tennis court installation in ${cityName}`}
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-3xl font-bold mb-8">Tennis Court Fence Installation & Solutions in {cityName}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <img 
                  src={SPORTS_COURT_IMAGES.tennis}
                  alt={`Tennis court fence installation in ${cityName}`}
                  className="rounded-lg shadow-lg w-full h-auto mb-8"
                />
                <img 
                  src={SPORTS_COURT_IMAGES.fencing}
                  alt={`Tennis court fencing solutions in ${cityName}`}
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>
              <div className="prose prose-lg max-w-none">
                <h3 className="text-2xl font-bold mb-4">Premium Tennis Court Fencing</h3>
                <p>Our tennis court fence installation services in {cityName} deliver professional-grade enclosures that enhance both the functionality and aesthetics of your tennis facility. We understand the unique requirements of tennis court fencing and provide customized solutions that meet your specific needs.</p>
                
                <p>Our tennis court fencing services include:</p>
                <ul className="list-disc pl-6 my-4">
                  <li><strong>Professional Tennis Court Fence Installation</strong> - Expert installation of regulation height fencing (10-12 feet).</li>
                  <li><strong>Custom Gate Configurations</strong> - Strategic placement of single and double gates for convenient access.</li>
                  <li><strong>Windscreen Installation</strong> - High-quality windscreens for improved playing conditions.</li>
                  <li><strong>Privacy Panels</strong> - Optional privacy screening for enhanced player focus.</li>
                  <li><strong>Fence Accessories</strong> - Installation of center straps, equipment holders, and other accessories.</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8">Additional Sports Field Fencing Services in {cityName}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="prose prose-lg">
                <h3 className="text-xl font-bold mb-4">Baseball & Softball Field Fencing</h3>
                <p>We provide comprehensive baseball and softball field fencing solutions, including outfield fencing, backstops, dugout enclosures, and bullpen areas. Our installations meet league specifications and provide optimal player and spectator safety.</p>
              </div>
              <div className="prose prose-lg">
                <h3 className="text-xl font-bold mb-4">Football & Soccer Field Fencing</h3>
                <p>Our athletic field fencing solutions include perimeter fencing, spectator barriers, and equipment enclosures. We use durable materials designed to withstand heavy use and provide long-lasting performance.</p>
              </div>
              <div className="prose prose-lg">
                <h3 className="text-xl font-bold mb-4">Basketball & Volleyball Court Fencing</h3>
                <p>Our basketball and volleyball court fencing options provide secure play areas while maintaining visibility. We offer various height options and can include features like ball containment systems and access gates.</p>
              </div>
            </div>
          </div>
          
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8">Sports Court Fencing Materials & Specifications</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src={SPORTS_COURT_IMAGES.fencing}
                  alt={`Sports field fencing and materials in ${cityName}`}
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>
              <div className="prose prose-lg max-w-none">
                <p>We use only the highest quality materials for all our sports court fencing projects in {cityName}, ensuring durability, safety, and aesthetic appeal:</p>
                <ul className="list-disc pl-6 my-4">
                  <li><strong>Professional-Grade Chain Link Fencing</strong> - Premium-gauge materials with superior corrosion resistance.</li>
                  <li><strong>High-Performance Coating Systems</strong> - Professional powder coating or vinyl coating for enhanced durability.</li>
                  <li><strong>Commercial-Grade Hardware</strong> - Heavy-duty posts, rails, and fittings designed for long-term performance.</li>
                  <li><strong>Premium Windscreen Materials</strong> - Professional-grade mesh materials with reinforced edges and grommets.</li>
                  <li><strong>Quality Gate Components</strong> - Heavy-duty hinges, latches, and gate frames for smooth operation.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SportsCourtContent; 
import React from 'react';
import { SPORTS_COURT_IMAGES } from '@/lib/images';
import LeadForm from './LeadForm';

interface AthleticCourtsContentProps {
  cityName?: string;
}

const AthleticCourtsContent: React.FC<AthleticCourtsContentProps> = ({ cityName = 'DFW' }) => {
  return (
    <main className="flex-1">
      <section className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Athletic Courts and Sports Facilities Services in {cityName}
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold mb-4">Professional Pickleball & Tennis Court Installation in {cityName}</h2>
              
              <img 
                src={SPORTS_COURT_IMAGES.pickleball}
                alt={`Professional pickleball and tennis court installation in ${cityName}`}
                className="w-full rounded-lg mb-6"
              />
              
              <h3 className="text-2xl font-bold my-4">{cityName}'s Premier Pickleball Court Installer</h3>
              <p>Looking for professional pickleball court installers near you? We are the {cityName} area's leading pickleball court installation company. Our expert team specializes in building regulation pickleball courts for residential properties, community centers, and commercial facilities throughout {cityName}.</p>
              
              <p>Whether you need a new pickleball court installed or are looking to upgrade existing facilities, we provide end-to-end services including site preparation, concrete work, surfacing, line marking, net post installation, and perimeter fencing.</p>
              
              <h3 className="text-2xl font-bold mt-6 mb-4">Expert Tennis Court Installation Services</h3>
              <p>As {cityName}'s trusted tennis court installer, we create premium tennis facilities built to professional standards. Our tennis court installation services include comprehensive solutions from initial design through completion, featuring proper drainage systems, high-quality surfacing options, and premium court accessories.</p>
              
              <p>We handle every aspect of your tennis court project, including tennis court fence installation, windscreen installation, net post installation, and optional features like lighting systems and spectator areas.</p>

              <h4 className="text-xl font-bold mt-6 mb-4">The Cost to Install a Pickleball Court</h4>
              <p>When considering the cost to install a pickleball court in the {cityName} area, several factors influence the final investment:</p>
              
              <ul className="list-disc pl-6 my-4">
                <li><strong>Court Size:</strong> Standard pickleball courts are 20' x 44', but we can customize dimensions for your property.</li>
                <li><strong>Surface Material:</strong> Options include acrylic hard court surfaces, cushioned surfaces, or modular tiles at varying price points.</li>
                <li><strong>Site Preparation:</strong> The current condition of your property affects excavation and base preparation costs.</li>
                <li><strong>Additional Features:</strong> Fencing, lighting, seating, and shade structures add functionality but increase the investment.</li>
              </ul>
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
            <h2 className="text-3xl font-bold mb-8">Our Athletic Courts and Sports Facilities Construction Process</h2>
            <ol className="list-decimal pl-6 space-y-4">
              <li><strong>Initial Consultation:</strong> We discuss your vision, budget, and specific requirements for your {cityName} athletic courts and sports facilities.</li>
              <li><strong>Site Evaluation:</strong> Our experts inspect your property to assess conditions and identify any challenges.</li>
              <li><strong>Custom Design:</strong> We create detailed plans for your facility, including layout, surfacing options, and amenities.</li>
              <li><strong>Proposal & Contract:</strong> You receive a comprehensive proposal with transparent pricing and timeline.</li>
              <li><strong>Construction:</strong> Our skilled team executes the project with attention to detail and quality craftsmanship.</li>
              <li><strong>Final Inspection:</strong> We ensure everything meets our high standards before final walkthrough.</li>
              <li><strong>Ongoing Support:</strong> We stand behind our work with warranties and maintenance services.</li>
            </ol>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Premier Athletic Court Construction & Resurfacing Services</h2>
            <p className="mb-6">We understand the importance of a well-maintained facility to your game. Our athletic court installation and construction services are designed to provide the best playability and safety for athletes and enthusiasts alike. Here's why our solutions stand out:</p>
            
            <ul className="list-disc pl-6 mb-8">
              <li><strong>Comprehensive Evaluation:</strong> Before we begin, our experts conduct a thorough assessment of your facility area to identify all site requirements.</li>
              <li><strong>High-Performance Materials:</strong> We select the most durable and visually appealing surfacing materials, suitable for all athletic courts and sports facilities in {cityName}'s climate.</li>
              <li><strong>Expert Application:</strong> Our skilled professionals use the latest techniques and equipment for perfect results every time.</li>
            </ul>

            <img 
              src={SPORTS_COURT_IMAGES.tennis}
              alt={`Tennis and pickleball court with blue playing surface and green surroundings in ${cityName}`}
              className="rounded-lg shadow-lg w-full h-auto mb-8"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-4">Considerations Before Construction</h3>
              <ul className="list-disc pl-6 mb-6">
                <li><strong>Base Material:</strong> Choice between asphalt and various types of concrete.</li>
                <li><strong>Court Placement:</strong> Issues like site work, access for equipment, grading, and drainage.</li>
                <li><strong>Amenities:</strong> Decisions on fencing, wind screens, lighting, and shade structures.</li>
                <li><strong>Legal and Practical Requirements:</strong> Zoning restrictions, setback requirements, and utility access.</li>
              </ul>

              <h3 className="text-2xl font-bold mb-4">Site Work, Grading, and Sub-Base</h3>
              <p className="mb-4">The durability of your pickleball court starts with meticulous site work:</p>
              <ul className="list-disc pl-6">
                <li><strong>Orientation and Placement:</strong> North-south is preferred to reduce sun glare.</li>
                <li><strong>Slope and Drainage:</strong> A slope of .83% to 1% is ideal for water drainage.</li>
                <li><strong>Foundation:</strong> Includes layers of stone and vapor barriers under the concrete to prevent moisture damage.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4">Fencing and Lighting Options</h3>
              <h4 className="text-xl font-bold mb-2">Fencing</h4>
              <p className="mb-4">Fencing is essential for safety and ball containment:</p>
              <ul className="list-disc pl-6 mb-6">
                <li><strong>Materials and Design:</strong> Options range from chain link to vinyl, tailored for visibility and durability.</li>
                <li><strong>Height and Layout:</strong> Typically, fencing should be at least 6 feet high and encompass all sides of the court.</li>
              </ul>

              <h4 className="text-xl font-bold mb-2">Lighting</h4>
              <p className="mb-4">Proper lighting extends playing time and improves safety:</p>
              <ul className="list-disc pl-6">
                <li><strong>Types of Lights:</strong> LED and halogen are popular for their efficiency and brightness.</li>
                <li><strong>Placement and Coverage:</strong> Lights should be placed to minimize shadows and glare for players.</li>
              </ul>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8">Get Your Free Design Quote</h2>
            <p className="mb-8">Due to the variety of options available for pickleball court installations, including surface materials, site preparation requirements, additional features like fencing, lighting, seating, and shade structures, we provide custom quotes tailored to your specific needs. Contact us for a detailed estimate specific to your property and requirements.</p>
            <LeadForm />
          </div>
        </div>
      </section>
    </main>
  );
};

export default AthleticCourtsContent; 
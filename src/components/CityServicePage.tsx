import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import LeadForm from './LeadForm';
import { getCityFromUrl } from '@/lib/cities';
import { ServiceType } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import { supabase, generateCityContent } from '@/lib/supabase';

interface CityServicePageProps {
  service: ServiceType;
}

const scrollToForm = () => {
  const form = document.getElementById('lead-form');
  if (form) {
    form.scrollIntoView({ behavior: 'smooth' });
  }
};

const CityServicePage: React.FC<CityServicePageProps> = ({ service }) => {
  const { city: citySlug } = useParams<{ city: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const [content, setContent] = React.useState<any>(null);
  
  const cityName = getCityFromUrl(`/${citySlug}`);
  
  // Service image mapping
  const serviceImages = {
    "Sports Courts": "/lovable-uploads/7230064e-9fa2-45f8-abd3-d337e43f9067.png",
    "Residential Fencing": "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/6d4752ad-e781-4bec-92ec-b07a9dc74a07/Board+on+Board+with+Trim+and+Cap.jpg",
    "Commercial Fencing": "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/4d9c257b-d4c7-4206-8aa5-22623aa2f863/301399581_23852070435550391_1586117276639848672_n.jpg",
    "Access Control": "/lovable-uploads/223b3ff5-7edb-4b9f-8993-449414f2518b.png",
    "Automatic Gates": "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/7426f5b7-ded7-4a47-bc45-c4cb46fec966/star+gate.jpg"
  };
  
  React.useEffect(() => {
    if (!cityName) {
      navigate('/not-found');
      return;
    }
    
    const fetchContent = async () => {
      setLoading(true);
      try {
        const cachedContent = await supabase.getCachedContent(`/${citySlug}/${service.toLowerCase().replace(/\s+/g, '-')}`);
        if (cachedContent) {
          setContent(cachedContent);
        } else {
          const newContent = await generateCityContent(cityName);
          setContent(newContent);
          await supabase.cacheContent(`/${citySlug}/${service.toLowerCase().replace(/\s+/g, '-')}`, newContent);
        }
      } catch (error) {
        console.error('Error fetching city service content:', error);
        const fallbackContent = await generateCityContent(cityName);
        setContent(fallbackContent);
      } finally {
        setLoading(false);
      }
    };
    
    fetchContent();
  }, [citySlug, cityName, navigate, service]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-texas-terracotta" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p>Error loading content</p>
        </div>
        <Footer />
      </div>
    );
  }

  // Sports Courts content rendering
  if (service === "Sports Courts") {
    return (
      <>
        <Helmet>
          <title>{`Professional Sports Court Installation in ${cityName} | Pickleball & Tennis Court Contractors`}</title>
          <meta name="description" content={`Expert sports court installation in ${cityName}. Specializing in pickleball court installation, tennis court construction, and sports field fencing solutions. Free quotes!`} />
          <meta name="keywords" content={`pickleball court installer ${cityName}, tennis court installation near me, sports court fencing contractor ${cityName}, pickleball court fencing, tennis court fence, sports field fencing near me, chain link fence for baseball field, backstop fencing baseball, tennis court chain link fence, pickleball court windscreens, basketball court fencing, volleyball court fence, athletic field fencing`} />
          <link rel="canonical" href={`https://fencestexas.com/${citySlug}/sports-courts`} />
        </Helmet>
        
        <div className="min-h-screen flex flex-col">
          <Navbar />
          
          <main className="flex-1">
            <section className="pt-24 pb-16 md:pt-32 md:pb-24">
              <div className="container mx-auto px-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Sports Court Installation & Fencing Solutions in {cityName}
                </h1>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                  <div className="prose prose-lg max-w-none">
                    <h2 className="text-3xl font-bold mb-4">Professional Pickleball & Tennis Court Installation in {cityName}</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                      <img 
                        src="https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/1709258995381-OZJ85PI1IF9KHG170S1W/GettyImages-145988391.jpg" 
                        alt={`Professional pickleball court installation in ${cityName}`}
                        className="w-full rounded-lg"
                      />
                      <img 
                        src="https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/1709258995381-OZJ85PI1IF9KHG170S1W/GettyImages-145988391.jpg" 
                        alt={`Expert tennis court installation services in ${cityName}`}
                        className="w-full rounded-lg"
                      />
                    </div>
                    
                    <h3 className="text-2xl font-bold my-4">{cityName}'s Premier Pickleball Court Installer</h3>
                    <p>Looking for professional pickleball court installers near {cityName}? Fence Fanatics is {cityName}'s leading pickleball court installation company. Our expert team specializes in building regulation pickleball courts for residential properties, community centers, and commercial facilities throughout {cityName} and surrounding areas.</p>
                    
                    <p>Whether you need a new pickleball court installed or are looking to upgrade existing facilities in {cityName}, we provide end-to-end services including site preparation, concrete work, surfacing, line marking, net post installation, and perimeter fencing.</p>
                    
                    <h3 className="text-2xl font-bold mt-6 mb-4">Expert Tennis Court Installation Services</h3>
                    <p>As {cityName}'s trusted tennis court installer, we create premium tennis facilities built to professional standards. Our tennis court installation services include comprehensive solutions from initial design through completion, featuring proper drainage systems, high-quality surfacing options, and premium court accessories.</p>
                    
                    <p>We handle every aspect of your tennis court project in {cityName}, including tennis court fence installation, windscreen installation, net post installation, and optional features like lighting systems and spectator areas.</p>
                  </div>
                  
                  <div>
                    <LeadForm city={cityName} />
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
                        src="https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/1709258995381-OZJ85PI1IF9KHG170S1W/GettyImages-145988391.jpg" 
                        alt={`Pickleball court fencing and installation in ${cityName}`}
                        className="rounded-lg shadow-lg w-full h-auto"
                      />
                    </div>
                    <div className="prose prose-lg max-w-none">
                      <h3 className="text-2xl font-bold mb-4">Sports Court Fencing Expertise</h3>
                      <p>At Fence Fanatics, we're not just court builders—we're {cityName}'s leading sports court fencing contractor, specializing in comprehensive fencing solutions for all types of athletic facilities. From professional pickleball court fencing to tennis court fence installation, our team delivers durable, attractive enclosures designed for both functionality and appearance.</p>
                      
                      <p>Our sports field fencing options in {cityName} include:</p>
                      <ul className="list-disc pl-6 my-4">
                        <li><strong>Chain Link Sports Fencing</strong> - Durable and cost-effective solutions</li>
                        <li><strong>Vinyl-Coated Options</strong> - Enhanced aesthetics and protection</li>
                        <li><strong>Custom Heights</strong> - Tailored to your specific needs</li>
                        <li><strong>Windscreen Systems</strong> - Improved playing conditions</li>
                        <li><strong>Security Features</strong> - Access control and safety measures</li>
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
                      
                      <p>Our pickleball court services in {cityName} include:</p>
                      <ul className="list-disc pl-6 my-4">
                        <li><strong>Site Evaluation & Preparation</strong> - Expert assessment and ground preparation for proper drainage and stability.</li>
                        <li><strong>Base Construction</strong> - Engineered foundations specifically designed for pickleball play.</li>
                        <li><strong>Surface Installation</strong> - Premium acrylic surfaces with precise line markings.</li>
                        <li><strong>Pickleball Court Fencing</strong> - Durable perimeter fencing with customizable heights and configurations.</li>
                        <li><strong>Pickleball Court Windscreens</strong> - Wind reduction solutions that enhance playability and provide privacy.</li>
                        <li><strong>Pickleball Court Safety Barriers</strong> - Protective elements that enhance player and spectator safety.</li>
                      </ul>
                    </div>
                    <div className="prose prose-lg max-w-none">
                      <h3 className="text-2xl font-bold mb-4">Pickleball Court Fencing Options</h3>
                      <p>The right fencing is essential for a complete pickleball facility. As experienced pickleball court fencing contractors in {cityName}, we offer multiple options to meet your specific needs:</p>
                      
                      <ul className="list-disc pl-6 my-4">
                        <li><strong>Chain Link Pickleball Court Fence</strong> - Our most popular option, providing visibility and durability with various coating options.</li>
                        <li><strong>Pickleball Court Fence Dimensions</strong> - Typically installed at 8-10 feet height with proper spacing from court lines.</li>
                        <li><strong>Pickleball Court Privacy Fencing</strong> - Enhanced options for facilities requiring additional privacy or wind control.</li>
                        <li><strong>Pickleball Court Fence Specifications</strong> - All installations meet professional standards for safety and performance.</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="mb-16">
                  <h2 className="text-3xl font-bold mb-8">Tennis Court Fence Installation & Solutions in {cityName}</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="prose prose-lg max-w-none">
                      <h3 className="text-2xl font-bold mb-4">Premium Tennis Court Fencing</h3>
                      <p>Our tennis court fence installation services in {cityName} deliver professional-grade enclosures that enhance your facility's appearance, security, and functionality. As an experienced tennis court fencing company, we understand the specific requirements for these specialized sports enclosures.</p>
                      
                      <p>Our tennis court fencing solutions include:</p>
                      <ul className="list-disc pl-6 my-4">
                        <li><strong>Tennis Court Galvanized Fencing</strong> - Durable, corrosion-resistant options designed for longevity in outdoor environments.</li>
                        <li><strong>Tennis Court Fence Aesthetics</strong> - Attractive designs that complement your property while providing necessary functionality.</li>
                        <li><strong>Tennis Court Fence Maintenance</strong> - Ongoing services to ensure your fencing remains in optimal condition.</li>
                        <li><strong>Tennis Court Privacy Screens</strong> - Windscreen and privacy options that improve playing conditions.</li>
                      </ul>
                    </div>
                    <div>
                      <img 
                        src="https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/1709258995381-OZJ85PI1IF9KHG170S1W/GettyImages-145988391.jpg" 
                        alt={`Tennis court fence installation in ${cityName}`}
                        className="rounded-lg shadow-lg w-full h-auto"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mb-16">
                  <h2 className="text-3xl font-bold mb-8">Additional Sports Field Fencing Services in {cityName}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <h3 className="text-xl font-bold mb-3">Baseball & Softball Field Fencing</h3>
                      <p>Our {cityName} baseball field fencing services include outfield fence installation, backstop fencing for baseball and softball fields, and safety netting systems. We understand proper baseball outfield fence height requirements and provide durable chain link fence for baseball field enclosures tailored to league specifications and facility needs.</p>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <h3 className="text-xl font-bold mb-3">Football & Soccer Field Fencing</h3>
                      <p>We provide complete stadium fence installation services in {cityName} including football stadium fencing, soccer field fence perimeters, and track field boundary solutions. Our sports field fence for spectators ensures safety while offering optimal viewing experiences.</p>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <h3 className="text-xl font-bold mb-3">Basketball & Volleyball Court Fencing</h3>
                      <p>Our {cityName} basketball court fencing and volleyball court fence solutions provide secure, attractive boundaries for recreational facilities. We install durable basketball court chain link fence systems and volleyball court fencing designed to contain play while allowing spectator visibility.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-16">
                  <h2 className="text-3xl font-bold mb-8">Sports Court Fencing Materials & Specifications</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                      <img 
                        src="https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/1709258995381-OZJ85PI1IF9KHG170S1W/GettyImages-145988391.jpg" 
                        alt={`Sports field fencing and materials in ${cityName}`}
                        className="rounded-lg shadow-lg w-full h-auto"
                      />
                    </div>
                    <div className="prose prose-lg max-w-none">
                      <p>When it comes to sports field fence materials in {cityName}, quality and durability are essential. Our comprehensive options include:</p>
                      
                      <ul className="list-disc pl-6 space-y-3 my-4">
                        <li><strong>Galvanized Chain Link Sports Fence</strong> - Traditional, cost-effective option with excellent durability.</li>
                        <li><strong>Vinyl-Coated Sports Fencing</strong> - Enhanced appearance with additional corrosion protection.</li>
                        <li><strong>Aluminum Fencing for Sports Fields</strong> - Premium look with minimal maintenance requirements.</li>
                        <li><strong>Sports Field Fence Height</strong> - Various height options to meet specific sport requirements.</li>
                        <li><strong>Sports Court Fence Wind Reduction</strong> - Windscreen systems that improve playing conditions.</li>
                        <li><strong>Athletic Field Fence Aesthetics</strong> - Design options that enhance facility appearance.</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <h3 className="text-2xl font-bold mb-4 text-center">Contact {cityName}'s Premier Sports Court Fencing Contractor</h3>
                  <p className="text-lg mb-6 text-center">Ready to discuss your sports court project in {cityName}? Whether you need pickleball court installation, tennis court fencing, or athletic field solutions, contact Fence Fanatics today for expert advice and a free installation estimate.</p>
                  <div className="flex justify-center">
                    <LeadForm city={cityName} />
                  </div>
                </div>
              </div>
            </section>
          </main>
          
          <Footer />
        </div>
      </>
    );
  }

  // Handle other service types with existing code
  return (
    <>
      <Helmet>
        <title>{`${service} in ${cityName} | Fence Fanatics`}</title>
        <meta name="description" content={`Professional ${service.toLowerCase()} services in ${cityName}, TX. Get a free quote today!`} />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1">
          <section className="pt-24 pb-16 md:pt-32 md:pb-24 texas-section">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {service} in {cityName}, Texas
              </h1>
              
              {service === "Commercial Fencing" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
                  <div className="prose prose-lg max-w-none">
                    <h2 className="text-3xl font-bold mb-4">Commercial Fencing Solutions in {cityName}</h2>
                    <p>You need a partner who is <strong>Professional</strong>, <strong>Dependable</strong>, <strong>Scalable</strong>, and <strong>Proficient</strong> with any fencing requirements in {cityName}. That partner must offer the best fencing solutions to keep your properties, tenants, and customers protected.</p>
                    <p>General Contractors in {cityName} choose <strong>Fence Fanatics</strong> as a supplier-of-choice because we are <strong>technology-forward</strong>, <strong>process-driven</strong>, and committed to <strong>excellence</strong> at all levels.</p>
                    
                    <h3 className="text-2xl font-semibold mt-6">Our Commercial Capabilities in {cityName}</h3>
                    <ul className="grid grid-cols-2 gap-2">
                      <li>Pre-Fab Walls</li>
                      <li>Dumpster Enclosures</li>
                      <li>Farm and Ranch</li>
                      <li>Security Fencing</li>
                      <li>Apartment Fencing</li>
                      <li>Housing Development Fencing</li>
                      <li>Pool Fencing</li>
                      <li>Multi-family Services</li>
                      <li>Athletics Fencing</li>
                      <li>Chain link Fencing</li>
                      <li>Custom Gates</li>
                      <li>Security Gates</li>
                      <li>Access Controls</li>
                      <li>Solar Power</li>
                      <li>Sound Barriers</li>
                      <li>Retaining Walls</li>
                    </ul>
                    
                    <div className="mt-6">
                      <img src={serviceImages["Commercial Fencing"]} alt="Commercial fencing in Texas" className="rounded-lg shadow-lg w-full h-auto" />
                    </div>
                  </div>
                  
                  <div>
                    <LeadForm city={cityName} />
                  </div>
                </div>
              )}
              
              {service === "Access Control" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
                  <div className="prose prose-lg max-w-none">
                    <h2 className="text-3xl font-bold mb-4">Access Control Solutions in {cityName}</h2>
                    <p>At <strong>Fence Fanatics</strong>, we understand that your security in {cityName} is a top priority. That's why we offer <strong>state-of-the-art access control solutions</strong> tailored to meet your specific needs. Whether it's for commercial, residential, or industrial properties in {cityName}, we provide systems that integrate seamlessly with your fencing to create a secure perimeter.</p>
                    
                    <h3 className="text-2xl font-semibold mt-6">Our Access Control Offerings for {cityName}</h3>
                    <ul className="space-y-4">
                      <li>
                        <strong>Gate Operators & Automation</strong>
                        <p>Simplify your entry points in {cityName} with automated gate systems. We offer durable and reliable solutions for swing, slide, and barrier gates.</p>
                      </li>
                      <li>
                        <strong>Keypads & Card Readers</strong>
                        <p>Control access to your {cityName} property with user-friendly keypads and card reader systems. Manage permissions efficiently to ensure only authorized individuals can enter.</p>
                      </li>
                      <li>
                        <strong>Smartphone-Integrated Systems</strong>
                        <p>Take control of your security remotely with systems that connect directly to your smartphone. Grant or deny access, monitor activity, and receive alerts with ease for your {cityName} property.</p>
                      </li>
                    </ul>
                    
                    <div className="mt-6">
                      <img src={serviceImages["Access Control"]} alt="Access control systems in Texas" className="rounded-lg shadow-lg w-full h-auto" />
                    </div>
                  </div>
                  
                  <div>
                    <LeadForm city={cityName} />
                  </div>
                </div>
              )}
              
              {service === "Automatic Gates" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
                  <div className="prose prose-lg max-w-none">
                    <h2 className="text-3xl font-bold mb-4">Automatic Gates in {cityName}</h2>
                    <p>Enhance your property's security and curb appeal in {cityName} with our premium automatic gate solutions. At Fence Fanatics, we create custom gate systems that provide convenience, security, and style for homes and businesses throughout {cityName}.</p>
                    
                    <h3 className="text-2xl font-semibold mt-6">Custom Gate Solutions for {cityName} Properties</h3>
                    <p>Our automatic gates are designed specifically for {cityName}'s unique architectural styles and security needs. We offer both residential driveway gates and commercial entrance systems with options for swing, sliding, or bi-folding designs. Using premium materials like wrought iron, wood, aluminum, and steel, we ensure your gate is both beautiful and durable against {cityName}'s weather conditions.</p>
                    
                    <h3 className="text-2xl font-semibold mt-6">Advanced Automation Features</h3>
                    <ul>
                      <li>Remote control access systems</li>
                      <li>Keypad and intercom entry</li>
                      <li>Smartphone control integration</li>
                      <li>Vehicle detection sensors</li>
                      <li>Safety feature compliance</li>
                      <li>Solar power options</li>
                      <li>Battery backup systems</li>
                    </ul>
                    
                    <div className="mt-6">
                      <img src={serviceImages["Automatic Gates"]} alt="Automatic gate installation in Texas" className="rounded-lg shadow-lg w-full h-auto" />
                    </div>
                  </div>
                  
                  <div>
                    <LeadForm city={cityName} />
                  </div>
                </div>
              )}
              
              {service === "Residential Fencing" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
                  <div className="prose prose-lg max-w-none">
                    <h2 className="text-3xl font-bold mb-4">Residential Fencing in {cityName}</h2>
                    <p>Transform your {cityName} property with our premium residential fencing solutions. Whether you're looking for privacy, security, or enhanced curb appeal, our expert team delivers beautiful, durable fences tailored to your home's unique style and needs.</p>
                    
                    <h3 className="text-2xl font-semibold mt-6">Residential Fencing Options for {cityName} Homes</h3>
                    <ul>
                      <li><strong>Wood Fencing</strong> - Classic cedar and pine options perfect for {cityName} homes</li>
                      <li><strong>Ornamental Iron</strong> - Elegant security solutions with custom designs</li>
                      <li><strong>Vinyl/PVC</strong> - Low-maintenance options in various colors and styles</li>
                      <li><strong>Chain Link</strong> - Affordable security for yards and pet areas</li>
                      <li><strong>Privacy Fencing</strong> - Tall, solid designs for maximum seclusion</li>
                      <li><strong>Picket Fencing</strong> - Charming, traditional options for front yards</li>
                    </ul>
                    
                    <h3 className="text-2xl font-semibold mt-6">Why {cityName} Homeowners Choose Our Fencing</h3>
                    <p>Our residential fences are built to withstand {cityName}'s unique climate while complementing your home's architecture. We use premium materials selected specifically for durability in Texas weather, ensuring your investment looks beautiful for years to come. From initial design consultation to final installation, our {cityName}-based team delivers exceptional craftsmanship and customer service.</p>
                    
                    <div className="mt-6">
                      <img src={serviceImages["Residential Fencing"]} alt="Residential fencing in Texas" className="rounded-lg shadow-lg w-full h-auto" />
                    </div>
                  </div>
                  
                  <div>
                    <LeadForm city={cityName} />
                  </div>
                </div>
              )}
              
              {!["Sports Courts", "Commercial Fencing", "Access Control", "Automatic Gates", "Residential Fencing"].includes(service) && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="prose prose-lg max-w-none">
                    <p>{content.serviceSections[service]}</p>
                    
                    <div className="mt-6">
                      <img 
                        src={serviceImages[service] || "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/6d4752ad-e781-4bec-92ec-b07a9dc74a07/Board+on+Board+with+Trim+and+Cap.jpg"} 
                        alt={`${service} in ${cityName}`} 
                        className="rounded-lg shadow-lg w-full h-auto"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <LeadForm city={cityName} />
                  </div>
                </div>
              )}
            </div>
          </section>
          
          {service === "Commercial Fencing" && (
            <section className="py-16 bg-gray-50">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8">Premium Commercial Fencing Solutions in {cityName}</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Chain Link Fencing</h3>
                    <p>Chain link fencing remains one of the most popular choices for {cityName} commercial and industrial applications due to its affordability, strength, and adaptability. Whether you need perimeter security for warehouses, sports facilities, or schools, chain link fences are built to withstand {cityName}'s elements while maintaining visibility. With options for height, coating, and mesh size, this fencing can be tailored to meet the specific needs of your property.</p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Ameristar Fencing</h3>
                    <p>Ameristar is a leader in <strong>high-security perimeter fencing</strong>, offering premium ornamental steel and aluminum fence solutions for {cityName} commercial and industrial properties. Designed for strength and aesthetic appeal, Ameristar products provide an elegant yet durable solution for securing your property. From anti-climb designs to crash-rated barriers, Ameristar fences are engineered to meet the highest standards in security.</p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Betafence</h3>
                    <p>Betafence is a global leader in advanced fencing systems, specializing in <strong>high-performance wire mesh fencing and welded panels</strong>. Their solutions are designed to protect critical infrastructure, industrial sites, and commercial properties throughout {cityName}. Betafence offers innovative designs like the <strong>Nylofor® and Publifor®</strong> systems, which provide unparalleled durability and anti-intrusion features.</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-6">Access Control Systems for {cityName} Businesses</h3>
                    <p className="text-lg mb-4">Access control is essential for modern facility management in {cityName}, enabling you to monitor and manage who enters and exits your property. We offer advanced access control systems that integrate seamlessly with gates and barriers, providing enhanced security and convenience. Features include:</p>
                    <ul className="list-disc pl-8 text-lg mb-6 space-y-2">
                      <li><strong>Cloud-based management</strong> for remote operation and control.</li>
                      <li><strong>Keypad and card readers</strong> for secure, customizable access.</li>
                      <li><strong>Vehicle detection systems</strong> for automated entry and exit.</li>
                    </ul>
                    <p className="text-lg">With options tailored for commercial and industrial use in {cityName}, our access control systems ensure your property remains secure while improving operational efficiency.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold mb-6">Professional Installation & Service</h3>
                    <p className="text-lg mb-4">Our team of experienced fence professionals serves {cityName} and surrounding areas with exceptional installation quality. We understand the local climate considerations, soil conditions, and permit requirements specific to {cityName}, ensuring your commercial fence project completes smoothly and stands the test of time.</p>
                    <p className="text-lg">After installation, our comprehensive maintenance programs help extend the life of your commercial fencing investment, with regular inspections, repairs, and upgrades available to all {cityName} clients.</p>
                  </div>
                </div>
              </div>
            </section>
          )}
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default CityServicePage;

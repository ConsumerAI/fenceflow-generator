import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import LeadForm from './LeadForm';
import { cities, getCityFromUrl } from '@/lib/cities';
import { ServiceType } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import { supabase, generateCityContent } from '@/lib/supabase';

interface CityServicePageProps {
  service: ServiceType;
}

const CityServicePage: React.FC<CityServicePageProps> = ({ service }) => {
  const { city: citySlug } = useParams<{ city: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const [content, setContent] = React.useState<any>(null);
  
  const cityName = getCityFromUrl(`/${citySlug}`);
  
  // Service image mapping
  const serviceImages = {
    "Residential Fencing": "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/6d4752ad-e781-4bec-92ec-b07a9dc74a07/Board+on+Board+with+Trim+and+Cap.jpg",
    "Commercial Fencing": "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/4d9c257b-d4c7-4206-8aa5-22623aa2f863/301399581_23852070435550391_1586117276639848672_n.jpg",
    "Sports Courts": "https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/1709258995381-OZJ85PI1IF9KHG170S1W/GettyImages-145988391.jpg",
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

  return (
    <>
      <Helmet>
        <title>{`${service} in ${cityName} | Fence Fanatics`}</title>
        <meta name="description" content={`Professional ${service.toLowerCase()} services in ${cityName}, TX. Get a free quote today!`} />
        {service === "Sports Courts" && (
          <>
            <meta name="keywords" content={`pickleball court installer ${cityName}, tennis court installer ${cityName}, pickleball court installation near me, tennis court installation near me, sports court builder ${cityName}, pickleball court fencing ${cityName}, tennis court fence installation ${cityName}, sports court fencing contractor ${cityName}, basketball court fencing, chain link fence for tennis court, sports field fencing near me`} />
            <link rel="canonical" href={`https://fencestexas.com/${citySlug}/sports-courts`} />
          </>
        )}
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1">
          <section className="pt-24 pb-16 md:pt-32 md:pb-24 texas-section">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {service} in {cityName}, Texas
              </h1>
              
              {service === "Sports Courts" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
                  <div className="prose prose-lg max-w-none">
                    <h2 className="text-3xl font-bold mb-4">Pickleball & Tennis Court Installer in {cityName}</h2>
                    <p><strong>Call us now at <a href="tel:(469)607-0505">(469) 607-0505</a></strong> - The premier pickleball court installer in {cityName}</p>
                    
                    <div className="my-6">
                      <img 
                        src="/lovable-uploads/e375c1f0-53ad-4729-a527-958c7ccc73c8.png" 
                        alt={`Professional pickleball and tennis court installation in ${cityName}`} 
                        className="w-full rounded-lg"
                      />
                    </div>
                    
                    {service === "Sports Courts" && (
                      <>
                        <h3 className="text-2xl font-semibold mt-6">Premier Pickleball Court Installation in {cityName}</h3>
                        <p>Looking for professional pickleball court installers near {cityName}? At Fence Fanatics, we're the leading pickleball court installation company serving {cityName} and surrounding areas. Our expert team specializes in building regulation pickleball courts for residential properties, community centers, and commercial facilities throughout {cityName}.</p>
                        
                        <p>Whether you need a new pickleball court installed or are looking to upgrade existing facilities in {cityName}, we provide end-to-end services including site preparation, concrete work, surfacing, line marking, net installation, and perimeter fencing.</p>
                        
                        <h3 className="text-2xl font-semibold mt-6">Expert Tennis Court Installation in {cityName}</h3>
                        <p>As the trusted tennis court installer in {cityName}, we create premium tennis facilities built to professional standards. Our tennis court installation services in {cityName} include comprehensive solutions from initial design through completion, featuring proper drainage systems, high-quality surfacing options, and premium court accessories.</p>
                        
                        <p>We handle every aspect of your tennis court project in {cityName}, including tennis court fence installation, windscreen installation, net post installation, and optional features like lighting systems and spectator areas.</p>
                      </>
                    )}
                  </div>
                  <div>
                    <LeadForm city={cityName} />
                  </div>
                </div>
              )}
              
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
                  </div>
                  <div>
                    <img src={serviceImages["Commercial Fencing"]} alt="Commercial fencing in Texas" className="rounded-lg shadow-lg w-full h-auto" />
                    <div className="mt-12">
                      <LeadForm city={cityName} />
                    </div>
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
                  </div>
                  <div>
                    <img src={serviceImages["Access Control"]} alt="Access control systems in Texas" className="rounded-lg shadow-lg w-full h-auto" />
                    <div className="mt-12">
                      <LeadForm city={cityName} />
                    </div>
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
                  </div>
                  <div>
                    <img src={serviceImages["Automatic Gates"]} alt="Automatic gate installation in Texas" className="rounded-lg shadow-lg w-full h-auto" />
                    <div className="mt-12">
                      <LeadForm city={cityName} />
                    </div>
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
                  </div>
                  <div>
                    <img src={serviceImages["Residential Fencing"]} alt="Residential fencing in Texas" className="rounded-lg shadow-lg w-full h-auto" />
                    <div className="mt-12">
                      <LeadForm city={cityName} />
                    </div>
                  </div>
                </div>
              )}
              
              {!["Sports Courts", "Commercial Fencing", "Access Control", "Automatic Gates", "Residential Fencing"].includes(service) && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="prose prose-lg max-w-none">
                    <p>{content.serviceSections[service]}</p>
                  </div>
                  <div className="lg:ml-auto w-full max-w-lg">
                    <LeadForm city={cityName} />
                  </div>
                </div>
              )}
            </div>
          </section>
          
          {service === "Sports Courts" && (
            <section className="py-16 bg-gray-50">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8">Pickleball Court Installation & Fencing Services in {cityName}</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                  <div className="prose prose-lg max-w-none">
                    <h3 className="text-2xl font-semibold mb-4">Professional Pickleball Court Installation</h3>
                    <p>As {cityName}'s pickleball court installation experts, we deliver custom pickleball court solutions for homeowners, clubs, and commercial facilities throughout the area. Our pickleball court installation process is comprehensive and includes:</p>
                    
                    <ul className="list-disc pl-6 space-y-2 my-4">
                      <li><strong>Site Evaluation</strong> - We assess your {cityName} property to determine the optimal location and orientation for your pickleball court.</li>
                      <li><strong>Custom Design</strong> - Our team creates a tailored pickleball court design for your {cityName} property, considering space constraints and aesthetic preferences.</li>
                      <li><strong>Complete Construction</strong> - From excavation to final surfacing, our pickleball court installers handle every aspect of court construction in {cityName}.</li>
                      <li><strong>Post Installation</strong> - We install regulation pickleball net posts, nets, and perimeter fencing to complete your court in {cityName}.</li>
                    </ul>
                    
                    <h3 className="text-2xl font-semibold mt-6 mb-4">The Cost to Install a Pickleball Court in {cityName}</h3>
                    <p>When considering the cost to install a pickleball court in {cityName}, several factors influence the final investment:</p>
                    
                    <ul className="list-disc pl-6 space-y-2 my-4">
                      <li><strong>Court Size</strong> - Standard pickleball courts are 20' x 44', but we can customize dimensions for your {cityName} property.</li>
                      <li><strong>Surface Material</strong> - Options include acrylic hard court surfaces, cushioned surfaces, or modular tiles at varying price points.</li>
                      <li><strong>Site Preparation</strong> - The current condition of your {cityName} property affects excavation and base preparation costs.</li>
                      <li><strong>Additional Features</strong> - Fencing, lighting, seating, and shade structures add functionality but increase the investment.</li>
                    </ul>
                    
                    <p>Most residential pickleball court installations in {cityName} range from $25,000 to $45,000 for a complete project with quality materials and professional construction. Contact us for a detailed estimate specific to your {cityName} property.</p>
                  </div>
                  <div>
                    <img src="/lovable-uploads/e375c1f0-53ad-4729-a527-958c7ccc73c8.png" alt={`Pickleball court installation in ${cityName}`} className="rounded-lg shadow-lg w-full h-auto mb-6" />
                    <img src="/lovable-uploads/ff181a35-3894-4eb0-82b4-f588c9c59ff1.png" alt={`Tennis court installation in ${cityName}`} className="rounded-lg shadow-lg w-full h-auto" />
                  </div>
                </div>
                
                <div className="mb-16">
                  <h2 className="text-3xl font-bold mb-8">Pickleball Court Fencing & Barriers in {cityName}</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                      <img src="/lovable-uploads/e375c1f0-53ad-4729-a527-958c7ccc73c8.png" alt={`Pickleball court fencing in ${cityName}`} className="rounded-lg shadow-lg w-full h-auto" />
                    </div>
                    <div className="prose prose-lg max-w-none">
                      <h3 className="text-2xl font-semibold mb-4">Pickleball Court Fence Design & Installation</h3>
                      <p>As {cityName}'s trusted pickleball court fencing contractor, we understand that proper fencing is essential for both functionality and aesthetics. Our pickleball court fence specifications meet industry standards while providing the perfect enclosure for your court.</p>
                      
                      <ul className="list-disc pl-6 space-y-2 my-4">
                        <li><strong>Pickleball Court Fence Dimensions</strong> - We install perimeter fencing at optimal heights (typically 8-10 feet) with proper spacing from court lines to ensure ball containment without compromising play.</li>
                        <li><strong>Windscreen Integration</strong> - Our pickleball court windscreens reduce wind interference while providing privacy and a clean backdrop for improved ball visibility.</li>
                        <li><strong>Safety Barriers</strong> - We install pickleball court safety barriers designed to protect both players and spectators while enhancing the court experience.</li>
                        <li><strong>Gate Placement</strong> - Strategic access points are incorporated into the pickleball court fence installation for convenient entry and exit.</li>
                      </ul>
                      
                      <p>Whether you need residential pickleball court fencing or a commercial installation, our {cityName} team delivers durable, attractive solutions using premium pickleball court fencing materials that withstand the Texas climate while complementing your property.</p>
                    </div>
                  </div>
                </div>
                
                <h2 className="text-3xl font-bold mb-8">Tennis Court Installation & Fencing in {cityName}</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                  <div className="prose prose-lg max-w-none">
                    <h3 className="text-2xl font-semibold mb-4">Complete Tennis Court Construction Services</h3>
                    <p>As {cityName}'s trusted tennis court installation company, we provide comprehensive tennis court construction services tailored to your specific needs. Our tennis court installation process includes:</p>
                    
                    <ul className="list-disc pl-6 space-y-2 my-4">
                      <li><strong>Tennis Court Design</strong> - Custom layouts that maximize your {cityName} property's potential while meeting regulation standards.</li>
                      <li><strong>Site Preparation</strong> - Proper grading and drainage installation crucial for long-lasting tennis courts in {cityName}'s climate.</li>
                      <li><strong>Base Construction</strong> - Engineered foundations designed specifically for tennis play and local soil conditions in {cityName}.</li>
                      <li><strong>Surface Application</strong> - Premium acrylic surfacing, clay court installation, or synthetic grass tennis court options.</li>
                      <li><strong>Tennis Court Fence Installation</strong> - Durable perimeter fencing with custom heights and gate configurations.</li>
                      <li><strong>Tennis Windscreen Installation</strong> - Professional windscreen systems to improve playing conditions in {cityName}.</li>
                      <li><strong>Tennis Net Post Installation</strong> - Regulation net systems properly anchored for stability and performance.</li>
                    </ul>
                    
                    <h3 className="text-2xl font-semibold mt-6 mb-4">Tennis Court Fencing Solutions</h3>
                    <p>Our tennis court fence installation services in {cityName} feature premium chain link fence for tennis court enclosures, designed for durability and appearance. We offer various tennis court fencing heights to accommodate different facility needs, along with tennis court privacy screens and customized gate systems.</p>
                    
                    <p>With our tennis court fence maintenance programs, your {cityName} court will maintain its tennis court fence aesthetics and structural integrity for years to come. Our tennis court galvanized fencing resists corrosion while providing the secure enclosure your facility needs.</p>
                  </div>
                  <div>
                    <img src={serviceImages["Sports Courts"]} alt={`Tennis court construction in ${cityName}`} className="rounded-lg shadow-lg w-full h-auto" />
                  </div>
                </div>
                
                <div className="mb-16">
                  <h2 className="text-3xl font-bold mb-8">Other Sports Field Fencing in {cityName}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <h3 className="text-xl font-bold mb-3">Baseball Field Fencing</h3>
                      <p>Our {cityName} team specializes in complete baseball field fencing solutions, including outfield fence installation, backstop fencing for baseball & softball fields, and protective baseball field safety netting. We understand proper baseball outfield fence height requirements and provide durable chain link fence for baseball field enclosures tailored to your facility's needs.</p>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <h3 className="text-xl font-bold mb-3">Basketball & Volleyball Courts</h3>
                      <p>Enhance your recreational facilities with our basketball court fencing and volleyball court fence solutions. We install durable basketball court chain link fence systems and volleyball court fencing designed to contain play while allowing spectator visibility. Our sports court fence options include both chain link and basketball court privacy fencing based on your requirements.</p>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <h3 className="text-xl font-bold mb-3">Football & Soccer Fields</h3>
                      <p>Our stadium fence installation services include football stadium fencing, soccer field fence enclosures, and track field perimeter fence systems. We provide football field chain link fence and soccer field perimeter fencing solutions that enhance facility safety and appearance while meeting the specific needs of athletic venues in {cityName}.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-16">
                  <h2 className="text-3xl font-bold mb-8">Sports Court Fencing Materials & Options</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="prose prose-lg max-w-none">
                      <p>At Fence Fanatics, we offer a comprehensive range of sports field fence materials to ensure your {cityName} facility gets the perfect combination of durability, functionality, and appearance:</p>
                      
                      <ul className="list-disc pl-6 space-y-3 my-4">
                        <li><strong>Galvanized Chain Link Sports Fence</strong> - Our most popular and cost-effective option for sports court fencing, providing excellent durability and visibility.</li>
                        <li><strong>Vinyl-Coated Sports Fencing</strong> - Enhanced aesthetics and corrosion resistance with color options to complement your facility design.</li>
                        <li><strong>Aluminum Fencing for Sports Fields</strong> - Premium appearance with minimal maintenance requirements, ideal for front-facing or public facilities.</li>
                        <li><strong>Custom Sports Court Fencing</strong> - Tailored solutions for unique requirements including mixed materials and decorative elements.</li>
                      </ul>
                      
                      <p>All our sports field fence installations in {cityName} are performed by experienced sports court fencing contractors who understand the unique requirements of athletic facilities. We consider factors like sports field fence height, wind exposure, spectator access, and aesthetic preferences to create the perfect sports court fence design for your needs.</p>
                      
                      <p>Our sports field fence for spectators ensures safety while providing optimal viewing experiences, and our sports court fence wind reduction features minimize environmental interference with play. Whether you need durable stadium fencing, aesthetic sports court fencing, or multi-purpose athletic field fencing, our {cityName} team delivers outstanding results.</p>
                    </div>
                    <div>
                      <img src="/lovable-uploads/06ad0853-44a4-41c1-bb88-5389b46bc009.png" alt={`Sports field fencing in ${cityName}`} className="rounded-lg shadow-lg w-full h-auto" />
                    </div>
                  </div>
                </div>
                
                <div className="mt-16">
                  <h2 className="text-3xl font-bold mb-8">Additional Sports Court Services in {cityName}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <h3 className="text-xl font-bold mb-3">Multi-Sport Court Solutions</h3>
                      <p>Our {cityName} sports court construction team specializes in designing and building versatile recreational spaces that can accommodate multiple sports on a single court. This approach maximizes your property's potential while providing diverse athletic options. Our multi-court pickleball fencing systems are perfect for clubs and community centers looking to expand playing capacity.</p>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <h3 className="text-xl font-bold mb-3">Commercial Sports Fencing</h3>
                      <p>For {cityName} businesses, schools, and public facilities, our commercial sports fencing solutions provide the perfect combination of security, durability, and professional appearance. We handle projects of all sizes, from small recreational areas to complete athletic complexes, ensuring your {cityName} facility makes a positive impression while meeting practical needs.</p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-8 rounded-lg shadow-md">
                    <h3 className="text-2xl font-bold mb-4 text-center">Contact {cityName}'s Premier Sports Court Installer</h3>
                    <p className="text-lg mb-6 text-center">Ready to discuss your sports court project in {cityName}? Whether you need pickleball court installation, tennis court fencing, or athletic field solutions, contact Fence Fanatics today for expert advice and a free installation estimate.</p>
                    <div className="flex justify-center">
                      <a href="tel:(469)607-0505" className="inline-block bg-texas-terracotta text-white px-6 py-3 rounded-md font-semibold text-lg hover:bg-texas-terracotta/90 transition-colors">
                        Call (469) 607-0505
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
          
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
                    <h3 className="text-2xl font-bold mb-6">Gate Operators for {cityName} Properties</h3>
                    <p className="text-lg mb-4">Our <strong>gate operators</strong> are engineered for reliability and performance in {cityName}'s climate, ensuring smooth and secure operation for gates of all sizes. Designed for high-traffic and heavy-duty applications, our gate operators include features such as:</p>
                    <ul className="list-disc pl-8 text-lg mb-6 space-y-2">
                      <li><strong>Smart Connectivity:</strong> Real-time monitoring and control via myQ® technology.</li>
                      <li><strong>Heavy-Duty Motors:</strong> Designed for large gates and frequent use in {cityName} businesses.</li>
                      <li><strong>Safety Features:</strong> Obstruction detection, emergency release, and backup power options.</li>
                    </ul>
                    <p className="text-lg">Gate operators are available for sliding, swing, and barrier-style gates, making them suitable for a wide range of applications in {cityName}, from commercial facilities to industrial complexes.</p>
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

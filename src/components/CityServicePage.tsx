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
            <meta name="keywords" content={`pickleball court installer ${cityName}, tennis court installer ${cityName}, pickleball court installation near me, tennis court installation near me, sports court builder ${cityName}`} />
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
                    
                    <h3 className="text-2xl font-semibold mt-6">Premier Pickleball Court Installation in {cityName}</h3>
                    <p>Looking for professional pickleball court installers near {cityName}? At Fence Fanatics, we're the leading pickleball court installation company serving {cityName} and surrounding areas. Our expert team specializes in building regulation pickleball courts for residential properties, community centers, and commercial facilities throughout {cityName}.</p>
                    
                    <p>Whether you need a new pickleball court installed or are looking to upgrade existing facilities in {cityName}, we provide end-to-end services including site preparation, concrete work, surfacing, line marking, net installation, and perimeter fencing.</p>
                    
                    <h3 className="text-2xl font-semibold mt-6">Expert Tennis Court Installation in {cityName}</h3>
                    <p>As the trusted tennis court installer in {cityName}, we create premium tennis facilities built to professional standards. Our tennis court installation services in {cityName} include comprehensive solutions from initial design through completion, featuring proper drainage systems, high-quality surfacing options, and premium court accessories.</p>
                    
                    <p>We handle every aspect of your tennis court project in {cityName}, including tennis court fence installation, windscreen installation, net post installation, and optional features like lighting systems and spectator areas.</p>
                  </div>
                  <div>
                    <img src={serviceImages["Sports Courts"]} alt={`Pickleball and tennis court installation in ${cityName}, Texas`} className="rounded-lg shadow-lg w-full h-auto" />
                    <div className="mt-12">
                      <LeadForm city={cityName} />
                    </div>
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
                <h2 className="text-3xl font-bold mb-8">Pickleball Court Installation Services in {cityName}</h2>
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
                
                <h2 className="text-3xl font-bold mb-8">Tennis Court Installation in {cityName}</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <img src={serviceImages["Sports Courts"]} alt={`Tennis court construction in ${cityName}`} className="rounded-lg shadow-lg w-full h-auto" />
                  </div>
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
                    
                    <h3 className="text-2xl font-semibold mt-6 mb-4">Tennis Court Resurfacing & Repair</h3>
                    <p>For existing tennis courts in {cityName} needing renovation, our tennis court resurfacing services can restore playing surfaces to like-new condition. We repair cracks, address drainage issues, and apply fresh surfacing to extend your court's lifespan and improve playability.</p>
                    
                    <p>Contact {cityName}'s most trusted tennis court installation experts today at <a href="tel:(469)607-0505">(469) 607-0505</a> for a free consultation on your tennis court project.</p>
                  </div>
                </div>
                
                <div className="mt-16">
                  <h2 className="text-3xl font-bold mb-8">Basketball & Multi-Sport Court Installation in {cityName}</h2>
                  <p className="text-lg mb-6">In addition to tennis and pickleball court installation, our {cityName} sports court construction team specializes in basketball courts and multi-sport surfaces. We create versatile recreational spaces that can accommodate multiple sports on a single court, maximizing your {cityName} property's potential.</p>
                  
                  <div className="bg-white p-8 rounded-lg shadow-md">
                    <h3 className="text-2xl font-bold mb-4 text-center">Contact {cityName}'s Premier Sports Court Installer</h3>
                    <p className="text-lg mb-6 text-center">Ready to discuss your pickleball court, tennis court, or multi-sport court project in {cityName}? Contact Fence Fanatics today for expert advice and a free installation estimate.</p>
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


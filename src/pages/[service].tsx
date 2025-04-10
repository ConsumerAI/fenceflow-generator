import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ServiceType } from '@/lib/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LeadForm from '@/components/LeadForm';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CityGrid from '@/components/CityGrid';
import PlanToPickets from '@/components/PlanToPickets';
import ImageCarousel from '@/components/ImageCarousel';

interface ServicePageProps {
  service: ServiceType;
  cityName: string;
}

const ServicePage: React.FC<ServicePageProps> = ({
  service,
  cityName
}) => {
  const scrollToQuote = () => {
    const quoteSection = document.getElementById('quote-form')
    if (quoteSection) {
      quoteSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <Helmet>
        <title>{`${service} Services | Fences Texas`}</title>
        <meta name="description" content={`Professional ${service.toLowerCase()} services in DFW. Transform your space with a fence you'll love!`} />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative bg-texas-earth/10 pt-24 pb-16 md:pt-32 md:pb-24">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  {service} Services in DFW
                </h1>
                
                <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
                  <Button 
                    className="bg-texas-terracotta text-white hover:bg-texas-earth transition-colors w-full sm:w-auto"
                    onClick={scrollToQuote}
                  >
                    Get Your Perfect Fence Match™
                  </Button>
                  
                  <div className="flex items-center gap-3 flex-1 sm:flex-none">
                    <div className="flex -space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white overflow-hidden">
                        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="" />
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white overflow-hidden">
                        <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="" />
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white overflow-hidden">
                        <img src="https://randomuser.me/api/portraits/men/86.jpg" alt="" />
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-semibold">732+</span> homeowners<br />matched this week
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
              </div>
            </div>
          </section>

          {/* Main Content Section */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div className="prose prose-lg max-w-none">
                  {service === ServiceType.CommercialFencing && (
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
                      
                      <h3 className="text-2xl font-bold mt-8 mb-4">Chain Link Fencing</h3>
                      <p>Chain link fencing remains one of the most popular choices for commercial and industrial applications due to its affordability, strength, and adaptability. Whether you need perimeter security for warehouses, sports facilities, or schools, chain link fences are built to withstand the elements while maintaining visibility. With options for height, coating, and mesh size, this fencing can be tailored to meet the specific needs of your property, providing a practical and reliable solution.</p>
                      
                      <h3 className="text-2xl font-bold mt-8 mb-4">Ameristar Fencing</h3>
                      <p>Ameristar is a leader in <strong>high-security perimeter fencing</strong>, offering premium ornamental steel and aluminum fence solutions for commercial and industrial properties. Designed for strength and aesthetic appeal, Ameristar products, such as the Montage® and Stalwart® systems, provide an elegant yet durable solution for securing your property. From anti-climb designs to crash-rated barriers, Ameristar fences are engineered to meet the highest standards in security, longevity, and visual appeal. Ideal for government facilities, data centers, and business parks, Ameristar fencing combines innovation with performance.</p>
                      
                      <p className="my-4">Learn more about Ameristar's range of fencing solutions here: <a href="https://www.ameristarperimeter.com/us/en" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Ameristar Perimeter Security</a>.</p>
                      
                      <h3 className="text-2xl font-bold mt-8 mb-4">Betafence</h3>
                      <p>Betafence is a global leader in advanced fencing systems, specializing in <strong>high-performance wire mesh fencing and welded panels</strong>. Their solutions are designed to protect critical infrastructure, industrial sites, and commercial properties. Betafence offers innovative designs like the <strong>Nylofor® and Publifor®</strong> systems, which provide unparalleled durability and anti-intrusion features. With a focus on sustainability and cutting-edge technology, Betafence products are trusted worldwide for their ability to secure even the most sensitive sites.</p>
                      
                      <p className="my-4">Explore Betafence's full product line here: <a href="https://www.betafence.com/en" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Betafence</a>.</p>
                      
                      <h3 className="text-2xl font-bold mt-8 mb-4">Access Control Systems</h3>
                      <p>Access control is essential for modern facility management, enabling you to monitor and manage who enters and exits your property. LiftMaster offers advanced access control systems that integrate seamlessly with gates and barriers, providing enhanced security and convenience. Features include:</p>
                      
                      <ul className="list-disc pl-6 my-4">
                        <li className="mb-2"><strong>Cloud-based management</strong> for remote operation and control.</li>
                        <li className="mb-2"><strong>Keypad and card readers</strong> for secure, customizable access.</li>
                        <li className="mb-2"><strong>Vehicle detection systems</strong> for automated entry and exit.</li>
                      </ul>
                      
                      <p>With options tailored for commercial and industrial use, LiftMaster's access control systems ensure your property remains secure while improving operational efficiency.</p>
                      
                      <p className="my-4">Learn more about LiftMaster's solutions here: <a href="https://www.liftmaster.com/access" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">LiftMaster Access Control</a>.</p>
                      
                      <h3 className="text-2xl font-bold mt-8 mb-4">Gate Operators</h3>
                      <p>LiftMaster's <strong>gate operators</strong> are engineered for reliability and performance, ensuring smooth and secure operation for gates of all sizes. Designed for high-traffic and heavy-duty applications, LiftMaster's gate operators include features such as:</p>
                      
                      <ul className="list-disc pl-6 my-4">
                        <li className="mb-2"><strong>Smart Connectivity:</strong> Real-time monitoring and control via myQ® technology.</li>
                        <li className="mb-2"><strong>Heavy-Duty Motors:</strong> Designed for large gates and frequent use.</li>
                        <li className="mb-2"><strong>Safety Features:</strong> Obstruction detection, emergency release, and backup power options.</li>
                      </ul>
                      
                      <p>Gate operators are available for sliding, swing, and barrier-style gates, making them suitable for a wide range of applications, from commercial facilities to industrial complexes.</p>
                      
                      <p className="my-4">Discover LiftMaster gate operator systems here: <a href="https://www.liftmaster.com/facility-management/gate-operators" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">LiftMaster Gate Operators</a>.</p>
                      
                      <p className="mt-8 text-lg font-semibold"><strong>Enhance your property's security and functionality</strong> with these top-tier fencing and access control solutions. Contact us today for a consultation to find the best options for your business.</p>
                    </>
                  )}
                  
                  {service === ServiceType.AccessControl && (
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
                        
                        <div>
                          <h4 className="text-xl font-bold mb-2">Smartphone-Integrated Systems</h4>
                          <p>Take control of your security remotely with systems that connect directly to your smartphone. Grant or deny access, monitor activity, and receive alerts with ease.</p>
                        </div>
                        
                        <div>
                          <h4 className="text-xl font-bold mb-2">Turnstiles & Pedestrian Gates</h4>
                          <p>Manage foot traffic effectively with turnstiles and pedestrian gates designed for commercial and industrial applications.</p>
                        </div>
                        
                        <div>
                          <h4 className="text-xl font-bold mb-2">Advanced Video Integration</h4>
                          <p>Pair access control systems with video surveillance for added security. Monitor and record activity at all access points to ensure peace of mind.</p>
                        </div>
                      </div>
                      
                      <p className="mt-8">Contact <strong>Fences Texas</strong> today to discuss your access control needs and receive a personalized security solution for your property.</p>
                    </>
                  )}
                  
                  {service === ServiceType.AutomaticGates && (
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
                      
                      <h3 className="text-2xl font-bold mt-8 mb-4">Our Automatic Gate Services</h3>
                      
                      <div className="space-y-6 mt-6">
                        <div>
                          <h4 className="text-xl font-bold mb-2">Custom Gate Design</h4>
                          <p>Our team works with you to design a gate that complements your property's architecture and meets your specific needs. Choose from swing gates, sliding gates, or barrier arms in a variety of materials and styles.</p>
                        </div>
                        
                        <div>
                          <h4 className="text-xl font-bold mb-2">Professional Installation</h4>
                          <p>Our experienced technicians handle every aspect of installation, from concrete foundation work to electrical connections, ensuring your gate operates flawlessly from day one.</p>
                        </div>
                        
                        <div>
                          <h4 className="text-xl font-bold mb-2">Access Control Integration</h4>
                          <p>We offer a variety of access control options, including keypads, card readers, remote controls, telephone entry systems, and smartphone-controlled access for maximum convenience and security.</p>
                        </div>
                        
                        <div>
                          <h4 className="text-xl font-bold mb-2">Maintenance and Repair</h4>
                          <p>Keep your automatic gate running smoothly with our comprehensive maintenance plans and prompt repair services. We service all major brands and models.</p>
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold mt-8 mb-4">Types of Automatic Gates We Offer</h3>
                      
                      <div className="space-y-6 mt-6">
                        <div>
                          <h4 className="text-xl font-bold mb-2">Swing Gates</h4>
                          <p>Perfect for driveways with ample space, swing gates offer a classic, elegant appearance and are available in single or double-swing configurations.</p>
                        </div>
                        
                        <div>
                          <h4 className="text-xl font-bold mb-2">Sliding Gates</h4>
                          <p>Ideal for properties with limited space, sliding gates move parallel to your fence line and are available in V-track, cantilever, or overhead designs.</p>
                        </div>
                        
                        <div>
                          <h4 className="text-xl font-bold mb-2">Barrier Arms</h4>
                          <p>Perfect for commercial properties, gated communities, and parking facilities, barrier arms provide efficient traffic control.</p>
                        </div>
                        
                        <div>
                          <h4 className="text-xl font-bold mb-2">Vertical Pivot Gates</h4>
                          <p>A unique solution for spaces with uneven terrain or limited side room, these gates lift vertically to allow access.</p>
                        </div>
                      </div>
                      
                      <p className="mt-8 text-lg font-semibold">Ready to enhance your property with a custom automatic gate? Contact <strong>Fences Texas</strong> today for a free consultation and estimate. We serve the entire DFW metroplex with quality gate solutions.</p>
                      
                      <div className="mt-4">
                        <Button 
                          className="w-full sm:w-[240px] h-[48px] text-base bg-texas-terracotta text-white hover:bg-texas-earth transition-colors"
                          onClick={scrollToQuote}
                        >
                          Get Your Perfect Fence Match™
                        </Button>
                      </div>
                    </>
                  )}
                  
                  {service === ServiceType.ResidentialFencing && (
                    <>
                      <section className="py-20 bg-secondary/10">
                        <div className="container mx-auto px-4">
                          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
                            Residential Fence Installation in {cityName}: Find Your Perfect Match Today
                          </h1>
                          <h2 className="text-xl md:text-2xl text-center text-muted-foreground mb-8">
                            Skip the contractor nightmares. We'll match you with ONE verified residential fence expert who specializes in your exact project.
                          </h2>
                          <div className="flex justify-center mb-12">
                            <Button 
                              className="w-full sm:w-[240px] h-[48px] text-base bg-texas-terracotta text-white hover:bg-texas-earth transition-colors"
                              onClick={scrollToQuote}
                            >
                              Get Your Perfect Fence Match™
                            </Button>
                          </div>
                          <div className="max-w-4xl mx-auto">
                            <p className="text-muted-foreground mb-6 text-lg">
                              {cityName} homeowners face unique challenges when installing residential fencing. From strict HOA regulations to challenging soil conditions and extreme weather, your fence project requires specialized expertise.
                            </p>
                            <p className="text-muted-foreground text-lg">
                              At <strong>FencesTexas</strong>, we've streamlined the process of finding your perfect residential fence contractor. Our proprietary Perfect Match™ system connects you with ONE verified expert who specializes in your specific residential fence type, location, and requirements.
                            </p>
                          </div>
                        </div>
                      </section>

                      <section className="py-16 bg-white">
                        <div className="container mx-auto px-4">
                          <h3 className="text-2xl font-bold mb-6">Why {cityName} homeowners choose FencesTexas:</h3>
                          <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-12">
                            <li>Connect with ONE contractor perfectly matched to your project - no multiple calls or sales pressure</li>
                            <li>All contractors pass our rigorous 27-point verification process (81% of local fence companies fail)</li>
                            <li>Save 15-22% compared to contractor direct pricing</li>
                            <li>Enjoy faster installation timelines with pre-vetted professionals</li>
                          </ul>

                          <h2 className="text-3xl font-bold mb-8">Our Residential Fencing Options</h2>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                              <h3 className="text-2xl font-bold mb-4">Wood Fences in {cityName}</h3>
                              <p className="text-muted-foreground">
                                The timeless appeal of wood fencing enhances any {cityName} property with natural beauty and security. Our network of verified wood fence contractors specializes in cedar, pine, redwood, and composite materials designed to withstand local weather conditions. From classic picket fences to modern horizontal designs, your matched contractor will deliver exceptional craftsmanship tailored to your home's aesthetic.
                              </p>
                            </div>

                            <div>
                              <h3 className="text-2xl font-bold mb-4">Ornamental Iron Fencing</h3>
                              <p className="text-muted-foreground">
                                Add elegance and security with our custom ornamental iron fences. These sophisticated fences combine beauty with strength and are perfect for defining boundaries while maintaining visibility. Your matched {cityName} specialist creates stunning custom designs that balance security with sophisticated aesthetics. Perfect for estate properties, pool enclosures, and garden boundaries that make a lasting impression.
                              </p>
                            </div>

                            <div>
                              <h3 className="text-2xl font-bold mb-4">Vinyl Fences in {cityName}</h3>
                              <p className="text-muted-foreground">
                                Low-maintenance vinyl fencing provides {cityName} homeowners with decades of beauty without the upkeep. Your matched vinyl fence specialist will help you select the perfect style and grade to complement your home while withstanding local environmental challenges. Explore privacy, semi-privacy, picket, and ranch rail options in multiple colors and textures.
                              </p>
                            </div>

                            <div>
                              <h3 className="text-2xl font-bold mb-4">Chain Link Fences in {cityName}</h3>
                              <p className="text-muted-foreground">
                                Affordable and durable, chain link fencing remains a practical solution for {cityName} properties requiring security without sacrificing visibility. Your matched chain link specialist offers residential-grade options including vinyl-coated, galvanized, and decorative designs perfect for pet containment, pool safety, and property demarcation.
                              </p>
                            </div>

                            <div>
                              <h3 className="text-2xl font-bold mb-4">Custom Gates</h3>
                              <p className="text-muted-foreground">
                                Enhance your fence with custom-designed gates from our verified {cityName} contractors. From simple garden gates to elaborate driveway entrances, your matched specialist will create beautiful, functional gates that complement your fence and provide convenient access to your property.
                              </p>
                            </div>
                          </div>
                        </div>
                      </section>

                      <section className="py-16 bg-secondary/10">
                        <div className="container mx-auto px-4">
                          <h2 className="text-3xl font-bold mb-8">Why Choose FencesTexas for Your Residential Fencing?</h2>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                            <div className="flex gap-4">
                              <div>
                                <h4 className="font-bold mb-2">Perfect Matching</h4>
                                <p className="text-muted-foreground">Unlike services that sell your information to multiple companies, we connect you with just ONE perfect contractor for your specific project</p>
                              </div>
                            </div>
                            <div className="flex gap-4">
                              <div>
                                <h4 className="font-bold mb-2">Quality Verification</h4>
                                <p className="text-muted-foreground">All contractors in our network pass our rigorous 27-point verification process (81% of local fence companies fail)</p>
                              </div>
                            </div>
                            <div className="flex gap-4">
                              <div>
                                <h4 className="font-bold mb-2">Local Expertise</h4>
                                <p className="text-muted-foreground">Your matched contractor brings deep understanding of {cityName}'s unique soil conditions, weather challenges, and local regulations</p>
                              </div>
                            </div>
                            <div className="flex gap-4">
                              <div>
                                <h4 className="font-bold mb-2">No Sales Pressure</h4>
                                <p className="text-muted-foreground">You'll never be bombarded with calls from competing contractors - just one perfect match</p>
                              </div>
                            </div>
                            <div className="flex gap-4">
                              <div>
                                <h4 className="font-bold mb-2">Time & Money Savings</h4>
                                <p className="text-muted-foreground">Skip the research and avoid the common pitfalls of hiring the wrong contractor</p>
                              </div>
                            </div>
                          </div>

                          <div className="text-center">
                            <h2 className="text-3xl font-bold mb-6">
                              Find Your Perfect Residential Fence Contractor in {cityName}
                            </h2>
                            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
                              Take 15 seconds to tell us about your residential fence project. Our Perfect Match™ system will connect you with the ONE verified contractor who specializes in exactly what you need.
                            </p>
                            <Button 
                              className="w-full sm:w-[240px] h-[48px] text-base bg-texas-terracotta text-white hover:bg-texas-earth transition-colors"
                              onClick={scrollToQuote}
                            >
                              Get Your Perfect Fence Match™
                            </Button>
                          </div>
                        </div>
                      </section>
                    </>
                  )}
                  
                  {service === ServiceType.AthleticCourts && (
                    <>
                      <h2 className="text-3xl font-bold mb-4">Professional Athletic Courts and Sports Facilities in DFW</h2>
                      
                      <div className="my-6 flex justify-center">
                        <img src="/lovable-uploads/7230064e-9fa2-45f8-abd3-d337e43f9067.png" alt="Professional athletic courts and sports facilities in DFW" className="w-full rounded-lg" />
                      </div>
                      
                      <h3 className="text-2xl font-bold my-4">DFW's Premier Pickleball Court Installer</h3>
                      <p className="text-left">Looking for professional pickleball court installers near you? We are the Dallas-Fort Worth area's leading pickleball court installation company. Our expert team specializes in building regulation pickleball courts for residential properties, community centers, and commercial facilities throughout DFW.</p>
                      
                      <p className="text-left">Whether you need a new pickleball court installed or are looking to upgrade existing facilities, we provide end-to-end services including site preparation, concrete work, surfacing, line marking, net post installation, and perimeter fencing.</p>
                      
                      <h3 className="text-2xl font-bold mt-6 mb-4">Expert Tennis Court Installation Services</h3>
                      <p className="text-left">As DFW's trusted tennis court installer, we create premium tennis facilities built to professional standards. Our tennis court installation services include comprehensive solutions from initial design through completion, featuring proper drainage systems, high-quality surfacing options, and premium court accessories.

                  </p>
                      
                      <p className="text-left">We handle every aspect of your tennis court project, including tennis court fence installation, windscreen installation, net post installation, and optional features like lighting systems and spectator areas.</p>
                      
                      <h4 className="text-xl font-bold mt-6 mb-4">The Cost to Install a Pickleball Court</h4>
                      <p>When considering the cost to install a pickleball court in the DFW area, several factors influence the final investment:</p>
                      
                      <ul className="list-disc pl-6 my-4">
                        <li><strong>Court Size:</strong> Standard pickleball courts are 20' x 44', but we can customize dimensions for your property.</li>
                        <li><strong>Surface Material:</strong> Options include acrylic hard court surfaces, cushioned surfaces, or modular tiles at varying price points.</li>
                        <li><strong>Site Preparation:</strong> The current condition of your property affects excavation and base preparation costs.</li>
                        <li><strong>Additional Features:</strong> Fencing, lighting, seating, and shade structures add functionality but increase the investment.</li>
                      </ul>
                      
                      <p className="text-left">Due to the variety of options available for pickleball court installations, including surface materials, site preparation requirements, additional features like fencing, lighting, seating, and shade structures, we provide custom quotes tailored to your specific needs. Contact us for a detailed estimate specific to your property and requirements.</p>
                      
                      <h4 className="text-xl font-bold mt-6 mb-4">Our Athletic Courts and Sports Facilities Construction Process</h4>
                      <ol className="list-decimal pl-6 my-4">
                        <li><strong>Initial Consultation:</strong> We discuss your vision, budget, and specific requirements for your DFW pickleball or tennis court.</li>
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
                        <li className="mb-2"><strong>High-Performance Materials:</strong> We select the most durable and visually appealing surfacing materials, suitable for both pickleball and tennis courts in DFW's climate.</li>
                        <li className="mb-2"><strong>Expert Application:</strong> Our skilled professionals use the latest techniques and equipment for perfect results every time.</li>
                      </ul>
                      
                      <img src="/lovable-uploads/06ad0853-44a4-41c1-bb88-5389b46bc009.png" alt="Tennis and pickleball court with blue playing surface and green surroundings" className="w-full rounded-lg my-6" />
                      
                      <h3 className="text-2xl font-bold mt-8 mb-4">Considerations Before Construction</h3>
                      <p>Before diving into construction, it's important to consider:</p>
                      <ul className="list-disc pl-6 my-4">
                        <li className="mb-2"><strong>Base Material:</strong> Choice between asphalt and various types of concrete.</li>
                        <li className="mb-2"><strong>Court Placement:</strong> Issues like site work, access for equipment, grading, and drainage.</li>
                        <li className="mb-2"><strong>Amenities:</strong> Decisions on fencing, wind screens, lighting, and shade structures.</li>
                        <li className="mb-2"><strong>Legal and Practical Requirements:</strong> Zoning restrictions, setback requirements, and utility access.</li>
                      </ul>
                      
                      <h3 className="text-2xl font-bold mt-8 mb-4">Site Work, Grading, and Sub-Base</h3>
                      <p>The durability of your pickleball court starts with meticulous site work:</p>
                      <ul className="list-disc pl-6 my-4">
                        <li className="mb-2"><strong>Orientation and Placement:</strong> North-south is preferred to reduce sun glare.</li>
                        <li className="mb-2"><strong>Slope and Drainage:</strong> A slope of .83% to 1% is ideal for water drainage.</li>
                        <li className="mb-2"><strong>Foundation:</strong> Includes layers of stone and vapor barriers under the concrete to prevent moisture damage.</li>
                      </ul>
                      
                      <h3 className="text-2xl font-bold mt-8 mb-4">Fencing and Lighting Options</h3>
                      
                      <h4 className="text-xl font-bold mt-6 mb-4">Fencing</h4>
                      <p>Fencing is essential for safety and ball containment:</p>
                      <ul className="list-disc pl-6 my-4">
                        <li className="mb-2"><strong>Materials and Design:</strong> Options range from chain link to vinyl, tailored for visibility and durability.</li>
                        <li className="mb-2"><strong>Height and Layout:</strong> Typically, fencing should be at least 6 feet high and encompass all sides of the court.</li>
                      </ul>
                      
                      <h4 className="text-xl font-bold mt-6 mb-4">Lighting</h4>
                      <p>Proper lighting extends playing time and improves safety:</p>
                      <ul className="list-disc pl-6 my-4">
                        <li className="mb-2"><strong>Types of Lights:</strong> LED and halogen are popular for their efficiency and brightness.</li>
                        <li className="mb-2"><strong>Placement and Coverage:</strong> Lights should be placed to minimize shadows and glare for players.</li>
                      </ul>
                      
                      <h3 className="text-2xl font-bold mt-8 mb-4">Pickleball Court Construction Accessories</h3>
                      
                      <h4 className="text-xl font-bold mt-6 mb-4">Permanent Fixtures</h4>
                      <ul className="list-disc pl-6 my-4">
                        <li className="mb-2"><strong>Net Posts:</strong> Installed in concrete footers for stability, yet designed to be removable for maintenance.</li>
                      </ul>
                      
                      <h4 className="text-xl font-bold mt-6 mb-4">Portable Options</h4>
                      <ul className="list-disc pl-6 my-4">
                        <li className="mb-2"><strong>Net Systems:</strong> For flexibility, consider portable net systems that do not require permanent installation.</li>
                      </ul>
                      
                      <h3 className="text-2xl font-bold mt-8 mb-4">Surfacing Options</h3>
                      
                      <h4 className="text-xl font-bold mt-6 mb-4">Types of Surfaces</h4>
                      <ul className="list-disc pl-6 my-4">
                        <li className="mb-2"><strong>Hard vs. Cushioned:</strong> Choose from standard acrylic or cushioned surfaces for better shock absorption and comfort.</li>
                      </ul>
                      
                      <h4 className="text-xl font-bold mt-6 mb-4">Customization Options</h4>
                      <ul className="list-disc pl-6 my-4">
                        <li className="mb-2"><strong>Colors and Logos:</strong> Customize the court with various color schemes and logos.</li>
                      </ul>
                      
                      <h4 className="text-xl font-bold mt-6 mb-4">Cost Comparison</h4>
                      <ul className="list-disc pl-6 my-4">
                        <li className="mb-2"><strong>Surfacing Costs:</strong> Acrylic systems are more affordable, whereas ProCushion offers enhanced comfort at a higher price.</li>
                      </ul>
                      
                      <h3 className="text-2xl font-bold mt-8 mb-4">Final Touches</h3>
                      <p className="text-left">After surfacing, add striping for pickleball and other markings as needed for multi-sport functionality.</p>
                      
                      <p className="mt-6 text-left">Building a pickleball court involves careful planning and consideration of various elements. Consulting with experienced contractors and considering all available options will ensure that your court is a well-loved addition to your recreational facilities.</p>
                      
                      <p className="mt-4 text-left">For further details on each aspect, consider reaching out to professional pickleball court builders who can provide personalized advice and quotes based on your specific needs.

                  </p>
                      
                      <p className="text-left">Due to the variety of options available for pickleball court installations, including surface materials, site preparation requirements, additional features like fencing, lighting, seating, and shade structures, we provide custom quotes tailored to your specific needs. Contact us for a detailed estimate specific to your property and requirements.</p>
                    </>
                  )}
                </div>
                
                <div>
                  <LeadForm />
                </div>
              </div>
            </div>
          </section>

          {/* Cities We Serve Section */}
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-8">Cities We Serve</h2>
              <CityGrid />
            </div>
          </section>

          {/* Our Process Section */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <PlanToPickets />
            </div>
          </section>

          {/* Featured Projects */}
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-8">Our Work</h2>
              <ImageCarousel />
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default ServicePage;

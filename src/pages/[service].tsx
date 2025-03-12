
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ServiceType } from '@/lib/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LeadForm from '@/components/LeadForm';
import { Link } from 'react-router-dom';

interface ServicePageProps {
  service: ServiceType;
}

const ServicePage: React.FC<ServicePageProps> = ({ service }) => {
  return (
    <>
      <Helmet>
        <title>{`${service} Services | Fences Texas`}</title>
        <meta name="description" content={`Professional ${service.toLowerCase()} services in DFW. Get a free quote today!`} />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1">
          <section className="pt-24 pb-16 md:pt-32 md:pb-24">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {service} Services in DFW
              </h1>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div className="prose prose-lg max-w-none">
                  {service === "Sports Courts" && (
                    <>
                      <h2 className="text-3xl font-bold mb-4">Sports Court Builder and Resurfacer in DFW</h2>
                      <p><strong>Call us now at <a href="tel:555-555-5555">(555) 555-5555</a></strong></p>
                      
                      <img 
                        src="https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/1709078579887-GDI1G7DW4FVRYQDUANKY/image-asset.jpeg" 
                        alt="Sports court construction in DFW" 
                        className="w-full rounded-lg my-6"
                      />
                      
                      <h3 className="text-2xl font-bold my-4">Welcome to Fences Texas: Your Premier Destination for Elite Sports Court Construction</h3>
                      <p>Tennis, Pickleball, Basketball Courts, we will get you ready to play.</p>
                      
                      <p>At Fences Texas, we understand the passion and dedication that sports enthusiasts bring to their game. Whether you're shooting hoops, serving aces, or scoring goals, we're here to transform your backyard into the ultimate playground. From concrete foundations to surfacing and fencing, we specialize in providing comprehensive solutions that cater to your sporting needs. If you're ready to elevate your play space to new heights, read on to discover how Fences Texas can turn your dreams into reality.</p>
                      
                      <h4 className="text-xl font-bold mt-6 mb-4">Concrete Foundations: Building the Backbone of Your Sports Court</h4>
                      <p>A solid foundation is essential for the longevity and performance of your sports court. At Fences Texas, we start by carefully planning and preparing the ground to ensure optimal stability and durability. Our team of skilled professionals utilizes top-quality materials and cutting-edge techniques to construct sturdy concrete foundations that can withstand the demands of intense gameplay and weather conditions. With our attention to detail and commitment to excellence, you can trust that your sports court will provide a reliable platform for years of athletic enjoyment.</p>
                      
                      <h4 className="text-xl font-bold mt-6 mb-4">Surfacing Solutions: Where Style Meets Functionality</h4>
                      <p>The surface of your sports court plays a crucial role in enhancing performance and safety. Whether you prefer the classic feel of hardwood, the consistent bounce of acrylic, or the versatility of synthetic turf, Fences Texas offers a wide range of surfacing options to suit your needs. Our expert team will work closely with you to select the perfect material and design for your court, ensuring optimal traction, ball response, and player comfort. With our customizable solutions, you can create a sports court that not only looks great but also delivers exceptional performance every time.</p>
                      
                      <h4 className="text-xl font-bold mt-6 mb-4">Fencing Solutions: Setting the Stage for Success</h4>
                      <p>A well-designed fence not only enhances the aesthetics of your sports court but also provides essential safety and security. Fences Texas offers a variety of fencing options to suit your preferences, whether you're looking for maximum visibility, privacy, or noise reduction. From durable chain-link fences to sleek iron designs, we have the expertise to deliver the perfect solution for your court. Our team will work with you to design a fencing system that complements your court layout and meets your specific needs, ensuring that your sports space is protected and ready for action.</p>
                      
                      <h4 className="text-xl font-bold mt-6 mb-4">Experience the Fences Texas Difference</h4>
                      <p>When you choose Fences Texas, you're choosing a commitment to quality, professionalism, and customer satisfaction. From concept to completion, our dedicated team will guide you through every step of the construction process, ensuring that your vision is brought to life with precision and care. With our seamless integration of concrete, surfacing, and fencing services, you can rest assured that your sports court will exceed your expectations in every way. Ready to take your play space to the next level? Contact Fences Texas today and let us turn your sporting dreams into reality!</p>
                      
                      <h2 className="text-3xl font-bold mt-10 mb-6">Premier Court Resurfacing Services</h2>
                      <p>We understand the importance of a well-maintained court to your game. Our resurfacing services are designed to breathe new life into your pickleball and tennis courts, ensuring they not only look outstanding but also offer the best playability and safety for athletes and enthusiasts alike. Here's why our resurfacing solutions stand out:</p>
                      
                      <ul className="list-disc pl-6 my-4">
                        <li className="mb-2"><strong>Comprehensive Evaluation:</strong> Before we begin, our experts conduct a thorough assessment of your court to identify all issues, including cracks, puddles, or fading lines, ensuring a fully customized resurfacing plan.</li>
                        <li className="mb-2"><strong>High-Performance Materials:</strong> We select the most durable and visually appealing resurfacing materials, suitable for both pickleball and tennis courts. Our materials are designed to withstand the elements and frequent play, ensuring your court remains in top condition for years to come.</li>
                        <li className="mb-2"><strong>Expert Application:</strong> Our skilled professionals use the latest techniques and equipment to apply resurfacing materials evenly and efficiently. This meticulous approach guarantees a smooth, consistent surface that enhances game performance and player safety.</li>
                        <li className="mb-2"><strong>Customized Finishing Touches:</strong> From selecting the perfect color to ensuring crisp, clear lines, we tailor every aspect of the resurfacing process to meet your preferences and requirements, delivering a court that not only plays well but also looks professional.</li>
                      </ul>
                      
                      <img 
                        src="https://images.squarespace-cdn.com/content/v1/60e487658384ee39ddeb139d/1709258995381-OZJ85PI1IF9KHG170S1W/GettyImages-145988391.jpg" 
                        alt="Tennis court construction and resurfacing" 
                        className="w-full rounded-lg my-6"
                      />
                      
                      <p>Building a pickleball court can be a rewarding project. The cost generally ranges from $15 to $40 per square foot, which translates to about $45,000 for a standard 30' x 60' court. Several factors influence the final cost, from materials to location specifics.</p>
                      
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
                      <p>After surfacing, add striping for pickleball and other markings as needed for multi-sport functionality.</p>
                      
                      <p className="mt-6">Building a pickleball court involves careful planning and consideration of various elements. Consulting with experienced contractors and considering all available options will ensure that your court is a well-loved addition to your recreational facilities.</p>
                      
                      <p className="mt-4">For further details on each aspect, consider reaching out to professional pickleball court builders who can provide personalized advice and quotes based on your specific needs.</p>
                    </>
                  )}
                  
                  {service === "Commercial Fencing" && (
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
                  
                  {service === "Access Control" && (
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
                      
                      <p className="mt-8">Contact <strong>Fences Texas</strong> today at <a href="tel:555-555-5555">(555) 555-5555</a> to discuss your access control needs and receive a personalized security solution for your property.</p>
                    </>
                  )}
                  
                  {service === "Automatic Gates" && (
                    <>
                      <h2 className="text-3xl font-bold mb-4">Automatic Gate Solutions</h2>
                      <p><strong>Call us now at <a href="tel:555-555-5555">(555) 555-5555</a></strong> for a free consultation.</p>
                      
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
                      
                      <p className="mt-8 text-lg font-semibold">Ready to enhance your property with a custom automatic gate? Contact <strong>Fences Texas</strong> today at <a href="tel:555-555-5555">(555) 555-5555</a> for a free consultation and estimate. We serve the entire DFW metroplex with quality gate solutions.</p>
                    </>
                  )}
                  
                  {service === "Residential Fencing" && (
                    <>
                      <h2 className="text-3xl font-bold mb-4">Residential Fencing Solutions</h2>
                      <p><strong>Call us now at <a href="tel:555-555-5555">(555) 555-5555</a></strong> for a free estimate.</p>
                      
                      <p className="my-4">At <strong>Fences Texas</strong>, we understand that your fence is more than just a boundary—it's an extension of your home and a reflection of your style. Our residential fencing solutions are designed to enhance your property's security, privacy, and aesthetics while adding lasting value to your home.</p>
                      
                      <h3 className="text-2xl font-bold mt-8 mb-4">Our Residential Fencing Options</h3>
                      
                      <div className="space-y-6 mt-6">
                        <div>
                          <h4 className="text-xl font-bold mb-2">Wood Fencing</h4>
                          <p>Our premium cedar and pine wood fences offer natural beauty, durability, and privacy. Choose from various styles including board-on-board, cap and trim, and traditional privacy designs. Each fence is built with quality materials and expert craftsmanship to withstand Texas weather.</p>
                        </div>
                        
                        <div>
                          <h4 className="text-xl font-bold mb-2">Ornamental Iron Fencing</h4>
                          <p>Add elegance and security with our custom ornamental iron fences. These sophisticated fences combine beauty with strength and are perfect for defining boundaries while maintaining visibility. Available in various styles and designs to complement any architectural style.</p>
                        </div>
                        
                        <div>
                          <h4 className="text-xl font-bold mb-2">Vinyl Fencing</h4>
                          <p>Low-maintenance and long-lasting, our vinyl fences come in multiple styles and colors. These fences won't rot, warp, or need painting, making them an excellent investment for busy homeowners seeking durability without sacrificing appearance.</p>
                        </div>
                        
                        <div>
                          <h4 className="text-xl font-bold mb-2">Chain Link Fencing</h4>
                          <p>Economical and durable, our residential chain link fences are perfect for defining boundaries, containing pets, and securing play areas. Available in galvanized or vinyl-coated options with various heights to meet your specific needs.</p>
                        </div>
                        
                        <div>
                          <h4 className="text-xl font-bold mb-2">Custom Gates</h4>
                          <p>Enhance your fence with our custom-designed gates. From simple garden gates to elaborate driveway entrances, we create beautiful, functional gates that complement your fence and provide convenient access to your property.</p>
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold mt-8 mb-4">Why Choose Fences Texas for Your Residential Fencing?</h3>
                      
                      <ul className="list-disc pl-6 my-4">
                        <li className="mb-2"><strong>Quality Materials:</strong> We use only premium-grade materials that withstand the Texas climate and provide long-lasting performance.</li>
                        <li className="mb-2"><strong>Expert Installation:</strong> Our skilled installers ensure your fence is properly installed with attention to detail and craftsmanship.</li>
                        <li className="mb-2"><strong>Custom Solutions:</strong> We design fences that address your specific needs for privacy, security, and aesthetics while complementing your home's architecture.</li>
                        <li className="mb-2"><strong>Comprehensive Warranties:</strong> We stand behind our work with solid warranties on both materials and labor.</li>
                        <li className="mb-2"><strong>Competitive Pricing:</strong> Receive excellent value with fair, transparent pricing and no hidden costs.</li>
                      </ul>
                      
                      <p className="mt-8 text-lg font-semibold">Ready to enhance your home with a beautiful new fence? Contact <strong>Fences Texas</strong> today at <a href="tel:555-555-5555">(555) 555-5555</a> for a free consultation and estimate. We serve homeowners throughout the DFW metroplex with quality fencing solutions.</p>
                    </>
                  )}
                </div>
                
                <div>
                  <LeadForm />
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

export default ServicePage;

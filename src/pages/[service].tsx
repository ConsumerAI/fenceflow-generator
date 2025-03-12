
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ServiceType } from '@/lib/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LeadForm from '@/components/LeadForm';

interface ServicePageProps {
  service: ServiceType;
}

const ServicePage: React.FC<ServicePageProps> = ({ service }) => {
  return (
    <>
      <Helmet>
        <title>{`${service} Services | Fence Fanatics`}</title>
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
                      <p><strong>Call us now at <a href="tel:(469)607-0505">(469) 607-0505</a></strong></p>
                      <h3>Welcome to Fence Fanatics: Your Premier Destination for Elite Sports Court Construction</h3>
                      <p>Tennis, Pickleball, Basketball Courts, we will get you ready to play.</p>
                      {/* ... Additional content for Sports Courts */}
                    </>
                  )}
                  
                  {service === "Commercial Fencing" && (
                    <>
                      <h2 className="text-3xl font-bold mb-4">Commercial Capabilities</h2>
                      <p>You need a partner who is <strong>Professional</strong>, <strong>Dependable</strong>, <strong>Scalable</strong>, and <strong>Proficient</strong> with any fencing requirements.</p>
                      {/* ... Additional content for Commercial Fencing */}
                    </>
                  )}
                  
                  {/* ... Similar sections for other services */}
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


import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ServiceType } from '@/lib/types';
import LeadForm from '@/components/LeadForm';
import { services } from '@/lib/routes';
import JsonLd from '@/components/JsonLd';

export default function ServicePage() {
  const { service: serviceSlug } = useParams<{ service: string }>();
  const service = services.find(s => s.toLowerCase().replace(/\s+/g, '-') === serviceSlug) as ServiceType;
  
  if (!service) {
    return <Navigate to="/not-found" />;
  }

  return (
    <main className="flex-1">
      <JsonLd service={service} />
      <section className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {service} Services in DFW
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="prose prose-lg max-w-none">
              <p>Expert {service.toLowerCase()} services tailored to your needs.</p>
              <p>Contact us today for a free consultation and quote.</p>
            </div>
            
            <div>
              <LeadForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ServiceType } from '@/lib/types';
import LeadForm from '@/components/LeadForm';
import { services } from '@/lib/routes';

type Props = {
  params: { service: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const serviceSlug = params.service;
  const service = services.find(s => s.toLowerCase().replace(/\s+/g, '-') === serviceSlug);
  
  if (!service) {
    return {
      title: 'Service Not Found | Fences Texas',
      description: 'Sorry, we couldn\'t find the service you\'re looking for.'
    };
  }
  
  return {
    title: `${service} Services | Fences Texas`,
    description: `Professional ${service.toLowerCase()} services in DFW. Get a free quote today!`
  };
}

export default function ServicePage({ params }: Props) {
  const serviceSlug = params.service;
  const service = services.find(s => s.toLowerCase().replace(/\s+/g, '-') === serviceSlug) as ServiceType;
  
  if (!service) {
    notFound();
  }

  return (
    <main className="flex-1">
      <section className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {service} Services in DFW
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="prose prose-lg max-w-none">
              {/* Service specific content would go here, similar to the original file but adapted for Next.js */}
              <p>Content for {service} would go here.</p>
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

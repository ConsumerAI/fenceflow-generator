
import { Metadata } from 'next';
import Link from 'next/link';
import LeadForm from '@/components/LeadForm';
import CityGrid from '@/components/CityGrid';

export const metadata: Metadata = {
  title: 'Find Fence Companies Near Me | Fences Texas',
  description: 'Looking for fence installation near you? Find expert fence contractors in your area across DFW. Get a free quote today!'
};

export default function NearMePage() {
  return (
    <main className="flex-1">
      <section className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Find Fence Companies Near You
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="prose prose-lg max-w-none">
              <p>Looking for expert fence installation in your area? We serve communities across DFW.</p>
              <CityGrid />
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

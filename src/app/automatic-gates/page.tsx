
import { Metadata } from 'next';
import Link from 'next/link';
import LeadForm from '@/components/LeadForm';
import ImageCarousel from '@/components/ImageCarousel';

export const metadata: Metadata = {
  title: 'Automatic Gates Installation DFW | Fences Texas',
  description: 'Professional automatic gate installation across DFW. Custom designs, smart features, and expert installation. Get a free quote today!'
};

export default function AutomaticGatesPage() {
  return (
    <main className="flex-1">
      <section className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Automatic Gates Installation
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="prose prose-lg max-w-none">
              <p>Transform your entrance with a custom automatic gate system.</p>
              <ImageCarousel />
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

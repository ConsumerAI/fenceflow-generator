
import React from 'react';
import { Link } from 'react-router-dom';
import LeadForm from '@/components/LeadForm';
import CityGrid from '@/components/CityGrid';
import JsonLd from '@/components/JsonLd';

export default function NearMePage() {
  return (
    <main className="flex-1">
      <JsonLd />
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

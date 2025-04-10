
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LeadForm from '../components/LeadForm';
import { ServiceType } from '../lib/types';
import { useButtonHandlers } from '@/hooks/useButtonHandlers';

const NearMePage = () => {
  const { 
    handleResidentialButton, 
    handleCommercialButton, 
    handleSportsButton, 
    handleAccessButton 
  } = useButtonHandlers();

  return (
    <>
      <Helmet>
        <title>Fence Companies Near Me | Find Local Fence Experts</title>
        <meta name="description" content="Discover top-rated fence companies near you. Get free quotes and expert advice for residential, commercial, and specialty fencing projects." />
        <link rel="canonical" href="https://fencestexas.com/fence-companies-near-me" />
      </Helmet>
      
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Find Local Fence Experts Near You</h1>
        <p className="mb-4">
          Looking for reliable fence companies in your area? We connect you with top-rated professionals for all your fencing needs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <button onClick={handleResidentialButton} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Residential Fencing
          </button>
          <button onClick={handleCommercialButton} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Commercial Fencing
          </button>
          <button onClick={handleSportsButton} className="bg-yellow-500 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded">
            Athletic Courts & Sports Facilities
          </button>
          <button onClick={handleAccessButton} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Access Control Solutions
          </button>
        </div>

        <LeadForm service_type={ServiceType.ResidentialFencing} />
      </div>

      <Footer />
    </>
  );
};

export default NearMePage;

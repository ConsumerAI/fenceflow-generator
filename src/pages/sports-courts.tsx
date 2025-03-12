
import React from 'react';
import { Helmet } from 'react-helmet-async';
import ServicePage from './[service]';
import { ServiceType } from '@/lib/types';

const SportsCourtPage: React.FC = () => {
  const service: ServiceType = "Sports Courts";
  
  return (
    <>
      <Helmet>
        <title>Professional Pickleball & Tennis Court Installation | DFW Sports Court Builder</title>
        <meta name="description" content="Expert pickleball court installers and tennis court builders in DFW. Professional sports court construction, surfacing, and resurfacing services. Get a free quote today!" />
        <meta name="keywords" content="pickleball court installer, tennis court installation near me, pickleball court installation, tennis court fence installation, pickleball court installers near me, install pickleball court, tennis court installation companies, cost to install a pickleball court" />
        <link rel="canonical" href="https://fencestexas.com/sports-courts" />
      </Helmet>
      <ServicePage service={service} />
    </>
  );
};

export default SportsCourtPage;

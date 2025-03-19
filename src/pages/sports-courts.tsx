import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SportsCourtContent from '@/components/SportsCourtContent';

const SportsCourtPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Professional Sports Court Installation | Pickleball & Tennis Court Contractors</title>
        <meta name="description" content="Expert sports court installation in DFW. Specializing in pickleball court installation, tennis court construction, and sports field fencing solutions. Free quotes!" />
        <meta name="keywords" content="pickleball court installer, tennis court installation near me, sports court fencing contractor, pickleball court fencing, tennis court fence, sports field fencing near me, chain link fence for baseball field, backstop fencing baseball, tennis court chain link fence, pickleball court windscreens, basketball court fencing, volleyball court fence, athletic field fencing" />
        <link rel="canonical" href="https://fencestexas.com/sports-courts" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <SportsCourtContent />
        <Footer />
      </div>
    </>
  );
};

export default SportsCourtPage;

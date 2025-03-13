
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './App.css';
import Index from './pages/Index';
import CityPage from './pages/[city]';
import NearMePage from './pages/fence-companies-near-me';
import AutomaticGatesPage from './pages/automatic-gates';
import ServicePage from './pages/[service]';
import CityServicePage from './components/CityServicePage';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/ScrollToTop';
import Breadcrumbs from './components/Breadcrumbs';
import { services } from './lib/routes';
import { ServiceType } from './lib/types';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/:city" element={<CityPage />} />
          {/* General service pages */}
          {services.map((service) => (
            <Route 
              key={service}
              path={`/${service.toLowerCase().replace(/\s+/g, '-')}`}
              element={<ServicePage service={service as ServiceType} />}
            />
          ))}
          {/* City-specific service pages */}
          {services.map((service) => (
            <Route 
              key={`city-${service}`}
              path={`/:city/${service.toLowerCase().replace(/\s+/g, '-')}`}
              element={<CityServicePage service={service as ServiceType} />}
            />
          ))}
          <Route path="/fence-companies-near-me" element={<NearMePage />} />
          <Route path="/automatic-gates" element={<AutomaticGatesPage />} />
          
          {/* Add additional service-related routes (for deeper content linking) */}
          <Route path="/fence-types" element={<ServicePage service="Residential Fencing" />} />
          <Route path="/commercial-security-fencing" element={<ServicePage service="Commercial Fencing" />} />
          <Route path="/residential-fence-styles" element={<ServicePage service="Residential Fencing" />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;

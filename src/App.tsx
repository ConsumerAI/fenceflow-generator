
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
import { cities } from './lib/cities';
import { ServiceType } from './lib/types';

/**
 * Main application component that defines all routes
 * Organized into logical sections for better maintainability
 */
function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<Index />} />
          
          {/* City-specific Pages */}
          <Route path="/:city" element={<CityPage />} />
          
          {/* General Service Pages - Using exact route paths that match the sitemap */}
          <Route path="/residential-fencing" element={<ServicePage service="Residential Fencing" />} />
          <Route path="/commercial-fencing" element={<ServicePage service="Commercial Fencing" />} />
          <Route path="/sports-courts" element={<ServicePage service="Sports Courts" />} />
          <Route path="/access-control" element={<ServicePage service="Access Control" />} />
          <Route path="/automatic-gates" element={<AutomaticGatesPage />} />
          
          {/* City-specific Service Pages - Dynamically generate all city+service combinations */}
          {cities.map((city) => (
            services.map((service) => {
              const serviceRoute = service.toLowerCase().replace(/\s+/g, '-');
              return (
                <Route 
                  key={`${city}-${service}`}
                  path={`/${city.toLowerCase().replace(/\s+/g, '-')}/${serviceRoute}`}
                  element={<CityServicePage service={service as ServiceType} />}
                />
              );
            })
          ))}
          
          {/* Special Pages */}
          <Route path="/fence-companies-near-me" element={<NearMePage />} />
          
          {/* Additional Service-related Routes (for deeper content linking) */}
          <Route path="/fence-types" element={<ServicePage service="Residential Fencing" />} />
          <Route path="/commercial-security-fencing" element={<ServicePage service="Commercial Fencing" />} />
          <Route path="/residential-fence-styles" element={<ServicePage service="Residential Fencing" />} />
          
          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;

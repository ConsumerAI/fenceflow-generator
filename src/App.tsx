
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
import { services, serviceRouteMap } from './lib/routes';
import { cities } from './lib/cities';
import { ServiceType } from './lib/types';

/**
 * Main application component that defines all routes
 * Organized into logical sections for better maintainability
 */
function App() {
  // Debug function to log route registration during development
  const logRoute = (path: string, component: string) => {
    console.log(`Registered route: ${path} => ${component}`);
    return path;
  };

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Home Page */}
          <Route path={logRoute("/", "Index")} element={<Index />} />
          
          {/* City-specific Pages */}
          <Route path={logRoute("/:city", "CityPage")} element={<CityPage />} />
          
          {/* Special Pages with explicit paths */}
          <Route path={logRoute("/fence-companies-near-me", "NearMePage")} element={<NearMePage />} />
          <Route path={logRoute("/automatic-gates", "AutomaticGatesPage")} element={<AutomaticGatesPage />} />
          
          {/* General Service Pages - Using explicit path matching for clarity */}
          <Route path={logRoute("/residential-fencing", "ServicePage:Residential")} element={<ServicePage service="Residential Fencing" />} />
          <Route path={logRoute("/commercial-fencing", "ServicePage:Commercial")} element={<ServicePage service="Commercial Fencing" />} />
          <Route path={logRoute("/sports-courts", "ServicePage:Sports")} element={<ServicePage service="Sports Courts" />} />
          <Route path={logRoute("/access-control", "ServicePage:Access")} element={<ServicePage service="Access Control" />} />
          
          {/* Additional Service-related Routes (for deeper content linking) */}
          <Route path={logRoute("/fence-types", "ServicePage:Residential")} element={<ServicePage service="Residential Fencing" />} />
          <Route path={logRoute("/commercial-security-fencing", "ServicePage:Commercial")} element={<ServicePage service="Commercial Fencing" />} />
          <Route path={logRoute("/residential-fence-styles", "ServicePage:Residential")} element={<ServicePage service="Residential Fencing" />} />
          
          {/* City-specific Service Pages - Dynamically generate all city+service combinations */}
          {cities.map((city) => (
            services.map((service) => {
              const citySlug = city.toLowerCase().replace(/\s+/g, '-');
              const serviceSlug = service.toLowerCase().replace(/\s+/g, '-');
              const path = `/${citySlug}/${serviceSlug}`;
              return (
                <Route 
                  key={`${citySlug}-${serviceSlug}`}
                  path={logRoute(path, `CityServicePage:${city}:${service}`)}
                  element={<CityServicePage service={service as ServiceType} />}
                />
              );
            })
          ))}
          
          {/* 404 Not Found - Must be last */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;

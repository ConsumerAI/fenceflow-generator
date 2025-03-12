
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './App.css';
import Index from './pages/Index';
import CityPage from './pages/[city]';
import NearMePage from './pages/fence-companies-near-me';
import AutomaticGatesPage from './pages/automatic-gates';
import CityServicePage from './components/CityServicePage';
import NotFound from './pages/NotFound';
import { services } from './lib/routes';
import { ServiceType } from './lib/types';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/:city" element={<CityPage />} />
          {services.map((service) => (
            <Route 
              key={service}
              path={`/:city/${service.toLowerCase().replace(/\s+/g, '-')}`}
              element={<CityServicePage service={service as ServiceType} />}
            />
          ))}
          <Route path="/fence-companies-near-me" element={<NearMePage />} />
          <Route path="/automatic-gates" element={<AutomaticGatesPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;

import { Routes, Route, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Index from './pages/Index';
import CityPage from './pages/[city]';
import NearMePage from './pages/fence-companies-near-me';
import AutomaticGatesPage from './pages/automatic-gates';
import ServicePage from './pages/[service]';
import CityServicePage from './components/CityServicePage';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/ScrollToTop';
import PrivacyPolicyPage from './pages/privacy-policy';
import TermsAndConditionsPage from './pages/terms-and-conditions';
import { serviceRouteMap } from './lib/routes';
import { isCityValid } from './lib/cities';
import { ServiceType } from './lib/types';

// Wrapper component to handle dynamic CityServicePage routing
const CityServicePageWrapper = () => {
  const { city, service } = useParams();
  if (!city || !service) return <NotFound />;

  // Validate city
  if (!isCityValid(city)) return <NotFound />;

  // Format the service parameter to match the serviceRouteMap keys
  const formattedService = service.toLowerCase().replace(/\s+/g, '-');

  // Convert URL slugs back to proper format
  const serviceType = serviceRouteMap[formattedService];

  if (!serviceType) return <NotFound />;

  // Pass both city and service as props
  return <CityServicePage city={city} service={formattedService} />;
};

/**
 * The full route tree, shared by the browser app (App.tsx, BrowserRouter)
 * and the build-time prerenderer (entry-server.tsx, StaticRouter).
 */
function AppRoutes() {
  // Debug function to log route registration during development
  const logRoute = (path: string, component: string) => {
    console.log(`Registered route: ${path} => ${component}`);
    return path;
  };

  return (
    <>
      {/* Hotjar Tracking Code */}
      <Helmet>
        <script>
          {`
            (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:6374569,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `}
        </script>
      </Helmet>
      <ScrollToTop />
      <Routes>
        {/* Home Page */}
        <Route path={logRoute("/", "Index")} element={<Index />} />

        {/* City-specific Pages */}
        <Route path={logRoute("/:city", "CityPage")} element={<CityPage />} />

        {/* Special Pages with explicit paths */}
        <Route path={logRoute("/fence-companies-near-me", "NearMePage")} element={<NearMePage />} />
        <Route path={logRoute("/automatic-gates", "AutomaticGatesPage")} element={<AutomaticGatesPage />} />
        <Route path={logRoute("/privacy-policy", "PrivacyPolicyPage")} element={<PrivacyPolicyPage />} />
        <Route path={logRoute("/terms-and-conditions", "TermsAndConditionsPage")} element={<TermsAndConditionsPage />} />

        {/* General Service Pages - Using explicit path matching for clarity */}
        <Route path={logRoute("/residential-fencing", "ServicePage:Residential")} element={<ServicePage service={ServiceType.ResidentialFencing} cityName="" />} />
        <Route path={logRoute("/commercial-fencing", "ServicePage:Commercial")} element={<ServicePage service={ServiceType.CommercialFencing} cityName="" />} />
        <Route path={logRoute("/athletic-courts-and-sports-facilities", "ServicePage:Athletic")} element={<ServicePage service={ServiceType.AthleticCourts} cityName="" />} />
        <Route path={logRoute("/sports-courts", "ServicePage:Athletic")} element={<ServicePage service={ServiceType.AthleticCourts} cityName="" />} />
        <Route path={logRoute("/access-control", "ServicePage:Access")} element={<ServicePage service={ServiceType.AccessControl} cityName="" />} />

        {/* Additional Service-related Routes (for deeper content linking) */}
        <Route path={logRoute("/fence-types", "ServicePage:Residential")} element={<ServicePage service={ServiceType.ResidentialFencing} cityName="" />} />
        <Route path={logRoute("/commercial-security-fencing", "ServicePage:Commercial")} element={<ServicePage service={ServiceType.CommercialFencing} cityName="" />} />
        <Route path={logRoute("/residential-fence-styles", "ServicePage:Residential")} element={<ServicePage service={ServiceType.ResidentialFencing} cityName="" />} />

        {/* City-specific Service Pages using dynamic routing pattern */}
        <Route path={logRoute("/:city/:service", "CityServicePageWrapper")} element={<CityServicePageWrapper />} />

        {/* 404 Not Found - Must be last */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default AppRoutes;

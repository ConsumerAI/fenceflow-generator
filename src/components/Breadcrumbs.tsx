
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage
} from '@/components/ui/breadcrumb';
import { Home } from 'lucide-react';
import { services } from '@/lib/routes';
import { getCityFromUrl } from '@/lib/cities';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  
  // Skip rendering breadcrumbs on homepage
  if (pathSegments.length === 0) {
    return null;
  }
  
  // Handle city and service page paths
  const isServicePage = services.some(s => 
    s.toLowerCase().replace(/\s+/g, '-') === pathSegments[0]
  );
  
  const isCityPage = pathSegments.length === 1 && !isServicePage;
  const isCityServicePage = pathSegments.length === 2;
  
  const cityName = isCityPage || isCityServicePage 
    ? getCityFromUrl(`/${pathSegments[0]}`) 
    : '';
    
  const serviceName = isServicePage 
    ? services.find(s => s.toLowerCase().replace(/\s+/g, '-') === pathSegments[0])
    : isCityServicePage 
      ? services.find(s => s.toLowerCase().replace(/\s+/g, '-') === pathSegments[1])
      : '';
  
  return (
    <Breadcrumb className="mb-4 text-sm">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">
              <Home className="h-3.5 w-3.5 mr-1" />
              <span className="sr-only">Home</span>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        <BreadcrumbSeparator />
        
        {isCityPage && (
          <BreadcrumbItem>
            <BreadcrumbPage>{cityName}</BreadcrumbPage>
          </BreadcrumbItem>
        )}
        
        {isServicePage && (
          <BreadcrumbItem>
            <BreadcrumbPage>{serviceName}</BreadcrumbPage>
          </BreadcrumbItem>
        )}
        
        {isCityServicePage && (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={`/${pathSegments[0]}`}>{cityName}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            
            <BreadcrumbSeparator />
            
            <BreadcrumbItem>
              <BreadcrumbPage>{serviceName}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;

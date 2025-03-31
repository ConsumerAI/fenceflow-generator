
import { cities } from './cities';
import { ServiceType } from './types';

export const services = Object.values(ServiceType);

export function getServiceUrl(service: ServiceType): string {
  return `/${service.toLowerCase().replace(/\s+/g, '-')}`;
}

export function getCityUrl(city: string): string {
  return `/${city.toLowerCase().replace(/\s+/g, '-')}`;
}

export function getCityServiceUrl(city: string, service: ServiceType): string {
  const citySlug = city.toLowerCase().replace(/\s+/g, '-');
  const serviceSlug = service.toLowerCase().replace(/\s+/g, '-');
  return `/${citySlug}/${serviceSlug}`;
}

// For sitemap generation and route matching
export const serviceRouteMap: Record<string, ServiceType> = {
  'residential-fencing': ServiceType.ResidentialFencing,
  'commercial-fencing': ServiceType.CommercialFencing,
  'athletic-courts-and-sports-facilities': ServiceType.AthleticCourts,
  'access-control': ServiceType.AccessControl,
  'automatic-gates': ServiceType.AutomaticGates,
  'sports-courts': ServiceType.AthleticCourts // Keep this for backward compatibility
};


import { cities } from './cities';
import { ServiceType } from './types';

export const services: ServiceType[] = [
  "Residential Fencing",
  "Commercial Fencing",
  "Sports Courts",
  "Access Control",
  "Automatic Gates"
];

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
  'residential-fencing': 'Residential Fencing',
  'commercial-fencing': 'Commercial Fencing',
  'sports-courts': 'Sports Courts',
  'access-control': 'Access Control',
  'automatic-gates': 'Automatic Gates'
};

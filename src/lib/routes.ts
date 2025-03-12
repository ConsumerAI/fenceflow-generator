
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

export function getCityServiceUrl(city: string, service: ServiceType): string {
  return `${getCityUrl(city)}/${service.toLowerCase().replace(/\s+/g, '-')}`;
}

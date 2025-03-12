import React from 'react';
import { Link } from 'react-router-dom';
import { ServiceInfo } from '@/lib/types';
import { getServiceUrl } from '@/lib/routes';
interface ServiceCardProps {
  service: ServiceInfo;
  index: number;
}
const ServiceCard = ({
  service,
  index
}: ServiceCardProps) => {
  const staggerDelay = `${index * 0.1}s`;
  return <div className="glass-card overflow-hidden transition-all duration-500 group hover:shadow-lg" style={{
    animationDelay: staggerDelay,
    opacity: 0,
    animation: `staggerFade 0.5s ease forwards ${staggerDelay}`
  }} id={service.title.toLowerCase().replace(/\s+/g, '-')}>
      <div className="p-6 md:p-8">
        {/* Larger image container */}
        <div className="w-full h-48 mb-6 overflow-hidden rounded-lg">
          <img src={service.icon} alt={`${service.title} icon`} className="w-full h-full object-cover rounded transition-transform duration-300 group-hover:scale-105" />
        </div>
        
        <Link to={getServiceUrl(service.title)}>
          <h3 className="text-xl md:text-2xl font-bold mb-4 group-hover:text-texas-terracotta transition-colors flex items-center gap-1">
            {service.title}
          </h3>
        </Link>
        
        <p className="text-muted-foreground mb-6">
          {service.description}
        </p>
        
        <ul className="space-y-2">
          {service.benefits.map((benefit, idx) => <li key={idx} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-texas-terracotta flex-shrink-0 mt-1.5" />
              <span className="text-left">{benefit}</span>
            </li>)}
        </ul>
      </div>
    </div>;
};
export default ServiceCard;
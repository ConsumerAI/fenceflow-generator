
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
  
  // Create formatted ID for better HTML semantics and SEO
  const serviceId = service.title.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <div 
      className="glass-card overflow-hidden transition-all duration-500 group hover:shadow-lg" 
      style={{
        animationDelay: staggerDelay,
        opacity: 0,
        animation: `staggerFade 0.5s ease forwards ${staggerDelay}`
      }} 
      id={serviceId}
      itemScope 
      itemType="https://schema.org/Service"
      aria-labelledby={`service-title-${serviceId}`}
    >
      <div className="p-6 md:p-8">
        {/* Larger image container */}
        <div className="w-full h-48 mb-6 overflow-hidden rounded-lg">
          <img 
            src={service.icon} 
            alt={`${service.title} - Professional fence service in DFW`} 
            className="w-full h-full object-cover rounded transition-transform duration-300 group-hover:scale-105"
            itemProp="image"
            loading="lazy"
            width="400"
            height="300"
          />
        </div>
        
        <Link to={getServiceUrl(service.title)}>
          <h3 
            className="text-xl md:text-2xl font-bold mb-4 group-hover:text-texas-terracotta transition-colors flex items-center gap-1"
            itemProp="name"
            id={`service-title-${serviceId}`}
          >
            {service.title}
          </h3>
        </Link>
        
        <p 
          className="text-muted-foreground mb-6"
          itemProp="description"
        >
          {service.description}
        </p>
        
        <ul className="space-y-2" aria-label={`${service.title} benefits`}>
          {service.benefits.map((benefit, idx) => (
            <li 
              key={idx} 
              className="flex items-start gap-2" 
              itemProp="hasOfferCatalog"
            >
              <meta 
                itemProp="itemOffered" 
                content={benefit}
              />
              <div className="w-1.5 h-1.5 rounded-full bg-texas-terracotta flex-shrink-0 mt-1.5" 
                   aria-hidden="true" />
              <span className="text-left">{benefit}</span>
            </li>
          ))}
        </ul>
        
        <meta itemProp="provider" content="Fences Texas" />
        <meta itemProp="areaServed" content="Dallas-Fort Worth Metroplex" />
        <meta itemProp="url" content={`https://fencestexas.com${getServiceUrl(service.title)}`} />
      </div>
    </div>
  );
};

export default ServiceCard;

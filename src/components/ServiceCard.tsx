
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ServiceInfo } from '@/lib/types';
import { getServiceUrl } from '@/lib/routes';

interface ServiceCardProps {
  service: ServiceInfo;
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const staggerDelay = `${index * 0.1}s`;
  const [pixabayImage, setPixabayImage] = useState<string | null>(null);
  
  useEffect(() => {
    // Fetch image from Pixabay based on description
    const fetchPixabayImage = async () => {
      try {
        const PIXABAY_API_KEY = '42186459-a3a0de254f9e0bcd1d66c7f5c'; // Public API key for demo
        const query = encodeURIComponent(`${service.title} fence`);
        const response = await fetch(
          `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${query}&image_type=photo&per_page=3`
        );
        const data = await response.json();
        
        if (data.hits && data.hits.length > 0) {
          setPixabayImage(data.hits[0].webformatURL);
        }
      } catch (error) {
        console.error('Error fetching Pixabay image:', error);
      }
    };
    
    fetchPixabayImage();
  }, [service.title]);
  
  return (
    <div 
      className="glass-card overflow-hidden transition-all duration-500 group hover:shadow-lg"
      style={{
        animationDelay: staggerDelay,
        opacity: 0,
        animation: `staggerFade 0.5s ease forwards ${staggerDelay}`
      }}
      id={service.title.toLowerCase().replace(/\s+/g, '-')}
    >
      <div className="p-6 md:p-8">
        <div className="w-12 h-12 mb-4 text-texas-terracotta">
          {pixabayImage ? (
            <img 
              src={pixabayImage} 
              alt={`${service.title} image`} 
              className="w-full h-full object-cover rounded"
            />
          ) : (
            <img 
              src={service.icon} 
              alt={`${service.title} icon`} 
              className="w-full h-full object-contain"
            />
          )}
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
          {service.benefits.map((benefit, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-texas-terracotta flex-shrink-0 mt-1.5" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ServiceCard;

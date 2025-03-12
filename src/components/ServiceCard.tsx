
import Link from 'next/link';
import Image from 'next/image';
import { ServiceInfo } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  service: ServiceInfo;
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  // Function to get service URL
  const getServiceUrl = (title: string): string => {
    return `/${title.toLowerCase().replace(/\s+/g, '-')}`;
  };

  return (
    <div 
      className="rounded-xl overflow-hidden border border-border bg-background shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full stagger-item"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={service.icon}
          alt={service.title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2">{service.title}</h3>
        <p className="text-muted-foreground mb-4">{service.description}</p>
        
        <div className="mt-auto">
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">Key Benefits:</h4>
            <ul className={cn(
              "space-y-1 text-sm text-muted-foreground", 
              service.benefits.length > 0 ? "list-disc list-inside" : ""
            )}>
              {service.benefits.map((benefit, i) => (
                <li key={i} className="pl-1">{benefit}</li>
              ))}
            </ul>
          </div>
          
          <Link
            href={getServiceUrl(service.title)}
            className="inline-flex items-center text-texas-terracotta hover:text-texas-earth transition-colors group"
          >
            Learn more
            <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;

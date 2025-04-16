import React from 'react';

interface ServiceContentProps {
  content: string;
}

export const ServiceContent: React.FC<ServiceContentProps> = ({ content }) => {
  return (
    <div 
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: content }} 
    />
  );
};

export default ServiceContent; 
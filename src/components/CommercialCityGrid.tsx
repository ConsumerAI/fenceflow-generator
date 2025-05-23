
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { cities } from '@/lib/cities';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const CommercialCityGrid = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter cities based on search query
  const filteredCities = useMemo(() => {
    if (!searchQuery.trim()) return cities;
    
    const query = searchQuery.toLowerCase().trim();
    return cities.filter(city => 
      city.toLowerCase().includes(query)
    );
  }, [searchQuery]);
  
  // Function to generate the commercial-fencing URL for a specific city
  const getCommercialFencingUrl = (city: string): string => {
    return `/${city.toLowerCase().replace(/\s+/g, '-')}/commercial-fencing`;
  };
  
  return (
    <div className="w-full">
      <div className="mb-8 relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search size={18} className="text-muted-foreground" aria-hidden="true" />
        </div>
        <Input
          type="text"
          placeholder="Search for a city..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 py-6 text-base border-texas-sand/20 focus:border-texas-terracotta"
          aria-label="Search for cities"
        />
      </div>
      
      {filteredCities.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg text-muted-foreground">No cities found matching "{searchQuery}"</p>
        </div>
      ) : (
        <div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
          itemScope 
          itemType="https://schema.org/ItemList"
          role="list"
          aria-label="Commercial Fencing Service Areas in DFW"
        >
          <meta itemProp="name" content="Fences Texas Commercial Service Areas" />
          <meta itemProp="description" content="Cities served by Fences Texas for commercial fencing in the Dallas-Fort Worth Metroplex" />
          
          {filteredCities.map((city, index) => (
            <Link
              key={city}
              to={getCommercialFencingUrl(city)}
              className="group"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              role="listitem"
            >
              <meta itemProp="position" content={String(index + 1)} />
              <div className="h-full border border-border rounded-lg p-4 transition-all duration-300 hover:border-texas-terracotta hover:shadow-md flex items-center justify-center">
                <span 
                  className="text-foreground group-hover:text-texas-terracotta transition-colors text-center"
                  itemProp="name"
                >
                  {city} Commercial Fencing
                </span>
                <meta itemProp="url" content={`https://fencestexas.com/${city.toLowerCase().replace(/\s+/g, '-')}/commercial-fencing`} />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommercialCityGrid;

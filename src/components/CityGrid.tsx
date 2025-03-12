
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { cities, getCityUrl } from '@/lib/cities';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const CityGrid = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter cities based on search query
  const filteredCities = useMemo(() => {
    if (!searchQuery.trim()) return cities;
    
    const query = searchQuery.toLowerCase().trim();
    return cities.filter(city => 
      city.toLowerCase().includes(query)
    );
  }, [searchQuery]);
  
  return (
    <div className="w-full">
      <div className="mb-8 relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search size={18} className="text-muted-foreground" />
        </div>
        <Input
          type="text"
          placeholder="Search for a city..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 py-6 text-base border-texas-sand/20 focus:border-texas-terracotta"
        />
      </div>
      
      {filteredCities.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg text-muted-foreground">No cities found matching "{searchQuery}"</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {filteredCities.map((city) => (
            <Link
              key={city}
              to={getCityUrl(city)}
              className="group"
            >
              <div className="h-full border border-border rounded-lg p-4 transition-all duration-300 hover:border-texas-terracotta hover:shadow-md flex items-center justify-center">
                <span className="text-foreground group-hover:text-texas-terracotta transition-colors text-center">
                  {city}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CityGrid;

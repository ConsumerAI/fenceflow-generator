
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { cities } from '@/lib/cities';
import { cn } from '@/lib/utils';

const CityGrid = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter cities based on search term
  const filteredCities = cities.filter(city =>
    city.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Group cities by first letter for alphabetical display
  const groupedCities = filteredCities.reduce<Record<string, string[]>>((acc, city) => {
    const firstLetter = city[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(city);
    return acc;
  }, {});
  
  // Sort the letters alphabetically
  const sortedLetters = Object.keys(groupedCities).sort();
  
  // Function to get city URL
  const getCityUrl = (city: string) => {
    return `/${city.toLowerCase().replace(/\s+/g, '-')}`;
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search for your city..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md mx-auto"
        />
      </div>
      
      {filteredCities.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No cities found matching your search.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {sortedLetters.map((letter) => (
            <div key={letter} className="animate-fade-in">
              <h3 className="text-lg font-bold mb-3 border-b pb-2">{letter}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-2">
                {groupedCities[letter].map((city, index) => (
                  <Link
                    key={city}
                    href={getCityUrl(city)}
                    className={cn(
                      "text-muted-foreground hover:text-texas-terracotta transition-colors py-1 stagger-item",
                      { "delay-100": index % 5 === 0 },
                      { "delay-200": index % 5 === 1 },
                      { "delay-300": index % 5 === 2 },
                      { "delay-400": index % 5 === 3 },
                      { "delay-500": index % 5 === 4 }
                    )}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {city}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CityGrid;

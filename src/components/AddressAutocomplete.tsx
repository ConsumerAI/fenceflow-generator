import React, { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { MapPin, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const AddressAutocomplete = ({ 
  value, 
  onChange, 
  placeholder = "Property address", 
  className 
}: AddressAutocompleteProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [predictions, setPredictions] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const [showPredictions, setShowPredictions] = useState(false);
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // Check if Google Places API is available and working
    if (window.google && window.google.maps && window.google.maps.places) {
      try {
        setIsGoogleLoaded(true);
      } catch (error) {
        console.warn('Google Places API not properly initialized:', error);
        setIsGoogleLoaded(false);
      }
    }
  }, []);

  useEffect(() => {
    // Check if the API script is already loaded
    if (window.google && window.google.maps && window.google.maps.places) {
      initAutocomplete();
      return;
    }
    
    // Function to load the Google Maps API
    const loadGoogleMapsAPI = async () => {
      try {
        setIsLoading(true);
        
        // Get API key from Supabase Edge Function
        const { data, error } = await supabase.functions.invoke('get-maps-api-key');
        
        if (error) {
          throw new Error(`Failed to retrieve API key: ${error.message}`);
        }
        
        if (!data?.apiKey) {
          throw new Error('API key not found');
        }
        
        // Load Google Maps API script
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${data.apiKey}&libraries=places`;
        script.async = true;
        script.defer = true;
        
        // Create a promise to wait for the script to load
        const loadPromise = new Promise<void>((resolve, reject) => {
          script.onload = () => {
            initAutocomplete();
            resolve();
          };
          script.onerror = () => reject(new Error("Failed to load Google Maps API"));
        });
        
        document.body.appendChild(script);
        await loadPromise;
        
        return () => {
          // Clean up the script when component unmounts
          if (document.body.contains(script)) {
            document.body.removeChild(script);
          }
        };
      } catch (error) {
        console.error("Error loading Google Maps API:", error);
        toast({
          title: "Error",
          description: "Failed to load address autocomplete feature",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadGoogleMapsAPI();
  }, []);

  const initAutocomplete = () => {
    if (!inputRef.current || !window.google?.maps?.places) return;
    
    try {
      autocompleteRef.current = new google.maps.places.Autocomplete(
        inputRef.current,
        { types: ['address'], componentRestrictions: { country: 'us' } }
      );

      autocompleteRef.current.addListener('place_changed', () => {
        const place = autocompleteRef.current?.getPlace();
        if (place && place.formatted_address) {
          onChange(place.formatted_address);
          setShowPredictions(false);
          setPredictions([]);
        }
      });
    } catch (error) {
      console.error("Error initializing autocomplete:", error);
    }
  };

  const openGoogleMaps = () => {
    if (value.trim().length > 0) {
      const encodedAddress = encodeURIComponent(value);
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
    } else {
      toast({
        title: "Address field is empty",
        description: "Please enter an address first.",
        variant: "destructive",
      });
    }
  };

  const clearInput = () => {
    onChange('');
    setShowPredictions(false);
    setPredictions([]);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // If Google Places isn't loaded, fall back to regular input
  if (!isGoogleLoaded) {
    return (
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Enter address"}
      />
    );
  }

  return (
    <div className="relative w-full">
      <div className="flex gap-2">
        <div className="relative flex-grow">
          <Input
            ref={inputRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={isLoading ? "Loading address service..." : placeholder}
            className={className}
            onFocus={() => setShowPredictions(true)}
            disabled={isLoading}
          />
          {value && (
            <button
              type="button"
              onClick={clearInput}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Clear address"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <Button 
          type="button" 
          variant="outline" 
          onClick={openGoogleMaps}
          className="flex-shrink-0"
          title="Verify address on Google Maps"
          disabled={isLoading || !value}
        >
          <MapPin className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default AddressAutocomplete;

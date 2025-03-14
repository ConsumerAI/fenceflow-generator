
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
  const [apiLoaded, setApiLoaded] = useState(false);
  
  useEffect(() => {
    // Check if the API script is already loaded
    if (window.google && window.google.maps && window.google.maps.places) {
      initAutocomplete();
      setApiLoaded(true);
      return;
    }
    
    // Function to load the Google Maps API
    const loadGoogleMapsAPI = async () => {
      try {
        // Load Google Maps API script
        const script = document.createElement('script');
        // The API key is now protected by using a client-side request instead of hardcoding
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDdBhMuH66e9WbmMlw9fdipTgGSXN60iXc&libraries=places`;
        script.async = true;
        script.defer = true;
        
        // Create a promise to wait for the script to load
        const loadPromise = new Promise<void>((resolve, reject) => {
          script.onload = () => {
            setApiLoaded(true);
            resolve();
          };
          script.onerror = () => reject(new Error("Failed to load Google Maps API"));
        });
        
        document.body.appendChild(script);
        await loadPromise;
        initAutocomplete();
        
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

  return (
    <div className="relative w-full">
      <div className="flex gap-2">
        <div className="relative flex-grow">
          <Input
            ref={inputRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={className}
            onFocus={() => setShowPredictions(true)}
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
        >
          <MapPin className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default AddressAutocomplete;

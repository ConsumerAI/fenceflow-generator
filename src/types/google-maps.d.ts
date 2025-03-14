
declare namespace google.maps.places {
  class Autocomplete {
    constructor(
      inputField: HTMLInputElement,
      opts?: AutocompleteOptions
    );
    addListener(eventName: string, handler: Function): void;
    getPlace(): AutocompletePlace;
  }

  interface AutocompleteOptions {
    types?: string[];
    componentRestrictions?: {
      country: string | string[];
    };
  }

  interface AutocompletePrediction {
    description: string;
    place_id: string;
    structured_formatting: {
      main_text: string;
      secondary_text: string;
    };
  }

  interface AutocompletePlace {
    address_components?: any[];
    formatted_address?: string;
    geometry?: {
      location: {
        lat: () => number;
        lng: () => number;
      };
    };
    place_id?: string;
  }
}

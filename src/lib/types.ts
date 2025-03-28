export interface Lead {
  id?: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  service_type: ServiceType;
  message: string;
  city: string;
  linear_feet?: number;
  fence_material?: "Cedar (Most Common)" | "Iron" | "Pipe" | "Pool Mesh" | "Economy (Pine)";
  "Estimated Cost Quote"?: string;
  created_at?: string;
}

export type ServiceType = 
  | "Residential Fencing"
  | "Commercial Fencing"
  | "Athletic Courts and Sports Facilities"
  | "Access Control"
  | "Automatic Gates";

export interface ServiceInfo {
  title: ServiceType;
  description: string;
  icon: string;
  benefits: string[];
}

export interface CityContent {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  serviceSections: {
    [key in ServiceType]: string;
  };
  benefits: string[];
  faq: string;
  cta: string;
  keywords: string[];
  images: ImageData[];
  
  // New environmental fields
  environmentalConsiderations?: string;
  environmentalData?: {
    temp: number;
    humidity: number;
    rainfall: number;
    windSpeed: number;
    description: string;
    soilType: {
      type: string;
      characteristics: string;
      postDepth: number;
      fenceConsiderations: string;
    };
    isCoastal: boolean;
    uvIndex: number;
    uvCategory: string;
    hasFreezeCycles: boolean;
    hurricaneRisk: number;
    specificChallenges: string;
    region?: string;
  };
}

export interface ImageData {
  src: string;
  alt: string;
}

export interface ContentCache {
  id?: string;
  page_url: string;
  content: CityContent;
  created_at?: string;
  expires_at?: string;
}
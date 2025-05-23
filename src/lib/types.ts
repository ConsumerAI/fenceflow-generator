// Make sure we're properly exporting ServiceType
export interface Lead {
  id?: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  service_type: ServiceType;
  preferred_timeline: 'ASAP' | 'Within 1 Month' | 'Within 3 Months' | 'Just Researching';
  message: string;
  city: string;
  zip_code: string;
  linear_feet?: number;
  fence_material?: "Cedar (Most Common)" | "Iron" | "Pipe" | "Pool Mesh" | "Economy (Pine)";
  "Estimated Cost Quote"?: string;
  recaptcha_v3_token?: string;
  recaptcha_v3_score?: number;
  recaptcha_v2_token?: string;
  client_ip?: string;
  created_at?: string;
}

export enum ServiceType {
  ResidentialFencing = "Residential Fencing",
  CommercialFencing = "Commercial Fencing",
  AthleticCourts = "Athletic Courts and Sports Facilities",
  AccessControl = "Access Control",
  AutomaticGates = "Automatic Gates"
}

export interface ServiceInfo {
  title: string;
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

type Database = {
  public: {
    Tables: {
      leads: {
        Row: Lead;
        Insert: Omit<Lead, 'id' | 'created_at' | 'client_ip'>;
        Update: Partial<Lead>;
      };
      content_cache: {
        Row: ContentCache;
        Insert: Omit<ContentCache, 'id' | 'created_at'>;
        Update: Partial<ContentCache>;
      };
    };
    Functions: {
      get_cached_content: {
        Args: { p_cache_key: string };
        Returns: string;
      };
      cache_content: {
        Args: { 
          p_cache_key: string;
          p_cache_content: string;
          p_expire_days: number;
        };
        Returns: void;
      };
      verify_recaptcha: {
        Args: { v3_token?: string; v2_token?: string };
        Returns: { success: boolean; score?: number };
      };
    };
  };
};

export type { Database };

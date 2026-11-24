
import { z } from 'zod';

// Define environment schema with proper validation
const envSchema = z.object({
  VITE_SUPABASE_URL: z.string().url().default('https://yybkjsuqcihqzlbnjjtk.supabase.co'),
  VITE_SUPABASE_ANON_KEY: z.string().min(1).default('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5Ymtqc3VxY2locXpsYm5qanRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTU1NTczNDgsImV4cCI6MjExMTEzMzM0OH0.KljNXJYN6G1hyw04caXm9Lt1jBrH_BbA7qcDjD4jQoo'),
  VITE_GOOGLE_MAPS_API_KEY: z.string().min(1).default('YOUR_MAPS_API_KEY'),
  VITE_RECAPTCHA_V3_SITE_KEY: z.string().min(1).default('YOUR_RECAPTCHA_V3_SITE_KEY'),
  VITE_RECAPTCHA_V2_SITE_KEY: z.string().min(1).default('YOUR_RECAPTCHA_V2_SITE_KEY'),
});

export function validateEnv() {
  try {
    // First try to parse with actual environment variables
    const parsed = envSchema.safeParse({
      VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
      VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
      VITE_GOOGLE_MAPS_API_KEY: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      VITE_RECAPTCHA_V3_SITE_KEY: import.meta.env.VITE_RECAPTCHA_V3_SITE_KEY,
      VITE_RECAPTCHA_V2_SITE_KEY: import.meta.env.VITE_RECAPTCHA_V2_SITE_KEY,
    });

    if (!parsed.success) {
      // If not successful, use defaults in development
      console.warn('⚠️ Environment variables missing, using default values for development');
      return envSchema.parse({});
    }

    return parsed.data;
  } catch (error) {
    console.error('❌ Error validating environment variables:', error);
    // In development, proceed with defaults
    if (import.meta.env.DEV) {
      console.warn('⚠️ Using default environment variables for development');
      return envSchema.parse({});
    }
    // In production, throw an error
    throw new Error('Invalid environment variables');
  }
}

// Export validated env variables
export const env = validateEnv();

import { z } from 'zod';

const envSchema = z.object({
  VITE_SUPABASE_URL: z.string().url(),
  VITE_SUPABASE_ANON_KEY: z.string().min(1),
  VITE_GOOGLE_MAPS_API_KEY: z.string().min(1),
  VITE_RECAPTCHA_V3_SITE_KEY: z.string().min(1),
  VITE_RECAPTCHA_V2_SITE_KEY: z.string().min(1),
});

export function validateEnv() {
  const parsed = envSchema.safeParse({
    VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
    VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
    VITE_GOOGLE_MAPS_API_KEY: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    VITE_RECAPTCHA_V3_SITE_KEY: import.meta.env.VITE_RECAPTCHA_V3_SITE_KEY,
    VITE_RECAPTCHA_V2_SITE_KEY: import.meta.env.VITE_RECAPTCHA_V2_SITE_KEY,
  });

  if (!parsed.success) {
    console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
    throw new Error('Invalid environment variables');
  }

  return parsed.data;
}

// Export validated env variables
export const env = validateEnv(); 
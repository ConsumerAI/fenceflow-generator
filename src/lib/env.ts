import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: z.string().min(1),
  NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY: z.string().min(1),
  NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY: z.string().min(1),
});

export function validateEnv() {
  const parsed = envSchema.safeParse({
    NEXT_PUBLIC_SUPABASE_URL: import.meta.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: import.meta.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY: import.meta.env.NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY,
    NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY: import.meta.env.NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY,
  });

  if (!parsed.success) {
    console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
    throw new Error('Invalid environment variables');
  }

  return parsed.data;
}

// Export validated env variables
export const env = validateEnv(); 
import { z } from 'zod/v4';

const envSchema = z.object({
  MODE: z.enum(['development', 'production']).default('development'),
  VITE_DEV_SERVER_URL: z.string().min(5, 'DEV_SERVER_URL is required'),
  VITE_PROD_SERVER_URL: z.string().min(5, 'PROD_SERVER_URL is required'),
  VITE_SUPABASE_URL: z.string().min(5, 'SUPABASE_URL is required'),
  VITE_SUPABASE_PUBLIC_KEY: z.string().min(5, 'SUPABASE_ANON_KEY is required'),
});

const env = envSchema.parse(import.meta.env);

const config = {
  server_url:
    env.MODE === 'development' ? env.VITE_DEV_SERVER_URL : env.VITE_PROD_SERVER_URL,
  env: env.MODE,
  supabase_url: env.VITE_SUPABASE_URL,
  supabase_public_key: env.VITE_SUPABASE_PUBLIC_KEY,
};

export default config;

import 'dotenv/config';

import { z } from 'zod/v4';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  PORT: z.string().default('3000'),
  SUPABASE_URL: z.string().min(1, 'SUPABASE_URL is required'),
  SUPABASE_ANON_KEY: z.string().min(1, 'SUPABASE_ANON_KEY is required'),
  SUPABASE_SERVICE_KEY: z.string().min(1, 'SUPABASE_SERVICE_KEY is required'),
  SUPABASE_JWT_SECRET: z.string().min(1, 'SUPABASE_JWT_SECRET is required'),
});

const env = envSchema.parse(process.env);

const config = {
  port: Number(env.PORT),
  nodeEnv: env.NODE_ENV,
  supabase_url: env.SUPABASE_URL,
  supabase_anon_key: env.SUPABASE_ANON_KEY,
  supabase_service_key: env.SUPABASE_SERVICE_KEY,
  supabase_jwt_secret: env.SUPABASE_JWT_SECRET,
};

export default config;

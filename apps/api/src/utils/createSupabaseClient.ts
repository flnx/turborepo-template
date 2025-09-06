import { createClient } from '@supabase/supabase-js';

import config from '@/config/options';

import type { Database } from '@/types/database.types';

export const createSupabaseClient = () => {
  const supabase = createClient<Database, 'api'>(
    config.supabase_url,
    config.supabase_service_key,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false,
      },
      db: {
        schema: 'api',
      },
    },
  );

  return supabase;
};

export type CreateSupabaseClient = ReturnType<typeof createSupabaseClient>;

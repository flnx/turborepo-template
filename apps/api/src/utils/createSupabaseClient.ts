import { createClient } from '@supabase/supabase-js';
import config from '../config/options';

export const createSupabaseClient = (accessToken: string) => {
  const supabase = createClient(config.supabase_url, config.supabase_anon_key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
    global: accessToken
      ? { headers: { Authorization: accessToken } }
      : {},
  });

  return supabase;
};

import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseJWTPayload } from '../types/auth';

export type ServiceContext = {
  supabase: SupabaseClient;
  user: SupabaseJWTPayload;
};

export function createService<C extends ServiceContext, R = any>(
  fn: (ctx: C) => Promise<R>
): (ctx: C) => Promise<R> {
  return fn;
}

import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseJWTPayload } from '../types/auth';

export type TServiceContext = {
  supabase: SupabaseClient;
  user: SupabaseJWTPayload;
};

export function createService<C extends TServiceContext, R = any>(
  fn: (ctx: C) => Promise<R>
): (ctx: C) => Promise<R> {
  return fn;
}

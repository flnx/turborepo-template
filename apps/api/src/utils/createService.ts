import { SupabaseJWTPayload } from '@/types/auth';

import type { CreateSupabaseClient } from './createSupabaseClient';

export type ServiceContext = {
  supabase: CreateSupabaseClient;
  user: SupabaseJWTPayload;
};

export function createService<C extends ServiceContext, R = any>(
  fn: (ctx: C) => Promise<R>,
): (ctx: C) => Promise<R> {
  return fn;
}

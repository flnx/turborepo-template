import { SupabaseJWTPayload } from '@/types/auth';

import type { TCreateSupabaseClient } from './createSupabaseClient';

export type TServiceContext = {
  supabase: TCreateSupabaseClient;
  user: SupabaseJWTPayload;
};

export function createService<C extends TServiceContext, R = any>(
  fn: (ctx: C) => Promise<R>,
): (ctx: C) => Promise<R> {
  return fn;
}

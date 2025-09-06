import { SupabaseJWTPayload } from '@/types/auth';

export type ServiceContext = {
  user: SupabaseJWTPayload;
};

export function createService<C extends ServiceContext, R = any>(
  fn: (ctx: C) => Promise<R>,
): (ctx: C) => Promise<R> {
  return fn;
}

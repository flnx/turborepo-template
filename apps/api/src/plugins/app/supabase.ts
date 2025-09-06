import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

import { createSupabaseClient } from '@/utils/createSupabaseClient';

import type { CreateSupabaseClient } from '@/utils/createSupabaseClient';

declare module 'fastify' {
  export interface FastifyInstance {
    supabase: CreateSupabaseClient;
  }
}

async function supabasePlugin(app: FastifyInstance) {
  app.decorate('supabase', createSupabaseClient());
}

export default fp(supabasePlugin, {
  name: 'supabase',
  dependencies: ['authorization'],
});

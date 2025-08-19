import { SupabaseClient } from '@supabase/supabase-js';
import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

import { createSupabaseClient } from '@/utils/createSupabaseClient';

import type { CreateSupabaseClient } from '@/utils/createSupabaseClient';

declare module 'fastify' {
  export interface FastifyRequest {
    supabase: CreateSupabaseClient;
  }
}

/**
 * Initiliazes the supabase client for each request
 *
 * - If the user is authenticated, it attaches the supabase client to each request (req.supabase)
 */

async function supabasePlugin(app: FastifyInstance) {
  app.decorateRequest('supabase', null as unknown as SupabaseClient);

  app.addHook('onRequest', async (req) => {
    // Validation unnecessary. The header 100% exists, because the authorization plugin already did the validation
    const userAccessToken = req.headers.authorization!;
    req.supabase = createSupabaseClient(userAccessToken);
  });
}

export default fp(supabasePlugin, {
  name: 'supabase',
  dependencies: ['authorization'],
});

import { FastifyInstance } from 'fastify';
import { createSupabaseClient } from '../../utils/createSupabaseClient';
import fp from 'fastify-plugin';
import { SupabaseClient } from '@supabase/supabase-js';

declare module 'fastify' {
  export interface FastifyRequest {
    supabase: SupabaseClient | null;
  }
}

/**
 * Initiliazes the supabase client for each request
 *
 * - If the user is authenticated, it attaches the supabase client to each request (req.supabase)
 */

async function supabasePlugin(app: FastifyInstance) {
  app.decorateRequest('supabase', null);

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

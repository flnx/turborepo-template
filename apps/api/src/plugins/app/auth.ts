import fastifyJwt from '@fastify/jwt';
import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

import options from '../../config/options';

import type { SupabaseAuthSession, SupabaseJWTPayload } from '../../types/auth';

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: SupabaseJWTPayload;
  }
}

/**
 * Checks and validates the Bearer token for each requests
 *
 * - Expects `Authorization` header to start with `Bearer`.
 * - If the token is valid, the user data will be attached to the request header - (req.user).
 */

async function authPlugin(app: FastifyInstance) {
  app.register(fastifyJwt, {
    formatUser: (payload) => {
      const user = payload as SupabaseAuthSession;

      const formatted: SupabaseJWTPayload = {
        email: user.email,
        email_verified: user.user_metadata.email_verified,
        full_name: user.user_metadata.full_name,
        id: user.sub,
      };

      return formatted;
    },

    secret: options.supabase_jwt_secret,
  });

  app.addHook('onRequest', async (req, reply) => {
    try {
      await req.jwtVerify();
    } catch (err) {
      reply.unauthorized();
    }
  });
}

export default fp(authPlugin, {
  name: 'authorization',
});

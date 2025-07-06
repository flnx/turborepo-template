import fastifyRateLimit, { RateLimitPluginOptions } from '@fastify/rate-limit';
import { FastifyInstance } from 'fastify';

export const autoConfig = (_fastify: FastifyInstance) => {
  const opts: RateLimitPluginOptions = {
    max: 35,
    timeWindow: '1 minute',
    // keyGenerator: async (req) => req.user.id, // By default it checks the ip address
  };

  return opts;
};

/**
 * This plugins is low overhead rate limiter for your routes.
 *
 * @see {@link https://github.com/fastify/fastify-rate-limit}
 */
export default fastifyRateLimit;

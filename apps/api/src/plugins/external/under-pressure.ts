import { FastifyInstance } from 'fastify';
import fastifyUnderPressure, {
  FastifyUnderPressureOptions,
} from '@fastify/under-pressure';
import fp from 'fastify-plugin';

export const autoConfig = (_fastify: FastifyInstance) => {
  const options: FastifyUnderPressureOptions = {
    maxEventLoopDelay: 1000,
    maxHeapUsedBytes: 100_000_000,
    maxRssBytes: 1_000_000_000,
    maxEventLoopUtilization: 0.98,
    message: 'The server is under pressure, retry later!',
    retryAfter: 50,
    // healthCheckInterval: 3600000,
    exposeStatusRoute: {
      routeResponseSchemaOpts: {
        extraValue: { type: 'string' },
        metrics: {
          type: 'object',
          properties: {
            eventLoopDelay: { type: 'number' },
            rssBytes: { type: 'number' },
            heapUsed: { type: 'number' },
            eventLoopUtilized: { type: 'number' },
          },
        },
      },

      routeOpts: {
        logLevel: 'debug',
        config: {
          someAttr: 'value',
          asd: 'number',
        },
      },
    },
    healthCheck: async (fastifyInstance) => {
      return {
        metrics: fastifyInstance.memoryUsage(),
      };
    },
  };

  return options;
};

/**
 * A Fastify plugin for mesuring process load and automatically
 * handle of "Service Unavailable"
 *
 * @see {@link https://github.com/fastify/under-pressure}
 *
 * Video on the topic: Do not thrash the event loop
 * @see {@link https://www.youtube.com/watch?v=VI29mUA8n9w}
 */
export default fp(fastifyUnderPressure);

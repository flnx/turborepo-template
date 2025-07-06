import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import fastifyAutoload from '@fastify/autoload';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function serviceApp(app: FastifyInstance, opts: FastifyPluginOptions) {
  // This loads all external plugins defined in plugins/external
  // those should be registered first as the application plugins might depend on them
  await app.register(fastifyAutoload, {
    dir: join(__dirname, 'plugins/external'),
    options: { ...opts },
  });

  // This loads all application plugins defined in plugins/app
  // Those should be support plugins that are reused the application
  app.register(fastifyAutoload, {
    dir: join(__dirname, 'plugins/app'),
    options: { ...opts },
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  app.register(fastifyAutoload, {
    dir: join(__dirname, 'routes'),
    autoHooks: true,
    cascadeHooks: true,
    options: { ...opts },
  });

  app.setErrorHandler((err, request, reply) => {
    app.log.error(
      {
        err,
        request: {
          method: request.method,
          url: request.url,
          query: request.query,
          params: request.params,
        },
      },
      'Unhandled error occurred',
    );

    reply.code(err.statusCode ?? 500);

    let message = 'Internal Server Error';

    if (err.statusCode && err.statusCode < 500) {
      message = err.message;
    }

    return { message };
  });

  // An attacker could search for valid URLs if your 404 error handling is not rate limited.
  app.setNotFoundHandler(
    {
      preHandler: app.rateLimit({
        max: 4,
        timeWindow: '1 minute',
      }),
    },
    (request, reply) => {
      request.log.warn(
        {
          request: {
            method: request.method,
            url: request.url,
            query: request.query,
            params: request.params,
          },
        },
        'Resource not found',
      );

      reply.code(404);

      return { message: 'Not Found' };
    },
  );
}

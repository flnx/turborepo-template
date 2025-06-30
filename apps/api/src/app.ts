import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import fastifyAutoload from '@fastify/autoload';

import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function serviceApp(
  app: FastifyInstance,
  opts: FastifyPluginOptions
) {
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
}

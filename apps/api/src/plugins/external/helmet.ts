import helmet, { FastifyHelmetOptions } from '@fastify/helmet';

export const autoConfig: FastifyHelmetOptions = {
  // Set plugin options here
};

/**
 * This plugins sets the basic security headers.
 *
 * @see {@link https://github.com/fastify/fastify-helmet}
 */
export default helmet;

import cors, { FastifyCorsOptions } from '@fastify/cors';

import config from '../../config/options';

export const autoConfig: FastifyCorsOptions = {
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  origin: config.nodeEnv === 'development' ? 'http://localhost:5173' : '',
  credentials: true,
};

/**
 * This plugins enables the use of CORS.
 *
 * @see {@link https://github.com/fastify/fastify-cors}
 */
export default cors;

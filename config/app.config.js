import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

const environment = process.env.NODE_ENV || 'development';
export default {
  apiPrefix: environment === 'production' ? '/api/v1' : '/api/dev',
  // eslint-disable-next-line no-magic-numbers
  port: process.env.PORT || 3000,
  allowedContentTypes: ['application/json'],
};

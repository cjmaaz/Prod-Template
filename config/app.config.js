import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

const environment = process.env.NODE_ENV || 'development';

export default {
  // eslint-disable-next-line no-magic-numbers
  port: process.env.PORT || 3000,
  apiPrefix: environment === 'production' ? '/api' : '/dev-api',
  allowedContentTypes: ['application/json', 'application/x-www-form-urlencoded'],
  environment
};

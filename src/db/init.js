import mongoose from 'mongoose';

import dbConfig from '../../config/db.config.js';
import logger from '../utils/logger.js';

export default async function initDatabase() {
  mongoose.connection.on('open', () => {
    logger.info(`successfully connected to database: ${dbConfig.url}`);
  });
  try {
    const connection = await mongoose.connect(dbConfig.url);
    return connection;
  } catch (error) {
    logger.error(`couldn't connect to DB ${error}`);
    process.exit(1);
  }
}

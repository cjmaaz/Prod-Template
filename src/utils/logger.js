import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

import pino from 'pino';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const logsDir = resolve(__dirname, '../../logs');

const targets = [];

if (process.env.LOG_FORMAT === 'pretty') {
  targets.push({
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname'
    },
    level: process.env.LOG_LEVEL
  });
}

if (process.env.LOG_FILE_ENABLED === 'true') {
  targets.push({
    target: 'pino-roll',
    options: {
      file: resolve(logsDir, 'app.log'),
      size: process.env.LOG_MAX_SIZE,
      frequency: 'daily',
      limit: { count: Number(process.env.LOG_RETENTION_DAYS) },
      mkdir: true,
      dateFormat: 'yyyy-MM-dd'
    },
    level: 'info'
  });
  targets.push({
    target: 'pino-roll',
    options: {
      file: resolve(logsDir, 'error.log'),
      size: process.env.LOG_MAX_SIZE,
      frequency: 'daily',
      limit: { count: 30 },
      mkdir: true,
      dateFormat: 'yyyy-MM-dd'
    },
    level: 'error'
  });
  if (process.env.NODE_ENV !== 'production') {
    targets.push({
      target: 'pino-roll',
      options: {
        file: resolve(logsDir, 'debug.log'),
        size: process.env.LOG_MAX_SIZE,
        frequency: 'daily',
        limit: { count: Number(process.env.LOG_RETENTION_DAYS) },
        mkdir: true,
        dateFormat: 'yyyy-MM-dd'
      },
      level: 'debug'
    });
  }
}
export default pino({
  level: process.env.LOG_LEVEL,
  timestamp: pino.stdTimeFunctions.isoTime,
}, pino.transport({ targets }));

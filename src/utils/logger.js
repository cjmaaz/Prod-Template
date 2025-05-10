import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import { randomUUID } from 'node:crypto';

import dayjs from 'dayjs';
import pino from 'pino';

// Handle __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure logs directory exists
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

const isDevelopment = process.env.NODE_ENV !== 'production';
// const isDevelopment = false;

const baseConfig = {
  base: {
    env: process.env.NODE_ENV || 'development',
    service: 'prod-template-fullstack',
    version: process.env.npm_package_version,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
  level: isDevelopment ? 'debug' : 'info',
  redact: {
    paths: ['req.headers.authorization', 'req.headers.cookie', 'password', 'secret'],
    censor: '[REDACTED]'
  }
};

// Create the appropriate transport based on environment
let transport;
if (isDevelopment) {
  transport = pino.transport({
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname',
    }
  });
} else {
  // Production: Output to rotating files and console
  transport = pino.transport({
    targets: [
      {
        target: 'pino-roll',
        options: {
          file: path.join(logsDir, 'app.log'),
          size: '10m',
          interval: '1d',
          maxFiles: 14,
          compress: true,
        },
        level: 'info'
      },
      {
        target: 'pino-roll',
        options: {
          file: path.join(logsDir, 'error.log'),
          size: '10m',
          interval: '1d',
          maxFiles: 30,
          compress: true,
        },
        level: 'error'
      },
      {
        target: 'pino/file',
        options: {
          destination: 1, // stdout
        },
        level: 'warn'
      }
    ]
  });
}

// Initialize the logger
const logger = pino(baseConfig, transport);

if (!isDevelopment) {
  logger.createRequestLogger = (req, res) => {
    const requestId = req.headers['x-request-id'] || randomUUID();
    res.setHeader('x-request-id', requestId);
    return logger.child({
      requestId,
      method: req.method,
      url: req.url,
      userAgent: req.headers['user-agent'],
      ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress
    });
  };
}

export default logger;

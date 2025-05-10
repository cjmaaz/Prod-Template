// logger.js
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import { randomUUID } from 'node:crypto';

import pino from 'pino';

// Handle __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure logs directory exists
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Configuration based on environment
const isDevelopment = process.env.NODE_ENV !== 'production';

// Base logger configuration
const baseConfig = {
  // Standard fields to include with every log
  base: {
    env: process.env.NODE_ENV || 'development',
    service: 'my-service-name',
    // Access package version in ESM environment
    version: process.env.npm_package_version,
  },
  // ISO timestamp format
  timestamp: () => `,"time":"${new Date().toISOString()}"`,
  // Different log levels for dev and prod
  level: isDevelopment ? 'debug' : 'info',
  // Redact sensitive information
  redact: {
    paths: ['req.headers.authorization', 'req.headers.cookie', 'password', 'secret'],
    censor: '[REDACTED]'
  }
};

// Create the appropriate transport based on environment
let transport;
if (isDevelopment) {
  // Development: Use pretty-print to console
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
      // File destination with proper rotation
      {
        target: 'pino-roll',
        options: {
          // Base file name
          file: path.join(logsDir, 'app.log'),

          // Roll file when size exceeds 10MB
          size: '10m',

          // Roll file daily at midnight
          interval: '1d',

          // Keep 14 days of logs
          maxFiles: 14,

          // Enable gzip compression for archived logs
          compress: true,

          // Add timestamp to rotated files (YYYY-MM-DD)
          timestamp: () => {
            const now = new Date();
            return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
          }
        },
        level: 'info'
      },
      // Error-specific log file with rotation
      {
        target: 'pino-roll',
        options: {
          file: path.join(logsDir, 'error.log'),
          size: '10m',
          interval: '1d',
          maxFiles: 30, // Keep error logs longer
          compress: true,
          timestamp: () => {
            const now = new Date();
            return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
          }
        },
        level: 'error'
      },
      // Still log to console in production, but less verbose
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

// Add request ID tracking if in production
if (!isDevelopment) {
  // Create a child logger with request context
  logger.createRequestLogger = (req, res) => {
    // Generate or use an existing request ID
    const requestId = req.headers['x-request-id'] || randomUUID();
    res.setHeader('x-request-id', requestId);

    // Create a child logger with request context
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

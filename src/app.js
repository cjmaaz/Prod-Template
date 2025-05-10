import express from 'express';

import appConfig from '../config/app.config.js';

import initDatabase from './db/init.js';
import validateContentType from './middleware/validateContentType.js';
import logger from './utils/logger.js';
import blogRouter from './routes/blogRoutes.js';


const app = express();
initDatabase();

if (appConfig.allowedContentTypes.includes('application/json')) {
  app.use(express.json());
}

app.use((req, res, next) => {
  const start = Date.now();
  const requestLogger = logger.createRequestLogger
    ? logger.createRequestLogger(req, res)
    : logger;
  req.log = requestLogger;
  res.on('finish', () => {
    const duration = Date.now() - start;
    requestLogger.info({
      responseTime: duration,
      statusCode: res.statusCode,
      contentLength: res.get('content-length')
    }, 'Request completed');
  });

  next();
});

app.get(`${appConfig.apiPrefix}/status`, (req, res) => {
  const data = {
    status: 'OK',
    environment: process.env.NODE_ENV || 'development',
  };
  req.log.info(data, 'status send successfully');
  res.json(data);
});

app.use(validateContentType);


app.use(`${appConfig.apiPrefix}/blog`, blogRouter);


app.all(/.*/, (req, res) => {
  const err = { message: `Can't find ${req.originalUrl} on this server.` };
  req.log.error({ err }, 'Unhandled Params');
  res.status(404).send(`Can't find ${req.originalUrl} on this server.`);
});

app.listen(appConfig.port, () => {
  logger.info(`server running at: http://localhost:${appConfig.port}/`);
});

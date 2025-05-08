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

app.get(`${appConfig.apiPrefix}/status`, (req, res) => {
  res.json({
    status: 'OK',
    environment: process.env.NODE_ENV || 'development',
  });
});

app.use(validateContentType);


app.use(`${appConfig.apiPrefix}/blog`, blogRouter);


app.all(/.*/, (req, res) => {
  res.status(404).send(`Can't find ${req.originalUrl} on this server.`);
});

app.listen(appConfig.port, () => {
  logger.info(`server running at: http://localhost:${appConfig.port}/`);
});

import express from 'express';

import config from '../config/app.config.js';

import { validateContentType } from './middleware/validateContentType.js';

const app = express();

if (config.allowedContentTypes.includes('application/json')) {
  app.use(express.json());
}
if (config.allowedContentTypes.includes('application/x-www-form-urlencoded')) {
  app.use(express.urlencoded({ extended: true }));
}

app.use(validateContentType);
app.use('/', (req, res) => res.send('Hello World'));
app.listen(config.port, () => {
  console.info(`Server running at http://localhost:${config.port}`);
});

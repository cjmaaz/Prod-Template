import express from 'express';

import appConfig from '../config/app.config.js';

const app = express();

app.get('/', (req, res) => res.send('Hello World'));

app.listen(appConfig.port, () => {
  console.info(`Server running at http://localhost:${appConfig.port}`);
});

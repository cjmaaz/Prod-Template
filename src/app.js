import express from 'express';

import './config/app.config.js';
import logger from './utils/logger.js';

const app = express();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  logger.debug(`Server running at: http://localhost:${PORT}`);
});

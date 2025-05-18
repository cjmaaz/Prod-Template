import express from 'express';
import './config/app.config.js';

const app = express();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.info(`Server running at: http://localhost:${PORT}`);
});

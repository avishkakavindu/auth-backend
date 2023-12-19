import express from 'express';
import { PORT } from './config';
import connectToDb from './utils/db';
import logger from './utils/logger';

const app = express();

app.listen(PORT, () => {
  logger.info(`App started at http://localhost:${PORT}`);

  connectToDb();
});

import express from 'express';

import { PORT } from './config';
import connectToDb from './utils/db';
import logger from './utils/logger';
import routes from './loaders/Routes';
import { IRoutes } from './interfaces/route.interface';

const app = express();

const initializeRoutes = (routes: IRoutes[]) => {
  routes.forEach((route) => {
    app.use('/', route.router);
  });
};

initializeRoutes(routes);

app.listen(PORT, () => {
  logger.info(`App started at http://localhost:${PORT}`);

  connectToDb();
});

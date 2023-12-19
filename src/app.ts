import express from 'express';

import loadEnvVariables, { PORT } from './config';
import connectToDb from './utils/db';
import logger from './utils/logger';
import routes from './loaders/Routes';
import { IRoutes } from './interfaces/route.interface';
import deserializeUser from './middlewares/deserializeUser';

const app = express();
app.use(express.json());
app.use(deserializeUser);

const initializeRoutes = (routes: IRoutes[]) => {
  routes.forEach((route) => {
    app.use('/', route.router);
  });
};

initializeRoutes(routes);
loadEnvVariables();

app.listen(PORT, () => {
  logger.info(`App started at http://localhost:${PORT}`);

  connectToDb();
});

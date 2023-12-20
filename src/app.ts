import express, { Request } from 'express';
import onFinished from 'on-finished';
import cors from 'cors';

import loadEnvVariables, { CORS_ORIGIN, PORT } from './config';
import connectToDb from './utils/db';
import logger from './utils/logger';
import routes from './loaders/Routes';
import { IRoutes } from './interfaces/route.interface';
import deserializeUser from './middlewares/deserializeUser';
import { handleRequestComplete, handleRequestStart } from './utils/requests';

// TODO organize by moving middleware initialization to separate file

const app = express();

app.use(cors({ origin: CORS_ORIGIN }));

app.use(express.json());
app.use(deserializeUser);

// request logs
app.use('/*', async (req: Request, res, next) => {
  handleRequestStart(req);
  next();
  onFinished(res, (_err) => {
    handleRequestComplete(req, res);
  });
});

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

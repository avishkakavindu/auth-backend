import express, { Request } from 'express';
import onFinished from 'on-finished';

import loadEnvVariables, { PORT } from './config';
import connectToDb from './utils/db';
import logger from './utils/logger';
import routes from './loaders/Routes';
import { IRoutes } from './interfaces/route.interface';
import deserializeUser from './middlewares/deserializeUser';
import { handleRequestComplete, handleRequestStart } from './utils/requests';

const app = express();
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

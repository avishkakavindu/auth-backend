import { Router } from 'express';
import { IRoutes } from '../interfaces/route.interface';

class IndexRoute implements IRoutes {
  public path = '/';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}health-check`, (req, res) =>
      res.sendStatus(200)
    );
  }
}

export default IndexRoute;

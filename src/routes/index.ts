import { Router } from 'express';
import { IRoutes } from '../interfaces/route.interface';
import IndexController from '../controllers';

class IndexRoute implements IRoutes {
  public path = '/';
  public router = Router();
  public indexController = new IndexController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}health-check`, this.indexController.health);
  }
}

export default IndexRoute;

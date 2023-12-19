import { Router } from 'express';
import { IRoutes } from '../../../interfaces/route.interface';
import { ROUTES } from '../../../constants';

class UserRoute implements IRoutes {
  public path = `/${ROUTES.v1}user`;
  public router = Router();
  // private userController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/`, (req, res) => {
      res.sendStatus(200);
    });
  }
}

export default UserRoute;

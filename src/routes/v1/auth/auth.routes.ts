import { Router } from 'express';
import { IRoutes } from '../../../interfaces/route.interface';

class AuthRoute implements IRoutes {
  public path = `/auth`;
  public router = Router();
  // private authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {}
}

export default AuthRoute;

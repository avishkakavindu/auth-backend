import { Router } from 'express';
import { IRoutes } from '../../../interfaces/route.interface';
import validateResource from '../../../middlewares/validateResource';
import { createSessionSchema } from './validations';
import AuthController from '../../../controllers/v1/auth/auth.controller';
import { ROUTES } from '../../../constants';

class AuthRoute implements IRoutes {
  public path = `/${ROUTES.v1}auth`;
  public router = Router();
  private authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}`,
      validateResource(createSessionSchema),
      this.authController.login
    );
  }
}

export default AuthRoute;

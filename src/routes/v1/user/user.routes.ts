import { Router } from 'express';
import { IRoutes } from '../../../interfaces/route.interface';
import { ROUTES } from '../../../constants';
import validateResource from '../../../middlewares/validateResource';
import { createUserSchema } from './validations';
import UserController from '../../../controllers/v1/user/user.controller';

class UserRoute implements IRoutes {
  public path = `/${ROUTES.v1}users`;
  public router = Router();
  private userController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/`,
      validateResource(createUserSchema),
      this.userController.createUser
    );
  }
}

export default UserRoute;

import { Request, Response } from 'express';
import { TCreateUserInput } from '../../../routes/v1/user/validations';
import UserService from '../../../service/v1/user/user.service';

class UserController {
  private userService = new UserService();

  /**
   * Create a user
   * @route POST
   * @param {Request<{}, {}, TCreateUserInput>} req
   * @param {Response} res
   */
  public createUser = async (
    req: Request<{}, {}, TCreateUserInput>,
    res: Response
  ) => {
    try {
      const { body } = req;
      const data = await this.userService.createUser(body);
      res.status(200).json({ node: data, status: true });
    } catch (error: any) {
      // ! TODO implement a handle error func
      if (error.code === 11000) {
        return res.status(409).send('Account already exists');
      }
      return res.status(500).send(error);
    }
  };

  public getUser = async (req: Request, res: Response) => {
    try {
      const { user } = res.locals;
      const data = await this.userService.getUser(user);
      res.status(200).json({ node: data, status: true });
    } catch (error: any) {
      console.log(error);
      // ! TODO implement a handle error function
      return res.status(500).send(error);
    }
  };
}

export default UserController;

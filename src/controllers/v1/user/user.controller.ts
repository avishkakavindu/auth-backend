import { Response } from 'express';

class UserController {
  // private userService = new UserService();

  /**
   * @route GET
   * @param {Request} req
   * @param {Response} res
   */
  public getUsersList = async (req: Request, res: Response) => {
    try {
      res.sendStatus(200);
    } catch (error) {
      console.log('error');
    }
  };
}

export default UserController;

import { Request, Response } from 'express';
import { TCreateSessionInput } from '../../../routes/v1/auth/validations';
import AuthService from '../../../service/v1/auth/auth.service';

class AuthController {
  private authService = new AuthService();

  /**
   * Login user
   * @route POST
   * @param {Request<{}, {}, TCreateSessionInput>} req
   * @param {Response} res
   */
  public login = async (
    req: Request<{}, {}, TCreateSessionInput>,
    res: Response
  ) => {
    try {
      const { email, password } = req.body;
      const data = await this.authService.login(email, password);
      res.status(200).json({ node: data, status: true });
    } catch (error: any) {
      // ! TODO implement a handle error func
      if (error.code === 11000) {
        return res.status(409).send('Account already exists');
      }
      return res.status(500).send(error);
    }
  };
}

export default AuthController;

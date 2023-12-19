import { RESPONSES } from '../../../constants';
import UserModel, { User } from '../../../db/models/user.model';
import { HttpException } from '../../../exceptions/http';
import { signAccessToken, signRefreshToken } from './utils';

class AuthService {
  /**
   * Login user
   * @returns
   */
  public async login(email: string, password: string) {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new HttpException(
        409,
        RESPONSES.AUTHENTICATION_FAILED,
        'Email or password is invalid'
      );
    }

    const isValid = await user.validatePassword(password);

    if (!isValid) {
      throw new HttpException(
        409,
        RESPONSES.AUTHENTICATION_FAILED,
        'Email or password is invalid'
      );
    }

    // sign access token
    const accessToken = signAccessToken(user);
    // sign refresh token
    const refreshToken = await signRefreshToken({
      userId: user._id.toString(),
    });

    return { accessToken, refreshToken };
  }
}

export default AuthService;

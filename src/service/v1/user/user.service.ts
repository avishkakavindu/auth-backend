import UserModel, { User } from '../../../db/models/user.model';

class UserService {
  /**
   * Register user
   * @returns
   */
  public async createUser(body: Partial<User>) {
    const data = await UserModel.create(body);
    return data;
  }

  /**
   * Get user
   * @returns
   */
  public async getUser(user: any) {
    const data = await UserModel.findOne({ email: user.email });
    return data;
  }
}

export default UserService;

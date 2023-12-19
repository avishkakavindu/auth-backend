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
}

export default UserService;

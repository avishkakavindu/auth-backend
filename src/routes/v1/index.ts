import { IRoutes } from '../../interfaces/route.interface';
import AuthRoute from './auth/auth.routes';
import UserRoute from './user/user.routes';

const routes: IRoutes[] = [new AuthRoute(), new UserRoute()];

export default routes;

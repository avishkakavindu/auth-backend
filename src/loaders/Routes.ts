// Initial Routes
import IndexRoute from '../routes';
// V1 Routes
import v1Routes from '../routes/v1';

const initialRoutes: any[] = [new IndexRoute()];

const routes = [...initialRoutes, ...v1Routes];

export default routes;

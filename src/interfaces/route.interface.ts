import { Router, Request } from 'express';

export interface IRoutes {
  path?: string;
  router: Router;
}

export interface IRequest extends Request {
  user: any;
}

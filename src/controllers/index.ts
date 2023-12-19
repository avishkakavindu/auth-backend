import { NextFunction, Response, Request } from 'express';

class IndexController {
  // public indexService = new IndexService();

  public health = async (
    req: Request,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ) => {
    try {
      res.status(200).json({ status: 'healthy' });
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;

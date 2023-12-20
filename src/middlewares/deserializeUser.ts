import { NextFunction, Request, Response } from 'express';
import { verifyJwt } from '../utils/jwt';

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = (req.headers.authorization || '').replace(
    /^Bearer\s/,
    ''
  );

  if (!accessToken) {
    return next();
  }

  const decoded = verifyJwt(accessToken);

  if (decoded) {
    // TODO create custom Request and add user data to request instead of response
    res.locals.user = decoded;
  }

  return next();
};

export default deserializeUser;

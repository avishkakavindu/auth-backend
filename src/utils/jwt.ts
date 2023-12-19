import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config';

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, SECRET_KEY, {
    ...(options && options),
  });
}

export function verifyJwt<T>(token: string): T | null {
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as T;
    return decoded;
  } catch (error) {
    return null;
  }
}

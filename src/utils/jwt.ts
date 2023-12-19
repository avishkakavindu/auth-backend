import jwt from 'jsonwebtoken';
import {
  ACCESS_TOKEN_PRIVATE_KEY,
  ACCESS_TOKEN_PUBLIC_KEY,
  REFRESH_PRIVATE_KEY,
  REFRESH_PUBLIC_KEY,
} from '../config';

type TSignKeyName = 'accessTokenPrivateKey' | 'refreshTokenPrivateKey';
type TVerifyKeyName = 'accessTokenPublicKey' | 'refreshTokenPublicKey';

export function signJwt(
  object: Object,
  keyName: TSignKeyName,
  options?: jwt.SignOptions | undefined
) {
  let signingKey: string;
  if (keyName === 'accessTokenPrivateKey') {
    signingKey = Buffer.from(ACCESS_TOKEN_PRIVATE_KEY, 'base64').toString(
      'ascii'
    );
  } else {
    signingKey = Buffer.from(REFRESH_PRIVATE_KEY, 'base64').toString('ascii');
  }

  return jwt.sign(object, signingKey, {
    ...(options && options),
    algorithm: 'HS256', // ! FIX ME
  });
}

export function verifyJwt<T>(token: string, keyName: TVerifyKeyName): T | null {
  let publicKey: string;

  if (keyName === 'accessTokenPublicKey') {
    publicKey = Buffer.from(ACCESS_TOKEN_PUBLIC_KEY, 'base64').toString(
      'ascii'
    );
  } else {
    publicKey = Buffer.from(REFRESH_PUBLIC_KEY, 'base64').toString('ascii');
  }

  try {
    const decoded = jwt.verify(token, publicKey) as T;
    return decoded;
  } catch (error) {
    return null;
  }
}

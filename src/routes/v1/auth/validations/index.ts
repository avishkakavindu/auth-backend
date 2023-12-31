import { object, string, TypeOf } from 'zod';

export const createSessionSchema = object({
  body: object({
    email: string({ required_error: 'Email is required' }).email(
      'Not a valid email'
    ),
    password: string({ required_error: 'Password is required' }).min(
      6,
      'Invalid email or password'
    ),
  }),
});

export type TCreateSessionInput = TypeOf<typeof createSessionSchema>['body'];

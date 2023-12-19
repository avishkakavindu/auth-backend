import { object, string, TypeOf } from 'zod';

export const createUserSchema = object({
  body: object({
    username: string({ required_error: 'Username is required' }),
    password: string({ required_error: 'Password is required' }).min(
      6,
      ' Password is too short - minimum should be 6 chars'
    ),
    confirmPassword: string({
      required_error: 'Password confirmation is required',
    }),
    email: string({ required_error: 'Email is required' }).email(
      'Not a valid email'
    ),
  }).refine((data) => data.password === data.confirmPassword, {
    message: 'Password do not match',
  }),
});

export type TCreateUserInput = TypeOf<typeof createUserSchema>['body'];

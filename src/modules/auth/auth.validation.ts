import z from 'zod';

import { capitalize } from '../../helpers/common-helper';

const register = z.object({
  name: z
    .string('Name is required')
    .trim()
    .nonempty('Name can not be empty')
    .transform((v) => capitalize(v)),

  email: z.email('Invalid email'),
  password: z.string('Password is required').nonempty('Password can not be empty'),
});

const login = z.object({
  email: z.email('Invalid email'),
  password: z.string('Password is required').nonempty('Password can not be empty'),
});

const changePassword = z.object({
  oldPassword: z.string('Old password is required').nonempty('Old password can not be empty'),
  newPassword: z.string('New password is required').nonempty('New password can not be empty'),
});

export const authValidation = { register, login, changePassword };

export type TRegisterInput = z.infer<typeof register>;
export type TLoginInput = z.infer<typeof login>;
export type TChangePasswordInput = z.infer<typeof changePassword>;

import { Types } from 'mongoose';

export interface IUser {
  id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: EUserRole;
}

export enum EUserRole {
  admin = 'admin',
  superAdmin = 'super-admin',
  user = 'user',
}

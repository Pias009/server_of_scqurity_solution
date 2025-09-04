import { IUser } from './modules/user/user.interface';

export type TLoggedUser = Pick<IUser, 'id' | 'email' | 'role'>;

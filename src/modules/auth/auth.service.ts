import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { EUserRole, IUser } from '../user/user.interface';
import { UserModel } from '../user/user.model';
import { TChangePasswordInput, TLoginInput, TRegisterInput } from './auth.validation';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, SALT } from '../../app/config';
import { AppError } from '../../common/app-error';
import { TLoggedUser } from '../../types';

export class AuthService {
  static async register(input: TRegisterInput) {
    const isUserExist = await UserModel.findOne({ email: input.email }, { _id: true }).lean();
    if (isUserExist) throw new AppError('User already exists', 409);

    const password = await this.hashPassword(input.password);
    const newUser = await UserModel.create({ ...input, password, role: EUserRole.user });
    return this.mapUser(newUser);
  }

  static async login(input: TLoginInput) {
    const user = await UserModel.findOne({ email: input.email });
    if (!user) throw new AppError('User not found', 404);

    const isPasswordMatched = await this.comparePassword(input.password, user.password);
    if (!isPasswordMatched) throw new AppError('Invalid password', 401);

    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);
    return { user: this.mapUser(user), accessToken, refreshToken };
  }

  static async changePassword(userId: string, input: TChangePasswordInput) {
    const user = await UserModel.findById(userId, { password: true });
    if (!user) throw new AppError('User not found', 404);

    const isPasswordMatched = await this.comparePassword(input.oldPassword, user.password);
    if (!isPasswordMatched) throw new AppError('Invalid password', 401);

    const hashedPassword = await this.hashPassword(input.newPassword);
    await UserModel.findByIdAndUpdate(user.id, { $set: { password: hashedPassword } });

    return 'Password changed successfully';
  }

  static async getAccessToken(refreshToken: string) {
    const decodedToken = this.verifyRefreshToken(refreshToken);
    if (!decodedToken) throw new AppError('Invalid refresh token', 401);

    const user = await UserModel.findById(decodedToken.id);
    if (!user) throw new AppError('User not found', 404);

    return this.generateAccessToken(user);
  }

  // helpers
  static async hashPassword(password: string) {
    return bcrypt.hash(password, SALT);
  }

  static async comparePassword(givenPassword: string, encryptedPassword: string) {
    return bcrypt.compare(givenPassword, encryptedPassword);
  }

  static generateAccessToken(user: IUser) {
    return jwt.sign({ id: user.id, name: user.name, email: user.email, role: user.role }, ACCESS_TOKEN_SECRET!, {
      expiresIn: '100d',
    });
  }

  static generateRefreshToken(user: IUser) {
    return jwt.sign({ id: user.id }, REFRESH_TOKEN_SECRET!, { expiresIn: '30d' });
  }

  static verifyAccessToken(token: string) {
    return jwt.verify(token, ACCESS_TOKEN_SECRET!) as TLoggedUser;
  }

  static verifyRefreshToken(token: string) {
    return jwt.verify(token, REFRESH_TOKEN_SECRET!) as { id: string };
  }

  static mapUser(user: IUser) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
}

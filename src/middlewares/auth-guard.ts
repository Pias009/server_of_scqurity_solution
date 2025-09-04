import { AppError } from '../common/app-error';
import { AuthService } from '../modules/auth/auth.service';
import { EUserRole } from '../modules/user/user.interface';
import { UserModel } from '../modules/user/user.model';
import { catchAsync } from './catch-async';

const BEARER = 'bearer';

export const authGuard = (...requiredRoles: EUserRole[]) => {
  return catchAsync(async (req, _, next) => {
    const accessToken = req.headers.authorization;
    if (!accessToken) throw new AppError('No token found', 404);

    const [bearer, token] = accessToken.split(' ');
    if (BEARER !== bearer.toLowerCase() || !token) throw new AppError('Invalid token formate', 400);

    const decodedUser = AuthService.verifyAccessToken(token);
    if (!decodedUser) throw new AppError('Invalid token', 400);

    const user = await UserModel.findById(decodedUser.id, { _id: true, name: true, role: true, email: true });
    if (!user) throw new AppError('User not found', 404);

    if (requiredRoles.length && !requiredRoles.includes(user.role))
      throw new AppError('You are not authorized to access this route', 403);

    req.user = user;
    next();
  });
};

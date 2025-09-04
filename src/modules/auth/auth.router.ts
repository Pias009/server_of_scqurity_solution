import { Router } from 'express';
import { validationHandler } from '../../middlewares/validation-handler';
import { authValidation } from './auth.validation';
import { authController } from './auth.controller';
import { authGuard } from '../../middlewares/auth-guard';
import { EUserRole } from '../user/user.interface';

export const authRouter = Router();

authRouter.post('/register', validationHandler(authValidation.register), authController.register);
authRouter.post('/login', validationHandler(authValidation.login), authController.login);

authRouter.post(
  '/change-password',
  authGuard(EUserRole.user, EUserRole.admin, EUserRole.superAdmin),
  validationHandler(authValidation.changePassword),
  authController.changePassword,
);

authRouter.get('/access-token', authController.getAccessToken);

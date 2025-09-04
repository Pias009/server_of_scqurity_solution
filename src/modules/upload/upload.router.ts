import { Router } from 'express';
import { authGuard } from '../../middlewares/auth-guard';
import { EUserRole } from '../user/user.interface';
import { uploadController } from './upload.controller';
import { uploadSingleImage } from '../../middlewares/upload';

export const uploadRouter = Router();

uploadRouter.post('/', authGuard(EUserRole.admin, EUserRole.superAdmin), uploadSingleImage, uploadController.upload);

uploadRouter.delete('/delete/:publicId', authGuard(EUserRole.admin, EUserRole.superAdmin), uploadController.deleteFile);

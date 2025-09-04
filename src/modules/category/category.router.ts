import { Router } from 'express';
import { authGuard } from '../../middlewares/auth-guard';
import { EUserRole } from '../user/user.interface';
import { validationHandler } from '../../middlewares/validation-handler';
import { categoryValidation } from './category.validation';
import { categoryController } from './category.controller';

export const categoryRouter = Router();

categoryRouter.post(
  '/',
  authGuard(EUserRole.admin, EUserRole.superAdmin),
  validationHandler(categoryValidation.createCategory),
  categoryController.createCategory,
);

categoryRouter.get('/', authGuard(EUserRole.admin, EUserRole.superAdmin), categoryController.getCategories);

categoryRouter.patch(
  '/:id',
  authGuard(EUserRole.admin, EUserRole.superAdmin),
  validationHandler(categoryValidation.updateCategory),
  categoryController.updateCategory,
);

categoryRouter.delete('/:id', authGuard(EUserRole.admin, EUserRole.superAdmin), categoryController.deleteCategory);

// Sub Category Routes
categoryRouter.post(
  '/sub',
  authGuard(EUserRole.admin, EUserRole.superAdmin),
  validationHandler(categoryValidation.createSubCategory),
  categoryController.createSubCategory,
);

categoryRouter.get('/sub', authGuard(EUserRole.admin, EUserRole.superAdmin), categoryController.getSubCategories);

categoryRouter.patch(
  '/sub/:id',
  authGuard(EUserRole.admin, EUserRole.superAdmin),
  validationHandler(categoryValidation.updateSubCategory),
  categoryController.updateSubCategory,
);

categoryRouter.delete(
  '/sub/:id',
  authGuard(EUserRole.admin, EUserRole.superAdmin),
  categoryController.deleteSubCategory,
);

import { Router } from 'express';
import { authGuard } from '../../middlewares/auth-guard';
import { EUserRole } from '../user/user.interface';
import { validationHandler } from '../../middlewares/validation-handler';
import { productValidation } from './product.validation';
import { productController } from './product.controller';
import { uploadMultipleImages } from '../../middlewares/upload';

export const productRouter = Router();

productRouter.post(
  '/',
  authGuard(EUserRole.admin, EUserRole.superAdmin),
  validationHandler(productValidation.createProduct),
  productController.createProduct,
);

productRouter.get('/', productController.getProducts);
productRouter.get('/:slug', productController.getProductById);

productRouter.patch(
  '/:id',
  authGuard(EUserRole.admin, EUserRole.superAdmin),
  uploadMultipleImages,
  validationHandler(productValidation.updateProduct),
  productController.updateProduct,
);

productRouter.delete('/:id', authGuard(EUserRole.admin, EUserRole.superAdmin), productController.deleteProduct);

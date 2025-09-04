import { Router } from 'express';
import { authRouter } from '../modules/auth/auth.router';
import { productRouter } from '../modules/product/product.router';
import { uploadRouter } from '../modules/upload/upload.router';
import { categoryRouter } from '../modules/category/category.router';

export const appRouter = Router();

interface IRoute {
  path: string;
  router: Router;
}

const routes: IRoute[] = [
  { path: '/auth', router: authRouter },
  { path: '/products', router: productRouter },
  { path: '/upload', router: uploadRouter },
  { path: '/categories', router: categoryRouter },
];

routes.forEach(({ path, router }) => appRouter.use(path, router));

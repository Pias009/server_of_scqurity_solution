import { ZodType } from 'zod';
import { catchAsync } from './catch-async';

export const validationHandler = <TSchema extends ZodType>(schema: TSchema) => {
  return catchAsync(async (req, _, next) => {
    const payload = await schema.parseAsync(req.body);
    req.body = payload;
    next();
  });
};

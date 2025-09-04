import z from 'zod';

import { capitalize, parseJson } from '../../helpers/common-helper';
import { zSlug } from '../../helpers/validation-helper';

const image = z.object({
  url: z.string(),
  publicId: z.string(),
});

const createProduct = z.object({
  name: z
    .string('Name is required')
    .trim()
    .nonempty('Name can not be empty')
    .transform((v) => capitalize(v)),

  slug: zSlug('Slug must be kebab-case (e.g., "my-product-name")'),
  description: z.string('Description is required').trim().optional(),
  productType: z.string().min(1, 'Product type is required'),
  categoryId: z.string().min(1, 'Category is required'),
  subCategoryId: z.string().optional(),
  brand: z.string().min(1, 'Brand is required'),

  costPrice: z.number().min(0, 'Cost price must be >= 0'),
  salePrice: z.number().min(0, 'Sale price must be >= 0'),
  stockQuantity: z.number().int().min(0, 'Stock quantity must be >= 0'),

  attributes: z.record(z.string(), z.any()),
  images: z.array(image).optional().default([]),
});

const updateProduct = createProduct.partial().and(
  z.object({
    removedImageIds: z.preprocess((val) => parseJson(val), z.array(z.string()).optional().default([])),
  }),
);

// query validation

const getProducts = z.object({
  page: z.coerce.number().catch(1),
  limit: z.coerce.number().catch(10),
  search: z.string().optional(),
  category: z.string().optional(),
  brand: z.string().optional(),
  maxPrice: z.coerce.number().optional(),
  minPrice: z.coerce.number().optional(),
});

export const productValidation = { createProduct, updateProduct, getProducts };

export type TCreateProductInput = z.infer<typeof createProduct>;
export type TUpdateProductInput = z.infer<typeof updateProduct>;

export type TGetProductsInput = z.infer<typeof getProducts>;

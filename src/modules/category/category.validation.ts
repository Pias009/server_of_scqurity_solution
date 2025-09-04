import z from 'zod';
import { zSlug } from '../../helpers/validation-helper';

const createCategory = z.object({
  name: z.string('Category name is required').trim().nonempty('Category name can not be empty'),
  slug: zSlug('Slug must be kebab-case (e.g., "my-category-name")'),
});

const createSubCategory = z.object({
  name: z.string('Sub category name is required').trim().nonempty('Sub category name can not be empty'),
  slug: zSlug('Slug must be kebab-case (e.g., "my-sub-category-name")'),
  parentId: z.string('Parent category id is required'),
});

const updateCategory = createCategory.partial();
const updateSubCategory = createSubCategory.pick({ name: true, slug: true });

export const categoryValidation = { createCategory, updateCategory, createSubCategory, updateSubCategory };

export type TCreateCategoryInput = z.infer<typeof createCategory>;
export type TUpdateCategoryInput = z.infer<typeof updateCategory>;
export type TCreateSubCategoryInput = z.infer<typeof createSubCategory>;
export type TUpdateSubCategoryInput = z.infer<typeof updateSubCategory>;

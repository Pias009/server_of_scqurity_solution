import {
  TCreateCategoryInput,
  TCreateSubCategoryInput,
  TUpdateCategoryInput,
  TUpdateSubCategoryInput,
} from './category.validation';

import { AppError } from '../../common/app-error';
import { CategoryModel } from './category.model';
import { Types } from 'mongoose';

export class CategoryService {
  static async createCategory(input: TCreateCategoryInput) {
    const isCategoryExist = await CategoryModel.findOne({ slug: input.slug });
    if (isCategoryExist) throw new AppError('Category already exist', 409);

    return CategoryModel.create(input);
  }

  static async getCategories() {
    const categories = await CategoryModel.find({ parentId: null });
    return categories;
  }

  static async updateCategory(id: string, input: TUpdateCategoryInput) {
    const category = await CategoryModel.findOne({ _id: id });
    if (!category) throw new AppError('Category not found', 404);

    if (input.slug && category.slug !== input.slug) {
      const isCategoryExist = await CategoryModel.findOne({ slug: input.slug });
      if (isCategoryExist) throw new AppError('Category already exist', 409);
    }

    return CategoryModel.findOneAndUpdate({ _id: id }, { $set: input }, { new: true, runValidators: true });
  }

  static async deleteCategory(id: string) {
    return CategoryModel.findOneAndDelete({ _id: id });
  }

  static async createSubCategory(input: TCreateSubCategoryInput) {
    const [isSubCategoryExist, parentCategory] = await Promise.all([
      CategoryModel.findOne({ slug: input.slug }),
      CategoryModel.findOne({ _id: input.parentId }),
    ]);

    if (isSubCategoryExist) throw new AppError('Sub category already exist', 409);
    if (!parentCategory) throw new AppError('Parent category not found', 404);

    return CategoryModel.create({ ...input, parentId: parentCategory.id });
  }

  static async getSubCategories(parentId?: string) {
    const subCategories = await CategoryModel.aggregate([
      { $match: { ...(parentId ? { parentId: new Types.ObjectId(parentId) } : { parentId: { $ne: null } }) } },
      { $lookup: { from: 'categories', localField: 'parentId', foreignField: '_id', as: 'category' } },
      { $unwind: '$category' },
      {
        $project: {
          id: '$_id',
          name: 1,
          slug: 1,
          category: { id: '$category._id', name: '$category.name' },
        },
      },
    ]);

    return subCategories;
  }

  static async updateSubCategory(id: string, input: TUpdateSubCategoryInput) {
    const subCategory = await CategoryModel.findOne({ _id: id });
    if (!subCategory) throw new AppError('Sub category not found', 404);

    if (input.slug && subCategory.slug !== input.slug) {
      const isSubCategoryExist = await CategoryModel.findOne({ slug: input.slug });
      if (isSubCategoryExist) throw new AppError('Sub category already exist', 409);
    }

    return CategoryModel.findOneAndUpdate({ _id: id }, { $set: input }, { new: true, runValidators: true });
  }

  static async deleteSubCategory(id: string) {
    return CategoryModel.findOneAndDelete({ _id: id });
  }
}

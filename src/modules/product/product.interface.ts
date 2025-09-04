import { Types } from 'mongoose';

export interface IProduct {
  id: Types.ObjectId;
  name: string;
  description?: string;
  slug: string;
  productType: string;
  categoryId: Types.ObjectId;
  subCategoryId?: Types.ObjectId;
  brand: string;
  costPrice: number;
  salePrice: number;
  stockQuantity: number;
  images: Array<IProductImage>;
  attributes?: Record<string, any>;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProductImage {
  url: string;
  publicId: string;
}

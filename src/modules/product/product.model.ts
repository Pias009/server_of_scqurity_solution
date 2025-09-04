import { model, Schema } from 'mongoose';
import { IProduct, IProductImage } from './product.interface';
import { transformJson } from '../../common/transform-json';

const productImageSchema = new Schema<IProductImage>(
  {
    url: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
  },

  { _id: false },
);

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    productType: {
      type: String,
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'category',
    },
    subCategoryId: {
      type: Schema.Types.ObjectId,
      ref: 'category',
      default: null,
    },
    brand: {
      type: String,
      required: true,
    },
    costPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    salePrice: {
      type: Number,
      required: true,
      min: 0,
    },
    stockQuantity: {
      type: Number,
      required: true,
      min: 0,
    },
    images: {
      type: [productImageSchema],
      default: [],
    },

    // dynamic object fields only (Record<string, any>)
    attributes: { type: Schema.Types.Mixed, default: {} },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, toJSON: { transform: transformJson } },
);

export const ProductModel = model('product', productSchema);

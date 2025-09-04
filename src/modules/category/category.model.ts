import { model, Schema } from 'mongoose';
import { ICategory } from './category.interface';
import { transformJson } from '../../common/transform-json';

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    parentId: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: 'category',
      default: null,
    },
  },

  { timestamps: true, toJSON: { transform: transformJson } },
);

export const CategoryModel = model('category', categorySchema);

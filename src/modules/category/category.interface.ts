import { Types } from 'mongoose';

export interface ICategory {
  id: Types.ObjectId;
  name: string;
  slug: string;
  parentId?: Types.ObjectId;
}

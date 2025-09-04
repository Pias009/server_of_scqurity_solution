import { model, Schema } from 'mongoose';
import { EUserRole, IUser } from './user.interface';
import { transformJson } from '../../common/transform-json';

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(EUserRole),
      required: true,
    },
  },

  { timestamps: true, toJSON: { transform: transformJson } },
);

export const UserModel = model('user', userSchema);

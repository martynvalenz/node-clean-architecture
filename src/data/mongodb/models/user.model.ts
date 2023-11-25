import {Schema, model} from 'mongoose';
import { UserEntity } from '../../../domain/entity/user.entity';

const userSchema = new Schema(
  {
    name: {type: String, required: true},
    email: {type: String, required: true, unique:true},
    password: {type: String, required: true},
    img: {type: String, default:''},
    roles: {type: [String], default:['USER_ROLE'], enum:['USER_ROLE','ADMIN_ROLE']},
  },
  {
    timestamps: true,
  }
);

userSchema.methods.toJSON = function () {
  const { __v, _id, password,...data } = this.toObject();
  data.id = _id;
  return data;
};

export const UserModel = model<UserEntity>('User', userSchema, 'users');
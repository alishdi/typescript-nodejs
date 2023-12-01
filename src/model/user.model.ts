import { Schema, model } from 'mongoose';
import { IUser } from '../types/user.types';

const UserSchema = new Schema<IUser>({
    fullname: { type: String, required: true, trim: true, loadClass: true },
    username: { type: String, required: true, trim: true, lowercase: true,unique:true },
    password: { type: String, required: true },
    token: { type: String},
    email: { type: String},
    mobile: { type: String },
    avatar: { type: String },
})

const UserModel = model<IUser>('user', UserSchema)

export default UserModel
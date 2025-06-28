import mongoose, { Document, Schema } from 'mongoose'
import { PublicImage } from 'tukibook-helper'

export interface IUser extends Document {
  username: string
  email: string
  password: string
  avatar?: PublicImage
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { url: { type: String, default: '' }, publicId: { type: String, default: '' } },
  },
  { timestamps: true }
).set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id
    delete ret.password
    return ret
  },
})

export const User = mongoose.model<IUser>('User', UserSchema)

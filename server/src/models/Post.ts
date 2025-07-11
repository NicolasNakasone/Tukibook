import mongoose, { Document, Schema, Types } from 'mongoose'
import { IComment } from 'src/models/Comment'
import { IUser } from 'src/models/User'
import { PublicImage } from 'tukibook-helper'

export interface IPost extends Document {
  user: IUser['_id']
  content: string
  likes: Types.ObjectId[]
  comments: IComment[]
  image?: PublicImage
  createdAt: Date
  updatedAt: Date
}

const PostSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    image: { url: { type: String, default: '' }, publicId: { type: String, default: '' } },
  },
  { timestamps: true }
)
  .set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (_, ret) => {
      ret.id = ret._id
      delete ret._id
      return ret
    },
  })
  .pre('find', function () {
    // TODO: Quitar estos populate una vez se termine el refactor de comentarios
    this.populate({
      path: 'comments',
      populate: { path: 'user', select: 'username id email avatar' },
      options: { sort: { createdAt: -1 } }, // Ordena los comentarios por fecha de creación en orden descendente
    })
    this.populate({ path: 'user', select: 'username id email avatar' })
  })
  .pre('findOne', function () {
    // TODO: Quitar estos populate una vez se termine el refactor de comentarios
    this.populate({
      path: 'comments',
      populate: { path: 'user', select: 'username id email avatar' },
      options: { sort: { createdAt: -1 } }, // Ordena los comentarios por fecha de creación en orden descendente
    })
    this.populate({ path: 'user', select: 'username id email avatar' })
  })

export const Post = mongoose.model<IPost>('Post', PostSchema)

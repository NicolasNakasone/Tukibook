import mongoose, { Document, Schema } from 'mongoose'
import { IComment } from 'src/models/Comment'
import { IUser } from 'src/models/User'

export interface IPost extends Document {
  user: IUser['_id']
  content: string
  likes: number
  comments: IComment[]
  createdAt: Date
  updatedAt: Date
}

const PostSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    likes: { type: Number, default: 0 },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  },
  { timestamps: true }
)
  .set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id
      delete returnedObject._id
      delete returnedObject.__v
      if (
        returnedObject.user &&
        typeof returnedObject.user === 'object' &&
        '_id' in returnedObject.user
      ) {
        returnedObject.user.id = returnedObject.user._id
        delete returnedObject.user._id
      }
    },
  })
  .pre('find', function () {
    this.populate({
      path: 'comments',
      options: { sort: { createdAt: -1 } }, // Ordena los comentarios por fecha de creación en orden descendente
    })
  })
  .pre('findOne', function () {
    this.populate({
      path: 'comments',
      options: { sort: { createdAt: -1 } }, // Ordena los comentarios por fecha de creación en orden descendente
    })
  })

export const Post = mongoose.model<IPost>('Post', PostSchema)

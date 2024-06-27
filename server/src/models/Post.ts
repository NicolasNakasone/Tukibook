import mongoose, { Document, Schema } from 'mongoose'
import { IComment } from 'src/models/Comment'

export interface IPost extends Document {
  username: string
  content: string
  likes: number
  comments: IComment[]
  createdAt: Date
  updatedAt: Date
}

const PostSchema: Schema = new Schema(
  {
    username: { type: String, required: true },
    content: { type: String, required: true },
    likes: { type: Number, default: 0 },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  },
  { timestamps: true }
)

export const Post = mongoose.model<IPost>('Post', PostSchema)

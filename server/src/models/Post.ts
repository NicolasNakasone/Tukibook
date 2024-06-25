import mongoose, { Document, Schema } from 'mongoose'

export interface IPost extends Document {
  username: string
  content: string
  likes: number
  comments: number
}

const PostSchema: Schema = new Schema({
  username: { type: String, required: true },
  content: { type: String, required: true },
  likes: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
})

export const Post = mongoose.model<IPost>('Post', PostSchema)

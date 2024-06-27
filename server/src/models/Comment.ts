import mongoose, { Document, Schema } from 'mongoose'

export interface IComment extends Document {
  postId: mongoose.Types.ObjectId
  username: string
  content: string
  createdAt: Date
  updatedAt: Date
}

const CommentSchema = new Schema<IComment>(
  {
    postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    username: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
)

export const Comment = mongoose.model<IComment>('Comment', CommentSchema)

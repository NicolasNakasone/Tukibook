import mongoose, { Document, Schema } from 'mongoose'

export interface IComment extends Document {
  postId: mongoose.Types.ObjectId
  user: mongoose.Types.ObjectId
  content: string
  parentCommentId?: mongoose.Types.ObjectId | null
  createdAt: Date
  updatedAt: Date
}

const CommentSchema = new Schema<IComment>(
  {
    postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    parentCommentId: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
      default: null,
    },
  },
  { timestamps: true }
).set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.postId
    return ret
  },
})

export const Comment = mongoose.model<IComment>('Comment', CommentSchema)

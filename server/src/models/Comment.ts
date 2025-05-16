import mongoose, { Document, Schema, Types } from 'mongoose'

export interface IComment extends Document {
  postId: mongoose.Types.ObjectId
  user: mongoose.Types.ObjectId
  content: string
  parentCommentId?: mongoose.Types.ObjectId | null
  likes: Types.ObjectId[]
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
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
).set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.postId

    if (ret.user && ret.user._id) {
      ret.user.id = ret.user._id
    }
    return ret
  },
})

export const Comment = mongoose.model<IComment>('Comment', CommentSchema)

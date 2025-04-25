import mongoose, { Document, Schema } from 'mongoose'

export interface IComment extends Document {
  postId: mongoose.Types.ObjectId
  username: string
  content: string
  parentCommentId?: mongoose.Types.ObjectId | null
  createdAt: Date
  updatedAt: Date
}

const CommentSchema = new Schema<IComment>(
  {
    postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    username: { type: String, required: true },
    content: { type: String, required: true },
    parentCommentId: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
      default: null,
    },
  },
  { timestamps: true }
).set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  },
})

export const Comment = mongoose.model<IComment>('Comment', CommentSchema)

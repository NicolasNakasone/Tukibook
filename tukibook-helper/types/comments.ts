import { UserPayload } from './users'

export interface CommentInput {
  postId: string
  content: string
  parentCommentId: string | null
}

export interface Comment extends CommentInput {
  id: string
  user: UserPayload
  createdAt: Date
  updatedAt: Date
}

export interface UpdateCommentInput extends Partial<CommentInput> {
  id: string
}

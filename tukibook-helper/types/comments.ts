export interface CommentInput {
  postId: string
  username: string
  content: string
}

export interface Comment extends CommentInput {
  id: string
  parentCommentId: string | null
  createdAt: Date
  updatedAt: Date
}

export interface UpdateCommentInput extends Partial<CommentInput> {
  id: string
}

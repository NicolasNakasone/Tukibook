export interface CommentInput {
  postId: string
  username: string
  content: string
}

export interface Comment extends CommentInput {
  id: string
  createdAt: Date
  updatedAt: Date
}

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

export interface PostInput {
  username: string
  content: string
}

export interface Post extends PostInput {
  id: string
  likes: number
  comments: Comment[]
  createdAt: Date
  updatedAt: Date
}

export type PostList = Post[]

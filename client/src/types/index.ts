export interface Comment {
  id: string
  postId: string
  username: string
  content: string
  createdAt: Date
  updatedAt: Date
}

export interface CommentInput {
  postId: string
  username: string
  content: string
}

export interface Post {
  id: string
  username: string
  content: string
  likes: number
  comments: Comment[]
  createdAt: Date
  updatedAt: Date
}

export interface PostInput {
  username: string
  content: string
}

export type PostList = Post[]

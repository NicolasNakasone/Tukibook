import { Comment } from './comments'

export interface PostInput {
  username: string
  content: string
}

export interface UpdatePostInput extends Partial<PostInput> {
  id: string
}

export interface Post extends PostInput {
  id: string
  likes: number
  comments: Comment[]
  createdAt: Date
  updatedAt: Date
}

export type PostList = Post[]

export interface GetPostsResponse {
  posts: PostList
  totalItems: number
}

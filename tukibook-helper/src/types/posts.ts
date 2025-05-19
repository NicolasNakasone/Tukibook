import { Comment } from './comments'
import { UserPayload } from './users'

export interface PostInput {
  content: string
}

export interface UpdatePostInput extends Partial<PostInput> {
  id: string
}

export interface Post extends PostInput {
  id: string
  user: UserPayload
  likes: string[]
  comments: Comment[]
  image: string
  createdAt: Date
  updatedAt: Date
}

export type PostList = Post[]

export interface GetPostsResponse {
  posts: PostList
  totalItems: number
}

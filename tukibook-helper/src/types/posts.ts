import { Comment } from './comments'
import { ApiResponse, GetPage } from './common'
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
  image: {
    url: string
    publicId: string
  }
  createdAt: Date
  updatedAt: Date
}

export type PostList = Post[]

export interface GetPostsParams extends GetPage {
  filters?: {
    user?: string
    // [key: string]: string | undefined
  }
}

export interface GetPostsResponse {
  posts: PostList
  totalItems: number
}

export type PostResponse = ApiResponse<Post>

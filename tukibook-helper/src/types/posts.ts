import { ApiResponse, GetPage, PublicImage, SortType } from './common'
import { User } from './users'

export interface PostInput {
  content: string
}

export interface UpdatePostInput extends Partial<PostInput> {
  id: string
}

export interface Post extends PostInput {
  id: string
  user: User
  likes: string[]
  image?: PublicImage
  createdAt: Date
  updatedAt: Date
}

export type PostList = Post[]

export interface GetPostsParams extends GetPage {
  filters?: {
    user?: string
    sort?: SortType
    // [key: string]: string | undefined
  }
}

export interface GetPostsResponse {
  posts: PostList
  totalItems: number
}

export type PostResponse = ApiResponse<Post>

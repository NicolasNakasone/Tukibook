import { ApiResponse, GetPage } from './common'
import { Post } from './posts'
import { User } from './users'

export interface CommentInput {
  postId: string
  content: string
  parentCommentId: string | null
}

export interface Comment extends CommentInput {
  id: string
  user: User
  likes: string[]
  createdAt: Date
  updatedAt: Date
}

export type CommentList = Comment[]

export interface GetCommentsParams extends GetPage {
  postId: string
  filters?: {
    user?: string
    // [key: string]: string | undefined
  }
}

export interface GetCommentsResponse {
  comments: CommentList
  totalItems: number
}

export interface CommentResponseProps {
  postId: Post['id']
  comment: Comment
}

export type CommentResponse = ApiResponse<CommentResponseProps>

export interface UpdateCommentInput extends Partial<CommentInput> {
  id: string
}

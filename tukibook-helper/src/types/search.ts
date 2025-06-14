import { GetPage } from './common'
import { PostList } from './posts'
import { UserList } from './users'

export type SearchType = 'all' | 'posts' | 'users'

export interface SearchAllParams extends GetPage {
  type: SearchType
  query: string
}

export interface SearchResults {
  users?: UserList
  posts?: PostList
}

export type SearchAllResponse = SearchResults & { totalItems: number }

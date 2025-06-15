import { GetPage } from './common'
import { PostList } from './posts'
import { UserList } from './users'

export enum SearchType {
  ALL = 'all',
  POSTS = 'posts',
  USERS = 'users',
}

export type FilterableSearchType = Exclude<SearchType, SearchType.ALL>

export interface SearchAllParams extends GetPage {
  type: SearchType
  query: string
}

export interface SearchResults {
  users?: UserList
  posts?: PostList
}

export type SearchAllResponse = SearchResults & { totalItems: number }

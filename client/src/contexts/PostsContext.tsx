import { Dispatch, createContext } from 'react'

import { ReducerActions } from 'src/reducers/posts.reducer'
import { PostList } from 'src/types'

interface Action {
  type: ReducerActions
  payload?: any
}

interface PostsContextProps {
  state: { posts: PostList }
  dispatch: Dispatch<Action>
}

export const PostsContext = createContext<PostsContextProps>({
  state: { posts: [] },
  dispatch: () => null,
})

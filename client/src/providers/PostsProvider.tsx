import { useReducer } from 'react'

import { PostsContext } from 'src/contexts/PostsContext'
import { postsReducer, initialState } from 'src/reducers/posts.reducer'

export const PostsProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [state, dispatch] = useReducer(postsReducer, initialState)

  return <PostsContext.Provider value={{ state, dispatch }}>{children}</PostsContext.Provider>
}

import { PostList } from 'src/types'

interface State {
  posts: PostList
}

type ReducerActions = 'SET_POSTS' | 'ADD_POST' | 'DELETE_POST' | 'LIKE_POST' | 'COMMENT_POST'

interface Action {
  type: ReducerActions
  payload?: any
}

export const initialState: State = {
  posts: [],
}

export const postsReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_POSTS':
      return { ...state, posts: action.payload }
    case 'ADD_POST':
      return { ...state, posts: [action.payload, ...state.posts] }
    case 'DELETE_POST':
      return { ...state, posts: [...state.posts].filter(post => post.id !== action.payload) }
    case 'LIKE_POST':
      return {
        ...state,
        posts: [...state.posts].map(post =>
          post.id === action.payload ? { ...post, likes: post.likes + 1 } : post
        ),
      }
    case 'COMMENT_POST':
      return {
        ...state,
        posts: [...state.posts].map(post => {
          const updatedComments = structuredClone(post.comments)
          updatedComments.unshift(action.payload.newComment)

          if (post.id === action.payload.postId) {
            const updatedComments = structuredClone(post.comments)
            updatedComments.unshift(action.payload.newComment)

            return {
              ...post,
              comments: updatedComments,
            }
          }
          return post
        }),
      }

    default:
      return state
  }
}

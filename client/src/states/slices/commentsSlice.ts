import { createSlice } from '@reduxjs/toolkit'
import { handleFetch } from 'src/constants/api'
import { Comment } from 'tukibook-helper'

/* 
  Si vas a mostrar algo como Mas comentarios (x) o algo asi,
  el calculo creo que seria:
  const remainingComments = totalItems - (PAGE_LIMIT * page)
  ej: remainingComments = 7 - (2 * 2) -> 3
*/

export interface CommentsState {
  commentsByPostId: {
    [postId: string]: {
      error: string | null
      comments: Comment[]
      totalItems: number
      isLoading: boolean
      hasMore: boolean
      page: number
    }
  }
}

const initialState: CommentsState = {
  commentsByPostId: {},
}

type CommentPayload = Awaited<ReturnType<typeof handleFetch<Comment>>>

interface CommentAction {
  payload: CommentPayload
  type: string
}

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    resetState: () => initialState,
    setPartialState: (state, { payload }: { payload: Partial<CommentsState> }) => {
      return { ...state, ...payload }
    },
  },
  extraReducers: builder => {
    const isCommentRelatedAction = (action: any): action is CommentAction => {
      const typedAction: CommentAction = action
      return (
        typedAction.type.endsWith('/fulfilled') &&
        !!typedAction.payload?.data?.id &&
        !typedAction.payload?.error
      )
    }

    builder.addMatcher(isCommentRelatedAction, (state, action) => {
      if (action.payload.error) return

      // No se si seria necesario algo como esto

      // const updatedPost = action.payload.data

      // Actualizar detalle si aplica
      // if (state.postDetail?.id === updatedPost.id) {
      //   state.postDetail = updatedPost
      // }

      // Actualizar post en lista si existe
      // const index = state.posts.findIndex(post => post.id === updatedPost.id)
      // if (index === -1) return

      // state.posts[index] = updatedPost
    })
  },
})

export const commentsReducer = commentsSlice.reducer

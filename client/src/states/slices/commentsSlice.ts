import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { handleFetch } from 'src/constants/api'
import { routes } from 'src/constants/routes'
import { CommentsActionTypes } from 'src/types/reducer'
import {
  Comment,
  CommentInput,
  CommentResponse,
  GetCommentsParams,
  GetCommentsResponse,
  PAGE_LIMIT,
  UpdateCommentInput,
} from 'tukibook-helper'

/* 
  Si vas a mostrar algo como Mas comentarios (x) o algo asi,
  el calculo creo que seria:
  const remainingComments = totalItems - (PAGE_LIMIT * page)
  ej: remainingComments = 7 - (2 * 2) -> 3
*/

const { VITE_API_URL } = import.meta.env

export const getCommentsByPostId = createAsyncThunk(
  CommentsActionTypes.GET_COMMENTS,
  async ({ postId, page }: GetCommentsParams) =>
    await handleFetch<GetCommentsResponse>(
      `${VITE_API_URL}${routes.getComments.replace(':postId', postId)}?page=${page}&limit=${PAGE_LIMIT}`,
      { method: 'GET' }
      // filters,
      // true
    )
)

export const addComment = createAsyncThunk(
  CommentsActionTypes.ADD_COMMENT,
  async (newComment: CommentInput) =>
    await handleFetch<CommentResponse>(`${VITE_API_URL}${routes.comments}`, {
      method: 'POST',
      body: JSON.stringify(newComment),
    })
)

export const editComment = createAsyncThunk(
  CommentsActionTypes.EDIT_COMMENT,
  async ({ id, ...newComment }: UpdateCommentInput) =>
    await handleFetch<CommentResponse>(`${VITE_API_URL}${routes.comments}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(newComment),
    })
)

export const deleteComment = createAsyncThunk(
  CommentsActionTypes.DELETE_COMMENT,
  async (commentId: Comment['id']) =>
    await handleFetch<CommentResponse>(`${VITE_API_URL}${routes.comments}/${commentId}`, {
      method: 'DELETE',
    })
)

export const likeComment = createAsyncThunk(
  CommentsActionTypes.LIKE_COMMENT,
  async (commentId: Comment['id']) =>
    await handleFetch<CommentResponse>(`${VITE_API_URL}${routes.comments}/${commentId}/like`, {
      method: 'PATCH',
    })
)

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

type CommentPayload = Awaited<ReturnType<typeof handleFetch<CommentResponse>>>

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
        !!typedAction.payload?.data?.postId &&
        !typedAction.payload?.error
      )
    }

    builder
      .addCase(getCommentsByPostId.pending, (state, action) => {
        const { postId } = action.meta.arg

        if (!state.commentsByPostId[postId]) {
          state.commentsByPostId[postId] = {
            error: null,
            comments: [],
            totalItems: 0,
            isLoading: true,
            hasMore: true,
            page: 1,
          }
          return
        }
        state.commentsByPostId[postId].isLoading = true
        state.commentsByPostId[postId].error = null
      })
      .addCase(getCommentsByPostId.rejected, (state, action) => {
        const { postId } = action.meta.arg
        const commentState = state.commentsByPostId[postId]
        if (!commentState) return

        commentState.isLoading = false
        commentState.error = action.error.message || 'Error al obtener comentarios'
      })
      .addCase(getCommentsByPostId.fulfilled, (state, action) => {
        const { postId } = action.meta.arg
        const { data, error } = action.payload

        const commentState = state.commentsByPostId[postId]

        if (error) {
          commentState.error = error.message
          commentState.isLoading = false
          return
        }

        const newComments = data.comments.filter(
          c => !commentState.comments.some(existing => existing.id === c.id)
        )

        commentState.page += 1
        commentState.isLoading = false
        commentState.totalItems = data.totalItems
        commentState.comments = [...commentState.comments, ...newComments]
        commentState.hasMore = commentState.comments.length < data.totalItems
      })
      .addCase(addComment.fulfilled, () => {})
      .addCase(editComment.fulfilled, () => {})
      .addCase(deleteComment.fulfilled, () => {})
      .addCase(likeComment.fulfilled, () => {})
      .addMatcher(isCommentRelatedAction, (state, action) => {
        if (action.payload.error) return

        const { postId, comment: updatedComment } = action.payload.data

        const commentState = state.commentsByPostId[postId]

        const index = commentState.comments.findIndex(comment => comment.id === updatedComment.id)
        if (index === -1) return

        commentState.comments[index] = updatedComment
      })
  },
})

export const commentsReducer = commentsSlice.reducer

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { handleFetch } from 'src/constants/api'
import { routes } from 'src/constants/routes'
import { PostsActionTypes } from 'src/types/reducer'
import {
  PostList,
  Post,
  CommentInput,
  Comment,
  GetPostsResponse,
  UpdatePostInput,
  UpdateCommentInput,
  GetPostsParams,
  PAGE_LIMIT,
} from 'tukibook-helper'

const { VITE_API_URL } = import.meta.env

export const fetchPosts = createAsyncThunk(
  PostsActionTypes.GET_POSTS,
  async ({ page, filters }: GetPostsParams) =>
    await handleFetch<GetPostsResponse>(
      `${VITE_API_URL}${routes.posts}?page=${page}&limit=${PAGE_LIMIT}`,
      { method: 'GET' },
      filters,
      true
    )
)

export const fetchPostById = createAsyncThunk(
  PostsActionTypes.GET_POST_DETAIL,
  async (postId: Post['id']) =>
    await handleFetch<Post>(`${VITE_API_URL}${routes.posts}/${postId}`, {
      method: 'GET',
    })
)

export const addPost = createAsyncThunk(
  PostsActionTypes.ADD_POST,
  async (newPost: FormData) =>
    await handleFetch<Post>(`${VITE_API_URL}${routes.posts}`, {
      method: 'POST',
      body: newPost,
    })
)

export const editPost = createAsyncThunk(
  PostsActionTypes.EDIT_POST,
  async ({ id, ...newPost }: UpdatePostInput) =>
    await handleFetch<Post>(`${VITE_API_URL}${routes.posts}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(newPost),
    })
)

export const deletePost = createAsyncThunk(
  PostsActionTypes.DELETE_POST,
  async (postId: Post['id']) =>
    await handleFetch<Post>(`${VITE_API_URL}${routes.posts}/${postId}`, {
      method: 'DELETE',
    })
)

export const likePost = createAsyncThunk(
  PostsActionTypes.LIKE_POST,
  async (postId: Post['id']) =>
    await handleFetch<Post>(`${VITE_API_URL}${routes.posts}/${postId}/like`, {
      method: 'PATCH',
    })
)

export const commentPost = createAsyncThunk(
  PostsActionTypes.COMMENT_POST,
  async (newComment: CommentInput) =>
    await handleFetch<Post>(`${VITE_API_URL}${routes.comments}`, {
      method: 'POST',
      body: JSON.stringify(newComment),
    })
)

export const editComment = createAsyncThunk(
  PostsActionTypes.EDIT_COMMENT,
  async ({ id, ...newComment }: UpdateCommentInput) =>
    await handleFetch<Post>(`${VITE_API_URL}${routes.comments}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(newComment),
    })
)

export const deleteComment = createAsyncThunk(
  PostsActionTypes.DELETE_COMMENT,
  async (commentId: Comment['id']) =>
    await handleFetch<Post>(`${VITE_API_URL}${routes.comments}/${commentId}`, {
      method: 'DELETE',
    })
)

export const likeComment = createAsyncThunk(
  PostsActionTypes.LIKE_COMMENT,
  async (commentId: Comment['id']) =>
    await handleFetch<Post>(`${VITE_API_URL}${routes.comments}/${commentId}/like`, {
      method: 'PATCH',
    })
)

export interface PostsState {
  posts: PostList
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  page: number
  hasMore: boolean
  postDetail: Post | null
  filters: GetPostsParams['filters']
  totalItems: number
  currentPage: '' | '/' | '/profile'
}

const initialState: PostsState = {
  posts: [],
  postDetail: null,
  status: 'idle',
  error: null,
  page: 1,
  hasMore: false,
  filters: {},
  totalItems: 0,
  currentPage: '',
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    resetState: () => initialState,
    setFilters: (state, { payload }: { payload: GetPostsParams['filters'] }) => {
      state.filters = payload
    },
    setPartialState: (state, { payload }: { payload: Partial<PostsState> }) => {
      return {
        ...state,
        ...payload,
      }
    },
  },
  extraReducers: builder => {
    const isPostRelatedAction = (action: any): action is { payload: Post; type: string } => {
      return action.type.endsWith('/fulfilled') && action.payload?.id
    }

    builder
      .addCase(fetchPosts.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Error al obtener posts'
      })
      .addCase(fetchPosts.fulfilled, (state, { payload: { data, error } }) => {
        if (error) {
          state.status = 'failed'
          state.error = error.message
          return
        }
        state.status = 'succeeded'

        const newPosts = data.posts.filter(
          post => !state.posts.some(existing => existing.id === post.id)
        )

        // Por si la request esta mal armada, asi se evitan requests infinitas
        if (newPosts.length === 0) {
          state.hasMore = false
          return
        }

        state.totalItems = data.totalItems
        state.posts = [...state.posts, ...newPosts]
        state.page += 1
        state.hasMore = data.totalItems > state.posts.length
      })
      .addCase(fetchPostById.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Error al obtener el post'
      })
      .addCase(fetchPostById.fulfilled, (state, { payload }) => {
        state.status = 'succeeded'
        if (payload.data) state.postDetail = payload.data
      })
      .addCase(addPost.fulfilled, (state, { payload: { data } }) => {
        /* TODO: Optimizar busqueda innecesaria la primera vez,
          ya que la primera vez es logico que tenga que agregar
          el post. Ver como hacer para saber 
          cuando es la "primera vez"
        */
        const exists = state.posts.some(post => post.id === data?.id)
        if (!exists && !!data) {
          state.posts.unshift(data)
        }
      })
      .addCase(deletePost.fulfilled, (state, { payload: { data } }) => {
        if (data) state.posts = state.posts.filter(post => post.id !== data.id)
      })
      .addCase(likePost.fulfilled, (state, { payload: { data } }) => {
        const post = state.posts.find(post => post.id === data?.id)
        if (!post) return

        post.likes = data?.likes || []
      })
      .addCase(editPost.fulfilled, (state, { payload: { data } }) => {
        const index = state.posts.findIndex(post => post.id === data?.id)
        if (index === -1) return

        state.posts[index] = {
          ...state.posts[index],
          content: data?.content || '',
          updatedAt: data?.updatedAt || new Date(),
          /* Tambien se puede directamente ...data, 
            en lugar de propiedad por propiedad 
          */
        }
      })
      .addCase(commentPost.fulfilled, () => {})
      .addCase(editComment.fulfilled, () => {})
      .addCase(deleteComment.fulfilled, () => {})
      .addCase(likeComment.fulfilled, () => {})
      .addMatcher(isPostRelatedAction, (state, action) => {
        const updatedPost = action.payload

        // Actualizar detalle si aplica
        if (state.postDetail?.id === updatedPost.id) {
          state.postDetail = updatedPost
        }

        // Actualizar post en lista si existe
        const index = state.posts.findIndex(post => post.id === updatedPost.id)
        if (index !== -1) {
          state.posts[index] = updatedPost
        }
      })
  },
})

export const postsReducer = postsSlice.reducer

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { handleFetch } from 'src/constants/api'
import { routes } from 'src/constants/routes'
import { PostsActionTypes } from 'src/types/reducer'
import {
  GetPage,
  PostList,
  PostInput,
  Post,
  CommentInput,
  Comment,
  GetPostsResponse,
  UpdatePostInput,
  UpdateCommentInput,
} from 'tukibook-helper'

const { VITE_API_URL } = import.meta.env

const PAGE_LIMIT = 2

export const fetchPosts = createAsyncThunk(
  PostsActionTypes.GET_POSTS,
  async ({ page }: GetPage) => {
    const response: GetPostsResponse = await handleFetch(
      `${VITE_API_URL}${routes.posts}?page=${page}&limit=${PAGE_LIMIT}`,
      {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
      }
    ).then(res => res?.json())
    return {
      posts: response.posts,
      totalItems: response.totalItems,
    }
  }
)

export const fetchPostById = createAsyncThunk(
  PostsActionTypes.GET_POST_DETAIL,
  async (postId: Post['id']) => {
    const response = await handleFetch(`${VITE_API_URL}${routes.posts}/${postId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await response?.json()
    return data as Post
  }
)

export const addPost = createAsyncThunk(PostsActionTypes.ADD_POST, async (newPost: PostInput) => {
  const response = await handleFetch(`${VITE_API_URL}${routes.posts}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(newPost),
  }).then(res => res?.json())
  return response as Post
})

export const editPost = createAsyncThunk(
  PostsActionTypes.EDIT_POST,
  async ({ id, ...newPost }: UpdatePostInput) => {
    const response = await handleFetch(`${VITE_API_URL}${routes.posts}/${id}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'PUT',
      body: JSON.stringify(newPost),
    }).then(res => res?.json())
    return response as Post
  }
)

export const deletePost = createAsyncThunk(
  PostsActionTypes.DELETE_POST,
  async (postId: Post['id']) => {
    const response = await handleFetch(`${VITE_API_URL}${routes.posts}/${postId}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'DELETE',
    }).then(res => res?.json())
    return response as Post
  }
)

export const likePost = createAsyncThunk(
  PostsActionTypes.LIKE_POST,
  async (postId: Post['id']) => {
    const response = await handleFetch(`${VITE_API_URL}${routes.likes}/${postId}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'PATCH',
    }).then(res => res?.json())
    return response as Post
  }
)

export const commentPost = createAsyncThunk(
  PostsActionTypes.COMMENT_POST,
  async (newComment: CommentInput) => {
    const response = await handleFetch(`${VITE_API_URL}${routes.comments}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(newComment),
    }).then(res => res?.json())
    return { postId: newComment.postId, newComment: response as Comment }
  }
)

export const editComment = createAsyncThunk(
  PostsActionTypes.EDIT_COMMENT,
  async ({ id, ...newComment }: UpdateCommentInput) => {
    const response = await handleFetch(`${VITE_API_URL}${routes.comments}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newComment),
    }).then(res => res?.json())
    return response as Comment
  }
)

export const deleteComment = createAsyncThunk(
  PostsActionTypes.DELETE_COMMENT,
  async (commentId: Comment['id']) => {
    const response = await handleFetch(`${VITE_API_URL}${routes.comments}/${commentId}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'DELETE',
    }).then(res => res?.json())
    return response as Comment
  }
)

interface PostsState {
  posts: PostList
  status: 'loading' | 'succeeded' | 'failed'
  error: string | null
  page: number
  hasMore: boolean
  postDetail: Post | null
}

const initialState: PostsState = {
  posts: [],
  postDetail: null,
  status: 'loading',
  error: null,
  page: 1,
  hasMore: true,
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    const syncPostDetail = (state: PostsState, updated: Post) => {
      if (updated.id === state.postDetail?.id) {
        state.postDetail = { ...state.postDetail, ...updated }
      }
    }

    const isPostRelatedAction = (action: any): action is { payload: Post; type: string } => {
      return action.type.endsWith('/fulfilled') && action.payload?.id
    }

    builder
      .addCase(fetchPosts.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, { payload }) => {
        if (state.posts.some(post => post.id === payload.posts[0].id)) return

        state.status = 'succeeded'
        state.posts = [...state.posts, ...payload.posts]
        state.page += 1
        state.hasMore = payload.totalItems > state.posts.length
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Error al obtener posts'
      })
      .addCase(fetchPostById.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchPostById.fulfilled, (state, { payload }) => {
        state.status = 'succeeded'
        state.postDetail = payload
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Error al obtener el post'
      })
      .addCase(addPost.fulfilled, (state, action) => {
        /* TODO: Optimizar busqueda innecesaria la primera vez,
          ya que la primera vez es logico que tenga que agregar
          el post. Ver como hacer para saber 
          cuando es la "primera vez"
        */
        const exists = state.posts.some(post => post.id === action.payload.id)
        if (!exists) {
          state.posts.unshift(action.payload)
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (action.payload.id) {
          state.posts = state.posts.filter(post => post.id !== action.payload.id)
        }
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const post = state.posts.find(post => post.id === action.payload.id)
        if (!post) return
        // Para evitar que 'likee' de mas
        if (post.likes + 1 === action.payload.likes) {
          post.likes += 1
        }
      })
      .addCase(commentPost.fulfilled, (state, action) => {
        const post = state.posts.find(post => post.id === action.payload.postId)

        const newCommentId = action.payload.newComment.id

        if (!post) {
          if (!state.postDetail) return
          const isNewCommentExist = state.postDetail.comments.some(
            comment => comment.id === newCommentId
          )

          !isNewCommentExist &&
            syncPostDetail(state, {
              ...state.postDetail,
              comments: [action.payload.newComment, ...state.postDetail.comments],
            })
          return
        }
        const isNewCommentExist = post.comments.some(comment => comment.id === newCommentId)

        !isNewCommentExist && post.comments.unshift(action.payload.newComment)

        syncPostDetail(state, post)
      })
      .addCase(editPost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(post => post.id === action.payload.id)
        if (index === -1) return

        state.posts[index] = {
          ...state.posts[index],
          content: action.payload.content,
          updatedAt: action.payload.updatedAt,
          /* Tambien se puede directamente ...action.payload, 
            en lugar de propiedad por propiedad 
          */
        }
      })
      .addCase(editComment.fulfilled, (state, action) => {
        const updated = action.payload
        const post = state.posts.find(p => p.comments.some(c => c.id === updated.id))
        if (!post) return
        const comment = post.comments.find(c => c.id === updated.id)
        if (comment) {
          comment.content = updated.content
          comment.updatedAt = updated.updatedAt
        }

        syncPostDetail(state, post)
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        const deletedComment = action.payload

        const post = state.posts.find(post =>
          post.comments.some(comment => comment.id === deletedComment.id)
        )
        if (!post) return
        post.comments = post.comments.filter(comment => comment.id !== deletedComment.id)

        syncPostDetail(state, post)
      })
      .addMatcher(isPostRelatedAction, (state, action) => {
        const updatedPost = action.payload

        if (state.postDetail?.id === updatedPost.id) {
          state.postDetail = { ...state.postDetail, ...updatedPost }
        }
      })
  },
})

export const postsReducer = postsSlice.reducer

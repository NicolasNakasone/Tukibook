import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { handleFetch } from 'src/constants/api'
import { routes } from 'src/constants/routes'
import { PostList, PostInput, CommentInput, Post, Comment, GetPage } from 'src/types'
import { PostsActionTypes } from 'src/types/reducer'

const { VITE_API_URL } = import.meta.env

const PAGE_LIMIT = 2

export const fetchPosts = createAsyncThunk(
  PostsActionTypes.GET_POSTS,
  async ({ page }: GetPage) => {
    const response = await handleFetch(
      `${VITE_API_URL}${routes.posts}?page=${page}&limit=${PAGE_LIMIT}`,
      {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
      }
    ).then(res => res?.json())
    return {
      posts: response.posts as PostList,
      totalItems: response.totalItems as number,
    }
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

interface PostsState {
  posts: PostList
  status: 'loading' | 'succeeded' | 'failed'
  error: string | null
  page: number
  hasMore: boolean
}

const initialState: PostsState = {
  posts: [],
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
    builder
      .addCase(fetchPosts.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, { payload }) => {
        console.log('slice')
        if (
          state.posts.some((post, i) => {
            console.log({ postID: post.id, i })
            return post.id === payload.posts[0].id
          })
        )
          return

        state.status = 'succeeded'
        state.posts = [...state.posts, ...payload.posts]
        state.page += 1
        state.hasMore = payload.totalItems > state.posts.length
        console.log('paso slice', {
          page: state.page,
          hasMore: state.hasMore,
          postsLength: state.posts.length,
        })
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch posts'
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
        // Para evitar que 'likee' de mas
        if (post && post.likes + 1 === action.payload.likes) {
          post.likes += 1
        }
      })
      .addCase(commentPost.fulfilled, (state, action) => {
        const post = state.posts.find(post => post.id === action.payload.postId)
        if (post) {
          const newCommentId = action.payload.newComment.id
          const isNewCommentExist = post.comments.some(comment => comment.id === newCommentId)

          !isNewCommentExist && post.comments.unshift(action.payload.newComment)
        }
      })
  },
})

export const postsReducer = postsSlice.reducer

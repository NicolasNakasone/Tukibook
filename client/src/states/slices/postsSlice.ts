import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { handleFetch } from 'src/constants/api'
import { routes } from 'src/constants/routes'
import { PostList, PostInput, CommentInput, Post } from 'src/types'
import { PostsActionTypes } from 'src/types/reducer'

const { VITE_API_URL } = import.meta.env

export const fetchPosts = createAsyncThunk(PostsActionTypes.GET_POSTS, async () => {
  const response = await handleFetch(`${VITE_API_URL}${routes.posts}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
  }).then(res => res?.json())
  return response as PostList
})

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
  async (postId: string) => {
    await handleFetch(`${VITE_API_URL}${routes.posts}/${postId}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'DELETE',
    }).then(res => res?.json())
    return postId
  }
)

export const likePost = createAsyncThunk(PostsActionTypes.LIKE_POST, async (postId: string) => {
  await handleFetch(`${VITE_API_URL}${routes.likes}/${postId}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'PATCH',
  }).then(res => res?.json())
  return postId
})

export const commentPost = createAsyncThunk(
  PostsActionTypes.COMMENT_POST,
  async (newComment: CommentInput) => {
    const response = await handleFetch(`${VITE_API_URL}${routes.comments}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(newComment),
    }).then(res => res?.json())
    return { postId: newComment.postId, newComment: response }
  }
)

interface PostsState {
  posts: PostList
  status: 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: PostsState = {
  posts: [],
  status: 'loading',
  error: null,
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
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<PostList>) => {
        state.status = 'succeeded'
        state.posts = action.payload
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch posts'
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload)
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(post => post.id !== action.payload)
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const post = state.posts.find(post => post.id === action.payload)
        if (post) {
          post.likes += 1
        }
      })
      .addCase(commentPost.fulfilled, (state, action) => {
        const post = state.posts.find(post => post.id === action.payload.postId)
        if (post) {
          post.comments.unshift(action.payload.newComment)
        }
      })
  },
})

export const postsReducer = postsSlice.reducer

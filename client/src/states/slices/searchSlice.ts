import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { handleFetch } from 'src/constants/api'
import { routes } from 'src/constants/routes'
import { SearchActionTypes } from 'src/types/reducer'
import { PAGE_LIMIT, SearchAllParams, SearchAllResponse, SearchResults } from 'tukibook-helper'

const { VITE_API_URL } = import.meta.env

export const searchAll = createAsyncThunk(
  SearchActionTypes.SEARCH_ALL,
  async ({ page, query, type }: SearchAllParams) =>
    await handleFetch<SearchAllResponse>(
      `${VITE_API_URL}${routes.search}?q=${query}&type=${type}&page=${page}&limit=${PAGE_LIMIT}`,
      { method: 'GET' },
      null,
      true
    )
)

export interface SearchState {
  results: SearchResults
  page: number
  hasMore: boolean
  totalItems: number
  error: string | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
}

const initialState: SearchState = {
  results: {},
  page: 1,
  error: null,
  hasMore: false,
  totalItems: 0,
  status: 'idle',
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    resetState: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(searchAll.pending, state => {
        state.status = 'loading'
      })
      .addCase(searchAll.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Error al obtener resultados'
      })
      .addCase(searchAll.fulfilled, (state, { payload: { data, error } }) => {
        if (error) {
          state.status = 'failed'
          state.error = error.message
          return
        }
        state.status = 'succeeded'

        state.page += 1
        state.totalItems = data.totalItems

        // const newPosts = data.posts.filter(
        //   post => !state.posts.some(existing => existing.id === post.id)
        // )

        if (data.posts) {
          state.results = { posts: [...(state.results.posts || []), ...data.posts] }
          state.hasMore = data.totalItems > (state.results.posts?.length || 0)
          return
        }

        if (data.users) {
          state.results = { users: [...(state.results.users || []), ...data.users] }
          state.hasMore = data.totalItems > (state.results.users?.length || 0)
          return
        }
      })
  },
})

export const searchReducer = searchSlice.reducer

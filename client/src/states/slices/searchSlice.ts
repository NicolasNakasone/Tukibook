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
  totals: Record<'users' | 'posts', number>
  error: string | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
}

const initialState: SearchState = {
  page: 1,
  error: null,
  results: {},
  status: 'idle',
  hasMore: false,
  totals: { posts: 0, users: 0 },
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
        state.totals = { posts: data.totalPosts, users: data.totalUsers }

        state.results = {
          ...(data.posts && { posts: [...(state.results.posts || []), ...data.posts] }),
          ...(data.users && { users: [...(state.results.users || []), ...data.users] }),
        }

        const postsLength = state.results.posts?.length || 0
        const usersLength = state.results.users?.length || 0
        const totalLength = postsLength + usersLength

        if (data.posts && data.users) {
          const totalItems = data.totalPosts + data.totalUsers
          state.hasMore = totalItems > totalLength
          return
        }

        if (data.posts) {
          state.hasMore = data.totalPosts > postsLength
          return
        }

        if (data.users) {
          state.hasMore = data.totalUsers > usersLength
          return
        }
      })
  },
})

export const searchReducer = searchSlice.reducer

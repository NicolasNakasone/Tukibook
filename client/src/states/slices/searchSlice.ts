import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { handleFetch } from 'src/constants/api'
import { routes } from 'src/constants/routes'
import { SearchActionTypes } from 'src/types/reducer'
import { SearchAllParams, SearchAllResponse, SearchResults } from 'tukibook-helper'

const { VITE_API_URL } = import.meta.env

const PAGE_LIMIT = 2

export const searchAll = createAsyncThunk(
  SearchActionTypes.SEARCH_ALL,
  async ({ page, query, type }: SearchAllParams) => {
    const response: SearchAllResponse = await handleFetch(
      `${VITE_API_URL}${routes.search}?q=${query}&type=${type}&page=${page}&limit=${PAGE_LIMIT}`
    ).then(r => r.json())

    return response
  }
)

interface SearchState {
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
  hasMore: true,
  totalItems: 0,
  status: 'idle',
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(searchAll.pending, state => {
        state.status = 'loading'
      })
      .addCase(searchAll.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Error al obtener resultados'
      })
      .addCase(searchAll.fulfilled, (state, { payload }) => {
        state.status = 'succeeded'

        state.page += 1
        state.totalItems = payload.totalItems

        // const newPosts = payload.posts.filter(
        //   post => !state.posts.some(existing => existing.id === post.id)
        // )

        if (payload.posts) {
          state.results = { posts: [...payload.posts] }
          state.hasMore = payload.totalItems > payload.posts.length
          return
        }

        if (payload.users) {
          state.results = { users: [...payload.users] }
          state.hasMore = payload.totalItems > payload.users.length
          return
        }
      })
  },
})

export const searchReducer = searchSlice.reducer

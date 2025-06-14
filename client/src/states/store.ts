import { configureStore } from '@reduxjs/toolkit'
import { postsReducer } from 'src/states/slices/postsSlice'
import { searchReducer } from 'src/states/slices/searchSlice'

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    search: searchReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

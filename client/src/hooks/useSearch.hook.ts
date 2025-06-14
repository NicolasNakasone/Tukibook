import { useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { searchAll } from 'src/states/slices/searchSlice'
import { AppDispatch, RootState } from 'src/states/store'
import { SearchAllParams } from 'tukibook-helper'

export const useSearch = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { error, hasMore, page, results, status, totalItems } = useSelector(
    ({ search }: RootState) => search
  )

  const handleGetResults = useCallback((searchAllParams: SearchAllParams) => {
    return dispatch(searchAll(searchAllParams))
  }, [])

  // const handleGetMorePosts = useCallback(
  //   (filters: GetPostsParams['filters']) => {
  //     if (status !== 'loading' && hasMore) {
  //       dispatch(fetchPosts({ page, filters }))
  //     }
  //   },
  //   [page, hasMore, status, dispatch]
  // )

  const handleGetMoreResults = useCallback(
    (searchAllParams: SearchAllParams) => {
      if (status !== 'loading' && hasMore) {
        dispatch(searchAll(searchAllParams))
      }
    },
    [page, hasMore, status, dispatch]
  )

  return {
    error,
    hasMore,
    page,
    results,
    status,
    totalItems,
    getResults: handleGetResults,
    getMoreResults: handleGetMoreResults,
  }
}

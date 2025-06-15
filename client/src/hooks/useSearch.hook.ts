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

  const handleGetResults = useCallback(({ page, query, type }: SearchAllParams) => {
    return dispatch(searchAll({ page, query, type }))
  }, [])

  const handleGetMoreResults = useCallback(
    ({ query, type }: Omit<SearchAllParams, 'page'>) => {
      if (status !== 'loading' && hasMore) {
        dispatch(searchAll({ page, query, type }))
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

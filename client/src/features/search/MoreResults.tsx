import { useEffect } from 'react'

import { useSearchParams } from 'react-router-dom'
import { ListPostResults } from 'src/features/search/ListPostResults'
import { ListUserResults } from 'src/features/search/ListUserResults'
import { useInfiniteScroll } from 'src/hooks/useInfiniteScroll.hook'
import { useSearch } from 'src/hooks/useSearch.hook'
import { FilterableSearchType } from 'tukibook-helper'

interface MoreResultsProps {
  type: FilterableSearchType
}

export const MoreResults = ({ type: currentType }: MoreResultsProps): JSX.Element => {
  const { getResults, results, hasMore, status, getMoreResults, resetSearchState } = useSearch()
  const [params] = useSearchParams()

  const query = params.get('q') || ''

  // Carga inicial
  useEffect(() => {
    getResults({ page: 1, query, type: currentType })

    return () => {
      resetSearchState()
    }
  }, [currentType])

  const { loaderRef } = useInfiniteScroll({
    hasMore,
    isLoading: status === 'loading',
    onLoadMore: () => getMoreResults({ query, type: currentType }),
  })

  const returnComponent: { [t in typeof currentType]: JSX.Element } = {
    posts: <ListPostResults results={results.posts} />,
    users: <ListUserResults results={results.users} />,
  }

  return (
    <>
      {returnComponent[currentType]}
      <div ref={loaderRef} />
    </>
  )
}

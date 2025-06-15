import { useEffect } from 'react'

import { useSearchParams } from 'react-router-dom'
import { ListPostResults } from 'src/features/search/ListPostResults'
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
    posts: (
      <div>
        <ListPostResults results={results.posts} />
        <div ref={loaderRef} />
      </div>
    ),
    users: (
      <div>
        <div>
          {results.users?.map(user => {
            return (
              <div key={user.id} style={{ height: '20rem', border: '1px solid CanvasText' }}>
                <p>Nombre: {user.username}</p>
                <p>Correo: {user.email}</p>
              </div>
            )
          })}
        </div>
        <div ref={loaderRef} />
      </div>
    ),
  }

  return returnComponent[currentType]
}

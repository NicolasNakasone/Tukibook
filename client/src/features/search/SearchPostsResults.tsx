import { useEffect } from 'react'

import { useSearchParams } from 'react-router-dom'
import { PostCard } from 'src/features/posts/PostCard'
import { useInfiniteScroll } from 'src/hooks/useInfiniteScroll.hook'
import { useSearch } from 'src/hooks/useSearch.hook'

export const SearchPostsResults = (): JSX.Element => {
  const { getResults, results, hasMore, status, getMoreResults } = useSearch()
  const [params] = useSearchParams()

  const query = params.get('q') || ''

  // Carga inicial
  useEffect(() => {
    getResults({ page: 1, query, type: 'posts' })
  }, [])

  const { loaderRef } = useInfiniteScroll({
    hasMore,
    isLoading: status === 'loading',
    onLoadMore: () => getMoreResults({ query, type: 'posts' }),
  })

  return (
    <div>
      <div>
        {results.posts?.map(post => {
          return <PostCard key={post.id} {...{ post }} />
        })}
      </div>
      <div ref={loaderRef} />
    </div>
  )
}

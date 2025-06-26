import { Loader } from 'src/components/common/Loader'
import { routes } from 'src/constants/routes'
import { PostCard } from 'src/features/posts/PostCard'
import styles from 'src/features/search/ListResults.module.css'
import { MoreResultsButton } from 'src/features/search/MoreResultsButton'
import { useSearch } from 'src/hooks/useSearch.hook'
import { SearchAllResponse } from 'tukibook-helper'

interface ListPostResultsProps {
  results: SearchAllResponse['posts']
  showMore?: boolean
}

export const ListPostResults = ({ results, showMore }: ListPostResultsProps): JSX.Element => {
  const { status } = useSearch()

  return (
    <div className={styles.listResultsContainer}>
      {results?.map(post => {
        return <PostCard key={post.id} {...{ post }} />
      })}
      {showMore && <MoreResultsButton routeTo={routes.searchPosts} />}
      <Loader isLoading={status === 'loading'} />
    </div>
  )
}

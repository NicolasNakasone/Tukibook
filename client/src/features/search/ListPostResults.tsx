import { Loader } from 'src/components/common/Loader'
import { PostCard } from 'src/features/posts/PostCard'
import styles from 'src/features/search/ListResults.module.css'
import { useSearch } from 'src/hooks/useSearch.hook'
import { SearchAllResponse } from 'tukibook-helper'

interface ListPostResultsProps {
  results: SearchAllResponse['posts']
}

export const ListPostResults = ({ results }: ListPostResultsProps): JSX.Element => {
  const { status } = useSearch()

  return (
    <div className={styles.listResultsContainer}>
      {results?.map(post => {
        return <PostCard key={post.id} {...{ post }} />
      })}
      <Loader isLoading={status === 'loading'} />
    </div>
  )
}

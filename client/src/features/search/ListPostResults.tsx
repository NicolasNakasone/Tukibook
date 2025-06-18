import { PostCard } from 'src/features/posts/PostCard'
import styles from 'src/features/search/ListResults.module.css'
import { SearchAllResponse } from 'tukibook-helper'

interface ListPostResultsProps {
  results: SearchAllResponse['posts']
}

export const ListPostResults = ({ results }: ListPostResultsProps): JSX.Element => {
  return (
    <div className={styles.listResultsContainer}>
      {results?.map(post => {
        return <PostCard key={post.id} {...{ post }} />
      })}
    </div>
  )
}

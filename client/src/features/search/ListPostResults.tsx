import { PostCard } from 'src/features/posts/PostCard'
import { SearchAllResponse } from 'tukibook-helper'

interface ListPostResultsProps {
  results: SearchAllResponse['posts']
}

export const ListPostResults = ({ results }: ListPostResultsProps): JSX.Element => {
  return (
    <div>
      {results?.map(post => {
        return <PostCard key={post.id} {...{ post }} />
      })}
    </div>
  )
}

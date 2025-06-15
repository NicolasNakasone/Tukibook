import { PostCard } from 'src/features/posts/PostCard'
import { SearchAllResponse } from 'tukibook-helper'

export const FirstResults = ({
  results,
}: {
  results: Omit<SearchAllResponse, 'totalItems'>
}): JSX.Element => {
  return (
    <div>
      <div>
        {results.posts?.map(post => {
          return <PostCard key={post.id} {...{ post }} />
        })}
      </div>
      <div>
        {results.users?.map(user => {
          return (
            <div key={user.id}>
              <p>{user.username}</p>
              <p>{user.email}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

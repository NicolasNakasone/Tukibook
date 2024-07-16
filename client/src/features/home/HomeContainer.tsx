import { PostCard } from 'src/features/posts/PostCard'
import { PostList } from 'src/types'

export const HomeContainer = ({ posts }: { posts: PostList }): JSX.Element => {
  return (
    <>
      {posts.map(post => {
        return <PostCard key={post.id} {...{ post }} />
      })}
    </>
  )
}

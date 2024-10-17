import { PostCard } from 'src/features/posts/PostCard'
import { PostList } from 'tukibook-helper'

export const HomeContainer = ({ posts }: { posts: PostList }): JSX.Element => {
  return (
    <>
      {posts.map(post => {
        return <PostCard key={post.id} {...{ post }} />
      })}
    </>
  )
}

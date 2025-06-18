import { Loader } from 'src/components/common/Loader'
import { PostCard } from 'src/features/posts/PostCard'
import { usePosts } from 'src/hooks/usePosts.hook'

export const HomeContainer = (): JSX.Element => {
  const { posts, status } = usePosts()
  return (
    <>
      {posts.map(post => {
        return <PostCard key={post.id} {...{ post }} />
      })}
      <Loader isLoading={status === 'loading'} />
    </>
  )
}

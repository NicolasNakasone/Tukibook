import { AddPostForm } from 'src/features/posts/AddPostForm'
import { PostCard } from 'src/features/posts/PostCard'
import { PostSkeleton } from 'src/features/posts/PostSkeleton'
import { usePosts } from 'src/hooks/usePosts.hook'

export const HomePage = (): JSX.Element => {
  const {
    state: { posts },
  } = usePosts()

  return (
    <main
      style={{
        padding: '4rem 8vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4rem',
      }}
    >
      {!posts.length ? (
        <>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </>
      ) : (
        <AddPostForm />
      )}
      {posts.map(post => {
        return <PostCard key={post.id} {...{ post }} />
      })}
    </main>
  )
}

import { memo, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { AddPostForm } from 'src/features/posts/AddPostForm'
import { PostCard } from 'src/features/posts/PostCard'
import { PostSkeleton } from 'src/features/posts/PostSkeleton'
import { fetchPosts } from 'src/states/slices/postsSlice'
import { AppDispatch, RootState } from 'src/states/store'

export const HomePage = memo((): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>()
  const posts = useSelector((state: RootState) => state.posts.posts)
  const postStatus = useSelector((state: RootState) => state.posts.status)

  useEffect(() => {
    if (!posts?.length) {
      dispatch(fetchPosts())
    }
  }, [])

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
      {postStatus !== 'succeeded' ? (
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
})

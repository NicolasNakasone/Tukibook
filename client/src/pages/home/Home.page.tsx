import { useEffect, useRef } from 'react'

import { AddPostForm } from 'src/features/posts/AddPostForm'
import { PostCard } from 'src/features/posts/PostCard'
import { PostSkeleton } from 'src/features/posts/PostSkeleton'
import { usePosts } from 'src/hooks/usePosts.hook'

const observerOptions = {
  root: null,
  rootMargin: '20px',
  threshold: 1.0,
}

export const HomePage = (): JSX.Element => {
  const { posts, status, page, getPosts, getMorePosts } = usePosts()

  const loader = useRef(null)

  const observer = new IntersectionObserver(entities => {
    if (entities[0].isIntersecting) {
      getMorePosts()
    }
  }, observerOptions)

  useEffect(() => {
    if (status === 'loading') {
      getPosts({ page })
    }
  }, [])

  useEffect(() => {
    if (loader.current) {
      observer.observe(loader.current)
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current)
      }
    }
  }, [page])

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
      {status !== 'succeeded' ? (
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
      {status === 'loading' && <p>Loading...</p>}
      <div ref={loader} />
    </main>
  )
}

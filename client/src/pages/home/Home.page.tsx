import { useEffect, useRef } from 'react'

import { HomeContainer } from 'src/features/home/HomeContainer'
import { AddPostForm } from 'src/features/posts/AddPostForm'
import { PostSkeleton } from 'src/features/posts/PostSkeleton'
import { usePosts } from 'src/hooks/usePosts.hook'

const observerOptions = {
  root: null,
  rootMargin: '100px',
  threshold: 0.25,
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
      <HomeContainer {...{ posts }} />
      {status === 'loading' && <p>Cargando...</p>}
      <div ref={loader} />
    </main>
  )
}

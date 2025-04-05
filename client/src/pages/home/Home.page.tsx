import { useEffect, useRef } from 'react'

import { HomeContainer } from 'src/features/home/HomeContainer'
import { AddPostForm } from 'src/features/posts/AddPostForm'
import { PostSkeleton } from 'src/features/posts/PostSkeleton'
import { usePosts } from 'src/hooks/usePosts.hook'

const observerOptions: IntersectionObserverInit = {
  root: null,
  rootMargin: '100px',
  threshold: 0.25,
}

export const HomePage = (): JSX.Element => {
  const { posts, status, page, getPosts, getMorePosts /* , isLoadingMore */ } = usePosts()
  const loader = useRef(null)

  // Carga inicial
  useEffect(() => {
    if (status === 'loading') {
      getPosts({ page })
    }
  }, [])

  // Scroll infinito controlado
  useEffect(() => {
    const currentLoader = loader.current
    if (!currentLoader) return

    const observer = new IntersectionObserver(entities => {
      const isVisible = entities[0].isIntersecting

      if (isVisible) {
        getMorePosts()
      }
    }, observerOptions)

    observer.observe(currentLoader)

    return () => {
      if (currentLoader) observer.unobserve(currentLoader)
    }
  }, [loader, getMorePosts])

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
      {/* {isLoadingMore && <p>Cargando más...</p>} */}
      <div ref={loader} />
    </main>
  )
}

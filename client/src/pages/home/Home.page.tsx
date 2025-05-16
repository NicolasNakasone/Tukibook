import { useEffect, useRef } from 'react'

import { HomeContainer } from 'src/features/home/HomeContainer'
import { AddPostForm } from 'src/features/posts/AddPostForm'
import { PostSkeleton } from 'src/features/posts/PostSkeleton'
import { usePosts } from 'src/hooks/usePosts.hook'
import styles from 'src/pages/home/Home.module.css'

const observerOptions: IntersectionObserverInit = {
  root: null,
  rootMargin: '100px',
  threshold: 0.25,
}

export const HomePage = (): JSX.Element => {
  const { posts, status, page, getPosts, getMorePosts, hasMore } = usePosts()
  const loader = useRef(null)

  // Carga inicial
  useEffect(() => {
    if (posts.length === 0 && status === 'idle') {
      getPosts({ page })
    }
  }, [])

  // Scroll infinito controlado
  useEffect(() => {
    const currentLoader = loader.current
    if (!currentLoader) return

    const observer = new IntersectionObserver(entities => {
      const isVisible = entities[0].isIntersecting

      if (isVisible && status !== 'loading' && hasMore) {
        getMorePosts()
      }
    }, observerOptions)

    observer.observe(currentLoader)

    return () => {
      if (currentLoader) observer.unobserve(currentLoader)
    }
  }, [loader, getMorePosts, status, hasMore])

  return (
    <main className={styles.homeMainContainer}>
      {status === 'loading' && posts.length === 0 ? (
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
      <div ref={loader} />
    </main>
  )
}

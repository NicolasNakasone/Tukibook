import { useEffect, useRef } from 'react'

import { HomeContainer } from 'src/features/home/HomeContainer'
import { PostSkeleton } from 'src/features/posts/PostSkeleton'
import { usePosts } from 'src/hooks/usePosts.hook'

const observerOptions: IntersectionObserverInit = {
  root: null,
  rootMargin: '100px',
  threshold: 0.25,
}

export const PostFeed = (): JSX.Element => {
  const { posts, status, getMorePosts, hasMore, filters } = usePosts()
  const loader = useRef(null)

  // Scroll infinito controlado
  useEffect(() => {
    const currentLoader = loader.current
    if (!currentLoader) return

    const observer = new IntersectionObserver(entities => {
      const isVisible = entities[0].isIntersecting

      if (isVisible && status !== 'loading' && hasMore) {
        getMorePosts(filters)
      }
    }, observerOptions)

    observer.observe(currentLoader)

    return () => {
      if (currentLoader) observer.unobserve(currentLoader)
    }
  }, [loader, getMorePosts, status, hasMore])

  if (status === 'loading' && posts.length === 0)
    return (
      <>
        <PostSkeleton />
        <PostSkeleton />
      </>
    )

  return (
    <>
      <HomeContainer />
      <div ref={loader} />
    </>
  )
}

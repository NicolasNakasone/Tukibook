import { useEffect, useRef } from 'react'

interface UseInfiniteScrollProps {
  hasMore: boolean
  isLoading: boolean
  onLoadMore: () => void
  observerOptions?: IntersectionObserverInit
}

const defaultObserverOptions: IntersectionObserverInit = {
  root: null,
  rootMargin: '100px',
  threshold: 0.25,
}

export const useInfiniteScroll = ({
  hasMore,
  isLoading,
  onLoadMore,
  observerOptions = defaultObserverOptions,
}: UseInfiniteScrollProps) => {
  const loaderRef = useRef(null)

  // Scroll infinito controlado
  useEffect(() => {
    const currentLoader = loaderRef.current
    if (!currentLoader) return

    const observer = new IntersectionObserver(entities => {
      const isVisible = entities[0].isIntersecting

      if (isVisible && !isLoading && hasMore) {
        onLoadMore()
      }
    }, observerOptions)

    observer.observe(currentLoader)

    return () => {
      if (currentLoader) observer.unobserve(currentLoader)
    }
  }, [loaderRef, onLoadMore, isLoading, hasMore])

  return { loaderRef }
}

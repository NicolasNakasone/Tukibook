import { useEffect } from 'react'

import { useLocation } from 'react-router-dom'
import { AddPostForm } from 'src/features/posts/AddPostForm'
import { PostFeed } from 'src/features/posts/PostFeed'
import { usePosts } from 'src/hooks/usePosts.hook'
import styles from 'src/pages/home/Home.module.css'

export const HomePage = (): JSX.Element => {
  const { posts, status, setPartialState, currentPage, getPosts, resetPostsState } = usePosts()

  const { pathname } = useLocation()

  // Carga inicial
  useEffect(() => {
    if (currentPage !== pathname) {
      resetPostsState()
      setPartialState({ filters: {}, currentPage: pathname as '' | '/' | '/profile' | undefined })
      getPosts({ page: 1, filters: {} })
    }
  }, [pathname])

  return (
    <main className={styles.homeMainContainer}>
      {!(status === 'loading' && posts.length === 0) && <AddPostForm />}
      <PostFeed />
    </main>
  )
}

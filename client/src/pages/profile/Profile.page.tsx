import { useEffect } from 'react'

import { useLocation } from 'react-router-dom'
import { GoBackButton } from 'src/components/common/GoBackButton'
import { PostFeed } from 'src/features/posts/PostFeed'
import { ProfileUserInfo } from 'src/features/profile/ProfileUserInfo'
import { useAuth } from 'src/hooks/useAuth.hook'
import { usePosts } from 'src/hooks/usePosts.hook'
import styles from 'src/pages/profile/Profile.module.css'

export const ProfilePage = (): JSX.Element => {
  const { user } = useAuth()
  const { setPartialState, currentPage, getPosts, resetPostsState } = usePosts()

  const { pathname } = useLocation()

  // Carga inicial
  useEffect(() => {
    if (currentPage !== pathname) {
      resetPostsState()
      setPartialState({
        filters: { user: user?.id },
        currentPage: pathname as '' | '/' | '/profile' | undefined,
      })
      getPosts({ page: 1, filters: { user: user?.id } })
    }
  }, [pathname])

  return (
    <main className={styles.profileMainContainer}>
      <GoBackButton />
      <div className={styles.profileMainContent}>
        <ProfileUserInfo />
        <div className={styles.profileUserPosts}>
          <h2>Tus posts</h2>
          <PostFeed />
        </div>
      </div>
    </main>
  )
}

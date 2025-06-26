import { useEffect, useState } from 'react'

import { useLocation, useParams } from 'react-router-dom'
import { handleFetch } from 'src/constants/api'
import { routes } from 'src/constants/routes'
import { PostFeed } from 'src/features/posts/PostFeed'
import { ProfileUserInfo } from 'src/features/profile/ProfileUserInfo'
import { usePosts } from 'src/hooks/usePosts.hook'
import styles from 'src/pages/profile/Profile.module.css'
import { User } from 'tukibook-helper'

const { VITE_API_URL } = import.meta.env

export const UserDetailPage = (): JSX.Element => {
  const { id } = useParams()
  const [userDetail, setUserDetail] = useState<User | null>(null)
  const { setPartialState, currentPage, getPosts, resetPostsState } = usePosts()

  const { pathname } = useLocation()

  useEffect(() => {
    if (id) {
      handleGetUserById(id)
    }
  }, [id])

  // Carga inicial
  useEffect(() => {
    if (userDetail && currentPage !== pathname) {
      resetPostsState()
      setPartialState({
        filters: { user: userDetail.id },
        currentPage: pathname as '' | '/' | '/profile' | undefined,
      })
      getPosts({ page: 1, filters: { user: userDetail.id } })
    }
  }, [pathname, userDetail])

  const handleGetUserById = async (userId: string) => {
    const response = await handleFetch<User>(
      `${VITE_API_URL}${routes.userDetail.replace(':id', userId)}`
    )

    if (response.data) setUserDetail(response.data)
  }

  return (
    <main className={styles.profileMainContainer}>
      <div className={styles.profileMainContent}>
        <ProfileUserInfo user={userDetail} />
        <div className={styles.profileUserPosts}>
          <h2>Tus posts</h2>
          <PostFeed />
        </div>
      </div>
    </main>
  )
}

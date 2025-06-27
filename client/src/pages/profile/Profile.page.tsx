import { useEffect, useState } from 'react'

import { useLocation, useParams } from 'react-router-dom'
import { handleFetch } from 'src/constants/api'
import { routes } from 'src/constants/routes'
import { PostFeed } from 'src/features/posts/PostFeed'
import { ProfileUserInfo } from 'src/features/profile/ProfileUserInfo'
import { useAuth } from 'src/hooks/useAuth.hook'
import { usePosts } from 'src/hooks/usePosts.hook'
import styles from 'src/pages/profile/Profile.module.css'
import { User } from 'tukibook-helper'

const { VITE_API_URL } = import.meta.env

export const ProfilePage = (): JSX.Element => {
  const { user } = useAuth()
  const { setPartialState, currentPage, getPosts, resetPostsState } = usePosts()

  const { id } = useParams()
  const [userDetail, setUserDetail] = useState<User | null>(null)

  const { pathname } = useLocation()

  useEffect(() => {
    if (id) {
      handleGetUserById(id)
    }
  }, [id])

  // Carga inicial
  useEffect(() => {
    if (currentPage === pathname) return

    if (id) {
      getPostsFromUserId(id)
      return
    }
    getPostsFromUserId(user?.id || '')
  }, [pathname, id])

  const handleGetUserById = async (userId: string) => {
    const response = await handleFetch<User>(
      `${VITE_API_URL}${routes.userDetail.replace(':id', userId)}`
    )

    if (response.data) setUserDetail(response.data)
  }

  const getPostsFromUserId = async (userId: string) => {
    resetPostsState()
    setPartialState({ filters: { user: userId }, currentPage: pathname })
    getPosts({ page: 1, filters: { user: userId } })
  }

  const currentUser = id ? userDetail : user

  return (
    <main className={styles.profileMainContainer}>
      <div className={styles.profileMainContent}>
        <ProfileUserInfo user={currentUser} />
        <div className={styles.profileUserPosts}>
          <h2>Tus posts</h2>
          <PostFeed />
        </div>
      </div>
    </main>
  )
}

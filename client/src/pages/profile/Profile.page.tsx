import { useMemo } from 'react'

import tukibookLogo from 'public/tuki.webp'
import { GoBackButton } from 'src/components/common/GoBackButton'
import { PostCard } from 'src/features/posts/PostCard'
import { useAuth } from 'src/hooks/useAuth.hook'
import { usePosts } from 'src/hooks/usePosts.hook'
import styles from 'src/pages/profile/Profile.module.css'

export const ProfilePage = (): JSX.Element => {
  const { user } = useAuth()
  const { posts } = usePosts()

  const userPosts = useMemo(() => posts.filter(post => post.user.id === user?.id), [])

  return (
    <main className={styles.profileMainContainer}>
      <GoBackButton />
      <div className={styles.profileMainContent}>
        <div className={styles.profileUserInfo}>
          <img src={tukibookLogo} alt="Foto de perfil" className={styles.profileUserAvatar} />
          <h2>{user?.username}</h2>
          <p>Posts realizados: {userPosts.length}</p>
          <p>Seguidores: 0</p>
        </div>
        <div className={styles.profileUserPosts}>
          <h2>Tus posts</h2>
          {userPosts.map(post => {
            return <PostCard key={post.id} {...{ post }} />
          })}
        </div>
      </div>
    </main>
  )
}

import { GoBackButton } from 'src/components/common/GoBackButton'
import { PostFeed } from 'src/features/posts/PostFeed'
import { ProfileUserInfo } from 'src/features/profile/ProfileUserInfo'
import { useAuth } from 'src/hooks/useAuth.hook'
import { usePosts } from 'src/hooks/usePosts.hook'
import styles from 'src/pages/profile/Profile.module.css'

export const ProfilePage = (): JSX.Element => {
  const { user } = useAuth()
  const { posts } = usePosts()

  return (
    <main className={styles.profileMainContainer}>
      <GoBackButton />
      <div className={styles.profileMainContent}>
        <ProfileUserInfo {...{ user, postCount: posts.length }} />
        <div className={styles.profileUserPosts}>
          <h2>Tus posts</h2>
          <PostFeed filters={{ user: { id: user?.id } }} />
        </div>
      </div>
    </main>
  )
}

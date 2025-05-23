import { AddPostForm } from 'src/features/posts/AddPostForm'
import { PostFeed } from 'src/features/posts/PostFeed'
import { usePosts } from 'src/hooks/usePosts.hook'
import styles from 'src/pages/home/Home.module.css'

export const HomePage = (): JSX.Element => {
  const { posts, status } = usePosts()

  return (
    <main className={styles.homeMainContainer}>
      {!(status === 'loading' && posts.length === 0) && <AddPostForm />}
      <PostFeed />
    </main>
  )
}

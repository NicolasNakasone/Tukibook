import styles from 'src/features/posts/LikePostButton.module.css'
import { usePosts } from 'src/hooks/usePosts.hook'
import { emitLikePost } from 'src/sockets'
import { Post } from 'tukibook-helper'

export const LikePostButton = ({ post }: { post: Post }): JSX.Element => {
  const { likePost } = usePosts()

  const handleLikePost = async () => {
    const response = await likePost(post.id)

    if (response.payload) emitLikePost(response.payload as Post)
  }

  return (
    <button
      className={styles.likePostButton}
      onClick={handleLikePost}
    >{`👍 ${post.likes || ''} ${post.likes ? (post.likes > 1 ? 'tukis' : 'tuki') : 'Tuki'}`}</button>
  )
}

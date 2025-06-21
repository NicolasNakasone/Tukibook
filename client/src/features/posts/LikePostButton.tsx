import { Button } from 'src/components/common/Button'
import styles from 'src/features/posts/LikePostButton.module.css'
import { useAuth } from 'src/hooks/useAuth.hook'
import { usePosts } from 'src/hooks/usePosts.hook'
import { emitLikePost } from 'src/sockets'
import { Post, PostResponse } from 'tukibook-helper'

export const LikePostButton = ({ post }: { post: Post }): JSX.Element => {
  const { likePost } = usePosts()
  const { user } = useAuth()

  const hasLiked = post.likes.includes(user?.id || '')

  const handleLikePost = async () => {
    const response = (await (await likePost(post.id)).payload) as PostResponse

    if (response.data) emitLikePost(response)
  }

  return (
    <Button
      className={`${styles.likePostButton} ${hasLiked ? styles.liked : ''}`}
      onClick={handleLikePost}
    >
      {`👍 ${post.likes?.length || ''} ${post.likes?.length ? (post.likes?.length > 1 ? 'tukis' : 'tuki') : 'Tuki'}`}
    </Button>
  )
}

import { useEffect } from 'react'

import styles from 'src/features/posts/LikePostButton.module.css'
import { usePosts } from 'src/hooks/usePosts.hook'
import { emitLikePost, socket } from 'src/sockets'
import { Post } from 'src/types'
import { SocketEvents } from 'src/types/socket'

export const LikePostButton = ({ post }: { post: Post }): JSX.Element => {
  const { likePost, likePostAfter } = usePosts()

  useEffect(() => {
    likePostAfter()

    return () => {
      // console.log('socket off')
      // No aparece nunca el log 👀
      socket.off(SocketEvents.LIKE_POST)
    }
  }, [])

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

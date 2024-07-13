import { useEffect } from 'react'

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
      style={{ width: 'max-content', padding: '0.25rem 0.5rem' }}
      onClick={handleLikePost}
    >{`👍 ${post.likes || ''} ${post.likes ? (post.likes > 1 ? 'tukis' : 'tuki') : 'Tuki'}`}</button>
  )
}

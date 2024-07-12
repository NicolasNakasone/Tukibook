import { useEffect } from 'react'

import { usePosts } from 'src/hooks/usePosts.hook'
import { emitDeletedPost, socket } from 'src/sockets'
import { Post } from 'src/types'
import { SocketEvents } from 'src/types/socket'

export const DeletePostButton = ({ post }: { post: Post }): JSX.Element => {
  const { deletePost, deletePostAfter } = usePosts()

  useEffect(() => {
    deletePostAfter()

    return () => {
      // console.log('socket off')
      // No aparece nunca el log 👀
      socket.off(SocketEvents.DELETE_POST)
    }
  }, [deletePostAfter])

  const handleDeletePost = async () => {
    const response = await deletePost(post.id)

    if (response.payload) emitDeletedPost(response.payload as Post)
  }

  return (
    <button
      style={{ width: 'max-content', padding: '0.25rem', margin: '0 0 0 auto' }}
      onClick={handleDeletePost}
    >
      ❌
    </button>
  )
}

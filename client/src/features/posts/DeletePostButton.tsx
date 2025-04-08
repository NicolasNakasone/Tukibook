import { ButtonHTMLAttributes, useEffect } from 'react'

import styles from 'src/features/posts/DeletePostButton.module.css'
import { usePosts } from 'src/hooks/usePosts.hook'
import { emitDeletePost, socket } from 'src/sockets'
import { Post, SocketEvents } from 'tukibook-helper'

interface DeletePostButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  post: Post
}

export const DeletePostButton = ({ post, ...props }: DeletePostButtonProps): JSX.Element => {
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

    if (response.payload) emitDeletePost(response.payload as Post)
  }

  return (
    <button {...props} className={styles.deletePostButton} onClick={handleDeletePost}>
      ❌
    </button>
  )
}

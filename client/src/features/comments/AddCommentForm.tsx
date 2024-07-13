import { FormEvent, useEffect } from 'react'

import { usePosts } from 'src/hooks/usePosts.hook'
import styles from 'src/pages/home/Home.module.css'
import { emitCommentPost, socket } from 'src/sockets'
import { Comment, Post } from 'src/types'
import { SocketEvents } from 'src/types/socket'

export const AddCommentForm = ({ post }: { post: Post }): JSX.Element => {
  const { commentPost, commentPostAfter } = usePosts()

  useEffect(() => {
    commentPostAfter()

    return () => {
      // console.log('socket off')
      // No aparece nunca el log 👀
      socket.off(SocketEvents.COMMENT_POST)
    }
  }, [])

  const handleCommentPost = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const target = event.target as HTMLFormElement
    const content = (target[0] as HTMLInputElement).value

    const response = await commentPost({ postId: post.id, username: 'otro user', content })

    if (response.payload) emitCommentPost(response.payload as Comment)

    target.reset()
  }

  return (
    <form style={{ width: '100%' }} onSubmit={handleCommentPost}>
      <input type="text" placeholder="Comentar..." className={styles.commentInput} />
    </form>
  )
}

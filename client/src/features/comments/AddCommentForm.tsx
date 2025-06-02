import { FormEvent } from 'react'

import { Button } from 'src/components/common/Button'
import styles from 'src/features/comments/AddCommentForm.module.css'
import { usePosts } from 'src/hooks/usePosts.hook'
import { emitCommentPost } from 'src/sockets'
import { Post } from 'tukibook-helper'

export const AddCommentForm = ({ post }: { post: Post }): JSX.Element => {
  const { commentPost } = usePosts()

  const handleCommentPost = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const target = event.target as HTMLFormElement
    const content = (target[0] as HTMLInputElement).value

    const response = await commentPost({ postId: post.id, content, parentCommentId: null })

    if (response.payload) emitCommentPost(response.payload as Post)

    target.reset()
  }

  return (
    <form className={styles.commentForm} onSubmit={handleCommentPost}>
      <input type="text" placeholder="Comentar..." className={styles.commentInput} />
      <Button type="submit">💬</Button>
    </form>
  )
}

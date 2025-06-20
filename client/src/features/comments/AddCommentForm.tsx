import { FormEvent } from 'react'

import { Button } from 'src/components/common/Button'
import { ButtonLoader } from 'src/components/common/ButtonLoader'
import styles from 'src/features/comments/AddCommentForm.module.css'
import { useIsLoading } from 'src/hooks/useIsLoading.hook'
import { usePosts } from 'src/hooks/usePosts.hook'
import { emitCommentPost } from 'src/sockets'
import { Post } from 'tukibook-helper'

export const AddCommentForm = ({ post }: { post: Post }): JSX.Element => {
  const { commentPost } = usePosts()

  const { isLoading, handleIsLoading } = useIsLoading()

  const handleCommentPost = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleIsLoading(true)

    const target = event.target as HTMLFormElement
    const content = (target[0] as HTMLInputElement).value

    const response = await commentPost({ postId: post.id, content, parentCommentId: null })

    handleIsLoading(false)

    if (response.payload) emitCommentPost(response.payload as Post)

    target.reset()
  }

  return (
    <form className={styles.commentForm} onSubmit={handleCommentPost}>
      <input type="text" placeholder="Comentar..." className={styles.commentInput} />
      <Button type="submit">{isLoading ? <ButtonLoader /> : '💬'}</Button>
    </form>
  )
}

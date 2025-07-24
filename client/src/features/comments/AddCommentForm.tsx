import { FormEvent } from 'react'

import { Button } from 'src/components/common/Button'
import { ButtonLoader } from 'src/components/common/ButtonLoader'
import styles from 'src/features/comments/AddCommentForm.module.css'
import { useComments } from 'src/hooks/useComments.hook'
import { useIsLoading } from 'src/hooks/useIsLoading.hook'
import { emitAddComment } from 'src/sockets'
import { CommentResponse, Post } from 'tukibook-helper'

interface AddCommentFormProps {
  postId: Post['id']
}

export const AddCommentForm = ({ postId }: AddCommentFormProps): JSX.Element => {
  const { isLoading, handleIsLoading } = useIsLoading()
  const { addComment } = useComments({ postId })

  const handleCommentPost = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleIsLoading(true)

    const target = event.target as HTMLFormElement
    const content = (target[0] as HTMLInputElement).value

    const response = (await (
      await addComment({ postId, content, parentCommentId: null })
    ).payload) as CommentResponse

    handleIsLoading(false)

    if (response.data) emitAddComment(response)

    target.reset()
  }

  return (
    <form className={styles.commentForm} onSubmit={handleCommentPost}>
      <input type="text" placeholder="Comentar..." className={styles.commentInput} />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? <ButtonLoader /> : '💬'}
      </Button>
    </form>
  )
}

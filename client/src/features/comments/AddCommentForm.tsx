import { FormEvent } from 'react'

import { Button } from 'src/components/common/Button'
import { ButtonLoader } from 'src/components/common/ButtonLoader'
import styles from 'src/features/comments/AddCommentForm.module.css'
import { useIsLoading } from 'src/hooks/useIsLoading.hook'
import { usePosts } from 'src/hooks/usePosts.hook'
import { emitCommentPost } from 'src/sockets'
import { Post, PostResponse } from 'tukibook-helper'

export const AddCommentForm = ({ post }: { post: Post }): JSX.Element => {
  const { isLoading, handleIsLoading } = useIsLoading()
  const { commentPost } = usePosts()

  const handleCommentPost = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleIsLoading(true)

    const target = event.target as HTMLFormElement
    const content = (target[0] as HTMLInputElement).value

    const response = (await (
      await commentPost({ postId: post.id, content, parentCommentId: null })
    ).payload) as PostResponse

    handleIsLoading(false)

    if (response.data) emitCommentPost(response)

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

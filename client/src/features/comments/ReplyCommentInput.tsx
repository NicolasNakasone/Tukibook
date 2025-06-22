import { useState } from 'react'

import { Button } from 'src/components/common/Button'
import styles from 'src/features/comments/ReplyCommentInput.module.css'
import { useIsLoading } from 'src/hooks/useIsLoading.hook'
import { usePosts } from 'src/hooks/usePosts.hook'
import { emitCommentPost } from 'src/sockets'
import { Comment, Post, PostResponse } from 'tukibook-helper'

interface ReplyCommentInputProps {
  parentCommentId: Comment['parentCommentId'] | Comment['id']
  postId: Post['id']
  cancelIsReplying: () => void
}

export const ReplyCommentInput = ({
  parentCommentId,
  postId,
  cancelIsReplying,
}: ReplyCommentInputProps): JSX.Element => {
  const [newContent, setNewContent] = useState('')
  const { isLoading, handleIsLoading } = useIsLoading()
  const { commentPost } = usePosts()

  const handleReplyComment = async () => {
    handleIsLoading(true)
    const response = (await (
      await commentPost({ content: newContent, parentCommentId, postId })
    ).payload) as PostResponse
    handleIsLoading(false)

    if (response.data) {
      emitCommentPost(response)
      setNewContent('')
      cancelIsReplying()
    }
  }

  return (
    <>
      <input
        value={newContent}
        className={styles.replyInput}
        placeholder="Escribi tu respuesta..."
        onChange={e => setNewContent(e.target.value)}
      />
      <div className={styles.replyButtons}>
        <Button
          isLoading={isLoading}
          disabled={!newContent || isLoading}
          onClick={handleReplyComment}
        >
          Guardar
        </Button>
        <Button disabled={isLoading} onClick={cancelIsReplying}>
          Cancelar
        </Button>
      </div>
    </>
  )
}
